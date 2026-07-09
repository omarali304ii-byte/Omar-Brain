---
type: current-truth
status: active
created: 2026-07-09
updated: 2026-07-09
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified-static
repo_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
---
# Current Project Truth

## Current verified basis
Brain currently knows this project from bounded Architecture scope inspection and static verification at revision `bd8a7a6286e3df35b1c69439eb583061bc264aa7`. Scope: Architecture-owned surfaces, AI Brain subsystem, intelligence worker changes, messaging/reconciliation boundary, schema-impacting drift, and architecture-sensitive tests. Frontend components, Instagram publishing workflow, CI/CD deployment config, and non-architecture test details were not inspected.

Before any new coding claim, re-inspect the actual repository branch/revision.

## Verified current architecture truth
- Meta webhook ingestion verifies raw-byte signature per profile (Social/WhatsApp) before parsing.
- Webhook handling is designed to ingest/store/enqueue and avoid direct OpenAI calls.
- Intelligence worker uses bounded context, strict AI JSON validation (json_schema strict mode),
  evidence-linked persistence, source-order tiebreaking for concurrency, and downstream opportunity refresh.
- Stale intelligence lock recovery is wired into worker startup + periodic ticks (resolved at 9a6b2f2).
- Intelligence snapshot updates use FOR UPDATE locking on job, person, and snapshot rows,
  plus deterministic source-order comparison to reject stale concurrent updates.
- Outbound messaging has explicit three-outcome model (SENT/FAILED/RECONCILIATION_REQUIRED)
  with reconciliation worker for stale SENDING recovery and human reconciliation flow.
- Outbound send route currently duplicates the dedicated sendConversationMessage workflow (MWOM-ARCH-001).
- AI Brain is a coherent bounded subsystem. Routes are thin (auth + validation + domain delegation).
  Domain modules (brain-profile, prompt-versions, domains) access Prisma directly; knowledge access
  uses a dedicated repository abstraction (KnowledgeRepository -> pgvector). Not all modules share
  a single repository layer.
- AI Brain prompt lifecycle: DRAFT -> PUBLISHED -> SUPERSEDED with FOR UPDATE locking.
- AI Brain test lab endpoint is a deliberate placeholder, permission-gated, returning controlled response.
- `src/services/ai-brain.service.ts` is a frontend HTTP client wrapper, not a backend application service.
- Multi-tenant workspace/permission discipline exists with AI Brain permissions added (view/manage/test_ai_brain).
- Leads routes conditionally gate intelligence evidence behind view_intelligence permission at query time.
- 37 test scripts are defined in package.json. No GitHub Actions CI workflow file exists on disk.
  Test execution evidence is per-script and must be stated explicitly; do not infer CI execution
  from script existence.

## Current project status
```text
Feature maturity: strong MVP/advanced internal platform
Static verification: Architecture-owned surfaces verified by code inspection at bd8a7a6
CI execution: not proven (no GitHub Actions workflow found)
Runtime verification: not proven
Production readiness: blocked
Primary work: close verified active P0/P1 blockers + resolve MWOM-ARCH-001
```

## Current active blockers
Confirmed active at bd8a7a6 by Architecture code inspection:
- P0: Meta outbound send uncertainty model (MWOM-INT-001) — active, requires Integration verification
- P0: Stale intelligence recovery code exists but production deployment unverified (MWOM-RUN-001)
- P0: Provider-ID privacy inconsistent (MWOM-DATA-002) — active, requires Data & Truth verification
- P1: CI/test suite does not prove all production gate blockers (MWOM-QUAL-001)
- P1: Local reproducibility/deployment/observability proof incomplete (MWOM-RUN-002)

## Likely fixed — pending owner revalidation
Code at bd8a7a6 appears to gate intelligence evidence, but owning agents must confirm:

- **MWOM-DATA-001** (old P0): Leads routes conditionally include evidence only when `hasPermission("view_intelligence")` is true, at both query time (Prisma include) and DTO level. Architecture cannot close this alone — Data & Truth and Quality Engineer must revalidate.
  - Evidence: `app/api/leads/route.ts:48` (`evidence: exposeIntelligence ? {...} : false`), `app/api/leads/[id]/route.ts:31` (same pattern)
  - Status: likely-fixed-pending-data-logic-quality-proof

- **MWOM-UX-001** (old P0): AI suggestion feedback route rejects USED_AS_IS / EDITED_BEFORE_SEND with 409 ("recorded only after a successful message send"). Server-side feedback recording occurs only after successful send in the inbox messages route. Architecture cannot close UX/Quality claims from static inspection.
  - Evidence: `app/api/ai/suggestions/[id]/feedback/route.ts:39-49` (explicit rejection), `app/api/inbox/conversations/[id]/messages/route.ts:394-403` (post-send recording)
  - Status: likely-fixed-pending-product-and-quality-proof

- **MWOM-DATA-003** (old P0): Intelligence snapshot updates use FOR UPDATE locking on job, person, and snapshot within a single transaction. Source-order comparison rejects stale concurrent updates. Deterministic tiebreaking (observedAt -> createdAt -> messageId). Concurrency protections are materially stronger than the original race model describes.
  - Evidence: `src/lib/intelligence/customer-intelligence.ts:571-710` ($transaction with FOR UPDATE, source-order gate)
  - Status: likely-fixed-pending-data-logic-quality-proof

## Partially resolved
- Provider adapter drift: Code-level multi-profile Meta config is reconciled. Deployed production adapter topology remains unknown. Status: partially-resolved, pending Runtime & Reliability deployment verification.

## Runtime unknown
- Production deployment topology (workers, reconciliation, scheduler)
- Whether outbound-send-reconciliation-worker is deployed and running in production
- AI Brain knowledge ingestion pipeline implementation
- AI Brain prompt utilization in AI suggestions (whether published prompts are injected)

## Documentation rule
This file must stay current. When blockers are fixed and proven, update the summary
and link evidence instead of leaving old risk text as active truth.
