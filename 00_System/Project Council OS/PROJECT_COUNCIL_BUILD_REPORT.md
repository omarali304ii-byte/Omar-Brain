---
type: build-report
status: complete
created: 2026-07-09
updated: 2026-07-09
topics: [project-council, build-report]
ai_access: allowed
version: 1.0
---
# Project Council Build Report

## Added
- Global Project Council OS under `00_System/Project Council OS/`.
- New specialist agent contracts under `00_System/Agent OS/`.
- Claude-native project council skill and specialist agents under `.claude/`.
- Route registry entry `route-project-council`.
- Agent registry v4 specialist roles.
- Local Meta Word of Mouth project council under `40_Projects/Active/Meta Word of Mouth/20_Agent_Council/`.

## Design goal
Agents can enter an active project, find their own rules/current findings/evidence requirements, work in a governed loop, update current truth, and avoid rediscovering the whole project every session.

## Current-truth policy
Project council files are not long history. History goes to `Runs/` and `Evidence/`; active files stay current and small.
