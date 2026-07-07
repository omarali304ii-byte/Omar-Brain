---
type: skill
status: active
created: 2026-07-07
skill_id: skill-database-migrations
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Database-Migrations/SKILL.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Database Migrations

## Purpose

Make production database changes safe, explicit, replayable, and reversible through migration files and expand-migrate-contract patterns.

## When to activate

- database migration
- schema change
- prisma migrate
- drizzle migrate
- zero downtime migration
- backfill
- add column

## Inputs required

- Current schema and database engine
- Target schema
- Table sizes/traffic
- Deployment strategy
- Rollback constraints

## Workflow

1. Record current schema and exact migration state.
2. Separate schema changes from data backfills.
3. Classify lock and downtime risk.
4. Prefer expand → dual compatibility → backfill → switch reads/writes → contract.
5. Use concurrent/non-blocking index creation where supported.
6. Batch large data changes with checkpoints.
7. Test on production-like volume and timing.
8. Document rollback/recovery and verify data consistency.

## Outputs

- Migration sequence
- Risk/lock analysis
- Backfill plan
- Compatibility window
- Rollback/recovery evidence

## Quality gates

- [ ] No manual production schema mutation
- [ ] No deployed migration edited in place
- [ ] No large blocking change without explicit evidence
- [ ] No destructive contract step before app compatibility proof

## Road signs

- When **backend code compatibility** dominates → go to **Backend Patterns**.
- When **release** dominates → go to **Production Readiness OS**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/Database-Migrations/SKILL.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
