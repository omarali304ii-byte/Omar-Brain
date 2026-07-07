---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, risks, anti-patterns]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Bad Points and Risks

## Expanded Production Gate - Static Verification Added 2026-07-07

These risks were added from `run-mrb3iohg-6d1d9a66` and statically checked against local commit `8c027fabf85fe46fa0395eb459c0289872fef491`. They are not runtime incidents, but they are production blockers until fixed and proven.

### P0-1 - External Meta send success can be reported locally as failed
`app/api/inbox/conversations/[id]/messages/route.ts` calls Meta first, then updates local message/conversation/audit in the same `try`. If Meta accepts the message but local persistence fails, the `catch` can mark the local message `FAILED`, inviting a human retry and duplicate customer delivery.

### P0-2 - Leads evidence can bypass `view_intelligence`
`GET /api/leads` and `GET /api/leads/[id]` require `view_leads`, then load opportunity evidence, AI signals, confidence/value, and source-message text. `mapOpportunityDto()` serializes that evidence without an intelligence-exposure option.

### P0-3 - Stale intelligence recovery is dead runtime code
`recoverStaleIntelligenceJobs(...)` exists and contains meaningful stale-lock recovery logic, but `scripts/customer-intelligence-worker.ts` imports/calls only `processNextIntelligenceJob(...)`.

### P0-4 - Provider-ID privacy is inconsistent across query, fallback, and inbox surfaces
People DTO masking exists, but fallback display can expose `Account <raw providerCustomerId>`. People search can match `providerCustomerId` without requiring provider-ID exposure. Inbox DTO independently exposes last-six provider-ID fragments as `Meta customer ...` and `Meta ID ...`.

### P0-5 - AI suggestion usage can be recorded before send success
`ReplyComposer` can write `USED_AS_IS` / `EDITED_BEFORE_SEND` feedback before the send mutation succeeds. The send API currently accepts only text, so post-send server-side usage attribution is not implemented.

### P0-6 - Same-person intelligence updates can race
`customer-intelligence.ts` reads the existing person snapshot and computes merged memory before entering the write transaction. Separate jobs for the same person can lose memory deltas or allow an older job to overwrite newer semantic snapshot fields.

### P1-1 - Error classification is brittle
Intelligence job failure classification uses substring checks on `error.message` to infer OpenAI, database, or opportunity-refresh failure.

### P1-2 - Tests and CI do not yet prove the new gate
`.github/workflows/verify.yml` runs many scripts but misses `test:lead-provider-id-permissions` and `test:intelligence-permissions`, and no scripts exist yet for partial retry, stale lock recovery, memory concurrency, or follow-up concurrency. Existing route-security tests are mostly helper/DTO-level.

### P1-3 - `test:people-api` expectation conflicts with privacy defaults
`scripts/test-people-api.ts` calls People query/detail helpers without `exposeProviderIds: true` while expecting raw provider IDs, conflicting with current default masking behavior.

Evidence: `evd-mrb3iwud-aba73203`.

## R1 — Local environment is not self-contained
`docker-compose.yml` currently defines only the application container. PostgreSQL is external through `DATABASE_URL`; the README describes Supabase Postgres/Edge as temporary development infrastructure.

**Risk:** onboarding and reproduction depend on external state. A future project should prefer one-command local infrastructure or explicitly document external dependencies as required services.

## R2 — No visible CI status on the inspected latest commit
The repository contains many useful test scripts, but the latest inspected commit returned no combined status checks. A common `.github/workflows/ci.yml` path was also not present.

**Risk:** regression protection can remain manual. Treat this as an observed operational gap, not proof that no automation exists anywhere outside the inspected status/path.

## R3 — Commit provenance is weak
Many recent commit messages are simply `.`.

**Risk:** the repository history cannot explain intent, incident cause or architectural evolution well. This directly harms the brain's future learning quality.

## R4 — Production cutover is still pending
The README explicitly says temporary Supabase Edge adapters are used for development and final production should move webhook/OAuth endpoints to the owned server.

**Risk:** two integration paths can drift until cutover is complete.

## R5 — Disabled surface with live backend infrastructure
Instagram publishing backend exists while the user-facing content route is disabled/redirected.

**Risk:** dormant functionality still creates maintenance and security surface.

## R6 — Legacy model remains
`LeadDetails` is deprecated but not yet removed.

**Risk:** dual concepts increase cognitive load, migration complexity and accidental use of stale paths.

## R7 — Intelligence orchestration is becoming large
`src/lib/intelligence/customer-intelligence.ts` owns schema definition, prompt construction, OpenAI transport, parsing, scoring helper, queue claiming, stale recovery, context loading, persistence and orchestration.

**Risk:** one strong module can become a change hotspot. Split only when change pressure justifies it; do not fragment prematurely.

## R8 — Static role matrix may become rigid
Permissions are mapped to four fixed roles in code.

**Risk:** custom client roles or per-workspace policy changes may later require a data-driven permission model.

## R9 — Runtime/production evidence is incomplete in this brain snapshot
This assessment verified repository truth at one commit only. It did not run migrations, build, tests, workers, webhook delivery or deployment smoke.

**Risk:** never translate repo quality into runtime success without new evidence.

## R10 — Governance areas not proven by inspected evidence
Retention/deletion policy, consent/legal basis for AI processing, backup restore tests, SLOs, metrics/alerts, end-to-end browser journeys and incident runbooks were not proven in this review.

**Risk:** absence of proof is not proof of absence; these are explicit verification gaps.
