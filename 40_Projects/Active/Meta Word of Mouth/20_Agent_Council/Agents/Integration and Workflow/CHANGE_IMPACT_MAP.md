# Integration and Workflow Change Impact Map

## Activate this agent when
- external API call added/changed
- retry/timeout behavior changes
- webhook event changes
- provider version change
- side effect before local commit
- adapter cutover

## Cross-agent protocol
- Architecture boundary change -> handoff Architecture.
- Invariant/schema/privacy truth -> handoff Data & Truth.
- Provider workflow semantics -> handoff Integration & Workflow.
- Concurrency/complexity -> handoff Logic & Performance.
- Human-visible state meaning -> handoff Product & UX.
- Worker/deployment/recovery -> handoff Runtime & Reliability.
- Any closure claim -> handoff Quality Engineer; Critic for final challenge.
