---
type: skill
status: active
created: 2026-07-07
skill_id: skill-wordpress-troubleshooting
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/WOM-Custom/agency/wordpress-troubleshooting.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# WordPress Troubleshooting

## Purpose

Diagnose WordPress, WooCommerce, Elementor, plugin/theme, PHP, cache, and hosting failures safely while preserving rollback options.

## When to activate

- wordpress problem
- woocommerce problem
- elementor problem
- plugin conflict
- theme conflict
- wordpress hosting
- wp error

## Inputs required

- Exact symptom
- Site/hosting context
- Recent changes
- Logs/errors
- Access level and backup status

## Workflow

1. Freeze destructive changes and confirm backup/restore path.
2. Reproduce and capture exact symptom.
3. Check logs, PHP/runtime, disk, database, cache, and network basics.
4. Isolate plugin/theme conflicts with the least invasive method.
5. Check Elementor/WooCommerce-specific generated assets, templates, hooks, cron, and database state when relevant.
6. Apply one targeted change at a time.
7. Verify original symptom plus storefront/admin critical paths.
8. Document root cause, fix, rollback, and prevention.

## Outputs

- Root-cause hypothesis/evidence
- Safe repair steps
- Rollback path
- Verification checklist

## Quality gates

- [ ] No blind plugin deletion
- [ ] No production edit without backup/rollback awareness
- [ ] No cache purge used as proof of root cause
- [ ] No fixed claim without reproduction and re-test

## Road signs

- When **full web release** dominates → go to **Production Readiness OS**.
- When **server risk** dominates → go to **Security and Hardening**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/WOM-Custom/agency/wordpress-troubleshooting.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
