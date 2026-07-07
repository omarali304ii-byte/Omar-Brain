---
type: project-note
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, evidence, verification]
ai_access: allowed
project_id: prj-meta-word-of-mouth
verification_state: repo-verified
repo_revision: 8c027fabf85fe46fa0395eb459c0289872fef491
---
# Evidence Matrix

## Assessment identity
- Repository: `omarali304ii-byte/Meta-Word-of-mouth`
- Revision: `8c027fabf85fe46fa0395eb459c0289872fef491`
- Method: GitHub connector file/commit inspection plus local checkout inspection and safe command execution
- Runtime execution: no long-running app/worker/provider runtime; local build/test commands only

## Local verification evidence records
- `evd-mrb351wz-ee53c349` - local clean checkout revision snapshot
- `evd-mrb351xk-224ef696` - safe static verification commands passed
- `evd-mrb351xs-27ac41ce` - DB-backed tests skipped due remote Supabase URL
- `evd-mrb3iwud-32fdb1ac` - production gate audit source artifact
- `evd-mrb3iwud-aba73203` - static verification of expanded production blockers

| Claim | Repo evidence | Confidence | Limit |
|---|---|---:|---|
| Next.js/React/Postgres/Prisma stack and many verification scripts | `package.json` SHA `8eaf0094...` | high | dependency presence is not runtime health |
| Product surfaces, architecture rules and production path | `README.md` SHA `2c84e38a...` | high | docs may drift; cross-checked selected code |
| Multi-tenant domain and evidence-linked intelligence models | `prisma/schema.prisma` SHA `b34aeadb...` | high | migration/runtime not executed |
| Raw-body signature before JSON parse | `supabase/functions/meta-webhook/index.ts` SHA `34609b07...` | high | development edge adapter path |
| Idempotent transactional webhook normalization | `_shared/webhook-ingestion.ts` SHA `5edded27...` | high | not load-tested here |
| Permission matrix + API enforcement | `permissions.ts` SHA `6e85ed83...`; `api-auth.ts` SHA `29a3fd9e...` | high | route coverage not exhaustively inspected |
| AI output schema, evidence linkage, job leases and stale recovery | `customer-intelligence.ts` SHA `2919892b...` | high | external model/runtime not called |
| Graceful worker loop | `customer-intelligence-worker.ts` SHA `530bafe0...` | high | process supervision not assessed |
| Meta architecture regression intent | `test-meta-architecture.ts` SHA `a707210e...` | high | test not executed |
| Local checkout clean on `main` at `8c027fab...` | `evd-mrb351wz-ee53c349`; `git status --short --branch`; `git rev-parse HEAD` | high | does not prove deployed revision |
| Prisma schema validates locally | `evd-mrb351xk-224ef696`; `npm run db:validate` | high | does not prove migrations applied to a live DB |
| Node/Edge crypto compatibility passes | `evd-mrb351xk-224ef696`; `npm run test:compat` | high | synthetic fixture only, no provider traffic |
| Meta architecture test passes | `evd-mrb351xk-224ef696`; `npm run test:meta-architecture` | high | no database/provider runtime |
| Intelligence DTO privacy test passes | `evd-mrb351xk-224ef696`; `npm run test:intelligence-permissions` | high | DTO-level proof, not exhaustive route proof |
| Typecheck/lint/build pass locally | `evd-mrb351xk-224ef696`; `npm run typecheck`; `npm run lint`; `npm run build` | high | no browser E2E/runtime smoke |
| DB-backed tests were intentionally skipped | `evd-mrb351xs-27ac41ce`; `.env.local` host safety inspection | high | does not prove those tests pass |
| App Docker service exists but DB is external | `docker-compose.yml` SHA `0b6a5229...` | high | another compose file was not proven absent |
| Latest inspected commit has no combined statuses | GitHub combined status for `8c027fabf85fe46fa0395eb459c0289872fef491` | high | external CI systems may exist |
| Production adapter cutover pending | `README.md` | high | current deployment not inspected |
| Legacy model not yet removed | `README.md` + Prisma schema | high | data migration completeness unknown |
| Expanded production gate audit source was ingested | `evd-mrb3iwud-32fdb1ac` | medium | source artifact; claims require repo/runtime proof |
| Stale recovery exists but worker does not invoke it | `evd-mrb3iwud-aba73203`; `scripts/customer-intelligence-worker.ts`; `customer-intelligence.ts` | high | static proof only |
| People provider-ID fallback/search privacy gaps exist | `evd-mrb3iwud-aba73203`; `people-dto.ts`; `people-query.ts` | high | static proof only |
| Leads evidence can bypass `view_intelligence` | `evd-mrb3iwud-aba73203`; `app/api/leads/*`; `opportunity-dto.ts` | high | static route/DTO proof, no HTTP test yet |
| Meta send can succeed before local persistence failure is handled as failed | `evd-mrb3iwud-aba73203`; `app/api/inbox/conversations/[id]/messages/route.ts` | high | static proof of ambiguous control flow; provider runtime not exercised |
| Same-person intelligence snapshot updates can race | `evd-mrb3iwud-aba73203`; `customer-intelligence.ts` | medium-high | static concurrency risk, not DB-concurrency tested |
| CI misses critical current production-gate scripts | `evd-mrb3iwud-aba73203`; `.github/workflows/verify.yml`; `package.json` | high | workflow observed, Actions run status not proven |

## Evidence records in brain
- `evd-mrb1oc73-25062d49` — revision snapshot
- `evd-mrb1oc94-40290714` — AI/worker architecture
- `evd-mrb1ocbf-29126148` — signed webhook/idempotency
- `evd-mrb1ocdf-0f4342d1` — privacy + operational gaps
