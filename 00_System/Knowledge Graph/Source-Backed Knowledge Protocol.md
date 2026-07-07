---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [knowledge-graph, sources, provenance, retrieval]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Source-Backed Knowledge Protocol

This protocol adds a lightweight linked knowledge graph without duplicating the existing Omar Brain taxonomy.

## Canonical mapping
- raw imports/assets → `99_Assets/` or `01_Inbox/` while unprocessed,
- source records → `60_Knowledge/Sources/`,
- reusable concepts → `60_Knowledge/Concepts/`,
- named business entities → `30_Business/Organizations|Products|Clients/`,
- people → `70_People/`,
- projects → `40_Projects/`,
- synthesis/comparison/investigation → `60_Knowledge/Research/`,
- reusable procedures → `60_Knowledge/How-Tos|Playbooks|Engineering Standards/`,
- observed reusable lessons → `60_Knowledge/Lessons/` before promotion.

Do not create a second parallel wiki tree when the canonical object already has a home.

## Knowledge node model
Use four logical roles even when files live in different canonical folders:
1. **source** — one inspectable origin with provenance,
2. **concept** — one reusable idea/framework,
3. **entity** — one named person/org/product/project/tool,
4. **analysis** — one synthesis, comparison, decision support, map, or investigation.

## Source ingestion workflow
1. Preserve the raw input or stable reference.
2. Create/update one source record.
3. Extract atomic claims, dates, exact identifiers, entities, concepts, contradictions, and open questions.
4. Search canonical memory before creating nodes.
5. Update existing nodes or create small granular nodes.
6. Link every material derived claim back to source evidence.
7. Add durable reciprocal links where the relationship matters.
8. Keep direct evidence separate from inference.
9. Update relevant indexes/HQs only with useful entry points.
10. Append the meaningful operation to `00_System/Runtime State/OPERATION_LOG.md` and refresh HOT only when current focus changed.

## Relationship labels
Prefer explicit meaning:
- supports,
- contradicts,
- depends on,
- derived from,
- example of,
- owned by,
- blocks,
- supersedes,
- competes with,
- mentions.

## Query and retrieval protocol
1. Read HOT context.
2. Classify the query route.
3. Resolve canonical entities/projects.
4. Use lexical/exact search first for IDs, names, paths, errors, functions, and codes.
5. Use graph links to expand.
6. Use hybrid/semantic retrieval as a derived aid, not the sole truth mechanism.
7. Read source records before making strong factual claims.
8. Rank freshness, authority, directness, and contradiction state.
9. Assemble the smallest sufficient context pack.
10. State missing evidence rather than guessing.

## Quality bar
- no monolithic summary for a rich source,
- no unsupported certainty,
- no source-free durable claim when provenance is available,
- no duplicate canonical entities,
- no silent contradiction resolution,
- no semantic-similarity-only answer when exact/source-backed retrieval is possible.
