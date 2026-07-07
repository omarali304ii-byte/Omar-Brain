---
type: evidence
status: validated
created: 2026-07-07
updated: 2026-07-07
topics: [evidence, real-project-experience, repo]
ai_access: allowed
project_id: prj-meta-word-of-mouth
evidence_id: evd-mrb351xs-27ac41ce
verification_state: observed
authority: observed
evidence_kind: repo
run_id: run-mrb34rdn-eebbc7fd
---
# Database-backed tests intentionally skipped against remote Supabase URL

## Claim supported
Supports the boundary that fixture-mutating tests were not run because DATABASE_URL resolved to aws-1-eu-west-2.pooler.supabase.com rather than localhost/127.0.0.1.

## Evidence reference
.env.local DATABASE_URL safety inspection; package.json DB-backed scripts; scripts fixture cleanup review

## Observation
- `.env.local` contains a `DATABASE_URL` that parsed as:
  - scheme: `postgresql`
  - host: `aws-1-eu-west-2.pooler.supabase.com`
  - port: `5432`
  - local: `False`
- The repository includes many useful DB-backed tests, but representative scripts create fixture workspaces/users/messages/posts and later delete fixture rows.
- Because the configured DB was not local/disposable, these tests were intentionally not executed in this run.

## Reproduction / verification
```text
DATABASE_URL safety inspection result:
DATABASE_URL scheme=postgresql host=aws-1-eu-west-2.pooler.supabase.com port=5432 local=False queryPresent=False

Representative fixture-mutating scripts observed:
- scripts/test-webhook-idempotency.ts
- scripts/test-people-identity.ts
- scripts/test-people-api.ts
- scripts/test-opportunity-engine.ts
- scripts/test-opportunity-override-no-duplicate.ts
- scripts/test-followup-idempotency.ts
- scripts/test-attention-engine.ts
- scripts/test-instagram-content.ts

```

## Limits
- This evidence proves why DB-backed verification was skipped in this run.
- It does not prove those tests pass or fail.
- It does not prove the remote database contains production data; the safety decision is based only on the host not being local/test-isolated.
