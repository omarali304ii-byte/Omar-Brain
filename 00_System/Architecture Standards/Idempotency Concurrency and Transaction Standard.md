---
type: standard
status: active
created: 2026-07-07
topics: [idempotency, concurrency, transactions]
ai_access: allowed
maturity: standard
---
# Idempotency, Concurrency, and Transaction Standard

For any write path ask:
1. Can the request be retried?
2. Can the same event arrive twice?
3. Can two actors update at once?
4. Can half the operation succeed?
5. Can an external call succeed while local commit fails?

## Required design when relevant
- stable idempotency key,
- unique constraints/dedup record,
- transaction boundary,
- locking or optimistic concurrency rule,
- retry semantics,
- outbox/inbox or compensating behavior for distributed effects,
- observable failure state.
