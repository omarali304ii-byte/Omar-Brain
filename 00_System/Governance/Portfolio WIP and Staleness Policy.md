---
type: system
status: active
created: 2026-07-07
topics: [portfolio, projects, focus, review]
ai_access: allowed
---
# Portfolio WIP and Staleness Policy

Omar runs many projects and ideas. Organization fails when everything is called active.

## Active project requirements
An active project must have:
- a canonical project note,
- `project_id`,
- explicit outcome,
- done definition,
- current phase,
- health,
- next action,
- current-state note,
- execution queue,
- recent review.

## Attention states
Use project status honestly:
- `active`: receiving real execution attention,
- `waiting`: blocked on an external dependency,
- `paused`: intentionally not receiving work,
- `completed`: done definition verified,
- `archived`: no longer operationally relevant.

Ideas stay in `15_Ideas` until commitment exists.

## Staleness
Default review trigger:
- active project not reviewed for 14 days → flag,
- active project without next action → error,
- active project without execution evidence over a meaningful period → review whether it should be paused.

Staleness is a prompt for truthful classification, not automatic deletion.
