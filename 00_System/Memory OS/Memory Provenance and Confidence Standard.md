---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [provenance, confidence, memory, trust]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Memory Provenance and Confidence Standard

## Evidence classes
From strongest to weakest for a given claim:
1. verified runtime/test evidence,
2. canonical repository/database state,
3. official/primary source,
4. explicit user statement about their own intent/preferences,
5. approved decision record,
6. reliable secondary source,
7. conversation recollection,
8. AI inference.

Strength depends on claim type. A user's intent is stronger than a repository for “what Omar wants”; runtime is stronger than memory for “what code currently does”.

## Confidence
- `high`: multiple consistent strong sources or direct verified state,
- `medium`: one strong source or several consistent weaker sources,
- `low`: incomplete, inferred, stale, or contradictory.

## Rule
Confidence is not a substitute for provenance. Always preserve both.
