---
type: change-proposal
status: completed
created: 2026-07-09
updated: 2026-07-09
topics: [governance, agentic-execution, batches, context-engineering, claude-code]
ai_access: allowed
version: 1.0
---
# Change Proposal — Persistent Agentic Batch Execution OS

## 1. Problem

Omar Brain v10 can route Claude Code, enforce scoped rules, guard dangerous actions, and validate control-plane changes, but a long project plan still depends too heavily on a single conversation or on repeated manual rediscovery. A prose plan does not itself guarantee ordered batch execution, proof before advancement, resumability, exact file memory, governed skipping, or a final-goal gate.

## 2. Evidence

Observed design gaps before this change:

- no machine-readable final-goal contract linked to ordered batches,
- no executable dependency-aware batch state machine,
- no compact per-batch context compiler,
- no batch-local edit/failure/evidence ledgers,
- no hash-aware file intelligence cache,
- no machine verifier controlling advancement,
- no fresh-context Claude runner with bounded attempts,
- no Claude session binding to an active loop.

The v11 implementation was exercised with a two-batch synthetic plan in which the second batch intentionally failed verification, remained on the same batch, entered repair, retried as attempt 2, passed, wrote handoffs, and only then passed the final goal gate.

## 3. Existing mechanisms considered

The change reuses rather than replaces:

- `00_System/AI Runtime/Autonomous Completion Loop.md`,
- `00_System/AI Runtime/Persistent Agent Run State Contract.md`,
- `00_System/AI Runtime/Interruption and Resume Protocol.md`,
- `00_System/AI Runtime/Failure Recovery Loop.md`,
- `00_System/Project OS/Task and Batch Execution Standard.md`,
- v10 Claude Code routing, hooks, rules, skills, and stop gate,
- Connected Intelligence and governed run/evidence capture.

## 4. Proposed change

Add `00_System/Agentic Execution OS/` as the executable coordinator for persistent project plans.

Core contracts:

- final goal,
- master plan,
- per-batch contract,
- runtime state,
- machine verification report,
- handoff packet,
- append-only edit/failure/evidence/transition ledgers,
- project file intelligence with content hashes.

Execution law:

```text
FINAL GOAL
  -> next eligible batch
  -> compact context capsule
  -> one focused Claude context
  -> execute
  -> external machine verification
  -> repair same batch on failure
  -> evidence + handoff on pass
  -> next batch
  -> final goal gate
```

## 5. Compatibility impact

- Existing projects remain valid; no Agent Loop is required unless a plan is installed.
- Existing v10 Claude Code behaviors remain active.
- Active Agent Loops gain higher routing priority for plan execution.
- Claude auto memory remains disabled; durable project execution state stays in Omar Brain.
- No existing project packet is silently migrated.

## 6. Migration plan

1. Install Agentic Execution OS runtime, schemas, docs, and template.
2. Add Claude rules and skills.
3. Add route `route-agentic-plan`.
4. Bind sessions to active loops through prompt routing.
5. Append edits to batch ledgers and invalidate stale file summaries by hash.
6. Extend stop gate for active loop states.
7. Integrate runtime checker into `brain-cycle.mjs`.
8. Validate with synthetic failure/retry/final-gate test.
9. Run full Brain regression.
10. Adopt per-project plans explicitly; do not bulk-convert old project notes.

## 7. Rollback plan

- Disable/remove `route-agentic-plan`.
- Remove Agentic Execution OS checker from the Brain cycle.
- Remove the three Agent Loop Claude skills and scoped rule.
- Restore v10 hook versions.
- Leave project Agent Loop artifacts as historical evidence; do not delete them silently.

## 8. Validators/templates/dashboards affected

- `00_System/Automation/brain-cycle.mjs`
- `00_System/Automation/check-agentic-execution-runtime.mjs`
- `00_System/Navigation OS/route-registry.json`
- `CLAUDE.md`
- `START HERE.md`
- `HOME.md`
- `00_System/Operating Map.md`
- `00_System/System Manifest.md`
- `00_System/Runtime State/brain-state.json`
- `.claude/hooks/*`

## 9. Acceptance criteria

- Agentic runtime checker: 0 errors, 0 warnings.
- Claude runtime checker: 0 errors, 0 warnings.
- Vault validator: 0 errors, 0 warnings.
- Navigation connectivity: 0 errors, 0 warnings.
- Synthetic two-batch test proves fail -> repair -> retry -> pass -> final gate.
- Batch 2 attempt count is 2 in the test.
- Required handoffs exist.
- Failure lifecycle records OPEN and RESOLVED events.
- Context capsule stays within configured budget.
- Dry-run preview does not mutate runtime state.
- Bound Claude lifecycle blocks unsafe stopping mid-batch and before the final gate in full-loop mode.
- Full Brain cycle passes after all v11 files and governance records are present.

## Authorization

Accepted from Omar's explicit instruction on 2026-07-09 to add and upgrade Omar Brain with the persistent agentic batch loop and optimize for best results plus token savings.
