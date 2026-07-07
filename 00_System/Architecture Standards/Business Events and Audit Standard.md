---
type: standard
status: active
created: 2026-07-07
topics: [business-events, audit, observability]
ai_access: allowed
maturity: standard
---
# Business Events and Audit Standard

Important business actions must create durable evidence appropriate to the project.

## Event should answer
- what happened,
- to which entity,
- in which tenant/organization,
- who/what caused it,
- when,
- correlation/idempotency identity,
- relevant old/new state or references.

## Use cases
- audit,
- reports,
- sync,
- debugging,
- automation,
- AI context,
- data-health checks.

Do not confuse technical logs with business events. Technical logs explain system behavior; business events record domain facts.
