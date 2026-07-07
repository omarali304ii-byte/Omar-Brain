---
type: system
status: active
created: 2026-07-07
topics: [failure, debugging, retrieval]
ai_access: allowed
---
# Failure Signature System

A failure signature is optimized for future retrieval.

## Capture exact fields
- exact error text/code,
- normalized signature,
- layer,
- environment,
- triggering action,
- root cause if verified,
- diagnostic that proved cause,
- verified fix,
- regression check,
- affected projects/versions,
- evidence links.

## Retrieval
Use hybrid search:
- exact lexical match for error strings/codes,
- semantic search for paraphrased symptoms,
- metadata filter by stack/project/layer,
- boost validated fixes.

## Rule
Do not claim a root cause merely because a workaround made the symptom disappear.
