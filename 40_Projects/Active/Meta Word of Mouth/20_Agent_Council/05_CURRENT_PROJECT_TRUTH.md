---
type: current-truth
status: active
created: 2026-07-09
updated: 2026-07-09
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
---
# Current Project Truth

## Current verified basis
Brain currently knows this project from full architecture inspection and static verification at revision `bd8a7a6286e3df35b1c69439eb583061bc264aa7`.

Before any new coding claim, re-inspect the actual repository branch/revision.

## Current architecture truth
- Meta webhook ingestion verifies raw-byte signature per profile (Social/WhatsApp) before parsing.
- Webhook handling is designed to ingest/store/enqueue and avoid direct OpenAI calls.
- Intelligence worker uses bounded context, strict AI JSON validation (json_schema strict mode),
  evidence-linked persistence, source-order tiebreaking for concurrency, and downstream opportunity refresh.
- Stale intelligence lock recovery is now wired into worker startup + periodic ticks (resolved at 9a6b2f2).
- Outbound messaging has explicit three-outcome model (SENT/FAILED/RECONCILIATION_REQUIRED)
  with reconciliation worker for stale SENDING recovery and human reconciliation flow.
- Outbound send route currently duplicates the dedicated sendConversationMessage workflow (MWOM-ARCH-001).
- AI Brain is a coherent new bounded subsystem with proper route/service/repository layer separation.
  Prompt lifecycle: DRAFT -> PUBLISHED -> SUPERSEDED with FOR UPDATE locking.
- AI Brain test lab is a placeholder (planned capability, not a production gap).
- Multi-tenant workspace/permission discipline exists with AI Brain permissions added (view/manage/test_ai_brain).
- Leads routes gate intelligence evidence behind view_intelligence permission.
- CI pipeline runs 30+ test steps including comprehensive architecture, security, and integrity tests
  on pgvector-enabled PostgreSQL.

## Current project status
```text
Feature maturity: strong MVP/advanced internal platform
Static verification: passed (30+ CI test steps)
Runtime verification: not proven in stored assessment
Production readiness: blocked
Primary work: close P0/P1 production gate + resolve MWOM-ARCH-001
```

## Current blockers summary
Taken from agent findings index at bd8a7a6:
- P0: Meta outbound send uncertainty model (MWOM-INT-001)
- P0: Leads routes intelligence evidence gating (MWOM-DATA-001)
- P0: Stale intelligence recovery wired but needs production verification (MWOM-RUN-001)
- P0: Provider-ID privacy inconsistent (MWOM-DATA-002)
- P0: AI suggestion usage before send success (MWOM-UX-001)
- P0: Same-person intelligence concurrency race (MWOM-DATA-003)
- P1: CI doesn't prove all production gates (MWOM-QUAL-001)
- P1: Local reproducibility incomplete (MWOM-RUN-002)

## Documentation rule
This file must stay current. When blockers are fixed and proven, update the summary
and link evidence instead of leaving old risk text as active truth.
