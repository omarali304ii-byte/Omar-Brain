# Architecture Eval Registry

## Eval status vocabulary
- `designed` — eval criteria documented, not yet executed
- `passed-static` — passed by code inspection at stated revision
- `passed-local` — passed by local test execution at stated revision
- `passed-ci` — passed in CI (requires workflow + execution evidence)
- `failed` — failing by current evidence

| Eval ID | Trigger/Rule | Scenario | Procedure | Status | Last proven revision | Evidence | Not proven |
|---|---|---|---|---|---|---|---|
| ARCH-EVAL-001 | ARCH-MWOM-001 | Webhook ingestion does not invoke OpenAI directly | Static boundary inspection | passed-static | bd8a7a6 | meta architecture test verifies webhook signature only; no OpenAI import in webhook code path | production webhook runtime behavior |
| ARCH-EVAL-002 | ARCH-MWOM-002 | Inbox messages POST route delegates to owned send workflow, does not import Meta adapter directly | Inspect route imports | designed | — | MWOM-ARCH-001 documents current violation | — |
| ARCH-EVAL-003 | ARCH-MWOM-003 | AI Brain routes remain thin — no Prisma, no business logic | Inspect all AI Brain route files | passed-static | bd8a7a6 | All AI Brain routes delegate to lib/brain/*; no Prisma imports in routes; no AI calls in routes | — |
| ARCH-EVAL-004 | — | Intelligence stale lock recovery is wired into worker runtime | Inspect worker script code wiring | passed-static | bd8a7a6 | Worker calls recoverStaleIntelligenceJobs at startup + periodic; code wiring confirmed | production worker deployment; production scheduler/runtime |
| ARCH-EVAL-005 | — | Outbound send has explicit reconciliation lifecycle structure | Inspect send-reconciliation, reconciliation worker, message status model | passed-static | bd8a7a6 | Three-outcome model (SENT/FAILED/RECONCILIATION_REQUIRED); reconciliation worker; message status model | production reconciliation runtime |
| ARCH-EVAL-006 | — | AI Brain prompt lifecycle separates drafts from published | Inspect prompt-versions.ts | passed-static | bd8a7a6 | savePromptDraft -> DRAFT; publishPromptVersion -> PUBLISHED + SUPERSEDED previous; FOR UPDATE locking | — |
| ARCH-EVAL-007 | — | No duplicate canonical provider adapter ownership | Inspect route imports for provider adapter bypass | failed | bd8a7a6 | MWOM-ARCH-001: inbox messages route directly imports and calls sendMetaTextMessage + resolveMetaSendToken, bypassing sendConversationMessage | — |
| ARCH-EVAL-008 | — | Intelligence snapshot persistence has explicit serialization and deterministic stale-update protection | Inspect storeIntelligenceResult for FOR UPDATE locking and source-order gate | passed-static | bd8a7a6 | FOR UPDATE on job + person + snapshot; deterministic source-order comparison (observedAt -> createdAt -> messageId); stale concurrent update rejection | concurrent behavioral correctness under real race execution; database-backed concurrency stress/regression result; production concurrency behavior |
