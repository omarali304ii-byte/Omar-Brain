---
type: system
status: active
created: 2026-07-07
topics: [ai, rag, retrieval, tokens]
ai_access: allowed
version: 2.0
---
# AI Retrieval and Token Policy

## Principle
Search first; reason second. The LLM does not read the entire vault or repository for every question.

## Retrieval architecture

```text
Obsidian Markdown
   ↓
file watcher + hashes
   ↓
frontmatter/heading parser
   ↓
structure-aware chunks
   ↓
┌──────────────────┬──────────────────┐
│ embeddings       │ full-text index  │
│ semantic meaning │ exact identifiers│
└─────────┬────────┴─────────┬────────┘
          ↓                  ↓
   hybrid retrieval + metadata filters
                  ↓
               reranker
                  ↓
          smallest sufficient context
                  ↓
                 LLM
```

## Project-aware retrieval
When a personal project is named or implied:
1. resolve project identity,
2. load Tier 0 identity,
3. load Tier 1 control context,
4. retrieve task-specific project authorities,
5. inspect real repo when implementation truth matters,
6. retrieve relevant cross-project lessons/patterns/failures,
7. expand only if evidence is insufficient.

See [[00_System/AI Runtime/Context Packing Policy]].

## Retrieval ranking
Boost in this order when relevant:
1. current canonical truth,
2. direct validated evidence,
3. accepted decisions,
4. active standards/patterns,
5. relevant current project records,
6. raw observations,
7. AI inference.

Down-rank deprecated and superseded memory.

## Suggested starting context budget
Design defaults, not laws:
- 6–10 chunks initially,
- roughly 300–700 tokens per chunk,
- about 3,000–6,000 retrieved tokens,
- second-pass expansion only when needed.

## Mandatory personal-memory triggers
Search before answering questions implying:
- what did I/we decide,
- my project,
- last time/before,
- did I solve this,
- my plan/preference,
- named personal project/company/client,
- historical comparison of Omar's work.

## Token-control rules
- never inject whole vault,
- never inject whole repo,
- never inject entire long note when sections suffice,
- cache/index unchanged content,
- re-embed only changed chunks,
- use compact project context as navigation cache, not authority,
- show/retain source paths for important claims.
