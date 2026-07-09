# Data and Truth Rules

## Durable project rules
- Lead visibility is not automatically intelligence evidence visibility.
- Provider identity is not canonical customer identity.
- External side-effect outcome and local persistence outcome must be distinguishable.
- Concurrent updates to the same person intelligence must have a deterministic merge/lock strategy.

## Operating rules
- Verify current revision before treating stored claims as current.
- Apply learned-rule triggers before broad exploration.
- A fixed finding remains `fixed-pending-proof` until required evidence exists.
- Every meaningful problem must be assessed for failure pattern, learned rule and eval.
- Update `NEXT_START.md` before stopping.
- Canonical truth must have one declared owner.
- Derived fields must not silently become write-authoritative.
- External provider IDs require explicit exposure policy.
- Migration claims require schema + migration-chain reconciliation.
- Concurrency correctness cannot be closed from static inspection alone.
- Raw SQL must be inspected for invariant impact, not just syntax.
- A DB-level constraint is stronger than application-only enforcement; record which invariants are which.
