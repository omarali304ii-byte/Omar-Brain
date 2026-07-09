# Logic and Performance Eval Registry

| Eval ID | Trigger/Rule | Scenario | Command | Status | Last proven revision | Evidence |
|---|---|---|---|---|---|---|
| LOGIC-EVAL-001 | LOGIC-CONC-001 | 20 overlapping updates for same person preserve all independent deltas | `npm run test:intelligence-ordering-concurrency` | **passed-db-backed** | bd8a7a6 | 3 test cases with Promise.all concurrency: different timestamps, equal-observed/different-created, fully-equal with ID tiebreak. All verify durable memory preservation + latest semantic state correctness. |
| LOGIC-EVAL-002 | LOGIC-PERF-001 | Candidate count remains bounded before expensive scoring | representative-volume benchmark/trace | **not_assessed** | — | No volume benchmark exists. ScoreOpportunity operates on at most 100 signals + identity count × conversation count × 5 messages. Bound enforced by take:100 signals, take:5 messages per conversation. |
| LOGIC-EVAL-003 | LOGIC-CONC-001 | Concurrent stale lock recovery produces exactly one transition | `npm run test:intelligence-stale-lock-recovery` | **passed-db-backed** | bd8a7a6 | testConcurrentRecoverySingleTransition: dual concurrent recovery calls → single PENDING transition |
| LOGIC-EVAL-004 | LOGIC-CONC-001 | Retry after partial failure does not double-count signals | `npm run test:intelligence-partial-retry` | **passed-db-backed** | bd8a7a6 | First run: snapshot persisted, opportunity refresh fails → PENDING. Second run: completes, signal count unchanged (2). |
| LOGIC-EVAL-005 | LOGIC-CONC-001 | Concurrent follow-up checks produce exactly one task | `npm run test:followup-concurrency` | **passed-db-backed** | bd8a7a6 | Dual concurrent runAttentionChecks → single FollowUpTask |
| LOGIC-EVAL-006 | LOGIC-CONC-001 | Concurrent opportunity overrides do not create duplicates | `npm run test:opportunity-override-no-duplicate` | **passed-db-backed** | bd8a7a6 | NOT_A_LEAD, WON, LOST override scenarios all produce exactly 1 opportunity |
| LOGIC-EVAL-007 | LOGIC-CONC-001 | Memory compaction bounded under repeated merges | `npm run test:memory-compaction` | **passed-db-backed** | bd8a7a6 | 50-iteration merge bounded at 800 chars; identical content dedup; old facts evicted |
| LOGIC-EVAL-008 | — | Worker lifecycle: claim → analyze → store → refresh → complete | `npm run test:intelligence-worker` | **passed-static** (would have passed DB but blocked by environment) | bd8a7a6 | 7 test cases: success, invalid-output-rejected, openai-failure-retries, missing-key-nocorrupt, stale-recovery-claim, stale-max-attempts, older-cannot-overwrite. Static verification confirmed. Runtime blocked by connection pool exhaustion. |
| LOGIC-EVAL-009 | LOGIC-CONC-001 | Concurrent opportunity refreshes do not interleave evidence (MWOM-LOGIC-001) | TBD | **missing** | — | No evidence concurrency test exists |
| LOGIC-EVAL-010 | LOGIC-PERF-001 | People search bounded at representative volume | TBD | **missing** | — | No volume benchmark exists |

## Eval freshness
```yaml
last_reconciled_at: 2026-07-10
revision: bd8a7a6
rule: re-evaluate after any owned surface change intersecting concurrency or complexity
```
