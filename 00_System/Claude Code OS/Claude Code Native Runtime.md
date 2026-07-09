---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, runtime, routing, hooks]
ai_access: allowed
version: 1.0
---
# Claude Code Native Runtime

This layer makes Omar Brain operational inside Claude Code without turning Claude Code memory into a second source of truth.

## Purpose
When Claude Code opens at the vault root, it should immediately know:
- where the authoritative map is,
- how to classify the request,
- which project/entity is canonical,
- where to search next,
- which rules are applicable,
- what evidence is required before completion.

## Native control stack

```text
Claude Code session
  ↓
CLAUDE.md                         compact permanent contract
  ↓
.claude/rules/*                  conditional rule loading
  ↓
SessionStart hook                live state + HOT + critical gaps + Git snapshot
  ↓
UserPromptSubmit hook            route + project resolution + search suggestions
  ↓
Skill when procedure is relevant lazy workflow loading
  ↓
Main Claude                      supervisor
  ↓
0..N minimal specialists         isolated discovery/architecture/critic/curator
  ↓
PreToolUse guards                destructive command + write protections
  ↓
PostToolUse tracker              session-local changed control files
  ↓
Stop gate                        validator-backed refusal to stop on broken control plane
```

## Source-of-truth boundary
- `CLAUDE.md` is execution instruction, not project truth.
- `.claude/rules/` are scoped behavior rules, not durable memory.
- `.claude/skills/` are lazy procedures, not evidence.
- `.claude/agents/` are role contracts, not autonomous authorities.
- Hooks inject current runtime context, not canonical history.
- Durable semantic/procedural learning remains governed by Memory OS and Memory Curator flow.

Claude Code auto memory is disabled in this vault to prevent an unreviewed machine-local shadow brain.

## Main-agent role
The main Claude instance is the supervisor by default. It owns:
- task interpretation,
- route selection,
- project resolution,
- final synthesis,
- execution sequencing,
- deciding whether delegation is worth the context boundary.

Do not create agent swarms. Use specialists only when isolated context or independent criticism increases reliability.

## Native specialist set
- `repo-scout`: read-only repository forensics.
- `architecture-critic`: high-risk architecture challenge before implementation.
- `critic-verifier`: independent falsification of completion/readiness claims.
- `memory-curator`: governed durable write specialist.

## Failure behavior
- Missing route: fall back to route-start and preserve uncertainty.
- Ambiguous project: block project-specific writes.
- Hook failure: static CLAUDE.md contract still applies; diagnose hook with exact evidence.
- Validator failure at stop: continue the turn, repair root cause, re-run.
- External repo unavailable: mark live code truth unverified; do not promote notes to repo evidence.

## Arrival proof
Claude-native runtime is healthy when:
1. root `CLAUDE.md` loads,
2. session snapshot injects current state,
3. a user prompt receives a route packet,
4. destructive test commands are denied,
5. full overwrite of an existing canonical file is denied,
6. Brain control-plane edits trigger validation before stop,
7. all core Brain validators pass.
