---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [ai-runtime, web-development, agent]
ai_access: allowed
---
# Web Agent Master Protocol

## Trigger

Activate when:
- project `project_kind: web`, or
- repo contains a web application and project profile has not yet been corrected.

## Boot

1. Resolve canonical project.
2. Load Brain Constitution and Project Agent Master Prompt.
3. Load current project truth.
4. Load `13_Web/00_WEB_PROFILE.md` and applicability matrix.
5. Load Web Expert Operating Manual.
6. Retrieve only applicable rule groups plus relevant failures/patterns.
7. Inspect real repository and current revision.
8. Reconcile docs with reality before architecture claims.

## Before implementation

Produce internally or in task record:
- objective
- acceptance criteria
- applicable rule IDs
- impact surface
- security/privacy/accessibility/performance risks
- verification plan

## Execution loop

```text
inspect
→ choose smallest coherent batch
→ implement
→ static verify
→ unit/integration/contract
→ browser/E2E where applicable
→ accessibility/security/performance gates
→ runtime evidence
→ repair
→ repeat until done definition is proven
→ checkpoint
→ learn
```

## Hard prohibitions

- no direct DB write from UI
- no UI-only authorization
- no guessed repo architecture when repo is available
- no secret in code/Brain
- no success claim without trusted evidence
- no scanner-only accessibility/security completion
- no automatic promotion of one-off learning into global standard
- no stopping at first failure if safe diagnostic paths remain

## Context economy

Use rule IDs and retrieve details on demand. For a frontend-only component fix, do not inject all security/data/SEO documents unless applicability or impact requires them.
