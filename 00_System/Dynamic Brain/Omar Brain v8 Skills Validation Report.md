---
type: system
status: active
created: 2026-07-07
topics: [validation, skills, graph, v8]
ai_access: allowed
---
# Omar Brain v8 — Skills Validation Report

## Final architecture under test

- 61 active skills
- 61 graph nodes
- 11 lazy-loaded bundles
- candidate queue separated from active registry
- append-only skill evidence ledger
- project stack detector
- skill router v2 with bundle precedence
- connectivity validator integrated into the full brain cycle

## Strict cycle

Expected final gates:

- runtime consistency: 0 errors / 0 warnings
- navigation connectivity: 0 errors / 0 warnings
- skill registry: 0 errors / 0 warnings
- skill graph and bundles: 0 errors / 0 warnings
- vault validator: 0 errors / 0 warnings
- retrieval evaluation: 28/28, Hit@K 1.00
- Brain Health: 100/100

## Practical smoke tests

### Project stack detection

A synthetic project containing Next.js, React, Prisma, Docker, authentication, build scripts, and CI markers correctly surfaced candidate capabilities for:

- Next.js Best Practices
- Frontend Patterns
- Database Migrations
- Docker Patterns
- Security and Hardening
- Performance Optimization

The detector marks them as candidates only; it does not load all into context.

### Production bundle precedence

A request to make a Next.js website production-ready initially allowed a stack keyword to outrank the mission. Router precedence was corrected. Final behavior:

- bundle: Web Production Hardening
- primary: Security and Hardening
- stack skills remain lazy support candidates

### Candidate lifecycle

`skill-dev.mjs` successfully created an `S0_DISCOVERED` candidate without inserting it into the active registry. The smoke candidate was removed after testing.

### Evidence lifecycle

`skill-evidence.mjs` successfully appended a structured evidence event for a registered skill. The smoke event was removed after testing.

## Regression policy

The v8 upgrade is not accepted if any existing strict retrieval case fails after adding reports or skill files.
