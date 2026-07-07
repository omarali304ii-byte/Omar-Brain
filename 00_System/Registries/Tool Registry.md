---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [registry, tools, risk]
ai_access: allowed
---
# Tool Registry

Every runtime tool should declare:
- stable tool ID,
- input/output schema,
- read-only vs write,
- destructive flag,
- idempotent flag,
- network scope,
- secret access,
- production impact,
- approval rule,
- timeout/retry policy.

MCP tools or framework-native functions should map into this same risk vocabulary.
