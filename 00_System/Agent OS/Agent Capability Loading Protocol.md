---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [agents, capabilities, skills, lazy-loading]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Agent Capability Loading Protocol

## Goal
Make agents smarter without making every prompt enormous.

## Sequence
```text
Task + project profile
       ↓
Detect required capabilities
       ↓
Query Capability Registry
       ↓
Load only matching skills/standards/tools
       ↓
Check permissions and version
       ↓
Execute
       ↓
Record outcome for capability evaluation
```

## Capability contract
Each capability has:
- stable `capability_id`,
- triggers,
- scope,
- required inputs,
- procedural notes,
- tools,
- risk level,
- evidence requirements,
- version,
- eval cases.

## Conflict
Project-specific approved override wins over a global default only within documented scope.
