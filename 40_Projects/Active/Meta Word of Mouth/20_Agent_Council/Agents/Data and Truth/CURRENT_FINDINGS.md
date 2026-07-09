# Data and Truth Current Findings

## Freshness
```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-10
freshness: current_for_verified_scope
```

---

## CLOSED — Verified fixed at bd8a7a6

### MWOM-DATA-001 — Leads evidence gated behind view_intelligence (CLOSED)

```yaml
finding_id: MWOM-DATA-001
title: Leads routes can expose intelligence evidence without view_intelligence
severity: P0 (was)
status: closed
owner: Data & Truth
evidence:
  - app/api/leads/route.ts:48 — evidence include is exposeIntelligence ? {...} : false
  - app/api/leads/[id]/route.ts:31 — same conditional include on detail
  - app/api/leads/route.ts:32 — exposeIntelligence = hasPermission(role, "view_intelligence")
  - app/api/leads/[id]/route.ts:71 — same permission gate on detail
  - src/lib/opportunities/opportunity-dto.ts:128-151 — DTO evidence output is exposeIntelligence ? [...] : []
closing_proof:
  - Query-level include is conditional on view_intelligence
  - DTO-level output is conditional on view_intelligence
  - Both layers independently gate evidence; no bypass path found
proof_gap: Route-level permission regression test (DATA-EVAL-001) not yet executed
```

### MWOM-DATA-002 — Provider-ID privacy centralized (CLOSED)

```yaml
finding_id: MWOM-DATA-002
title: Provider-ID privacy inconsistent across people/search/inbox surfaces
severity: P0 (was)
status: closed
owner: Data & Truth
evidence:
  - src/lib/privacy/provider-id.ts — resolveProviderIdDisplay() is the single masking function
  - All 6 API routes (people list/detail, inbox list/detail, leads list/detail) call canExposeProviderId() and pass to DTO
  - All 3 DTO modules (people-dto, inbox-dto, opportunity-dto) use resolveProviderIdDisplay() on provider IDs
  - People search only includes providerCustomerId in query criteria when exposeProviderIds is true (people-query.ts:39-43)
exposure_matrix:
  - leads list (OWNER/ADMIN: raw, AGENT/VIEWER: masked)
  - leads detail (OWNER/ADMIN: raw, AGENT/VIEWER: masked)
  - people list (OWNER/ADMIN: raw, AGENT/VIEWER: masked)
  - people detail (OWNER/ADMIN: raw, AGENT/VIEWER: masked)
  - inbox list (OWNER/ADMIN: raw, AGENT/VIEWER: masked)
  - inbox detail (OWNER/ADMIN: raw, AGENT/VIEWER: masked)
closing_proof: Centralized masking function, consistent invocation pattern across all 6 inspected API surfaces
proof_gap: Cross-surface privacy regression suite (DATA-EVAL-002) not yet executed
```

### MWOM-DATA-003 — Snapshot concurrency materially fixed (CLOSED)

```yaml
finding_id: MWOM-DATA-003
title: Same-person intelligence snapshot updates can race
severity: P0 (was)
status: closed
owner: Data & Truth (shared with Logic & Performance)
evidence:
  - src/lib/intelligence/customer-intelligence.ts:571-710 — $transaction with FOR UPDATE on job, person, snapshot
  - src/lib/intelligence/source-order.ts — compareSourceOrder(observedAt, createdAt, messageId) deterministic tiebreak
  - Lines 676-684 — newer snapshot rejection: only merge summary + increment version when incoming is older
  - Lines 687-710 — full update when incoming is newer than current snapshot source
closing_proof:
  - Serialization via FOR UPDATE row-level locks within single transaction
  - Deterministic ordering via three-way tiebreak
  - Stale update rejection when incoming source is older than current snapshot source
proof_gap: Concurrency regression test (DATA-EVAL-003) not yet executed; test scripts exist (test-intelligence-ordering-concurrency.ts) but execution not verified
```

---

## NEW FINDINGS

### MWOM-DATA-004 — Snapshot ordering uses conservative fallback for pre-migration snapshots (P3)

```yaml
finding_id: MWOM-DATA-004
title: Snapshot stale update fallback favors first-writer for equal timestamps
severity: P3
status: open
owner: Data & Truth
affected_surfaces: src/lib/intelligence/customer-intelligence.ts:623-633
evidence:
  - When existing snapshot lacks latestSourceMessageCreatedAt or latestSourceMessageId (pre-migration snapshots),
    the fallback check is: observedDiff <= 0 means newerSnapshotAlreadyExists = true
  - This means equal observedAt timestamps always favor the existing snapshot (first-writer-wins),
    which is correct but more conservative than the full three-way tiebreak
truth_problem: Pre-migration snapshots use a two-way comparison; after a single analysis with the new fields, all subsequent comparisons use the full three-way tiebreak. Risk is limited to the first analysis run after migration.
root_cause: Migration added latestSourceMessageCreatedAt and latestSourceMessageId as nullable columns; existing rows have null values for these fields
why_it_matters: The first analysis after migration may treat equal-timestamp incoming analysis as stale when it could be a tie. Once any message is analyzed post-migration, the snapshot gains the full ordering fields.
blast_radius: Single analysis cycle per person, self-healing after first post-migration analysis
recommended_action: Monitor; no action needed unless production shows unexpected stale rejection during initial migration rollout
proof_required: Verify behavior with test for snapshot initially created with null ordering fields
handoffs: Logic & Performance (concurrency semantics)
```

### MWOM-DATA-005 — pgvector extension runtime dependency not enforced in migration (P2)

```yaml
finding_id: MWOM-DATA-005
title: AI Brain migration requires pgvector extension at runtime
severity: P2
status: open
owner: Data & Truth
affected_surfaces: prisma/migrations/20260709120000_ai_brain_foundation/migration.sql:1
evidence:
  - Migration creates extension via CREATE EXTENSION IF NOT EXISTS vector
  - Schema uses Unsupported("vector(1536)") on KnowledgeChunk.embedding
  - pgvector is required for any knowledge chunk storage or retrieval
  - Clean migration tests assume pgvector is available in the test DB
truth_problem: The migration does not validate that pgvector is installed before creating tables with vector columns. If pgvector is unavailable, CREATE EXTENSION silently fails and subsequent vector column creation fails.
root_cause: PostgreSQL extension management is database-level; CREATE EXTENSION IF NOT EXISTS is the standard approach but provides no runtime guard
why_it_matters: AI Brain feature is non-functional without pgvector. Deploy config needs pgvector as explicit prerequisite.
recommended_action: Document pgvector as a deployment prerequisite; add startup check in application bootstrap
proof_required: Verify clean migration succeeds with pgvector available; verify clean migration fails gracefully without pgvector
handoffs: Runtime & Reliability (deployment docs)
```

---

## Finding summary table

| ID | Severity | Status | Summary |
|---|---|---|---|
| MWOM-DATA-001 | P0→closed | CLOSED | Leads evidence gated behind view_intelligence at query + DTO layers |
| MWOM-DATA-002 | P0→closed | CLOSED | Provider-ID privacy centralized and consistent across all 6 surfaces |
| MWOM-DATA-003 | P0→closed | CLOSED | Snapshot concurrency materially fixed with FOR UPDATE + deterministic ordering |
| MWOM-DATA-004 | P3 | open | Conservative fallback ordering for pre-migration snapshots (self-healing) |
| MWOM-DATA-005 | P2 | open | pgvector extension required but not runtime-enforced |
