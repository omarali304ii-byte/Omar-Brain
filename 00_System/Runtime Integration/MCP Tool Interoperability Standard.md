---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [mcp, tools, interoperability, agents]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# MCP Tool Interoperability Standard

## Goal
Expose tools and data through stable contracts so the Brain is not trapped inside one agent framework or model provider.

## Rules
- every tool has a stable ID and schema,
- map MCP or framework-native tools into [[Tool Registry]],
- expose least privilege,
- distinguish resources from actions,
- declare read-only/destructive/idempotent/external behavior,
- authenticate remote transports,
- avoid exposing entire vault access when scoped tools suffice,
- tool errors are structured and observable.

## Suggested Brain tool surface
- `brain.search`
- `brain.get_note`
- `brain.resolve_project`
- `brain.get_project_boot_pack`
- `brain.propose_memory`
- `brain.create_episode`
- `brain.get_capabilities`
- `brain.get_eval_case`

## Write boundary
A generic file-write tool must not bypass the Memory Curator for semantic/procedural memory.
