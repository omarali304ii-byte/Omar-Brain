# Logic and Performance Next Start

```yaml
status: current
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-10
verification_scope: full owned-surface re-audit; intelligence pipeline, source ordering, durable memory merge, job lifecycle, worker loop, lead scoring, opportunity engine, attention engine, follow-up concurrency, people search, schema indexes, send reconciliation
first_files_to_open:
  - src/lib/intelligence/customer-intelligence.ts
  - src/lib/opportunities/opportunity-engine.ts
  - scripts/customer-intelligence-worker.ts
  - prisma/schema.prisma
active_finding_ids: [MWOM-LOGIC-001, MWOM-LOGIC-002, MWOM-LOGIC-003]
fixed_pending_proof: [MWOM-DATA-003]
open_unknowns:
  - production deployment topology
  - actual data volumes and query latency
  - worker test blocked by connection pool exhaustion
first_action: check if worker test can run (resolve connection pool), or coordinate MWOM-DATA-003 closure with Data & Truth based on existing test evidence
do_not_repeat:
  - treating stored revision-bound cognition as current without diff
  - broad-exploring repository before checking OWNED_SURFACE_MAP
  - claiming P0 active when code has materially changed and tests pass
  - conflating signal correctness with snapshot correctness with durable-memory correctness
proof_needed_next:
  - run test:intelligence-worker in clean DB environment
  - design and add LOGIC-EVAL-009 (concurrent opportunity evidence refresh)
  - representative-volume benchmarks for LOGIC-EVAL-002 and LOGIC-EVAL-010
drift_triggers:
  - any change to src/lib/intelligence/customer-intelligence.ts lock ordering or transaction boundaries
  - any change to src/lib/intelligence/source-order.ts tiebreaking
  - any change to src/lib/opportunities/opportunity-engine.ts evidence mutation
  - any change to prisma/schema.prisma indexes on intelligence_jobs, people, messages
  - any change to scripts/customer-intelligence-worker.ts poll/recovery cadence
  - any new worker or queue added
  - any new search predicate (contains, mode:insensitive) on growing table
  - any score/weight change in lead-scoring.ts
```
