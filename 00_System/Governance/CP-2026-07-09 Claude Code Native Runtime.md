---
type: change-proposal
status: completed
created: 2026-07-09
updated: 2026-07-09
topics: [system-change, claude-code, hardening]
ai_access: allowed
confidence: high
---
# CP-2026-07-09 — Claude Code Native Runtime

## Problem
Omar Brain had advanced routing, project, retrieval, production, skill, and learning protocols, but Claude Code had no native deterministic entry layer. A new Claude session could miss the Operating Map, fail to resolve a project, search broadly, ignore conditional rules, create shadow memory, or stop before Brain validation.

## Evidence
- No root `CLAUDE.md` existed.
- No `.claude/rules/`, project skills, native subagents, settings, or hooks existed.
- Existing startup behavior depended on the model discovering `START HERE.md` or the Operating Map.
- The Brain already required route-first startup, read-before-edit, minimal agents, single durable memory writer, repo inspection, and evidence-backed completion; those rules were not mapped to Claude Code lifecycle controls.
- Omar explicitly requested on 2026-07-09 that the Brain be hardened for Claude Code so it knows where to go/search/apply rules and works like Omar is thinking.

## Existing mechanisms considered
- `START HERE.md`: useful human onboarding but not a guaranteed Claude Code startup file.
- `Brain Router Prompt`: strong static prompt but not automatically injected per session/prompt.
- `brain-start.mjs` and `brain-route.mjs`: useful CLIs but not lifecycle-bound.
- Claude Code auto memory: rejected as canonical memory because it would create a machine-local shadow brain outside Memory OS governance.
- Large monolithic CLAUDE.md: rejected due context cost and adherence risk; procedures moved to lazy skills and scoped rules.

## Proposed change
Add a Claude Code native runtime:
- root compact `CLAUDE.md`,
- scoped `.claude/rules/`,
- lazy `.claude/skills/`,
- minimal `.claude/agents/`,
- project `.claude/settings.json`,
- SessionStart and UserPromptSubmit context hooks,
- destructive command and canonical write guards,
- session-local change tracking,
- validator-backed Stop gate,
- dedicated `route-claude-code`,
- dedicated runtime validator integrated into `brain-cycle.mjs`.

## Compatibility impact
- No existing top-level Brain taxonomy changes.
- No new metadata type/status/property.
- Existing Brain routes remain; one new route is added.
- Existing automation remains dependency-free Node.js.
- Project settings require Claude workspace trust before project hooks run.
- Claude auto memory is disabled only for this vault through project settings.

## Migration plan
1. Add native files without removing existing Brain runtime.
2. Link Claude Code OS from START HERE, HOME, Operating Map, and System Manifest.
3. Add route registry entry.
4. Update Brain state/HOT only after integration files exist.
5. Build/refresh derived retrieval manifest.
6. Run native runtime check and full Brain validation cycle.

## Rollback plan
- Remove root `CLAUDE.md` and `.claude/`.
- Remove `route-claude-code`.
- Remove Claude Code OS docs and dedicated runtime checker from `brain-cycle.mjs`.
- Restore prior Brain state/HOT values.
- Rebuild retrieval manifest and re-run validators.

## Files/templates/dashboards/validators affected
- `CLAUDE.md`
- `.claude/**`
- `00_System/Claude Code OS/**`
- `00_System/Navigation OS/route-registry.json`
- `00_System/Runtime State/brain-state.json`
- `00_System/Runtime State/HOT.md`
- `START HERE.md`
- `HOME.md`
- `00_System/Operating Map.md`
- `00_System/System Manifest.md`
- `00_System/Automation/check-claude-code-runtime.mjs`
- `00_System/Automation/brain-cycle.mjs`
- `00_System/Automation/README.md`

## Acceptance criteria
- [x] Root CLAUDE.md exists and is <= 200 lines.
- [x] Scoped rules and lazy skills exist.
- [x] Minimal specialist agents exist.
- [x] SessionStart injects live state.
- [x] UserPromptSubmit injects route/project/search context.
- [x] Destructive command guard denies a known destructive Git command.
- [x] Full overwrite guard denies clobbering an existing canonical file.
- [x] Auto memory is disabled for the vault.
- [x] Stop gate validates changed control-plane files.
- [x] Dedicated native runtime checker exists and is in the full Brain cycle.
- [x] Full final validation cycle passes after all edits.

## Decision
Approved for execution by Omar's explicit 2026-07-09 request to harden the Brain for Claude Code and make it route/search/apply rules like his own thinking process. Final acceptance completed after executed validation evidence: Claude runtime check 0/0, full Brain cycle exit 0, Brain validator 0/0, navigation 16 routes at 0/0, retrieval 30/30 Hit@K 1.00, project-experience retrieval 20/20, and reality eval 8/8.
