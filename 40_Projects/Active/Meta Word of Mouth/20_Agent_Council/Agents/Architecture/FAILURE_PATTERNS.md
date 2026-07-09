# Architecture Failure Patterns

Current reusable project failure signatures.

## ARCH-FP-001 — Transport layer absorbs business workflow
```yaml
pattern_id: ARCH-FP-001
status: active
signature: route/adapter starts pricing, persistence coordination, AI or downstream policy
root_cause: boundary erosion and ambiguous failure semantics
prevention: activate Architecture + Integration review; move orchestration to owned service/workflow
last_proven_revision: null
```
