---
type: standard
status: active
created: 2026-07-07
topics: [data, source-of-truth, schema]
ai_access: allowed
maturity: standard
---
# Data and Source of Truth Standard

Before major backend growth, define:
- authoritative entities,
- identifiers,
- relationships,
- lifecycle/state transitions,
- tenant/organization ownership,
- schema and migrations,
- transaction boundaries,
- idempotency keys,
- concurrency behavior,
- audit/event records,
- report/read-model sources,
- deletion/retention behavior,
- backup/recovery expectations.

## Rules
- database writes go through trusted business boundaries,
- schema changes use migrations,
- derived values are labeled as derived,
- snapshots preserve historical truth when later mutation would corrupt history,
- reports document their truth sources,
- no page owns a private version of shared business truth.
