---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [agents, risk, approvals, tools]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Agent Risk and Approval Matrix

| Action | Default risk | Approval |
|---|---|---|
| read allowed vault notes | low | none |
| local lexical/vector search | low | none |
| propose memory | low | none |
| commit semantic memory | medium | curator; human if sensitive/low-confidence |
| change procedural memory | high | critic + change control; human for broad behavior |
| run tests/build locally | low | none |
| edit project files | medium | project scope + checkpoint |
| destructive DB migration | high | explicit approval and recovery plan |
| send external message/email | high | explicit user intent |
| deploy production | high | release policy |
| expose restricted context to external model | high | privacy policy |

## Tool annotations
Track whether a tool is:
- read-only,
- destructive,
- idempotent,
- external-network,
- secret-bearing,
- production-affecting.
