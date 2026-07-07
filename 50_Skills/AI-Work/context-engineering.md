---
type: skill
status: active
created: 2026-07-07
skill_id: skill-context-engineering
category: AI-Work
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Context-Engineering/context-engineering.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Context Engineering

## Purpose

Engineer the full context an AI needs to complete work end to end: requirements, examples, docs, constraints, patterns, validation, and failure handling.

## When to activate

- context engineering
- prp
- product requirements prompt
- ai coding context
- feature request
- generate prp
- execute prp

## Inputs required

- Feature/problem request
- Existing codebase patterns
- Examples to follow/avoid
- Relevant official docs
- Constraints/gotchas
- Validation commands

## Workflow

1. Write a specific feature request with feature, examples, documentation, and other considerations.
2. Inspect the actual codebase for conventions and neighboring patterns.
3. Collect primary documentation and known gotchas.
4. Create an implementation blueprint with context references, ordered steps, tests, and failure handling.
5. Execute stepwise with validation after each meaningful batch.
6. Run complete success criteria and repair until satisfied or explicitly blocked.

## Outputs

- Context packet/PRP
- Implementation plan
- Validation gates
- Evidence-backed result

## Quality gates

- [ ] No invented paths or APIs
- [ ] No implementation plan detached from actual repo patterns
- [ ] No done claim before success criteria pass
- [ ] Official/primary docs preferred for unstable technical facts

## Road signs

- When **persistent complex execution** dominates → go to **Planning with Files**.
- When **quality proof** dominates → go to **Test Scenarios**.
- When **production** dominates → go to **Production Readiness OS**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/Context-Engineering/context-engineering.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
