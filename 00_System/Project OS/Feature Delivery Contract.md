---
type: system
status: active
created: 2026-07-07
topics: [feature, delivery, architecture]
ai_access: allowed
---
# Feature Delivery Contract

Before implementing a non-trivial feature, determine:
1. business/user outcome,
2. user flow,
3. source of truth,
4. data model changes,
5. service/use-case behavior,
6. permission rules,
7. transaction and idempotency behavior,
8. repository/gateway changes,
9. events/audit/observability,
10. API/UI contract,
11. edge cases and failure paths,
12. test strategy,
13. implementation batches,
14. documentation updates.

A UI screen is not a feature architecture. Connected backend/data work must not be designed page by page in isolation.
