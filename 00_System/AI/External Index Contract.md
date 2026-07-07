---
type: system
status: active
created: 2026-07-07
topics: [ai, index, api, retrieval]
ai_access: allowed
version: 2.0
---
# External Index Contract

A future Node.js brain service treats Obsidian Markdown as source truth and the search DB as disposable derived state.

## Document record
```json
{
  "document_id": "stable-id",
  "path": "40_Projects/Active/Example/Example.md",
  "title": "Example",
  "type": "project",
  "status": "active",
  "project_id": "prj-example",
  "project_class": "software",
  "architecture_profile": "software-standard-v1",
  "domains": ["business"],
  "topics": ["ai"],
  "ai_access": "allowed",
  "source_kind": "self",
  "confidence": "high",
  "maturity": null,
  "content_hash": "sha256...",
  "modified_at": "filesystem timestamp"
}
```

## Chunk record
```json
{
  "chunk_id": "stable-id",
  "document_id": "...",
  "project_id": "prj-example",
  "heading_path": ["Current State", "Architecture"],
  "ordinal": 4,
  "text": "...",
  "token_count": 512,
  "chunk_hash": "sha256...",
  "is_canonical": true,
  "is_current_truth": true,
  "is_deprecated": false
}
```

## Relationship record
```json
{
  "from_document_id": "...",
  "to_document_id": "...",
  "relation": "wikilink",
  "context_heading": "Key decisions"
}
```

## Update behavior
1. Scan path.
2. Parse frontmatter before any external transmission.
3. Exclude `ai_access: denied`.
4. Keep `restricted` local unless policy explicitly permits provider use.
5. Hash content.
6. Skip unchanged docs.
7. Re-chunk changed docs at heading-aware boundaries.
8. Upsert changed chunks.
9. Resolve links/entities.
10. Reconcile deleted files safely.

## Recommended indexes
For Omar's stack:
- PostgreSQL metadata,
- PostgreSQL full-text search,
- pgvector embeddings,
- aliases/exact identifier index,
- project/entity relationship table,
- application-side reranking.

## Retrieval boosts
- exact `project_id`/identifier,
- canonical current truth,
- direct evidence,
- accepted decisions,
- validated patterns/standards,
- project proximity,
- exact error signature.

Down-rank deprecated/superseded notes.
