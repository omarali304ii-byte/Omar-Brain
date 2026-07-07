---
type: system
status: active
created: 2026-07-07
topics: [skills, graph, routing]
ai_access: allowed
---
# Skill Graph Standard

The marketplace is a capability graph, not a pile of files.

## Relationship types

- `related`: useful neighbor; do not auto-load.
- `handoff_to`: the next skill owns a distinct responsibility.
- `requires_context`: prerequisite context, not another skill.
- `bundle_member`: reusable route preset.

## Laws

1. Every active skill has at least one meaningful edge.
2. A handoff names why responsibility changes.
3. AI starts with one primary skill.
4. Add support skills only through an explicit handoff, graph edge, detected stack need, or selected bundle.
5. Never load the whole category.
6. Cycles are allowed when work genuinely iterates; hidden infinite loops are not.
7. Graph edges must reference registered skill IDs.

## Canonical files

- `00_System/Skill OS/skill-registry.json`
- `00_System/Skill OS/skill-graph.json`
- `00_System/Skill OS/skill-bundles.json`
- [[00_System/Skill OS/Skill Composition and Handoff Protocol]]
