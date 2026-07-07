---
type: evidence
status: validated
created: 2026-07-07
updated: 2026-07-07
topics: [evidence, real-project-experience, repo]
ai_access: allowed
project_id: prj-meta-word-of-mouth
evidence_id: evd-mrb3iwud-aba73203
verification_state: observed
authority: observed
evidence_kind: repo
run_id: run-mrb3iohg-6d1d9a66
---
# Static verification of production gate blockers

## Claim supported
Supports static confirmation of production blockers: stale recovery not wired into worker, provider-ID leakage/search oracle, Leads intelligence exposure under view_leads, Meta-send DB-failure ambiguity, brittle error classification, missing CI coverage, and people-api privacy test drift.

## Evidence reference
rg/Get-Content inspection of scripts/customer-intelligence-worker.ts, src/lib/intelligence/customer-intelligence.ts, src/lib/people/people-dto.ts, src/lib/people/people-query.ts, app/api/leads routes, src/lib/opportunities/opportunity-dto.ts, app/api/inbox/conversations/[id]/messages/route.ts, src/lib/inbox/inbox-dto.ts, .github/workflows/verify.yml, scripts/test-people-api.ts

## Observation
- `scripts/customer-intelligence-worker.ts` imports and calls `processNextIntelligenceJob`; `recoverStaleIntelligenceJobs` exists in `src/lib/intelligence/customer-intelligence.ts` but is not wired into that worker loop.
- `src/lib/people/people-dto.ts` falls back to `Account ${firstIdentity.providerCustomerId}` for display name, while provider-ID fields are separately masked through `resolveProviderIdDisplay(...)`.
- `src/lib/people/people-query.ts` searches `providerCustomerId` whenever `q` is present, independent of `exposeProviderIds`.
- `src/components/inbox/ReplyComposer.tsx` can record suggestion feedback before the send mutation; the send API accepts only `{ text }`, so server-side post-send suggestion usage is not implemented.
- `src/lib/intelligence/customer-intelligence.ts` reads `personIntelligenceSnapshot` and computes `mergeDurableMemory(...)` before the transaction that writes the snapshot.
- `src/lib/intelligence/customer-intelligence.ts` classifies failures by checking substrings such as `refreshOpportunity`, `opportunity`, `database`, and `prisma` in `error.message`.
- `app/api/leads/route.ts` and `app/api/leads/[id]/route.ts` require `view_leads`, include opportunity evidence/signals/source messages, and call `mapOpportunityDto(...)` without an intelligence-exposure option.
- `src/lib/opportunities/opportunity-dto.ts` serializes evidence signal type, confidence, value, and source-message text when evidence is loaded.
- `app/api/inbox/conversations/[id]/messages/route.ts` calls `sendMetaTextMessage(...)` and then updates local message/conversation/audit inside the same `try`; the catch marks the local message `FAILED` for any error after the provider call too.
- `src/lib/inbox/inbox-dto.ts` exposes `Meta customer ${last6}` and `Meta ID ...${last6}` without a provider-ID permission option.
- `.github/workflows/verify.yml` runs many scripts but does not run `test:lead-provider-id-permissions` or `test:intelligence-permissions`; no scripts were found for the proposed partial retry, stale lock recovery, memory concurrency, or follow-up concurrency tests.
- `scripts/test-people-api.ts` calls list/detail helpers without `exposeProviderIds: true` but expects raw provider IDs, which conflicts with current default masking behavior.

## Reproduction / verification
```text
Representative static checks:
rg -n "recoverStaleIntelligenceJobs|processNextIntelligenceJob|while \\(!stopping\\)" scripts src
rg -n "providerCustomerId|Account \\$\\{|contains: q" src/lib/people scripts/test-people-api.ts
rg -n "feedbackMutation|sendMutation|USED_AS_IS|EDITED_BEFORE_SEND" src/components/inbox/ReplyComposer.tsx
rg -n "existingSnapshot|mergeDurableMemory|refreshOpportunity|OPENAI_REQUEST_FAILED|DATABASE_WRITE_FAILED" src/lib/intelligence/customer-intelligence.ts
rg -n "view_leads|view_intelligence|mapOpportunityDto|evidence|sourceMessage|signal" app/api/leads src/lib/opportunities
rg -n "sendMetaTextMessage|prisma\\.\\$transaction|MESSAGE_SENT|status: \"FAILED\"" app/api/inbox/conversations/[id]/messages/route.ts
rg -n "metaIdTail|Meta customer|Meta ID" src/lib/inbox/inbox-dto.ts
rg -n "test:lead-provider-id-permissions|test:intelligence-permissions|test:intelligence-partial-retry|test:intelligence-stale-lock-recovery|test:intelligence-memory-concurrency|test:followup-concurrency|npm run" .github package.json

```

## Limits
- This evidence is static repository inspection only.
- It does not prove exploitability with live auth/session data, provider responses, or concurrent database execution.
- It does not prove the full test suite status; DB-backed tests were still not run against the configured non-local database.
- Severity labels are risk judgments grounded in observed code paths, not runtime incidents.
