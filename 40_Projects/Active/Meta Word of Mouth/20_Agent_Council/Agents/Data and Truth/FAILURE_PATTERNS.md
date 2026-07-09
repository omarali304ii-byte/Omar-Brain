# Data and Truth Failure Patterns

Current reusable project failure signatures.

## DATA-FP-001 — Parent permission leaks nested sensitive evidence
```yaml
pattern_id: DATA-FP-001
status: active
signature: route authorizes entity but serializer includes richer evidence
root_cause: authorization boundary modeled at page/entity level instead of field meaning
prevention: add explicit DTO exposure option and route-level tests
last_proven_revision: null
```

## DATA-FP-002 — Read-modify-write snapshot loses deltas
```yaml
pattern_id: DATA-FP-002
status: active
signature: two jobs load same snapshot then overwrite
root_cause: no concurrency control around shared derived state
prevention: require version/lock/atomic/merge-safe mechanism + concurrent proof
last_proven_revision: null
```
