---
type: system
status: active
created: 2026-07-07
topics: [skills, evidence, maturity]
ai_access: allowed
---
# Skill Evidence Ledger

Canonical append-only machine ledger: `00_System/Skill OS/skill-evidence.jsonl`.

Each record contains:
- timestamp,
- skill_id,
- project_or_episode,
- verdict (`SUCCESS`, `PARTIAL`, `FAIL`, `INVALIDATED`),
- note,
- optional evidence path.

## Rules

1. Evidence never upgrades maturity automatically.
2. Failed applications are valuable and must not be deleted.
3. Promotion review reads both successes and failures.
4. `S5_PRODUCTION_PROVEN` requires real production evidence, not a local demo.
5. `S6_ADAPTIVE` requires documented improvement of the skill from repeated outcomes.
