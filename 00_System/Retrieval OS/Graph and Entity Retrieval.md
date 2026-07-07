---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [knowledge-graph, entities, links, retrieval]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Graph and Entity Retrieval

## Start simple
Use Obsidian links and stable IDs before introducing an expensive generated knowledge graph.

## Entity resolution
Resolve:
- aliases,
- project IDs,
- company/product relationships,
- people,
- repository URLs/local paths,
- skill and goal links.

## One-hop expansion
After a strong seed match, optionally inspect:
- direct backlinks,
- outbound canonical links,
- project/company/product relationships,
- supersession links.

## Deep graph retrieval
Use only for questions whose answer depends on cross-note relationships or corpus-wide synthesis. Evaluate whether it improves outcomes before making it default.
