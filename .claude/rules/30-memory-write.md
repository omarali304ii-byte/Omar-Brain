---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, memory, writeback]
ai_access: allowed
paths:
  - "60_Knowledge/**/*"
  - "50_Skills/**/*"
  - "85_Episodes/**/*"
  - "01_Inbox/Memory Proposals/**/*"
---
# Durable Memory Rules

Before durable write:
- identify intended memory/object type;
- search exact title, aliases, IDs, semantic near-duplicates, and canonical target;
- read the target before editing;
- preserve provenance, confidence, contradictions, and project boundaries.

Promotion discipline:
`observation -> candidate -> validated -> pattern -> standard`

Never promote from one successful project without transfer evidence. Imported context is navigation help, not proof. Worker output does not become durable semantic/procedural truth merely because it sounds useful.
