# Quality Engineer Domain Model

## Freshness
```yaml
last_verified_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
last_verified_at: 2026-07-07
verification_scope: stored repo inspection and static verification; recheck before live claim
freshness: partial
```

## Current model
- Many useful static/test scripts exist and stored typecheck/lint/build/schema checks passed.
- DB-backed tests were intentionally skipped because configured DB was remote Supabase; safe disposable DB proof is missing.
- Current production blockers lack several required adversarial regressions and CI does not run all relevant existing scripts.

## Model maintenance rule
When owned reality changes, rewrite this present-tense model and link evidence. Do not append a diary.
