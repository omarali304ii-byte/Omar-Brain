---
type: skill
status: active
created: 2026-07-07
skill_id: skill-nextjs-best-practices
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/NextJS-Best-Practices/SKILL.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Next.js Best Practices

## Purpose

Build and review Next.js applications using correct file conventions, server/client boundaries, async APIs, data patterns, metadata, optimization, and self-hosting rules.

## When to activate

- next.js
- nextjs
- app router
- server component
- rsc
- route handler
- hydration
- suspense
- metadata
- self hosting next

## Inputs required

- Exact Next.js version
- Project structure or target files
- Runtime/deployment target
- Observed error or feature goal

## Workflow

1. Detect framework version and App/Pages Router before giving advice.
2. Inspect existing conventions before creating files.
3. Check React Server Component boundaries and serializable props.
4. Use route handlers, server actions, and server components only where their responsibilities fit.
5. Check async params/searchParams/cookies/headers behavior for the detected version.
6. Audit data waterfalls, Suspense boundaries, metadata, images, fonts, bundling, hydration, and self-hosting constraints.
7. Run project-native lint, typecheck, build, and targeted runtime checks.

## Outputs

- Version-aware implementation or review
- List of violated conventions
- Minimal patch plan
- Verification evidence

## Quality gates

- [ ] No advice that assumes a different Next.js major version
- [ ] No client/server boundary violation
- [ ] No completion claim without project-native build/test evidence
- [ ] Production changes must hand off to Production Readiness OS

## Road signs

- When **backend/data architecture** dominates → go to **Backend Patterns**.
- When **security risk** dominates → go to **Security and Hardening**.
- When **production readiness** dominates → go to **Production Readiness OS**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/NextJS-Best-Practices/SKILL.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
