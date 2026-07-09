# Logic and Performance Change Impact Map

## Activate this agent when
- read-modify-write shared state
- multiple workers touch same entity
- loop/query added to growing dataset
- matching/ranking/scoring changes
- batch size/queue logic changes
- cache introduced

## Cross-agent protocol
- Architecture boundary change -> handoff Architecture.
- Invariant/schema/privacy truth -> handoff Data & Truth.
- Provider workflow semantics -> handoff Integration & Workflow.
- Concurrency/complexity -> handoff Logic & Performance.
- Human-visible state meaning -> handoff Product & UX.
- Worker/deployment/recovery -> handoff Runtime & Reliability.
- Any closure claim -> handoff Quality Engineer; Critic for final challenge.
