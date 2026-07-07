---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [runtime, security, sandbox, privacy, tools]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Runtime Security Boundary

## Threat surfaces
- vault bridge,
- vector/document store,
- agent tool execution,
- MCP servers,
- hosted model context,
- repository credentials,
- production APIs,
- trace storage.

## Baseline
- local services bind narrowly,
- authenticate tool/data bridges,
- TLS for remote transport,
- sandbox code execution,
- separate dev and production credentials,
- deny secret files from indexing,
- enforce `ai_access` before retrieval/export,
- explicit approval for destructive/external actions,
- log tool identity and outcome without leaking secrets.

## Network
A code agent should not receive unrestricted outbound network by default merely because it runs in a container.
