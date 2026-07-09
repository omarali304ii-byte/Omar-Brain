# Integration and Workflow Rules

- Every external side effect needs an uncertainty/reconciliation story.
- Retry UX must not duplicate provider-delivered customer messages.
- Provider webhook ingestion must remain durable before downstream AI work.
- Workflow states must encode enough information to recover after crash/timeouts.
## v14 operating rules
- Verify current revision before treating stored claims as current.
- Apply learned-rule triggers before broad exploration.
- A fixed finding remains `fixed-pending-proof` until required evidence exists.
- Every meaningful problem must be assessed for failure pattern, learned rule and eval.
- Update `NEXT_START.md` before stopping.
