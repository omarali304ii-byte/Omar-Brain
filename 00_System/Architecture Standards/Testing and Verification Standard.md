---
type: standard
status: active
created: 2026-07-07
topics: [testing, verification, quality]
ai_access: allowed
maturity: standard
---
# Testing and Verification Standard

Testing follows risk and architecture.

## Minimum thinking
- unit tests for dense pure rules,
- integration tests for DB/repository/transaction behavior,
- contract tests for external/internal boundaries where valuable,
- end-to-end tests for critical user journeys,
- manual/runtime verification for behavior automation cannot prove,
- regression test for meaningful bug fixes when practical.

## Permanent story
For complex business systems, maintain at least one stable end-to-end story that proves core truth across layers.

## Rule
A passing build is not proof of feature correctness. Evidence must match acceptance criteria.
