---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [retrieval, query-routing, classification]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Query Classification and Retrieval Routing

## Classes
| Query | Primary route |
|---|---|
| “What is X?” | semantic/knowledge + general source if freshness needed |
| “What did I choose?” | project/decision semantic memory + episodes |
| exact error/code/ID | lexical first, then semantic expansion |
| “What happened recently?” | episodic + recency boost |
| “How do we usually do this?” | procedural memory first |
| “Compare across projects” | semantic + graph/entity + pattern memory |
| “Build Project X” | project resolver + current truth + procedural profile + repo reality |

## Forced personal-memory search
Queries containing personal/project history concepts such as `my`, `our`, `we decided`, `before`, `last time`, known project IDs, prior failures, or previous architecture must search the Brain before answering from model memory.

## Scope narrowing
Prefer explicit filters:
- project ID,
- canonical entity ID,
- memory class,
- status,
- date window,
- architecture profile,
- `ai_access`.
