---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, roadmap, production]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Future Path

## P0 - Expanded Production Gate Before Any Production Claim
1. Protect external Meta send side effects from local persistence failures.
2. Enforce `view_intelligence` on Leads evidence and source-message exposure.
3. Wire stale intelligence job recovery into the actual worker loop.
4. Close provider-ID leaks and search oracles across People and Inbox.
5. Record AI suggestion usage only after verified send success and handle variants correctly.
6. Serialize or guard same-person intelligence snapshot updates so older jobs cannot overwrite newer state.
7. Replace string-based intelligence failure classification with explicit stage-aware errors.

## P0 — Make verification automatic
Create CI gates for at least:
- install with lockfile discipline
- Prisma validate/generate
- typecheck
- lint
- build
- highest-risk regression scripts

Add database-backed test jobs only where deterministic setup is available.

## P0 — Close the production integration split
Move webhook and OAuth callbacks to the owned production server, verify parity, preserve encryption-key continuity, then retire temporary adapters deliberately.

## P1 — Reproducible local environment
Add a provider-neutral local PostgreSQL service or an explicit bootstrap profile so a new developer can start from a clean machine without hidden external state.

## P1 — Finish legacy retirement
Measure migration completeness, lock old writes, remove `LeadDetails` reads/writes, archive migration tooling after evidence and delete the model only through a safe migration.

## P1 — Production observability
Add worker health, queue age, failed-job counts, webhook error rate, ingestion duplicates, Meta provider failures, AI latency/cost and follow-up engine health. Define alert thresholds and runbooks.

## P1 — Critical journey E2E
Automate at minimum:
1. owner setup/login
2. workspace permission denial
3. inbound message -> stored conversation
4. intelligence job -> evidence-linked signal -> opportunity refresh
5. human reply policy enforcement
6. follow-up task lifecycle

## P2 — Intelligence module decomposition by pressure
Potential future boundaries:
- analyzer contract/transport
- prompt/context builder
- queue lease/recovery
- result persistence
- orchestration

Do not split just to create more files; split when independent change/testing needs become real.

## P2 — Permission evolution
If custom client roles appear, migrate from fixed role arrays to permission grants/policies while preserving deny-by-default DTO exposure.

## P2 — Data governance assessment
Explicitly define retention, deletion, export, AI-processing disclosure/consent requirements and audit expectations for customer conversation data.

## P2 — Decide dormant publishing surface
Either finish and expose Instagram publishing with full product/security gates or remove/feature-gate unused pathways to reduce surface area.
