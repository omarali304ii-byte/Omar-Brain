---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [indexing, embeddings, migration, hashes]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Incremental Indexing and Embedding Migration

## Incremental index
For each source:
- compute content hash,
- parse frontmatter and heading tree,
- compare previous hash,
- upsert changed chunks only,
- delete removed chunks,
- preserve original text/document pointer.

## Identity
Stable IDs should not depend only on array order.
Suggested:
```text
doc_id   = note://<normalized-path>
chunk_id = <doc_id>#<heading-anchor>:<ordinal>
```

## Embedding migration
- never discard canonical text,
- support parallel/named embedding versions,
- re-embed in waves,
- compare retrieval evals,
- cut over only after quality gate,
- keep rollback until stable.

## Priority waves
1. active project truth,
2. semantic memory,
3. procedural memory,
4. recent episodes,
5. general knowledge,
6. archive.
