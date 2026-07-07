---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 05_data]
ai_access: allowed
---
# Data Integrity Migration and Recovery Standard

## Data model checklist

- authoritative owner
- identifiers
- nullability
- uniqueness
- foreign keys
- checks
- tenant ownership
- timestamps and timezone semantics
- money/units
- lifecycle/deletion
- audit/history

## Migration gate

Before production:
- lock/rewrite risk
- old/new app compatibility
- backfill strategy
- restart/resume behavior
- rollback vs roll-forward
- representative data test
- backup/restore impact

## Recovery truth

A backup counts only when restore is tested and RPO/RTO are understood.
