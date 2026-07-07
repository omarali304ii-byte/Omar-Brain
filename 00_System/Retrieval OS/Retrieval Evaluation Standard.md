---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [retrieval, evaluation, recall, precision, groundedness]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Retrieval Evaluation Standard

## Separate retrieval from answer quality
A strong answer model cannot repair evidence that was never retrieved.

## Eval case fields
```yaml
eval_id:
query:
query_class:
expected_paths: []
forbidden_paths: []
required_facts: []
filters: {}
```

## Metrics
At minimum:
- Hit@K,
- Recall@K,
- MRR where a primary target exists,
- duplicate rate,
- stale/superseded retrieval rate,
- latency,
- context tokens.

## Regression gate
Changes to:
- chunking,
- embedding model,
- fusion weights,
- reranker,
- metadata filters,
- graph expansion
must run the eval set before adoption.

## Feedback loop
Real failures and user corrections should become new eval cases when representative and safe.
