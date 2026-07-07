---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [gaps, blockers, runtime-state]
ai_access: allowed
version: 1.0
---
# Global Gap Register

A gap closes only with explicit fix evidence. `brain-state.json#open_gaps_summary` must match this register.

| ID | Severity | Title | Owner | Status | Fix evidence |
|---|---|---|---|---|---|
| G-001 | P2 | Dense embeddings/vector service is architected but not running inside the ZIP | Retrieval OS | OPEN | - |
| G-002 | P2 | Persistent external orchestrator/trace service is architected but not running inside the ZIP | Runtime Integration | OPEN | - |
| G-003 | P1 | Real project experience coverage is empty: no observed runs or evidence yet in v9 experience ledgers | Connected Intelligence OS | FIXED | 2026-07-07: `run-mrb34rdn-eebbc7fd`, evidence `evd-mrb351wz-ee53c349`, `evd-mrb351xk-224ef696`, `evd-mrb351xs-27ac41ce`; `node .\00_System\Automation\brain-cycle.mjs .` passed with runs=2, evidence_notes=7, events=9, edges=20, reality_eval pass_rate=1.0. |

## Rules
- Severity: P0 blocker, P1 critical, P2 important, P3 improvement.
- Status: OPEN, IN_PROGRESS, FIXED, DEFERRED, ACCEPTED_RISK.
- Never mark FIXED without a file path, command/test/eval evidence, and date.
- P0/P1 gaps are read at every startup.
