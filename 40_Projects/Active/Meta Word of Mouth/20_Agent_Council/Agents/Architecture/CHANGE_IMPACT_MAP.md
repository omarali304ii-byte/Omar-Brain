# Architecture Change Impact Map

## Activate this agent when
- new module/service boundary
- route gains business orchestration
- schema change changes ownership
- sync/async boundary changes
- provider adapter cutover
- large hotspot grows materially

## Cross-agent protocol
- Architecture boundary change -> handoff Architecture.
- Invariant/schema/privacy truth -> handoff Data & Truth.
- Provider workflow semantics -> handoff Integration & Workflow.
- Concurrency/complexity -> handoff Logic & Performance.
- Human-visible state meaning -> handoff Product & UX.
- Worker/deployment/recovery -> handoff Runtime & Reliability.
- Any closure claim -> handoff Quality Engineer; Critic for final challenge.
