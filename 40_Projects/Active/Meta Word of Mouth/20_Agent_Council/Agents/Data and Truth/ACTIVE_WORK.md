# Data and Truth Active Work

```yaml
status: ready
active_finding_ids: ["MWOM-DATA-004", "MWOM-DATA-005"]
current_objective: >
  P0 findings (MWOM-DATA-001/002/003) are closed from static verification.
  Remaining work: execute proof evals (DATA-EVAL-001 through 003),
  monitor MWOM-DATA-004, hand off MWOM-DATA-005 to Runtime & Reliability.
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
dependencies:
  - Quality Engineer to execute/verify DATA-EVAL-001/002/003
  - Runtime & Reliability for MWOM-DATA-005 (pgvector prerequisite)
  - Logic & Performance for concurrency test execution
next_proof:
  - Route-level permission regression tests for MWOM-DATA-001 (DATA-EVAL-001)
  - Cross-surface privacy regression suite for MWOM-DATA-002 (DATA-EVAL-002)
  - Concurrency regression test for MWOM-DATA-003 (DATA-EVAL-003)
implementation_owner: Toolsmith (implementations) / Quality Engineer (executions)
next_handoff: Quality Engineer (eval execution), Runtime & Reliability (deployment docs)
```

## Priority rule
All owned P0 findings are closed from static inspection. Remaining work is proof execution (Quality Engineer domain) and deployment documentation (Runtime & Reliability domain). Data & Truth should not assign itself implementation by default.

## Work state
- [x] MWOM-DATA-001 revalidated → CLOSED (evidence gating confirmed)
- [x] MWOM-DATA-002 revalidated → CLOSED (centralized masking confirmed)
- [x] MWOM-DATA-003 revalidated → CLOSED (FOR UPDATE + deterministic ordering confirmed)
- [ ] DATA-EVAL-001 route-level permission test → Quality Engineer
- [ ] DATA-EVAL-002 cross-surface privacy regression → Quality Engineer
- [ ] DATA-EVAL-003 concurrency regression → Quality Engineer / Logic & Performance
- [ ] MWOM-DATA-004 → monitor (P3, self-healing)
- [ ] MWOM-DATA-005 → Runtime & Reliability handoff
