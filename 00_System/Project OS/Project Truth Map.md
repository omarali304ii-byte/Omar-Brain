---
type: system
status: active
created: 2026-07-07
topics: [project, truth, documentation]
ai_access: allowed
---
# Project Truth Map

Every project must explicitly know where each kind of truth lives.

| Truth question | Project artifact | Real-world authority |
|---|---|---|
| Why does project exist? | canonical project note | owner/user intent |
| What must be delivered? | `02_REQUIREMENTS.md` | accepted requirements |
| How should it be structured? | `03_ARCHITECTURE.md` + ADRs | accepted architecture |
| What data model is intended? | `04_DATA_MODEL.md` | schema design |
| What data model exists? | current migrations/schema | repository/database |
| What APIs are contracted? | `05_API_CONTRACTS.md` | versioned contract/code |
| What security model applies? | `06_SECURITY.md` | code/config/runtime evidence |
| How is quality proven? | `07_TEST_STRATEGY.md` | executed tests/evidence |
| What comes next? | `08_ROADMAP.md` | accepted plan |
| What is true now? | `09_CURRENT_STATE.md` | verified repo/runtime state |
| What should execute next? | `10_EXECUTION_QUEUE.md` | ready work graph |
| Where is code? | `11_REPO_MAP.md` | resolved repository |
| How is it operated? | `12_RUNBOOK.md` | verified operational steps |
| Is it production-ready? | `16_PRODUCTION_READINESS.md` | repo/runtime/security/release evidence |
| What hardening executes next? | `17_PRODUCTION_HARDENING_QUEUE.md` | open findings + dependencies |
| What proves release readiness? | `18_RELEASE_EVIDENCE.md` | exact candidate gate evidence |
| Why did we choose X? | `20_Decisions/` | accepted ADR/decision |
| What proves done? | `70_Evidence/` | tests/runtime/manual evidence |
| What happened in a work session? | `80_Runs/` | dated run record |

A project agent must use the right authority for the question.
