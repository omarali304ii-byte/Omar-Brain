---
type: standard
status: active
created: 2026-07-07
topics: [architecture, software, standard]
ai_access: allowed
maturity: standard
---
# Universal Software Architecture Baseline

Default for Omar's software projects unless an approved ADR says otherwise.

## Primary flow

```text
UI
  ↓
action / controller / route handler
  ↓
service / use case
  ↓
permission / policy check
  ↓
transaction boundary
  ↓
repository / external gateway
  ↓
database / provider
  ↓
business event / audit / observability
  ↓
response / projection
```

## Invariants
- UI never writes directly to DB.
- Controllers coordinate transport; they do not become the business brain.
- Services/use cases enforce business rules.
- Repositories persist/read; they do not decide business policy.
- Permission checks happen at trusted boundaries.
- Transactions cover atomic state change.
- External APIs sit behind gateways/adapters.
- Important business actions create durable evidence.
- Reports read explicit truth sources, not convenient accidental tables.
- Data architecture is designed across flows, not page by page.

## Default deployment shape
Prefer a modular monolith before microservices unless independent scaling, isolation, ownership, or operational evidence justifies distribution.

## Project override
Any deviation must use [[00_System/Project OS/Architecture Override Protocol]].
