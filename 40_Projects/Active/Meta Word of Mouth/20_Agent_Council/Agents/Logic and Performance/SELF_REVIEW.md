# Logic and Performance Self Review

## Current model strengths
- All owned cognition reconciled against bd8a7a6 with deep code inspection
- Concurrency model confirmed by DB-backed tests (5 passed)
- Source-ordering proven by 3-tier tiebreaker test
- Durable memory merge bounds confirmed
- MWOM-DATA-003 status accurately reflects current code reality

## Scope inspected
- Full intelligence pipeline: enqueue → claim → analyze → store → refresh → complete
- Source ordering: compareSourceOrder + tiebreaking
- Durable memory merge: mergeDurableMemory + fact extraction + bounds
- Job lifecycle: claim, stale recovery, markComplete, fail, retry
- Worker loop: polling, recovery cadence, startup/stop
- Lead scoring: RULES, score/stage/status computation, boundedness
- Opportunity engine: refresh, override protection, evidence handling
- Attention engine: check types, deduplication, upsert
- Follow-up concurrency: dedupeKey + unique constraint
- People search: cursor, sort, contains predicates, index alignment
- Schema: indexes on hot query paths, lock columns
- Send reconciliation: stale detection, reconcile transition, FOR UPDATE guard

## Scope not inspected
- Frontend components (ReplyComposer, Sidebar, AI Brain UI)
- Instagram publishing worker (different worker pattern, analogous concerns)
- AI Brain prompt versioning concurrency (not currently owned)
- Webhook processing pipeline
- OAuth/metadata flows
- File upload/image processing

## Claims based only on static inspection
- Workers 1-2 assumed based on code structure (not proven by deployment config)
- Connection pool size 15 from error message (not from explicit config read)
- Scale assumptions (people count, conversation count) are reasoned, not measured
- Query plans are inferred from index definitions, not EXPLAIN ANALYZE

## Tests not executed
- test:intelligence-worker (blocked by EMAXCONNSESSION — environment, not code)
- test:intelligence-jobs, test:intelligence-idempotency, test:intelligence-schema (not part of this audit scope but related)
- test:send-reconciliation (not part of this audit)
- test:memory-compaction executed and passed (unit test, not DB-backed)

## Strongest counterargument
"The intelligence snapshot concurrency fix is proven by tests that create two concurrent Promise.all calls in the same Node process. This does not represent true multi-process worker contention where each process has its own transaction context and connection pool. However, PostgreSQL row-level locks are process-agnostic — a FOR UPDATE lock acquired by one connection blocks another connection regardless of process. The proof is sound."

## Likely blind spot
- The opportunity evidence concurrency gap (MWOM-LOGIC-001) was discovered only because the audit explicitly checked: "does this mutation path lock the parent entity?" The intelligence path was correct; the manual refresh path was not. Other similar paths may exist in code outside the primary audit scope (e.g., Instagram publishing evidence, lead details mutation).

## Runtime unknowns
- Production deployment topology (worker count, scheduling, DB replica config)
- Actual concurrent worker instances
- Actual per-workspace data volumes and growth rates
- Query latency under concurrent load
- Whether stale recovery actually triggers in production (depends on worker health monitoring)

## Self-check before completion
- [x] Did I start from NEXT_START rather than rediscovering the whole project?
- [x] Did I inspect changed owned files since last verified revision?
- [x] Did I apply learned triggers (CONC-001, CONC-002, CONC-003, CONC-004)?
- [x] Did I convert meaningful failure into pattern/rule/eval where appropriate?
- [x] Did I leave an exact restart pointer?
- [x] Did I reconcile stale cognition with current code?
- [x] Did I verify claims with tests where possible?
- [x] Did I distinguish signal/snapshot/durable-memory/semantic/job-lifecycle correctness?
- [x] Did I check lock ordering for deadlock risk?
- [x] Did I verify deterministic tiebreaking?
