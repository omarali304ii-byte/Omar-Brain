---
type: skill
status: active
created: 2026-07-07
skill_id: skill-user-personas
category: Research
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Research/user-personas.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# Evidence-Based User Personas

## Purpose

Create decision-useful personas from repeated evidence rather than fictional demographics and decorative biographies.

## When to activate

- user persona
- customer persona
- buyer persona
- persona research
- build personas

## Inputs required

- Research corpus
- Segmentation basis
- JTBD
- Behavior/pain evidence
- Confidence limits

## Workflow

1. Cluster evidence by meaningful behavior/problem
2. Require sufficient independent data before naming a segment
3. Capture JTBD, triggers, pains, outcomes, objections, alternatives, vocabulary
4. Separate observed facts from inference
5. Record counterexamples and segment overlap
6. Define how persona changes product/marketing decisions

## Outputs

- Persona cards
- Evidence map
- Confidence labels
- Decision implications

## Quality gates

- [ ] No invented demographics
- [ ] Every material claim traces to evidence
- [ ] Persona changes a decision
- [ ] Segments are not averaged into one generic user

## Capability graph

### Related skills
- `skill-customer-research`
- `skill-sentiment-analysis`
- `skill-product-marketing-context`
- `skill-value-proposition`

### Handoff signs
- `skill-value-proposition`
- `skill-product-strategy`

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
- Source path: `WOM/11 Skills/Research/user-personas.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
