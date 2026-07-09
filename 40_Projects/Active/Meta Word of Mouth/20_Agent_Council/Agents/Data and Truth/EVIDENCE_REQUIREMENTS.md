# Data and Truth Evidence Requirements

Data closure requires route-level permission tests, schema/migration validation if data model changes, and concurrency/idempotency proof.

## Minimum evidence levels
- L2 static checks for code-shape claims.
- L3 targeted tests for fixed blockers.
- L4 runtime smoke for worker/provider/runtime claims.
- L5 production evidence only when real deployment behavior is claimed.

## v14 closure hardening
A finding closes only when evidence matches the failure mode. Build/typecheck proves code shape, not concurrency, provider outcomes, authorization, runtime wiring or UX semantics.

For learned immunity, record the matching eval ID and last proven revision.
