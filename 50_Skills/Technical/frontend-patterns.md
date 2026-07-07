---
type: skill
status: active
created: 2026-07-07
skill_id: skill-frontend-patterns
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Frontend-Patterns/SKILL.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Frontend Patterns

## Purpose

Design maintainable React/Next.js frontends with composition, stable state boundaries, reusable hooks, accessible responsive UI, and measured performance.

## When to activate

- react component
- frontend architecture
- state management
- custom hook
- responsive ui
- form validation
- component composition
- react performance

## Inputs required

- User flow and UI goal
- Existing component tree
- State/data ownership
- Accessibility and responsive constraints

## Workflow

1. Map the user flow and component responsibilities first.
2. Prefer composition and explicit boundaries over giant components.
3. Choose the smallest state scope; avoid global state by default.
4. Use reusable hooks only for repeated behavioral logic, not cosmetic indirection.
5. Validate forms at boundaries with explicit schemas.
6. Audit loading, error, empty, permission, and offline/degraded states.
7. Measure rerenders and bundle/runtime cost before memoization or code splitting.
8. Verify keyboard, screen-reader, mobile, and responsive behavior.

## Outputs

- Component architecture
- State ownership map
- UI state matrix
- Accessibility/performance checks
- Implementation evidence

## Quality gates

- [ ] No giant mixed-responsibility component accepted without justification
- [ ] No inaccessible interaction-only divs
- [ ] No performance optimization without measurement
- [ ] All critical UI states covered

## Road signs

- When **Next.js-specific behavior** dominates → go to **Next.js Best Practices**.
- When **API/data boundary** dominates → go to **Backend Patterns**.
- When **performance issue** dominates → go to **Performance Optimization**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/Frontend-Patterns/SKILL.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
