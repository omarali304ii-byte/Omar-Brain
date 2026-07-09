# Integration and Workflow Rules

- Every external side effect needs an uncertainty/reconciliation story.
- Retry UX must not duplicate provider-delivered customer messages.
- Provider webhook ingestion must remain durable before downstream AI work.
- Workflow states must encode enough information to recover after crash/timeouts.
- Transport exceptions are NOT the same as provider rejections — do not collapse them.
- A fetch() catch block cannot distinguish "Meta never received" from "Meta accepted but response lost."
- RECONCILIATION_REQUIRED is a first-class state, not a failure.
- No automatic retry for unknown-outcome sends without provider-backed idempotency.
- Every Meta API call must have a timeout (currently missing — MWOM-INT-002).

## v14 operating rules
- Verify current revision before treating stored claims as current.
- Apply learned-rule triggers before broad exploration.
- A fixed finding remains `fixed-pending-proof` until required evidence exists.
- Every meaningful problem must be assessed for failure pattern, learned rule and eval.
- Update `NEXT_START.md` before stopping.
- External system claims require evidence from live code, not prior documentation.
- Runtime claims must be tagged `runtime-unknown` unless deployment evidence exists.
- Provider behavior that cannot be proven locally must remain explicitly unknown.

## Activation rules
Activate this agent when:
- external API call added/changed
- retry/timeout behavior changes
- webhook event changes
- provider version change
- side effect before local commit
- adapter cutover
- reconciliation mechanism changes
- new external system integration
- message state machine changes
