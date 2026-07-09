# Runtime and Reliability Failure Patterns

Current reusable project failure signatures.

## RUN-FP-001 — Dead recovery code
```yaml
pattern_id: RUN-FP-001
status: active
signature: helper exists and appears correct but no runtime path invokes it
root_cause: static implementation mistaken for operational capability
prevention: map invocation path; add smoke/e2e recovery proof
last_proven_revision: null
```
