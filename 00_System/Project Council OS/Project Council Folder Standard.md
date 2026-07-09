---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [project-council, folder-standard, project-structure]
ai_access: allowed
version: 1.0
---
# Project Council Folder Standard

## Standard project council path
```text
40_Projects/Active/<Project Name>/20_Agent_Council/
```

## Required structure
```text
20_Agent_Council/
├── 00_COUNCIL_HOME.md
├── 01_OPERATING_LOOP.md
├── 02_AGENT_ROSTER.md
├── 03_ACTIVATION_MATRIX.md
├── 04_CROSS_AGENT_HANDOFF.md
├── 05_CURRENT_PROJECT_TRUTH.md
├── 06_ENVIRONMENT_AND_REPO_READINESS.md
├── 07_ACTIVE_WORK_BOARD.md
├── 08_RULE_PROMOTION_QUEUE.md
├── 09_AGENT_FINDINGS_INDEX.md
├── Agents/
│   ├── Architecture/
│   ├── Data and Truth/
│   ├── Integration and Workflow/
│   ├── Logic and Performance/
│   ├── Product and UX/
│   ├── Runtime and Reliability/
│   └── Quality Engineer/
├── Control/
│   ├── Supervisor/
│   ├── Project Observer/
│   ├── Toolsmith/
│   ├── Critic Verifier/
│   └── Memory Curator/
├── Runtime/
│   ├── COUNCIL_STATE.json
│   ├── LOOP_STATE.json
│   └── ACTIVATION_HISTORY.jsonl
├── Runs/
├── Evidence/
└── Templates/
```

## Agent folder structure
Each specialist folder uses the same contract:
```text
<Agent>/
├── AGENT_HOME.md          # mission, ownership, read order
├── RULES.md               # current rules only
├── CHECKLIST.md           # inspection steps
├── CURRENT_FINDINGS.md    # open/current findings only
├── DECISIONS_TO_REVIEW.md # decisions requiring this agent
├── EVIDENCE_REQUIREMENTS.md
└── HANDOFF.md             # latest compact handoff
```

## Current-truth rule
`CURRENT_FINDINGS.md` must not become a graveyard. Close or move old findings into `Runs/` or evidence. Keep only active facts, active risks, unresolved decisions, and current accepted rules.

## Naming rule
Use human-readable folder names inside the project because Omar and agents must navigate fast. Use stable IDs inside records for machine tracking.

## Minimum viable council
If a project is small, create only:
```text
20_Agent_Council/00_COUNCIL_HOME.md
20_Agent_Council/01_OPERATING_LOOP.md
20_Agent_Council/02_AGENT_ROSTER.md
20_Agent_Council/07_ACTIVE_WORK_BOARD.md
20_Agent_Council/Agents/<needed agents>/
20_Agent_Council/Control/Project Observer/
```

Do not create empty ceremony unless the project will reuse it.
