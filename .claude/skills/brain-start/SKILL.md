---
name: brain-start
description: Orient inside Omar Brain, inspect live brain state, choose the correct route, and return the minimum authoritative context before non-trivial work.
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, startup, routing]
ai_access: allowed
---
# Brain Start

Use at the beginning of a complex session, after `/clear`, after compaction uncertainty, or whenever the task route is unclear.

## Procedure
1. Read `00_System/Operating Map.md`.
2. Read `00_System/Runtime State/brain-state.json`.
3. Read `00_System/Runtime State/HOT.md`.
4. Inspect OPEN/IN_PROGRESS P0/P1 rows in `GAP_REGISTER.md`.
5. Run:
   `node 00_System/Automation/brain-route.mjs . "$ARGUMENTS"`
6. Read the selected route entrypoint and only its relevant next signs.
7. If a project is named/implied, resolve it through `40_Projects/Manifests/` before project-specific action.
8. Return a compact internal route packet: route ID, canonical target, authority, minimum read set, destination proof, unresolved uncertainty.

Do not load the whole vault. Do not edit before route and authority are known.
