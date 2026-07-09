---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [brain, upgrade, v11, agentic-execution, claude-code, token-economy]
ai_access: allowed
version: 11.0
---
# Omar Brain v11 — Persistent Agentic Batch Execution Upgrade Report

## Goal

Turn a detailed project plan into a persistent, evidence-gated execution loop that can advance batch by batch without repeatedly rediscovering the Brain or repository.

## Core result

v11 adds an executable coordinator between Omar's plan and Claude Code:

```text
Final Goal
  -> Master Plan
  -> Next Eligible Batch
  -> Minimal Context Capsule
  -> Focused Claude Execution
  -> Machine Verification
  -> Repair Same Batch on Failure
  -> Evidence + Handoff
  -> Next Batch
  -> Final Goal Gate
```

Claude is the intelligent executor. The Brain runtime owns progression, state, evidence, and completion.

## Added system

`00_System/Agentic Execution OS/`

### Runtime

- `agent-loop.mjs`
- `plan-compiler.mjs`
- `context-compiler.mjs`
- `repo-intelligence.mjs`
- `batch-verifier.mjs`
- `claude-batch-runner.mjs`
- `validate-agent-loop.mjs`
- `self-test-agent-loop.mjs`
- PowerShell install/run wrappers

### Contracts and schemas

- plan specification schema,
- batch contract schema,
- runtime-state schema,
- executable example plan.

### Operating standards

- Agentic Execution Operating System,
- Batch State Machine and Gates,
- Token Economy and Context Capsule Policy,
- Failure Skip and Resume Policy,
- Claude Fresh Context Runner,
- Quick Start.

## Machine state model

Normal path:

```text
PENDING -> READY -> BOOTING -> RUNNING -> VERIFYING
        -> PASSED -> COMMITTING_EVIDENCE -> DONE
```

Repair path:

```text
VERIFYING -> FAILED_VERIFICATION -> REPAIRING
          -> fresh attempt on same batch -> VERIFYING
```

No required batch may silently skip. Optional skip requires a reason and impact report. A blocked required batch blocks the loop.

## Token-economy design

v11 does not load the full Brain or full project history for every batch.

Each batch receives a bounded capsule containing only:

- compact final goal,
- current batch contract,
- dependency handoffs,
- exact repository path and revision,
- read-first files,
- relevant known file intelligence,
- current failures,
- acceptance criteria,
- machine verification commands,
- stop conditions.

The default design target is a small context packet rather than replaying old conversations.

## Project file intelligence

The loop maintains:

- repository state,
- file index,
- important file paths,
- content hashes,
- batch relationships,
- edit history,
- failure history,
- verification reports.

A cached summary is reusable only when it matches the current file hash. Changed content invalidates stale summary truth and triggers targeted refresh rather than trusting old memory.

## Claude Code integration

Added:

- scoped Agentic Plan execution rule,
- `/agent-loop`,
- `/plan-install`,
- `/batch-resume`.

Updated hooks:

- prompt router can bind a Claude session to an exact active plan,
- session start surfaces active loops,
- change tracker appends batch edit events and updates file hashes,
- stop gate blocks mid-batch exits and, in full-loop mode, blocks stopping between unfinished batches or before final verification.

## Two execution modes

### Interactive

Omar opens Claude Code and uses the active plan. The session is bound to the plan and current batch.

### Fresh-context runner

A scripted runner launches one fresh `claude -p` execution per batch, then invokes the external verifier. Failed verification produces a fresh repair attempt on the same batch. Successful verification closes the batch and advances.

The runner uses bounded turns/attempts and never marks a batch done from Claude prose alone.

## Safety decisions

- no blind infinite loop,
- max batches and max attempts,
- machine verification controls advancement,
- no `dangerously-skip-permissions`,
- headless runs bypass only the interactive stop-block recursion, not verification,
- dry-run previews the next invocation without mutating runtime state,
- required blockers stop the loop,
- final project completion requires an independent final-goal gate.

## Executed proof before final regression

Observed locally in the v11 worktree:

- Agentic runtime checker: 0 errors / 0 warnings.
- Claude runtime checker: 0 errors / 0 warnings.
- Runtime consistency: 0 errors / 0 warnings.
- Navigation connectivity: 17 routes, 0 errors / 0 warnings.
- Vault validator after metadata repair: 0 errors / 0 warnings.
- Deep self-test: PASS.
- B001: DONE.
- B002: intentional first verification failure, then DONE on attempt 2.
- Final loop state: COMPLETE.
- Failure ledger: OPEN and RESOLVED lifecycle observed.
- Handoffs: B001 and B002 observed.
- Context capsule: about 2.1k characters in the permanent deep test, below its 5k test budget.
- Claude lifecycle simulation: bind, edit logging, mid-batch stop block, pre-final stop block, and post-final release all passed.
- Non-mutating dry-run test: runtime-state SHA-256 unchanged before and after preview.

## Honest boundary

This upgrade proves the local execution harness and Brain integration. It does not yet prove that every real external project, provider, database, browser flow, deployment, or long-running Claude task will succeed. Those require observed project evidence and should raise Brain health/reality coverage only when actually run.
