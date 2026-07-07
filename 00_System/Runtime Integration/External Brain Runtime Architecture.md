---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [runtime, architecture, obsidian, agents, retrieval]
ai_access: allowed
version: 1.0
---
# External Brain Runtime Architecture

## Decision
Obsidian is the canonical human-readable source of truth and control plane. A separate runtime handles persistence, orchestration, retrieval services, tool execution, and observability.

```text
Obsidian Vault
  ├─ Markdown / Properties / Bases
  ├─ Project OS
  ├─ Memory OS
  └─ Procedural standards
          │
          ▼
Watcher / Vault API / approved local bridge
          │
          ▼
Ingestion + hashes + structure parser
          │
   ┌──────┼───────────┐
   ▼      ▼           ▼
Lexical  Vector     Entity graph
index    index      derived links
   └──────┼───────────┘
          ▼
Hybrid retriever + reranker
          │
          ▼
Supervisor runtime
  ├─ Librarian
  ├─ Researcher
  ├─ Toolsmith
  ├─ Critic
  └─ Memory Curator
          │
          ▼
Sandboxed tools / MCP / repo / APIs
          │
          ▼
Checkpoints + traces + evals
          │
          ▼
Governed writeback to Obsidian
```

## Default implementation direction
- orchestration: a durable graph runtime such as LangGraph is the preferred first implementation because checkpoint/resume is central,
- interoperability: MCP-compatible tools where useful,
- vector layer: Qdrant is the default self-hostable candidate; pgvector remains a strong lower-system-count alternative,
- hosted models: provider-adapter design, not one-model memory lock-in,
- local model: optional for private/cheap classification and extraction,
- traces/evals: framework-neutral IDs stored in episodes, with a dedicated trace/eval backend.

## Rule
Framework choice is an adapter decision. The Brain's memory, project, evidence, and evaluation contracts must survive a framework swap.
