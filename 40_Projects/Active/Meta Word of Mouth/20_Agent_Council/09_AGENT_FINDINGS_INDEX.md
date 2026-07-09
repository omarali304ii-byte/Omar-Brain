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

## Active
Findings Architecture verified active at current revision via live code inspection.

| ID | Severity | Owner Agent | Status | Summary | Required proof |
|---:|---|---|---|---|---|
| MWOM-INT-001 | P0 | Integration & Workflow | open | Meta send can be accepted externally while local state marks failed, inviting duplicate retry. | retry/reconciliation regression test |
| MWOM-RUN-001 | P0 | Runtime & Reliability | open | Stale intelligence recovery code exists and is wired; production deployment/runtime not proven. | production runtime verification |
| MWOM-DATA-002 | P0 | Data & Truth | open | Provider-ID privacy inconsistent across people/search/inbox surfaces. | centralized privacy tests |
| MWOM-QUAL-001 | P1 | Quality Engineer | open | No GitHub Actions CI workflow found; 37 test scripts exist in package.json but CI execution is not proven. | CI pipeline or documented local verification |
| MWOM-RUN-002 | P1 | Runtime & Reliability | open | Local reproducibility/deployment/observability proof incomplete. | reproducible setup + runtime proof |
| MWOM-ARCH-001 | P1 | Architecture | active | Outbound send route duplicates sendConversationMessage workflow; route directly imports and calls Meta provider adapters. | acceptance contract -> Supervisor -> Toolsmith implementation -> Architecture verification |
| MWOM-ARCH-003 | P3 | Architecture | active (monitor) | customer-intelligence.ts at 865 lines; approaching split threshold. | monitor; plan split if complexity grows |

## Fixed — pending owner revalidation
Code at bd8a7a6 appears to fix or materially change these. Architecture cannot close them — owning agents must revalidate.

| ID | Old Severity | Owner Agent | Architecture Observation | Evidence | Proof Needed From Owner |
|---:|---|---|---|---|---|
| MWOM-DATA-001 | P0 | Data & Truth | Leads routes conditionally include evidence only when `view_intelligence` is true (Prisma include + DTO). | `app/api/leads/route.ts:48`, `app/api/leads/[id]/route.ts:31` | Route-level permission regression tests, DTO masking verification |
| MWOM-UX-001 | P0 | Product & UX | Feedback route rejects USED_AS_IS / EDITED_BEFORE_SEND with 409; server-side recording happens only after successful send. | `app/api/ai/suggestions/[id]/feedback/route.ts:39-49`, `app/api/inbox/conversations/[id]/messages/route.ts:394-403` | Send-success attribution test, product confirmation of behavior |
| MWOM-DATA-003 | P0 | Data & Truth / Logic & Performance | FOR UPDATE locking on job + person + snapshot within single tx; deterministic source-order tiebreak; newer-snapshot rejection. | `src/lib/intelligence/customer-intelligence.ts:571-710` | Concurrency regression test, Logic & Performance closure |

## Architecture-only findings
| ID | Severity | Status | Summary |
|---:|---|---|---|
| MWOM-ARCH-002 | P2 | superseded | Cross-domain orchestration in route (AI feedback + reconciliation) is a sub-risk of MWOM-ARCH-001. Resolved when ARCH-001 is resolved. |
| MWOM-ARCH-004 | — | moved-to-watch | AI Brain test lab is a deliberate Batch 1 placeholder, permission-gated, returning controlled response. Reclassified as deferred capability trigger (MWOM-ARCH-WATCH-001). |

## Partially resolved
| ID | Severity | Owner Agent | Summary | Missing |
|---:|---|---|---|---|
| — (provider adapter drift) | P3 | Architecture / Runtime & Reliability | Code-level multi-profile Meta config reconciled. Deployed topology unknown. | Production deployment verification. |

## Freshness
```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-09
verified_by: Architecture (correction pass)
scope: Architecture-owned surfaces, stale P0 reconciliation, AI Brain boundary, messaging/reconciliation, CI evidence audit
```
