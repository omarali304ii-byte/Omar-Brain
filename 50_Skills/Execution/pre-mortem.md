---
type: skill
status: active
created: 2026-07-07
skill_id: skill-pre-mortem
category: Execution
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Execution/pre-mortem.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Pre-Mortem

## Purpose

Assume a plan failed, work backward to expose real risks, overblown concerns, and unspoken worries before launch.

## When to activate

- pre mortem
- premortem
- what could go wrong
- launch risk analysis
- stress test plan

## Inputs required

- PRD/plan
- Launch scope
- Assumptions
- Timeline
- Cross-functional constraints

## Workflow

1. Imagine credible failure after launch
2. Generate failures across product, engineering, operations, security, market, and adoption
3. Classify Tigers (real), Paper Tigers (overblown), Elephants (under-discussed)
4. Classify real risks as launch-blocking, fast-follow, or track
5. Create mitigation, owner, trigger, and deadline for blockers
6. Feed blockers into project gaps and production hardening

## Outputs

- Risk register
- Tiger/Paper Tiger/Elephant classification
- Mitigation plan
- Launch-blocking list

## Quality gates

- [ ] Risks are concrete and falsifiable
- [ ] Blockers have owners/actions
- [ ] Unspoken assumptions are surfaced
- [ ] Production blockers enter the real gap queue

## Capability graph

### Related skills
- `skill-launch-strategy`
- `skill-product-strategy`
- `skill-create-prd`
- `skill-security-and-hardening`

### Handoff signs
- `skill-launch-strategy`
- `skill-security-and-hardening`

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
- Source path: `WOM/11 Skills/Execution/pre-mortem.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
