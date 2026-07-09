---
type: current-truth
status: active
created: 2026-07-09
updated: 2026-07-09
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Current Project Truth

## Current verified basis
Brain currently knows this project from repo inspection and local static verification at revision `8c027fabf85fe46fa0395eb459c0289872fef491`.

Before any new coding claim, re-inspect the actual repository branch/revision.

## Current architecture truth
- Meta webhook ingestion verifies raw-byte signature before parsing.
- Webhook handling is designed to ingest/store/enqueue and avoid direct OpenAI calls.
- Intelligence worker uses bounded context, strict AI JSON validation, evidence-linked persistence, and downstream opportunity refresh.
- Multi-tenant workspace/permission discipline exists and has meaningful tests.
- Main remaining risk is operational/runtime maturity and P0 production blockers, not the basic architecture idea.

## Current project status
```text
Feature maturity: strong MVP/advanced internal platform
Static verification: previously passed
Runtime verification: not proven in stored assessment
Production readiness: blocked
Primary work: close P0/P1 production gate
```

## Current blockers summary
- Meta outbound send can create uncertain success/failure state.
- Leads APIs can expose intelligence evidence under `view_leads` without `view_intelligence`.
- Stale intelligence job recovery exists but is not wired into worker runtime.
- Provider ID privacy is inconsistent across surfaces.
- AI reply usage feedback can be recorded before send success.
- Same-person intelligence updates can race.
- Disposable DB verification and CI coverage are incomplete.

## Documentation rule
This file must stay current. When blockers are fixed and proven, update the summary and link evidence instead of leaving old risk text as active truth.
