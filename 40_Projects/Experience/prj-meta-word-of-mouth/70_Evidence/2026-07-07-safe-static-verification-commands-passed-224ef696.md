---
type: evidence
status: validated
created: 2026-07-07
updated: 2026-07-07
topics: [evidence, real-project-experience, test]
ai_access: allowed
project_id: prj-meta-word-of-mouth
evidence_id: evd-mrb351xk-224ef696
verification_state: observed
authority: observed
evidence_kind: test
run_id: run-mrb34rdn-eebbc7fd
---
# Safe static verification commands passed

## Claim supported
Supports that Prisma schema validation, pure compatibility/Meta/privacy tests, TypeScript, ESLint, and Next production build passed locally on commit 8c027fabf85fe46fa0395eb459c0289872fef491.

## Evidence reference
npm run db:validate; npm run test:compat; npm run test:meta-architecture; npm run test:intelligence-permissions; npm run typecheck; npm run lint; npm run build

## Observation
- Prisma schema validation passed.
- Node/Edge compatibility checks passed for webhook HMAC, OAuth-state hashing, and token encryption/decryption fixtures.
- Meta architecture checks passed for split Social/WhatsApp profiles, OAuth scopes, publishing readiness, send-window policy, and signature profile separation.
- Intelligence permission checks passed; DTO mapping hides intelligence summaries and signal evidence by default/without permission.
- TypeScript, ESLint, and Next production build passed.
- The production build enumerated 43 app routes/pages, including the current API surface for inbox, AI suggestions, Meta sync/webhooks/OAuth/manual connect, people, leads, followups, Instagram content, public media, setup, auth, and workspace management.

## Reproduction / verification
```text
npm run db:validate
> prisma validate
The schema at prisma\schema.prisma is valid

npm run test:compat
compatibility checks passed
webhook_signature_fixture=af1f973befc57ce3343a5993066a3632c73c190d052a3913b4e8bd91e67a027d
oauth_state_hash_fixture=a8ae6e6ee929abea3afcfc5258c8ccd6f85273e0d4626d26c7279f3250f77c8e
token_fixture=v1:ICEiIyQlJicoKSor:cAjs8rEjqnoRyObprFS1yg==:oUPIBAT9bmd5USGhrGiVjbkrgPmq9AadGNsYfSLvMA==

npm run test:meta-architecture
meta architecture checks passed

npm run test:intelligence-permissions
intelligence permissions checks passed

npm run typecheck
tsc --noEmit completed with exit code 0

npm run lint
eslint . completed with exit code 0

npm run build
Next.js 16.2.9 compiled successfully.
Generated static pages: 43/43.

```

## Limits
- This evidence proves the listed local commands passed on the inspected checkout.
- It does not prove fixture-mutating DB behavior, live webhooks, Meta Graph delivery, OpenAI calls, deployed runtime health, user browser journeys, or worker process supervision.
- The `token_fixture` above is a synthetic compatibility fixture from the test script, not a real secret.
