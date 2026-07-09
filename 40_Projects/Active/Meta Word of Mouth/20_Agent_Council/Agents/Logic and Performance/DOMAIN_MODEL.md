# Logic and Performance Domain Model

## Freshness
```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-10
verification_scope: full owned-surface audit at HEAD
freshness: current
```

## Intelligence Job Model

### States
```
PENDING → PROCESSING → COMPLETED
                   ↘ FAILED (terminal codes or max attempts)
                   ↘ PENDING (retryable failure)
```

### Claiming
- `claimPendingIntelligenceJob`: `FOR UPDATE SKIP LOCKED`, ORDER BY createdAt ASC, LIMIT 1
- Atomic transition PENDING→PROCESSING within transaction
- Attempt count incremented, lockedAt/lockedBy set

### Stale Recovery
- `recoverStaleIntelligenceJobs`: reads PROCESSING jobs where lockedAt < (now - 5 min)
- `FOR UPDATE SKIP LOCKED` prevents concurrent recovery races
- attemptCount < MAX_JOB_ATTEMPTS → reset to PENDING; >= MAX → FAILED
- Runs at worker startup + every 60 ticks (5 min default)
- `testConcurrentRecoverySingleTransition` proven: dual concurrent recovery → single transition

### Processing
- `processIntelligenceJob`: load context → analyze → store result → refresh opportunity → mark completed
- `processNextIntelligenceJob`: claim + process in sequence
- Partial failure: snapshot+signals persisted before opportunity refresh fails → job reset to PENDING. Retry idempotent via delete-then-create signals.

## Snapshot Update Model

### Lock Ordering (storeIntelligenceResult, single transaction)
```
1. FOR UPDATE on intelligence_jobs row (guard: skip if COMPLETED)
2. FOR UPDATE on people row (serializes same-person writes)
3. FOR UPDATE on person_intelligence_snapshots row
```

### Source Order Comparison
```
compareSourceOrder(incoming, current):
  observedAt desc → createdAt desc → messageId asc (localeCompare on UUID)
```
Total ordering, deterministic for UUIDs.

### Snapshot Write Rules
- **No existing snapshot**: full creation with all semantic fields
- **Newer source**: full semantic update (all fields from AI output) + summary merge
- **Stale source**: only summary merged (durable memory), semantic fields preserved
- **Signals**: delete-then-create by (sourceMessageId, source:AI_MODEL) within transaction

### Durable Memory Merge
- mergeDurableMemory: pure function, fact-extraction by sentence splitting
- Deduplication by normalized lowercase fact text
- New facts sorted before old facts, then truncated to 800 chars
- Callers: storeIntelligenceResult (both new and stale paths) — always within transaction

## Opportunity Model

### Computation
- `scoreOpportunity`: signal-weighted score (RULES table) + recency boost + repeat-conversation boost + unanswered-inbound priority + unassigned penalty
- Score clamped to [0, 100]
- `statusFromScore(score)`: <35 → null, 35-54 → POTENTIAL, 55-74 → WARM, ≥75 → HOT
- `stageFromScore(score)`: <35 → NEW, 35-54 → INTERESTED, 55-74 → CONSIDERING, ≥75 → READY_TO_BUY

### Refresh
- Reads signals (take 100), person+identities+conversations+messages (take 5 per convo)
- Scores, then checks latest opportunity
- Override protection: NOT_A_LEAD, WON, LOST overrides block status/stage change
- WARM/HOT overrides: allow score/priority/product updates, preserve override
- Transaction: re-reads opportunity state, then creates or updates
- Evidence: deleteMany + createMany within transaction (concurrency gap noted: MWOM-LOGIC-001)

### Override
- `overrideOpportunity`: sets overrideStatus, updates status/stage/wonAt/lostAt
- Audit trail created

## Attention/Follow-Up Model

### Check Types
- HOT_LEAD_UNANSWERED (30min threshold)
- STALE_WARM_LEAD (48h threshold)
- FOLLOW_UP_PROMISE (nextFollowUpAt ≤ now)
- CUSTOMER_WAITING (conversation in WAITING_CUSTOMER status)
- HIGH_PRIORITY_COMPLAINT (complaint signal within 7 days, 4h due)
- REPLY_WINDOW_RISK (≥3 inbound, no outbound after, 1h window)

### Deduplication
- dedupeKey = `workspaceId:personId:type:bucket`
- Unique constraint on dedupeKey
- COMPLETED/CANCELLED tasks not resurrected
- Followup concurrency test PASSED: dual concurrent runAttentionChecks → single task

## People Search Model
- `listPeople`: cursor-based pagination (PAGE_SIZE=50) by id
- Sort: last_activity (lastSeenAt desc, id desc) or name (displayName asc, id asc)
- Search: OR across displayName, primaryPhone, identities.* (contains, mode:insensitive)
- Cursor semantics correct: id is always in sort tiebreaker

## Sent Reconciliation Model
- Messages: SENDING → SENT/FAILED/RECONCILIATION_REQUIRED
- `recoverStaleOutboundSends`: SENDING messages with lastSendAttemptAt > threshold → RECONCILIATION_REQUIRED
- `reconcileProviderAcceptedSend`: FOR UPDATE on message, gate on status=RECONCILIATION_REQUIRED, transition to SENT

## Present-Tenue Invariants

1. Person snapshot updates are serialized by person row lock
2. Durable memory merge preserves all independent deltas
3. Newer source always wins for semantic fields
4. Source-order tiebreaking is deterministic for UUID messageIds
5. Intelligence signals are idempotent per sourceMessageId
6. Job completion is guarded by FOR UPDATE double-check
7. Stale recovery is safe under concurrent recovery calls
8. Follow-up tasks are deduplicated by unique dedupeKey
9. Opportunity overrides (NOT_A_LEAD/WON/LOST) are protected from refresh
10. Score bounded [0,100], summary bounded at 800 chars, signals capped at 12 per message, interests/objections/risks capped at 20 each

## Proven Risks
- MWOM-DATA-003: FIXED — transaction-level locking + source-order comparison + durable memory merge
- MWOM-LOGIC-001: Opportunity evidence interleaving under concurrent manual refresh (P2)

## Unknowns
- Production multi-worker deployment topology
- Actual per-workspace data volumes (people, conversations, messages, signals, jobs)
- Query plans at scale
- p95 latency for search, opportunity refresh, intelligence processing
- Connection pool behavior under production concurrency
