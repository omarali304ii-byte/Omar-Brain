# Logic and Performance Current Findings

## Freshness
```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-10
verification_scope: full owned-surface re-audit at HEAD; intelligence snapshot concurrency, source ordering, durable memory merge, opportunity engine, lead scoring, people search, attention engine, worker loop, follow-up concurrency, stale lock recovery, partial retry, send reconciliation
freshness: current
```

## Active

### MWOM-DATA-003 — Intelligence Snapshot Concurrency
```yaml
finding_id: MWOM-DATA-003
title: Same-person intelligence snapshot updates can race under concurrent workers
severity: P0 → FIXED-PENDING-FINAL-PROOF
owner: Data & Truth / Logic & Performance (shared)
shared_owners: [Data and Truth]
current_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
affected_surfaces:
  - src/lib/intelligence/customer-intelligence.ts
  - src/lib/intelligence/source-order.ts
  - src/lib/intelligence/memory-merge.ts
  - scripts/customer-intelligence-worker.ts
observed_behavior: [HISTORICAL] Two concurrent intelligence jobs for the same person could compute from the same pre-lock snapshot and lose independent deltas or let older semantic state overwrite newer state.
expected_invariant: Every independent intelligence delta must be durable-memory-preserved. Newer semantic state must never be overwritten by older.
evidence: |
  Code at bd8a7a6 provides comprehensive concurrency protection:
  - storeIntelligenceResult() runs inside prisma.$transaction (line 571)
  - Consistent lock ordering: job → person → snapshot (lines 572-600)
  - Person-level FOR UPDATE serializes same-person writes
  - compareSourceOrder (source-order.ts) with three-tier tiebreaking: observedAt → createdAt → messageId
  - When incoming is stale: only summary (durable memory) merged; semantic fields preserved (lines 676-684)
  - When incoming is newer: full semantic field update (lines 687-709)
  - Job completion guard: FOR UPDATE check prevents double-write (lines 572-578, 714-721, 754-761)
  - Signal idempotency: delete-then-create by sourceMessageId + source:AI_MODEL within transaction (lines 636-648)
  - Durable memory merge: pure function, deduplication-by-fact-normalization, bounded at 800 chars (memory-merge.ts)
  
  Test evidence at bd8a7a6:
  - test-intelligence-ordering-concurrency: PASSED — 3 comparator unit tests + 3 DB-backed concurrent scenarios (different timestamps, equal-observedAt/different-createdAt, fully-equal with ID tiebreak). All verify: latest semantic state wins, durable memory preserves all facts, deterministic winner. Uses Promise.all concurrency with artificial delays.
  - test-intelligence-memory-concurrency: PASSED — 2 concurrent jobs for same person via Promise.all. Verifies both facts in durable memory, bounded at 800 chars.
  - test-intelligence-worker testOlderJobCannotOverwriteNewerSnapshotState: verified statically — tests sequential older-then-newer processing, asserts newer priority/intent preserved and older durable fact merged. Could not execute due to connection pool exhaustion (environment, not code).
  - test-intelligence-partial-retry: PASSED — verifies signal count unchanged (2) after retry (no double-counting), job transitions PENDING→COMPLETED.
  - test-intelligence-stale-lock-recovery: PASSED — including testConcurrentRecoverySingleTransition (dual concurrent recovery calls → single transition).
root_cause: |
  [HISTORICAL] Job claiming (FOR UPDATE SKIP LOCKED) and snapshot persistence were in separate transactions. Person-level lock was missing.
  [CURRENT] Fixed by single-transaction job+person+snapshot locking with source-order comparison.
remaining_proof: |
  - Worker lifecycle test (test-intelligence-worker.ts) could not execute due to DB connection pool exhaustion. The DB-backed ordering-concurrency test passes all relevant assertions independently.
  - Production multi-worker deployment not verified — concurrency protection is code-proven but production topology unknown.
recommended_action: Close when test-intelligence-worker.ts passes at current HEAD in a non-exhausted DB environment, or accept ordering-concurrency test as sufficient proof.
proof_status: passed-db-backed (ordering-concurrency, memory-concurrency, partial-retry, stale-lock-recovery)
cross_agent_handoff: Data & Truth must update shared finding status from "likely-fixed" to "fixed-pending-proof" with Logic's evidence.
```

### MWOM-LOGIC-001 — Opportunity Refresh Evidence Concurrency
```yaml
finding_id: MWOM-LOGIC-001
title: Concurrent opportunity refreshes for same person can interleave evidence delete+create
severity: P2
status: active
owner: Logic & Performance
shared_owners: []
current_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
affected_surfaces:
  - src/lib/opportunities/opportunity-engine.ts:120-142
observed_behavior: |
  refreshOpportunityForPerson reads signals and existing opportunity OUTSIDE a transaction,
  then enters a transaction to deleteMany + createMany evidence. Two concurrent refreshes
  for the same person could interleave: A deletes → B deletes → A creates → B creates,
  causing B to delete A's just-created evidence.
expected_invariant: Evidence for an opportunity must not be lost by concurrent refresh interleaving.
evidence: |
  - refreshOpportunityForPerson lines 76-82: reads latestOpportunity outside transaction
  - Lines 120-142: transaction does deleteMany + createMany for evidence
  - No row-level lock on person or opportunity before evidence mutation
  - In the intelligence path, storeIntelligenceResult locks the person row (FOR UPDATE),
    so concurrent intelligence-driven refreshes are serialized. Manual/API-driven refreshes
    lack this serialization.
  - test-opportunity-override-no-duplicate: PASSED — verifies no duplicate opportunities
    under overrides, but does NOT exercise concurrent refresh with evidence interleaving.
root_cause: Evidence delete+create is inside a transaction, but the preceding read (whether to create/update opportunity) is outside the transaction. Row-level lock is not acquired on the opportunity before evidence mutation.
why_it_matters: Could lose opportunity evidence under concurrent manual refresh. Blast radius limited because intelligence-path refreshes are serialized by person lock.
blast_radius: Manual refresh API calls, admin panel concurrent refreshes
reproduction_or_counterexample: |
  Construct two concurrent calls to refreshOpportunityForPerson(same person). Both read
  existing opportunity outside transaction. Both enter transaction, both do deleteMany,
  then both do createMany. The second createMany overwrites the first.
recommended_action: |
  Add FOR UPDATE lock on the opportunity row at transaction start, OR move evidence
  handling to use upsert-per-reason (signalId-unique) instead of deleteMany+createMany,
  OR add optimistic locking (version column).
proof_required: Concurrent evidence preservation test with two simultaneous refreshes.
dependencies: []
handoffs: []
```

### MWOM-LOGIC-002 — People Search `contains` Scalability
```yaml
finding_id: MWOM-LOGIC-002
title: People search uses multi-field `contains` (LIKE '%text%') with `mode: insensitive` without index support
severity: P3 (watch)
status: active
owner: Logic & Performance
shared_owners: []
current_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
affected_surfaces:
  - src/lib/people/people-query.ts:33-64
observed_behavior: |
  listPeople constructs OR predicates across:
  - person.displayName: contains + insensitive
  - person.primaryPhone: contains + insensitive
  - identities.username: contains + insensitive
  - identities.displayName: contains + insensitive
  - identities.phone: contains + insensitive
  - identities.providerCustomerId: contains + insensitive (when exposeProviderIds)
  LIKE '%text%' cannot use B-tree indexes. The query degrades to sequential scan.
expected_invariant: Search should remain bounded and performant under expected data volumes.
evidence: |
  - Contains patterns on person-level fields plus relation subquery (identities.some.OR)
  - PAGE_SIZE=50 with cursor-based pagination bounds result set size
  - Query scoped to single workspace (workspaceId filter)
  - No pg_trgm or full-text search index observed in schema
  - Schema indexes: @@index([workspaceId, lastSeenAt]), @@index([workspaceId, displayName]) — supports sort but not contains
root_cause: Natural design choice for MVP. Contains is the simplest search primitive.
why_it_matters: At scale (thousands+ people in a workspace), multi-field contains search becomes expensive. Currently acceptable for expected small workspace volumes.
blast_radius: People search/list API — latency degradation proportional to workspace person count.
complexity: O(n_people_in_workspace * m_identity_search_fields) per page fetch
recommended_action: Monitor query latency as workspace grows. Consider pg_trgm index or full-text search when latency exceeds threshold. Add a bounded-search test with representative volume.
proof_required: Representative-volume benchmark establishing acceptable p95 latency at target scale.
dependencies: []
handoffs: []
```

### MWOM-LOGIC-003 — Missing Index on `lockedAt` for Stale Recovery
```yaml
finding_id: MWOM-LOGIC-003
title: Stale intelligence job recovery query lacks compound index on (status, lockedAt)
severity: P3 (watch)
status: active
owner: Logic & Performance
shared_owners: [Runtime and Reliability]
current_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
affected_surfaces:
  - src/lib/intelligence/customer-intelligence.ts:260-321
  - prisma/schema.prisma: IntelligenceJob model
observed_behavior: |
  recoverStaleIntelligenceJobs queries:
  WHERE status = 'PROCESSING' AND lockedAt < ? AND workspaceId = ?
  FOR UPDATE SKIP LOCKED
  No compound index on (status, lockedAt) or (workspaceId, status, lockedAt).
expected_invariant: Stale recovery queries should not cause sequential scan over all PROCESSING jobs.
evidence: |
  - Existing index: @@index([workspaceId, status, createdAt]) — supports claimPendingIntelligenceJob but NOT the recovery query's lockedAt filter
  - Recovery runs at startup and every recoveryEveryTicks (default 60 ticks * 5s = 5 min)
  - The PROCESSING job count is expected to be small (bounded by worker count)
root_cause: lockedAt was not in any compound index at schema design time.
why_it_matters: Under high load or worker count, PROCESSING jobs accumulate and recovery query scans grow. Currently acceptable because PROCESSING jobs are bounded by active worker count.
blast_radius: Stale lock recovery — startup and periodic recovery ticks.
recommended_action: Consider adding @@index([workspaceId, status, lockedAt]) when job table grows or worker count increases. Monitor recovery query duration in production.
proof_required: Query EXPLAIN ANALYZE showing index usage or acceptable scan cost at representative volume.
dependencies: []
handoffs: []
```

## Fixed Pending Proof

| ID | Severity | Summary | Evidence | Proof Needed |
|---|---|---|---|---|
| MWOM-DATA-003 | P0→fixed | Intelligence snapshot concurrency: transaction-level locking + source-order comparison + durable memory merge proven by DB-backed tests | `ordering-concurrency` PASSED, `memory-concurrency` PASSED, `partial-retry` PASSED, `stale-lock-recovery` PASSED | Worker lifecycle test in clean DB environment |

## Closed Proven

None at this revision.

## Watch

| ID | Severity | Summary | Trigger |
|---|---|---|---|
| MWOM-LOGIC-002 | P3 | People search contains scalability | Workspace person count > 1000 OR search p95 > 500ms |
| MWOM-LOGIC-003 | P3 | Missing lockedAt index for stale recovery | PROCESSING job count > 100 OR recovery query > 100ms |
