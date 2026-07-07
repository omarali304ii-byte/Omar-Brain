---
type: standard
status: active
created: 2026-07-07
topics: [mock-data, testing, architecture]
ai_access: allowed
maturity: standard
---
# Mock Data Isolation Standard

Mock/demo data must never masquerade as connected or production truth.

## Rules
- mocks live in explicit mock/test/demo boundaries,
- production composition must not silently fall back to fake data,
- deleting mock adapters should break only mock wiring, not domain code,
- fake external assets/conversations/orders are labeled as fake,
- completion evidence cannot rely on fabricated connected state.
