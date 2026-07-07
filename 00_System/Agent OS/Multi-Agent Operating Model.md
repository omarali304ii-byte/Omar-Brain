---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [multi-agent, orchestration, supervisor, specialists]
ai_access: allowed
version: 4.0
---
# Multi-Agent Operating Model

## Principle
Use the fewest agents necessary. Multi-agent complexity must earn its cost through better specialization, parallelism, risk isolation, or verification.

## Default team
```text
Supervisor
  ├── Librarian
  ├── Researcher / Analyst
  ├── Toolsmith / Coder
  ├── Critic / Verifier
  └── Memory Curator (single durable writer)
```

## Modes
1. **workflow chain** — deterministic ingestion, validation, release gates,
2. **supervisor + specialists** — default for mixed project/research tasks,
3. **handoff/swarm** — only when conversational ownership genuinely benefits.

## State ownership
- Supervisor owns task/run state and stopping criteria.
- Librarian owns retrieval proposals, not truth.
- Toolsmith owns execution attempts, not final verification.
- Critic owns independent challenge, not durable memory.
- Memory Curator owns semantic/procedural commits.

## Anti-patterns
- one agent per folder,
- agents debating with no stopping rule,
- every request spawning all specialists,
- workers writing durable memory directly,
- agents sharing huge chat transcripts instead of structured handoff state.
