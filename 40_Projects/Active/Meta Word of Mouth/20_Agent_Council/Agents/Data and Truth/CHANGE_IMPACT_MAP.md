# Data and Truth Change Impact Map

## Activate this agent when
- schema or migration change
- identity/merge behavior changes
- permission affects sensitive data
- new derived snapshot/cache
- shared-state update
- new provider identifier exposed

## Cross-agent protocol
- Architecture boundary change -> handoff Architecture.
- Invariant/schema/privacy truth -> handoff Data & Truth.
- Provider workflow semantics -> handoff Integration & Workflow.
- Concurrency/complexity -> handoff Logic & Performance.
- Human-visible state meaning -> handoff Product & UX.
- Worker/deployment/recovery -> handoff Runtime & Reliability.
- Any closure claim -> handoff Quality Engineer; Critic for final challenge.
