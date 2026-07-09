# Logic and Performance Change Impact Map

## Activate this agent when
- read-modify-write shared state (person snapshot, opportunity status, message state)
- multiple workers touch same entity
- loop/query added to growing dataset
- matching/ranking/scoring changes
- batch size/queue logic changes
- lock order, transaction boundary, or FOR UPDATE/SKIP LOCKED change
- contains/insensitive search added to hot query
- worker poll interval or recovery cadence change
- source-order tiebreaking change
- durable memory merge algorithm change
- AI prompt context window change
- pagination or cursor sort order change
- new worker, queue, or cron job introduced
- evidence/child-row mutation pattern change

## Concrete triggers (derived from current project)

### Intelligence pipeline
- `storeIntelligenceResult` lock order or transaction boundary change → full concurrency re-audit
- `compareSourceOrder` modification → run LOGIC-EVAL-001
- `mergeDurableMemory` modification → run LOGIC-EVAL-007
- `MAX_CONTEXT_MESSAGES` change → AI cost impact review
- `MAX_JOB_ATTEMPTS` change → stale recovery behavior review
- Signal count limiter change (max 12) → schema + cost review

### Worker loop
- `CUSTOMER_INTELLIGENCE_POLL_MS` change → throughput calculation
- `CUSTOMER_INTELLIGENCE_RECOVERY_EVERY_TICKS` change → recovery latency review
- Batch size (currently 1 per tick) change → concurrency review
- New worker added → job claiming contention review

### Opportunity engine
- `scoreOpportunity` RULES table change → score distribution review
- `statusFromScore` / `stageFromScore` threshold change → business logic review
- `refreshOpportunityForPerson` evidence handling change → MWOM-LOGIC-001 recheck
- `overrideOpportunity` protected statuses change → override protection review
- Signal take limit (100) change → O(n) complexity review
- Message take limit (5) change → fanout review

### People search
- New OR branch in search predicates → index alignment + scale review
- New `contains` / `mode: insensitive` on text field → sequential scan risk
- Sort order change → cursor correctness review
- PAGE_SIZE change → pagination correctness review

### Schema
- New index on intelligence_jobs → job claim/query plan review
- New column in hot query path → N+1 and overfetching review
- New unique constraint on mutable entity → concurrency review
- Lock column (lockedAt, lockedBy) schema change → recovery behavior review

## Cross-agent protocol
- Architecture boundary change → handoff Architecture
- Invariant/schema/privacy truth → handoff Data & Truth
- Provider workflow semantics → handoff Integration & Workflow
- Concurrency/complexity → handoff Logic & Performance
- Human-visible state meaning → handoff Product & UX
- Worker/deployment/recovery → handoff Runtime & Reliability
- Any closure claim → handoff Quality Engineer; Critic for final challenge
