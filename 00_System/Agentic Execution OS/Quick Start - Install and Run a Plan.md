---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [agentic-execution, quick-start, windows, claude-code]
ai_access: allowed
version: 11.0
---
# Quick Start — Install and Run a Plan

## Best path for Omar

### 1. Put the detailed plan into the Brain
Save the original plan under the resolved project packet, for example:

```text
40_Projects/Active/Project X/Planning/SOURCE_PLAN.md
```

Keep the original. It is provenance and must not disappear after compilation.

### 2. In Claude Code

```text
/plan-install Project X using 40_Projects/Active/Project X/Planning/SOURCE_PLAN.md
```

Claude converts the plan into a validated `Agent Loop` without silently dropping required batches.

### 3. Interactive execution

```text
/agent-loop Project X — finish all batches and final goal
```

The Stop gate keeps a bound full-loop session from casually ending while an eligible required batch or final gate remains.

### 4. Best token-saving mode: fresh context per batch
From PowerShell at the Brain root:

```powershell
& "00_System/Agentic Execution OS/runtime/run-agent-loop.ps1" `
  -AgentLoopDir "40_Projects/Active/Project X/Agent Loop"
```

Preview the exact fresh Claude invocation without running it:

```powershell
& "00_System/Agentic Execution OS/runtime/run-agent-loop.ps1" `
  -AgentLoopDir "40_Projects/Active/Project X/Agent Loop" `
  -DryRun
```

## What persists between fresh Claude contexts
- final goal;
- exact plan and dependencies;
- active batch state;
- compact current capsule;
- repo revision and dirty-state snapshot;
- file hashes and valid cached summaries;
- append-only edit events;
- verification reports;
- exact failures;
- handoff artifacts;
- skip reports;
- final evidence.

## What does not need to persist
- giant chat transcripts;
- repeated whole-repo exploration;
- unrelated Brain knowledge;
- stale file summaries;
- Claude's confidence.
