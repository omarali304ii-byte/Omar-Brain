---
type: current-truth
status: active
created: 2026-07-09
updated: 2026-07-10
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified-static
repo_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
---
# Current Project Truth

## Current verified basis
Brain currently knows this project from Architecture scope inspection, Data & Truth full data truth reconciliation, and Integration & Workflow full integration-surface audit at revision `bd8a7a6286e3df35b1c69439eb583061bc264aa7`.

## Verified current architecture truth
- Meta webhook ingestion verifies raw-byte signature per profile (Social/WhatsApp) before parsing.
- Intelligence worker uses bounded context, strict AI JSON validation (json_schema strict mode), evidence-linked persistence, source-order tiebreaking for concurrency, and downstream opportunity refresh.
- Intelligence snapshot updates use FOR UPDATE locking on job, person, and snapshot rows plus deterministic source-order comparison (observedAt → createdAt → messageId) to reject stale concurrent updates. **Verified fixed by Data & Truth** (MWOM-DATA-003 closed).
- Stale intelligence lock recovery is wired into worker startup + periodic ticks.
- Outbound messaging has explicit three-outcome model (SENT/FAILED/RECONCILIATION_REQUIRED) with reconciliation worker for stale SENDING recovery and human reconciliation flow.
- Outbound send route currently duplicates the dedicated sendConversationMessage workflow (MWOM-ARCH-001).
- AI Brain is a coherent bounded subsystem with DB-enforced one-published-prompt-per-brain partial unique index and FOR UPDATE locking on prompt publication.
- Multi-tenant workspace/permission discipline exists with AI Brain permissions added.
- Leads routes conditionally gate intelligence evidence behind view_intelligence permission at both query and DTO layers. **Verified fixed by Data & Truth** (MWOM-DATA-001 closed).
- Provider-ID privacy is centralized via `resolveProviderIdDisplay()`. All 6 API routes consistently call `canExposeProviderId()` and pass to DTO mappers. People search only exposes providerCustomerId in queries when permitted. **Verified fixed by Data & Truth** (MWOM-DATA-002 closed).

## Current project status
```text
Feature maturity: strong MVP/advanced internal platform
Static verification: Architecture + Data & Truth surfaces verified by code inspection at bd8a7a6
CI workflow: exists (`.github/workflows/verify.yml`, 34+ steps); execution status at bd8a7a6 not verified
Runtime verification: not proven
Production readiness: blocked
Primary work: close verified active P0/P1 blockers + resolve MWOM-ARCH-001
P0 Data findings: all three (MWOM-DATA-001/002/003) closed from static verification; Quality Engineer evals pending
```

## Current active blockers (P0/P1)
- P0: Meta outbound send uncertainty model (MWOM-INT-001) — confirmed active with controls; Integration verified at bd8a7a6; transport exceptions collapsed to FAILED cannot distinguish "Meta accepted" from "never reached Meta"; Toolsmith implementation needed
- P0: Stale intelligence recovery code exists but production deployment unverified (MWOM-RUN-001)
- P1: All Meta fetch() calls lack timeout configuration (MWOM-INT-002) — new finding; Integration verified at bd8a7a6
- P1: CI/test suite does not prove all production gate blockers (MWOM-QUAL-001)
- P1: Local reproducibility/deployment/observability proof incomplete (MWOM-RUN-002)
- P1: Outbound send route duplicates workflow (MWOM-ARCH-001) — Integration provider-semantics acceptance contract defined

## Data & Truth findings
**Closed at bd8a7a6** (static confirmation, Quality Engineer execution pending):
- MWOM-DATA-001: Leads evidence gated behind view_intelligence
- MWOM-DATA-002: Provider-ID privacy centralized
- MWOM-DATA-003: Snapshot concurrency materially fixed

**Open (lower severity):**
- MWOM-DATA-004 (P3): Conservative ordering fallback for pre-migration snapshots (self-healing)
- MWOM-DATA-005 (P2): pgvector extension runtime prerequisite not enforced

## Integration & Workflow findings
**Active at bd8a7a6:**
- MWOM-INT-001 (P0): Transport exception (fetch() catch) collapsed to META_SEND_FAILED → local FAILED. Cannot distinguish "Meta never received" (safe to retry) from "Meta accepted but response lost" (dangerous to retry). Controls exist (RECONCILIATION_REQUIRED, stale SENDING recovery, no auto-retry) but gap remains at the error-classification layer. Integration verified at bd8a7a6.
- MWOM-INT-002 (P1): All Meta API fetch() calls lack timeout configuration. Only backstop is 5-minute stale SENDING recovery for outbound sends. Other Meta calls (inbox sync, publishing, OAuth) have no bound. Integration verified at bd8a7a6.

**Integration referenced (not owned):**
- MWOM-ARCH-001 (P1): Provider-semantics acceptance contract defined by Integration. Route must delegate to sendConversationMessage while preserving three-outcome model, error mapping, reconciliation marking, and AI feedback recording.

**Integration cataloged (proven at bd8a7a6):**
- 9 cross-boundary workflows documented (webhook ingestion, 2 send paths, reconciliation, intelligence processing, AI suggestions, Instagram publishing, inbox sync, OAuth connection)
- 4 external systems registered (Meta, OpenAI, Supabase, local media)
- Retry taxonomy covers all failure classes across 6 operation types
- Idempotency registry covers 6 deduplication mechanisms
- 6 cross-agent handoffs created (Architecture, Toolsmith, Runtime, Quality, Data, Logic)

## Runtime unknown
- Production deployment topology (workers, reconciliation, scheduler)
- Whether outbound-send-reconciliation-worker is deployed and running
- AI Brain knowledge ingestion pipeline implementation
- AI Brain prompt utilization in AI suggestions
- pgvector availability on production database
- Migration-applied state on production database

## Documentation rule
This file must stay current. When blockers are fixed and proven, update the summary and link evidence.
