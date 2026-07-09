---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [multi-agent, ownership, conflict]
ai_access: allowed
version: 2.0
---
# Cross-Agent Ownership and Conflict Standard

## Core rule
One fact may affect many agents, but one agent must own each primary model.

## Typical ownership
```text
system/module boundaries           Architecture
schema/invariants/source of truth  Data & Truth
provider/API/workflow semantics    Integration & Workflow
algorithm/complexity/concurrency   Logic & Performance
user journey/interaction meaning   Product & UX
deployment/worker/ops/recovery     Runtime & Reliability
proof strategy/regression          Quality Engineer
```

## Shared finding rule
A finding may have multiple owners only when each owns a distinct claim.

Example:
```text
same-person race
  Data & Truth -> invariant and persistence truth
  Logic & Performance -> concurrent update algorithm
  Quality Engineer -> adversarial proof
```

## Conflict protocol
```text
agent A observes conflict
  -> do not overwrite B's model
  -> write HANDOFF with evidence
  -> Supervisor resolves owner/priority
  -> affected agents reconcile current files
  -> Critic checks unresolved contradiction at completion
```

## No consensus theater
Agents do not need to agree. They need explicit claims, evidence and ownership.
