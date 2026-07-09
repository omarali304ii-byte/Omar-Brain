# Logic and Performance Handoff

```yaml
status: current
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-10
summary: Full owned-surface re-audit at bd8a7a6. MWOM-DATA-003 reconciled from P0 active to fixed-pending-proof. Three new findings discovered (MWOM-LOGIC-001 through -003). All owned concurrency tests executed (5 passed, 1 blocked by environment).
required_context:
  - DOMAIN_MODEL.md (current present-tense model)
  - CURRENT_FINDINGS.md (active findings)
  - OWNED_SURFACE_MAP.md (exact surfaces)
  - EVAL_REGISTRY.md (reconciled evals)
  - NEXT_START.md (restart pointer)
```

## Cross-Agent Handoffs

### To Data & Truth — MWOM-DATA-003 Closure
```yaml
finding: MWOM-DATA-003
logic_status: fixed-pending-proof
code_evidence: |
  - storeIntelligenceResult: single transaction with lock order job→person→snapshot (lines 571-710)
  - Person-level FOR UPDATE serializes same-person writes
  - compareSourceOrder with three-tier tiebreaking (source-order.ts)
  - Stale path: only summary merged, semantic fields preserved
  - Job completion guard: FOR UPDATE double-check before write
  - Signal idempotency: delete-then-create by sourceMessageId within transaction
test_evidence: |
  - test:intelligence-ordering-concurrency: PASSED (3 concurrency scenarios)
  - test:intelligence-memory-concurrency: PASSED
  - test:intelligence-partial-retry: PASSED (no double-counting)
  - test:intelligence-stale-lock-recovery: PASSED (concurrent recovery safe)
  - test:intelligence-worker: static verification complete; runtime blocked by connection pool
requested_action: |
  Update shared finding status in 09_AGENT_FINDINGS_INDEX.md from "likely-fixed-pending-data-logic-quality-proof" to "fixed-pending-proof" with Logic's evidence attached.
  Consider ordering-concurrency test sufficient or resolve worker test environment issue.
shared_surface: 05_CURRENT_PROJECT_TRUTH.md MWOM-DATA-003 section
```

### To Quality Engineer — MWOM-LOGIC-001 Test
```yaml
finding: MWOM-LOGIC-001
request: Design and implement LOGIC-EVAL-009: concurrent opportunity evidence refresh test
scenario: Two concurrent refreshOpportunityForPerson calls for same person with different signal sets. Verify no evidence lost.
```

### To Supervisor — Batch Planning
```yaml
next_batch_candidates:
  - MWOM-LOGIC-001 fix (P2): add FOR UPDATE or upsert-based evidence handling in refreshOpportunityForPerson
  - MWOM-DATA-003 closure: approve existing test evidence as sufficient, update shared indices
  - Connection pool investigation: worker test blocked, may indicate pooling issue
  - Volume benchmarks: establish representative data and query latency baselines
```

### To Runtime & Reliability — Stale Recovery Index
```yaml
finding: MWOM-LOGIC-003
note: Missing index on (workspaceId, status, lockedAt) for stale recovery query. P3 watch — monitor in production; add index when PROCESSING job count grows.
```

### To Architecture — Source Order Determinism
```yaml
note: compareSourceOrder uses localeCompare on UUID messageIds. UUIDs are ASCII hex strings, making localeCompare deterministic. Documented in LOGIC-CONC-004. No action needed.
```
