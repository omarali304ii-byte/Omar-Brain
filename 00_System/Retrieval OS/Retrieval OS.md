---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [retrieval, hybrid-search, indexing, rag, reranking]
ai_access: allowed
version: 4.0
---
# Retrieval OS

## Mission
Find the smallest, freshest, most authoritative context that can answer the task.

## Default pipeline
```text
User/task
   ↓
Query classifier
   ↓
Scope resolution (project/person/domain/time)
   ↓
Metadata filter
   ↓
Lexical retrieval ─┐
                   ├─→ fusion
Dense retrieval ───┘
   ↓
Optional graph/entity expansion
   ↓
Rerank
   ↓
Deduplicate/diversify
   ↓
Parent/neighbor expansion
   ↓
Authority + freshness policy
   ↓
Context pack with citations
```

## Rule
Pure vector search is not the default. Exact identifiers, error strings, filenames, IDs, API permission names, and code symbols require lexical support.

## Storage model
- Obsidian Markdown = canonical source,
- retrieval manifest/document store = rebuildable,
- lexical index = rebuildable,
- vector index = rebuildable,
- graph/entity layer = derived and rebuildable,
- retrieval eval set = durable governed asset.

## Retrieval modes
- lookup,
- project-current-state,
- exact-technical,
- synthesis,
- recent-events,
- procedural-how-to,
- cross-entity,
- contradiction-check.
