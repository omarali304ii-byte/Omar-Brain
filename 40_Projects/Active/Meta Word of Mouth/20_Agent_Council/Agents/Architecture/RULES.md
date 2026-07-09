# Architecture Rules

- Webhook transport must not own AI enrichment or long business workflows.
- Outbound provider send state must not be hidden inside generic message status only.
- Do not split modules for aesthetics; split only where ownership or failure boundary requires it.
- Preserve the strong ingest -> enqueue -> worker architecture unless repo evidence proves drift.
- Routes must delegate to owned service/workflow boundaries, not duplicate orchestration logic.
- New subsystem boundaries must preserve route/service/repository layer separation.

## v14 operating rules
- Verify current revision before treating stored claims as current.
- Apply learned-rule triggers before broad exploration.
- A fixed finding remains `fixed-pending-proof` until required evidence exists.
- Every meaningful problem must be assessed for failure pattern, learned rule and eval.
- Update `NEXT_START.md` before stopping.
