---
name: project-council
description: Operate Omar Brain's Living Project Council; deterministic entry, specialist cognition, failure immunity, exact restart, evidence-backed implementation and learning.
status: active
created: 2026-07-09
updated: 2026-07-09
version: 2.0
---
# Living Project Council Skill

Use when Omar asks agents to work together on a project, observe/fix/document a project, audit a feature, ask a specialist "what's new", or continue prior agent work.

## Mandatory read
1. `00_System/Project Council OS/Living Agent Learning OS.md`
2. `00_System/Project Council OS/Deterministic Agent Entry Protocol.md`
3. `00_System/Project Council OS/Dynamic Project Agent Loop.md`
4. resolved project `20_Agent_Council/00_COUNCIL_HOME.md`
5. selected agent `NEXT_START.md`
6. selected agent `00_START_HERE.md`

## Start brief
When possible:
```bash
node "00_System/Project Council OS/runtime/build-agent-start-brief.mjs" \
  "40_Projects/Active/<Project>" "<Agent Name>"
```

## Operating loop
```text
resolve
  -> exact restart pointer
  -> current control state
  -> owned cognition
  -> verify freshness
  -> inspect exact reality
  -> work owned view
  -> prove
  -> failure immunity
  -> reconcile current truth
  -> exact restart
```

## Failure immunity
Meaningful problems must be assessed for:
```text
root cause -> failure pattern -> triggered rule -> checklist detector -> eval -> future activation
```

## Current truth law
Council cognition is present tense. Long chronology goes to `Runs/`; proof artifacts to `Evidence/`.

## Agent write law
Specialists update their own cognition. Toolsmith implements application batches by default. Critic verifies independently.

## Scaffolding
```bash
node "00_System/Project Council OS/runtime/scaffold-project-council.mjs" \
  "40_Projects/Active/<Project Name>"
```

## Validation
```bash
node "00_System/Project Council OS/runtime/validate-project-council.mjs" \
  "40_Projects/Active/<Project Name>"
```
