# Data and Truth Self Review

## Current model weaknesses
- All conclusions are from static code inspection at bd8a7a6. No runtime execution evidence.
- Migration chain has been inspected but not run against a live database.
- Concurrency fixes (FOR UPDATE, source-order) are code-inspected but not proven under concurrent load.
- AI Brain knowledge ingestion pipeline (chunking, embedding) is not fully implemented — only schema and repository abstractions exist.
- Frontend components (ReplyComposer, Sidebar) were not inspected for provider ID leakage.

## Verified scope
- Full Prisma schema inspection (all 30+ models, enums, constraints, indexes, FKs)
- All 3 recent migrations (final_production_hardening, snapshot_source_order_tiebreak, ai_brain_foundation)
- All DTO modules exposing provider IDs (people-dto, inbox-dto, opportunity-dto)
- All 6 API routes exposing provider IDs (people list/detail, inbox list/detail, leads list/detail)
- Intelligence job processing pipeline (claim, process, store, fail, recover)
- Send message pipeline (send, finalize, reconcile)
- AI Brain prompt versioning (draft, publish, lock)
- Permission system (roles, permissions, provider ID gating)
- Source ordering module

## Partially inspected
- People search (people-query.ts inspected; search route not separately inspected beyond format)
- Intelligence worker script (customer-intelligence-worker.ts inspected; outbound-send-reconciliation-worker.ts structure verified)
- AI Brain routes (existence verified; full inspection of each route body not completed)
- AI Brain domain management (domains.ts structure + constants)

## Not inspected
- Frontend components for provider ID exposure
- Instagram post publishing data flow for provider ID exposure
- Webhook event processing pipeline for data truth impact
- Content media asset privacy
- Attribution touch data flow
- AI suggestion generation pipeline (how prompts are injected)
- Email/notification system for data exposure

## Static conclusions (require runtime proof)
- "Snapshot concurrency is fixed" — static inspection shows FOR UPDATE + ordering; runtime proof missing
- "Provider ID privacy is consistent" — static inspection shows centralized masking; runtime proof missing
- "Evidence is gated" — static inspection shows conditional includes; runtime proof missing
- "Prompt publication is safe" — static inspection shows partial unique index + FOR UPDATE; runtime proof missing

## Execution evidence
- CI workflow (verify.yml) exists but execution at bd8a7a6 is not verified
- 34+ test scripts defined in package.json but local execution not verified

## Runtime unknowns
- Production deployment state
- Worker runtime health
- Database schema revision match
- pgvector availability

## Blind spots
- This agent reviewed code statically. Cannot prove concurrent behavior.
- Migrations not run locally; cannot prove they apply cleanly.
- Cannot verify that Prisma generated client matches schema.
- Cannot verify that all Prisma queries respect tenant scope (relies on workspaceId pattern consistency).

## Self-check
- [x] Started from NEXT_START rather than rediscovering the whole project
- [x] Inspected changed owned files since last verified revision
- [x] Applied learned triggers (DATA-MWOM-001 through 004)
- [x] Converted meaningful failure into pattern/rule/eval where appropriate
- [x] Left exact restart pointer in NEXT_START.md
