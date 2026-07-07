---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 08_performance]
ai_access: allowed
---
# Core Web Vitals and Performance Budget Standard

## Default user-experience targets
At p75 field data, segmented mobile and desktop:
- LCP <= 2.5s
- INP <= 200ms
- CLS <= 0.1

## Budget dimensions
- route JS transferred/executed
- CSS
- images
- fonts
- third-party scripts
- requests
- server latency
- API fan-out

Budgets are project-specific. Baseline first, then prevent unexplained regression.

## Measurement hierarchy
- field/RUM for user truth
- lab traces for diagnosis
- bundle/network analysis for cause
