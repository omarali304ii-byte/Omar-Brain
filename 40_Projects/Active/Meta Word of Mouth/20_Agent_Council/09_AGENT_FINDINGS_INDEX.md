---
type: findings-index
status: active
created: 2026-07-09
updated: 2026-07-09
ai_access: allowed
project_id: prj-meta-word-of-mouth
---
# Agent Findings Index

Current active findings only. Detailed ownership lives inside each agent folder.

| ID | Severity | Owner Agent | Status | Summary | Required proof |
|---:|---|---|---|---|---|
| MWOM-INT-001 | P0 | Integration & Workflow | open | Meta send can be accepted externally while local state marks failed, inviting duplicate retry. | retry/reconciliation regression test |
| MWOM-DATA-001 | P0 | Data & Truth | open | Leads routes can expose intelligence evidence without `view_intelligence`. | route-level permission tests |
| MWOM-RUN-001 | P0 | Runtime & Reliability | open | Stale intelligence recovery code exists and is wired; production deployment/runtime not proven. | production runtime verification |
| MWOM-DATA-002 | P0 | Data & Truth | open | Provider-ID privacy inconsistent across people/search/inbox surfaces. | centralized privacy tests |
| MWOM-UX-001 | P0 | Product & UX | open | AI suggestion usage may be recorded before send success. | send-success attribution test |
| MWOM-DATA-003 | P0 | Data & Truth / Logic & Performance | open | Same-person intelligence snapshot updates can race. | concurrency regression test |
| MWOM-QUAL-001 | P1 | Quality Engineer | open | CI/test suite does not prove all production gate blockers. | CI includes critical gates |
| MWOM-RUN-002 | P1 | Runtime & Reliability | open | Local reproducibility/deployment/observability proof incomplete. | reproducible setup + runtime proof |
| MWOM-ARCH-001 | P1 | Architecture | active | Outbound send route duplicates sendConversationMessage workflow; route directly orchestrates Meta send. | route refactored to delegate; send-integrity + route-security tests pass |
| MWOM-ARCH-002 | P2 | Architecture | active | Inbox messages route owns cross-domain orchestration (AI feedback + reconciliation marking inline). | AI feedback moved to post-send concern |
| MWOM-ARCH-003 | P3 | Architecture | active (monitor) | customer-intelligence.ts at 865 lines; approaching split threshold. | monitor; plan split if complexity grows |
| MWOM-ARCH-004 | P3 | Architecture | active | AI Brain test lab is a placeholder with no runtime execution. | implement test lab or accept as deferred |

## Recently resolved
| ID | Severity | Owner Agent | Status | Summary | Evidence |
|---:|---|---|---|---|---|
| MWOM-RUN-001 (partial) | P0 | Architecture | partially resolved | Stale intelligence recovery now wired into worker (9a6b2f2). Production deployment still unverified. | ARCH-EVAL-004 passed; worker calls recoverStaleIntelligenceJobs |

## Freshness
```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```
