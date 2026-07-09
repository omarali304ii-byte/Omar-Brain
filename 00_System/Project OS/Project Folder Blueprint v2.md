---
type: system
status: active
created: 2026-07-07
topics: [project, blueprint, scaffold]
ai_access: allowed
version: 3.0
---
# Project Folder Blueprint v2

## Core packet for every project

```text
40_Projects/Active/<Project Name>/
├── <Project Name>.md              # canonical identity + outcome
├── 01_CONTEXT.md                  # compact AI boot context
├── 02_REQUIREMENTS.md             # desired behavior and acceptance
├── 08_ROADMAP.md                  # phases/batches
├── 09_CURRENT_STATE.md            # current truth only
├── 10_EXECUTION_QUEUE.md          # next executable work graph
├── 15_Ideas/                      # project-scoped possibilities
├── 20_Decisions/                  # ADRs and meaningful choices
├── 40_Tasks/                      # complex atomic work records
├── 50_Research/                   # project-specific investigations
├── 60_Problems/                   # project-scoped unresolved/solved issues
├── 70_Evidence/                   # verification evidence
├── 80_Runs/                       # dated agent/human execution runs
└── 90_Archive/                    # superseded local material
```

## Software profile additions

```text
├── 03_ARCHITECTURE.md
├── 04_DATA_MODEL.md
├── 05_API_CONTRACTS.md
├── 06_SECURITY.md
├── 07_TEST_STRATEGY.md
├── 11_REPO_MAP.md
├── 12_RUNBOOK.md
├── 16_PRODUCTION_READINESS.md       # production audit + status
├── 17_PRODUCTION_HARDENING_QUEUE.md # blocker/warning fix graph
├── 18_RELEASE_EVIDENCE.md           # candidate/release proof
└── 30_Features/                    # feature contracts when useful
```

## Rules
- canonical project note remains compact,
- `01_CONTEXT.md` is a retrieval accelerator, not a second source of truth,
- `09_CURRENT_STATE.md` contains current reality, not chronological history,
- task details live in task notes when complexity warrants,
- run records are append-only evidence of execution,
- a project-specific override requires an ADR,
- production artifacts are mandatory control surfaces for software projects; they begin `NOT_ASSESSED`, not `READY`,
- no ad-hoc folder invention without a demonstrated need.

## Project Council addition
Medium/large active software projects may include:

```text
├── 20_Agent_Council/                 # local specialist-agent operating surface
│   ├── 00_COUNCIL_HOME.md
│   ├── 01_OPERATING_LOOP.md
│   ├── 02_AGENT_ROSTER.md
│   ├── 03_ACTIVATION_MATRIX.md
│   ├── 05_CURRENT_PROJECT_TRUTH.md
│   ├── 07_ACTIVE_WORK_BOARD.md
│   ├── 09_AGENT_FINDINGS_INDEX.md
│   ├── Agents/
│   ├── Control/
│   ├── Runtime/
│   ├── Runs/
│   └── Evidence/
```

Use it when the project needs repeated specialist observation, audit, fixing, and documentation. Keep current files current; preserve long history only in Runs/Evidence.

## v14 Living Project Council
Software or long-running projects that benefit from specialist continuity may include `20_Agent_Council/` scaffolded by Project Council OS v2. Each role receives the full cognitive stack and runtime restart state. The council is current truth, not a project diary.
