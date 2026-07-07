---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [production, hardening, quality, security]
ai_access: allowed
---
# Universal Production Hardening Matrix

Apply by evidence. Mark non-applicable gates with a reason.

| ID | Domain | Questions / minimum proof |
|---|---|---|
| PROD-001 | Scope and revision | Exact repo, branch, commit/revision, intended release, worktree state known? |
| PROD-002 | Architecture | Boundaries coherent; no dangerous bypasses; critical dependencies identified? |
| PROD-003 | Authentication | Session/token design, expiry, signing, cookie policy, logout, recovery proven? |
| PROD-004 | Authorization | Server-side object/action authorization on every protected mutation/read? |
| PROD-005 | Secrets/config | No committed secrets; env inventory; production config validated; rotation path? |
| PROD-006 | Input/file safety | Validation, size/type limits, path safety, injection/XSS/SSRF defenses where applicable? |
| PROD-007 | Abuse/rate limits | Login, signup, contact, orders, uploads, webhooks, expensive endpoints protected as applicable? |
| PROD-008 | Data integrity | Constraints, transactions, idempotency, concurrency, tenant ownership, reconciliation? |
| PROD-009 | Persistence | Mutable production data survives deploy/restart; no unsafe local-file assumptions? |
| PROD-010 | Migrations | Ordered, reversible/forward-fix plan, backups, compatibility reviewed? |
| PROD-011 | Backup/restore | Backup exists and restore is tested or explicitly evidenced? |
| PROD-012 | Dependency/supply chain | Lockfile, vulnerability review, trusted install/build, CI permissions, provenance as applicable? |
| PROD-013 | Repository hygiene | Generated reports, uploads, local DBs, debug files, secrets excluded intentionally? |
| PROD-014 | Build/type/lint | Applicable commands pass; warnings classified, not ignored blindly? |
| PROD-015 | Tests | Unit/integration/contract/E2E chosen by risk; critical journeys covered? |
| PROD-016 | Runtime verification | Real server/service smoke; negative auth cases; failure paths; external integrations as applicable? |
| PROD-017 | Web security | Headers, CSP strategy, HTTPS, cookie flags, CORS/CSRF, admin noindex as applicable? |
| PROD-018 | Performance | Budgets, large assets, N+1/query issues, caching, mobile/slow network evidence? |
| PROD-019 | Accessibility | Applicable user journeys meet target standard with automated + manual evidence? |
| PROD-020 | SEO/discoverability | Canonical, metadata, sitemap/robots, structured data, indexability where applicable? |
| PROD-021 | Internationalization | Locale, Arabic/RTL, timezone, currency/date behavior where applicable? |
| PROD-022 | Privacy/compliance | Data minimization, retention/deletion, consent, PII handling, jurisdiction requirements? |
| PROD-023 | Observability | Structured logs, errors, request IDs/traces, metrics, alerts, business signals? |
| PROD-024 | Health/readiness | Health checks and dependency readiness; startup/shutdown behavior? |
| PROD-025 | Deployment | Repeatable deploy, exact env, process model, migrations order, static/media handling? |
| PROD-026 | Rollback/recovery | Rollback or roll-forward plan, recovery runbook, data compatibility? |
| PROD-027 | Capacity/resilience | Timeouts, retries, queues, backpressure, resource limits, graceful degradation? |
| PROD-028 | Background/webhooks | Signature verification, idempotency, retries, DLQ/replay, scheduler safety where applicable? |
| PROD-029 | Documentation/runbooks | Current setup, deploy, operations, incident and recovery docs match reality? |
| PROD-030 | Known risk | Every remaining risk has owner, severity, mitigation, expiry/review date, acceptance authority? |
| PROD-031 | Independent review | Critic checks final claim against evidence and searches for missing/contradictory gates? |
| PROD-032 | Post-release | Smoke/canary, monitoring window, rollback trigger, post-release verification defined? |

## Applicability rule

The matrix is universal, not universally mandatory. For each row choose:
- `REQUIRED`
- `NOT_APPLICABLE` with reason
- `DEFERRED` with owner/expiry only if severity allows

Never mark a gate N/A merely because implementation is inconvenient.
