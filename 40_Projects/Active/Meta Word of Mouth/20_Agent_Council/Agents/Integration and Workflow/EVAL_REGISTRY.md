# Integration and Workflow Eval Registry

| Eval ID | Trigger/Rule | Scenario | Command/Procedure | Status | Last proven revision | Evidence |
|---|---|---|---|---|---|---|
| INT-EVAL-001 | INT-MWOM-001/002 | Provider accepted then transport timeout: message should be RECONCILIATION_REQUIRED, not FAILED | fault-injection: mock fetch to succeed at Meta but throw read timeout; verify message state and response | missing | — | — |
| INT-EVAL-002 | INT-MWOM-002/003 | DNS failure: message should be FAILED with safe-to-retry indication | fault-injection: mock fetch to throw DNS error; verify FAILED state and retry safety | missing | — | — |
| INT-EVAL-003 | INT-MWOM-001/004 | Duplicate retry after transport timeout: should not create duplicate Meta message | integration: simulate transport timeout → mark FAILED → user retries → verify only one Meta message delivered | missing | — | — |
| INT-EVAL-004 | INT-LEARNED-003 | All Meta API calls have timeout configured | static analysis: verify every fetch() in src/lib/meta/ has AbortController | missing | — | — |
| INT-EVAL-005 | INT-CML-001 | Webhook concurrent duplicate delivery: only one message created | scripts/test-webhook-idempotency.ts | exists | — | — |
| INT-EVAL-006 | INT-CML-002 | Stale SENDING recovery: marks RECONCILIATION_REQUIRED within threshold | scripts/test-send-reconciliation.ts | exists | — | — |
| INT-EVAL-007 | INT-CML-003 | reconcileProviderAcceptedSend: correctly transitions RECONCILIATION_REQUIRED to SENT | scripts/test-send-reconciliation.ts | exists | — | — |
| INT-EVAL-008 | INT-CML-004 | Intelligence job stale lock recovery: resets to PENDING or FAILED | scripts/test-intelligence-stale-lock-recovery.ts | exists | — | — |
| INT-EVAL-009 | INT-CML-005 | Intelligence job concurrent processing: FOR UPDATE SKIP LOCKED prevents double-claim | scripts/test-intelligence-idempotency.ts | exists | — | — |

## Eval status legend
- `missing` — not designed or implemented
- `exists` — test script exists in package.json; execution status unknown
- `executed-failed` — test ran and failed
- `executed-passed` — test ran and passed at specified revision
- `ci-verified` — CI workflow confirms passing at specified revision
