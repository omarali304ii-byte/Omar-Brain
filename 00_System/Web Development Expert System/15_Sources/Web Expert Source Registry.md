---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, sources, standards]
ai_access: allowed
---

# Web Expert Source Registry

Checked: 2026-07-07

> Primary and first-party sources are preferred. Draft status is explicit; drafts must not silently become hard requirements.

## SRC-OWASP-ASVS-5 — OWASP Application Security Verification Standard 5.0.x
- Authority: OWASP
- Status: `released`
- Checked: `2026-07-07`
- URL: https://owasp.org/www-project-application-security-verification-standard/
- Use: Primary web application security verification baseline. Default production target: ASVS Level 2 for most applications; Level 3 for high-value/high-assurance systems.

## SRC-OWASP-TOP10-2025 — OWASP Top 10:2025
- Authority: OWASP
- Status: `released`
- Checked: `2026-07-07`
- URL: https://owasp.org/Top10/2025/
- Use: Awareness and threat-prioritization input. Never use as a complete security verification standard.

## SRC-OWASP-WSTG — OWASP Web Security Testing Guide
- Authority: OWASP
- Status: `stable-v4.2-plus-latest-track`
- Checked: `2026-07-07`
- URL: https://owasp.org/www-project-web-security-testing-guide/
- Use: Security test planning and manual/automated verification methodology.

## SRC-OWASP-CHEATS — OWASP Cheat Sheet Series
- Authority: OWASP
- Status: `living`
- Checked: `2026-07-07`
- URL: https://cheatsheetseries.owasp.org/
- Use: Implementation guidance for authentication, sessions, CSRF, secrets, logging, SSRF, uploads, XSS and related controls.

## SRC-WCAG-22 — Web Content Accessibility Guidelines 2.2
- Authority: W3C WAI
- Status: `W3C-Recommendation`
- Checked: `2026-07-07`
- URL: https://www.w3.org/TR/WCAG22/
- Use: Accessibility conformance baseline. Default target for user-facing web: WCAG 2.2 AA unless a stricter legal/product target applies.

## SRC-W3C-ACT-11 — Accessibility Conformance Testing Rules Format 1.1
- Authority: W3C WAI
- Status: `W3C-Recommendation`
- Checked: `2026-07-07`
- URL: https://www.w3.org/TR/act-rules-format/
- Use: Structure transparent automated, semi-automated and manual accessibility test rules.

## SRC-WHATWG-HTML — HTML Living Standard
- Authority: WHATWG
- Status: `living-standard`
- Checked: `2026-07-07`
- URL: https://html.spec.whatwg.org/
- Use: Semantic HTML, forms, document structure and web platform behavior.

## SRC-W3C-I18N — W3C Internationalization Resources
- Authority: W3C
- Status: `living`
- Checked: `2026-07-07`
- URL: https://www.w3.org/International/
- Use: Language, script, locale, bidirectional text and internationalized web design.

## SRC-WEB-VITALS — Core Web Vitals
- Authority: Google web.dev
- Status: `living`
- Checked: `2026-07-07`
- URL: https://web.dev/articles/vitals
- Use: Performance UX targets: LCP <=2.5s, INP <=200ms, CLS <=0.1 at the 75th percentile, segmented by mobile/desktop.

## SRC-HTTP-9110 — RFC 9110 HTTP Semantics
- Authority: IETF/RFC Editor
- Status: `Internet-Standard-family`
- Checked: `2026-07-07`
- URL: https://www.rfc-editor.org/info/rfc9110/
- Use: HTTP methods, status semantics, safety, idempotency, representations, validators and protocol behavior.

## SRC-HTTP-9111 — RFC 9111 HTTP Caching
- Authority: IETF/RFC Editor
- Status: `Internet-Standard-family`
- Checked: `2026-07-07`
- URL: https://www.rfc-editor.org/info/rfc9111/
- Use: HTTP cache behavior, freshness, revalidation and cache controls.

## SRC-HTTP-9205 — RFC 9205 Building Protocols with HTTP
- Authority: IETF/RFC Editor
- Status: `Best-Current-Practice-style-guidance`
- Checked: `2026-07-07`
- URL: https://www.rfc-editor.org/info/rfc9205/
- Use: Design discipline for HTTP-based APIs and application protocols.

## SRC-HTTP-9457 — RFC 9457 Problem Details for HTTP APIs
- Authority: IETF/RFC Editor
- Status: `Proposed-Standard`
- Checked: `2026-07-07`
- URL: https://www.rfc-editor.org/info/rfc9457/
- Use: Standard machine-readable HTTP error responses; obsoletes RFC 7807.

## SRC-OAUTH-9700 — RFC 9700 Best Current Practice for OAuth 2.0 Security
- Authority: IETF/RFC Editor
- Status: `Best-Current-Practice`
- Checked: `2026-07-07`
- URL: https://www.rfc-editor.org/info/rfc9700/
- Use: Current OAuth 2.0 security practices and deprecations.

## SRC-TLS-9325 — RFC 9325 Recommendations for Secure Use of TLS and DTLS
- Authority: IETF/RFC Editor
- Status: `Best-Current-Practice`
- Checked: `2026-07-07`
- URL: https://www.rfc-editor.org/info/rfc9325/
- Use: Transport security baseline.

## SRC-HSTS-6797 — RFC 6797 HTTP Strict Transport Security
- Authority: IETF/RFC Editor
- Status: `Proposed-Standard`
- Checked: `2026-07-07`
- URL: https://www.rfc-editor.org/info/rfc6797/
- Use: HTTPS-only enforcement via HSTS.

## SRC-CSP3 — Content Security Policy Level 3
- Authority: W3C
- Status: `Working-Draft`
- Checked: `2026-07-07`
- URL: https://www.w3.org/TR/CSP3/
- Use: CSP design and implementation. Treat exact spec status as draft; verify browser support before relying on newer directives.

## SRC-PERMISSIONS-POLICY — Permissions Policy
- Authority: W3C
- Status: `Working-Draft`
- Checked: `2026-07-07`
- URL: https://www.w3.org/TR/permissions-policy/
- Use: Restrict browser features/APIs for first- and third-party contexts. Verify compatibility.

## SRC-REFERRER-POLICY — Referrer Policy
- Authority: W3C
- Status: `Candidate-Recommendation-snapshot`
- Checked: `2026-07-07`
- URL: https://www.w3.org/TR/referrer-policy/
- Use: Control referrer information leakage.

## SRC-OPENAPI-311 — OpenAPI Specification 3.1.1
- Authority: OpenAPI Initiative
- Status: `released`
- Checked: `2026-07-07`
- URL: https://spec.openapis.org/oas/v3.1.1.html
- Use: Language-agnostic HTTP API contracts. A project may pin a newer supported OAS version after explicit review.

## SRC-JSONSCHEMA-202012 — JSON Schema 2020-12
- Authority: JSON Schema Project
- Status: `current-released-dialect`
- Checked: `2026-07-07`
- URL: https://json-schema.org/specification
- Use: JSON structure and validation contracts.

## SRC-NIST-SSDF-11 — NIST SP 800-218 SSDF 1.1
- Authority: NIST
- Status: `final`
- Checked: `2026-07-07`
- URL: https://csrc.nist.gov/pubs/sp/800/218/final
- Use: Secure software development lifecycle baseline.

## SRC-NIST-SSDF-12-DRAFT — NIST SSDF 1.2 / SP 800-218 Rev.1
- Authority: NIST
- Status: `initial-public-draft`
- Checked: `2026-07-07`
- URL: https://csrc.nist.gov/pubs/sp/800/218/r1/ipd
- Use: Track emerging changes only. Do not silently treat draft requirements as final.

## SRC-SLSA-12 — SLSA Specification 1.2
- Authority: SLSA / Linux Foundation community specification
- Status: `approved`
- Checked: `2026-07-07`
- URL: https://slsa.dev/spec/v1.2/
- Use: Software supply-chain integrity, source and build track controls, provenance.

## SRC-OTEL — OpenTelemetry
- Authority: OpenTelemetry / CNCF
- Status: `living-specification`
- Checked: `2026-07-07`
- URL: https://opentelemetry.io/docs/
- Use: Vendor-neutral traces, metrics and logs; correlation and instrumentation.

## SRC-SRE — Google Site Reliability Engineering Books
- Authority: Google
- Status: `published-living-site`
- Checked: `2026-07-07`
- URL: https://sre.google/books/
- Use: SLIs, SLOs, error budgets, monitoring, incident response, postmortems and release reliability.

## SRC-12FACTOR — The Twelve-Factor App
- Authority: 12factor.net
- Status: `methodology`
- Checked: `2026-07-07`
- URL: https://12factor.net/
- Use: Configuration, processes, backing services, deploy parity and operational portability. Apply as guidance, not dogma.

## SRC-GOOGLE-SEO — Google Search Central Developer Documentation
- Authority: Google Search
- Status: `living`
- Checked: `2026-07-07`
- URL: https://developers.google.com/search/docs
- Use: Crawlability, indexability, structured data and technical SEO for Google Search.

## SRC-NIST-PRIVACY-10 — NIST Privacy Framework 1.0
- Authority: NIST
- Status: `final`
- Checked: `2026-07-07`
- URL: https://www.nist.gov/privacy-framework
- Use: Privacy risk management, data processing inventory, lifecycle and minimization.

## SRC-NIST-PRIVACY-11-DRAFT — NIST Privacy Framework 1.1
- Authority: NIST
- Status: `initial-public-draft`
- Checked: `2026-07-07`
- URL: https://www.nist.gov/privacy-framework
- Use: Track emerging changes only; do not silently treat draft as final.

## SRC-W3C-PRIVACY-PRINCIPLES — W3C Privacy Principles
- Authority: W3C
- Status: `Group-Note`
- Checked: `2026-07-07`
- URL: https://www.w3.org/TR/privacy-principles/
- Use: Privacy principles for trustworthy web design.

## SRC-PLAYWRIGHT — Playwright Test Documentation
- Authority: Microsoft Playwright Project
- Status: `living`
- Checked: `2026-07-07`
- URL: https://playwright.dev/docs/best-practices
- Use: Resilient browser E2E testing when Playwright is selected.

## SRC-TESTING-LIBRARY — Testing Library Guiding Principles
- Authority: Testing Library Project
- Status: `living`
- Checked: `2026-07-07`
- URL: https://testing-library.com/docs/guiding-principles/
- Use: User-centered UI test behavior when Testing Library is selected.

## SRC-W3C-APP-MANIFEST — Web Application Manifest
- Authority: W3C
- Status: `Working-Draft`
- Checked: `2026-07-07`
- URL: https://www.w3.org/TR/appmanifest/
- Use: Installable web app metadata. Verify platform support; draft status.
