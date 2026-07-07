---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [chunking, markdown, retrieval, indexing]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Structure-Aware Chunking Standard

## Rule
Structure first, token size second.

## Hard boundaries
Preserve when practical:
- headings and heading paths,
- fenced code blocks,
- tables,
- callouts,
- task lists,
- ADR/decision sections,
- speaker turns,
- frontmatter metadata.

## Default targets
- child retrieval chunk: 400–900 tokens,
- overlap: 10–15% only when boundaries require it,
- parent: heading section or whole short note,
- maintain `doc_id`, `chunk_id`, path, heading path, links, dates, hash.

## Special cases
- code-heavy notes: chunk by symbol/module section where possible,
- error logs: keep exact signature with immediate surrounding context,
- project current state: prefer section-level chunks without stale historical appendices,
- long research: use hierarchical parent-child chunks.

## Context expansion
Retrieve small children; expand to parent/neighbor only after relevance is established.
