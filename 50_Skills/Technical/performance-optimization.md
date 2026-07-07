---
type: skill
status: active
created: 2026-07-07
skill_id: skill-performance-optimization
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Performance-Optimization/SKILL.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Performance Optimization

## Purpose

Improve performance through measure → identify → fix → verify → guard, never by guessing.

## When to activate

- performance
- slow app
- core web vitals
- lcp
- inp
- cls
- bundle size
- n+1
- latency
- profiling

## Inputs required

- User-visible symptom or SLO
- Baseline metrics
- Environment/device/network
- Recent regression context

## Workflow

1. Establish baseline with real or reproducible measurements.
2. Separate frontend, backend, database, network, and third-party contributors.
3. Identify the dominant bottleneck before changing code.
4. Apply the smallest targeted fix.
5. Measure again with the same method.
6. Check regressions in correctness and adjacent metrics.
7. Add a budget or monitor so the issue does not silently return.

## Outputs

- Baseline
- Bottleneck evidence
- Patch plan
- Before/after measurements
- Regression guard

## Quality gates

- [ ] No optimization without baseline
- [ ] No claimed win without before/after measurement
- [ ] No list endpoint without bounded pagination at scale
- [ ] No Core Web Vitals claim without measured evidence

## Road signs

- When **React rendering** dominates → go to **Frontend Patterns**.
- When **database/API** dominates → go to **Backend Patterns**.
- When **release budgets** dominates → go to **Production Readiness OS**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/Performance-Optimization/SKILL.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
