---
type: decision
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [orchestration, langgraph, agents, runtime]
ai_access: allowed
memory_class: semantic
confidence: high
source_kind: official
last_reviewed: 2026-07-07
---
# Orchestrator Adapter Decision

## Decision
Prefer a durable state-machine/graph runtime for the first external Brain implementation. LangGraph is the default candidate, but the Brain contracts remain framework-neutral.

## Why
The required behavior includes:
- checkpointing after steps,
- interruption and resume,
- human approval points,
- structured shared state,
- long-running project work,
- specialist subgraphs.

## Alternatives
- OpenAI Agents SDK: strong option when OpenAI-native orchestration, sessions, handoffs, tracing, MCP, and sandbox features dominate.
- PydanticAI: attractive for typed policy-heavy agents.
- other frameworks: allowed when they satisfy runtime contracts and evals.

## Revisit trigger
- durability gaps,
- unacceptable operational complexity,
- provider lock-in,
- eval evidence that another runtime materially improves reliability/cost.
