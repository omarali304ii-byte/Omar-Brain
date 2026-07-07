---
type: run
status: completed
created: 2026-07-07
updated: 2026-07-07
topics: [execution-run, real-project-experience]
ai_access: allowed
project_id: prj-meta-word-of-mouth
run_id: run-mrb3iohg-6d1d9a66
result: success
verification_state: observed
source_kind: runtime
confidence: medium
---
# Production gate blocker audit intake and static verification

## Objective
Ingested Omar's production-gate audit note and statically checked the high-risk claims against local commit 8c027fabf85fe46fa0395eb459c0289872fef491 without running DB-mutating or provider/runtime tests.

## Starting state
- Brain target: `D:\Marketing 777\Final\Omar Brain`
- Project: `prj-meta-word-of-mouth`
- Local repository: `D:\Marketing 777\Meta Dev Project\Meta Word of mouth`
- Local repository HEAD remained `8c027fabf85fe46fa0395eb459c0289872fef491`
- Prior Brain state already had local static verification evidence from `run-mrb34rdn-eebbc7fd`.
- Input artifact: `C:\Users\Omar\.codex\attachments\7a61806c-3a17-48da-bc86-1d49b0ef84c8\pasted-text.txt`

## Resolved project/revision
- Project: prj-meta-word-of-mouth
- Repository/revision: `omarali304ii-byte/Meta-Word-of-mouth` at `8c027fabf85fe46fa0395eb459c0289872fef491`

## Work executed
- Read the production-gate audit source note.
- Statically inspected the local checkout for the highest-risk claims using `rg` and targeted file reads.
- Checked worker recovery wiring, People provider-ID masking/search behavior, Leads evidence exposure, outbound message send persistence, inbox provider-ID fragment exposure, intelligence memory merge/concurrency shape, error classification, workflow coverage, and `test-people-api` privacy expectations.
- Did not run DB-backed scripts, provider calls, app server, workers, or browser E2E.

## Files/artifacts changed
- Added evidence `evd-mrb3iwud-32fdb1ac` for the source audit artifact.
- Added evidence `evd-mrb3iwud-aba73203` for static repo verification of the production blockers.
- Updated the Meta Word of Mouth project packet risks, queue, current state, future path, evidence matrix, scorecard, and manifest.
- Updated runtime state and operation log after validation.

## Verification run
```text
Static repo inspection only:
- rg/Get-Content over scripts/customer-intelligence-worker.ts
- rg/Get-Content over src/lib/intelligence/customer-intelligence.ts
- rg/Get-Content over src/lib/people/people-dto.ts
- rg/Get-Content over src/lib/people/people-query.ts
- rg/Get-Content over app/api/leads routes and src/lib/opportunities/opportunity-dto.ts
- rg/Get-Content over app/api/inbox/conversations/[id]/messages/route.ts
- rg/Get-Content over src/lib/inbox/inbox-dto.ts
- rg over .github/workflows/verify.yml and package.json
- Get-Content over scripts/test-people-api.ts

```

## Results
- Result: success
- Static verification confirmed the source note's main production-gate concerns.
- Highest-risk confirmed blockers:
  - stale intelligence job recovery exists but is not called by the worker loop
  - People fallback display can expose raw provider IDs
  - People search can use provider IDs even when provider IDs are not exposable
  - AI usage feedback can be recorded before send success
  - memory merge reads existing snapshot before the transaction
  - error classification relies on string matching
  - Leads routes load/serialize opportunity evidence under only `view_leads`
  - outbound Meta send can succeed before local DB persistence/audit fails, leaving a false failed state and duplicate-send risk
  - Inbox DTO exposes provider-ID tail fragments without a provider-ID permission option
  - `test-people-api.ts` expects raw provider IDs despite default DTO masking
  - CI workflow misses `test:lead-provider-id-permissions`, `test:intelligence-permissions`, and the new proposed concurrency/recovery tests

## Failures encountered
- No command failure.
- Verification boundary remains static only.

## Root causes
- Several privacy boundaries were implemented at DTO fields but not uniformly at query/filter/evidence surfaces.
- External provider side effects are not modeled separately from local post-send persistence.
- Worker recovery logic exists but is not wired into the long-running worker loop.
- Per-person AI state updates do not serialize or guard against older jobs overwriting newer semantic state.
- CI/test coverage is script-rich but not yet aligned with the newest production risk set.

## Repairs
- Brain packet repaired to record the expanded production gate and stronger P0 ordering.
- No application code was changed in this run.

## Remaining work
- Implement the expanded P0 gate in the repository.
- Add route-level and concurrency tests.
- Run DB-backed tests only on a disposable/local database.
- Prove GitHub Actions with a real successful run after the new tests are added.

## Exact next action
- Start with the outbound Meta-send state model and Leads `view_intelligence` enforcement, because those are the highest production/privacy risks in the expanded audit.

## Learning review
- performed: true
- outcome: REUSABLE_CANDIDATES_PROPOSED

## Reusable learning candidates
- Treat successful external provider calls and successful local persistence as two separate facts; model uncertain outcomes explicitly.
- Privacy permissions must govern search/filter predicates and related evidence payloads, not only response fields.
- Worker recovery functions are not production protections until the actual worker loop invokes them.
- Route-level security tests are stronger evidence than helper/DTO tests for authorization claims.

## Failure signatures
- EXTERNAL_SEND_SUCCEEDED_LOCAL_PERSISTENCE_FAILED
- LEADS_EVIDENCE_BYPASSES_INTELLIGENCE_PERMISSION
- PROVIDER_ID_SEARCH_ORACLE
- STALE_RECOVERY_DEAD_RUNTIME_CODE
- SAME_PERSON_AI_SNAPSHOT_OUT_OF_ORDER_OVERWRITE
- TEST_EXPECTATION_DRIFTS_FROM_PRIVACY_POLICY

## Evidence links
- `evd-mrb3iwud-32fdb1ac` - production gate audit source note.
- `evd-mrb3iwud-aba73203` - static verification of production gate blockers.

## Cross-project implications
- New CRM/inbox systems should explicitly design around external side-effect uncertainty before adding optimistic retry UX.
- Privacy-sensitive identifiers must be controlled at query, DTO, UI fallback, and evidence layers together.
