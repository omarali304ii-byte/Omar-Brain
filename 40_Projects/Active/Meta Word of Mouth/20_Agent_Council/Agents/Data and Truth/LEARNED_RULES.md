# Data and Truth Learned Rules

Project-local, evidence-derived rules. Global promotion remains candidate-first.

## DATA-MWOM-001 — Sensitive evidence permission follows data meaning, not page permission
```yaml
id: DATA-MWOM-001
status: project-local
trigger: DTO/route returns AI evidence or source message text
rule: require explicit intelligence-exposure authorization even when parent entity is viewable
boundary: Public/non-sensitive lead metadata may remain under lead permission
evidence_required: route-level permission tests
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```
Status note: Leads routes at bd8a7a6 conditionally include evidence via `exposeIntelligence` flag derived from `view_intelligence` permission. DTO also gates evidence output. Rule is followed at code level; test execution proof pending.

## DATA-MWOM-002 — Provider identity must not become canonical display identity by fallback
```yaml
id: DATA-MWOM-002
status: project-local
trigger: UI/DTO fallback uses raw provider ID
rule: use centralized masked/display policy; raw provider IDs require explicit exposure permission
boundary: Operational internal logs may use IDs under separate access controls
evidence_required: cross-surface privacy tests
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```
Status note: `resolveProviderIdDisplay()` in provider-id.ts is the centralized masking function. All 6 API routes (people list/detail, inbox list/detail, leads list/detail) pass `exposeProviderIds` from `canExposeProviderId()`. All 3 DTO modules use `resolveProviderIdDisplay()`. Rule is followed at code level; test execution proof pending.

## DATA-MWOM-003 — Send outcome must distinguish provider acceptance from local finalization
```yaml
id: DATA-MWOM-003
status: project-local
trigger: outbound message send workflow
rule: provider-accepted + local-finalization-failed must become RECONCILIATION_REQUIRED, not FAILED
boundary: FAILED is only for provider-rejected or unknown-error-before-acceptance
evidence_required: send-reconciliation integration test
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```
Status note: send-message.ts implements three-outcome model (SENT/FAILED/RECONCILIATION_REQUIRED). When Meta accepts (providerSendId exists) but local finalization fails, message is updated to RECONCILIATION_REQUIRED with providerSendId preserved. Stale SENDING messages are escalated to RECONCILIATION_REQUIRED by recovery worker.

## DATA-MWOM-004 — One published prompt per AI Brain is a DB-enforced invariant
```yaml
id: DATA-MWOM-004
status: project-local
trigger: prompt publication workflow
rule: at most one PUBLISHED prompt version per brain; enforced by partial unique index
boundary: DRAFT versions are unconstrained
evidence_required: prompt versioning concurrency test
last_proven_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
```
Status note: Migration creates `ai_brain_prompt_versions_one_published_per_brain_idx` as `CREATE UNIQUE INDEX ... ON "ai_brain_prompt_versions"("brainId") WHERE "status" = 'PUBLISHED'`. publishPromptVersion() runs in a transaction with FOR UPDATE lock on ai_brains and updateMany to SUPERSEDED before publishing.
