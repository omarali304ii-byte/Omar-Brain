---
type: skill
status: active
created: 2026-07-07
skill_id: skill-sql-queries
category: Analytics
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Analytics/sql-queries.md"
provenance_mode: catalog-derived-adapted
ai_access: allowed
---
# SQL Queries

## Purpose

Write auditable SQL for analysis with explicit grain, joins, filters, time windows, null handling, and validation checks.

## When to activate

- sql query
- write sql
- postgres query
- analytics sql
- cohort query
- database analysis

## Inputs required

- Schema
- Question
- Expected grain
- Time window
- Database dialect
- Known data quality issues

## Workflow

1. Restate the metric and output grain
2. Inspect schema/keys before joining
3. Build query in verifiable stages
4. Use explicit time zone and date boundaries
5. Prevent fan-out and double counting
6. Validate row counts and edge cases
7. Explain assumptions and performance considerations

## Outputs

- SQL query
- Metric definition
- Validation queries
- Assumptions

## Quality gates

- [ ] Output grain is explicit
- [ ] Joins cannot silently multiply facts
- [ ] Time zone/window is explicit
- [ ] Query includes validation approach

## Capability graph

### Related skills
- `skill-analytics-tracking`
- `skill-ab-test-analysis`
- `skill-backend-patterns`
- `skill-database-migrations`

### Handoff signs
- `skill-performance-optimization`

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
- Source path: `WOM/11 Skills/Analytics/sql-queries.md`
- Adaptation: normalized into Omar Brain contracts, road signs, evidence gates, and graph handoffs.
