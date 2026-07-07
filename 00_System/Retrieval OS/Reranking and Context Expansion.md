---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [reranking, context-expansion, retrieval]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Reranking and Context Expansion

## Pipeline
- retrieve broad candidate set,
- rerank for query relevance,
- deduplicate,
- diversify sources when synthesis needs breadth,
- expand top children to parent/neighbor context,
- enforce token budget.

## Reranker input
Include query plus candidate text and minimal metadata. Do not let a reranker rewrite source truth.

## Parent expansion
Expand only when:
- the child depends on prior definitions,
- a list/table would be truncated,
- a decision rationale spans sibling sections,
- code context requires surrounding symbol/module.

## Anti-pattern
Do not retrieve 30 chunks and dump all of them into the model because “more context is safer”. Noise can reduce answer quality.
