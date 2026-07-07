---
type: skill
status: active
created: 2026-07-07
skill_id: skill-analytics-tracking
category: Analytics
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Analytics/analytics-tracking.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# Analytics Tracking

## Purpose

Design trustworthy event tracking around decisions and funnels, with explicit schemas, ownership, validation, and privacy boundaries.

## When to activate

- analytics tracking
- event tracking
- tracking plan
- ga4 events
- product analytics
- conversion tracking

## Inputs required

- Business questions
- User journey
- Decision metrics
- Data stack
- Privacy constraints

## Workflow

1. Start from decisions and questions, not available events
2. Define canonical events and properties
3. Specify identity, source, timestamp, and version rules
4. Map funnels and success metrics
5. Implement validation/debug plan
6. Document consent and PII exclusions
7. Monitor schema drift and duplicate events

## Outputs

- Tracking plan
- Event dictionary
- Funnel map
- Validation checklist

## Quality gates

- [ ] Every event answers a decision question
- [ ] PII policy is explicit
- [ ] Event names/properties are versioned
- [ ] Implementation has validation evidence

## Capability graph

### Related skills
- `skill-ab-test-setup`
- `skill-ab-test-analysis`
- `skill-page-cro`
- `skill-onboarding-cro`

### Handoff signs
- `skill-ab-test-setup`
- `skill-sql-queries`

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
- Source path: `WOM/11 Skills/Analytics/analytics-tracking.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
