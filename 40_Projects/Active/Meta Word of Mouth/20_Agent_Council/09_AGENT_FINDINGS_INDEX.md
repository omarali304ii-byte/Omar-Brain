---
type: findings-index
status: active
created: 2026-07-09
updated: 2026-07-10
ai_access: allowed
project_id: prj-meta-word-of-mouth
---
# Agent Findings Index

Current active findings only. Detailed ownership lives inside each agent folder.

## Active
Findings verified active at current revision via live code inspection.

| ID | Severity | Owner Agent | Status | Summary | Required proof |
|---:|---|---|---|---|---|
| MWOM-INT-001 | P0 | Integration & Workflow | confirmed-active | Meta send transport exceptions collapsed to FAILED; cannot distinguish "Meta accepted" from "never reached Meta". Controls exist (RECONCILIATION_REQUIRED, stale recovery, no auto-retry) but error-classification gap remains. | transport-timeout fault-injection test (INT-EVAL-001) |
| MWOM-INT-002 | P1 | Integration & Workflow | new | All Meta API fetch() calls lack timeout configuration. Only backstop is 5-minute stale SENDING recovery. | timeout injection tests for all Meta API paths (INT-EVAL-004) |
| MWOM-RUN-001 | P0 | Runtime & Reliability | open | Stale intelligence recovery code exists and is wired; production deployment/runtime not proven. | production runtime verification |
| MWOM-QUAL-001 | P1 | Quality Engineer | open | GitHub Actions Verify workflow exists (`.github/workflows/verify.yml`, 34+ steps). Successful execution at verified revision bd8a7a6 is not proven by the evidence inspected. | GitHub Actions run/status evidence for current revision or equivalent local verification evidence |
| MWOM-RUN-002 | P1 | Runtime & Reliability | open | Local reproducibility/deployment/observability proof incomplete. | reproducible setup + runtime proof |
| MWOM-ARCH-001 | P1 | Architecture | active | Outbound send route duplicates sendConversationMessage workflow; route directly imports and calls Meta provider adapters. | acceptance contract -> Supervisor -> Toolsmith implementation -> Architecture verification |
| MWOM-DATA-004 | P3 | Data & Truth | open | Snapshot stale update uses conservative ordering fallback for pre-migration snapshots; self-healing after first post-migration analysis. | Monitor first analysis cycle after migration — no action needed unless production shows unexpected stale rejection |
| MWOM-DATA-005 | P2 | Data & Truth | open | AI Brain requires pgvector extension; migration creates via IF NOT EXISTS but no runtime startup check. | Deployment documentation + startup guard |
| MWOM-ARCH-003 | P3 | Architecture | active (monitor) | customer-intelligence.ts at 865 lines; approaching split threshold. | monitor; plan split if complexity grows |

## Closed — Data & Truth P0 findings verified at bd8a7a6
Static inspection confirms these are materially fixed at code level. Quality Engineer must execute regression evals to fully close.

| ID | Old Severity | Owner Agent | Status | Evidence |
|---:|---|---|---|---|
| MWOM-DATA-001 | P0 | Data & Truth | CLOSED | Leads evidence gated behind view_intelligence at both Prisma include (route.ts:48, [id]/route.ts:31) and DTO output (opportunity-dto.ts:128-151) layers. Permission check: hasPermission(role, "view_intelligence"). |
| MWOM-DATA-002 | P0 | Data & Truth | CLOSED | Provider-ID masking centralized via resolveProviderIdDisplay(). All 6 API routes (people list/detail, inbox list/detail, leads list/detail) consistently call canExposeProviderId() and pass to DTO. People search only exposes providerCustomerId in query when permitted. |
| MWOM-DATA-003 | P0 | Data & Truth / Logic & Performance | CLOSED | Snapshot updates use FOR UPDATE on job + person + snapshot within single $transaction. Deterministic source-order comparison (observedAt → createdAt → messageId). Stale update rejection when incoming source is older. |

## Fixed — pending owner revalidation
Code at bd8a7a6 appears to fix or materially change these. Architecture cannot close them — owning agents must revalidate.

| ID | Old Severity | Owner Agent | Architecture Observation | Evidence | Proof Needed From Owner |
|---:|---|---|---|---|---|
| MWOM-UX-001 | P0 | Product & UX | Feedback route rejects USED_AS_IS / EDITED_BEFORE_SEND with 409; server-side recording happens only after successful send. | `app/api/ai/suggestions/[id]/feedback/route.ts:39-49`, `app/api/inbox/conversations/[id]/messages/route.ts:394-403` | Send-success attribution test, product confirmation of behavior |

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
last_verified_at: 2026-07-10
verified_by: Architecture (correction pass), Data & Truth (full data truth reconciliation), Integration & Workflow (full integration-surface audit)
scope: Architecture-owned + Data & Truth-owned + Integration & Workflow-owned surfaces, schema, migrations, invariants, P0 reconciliation, AI Brain data model, messaging/reconciliation, webhooks, external systems, retry/idempotency, CI evidence audit
```
