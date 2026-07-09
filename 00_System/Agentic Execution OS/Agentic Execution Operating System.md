---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [agentic-execution, batches, state-machine, claude-code, token-economy]
ai_access: allowed
version: 11.0
---
# Agentic Execution Operating System

This is the executable control plane for long plans that must progress batch by batch until a final goal is proven.

## Core doctrine

```text
FINAL GOAL
  -> MACHINE PLAN
  -> NEXT ELIGIBLE BATCH
  -> MINIMAL CONTEXT CAPSULE
  -> ONE FOCUSED EXECUTION CONTEXT
  -> INDEPENDENT VERIFICATION
      PASS -> EVIDENCE -> HANDOFF -> WRITEBACK -> NEXT BATCH
      FAIL -> EXACT FAILURE -> REPAIR -> RE-VERIFY
      BLOCKED -> BLOCKER REPORT
      SKIP -> ONLY IF CONTRACT ALLOWS + IMPACT REPORT
  -> FINAL GOAL GATE
```

The language model is the intelligent executor. The runtime owns state transitions, dependency eligibility, verification, evidence, and final completion.

## Why this exists
- conversation history is not execution state;
- a large plan must not be re-read in full for every batch;
- a model must not self-declare completion;
- previous batches must hand off structured truth, not giant transcripts;
- cached repo knowledge must be invalidated when file hashes change;
- required work must never disappear through silent skipping.

## Canonical project layout

```text
<Project Packet>/Agent Loop/
  FINAL_GOAL.json
  MASTER_PLAN.json
  RUNTIME_STATE.json
  Batches/<BATCH-ID>/CONTRACT.json
  Runtime/CURRENT_CONTEXT.md
  Runtime/CLAUDE_RUNS/
  Intelligence/repo-state.json
  Intelligence/file-index.json
  Ledgers/EDIT_EVENTS.jsonl
  Ledgers/FAILURES.jsonl
  Ledgers/EVIDENCE.jsonl
  Ledgers/TRANSITIONS.jsonl
  Handoffs/<BATCH-ID>.md
  Reports/<BATCH-ID>-verification.json
  Skips/<BATCH-ID>.md
```

## Required control sequence
1. Compile or validate the plan.
2. Resolve the exact project and repository.
3. Select only a dependency-eligible batch.
4. Snapshot repo revision and pre-existing dirty files.
5. Refresh only relevant file intelligence.
6. Compile a bounded context capsule.
7. Execute one batch.
8. Verify outside the executor's prose.
9. On failure, preserve signature and repair the same batch.
10. On pass, create evidence and handoff, then close the batch.
11. Start the next batch with a fresh context when possible.
12. Run the final goal gate after all required batches finish.

## Native commands
- `node "00_System/Agentic Execution OS/runtime/plan-compiler.mjs" <PLAN_SPEC.json> <Agent Loop dir>`
- `node "00_System/Agentic Execution OS/runtime/agent-loop.mjs" status <Agent Loop dir>`
- `node "00_System/Agentic Execution OS/runtime/agent-loop.mjs" boot <Agent Loop dir>`
- `node "00_System/Agentic Execution OS/runtime/agent-loop.mjs" verify <Agent Loop dir>`
- `node "00_System/Agentic Execution OS/runtime/agent-loop.mjs" block <Agent Loop dir> --reason "..."`
- `node "00_System/Agentic Execution OS/runtime/agent-loop.mjs" skip <Agent Loop dir> --reason "..." --impact "..."`
- `node "00_System/Agentic Execution OS/runtime/agent-loop.mjs" final <Agent Loop dir>`
- `node "00_System/Agentic Execution OS/runtime/claude-batch-runner.mjs" <Agent Loop dir>`

## Token rule
Never load the full Brain, full project history, or full prior transcript when a bounded capsule can answer the execution question. See [[Token Economy and Context Capsule Policy]].

## Related authority
- [[00_System/AI Runtime/Autonomous Completion Loop]]
- [[00_System/AI Runtime/Persistent Agent Run State Contract]]
- [[00_System/AI Runtime/Interruption and Resume Protocol]]
- [[00_System/AI Runtime/Failure Recovery Loop]]
- [[00_System/Project OS/Task and Batch Execution Standard]]
- [[00_System/Agentic Execution OS/Batch State Machine and Gates]]
