---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [validation, v4, dynamic-brain, build]
ai_access: allowed
version: 4.0
---
# Omar Brain v4 Validation Report

## Preservation
- v3 source files: 252
- v3 files missing in v4: **0**
- v4 adds new control-plane/runtime files on top of v3.

## Static validation
- custom Brain validator: **0 errors, 0 warnings**
- Markdown frontmatter YAML: **0 errors**
- Obsidian `.base` YAML: **0 errors**
- JSON parse: **0 errors**
- Node `.mjs` syntax: **passed**

## Dynamic retrieval validation
- structure-aware indexed documents: **290**
- structure-aware chunks: **1,840**
- first retrieval smoke result: **Hit@5 = 0.25**
- diagnosed cause: long imported research dominated lexical results and duplicate chunks crowded canonical notes
- improved retrieval result after ranking/diversification changes: **Hit@5 = 1.00**

## Brain health
Clean base vault health report: **100/100**.

## Generator and runtime smoke
A separate smoke vault successfully created and validated:
- software web project,
- business project,
- research project,
- personal project,
- learning project,
- append-only episode,
- governed memory proposal.

Result: **0 errors, 0 warnings**.
The populated smoke vault retained **Hit@5 = 1.00** and health **99.5/100**.

## Important boundary
Dense embeddings, Qdrant/pgvector, a persistent LangGraph service, MCP servers, and external tracing are architected but not falsely presented as running services inside the ZIP. See [[Current Runtime Capability Boundary]].
