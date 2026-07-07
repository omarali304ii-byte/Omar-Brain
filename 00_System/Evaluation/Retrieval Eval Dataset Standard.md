---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [evaluation, retrieval, dataset]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Retrieval Eval Dataset Standard

Each case should represent a real information need.

Required:
```yaml
eval_id:
query:
query_class:
expected_paths: []
expected_terms: []
forbidden_paths: []
k: 5
```

Include hard cases:
- alias mismatch,
- exact error string,
- stale vs current truth,
- cross-project relationship,
- procedural lookup,
- recent episode lookup,
- contradiction.
