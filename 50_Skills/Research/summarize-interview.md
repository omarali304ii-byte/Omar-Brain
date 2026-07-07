---
type: skill
status: active
created: 2026-07-07
skill_id: skill-summarize-interview
category: Research
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Research/summarize-interview.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# Summarize Interview

## Purpose

Convert an interview transcript into source-linked observations, quotes, needs, triggers, contradictions, and open questions without flattening uncertainty.

## When to activate

- summarize interview
- analyze interview transcript
- customer interview summary
- user interview synthesis

## Inputs required

- Transcript/notes
- Participant context
- Research objective
- Consent/privacy constraints

## Workflow

1. Preserve source identity and timestamps where available
2. Separate observation, quote, inference, and recommendation
3. Extract JTBD, trigger, pain, outcome, alternative, objection, vocabulary
4. Flag contradictions and unclear passages
5. Avoid generalizing from one participant
6. Feed structured evidence into cross-interview synthesis

## Outputs

- Interview summary
- Evidence table
- Quote bank
- Open questions

## Quality gates

- [ ] Quotes are verbatim and traceable
- [ ] Inference is labeled
- [ ] No population claim from single interview
- [ ] Sensitive data minimized

## Capability graph

### Related skills
- `skill-interview-script`
- `skill-customer-research`
- `skill-user-personas`

### Handoff signs
- `skill-customer-research`

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
- Source path: `WOM/11 Skills/Research/summarize-interview.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
