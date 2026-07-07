---
type: source
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [sources, dynamic-brain, agents, retrieval]
ai_access: allowed
source_kind: official
last_reviewed: 2026-07-07
---
# Dynamic Brain Primary Source Registry

Checked on 2026-07-07. These sources inform v4 but do not replace project-specific verification.

| Area | Primary source | Why tracked |
|---|---|---|
| Obsidian metadata/API | Obsidian Developer Docs — MetadataCache / Vault APIs | derived index and link metadata |
| Durable agent state | LangGraph official persistence docs | checkpoints, threads, resume |
| Agent design | Anthropic — Building Effective AI Agents | simple composable patterns |
| Tool interoperability | Model Context Protocol specification | standardized tools/resources |
| Hybrid retrieval | Qdrant official hybrid search/reranking docs | dense+sparse+rerank pipeline |
| OpenAI orchestration option | OpenAI Agents SDK docs | tools, handoffs, sessions, tracing, MCP |

## Governance
When a source changes materially:
1. create a system change proposal,
2. identify affected standards,
3. run relevant evals,
4. update procedures only after review.


## URLs
- Obsidian MetadataCache: `https://docs.obsidian.md/Reference/TypeScript+API/MetadataCache`
- LangGraph persistence: `https://docs.langchain.com/oss/python/langgraph/persistence`
- Anthropic effective agents: `https://www.anthropic.com/research/building-effective-agents`
- MCP specification: `https://modelcontextprotocol.io/specification/2025-11-25`
- Qdrant hybrid reranking: `https://qdrant.tech/documentation/tutorials-basics/reranking-hybrid-search/`
- OpenAI Agents SDK: `https://openai.github.io/openai-agents-python/`
