---
type: skill
status: active
created: 2026-07-07
skill_id: skill-user-stories
category: Execution
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Execution/user-stories.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# User Stories

## Purpose

Translate validated needs into small, testable user stories with observable acceptance criteria and explicit non-goals.

## When to activate

- user stories
- write user story
- acceptance criteria
- feature stories

## Inputs required

- User/actor
- Need/JTBD
- Outcome
- Constraints
- Evidence

## Workflow

1. Confirm the need is understood before writing
2. Write story around outcome, not implementation
3. Add concrete acceptance criteria
4. Add negative/edge cases
5. Separate non-goals and assumptions
6. Split stories that cannot be independently verified
7. Hand off to test scenarios

## Outputs

- User stories
- Acceptance criteria
- Edge cases
- Assumptions/non-goals

## Quality gates

- [ ] Story is independently testable
- [ ] Acceptance criteria are observable
- [ ] Implementation detail is not mistaken for user value
- [ ] Edge cases exist

## Capability graph

### Related skills
- `skill-create-prd`
- `skill-test-scenarios`
- `skill-sprint-plan`

### Handoff signs
- `skill-test-scenarios`
- `skill-sprint-plan`

## AI road signs

- **Enter here when:** the request matches the activation triggers and this skill owns the primary outcome.
- **Do not stay here when:** a handoff skill owns a distinct next responsibility.
- **Context rule:** load this skill first; load support skills only through the graph or a selected bundle.
- **Completion proof:** output exists + quality gates checked + evidence attached to a project or episode when work is real.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported/catalog-derived capability is guidance, not proof of Omar-specific mastery.
- Promotion requires [[00_System/Skill OS/Skill Maturity Ladder]] and evidence in the Skill Evidence Ledger.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/Execution/user-stories.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
