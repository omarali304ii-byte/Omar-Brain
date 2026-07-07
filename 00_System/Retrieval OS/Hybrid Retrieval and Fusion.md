---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [hybrid-search, lexical-search, dense-retrieval, fusion]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Hybrid Retrieval and Fusion

## Candidate channels
1. lexical/BM25 or full-text,
2. dense embedding retrieval,
3. exact identifier index,
4. optional graph/entity expansion,
5. recency/authority boosts.

## Default
Retrieve independent candidate sets, fuse with a rank-based method such as RRF, then rerank the merged set.

## Boosts
Boost only from governed metadata:
- exact project/entity match,
- current canonical note,
- approved procedural rule,
- recent verified episode,
- strong provenance.

## Penalties
- stale volatile facts,
- superseded notes,
- low-confidence unsupported claims,
- inbox/raw captures,
- duplicate near-identical chunks.

## Explainability
A retrieval result should expose why it was selected: lexical hit, semantic match, metadata match, link expansion, recency, authority.
