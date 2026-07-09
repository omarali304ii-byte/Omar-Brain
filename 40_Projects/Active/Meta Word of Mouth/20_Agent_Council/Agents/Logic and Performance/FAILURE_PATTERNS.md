# Logic and Performance Failure Patterns

Current reusable project failure signatures.

## LOGIC-FP-001 — Lost update in semantic snapshot
```yaml
pattern_id: LOGIC-FP-001
status: active
signature: two workers read same prior state then independently rewrite
root_cause: concurrency control is outside merge algorithm
prevention: trigger LOGIC-CONC-001 and DATA-FP-002
last_proven_revision: null
```

## LOGIC-FP-002 — Lock recovery exists but execution path never invokes it
```yaml
pattern_id: LOGIC-FP-002
status: active
signature: correct helper exists yet runtime loop omits call
root_cause: implemented code mistaken for operational behavior
prevention: cross-handoff to Runtime; add end-to-end worker eval
last_proven_revision: null
```
