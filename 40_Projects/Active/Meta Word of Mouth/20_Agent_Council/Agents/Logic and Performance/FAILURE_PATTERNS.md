# Logic and Performance Failure Patterns

Current reusable project failure signatures.

## LOGIC-FP-001 — Lost update in semantic snapshot
```yaml
pattern_id: LOGIC-FP-001
status: resolved
signature: two workers read same prior state then independently rewrite
root_cause: concurrency control outside merge algorithm (historical)
resolution: person-level FOR UPDATE + source-order comparison in single transaction
prevention: triggers LOGIC-CONC-001 and DATA-FP-002
last_proven_revision: bd8a7a6 (proven by ordering-concurrency + memory-concurrency tests)
resolved_by: src/lib/intelligence/customer-intelligence.ts storeIntelligenceResult transaction with lock ordering
```

## LOGIC-FP-002 — Lock recovery exists but execution path never invokes it
```yaml
pattern_id: LOGIC-FP-002
status: resolved
signature: correct helper exists yet runtime loop omits call
root_cause: implemented code mistaken for operational behavior (historical)
resolution: Stale recovery wired into worker startup + periodic ticks at 9a6b2f2, proven at bd8a7a6
prevention: cross-handoff to Runtime; add end-to-end worker eval
last_proven_revision: bd8a7a6 (proven by stale-lock-recovery test)
resolved_by: scripts/customer-intelligence-worker.ts startup recovery + periodic recovery every 60 ticks
```

## LOGIC-FP-003 — Stale cognition claims active P0 when code has materially changed
```yaml
pattern_id: LOGIC-FP-003
status: active (captured 2026-07-10)
signature: agent cognition says P0 open; code has transaction-level locks and tests passing
root_cause: agent did not reconcile own cognition against repo HEAD before making active claims
prevention: NEXT_START must force revision diff + owned-surface re-read before any status claim
last_proven_revision: bd8a7a6
evidence: MWOM-DATA-003 was P0 in stored cognition at 8c027fab; code at bd8a7a6 has comprehensive fix
rule: stored_finding_status_is_not_current_until_reconciled
```

## LOGIC-FP-004 — Missing lock on evidence mutation under concurrent refresh
```yaml
pattern_id: LOGIC-FP-004
status: active
signature: deleteMany + createMany within transaction but preceding read outside transaction
root_cause: evidence refresh treated as safe because intelligence path serializes on person lock; manual path does not
prevention: evidence mutation paths must acquire lock on parent entity (opportunity) before delete+create
last_proven_revision: bd8a7a6
finding: MWOM-LOGIC-001
severity: P2
```
