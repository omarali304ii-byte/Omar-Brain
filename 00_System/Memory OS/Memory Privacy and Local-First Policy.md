---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [privacy, local-first, memory, ai-access]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Memory Privacy and Local-First Policy

## Default
The vault is canonical and local-first. External models receive the minimum context required for the active task.

## `ai_access`
- `allowed`: may be indexed and sent to approved models,
- `restricted`: local index allowed; external transmission requires task need and policy,
- `denied`: exclude from agent retrieval and external transmission.

## Secrets
Never store API keys, passwords, session cookies, private keys, or production secrets in notes, episodes, prompts, traces, or vector payloads.

## Tool least privilege
Agents receive only tools needed for the current task. Destructive, external, or sensitive actions require explicit risk handling.
