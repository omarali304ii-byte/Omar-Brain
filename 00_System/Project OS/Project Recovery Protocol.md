---
type: system
status: active
created: 2026-07-07
topics: [project, recovery, stale-context]
ai_access: allowed
---
# Project Recovery Protocol

Use when a project is messy, stale, inherited, or resumed after a long gap.

## Recovery sequence
1. Resolve canonical project and repository.
2. Freeze assumptions.
3. Read current requirements/architecture/decisions.
4. Inspect repository structure and branch state.
5. Identify actual stack, entry points, data layer, tests, build commands.
6. Compare docs vs code vs tests.
7. Produce drift list.
8. Reconstruct current state from evidence.
9. Rebuild execution queue with dependencies.
10. Verify one permanent story or smoke path where possible.
11. Resume execution only after the project truth map is usable.

Do not “continue from memory” when repository reality can be inspected.
