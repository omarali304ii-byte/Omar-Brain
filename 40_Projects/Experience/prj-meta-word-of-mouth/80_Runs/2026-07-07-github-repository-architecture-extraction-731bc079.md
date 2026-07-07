---
type: run
status: completed
created: 2026-07-07
updated: 2026-07-07
topics: [execution-run, real-project-experience]
ai_access: allowed
project_id: prj-meta-word-of-mouth
run_id: run-mrb1o0ob-731bc079
result: success
verification_state: repo-verified
source_kind: repo
confidence: high
---
# GitHub repository architecture extraction

## Objective
Inspected the private GitHub repository at commit 8c027fabf85fe46fa0395eb459c0289872fef491 and extracted strengths, weaknesses, future path, and bounded transfer candidates without claiming runtime verification.

## Starting state
- Brain manifest existed only as contextual navigation bootstrap.
- No real runs or evidence existed for this project in the Brain.
- Project truth was explicitly marked `context-import-needs-repo-check`.

## Resolved project/revision
- Project: prj-meta-word-of-mouth
- Repository: `omarali304ii-byte/Meta-Word-of-mouth`
- Branch: `main`
- Revision: `8c027fabf85fe46fa0395eb459c0289872fef491`
- Scope: GitHub repository inspection only; no runtime execution

## Work executed
- Inspected repository metadata and recent commit history.
- Inspected `package.json`, `README.md`, `.env.example`, `prisma/schema.prisma`.
- Inspected permission/API-auth boundaries.
- Inspected raw-body webhook signature verification and transactional ingestion.
- Inspected AI job claiming, stale-lock recovery, strict output validation, evidence linkage and opportunity refresh sequencing.
- Inspected development Docker configuration and latest commit combined status.
- Built a revision-locked reference project packet.
- Extracted strengths, risks, future path and bounded cross-project learning candidates.

## Files/artifacts changed
- `40_Projects/Active/Meta Word of Mouth/*`
- `40_Projects/Manifests/prj-meta-word-of-mouth.json`
- `00_System/Connected Intelligence OS/Reference Project Extraction Protocol.md`
- object/provenance/edge ledgers
- project indexes

## Verification run
```text
Repository revision: 8c027fabf85fe46fa0395eb459c0289872fef491
Evidence records: 4
Assessment method: GitHub connector inspection
Runtime executed: no
```

## Results
- Result: success
- Project upgraded from contextual import to revision-locked `verified-repo`.
- First repo-grounded reference packet created.
- Four evidence records causally linked to this run.
- Transfer candidates remain proposed; none are promoted as universal truth.

## Failures encountered
- GitHub code search did not return useful repository results for generic queries, so inspection used exact-file retrieval and commit evidence.
- No runtime/test execution was available through this repo inspection.

## Root causes
- Repository search indexing/connector behavior was insufficient for generic discovery.
- GitHub repository inspection cannot prove local runtime or deployment state.

## Repairs
- Switched to exact known entrypoints and commit/file inspection.
- Preserved a strict repo-vs-runtime truth boundary in every generated project note.

## Remaining work
- Run local clean-checkout verification commands.
- Capture current deployment and database state.
- Validate proposed patterns in independent projects before promotion.

## Exact next action
Open the local checkout, record branch/HEAD/dirty state, run core verification commands, and add test/runtime evidence to this same project identity.

## Learning review
- performed: true
- outcome: PROPOSED_BOUNDED_CANDIDATES

## Reusable learning candidates
- Evidence-first AI decisions: persist exact source evidence, schema-validate AI output, and separate deterministic business scoring from model confidence.
- Durable async side effects: commit/enqueue before expensive AI/provider work; claim idempotently; recover stale leases.
- Signed webhook integrity: verify exact raw bytes before parsing; deduplicate at event/message layers.
- Permission-scoped DTO exposure: sensitive fields default hidden/masked and are loaded/exposed only when permission allows.
- Idempotent legacy migration: dry-run + repeated safe execution + audit marker + idempotency tests.
- Separate AI confidence, commercial strength and operational urgency as different semantics.

## Failure signatures
- `MANUAL_REGRESSION_WITHOUT_VISIBLE_CI_GATE` — many local checks exist but latest commit showed no combined statuses in this inspection.
- `TEMPORARY_ADAPTER_PRODUCTION_DRIFT` — dev webhook/OAuth adapters differ from intended owned-server production path.
- `SPLIT_DEV_INFRA_REPRODUCIBILITY_GAP` — app Docker service exists while database/public callbacks depend on external services.
- `WEAK_COMMIT_PROVENANCE` — repeated `.` commit messages erase intent and reduce future learning value.
- `LEGACY_MODEL_LINGERING` — deprecated model remains alongside replacement concepts.

## Evidence links
- `evd-mrb1oc73-25062d49` — repository revision snapshot
- `evd-mrb1oc94-40290714` — evidence-first AI/worker architecture
- `evd-mrb1ocbf-29126148` — signed webhook/idempotent ingestion
- `evd-mrb1ocdf-0f4342d1` — privacy/permissions and operational gaps

## Cross-project implications
- Future AI-enabled projects should check C1/C2 before embedding model calls in request paths.
- Future webhook projects should check C3 before body parsing.
- Future multi-tenant projects should check C4 for default-deny sensitive DTO exposure.
- Future live migrations should check C5.
- No candidate is independently validated yet.
