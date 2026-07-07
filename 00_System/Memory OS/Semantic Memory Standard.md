---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [memory, semantic-memory, canonical-truth, provenance]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Semantic Memory Standard

## Purpose
Store durable facts, entity state, stable preferences, project truth, and reusable summaries that future agents may safely rely on.

## Admission test
A candidate may become semantic memory only when all answers are satisfactory:
1. Will this likely matter in a future task?
2. Is it stable enough to outlive the current chat/run?
3. Is there a canonical owner note?
4. Is provenance available?
5. Is confidence explicit?
6. Were contradictions checked?
7. Is the claim safe under `ai_access` policy?

## Required fields when explicitly memory-bearing
```yaml
memory_class: semantic
confidence: high|medium|low
source_kind: official|primary|repository|runtime|test|conversation|self|secondary|ai
sources: []
derived_from: []
last_validated: YYYY-MM-DD
review_by: YYYY-MM-DD
```

## Canonical summary contract
A semantic note should expose:
- **Canonical summary** — short present-tense truth,
- **Stable facts** — atomic assertions,
- **Open uncertainties** — unresolved or low-confidence claims,
- **Evidence** — source and episode links,
- **Supersession** — what this replaces or what replaced it.

## Atomicity rule
Prefer small assertions with independent provenance over broad prose that mixes fact, inference, and opinion.

Bad:
> Project X is healthy, scalable, secure, and the client loves it.

Better:
- Production smoke passed on date X. [[Evidence]]
- Load test sustained Y. [[Evidence]]
- Security review status: incomplete.
- Client feedback: positive on workflow A. [[Meeting]]

## Update rule
- update the existing canonical note,
- preserve the old claim through Git/episode/evidence,
- use `supersedes` / `superseded_by` for meaningful conflicts,
- never create `Thing New.md`, `Thing Final.md`, `Thing v2.md` as competing truth.

## Prohibited writes
- unsupported AI conclusions,
- temporary task state,
- raw transcripts,
- secrets,
- copied facts with no provenance,
- personal data that has no future task value.
