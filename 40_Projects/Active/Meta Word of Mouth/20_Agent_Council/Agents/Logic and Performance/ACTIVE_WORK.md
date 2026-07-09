# Logic and Performance Active Work

```yaml
status: current
active_finding_ids: [MWOM-LOGIC-001, MWOM-LOGIC-002, MWOM-LOGIC-003]
current_objective: monitor P2/P3 findings; coordinate MWOM-DATA-003 closure with Data & Truth; prepare for next Supervisor batch
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
next_proof: see EVAL_REGISTRY.md
```

## Priority

1. **MWOM-DATA-003 closure coordination** — Owned evidence gathered (ordering-concurrency PASSED, memory-concurrency PASSED, partial-retry PASSED, stale-lock-recovery PASSED). Handoff to Data & Truth to update shared indices. Worker lifecycle test blocked by environment; consider ordering-concurrency test sufficient proof OR resolve pool exhaustion for full run.

2. **MWOM-LOGIC-001** (P2) — Opportunity evidence concurrency. Design fix: add FOR UPDATE on opportunity row or use upsert-by-signalId for evidence. Requires Supervisor assignment for implementation.

3. **MWOM-LOGIC-002 + MWOM-LOGIC-003** (P3 watch) — Monitor. No action needed at current scale.

## Last completed
- Full owned-surface audit at bd8a7a6
- MWOM-DATA-003 revalidated: code has comprehensive concurrency protection
- All owned concurrency tests executed (5 passed, 1 blocked by environment)
- Three new findings discovered: MWOM-LOGIC-001, MWOM-LOGIC-002, MWOM-LOGIC-003
- Failure patterns updated: FP-001 resolved, FP-002 resolved, FP-003+FP-004 captured
- Learned rules updated: CONC-001 proven, CONC-002/CONC-003/CONC-004 added

## Next batch (awaiting Supervisor)
- MWOM-LOGIC-001 evidence concurrency fix
- Intelligence worker test in clean DB environment
- Representative volume benchmarks for LOGIC-EVAL-002, LOGIC-EVAL-010
