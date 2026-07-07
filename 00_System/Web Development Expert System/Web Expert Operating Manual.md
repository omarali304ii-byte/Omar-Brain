---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, ai-runtime, quality]
ai_access: allowed
---
# Web Expert Operating Manual

## Mandatory boot behavior

When a resolved project is a web project, the agent MUST load:

1. Brain Constitution
2. Project Agent Master Prompt
3. Project canonical note
4. `01_CONTEXT.md`
5. `09_CURRENT_STATE.md`
6. `10_EXECUTION_QUEUE.md`
7. `13_Web/00_WEB_PROFILE.md`
8. Web Applicability Engine
9. only applicable rule categories and project documents
10. relevant known failures/patterns from Brain

Then inspect the real repository before changing architecture.

## Expert sequence

### 1. Classify
Determine:
- public vs private
- content site vs application
- authenticated vs anonymous
- API consumer types
- personal/sensitive data
- multi-tenant
- payments/commerce
- third-party integrations
- OAuth
- webhooks
- realtime
- PWA/offline/push
- SEO/indexing
- localization/Arabic/RTL
- criticality and expected scale

### 2. Build applicability set
Use [[Web Applicability Engine]]. Every conditional rule becomes one of:
- required
- applicable
- not-applicable with reason
- deferred with owner and trigger

### 3. Inspect reality
Read package manifests, lockfiles, framework config, routes, modules, data layer, migrations, auth, permissions, background jobs, external integrations, tests, CI, deployment config and current runtime evidence.

### 4. Threat/risk map
Before high-impact implementation identify:
- assets
- actors
- trust boundaries
- abuse cases
- data loss modes
- concurrency/duplicate modes
- dependency failures
- privacy harms
- accessibility risks
- performance risks
- SEO/crawl changes if public

### 5. Execute in coherent batches
Each batch has:
- objective
- acceptance criteria
- applicable rule IDs
- expected files/modules
- risk notes
- verification commands
- evidence destination

### 6. Verify in layers
Static checks → unit → integration → E2E → accessibility → security → performance → deployed runtime, according to applicability.

### 7. Refuse false completion
The agent MUST NOT mark done merely because:
- build passed
- one happy-path test passed
- UI looks right
- code was generated
- scanner is green
- framework reports no error

### 8. Capture evidence
Evidence must include revision, environment, command/tool, result, failures, repairs and known limitations.

### 9. Learn carefully
Only verified observations become candidate lessons. Cross-project promotion follows Brain learning ladder.

## Rule application discipline

- Blocker: release cannot proceed without pass or approved exception.
- Critical: must pass before production unless explicit risk acceptance with owner and expiry.
- Major: expected baseline; deviation needs rationale.
- Minor: quality improvement; schedule consciously.

## Freshness rule

For security, browser support, framework behavior, SEO and evolving standards, re-check authoritative sources when a decision could have changed since `checked` date.
