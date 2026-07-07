---
type: skill
status: active
created: 2026-07-07
skill_id: skill-backend-patterns
category: Technical
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/Backend-Patterns/SKILL.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Backend Patterns

## Purpose

Build scalable backend services with clear API, service, repository, validation, error, transaction, caching, and async-job boundaries.

## When to activate

- backend architecture
- api design
- repository pattern
- service layer
- middleware
- n+1
- caching
- background job
- rest api

## Inputs required

- Domain/use case
- Existing backend stack
- Data model
- Auth model
- Scale and latency constraints

## Workflow

1. Map domain actions and trust boundaries before endpoints.
2. Separate transport/controller concerns from business services and data access.
3. Design resource-oriented APIs and explicit DTO/schema validation.
4. Enforce authorization in server-side use cases, not only UI/middleware.
5. Use transactions for multi-write invariants.
6. Audit N+1 queries, pagination, indexes, pooling, and cache invalidation.
7. Use jobs/queues for slow or retryable work with idempotency.
8. Standardize typed errors, request IDs, logs, and health checks.
9. Verify with unit, integration, contract, and runtime smoke evidence.

## Outputs

- Backend architecture map
- API/service/repository contracts
- Data and transaction plan
- Failure/retry strategy
- Verification evidence

## Quality gates

- [ ] No UI-direct database access when domain rules exist
- [ ] No protected mutation without server-side authorization
- [ ] No unbounded list endpoint
- [ ] No cache without invalidation strategy
- [ ] No completion without failure-path tests

## Road signs

- When **schema change** dominates → go to **Database Migrations**.
- When **containers** dominates → go to **Docker Patterns**.
- When **security** dominates → go to **Security and Hardening**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/Backend-Patterns/SKILL.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
