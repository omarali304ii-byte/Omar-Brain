---
type: system
status: active
created: 2026-07-07
topics: [validation, skills, v7]
ai_access: allowed
---
# Omar Brain v7 Skills Validation Report

## Result

**PASS**

## Skill registry

- Skills: 21
- Errors: 0
- Warnings: 0

## Navigation

- Routes: 13
- Errors: 0
- Warnings: 0

## Vault validator

- Markdown files: 340
- Errors: 0
- Warnings: 0

## Retrieval

- Dataset: `brain-retrieval-smoke-v4`
- Cases: 20
- Pass: 20
- Hit@K: 1.00
- Indexed documents: 340
- Chunks: 2279

## Brain health

- Score: 100/100

## Skill-router spot checks

- security/auth/uploads/rate limiting → `Security and Hardening` ranked #1
- PRD request → `Create PRD` ranked #1
- complex tool-heavy task + context recovery → `Planning with Files` ranked #1
- zero-downtime PostgreSQL migration → `Database Migrations` ranked #1

## Integrity rule

All imported skills remain `S1_IMPORTED` until real evidence promotes them.
