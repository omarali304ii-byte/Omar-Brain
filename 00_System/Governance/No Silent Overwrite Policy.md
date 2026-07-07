---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [overwrite, conflicts, provenance, governance]
ai_access: allowed
version: 1.0
---
# No Silent Overwrite Policy

## Core rule
Never erase durable context merely because a newer note, model, source, or agent disagrees.

## Before editing an existing durable note
1. Read the current target.
2. Resolve its canonical status.
3. Inspect provenance and confidence.
4. Search for linked decisions, evidence, and supersession.
5. Decide whether the change is additive, corrective, merge, supersession, or conflict.

## Default behavior
- Prefer additive edits when source context matters.
- Preserve exact technical identifiers.
- Preserve source links and dates.
- Keep current truth separate from history.
- Do not convert inference into fact.

## When sources conflict
One of these actions is mandatory:
- record a visible `Conflicts / Competing Evidence` section,
- create a project-scoped conflict/decision note,
- create a source-backed research note under `60_Knowledge/Research`,
- supersede explicitly with links and rationale.

Never delete the older claim merely to make the graph look clean.

## Corrections
If a wrong claim affected decisions or prior analysis:
- preserve the previous claim in a correction/supersession record,
- state why it changed,
- link the stronger evidence,
- update dependent current-truth notes.

## AI rule
Workers may propose edits. Durable semantic/procedural consolidation follows the Memory Curator pipeline and contradiction checks.
