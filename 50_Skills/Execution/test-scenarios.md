---
type: skill
status: active
created: 2026-07-07
skill_id: skill-test-scenarios
category: Execution
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Execution/test-scenarios.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Test Scenarios

## Purpose

Turn requirements and user stories into executable scenarios with starting conditions, roles, steps, expected outcomes, edges, and failures.

## When to activate

- test scenarios
- qa test cases
- acceptance test
- test plan
- edge cases
- validation scenarios

## Inputs required

- Requirement/user story
- Acceptance criteria
- System state/data setup
- User roles/permissions
- Risk context

## Workflow

1. Map each acceptance criterion to at least one positive scenario.
2. Add starting conditions and exact role/permissions.
3. Write observable steps and expected outcomes.
4. Add boundary, invalid input, permission, concurrency, retry, and failure scenarios as applicable.
5. Prioritize by business and safety risk.
6. Link scenarios to automation/manual evidence.

## Outputs

- Scenario matrix
- Expected outcomes
- Edge/failure coverage
- Traceability to acceptance criteria

## Quality gates

- [ ] Every acceptance criterion covered
- [ ] Expected outcomes observable, not vague
- [ ] Protected operations include unauthorized/forbidden tests
- [ ] Critical failures include recovery behavior

## Road signs

- When **release proof** dominates → go to **Quality Gate Matrix**.
- When **security cases** dominates → go to **Security and Hardening**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/Execution/test-scenarios.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
