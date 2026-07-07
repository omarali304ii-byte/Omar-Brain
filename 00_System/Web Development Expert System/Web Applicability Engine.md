---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, routing, rules]
ai_access: allowed
---
# Web Applicability Engine

## Purpose

Never run every web rule blindly. Build the exact required rule set from project facts.

## Step 1 — classify project facts

```yaml
web:
  public: true|false
  indexable: true|false
  authenticated: true|false
  admin: true|false
  personal_data: true|false
  sensitive_data: true|false
  multi_tenant: true|false
  external_integrations: true|false
  oauth: true|false
  webhooks: true|false
  realtime: true|false
  file_upload: true|false
  payments: true|false
  ecommerce: true|false
  pwa: true|false
  offline: true|false
  push: true|false
  localized: true|false
  rtl: true|false
  critical_production: true|false
  multi_client_api: true|false
```

## Step 2 — universal baseline

Always evaluate:
- ARCH
- FE when UI exists
- BE when server logic exists
- API when HTTP/API exists
- DATA when persistent data exists
- SEC
- A11Y for user-facing UI
- PERF for user-facing UI
- TEST
- DEL
- SUP
- OBS/REL according to production criticality

## Step 3 — conditional activation

- `public && indexable` → SEO
- `personal_data` → PRIV
- `localized || rtl` → I18N
- `pwa || offline || push` → PWA
- `oauth` → OAuth-specific SEC/API rules
- `webhooks` → webhook API/SEC/OBS rules
- `multi_tenant` → tenant DATA/SEC/TEST rules
- `file_upload` → file security rules
- `critical_production` → SLO, DR, release and incident gates

## Step 4 — record result

Every web project maintains `13_Web/01_APPLICABILITY_MATRIX.md`.

Each rule is:
- `required`
- `applicable`
- `not-applicable` + reason
- `deferred` + owner + trigger + expiry

A missing classification is not a pass.
