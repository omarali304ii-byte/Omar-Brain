# Runtime and Reliability Rules

- A passing build is not runtime readiness.
- Worker recovery code is not real until wired into the runtime loop and tested.
- Production readiness requires restore/rollback/observability proof, not only code quality.
## v14 operating rules
- Verify current revision before treating stored claims as current.
- Apply learned-rule triggers before broad exploration.
- A fixed finding remains `fixed-pending-proof` until required evidence exists.
- Every meaningful problem must be assessed for failure pattern, learned rule and eval.
- Update `NEXT_START.md` before stopping.
