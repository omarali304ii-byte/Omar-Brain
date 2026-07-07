---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, expert-system, architecture]
ai_access: allowed
system_id: web-expert-v1
---
# Web Development Expert System

> This is the governed web-engineering layer of Omar Brain. It is not a bag of tips. It defines how an AI agent must design, inspect, build, test, release, operate and learn from web systems.

## Mission

For any web project, make expert behavior deterministic:

```text
resolve project
→ load project truth
→ inspect real repo/runtime
→ classify web profile
→ compute applicable rules
→ identify risks and blast radius
→ build coherent task graph
→ implement through trusted boundaries
→ run required gates
→ capture evidence
→ repair failures
→ release deliberately
→ monitor
→ write validated learning back to Brain
```

## Non-negotiable idea

**A rule is not satisfied because code exists. A rule is satisfied only by evidence appropriate to the rule.**

## Main assets

- [[Web Expert Operating Manual]]
- [[Web Rule Registry]]
- [[Web Applicability Engine]]
- [[Web Definition of Done]]
- [[Web Project Quality Gate Matrix]]
- [[Web Expert Source Registry]]
- [[Web Agent Master Protocol]]
- `web-rules.json` — machine-readable rules
- `web-project-audit.mjs` — static repository evidence helper

## Default targets

- Security: declare ASVS target; default Level 2 for most production web applications.
- Accessibility: WCAG 2.2 AA for user-facing web unless stricter target applies.
- Performance: p75 field targets LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 where traffic allows.
- Reliability: critical production journeys get explicit SLIs/SLOs according to impact.
- API: explicit HTTP semantics; stable error contracts; OpenAPI for externally consumed or multi-client APIs.
- Supply chain: lockfiles, deterministic CI, least-privilege CI, dependency ownership; higher-assurance projects map to SLSA.

## Rule hierarchy

1. Law/regulation/contract and explicit safety constraints
2. Project-specific approved decisions
3. Brain Constitution
4. Web Expert blocker/critical rules
5. Architecture profile
6. Major/minor rules and guidance

Conflicts must be recorded, never silently ignored.

## Important limitation

This system is deliberately broad but cannot freeze the web forever. Browser behavior, security guidance, standards and framework versions change. Source status and `checked` dates are part of the system; agents must re-check time-sensitive rules before high-risk decisions.
