# Product and UX Failure Patterns

Current reusable project failure signatures.

## UX-FP-001 — UI analytics lies about completed action
```yaml
pattern_id: UX-FP-001
status: active
signature: feedback event emitted before async mutation success
root_cause: interaction intent conflated with business outcome
prevention: separate intent/pending/success/failure semantics
last_proven_revision: null
```
