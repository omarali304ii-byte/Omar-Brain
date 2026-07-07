---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [evaluation, regression, release-gate]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Regression Gate

Changes to the Brain runtime, retrieval, prompts, routing, or procedural memory must declare:
- baseline version,
- changed component,
- eval set,
- target metrics,
- allowed regressions,
- rollback path.

Block promotion when a critical safety/privacy case regresses even if average quality improves.
