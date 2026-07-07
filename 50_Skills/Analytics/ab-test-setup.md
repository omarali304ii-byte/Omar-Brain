---
type: skill
status: active
created: 2026-07-07
skill_id: skill-ab-test-setup
category: Analytics
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Analytics/ab-test-setup.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# A/B Test Setup

## Purpose

Design experiments with a falsifiable hypothesis, primary metric, guardrails, sample plan, exposure logic, and decision rule.

## When to activate

- ab test setup
- a/b test
- experiment design
- split test
- test hypothesis

## Inputs required

- Problem/evidence
- Hypothesis
- Population
- Primary metric
- Guardrails
- Expected effect

## Workflow

1. State causal hypothesis and mechanism
2. Choose one primary metric and guardrails
3. Define unit of randomization and exposure
4. Estimate sample/time requirements with explicit assumptions
5. Predefine exclusions and stopping/decision rules
6. Check instrumentation and sample-ratio mismatch monitoring
7. Launch only after QA

## Outputs

- Experiment brief
- Metric definitions
- Exposure plan
- Decision rule
- QA checklist

## Quality gates

- [ ] Hypothesis is falsifiable
- [ ] Primary metric chosen before results
- [ ] No peeking-based arbitrary stop rule
- [ ] Guardrails protect harm/regression

## Capability graph

### Related skills
- `skill-analytics-tracking`
- `skill-ab-test-analysis`
- `skill-page-cro`
- `skill-marketing-psychology`

### Handoff signs
- `skill-ab-test-analysis`

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
- Source path: `WOM/11 Skills/Analytics/ab-test-setup.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
