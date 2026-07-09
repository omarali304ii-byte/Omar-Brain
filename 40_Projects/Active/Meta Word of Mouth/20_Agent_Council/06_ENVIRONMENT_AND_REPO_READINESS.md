---
type: environment-readiness
status: active
created: 2026-07-09
updated: 2026-07-09
ai_access: allowed
project_id: prj-meta-word-of-mouth
---
# Environment and Repo Readiness

## Stored repo identity
- Repository: `omarali304ii-byte/Meta-Word-of-mouth`
- Last stored revision: `8c027fabf85fe46fa0395eb459c0289872fef491`
- Stored branch: `main`

## Stored verification commands passed
- `npm run db:validate`
- `npm run test:compat`
- `npm run test:meta-architecture`
- `npm run test:intelligence-permissions`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Stored verification limits
- No live Meta calls proven.
- No live OpenAI calls proven.
- No deployed runtime smoke proven.
- No long-running worker supervision proof.
- DB-backed tests were skipped because the configured database pointed to a remote Supabase pooler.

## Required before serious agent work
```bash
git status --short --branch
git rev-parse HEAD
node -v
npm -v
npm run db:validate
npm run typecheck
npm run lint
```

## Required before production claim
- Disposable/local database bootstrapped.
- Migrations applied to disposable/local database.
- DB-backed concurrency/recovery tests passed.
- Worker loop runtime tested.
- Provider send uncertainty/reconciliation tested with safe mocks or provider sandbox.
- Deployment, logs, health checks, backup/restore, and rollback proof recorded.
