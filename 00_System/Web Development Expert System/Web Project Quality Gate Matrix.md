---
type: checklist
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, quality-gates, release]
ai_access: allowed
---
# Web Project Quality Gate Matrix

| Gate | Design | Code | Merge | Release | Operate |
|---|---:|---:|---:|---:|---:|
| Project/profile classification | ✓ | | | | |
| Applicability matrix | ✓ | update | verify | verify | review |
| Requirements/acceptance | ✓ | ✓ | ✓ | ✓ | |
| Architecture/source of truth | ✓ | ✓ | ✓ | | drift review |
| Threat model | risk-based | update | critical review | verify | learn |
| Authorization matrix | ✓ | ✓ | test | test | monitor |
| Data/migrations | ✓ | ✓ | integration | migration gate | reconcile |
| API contracts | ✓ | ✓ | contract | deployed smoke | monitor |
| Accessibility | plan | semantic checks | automated+manual | critical journeys | feedback |
| Performance | budget | measure | regression | deployed check | field p75 |
| SEO | scope | metadata/render | crawl test | indexability check | monitor |
| Tests | strategy | execute | full required set | smoke | synthetic/RUM |
| Observability | plan | instrument | verify locally | verify backend | alert/SLO |
| Supply chain | target | dependencies | CI checks | provenance | patch |
| Privacy | data map | minimize | review | verify | retention |
| Release/recovery | plan | | preflight | execute | post-release |
| Evidence pack | | accumulate | complete | final | archive |

## Gate policy

- Any applicable blocker failure stops release.
- Critical failure stops release unless explicit risk acceptance names owner, reason, expiry and containment.
- A scanner being green cannot override missing manual/runtime evidence.
