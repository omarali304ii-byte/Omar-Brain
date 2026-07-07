---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [freshness, staleness, retrieval, recency]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Staleness and Freshness Policy

## Rule
Freshness is query-dependent. Newer is not always truer; a dated decision may be exactly correct for a historical question.

## Current-state query
Prefer:
1. runtime/repository evidence,
2. current-state project docs,
3. active canonical semantic memory,
4. latest approved decision.

## Historical query
Use date filters and preserve period-correct evidence.

## Stale marker
If `review_by` has passed or a source is known volatile, annotate retrieval rather than silently presenting it as current.
