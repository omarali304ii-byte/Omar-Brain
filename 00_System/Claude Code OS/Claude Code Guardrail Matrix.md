---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, security, guardrails, validation]
ai_access: allowed
version: 1.0
---
# Claude Code Guardrail Matrix

## Deterministic guards

| Risk | Control | Behavior |
|---|---|---|
| destructive shell action | `safety-guard.mjs` PreToolUse | deny dangerous Git, disk, Docker-volume, broad delete, destructive DB patterns |
| secret exposure | `.claude/settings.json` deny rules | deny reads of env/secret/credential/key paths |
| Git internals corruption | `write-guard.mjs` | deny direct writes under `.git/` |
| canonical file clobber | `write-guard.mjs` | deny full `Write` overwrite when an existing canonical file should be edited/merged |
| derived index corruption | `write-guard.mjs` | deny direct writes to Runtime Index |
| append-only history rewrite | `write-guard.mjs` | deny direct rewrite of JSONL ledgers and operation log |
| broken control plane at completion | change tracker + `stop-gate.mjs` | run core validators and block stop on failure |
| shadow memory divergence | `autoMemoryEnabled: false` | durable learning stays in governed Brain |

## Rule-vs-hook boundary
Use rules for judgment and hooks for lifecycle invariants.

Rules handle:
- architecture preservation,
- project resolution,
- root-cause discipline,
- evidence quality,
- scope control,
- learning promotion.

Hooks handle:
- session state injection,
- per-prompt route context,
- dangerous commands,
- unsafe file write patterns,
- validation before stopping.

## Non-goal
The guards do not replace OS backups, Git review, database backup policy, sandboxing, or human approval for destructive operations. They reduce accidental damage and make critical behavior less dependent on model attention.
