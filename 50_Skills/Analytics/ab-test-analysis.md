---
type: skill
status: active
created: 2026-07-07
skill_id: skill-ab-test-analysis
category: Analytics
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Analytics/ab-test-analysis.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# A/B Test Analysis

## Purpose

Analyze experiment results against the predeclared design, uncertainty, guardrails, and practical significance.

## When to activate

- analyze ab test
- experiment results
- a/b results
- statistical significance
- split test analysis

## Inputs required

- Experiment design
- Exposure data
- Outcome data
- Primary metric
- Guardrails
- Decision rule

## Workflow

1. Verify experiment integrity and sample ratio
2. Check exposure, exclusions, missingness, and instrumentation
3. Compute effect and uncertainty for primary metric
4. Review guardrails and segment heterogeneity cautiously
5. Separate statistical from practical significance
6. Check novelty/time effects where relevant
7. Recommend ship, iterate, stop, or rerun with evidence

## Outputs

- Integrity checks
- Effect estimates
- Guardrail analysis
- Decision recommendation
- Caveats

## Quality gates

- [ ] Design is read before results
- [ ] Primary metric not changed post hoc
- [ ] Integrity issues are surfaced first
- [ ] Causal claim matches experiment quality

## Capability graph

### Related skills
- `skill-ab-test-setup`
- `skill-analytics-tracking`
- `skill-sql-queries`

### Handoff signs
- `skill-product-strategy`
- `skill-page-cro`

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
- Source path: `WOM/11 Skills/Analytics/ab-test-analysis.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
