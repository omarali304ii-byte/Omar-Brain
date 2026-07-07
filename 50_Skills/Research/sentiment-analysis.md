---
type: skill
status: active
created: 2026-07-07
skill_id: skill-sentiment-analysis
category: Research
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Research/sentiment-analysis.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# Sentiment Analysis

## Purpose

Analyze sentiment and themes without collapsing nuanced feedback into a single positive/negative score.

## When to activate

- sentiment analysis
- analyze reviews
- customer sentiment
- feedback sentiment
- comment sentiment

## Inputs required

- Text corpus
- Source/date metadata
- Segment context
- Question to answer

## Workflow

1. Clean and deduplicate corpus while preserving provenance
2. Classify sentiment with uncertainty and mixed cases
3. Extract themes, intensity, and representative evidence
4. Segment by source/customer type/time
5. Check sampling bias and sarcasm/context failures
6. Compare quantitative distribution with qualitative examples

## Outputs

- Sentiment distribution
- Theme clusters
- Representative excerpts/references
- Bias and confidence notes

## Quality gates

- [ ] Mixed/uncertain cases are allowed
- [ ] Source bias is discussed
- [ ] Themes have evidence
- [ ] No global conclusion from tiny samples

## Capability graph

### Related skills
- `skill-customer-research`
- `skill-user-personas`
- `skill-competitor-analysis`

### Handoff signs
- `skill-customer-research`
- `skill-churn-prevention`

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
- Source path: `WOM/11 Skills/Research/sentiment-analysis.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
