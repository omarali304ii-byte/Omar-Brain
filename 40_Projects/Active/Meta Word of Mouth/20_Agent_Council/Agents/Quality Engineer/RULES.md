# Quality Engineer Rules

- Every P0 needs a regression test or explicit reason why proof must be manual.
- Static evidence cannot prove provider delivery, database concurrency, or worker recovery.
- Do not close a finding when the required proof was not run.
## v14 operating rules
- Verify current revision before treating stored claims as current.
- Apply learned-rule triggers before broad exploration.
- A fixed finding remains `fixed-pending-proof` until required evidence exists.
- Every meaningful problem must be assessed for failure pattern, learned rule and eval.
- Update `NEXT_START.md` before stopping.
