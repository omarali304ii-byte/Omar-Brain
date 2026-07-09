---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, headless, fresh-context, batches]
ai_access: allowed
version: 11.0
---
# Claude Fresh Context Runner

`claude-batch-runner.mjs` is the optional scripted harness for one fresh Claude context per batch.

## Safety defaults
- runs from the Omar Brain root so `CLAUDE.md`, project settings, hooks, and skills load;
- adds the resolved external repo with `--add-dir`;
- never uses `--dangerously-skip-permissions`;
- defaults to `acceptEdits` and treats permission/tool failures as real failures;
- uses `--no-session-persistence` because Brain state is the durable checkpoint;
- uses `--exclude-dynamic-system-prompt-sections` to improve repeat-call prompt-cache reuse;
- caps turns and attempts;
- records raw Claude JSON output and cost metadata when available;
- external verification decides PASS/FAIL after Claude exits.

## Why fresh contexts
A fresh batch session receives only `Runtime/CURRENT_CONTEXT.md`. Prior work crosses the boundary through evidence, handoff, file intelligence, failures, and exact state—not giant transcripts.

## Run

```powershell
node "00_System/Agentic Execution OS/runtime/claude-batch-runner.mjs" "40_Projects/Active/<Project>/Agent Loop"
```

Preview without invoking Claude:

```powershell
node "00_System/Agentic Execution OS/runtime/claude-batch-runner.mjs" ".../Agent Loop" --dry-run
```
