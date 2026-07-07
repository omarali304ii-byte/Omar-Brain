---
type: architecture-profile
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, architecture-profile]
ai_access: allowed
profile_id: web-expert-v1
---
# Web Expert v1 Architecture Profile

## Inherits
- [[software-standard-v1]]
- [[Web Development Expert System]]

## Required project packet

```text
13_Web/
├── 00_WEB_PROFILE.md
├── 01_APPLICABILITY_MATRIX.md
├── 02_THREAT_MODEL.md
├── 03_FRONTEND_CONTRACT.md
├── 04_BACKEND_CONTRACT.md
├── 05_HTTP_API_CONTRACT.md
├── 06_DATA_INTEGRITY_PLAN.md
├── 07_ACCESSIBILITY_PLAN.md
├── 08_PERFORMANCE_BUDGET.md
├── 09_SEO_DISCOVERABILITY.md
├── 10_OBSERVABILITY_SLO.md
├── 11_WEB_TEST_MATRIX.md
├── 12_RELEASE_GATES.md
├── 13_BROWSER_SUPPORT.md
└── 14_SUPPLY_CHAIN.md
```

Conditional sections may be marked not applicable, but files remain so the decision is visible.

## Default targets
- ASVS Level 2 for most production apps
- WCAG 2.2 AA for user-facing web
- p75 LCP <=2.5s, INP <=200ms, CLS <=0.1 where field measurement is available

## Agent behavior
Load applicable rules by rule ID; never copy the entire registry into context when a narrower set is enough.
