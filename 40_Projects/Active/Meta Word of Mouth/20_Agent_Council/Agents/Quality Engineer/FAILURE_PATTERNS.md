# Quality Engineer Failure Patterns

Current reusable project failure signatures.

## QUAL-FP-001 — Static green hides semantic failure
```yaml
pattern_id: QUAL-FP-001
status: active
signature: typecheck/build pass while uncertain side effects, races or permission leaks remain
root_cause: proof chosen for code shape instead of failure mode
prevention: map every finding to explicit failure-mode eval
last_proven_revision: null
```
