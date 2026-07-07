---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [runtime, limitations, honesty, roadmap]
ai_access: allowed
version: 1.0
---
# Current Runtime Capability Boundary

## What v4 includes now
- complete Memory OS contracts,
- Agent OS role and write boundaries,
- Retrieval OS architecture,
- structure-aware derived retrieval manifest,
- local BM25-style lexical/context prototype with authority heuristics and source diversification,
- retrieval smoke eval set and regression gate,
- append-only episode generator,
- memory proposal generator,
- brain health report,
- full control-cycle automation,
- project generator integration,
- nightly CI workflow.

## What is specified but not bundled as a live service
- dense embeddings,
- Qdrant/pgvector deployment,
- neural reranker,
- LangGraph persistent orchestrator,
- MCP server implementation,
- external trace/eval backend,
- local model server,
- autonomous background watcher.

## Why
The Brain must not pretend that Markdown specifications equal a running service. These components require deployment, credentials, process supervision, and security configuration.
