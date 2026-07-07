---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, rules, quality]
ai_access: allowed
---

# Web Rule Registry

Total rules: **276**

> Machine-readable source: `web-rules.json`. Each rule must be evaluated by applicability and proven with evidence.

## ARCH

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-ARCH-001` | blocker | Single authoritative owner per state | all | Source-of-truth matrix + data-flow diagram + tests for write path |
| `WEB-ARCH-002` | critical | Explicit trust boundaries | all | Architecture diagram with trust boundaries; threat model links |
| `WEB-ARCH-003` | major | Layered business flow | application | Repo map + dependency inspection + representative tests |
| `WEB-ARCH-004` | major | No architecture by page | application | Module map and ownership table |
| `WEB-ARCH-005` | major | Dependency direction is intentional | all | Dependency graph or static-boundary checks |
| `WEB-ARCH-006` | critical | External systems behind gateways | external-integration | Gateway contract + integration tests |
| `WEB-ARCH-007` | major | Request lifecycle is traceable | application | Sequence diagram or request-flow note |
| `WEB-ARCH-008` | critical | Failure modes designed first | production | Failure-mode table + chaos/fault tests where justified |
| `WEB-ARCH-009` | major | Stateless compute by default | scalable-service | Architecture review + restart test |
| `WEB-ARCH-010` | major | Background work is explicit | async-work | Job contract + tests + dashboard/metrics |
| `WEB-ARCH-011` | critical | Environment config separated from code | all | Config schema + secret scan + startup validation |
| `WEB-ARCH-012` | major | Project-specific architecture decisions recorded | all | Decision record link |
| `WEB-ARCH-013` | blocker | Architecture follows real repository | existing-project | Repo inspection record + revision hash |
| `WEB-ARCH-014` | major | Change blast radius identified | all | Impact checklist attached to task/PR |
| `WEB-ARCH-015` | critical | Reversible migration path | production-change | Migration/release plan + tested rollback where feasible |
| `WEB-ARCH-016` | major | Smallest coherent change batch | all | Task graph + PR/change scope |
| `WEB-ARCH-017` | critical | No hidden critical side effects | all | Code review + event/side-effect map |
| `WEB-ARCH-018` | major | Architecture freshness checkpoint | long-lived | Last-reviewed date + drift report |

### WEB-ARCH-001 — Single authoritative owner per state
- Severity: `blocker`
- Applies when: `all`
- Rule: Every durable business fact MUST have one authoritative owner. Replicas, caches and read models MUST declare freshness and invalidation semantics.
- Required evidence: Source-of-truth matrix + data-flow diagram + tests for write path
- Test mode: `review`
- Sources: `SRC-12FACTOR`

### WEB-ARCH-002 — Explicit trust boundaries
- Severity: `critical`
- Applies when: `all`
- Rule: Document browser, server, database, worker, third-party, admin and tenant trust boundaries before implementing sensitive flows.
- Required evidence: Architecture diagram with trust boundaries; threat model links
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-NIST-SSDF-11`

### WEB-ARCH-003 — Layered business flow
- Severity: `major`
- Applies when: `application`
- Rule: UI/routes MUST not contain durable business rules or direct persistence writes; use explicit use-case/service boundaries and persistence gateways.
- Required evidence: Repo map + dependency inspection + representative tests
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-ARCH-004 — No architecture by page
- Severity: `major`
- Applies when: `application`
- Rule: Design modules around business capabilities and invariants, not only screens or routes.
- Required evidence: Module map and ownership table
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-ARCH-005 — Dependency direction is intentional
- Severity: `major`
- Applies when: `all`
- Rule: Define allowed dependency direction. Cycles across business modules require an architecture decision or refactor.
- Required evidence: Dependency graph or static-boundary checks
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-ARCH-006 — External systems behind gateways
- Severity: `critical`
- Applies when: `external-integration`
- Rule: Third-party APIs, queues, email, payment, Meta, storage and search MUST be isolated behind gateways/adapters with timeout, retry and error translation policies.
- Required evidence: Gateway contract + integration tests
- Test mode: `review`
- Sources: `SRC-SRE`, `SRC-NIST-SSDF-11`

### WEB-ARCH-007 — Request lifecycle is traceable
- Severity: `major`
- Applies when: `application`
- Rule: Document request/action flow from input through validation, authorization, business logic, transaction, side effects and response.
- Required evidence: Sequence diagram or request-flow note
- Test mode: `review`
- Sources: `SRC-OTEL`, `SRC-OWASP-ASVS-5`

### WEB-ARCH-008 — Failure modes designed first
- Severity: `critical`
- Applies when: `production`
- Rule: For every critical flow define timeout, partial failure, duplicate delivery, stale state, dependency outage and recovery behavior.
- Required evidence: Failure-mode table + chaos/fault tests where justified
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-ARCH-009 — Stateless compute by default
- Severity: `major`
- Applies when: `scalable-service`
- Rule: Do not rely on process memory for durable cross-request state; persist durable state in explicit backing services.
- Required evidence: Architecture review + restart test
- Test mode: `review`
- Sources: `SRC-12FACTOR`

### WEB-ARCH-010 — Background work is explicit
- Severity: `major`
- Applies when: `async-work`
- Rule: Long-running, retryable or scheduled work MUST have explicit job ownership, idempotency, visibility, retry/dead-letter and reconciliation strategy.
- Required evidence: Job contract + tests + dashboard/metrics
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-ARCH-011 — Environment config separated from code
- Severity: `critical`
- Applies when: `all`
- Rule: Environment-varying configuration and secrets MUST not be hardcoded in source. Configuration schema, defaults and required variables MUST be explicit.
- Required evidence: Config schema + secret scan + startup validation
- Test mode: `review`
- Sources: `SRC-12FACTOR`, `SRC-OWASP-CHEATS`

### WEB-ARCH-012 — Project-specific architecture decisions recorded
- Severity: `major`
- Applies when: `all`
- Rule: Any deviation from global baseline MUST be captured as a decision with rationale, trade-offs and revisit trigger.
- Required evidence: Decision record link
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-ARCH-013 — Architecture follows real repository
- Severity: `blocker`
- Applies when: `existing-project`
- Rule: AI and humans MUST inspect the current repo, schema, deployments and tests before proposing major architecture changes.
- Required evidence: Repo inspection record + revision hash
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-ARCH-014 — Change blast radius identified
- Severity: `major`
- Applies when: `all`
- Rule: Before cross-module changes identify affected APIs, data, permissions, caches, jobs, analytics, tests, docs and operational runbooks.
- Required evidence: Impact checklist attached to task/PR
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-ARCH-015 — Reversible migration path
- Severity: `critical`
- Applies when: `production-change`
- Rule: Risky architecture changes MUST define rollback, roll-forward or compatibility strategy before deployment.
- Required evidence: Migration/release plan + tested rollback where feasible
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-ARCH-016 — Smallest coherent change batch
- Severity: `major`
- Applies when: `all`
- Rule: Implement the smallest batch that can be independently verified; do not mix unrelated refactors with behavior changes without explicit reason.
- Required evidence: Task graph + PR/change scope
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-ARCH-017 — No hidden critical side effects
- Severity: `critical`
- Applies when: `all`
- Rule: Critical side effects MUST be explicit in service flow and observable; avoid implicit hooks that bypass transaction, authorization or audit rules.
- Required evidence: Code review + event/side-effect map
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-OTEL`

### WEB-ARCH-018 — Architecture freshness checkpoint
- Severity: `major`
- Applies when: `long-lived`
- Rule: Active projects MUST periodically verify architecture docs against code and runtime reality.
- Required evidence: Last-reviewed date + drift report
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

## FE

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-FE-001` | major | Semantic HTML first | user-interface | DOM inspection + accessibility checks |
| `WEB-FE-002` | major | Native controls before custom widgets | interactive-ui | Manual keyboard test + role/name/state inspection |
| `WEB-FE-003` | major | Explicit button types | forms | Static review/test |
| `WEB-FE-004` | major | One source of truth for UI state | stateful-ui | State ownership map + tests |
| `WEB-FE-005` | major | Server state distinguished from client state | application | State inventory + cache invalidation tests |
| `WEB-FE-006` | major | URL represents shareable navigation state | navigable-app | Navigation tests |
| `WEB-FE-007` | major | All async states designed | all | UI state matrix + component/E2E tests |
| `WEB-FE-008` | blocker | No false success | mutating-ui | Mutation tests including server failure |
| `WEB-FE-009` | critical | Forms preserve user work | important-forms | E2E failure-path test |
| `WEB-FE-010` | major | Errors actionable and associated | forms | Keyboard/screen-reader/manual test |
| `WEB-FE-011` | major | Responsive by content not device names | all | Responsive matrix screenshots/tests |
| `WEB-FE-012` | critical | Touch targets and focus visibility | interactive-ui | WCAG audit + keyboard test |
| `WEB-FE-013` | major | Stable layout dimensions | media-ui | CLS measurement + DOM/CSS review |
| `WEB-FE-014` | major | Component API over copy-paste | componentized-ui | Duplication review + component contracts |
| `WEB-FE-015` | major | No giant god components | componentized-ui | File/cohesion review; >600 lines triggers review |
| `WEB-FE-016` | major | Client boundary minimized | hybrid-rendering | Bundle analysis + boundary review |
| `WEB-FE-017` | critical | Third-party scripts governed | third-party-script | Third-party inventory + CSP/consent/perf evidence |
| `WEB-FE-018` | major | Progressive enhancement for critical flows | public-or-critical-flow | Throttled/JS-failure tests |

### WEB-FE-001 — Semantic HTML first
- Severity: `major`
- Applies when: `user-interface`
- Rule: Use native semantic HTML elements for their intended meaning before adding ARIA or generic div/span interaction patterns.
- Required evidence: DOM inspection + accessibility checks
- Test mode: `review`
- Sources: `SRC-WHATWG-HTML`, `SRC-WCAG-22`

### WEB-FE-002 — Native controls before custom widgets
- Severity: `major`
- Applies when: `interactive-ui`
- Rule: Prefer native button, link, input, select, dialog and form behavior unless a custom widget has a documented need and complete keyboard/AT behavior.
- Required evidence: Manual keyboard test + role/name/state inspection
- Test mode: `review`
- Sources: `SRC-WHATWG-HTML`, `SRC-WCAG-22`

### WEB-FE-003 — Explicit button types
- Severity: `major`
- Applies when: `forms`
- Rule: Buttons inside forms MUST declare intended type when accidental submit behavior is possible.
- Required evidence: Static review/test
- Test mode: `review`
- Sources: `SRC-WHATWG-HTML`

### WEB-FE-004 — One source of truth for UI state
- Severity: `major`
- Applies when: `stateful-ui`
- Rule: Do not duplicate the same authoritative state across URL, global store, local component and server cache without synchronization rules.
- Required evidence: State ownership map + tests
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-FE-005 — Server state distinguished from client state
- Severity: `major`
- Applies when: `application`
- Rule: Remote/server state, URL state, ephemeral interaction state and persisted client state MUST have separate ownership semantics.
- Required evidence: State inventory + cache invalidation tests
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-FE-006 — URL represents shareable navigation state
- Severity: `major`
- Applies when: `navigable-app`
- Rule: Filters, pagination, selected resources and deep-linkable views SHOULD use stable URLs when users need refresh/share/back-forward behavior.
- Required evidence: Navigation tests
- Test mode: `review`
- Sources: `SRC-HTTP-9110`

### WEB-FE-007 — All async states designed
- Severity: `major`
- Applies when: `all`
- Rule: Every async user journey MUST define loading, success, empty, partial, error, retry, offline where relevant and permission-denied states.
- Required evidence: UI state matrix + component/E2E tests
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-FE-008 — No false success
- Severity: `blocker`
- Applies when: `mutating-ui`
- Rule: UI MUST not display durable success before the trusted write boundary confirms success; optimistic UI requires explicit rollback/reconciliation.
- Required evidence: Mutation tests including server failure
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-FE-009 — Forms preserve user work
- Severity: `critical`
- Applies when: `important-forms`
- Rule: Validation/server errors SHOULD preserve non-sensitive user input; destructive navigation with unsaved work requires deliberate handling.
- Required evidence: E2E failure-path test
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-FE-010 — Errors actionable and associated
- Severity: `major`
- Applies when: `forms`
- Rule: Validation errors MUST identify the problem, associate with affected controls and provide recovery guidance without relying only on color.
- Required evidence: Keyboard/screen-reader/manual test
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-FE-011 — Responsive by content not device names
- Severity: `major`
- Applies when: `all`
- Rule: Design layouts for content constraints and tested viewport ranges; do not assume fixed device classes.
- Required evidence: Responsive matrix screenshots/tests
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-FE-012 — Touch targets and focus visibility
- Severity: `critical`
- Applies when: `interactive-ui`
- Rule: Interactive targets and focus indicators MUST satisfy the project accessibility target; never remove focus outline without an accessible replacement.
- Required evidence: WCAG audit + keyboard test
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-FE-013 — Stable layout dimensions
- Severity: `major`
- Applies when: `media-ui`
- Rule: Reserve space for images, embeds, ads and async content when dimensions can be known to prevent layout shifts.
- Required evidence: CLS measurement + DOM/CSS review
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-FE-014 — Component API over copy-paste
- Severity: `major`
- Applies when: `componentized-ui`
- Rule: Repeated stable UI behavior SHOULD become shared primitives; domain-specific behavior stays near the feature.
- Required evidence: Duplication review + component contracts
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-FE-015 — No giant god components
- Severity: `major`
- Applies when: `componentized-ui`
- Rule: Split components when they combine unrelated data fetching, business decisions, rendering, mutation and orchestration.
- Required evidence: File/cohesion review; >600 lines triggers review
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-FE-016 — Client boundary minimized
- Severity: `major`
- Applies when: `hybrid-rendering`
- Rule: Do not move code to the browser merely for convenience; keep secrets and privileged logic server-side and minimize shipped JavaScript.
- Required evidence: Bundle analysis + boundary review
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`, `SRC-OWASP-ASVS-5`

### WEB-FE-017 — Third-party scripts governed
- Severity: `critical`
- Applies when: `third-party-script`
- Rule: Every third-party script MUST have owner, purpose, data impact, performance impact, failure behavior and removal path.
- Required evidence: Third-party inventory + CSP/consent/perf evidence
- Test mode: `review`
- Sources: `SRC-CSP3`, `SRC-W3C-PRIVACY-PRINCIPLES`

### WEB-FE-018 — Progressive enhancement for critical flows
- Severity: `major`
- Applies when: `public-or-critical-flow`
- Rule: Critical content/actions SHOULD remain understandable and recoverable under slow JS, failed chunks or partial hydration where architecture permits.
- Required evidence: Throttled/JS-failure tests
- Test mode: `review`
- Sources: `SRC-WHATWG-HTML`, `SRC-SRE`

## BE

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-BE-001` | blocker | Validate at trusted boundary | all | Schema validation + negative tests |
| `WEB-BE-002` | blocker | Authorization on every protected action | protected-resource | Permission tests for allow/deny/cross-tenant cases |
| `WEB-BE-003` | critical | Business invariants in services/domain | application | Unit/integration tests around invariants |
| `WEB-BE-004` | critical | Transactions match invariants | multi-write | Transaction tests including injected failure |
| `WEB-BE-005` | critical | Idempotency for retryable commands | retryable-write | Duplicate-delivery tests |
| `WEB-BE-006` | critical | Concurrency conflicts deliberate | concurrent-write | Concurrent test + DB constraint evidence |
| `WEB-BE-007` | critical | Timeout every remote call | external-integration | Config + failure test |
| `WEB-BE-008` | critical | Retries bounded and selective | external-integration | Retry policy + tests |
| `WEB-BE-009` | major | Errors translated by boundary | all | Error contract tests |
| `WEB-BE-010` | critical | No swallowed failures | all | Code review + fault injection |
| `WEB-BE-011` | critical | Jobs observable and reconcilable | async-work | Job metrics/dashboard + recovery runbook |
| `WEB-BE-012` | critical | Schedulers safe under multiple instances | scheduled-work | Multi-instance test/design evidence |
| `WEB-BE-013` | major | Graceful shutdown | service | Shutdown integration test |
| `WEB-BE-014` | major | Startup validates dependencies/config | service | Startup tests + health semantics |
| `WEB-BE-015` | critical | Structured audit for high-impact actions | sensitive-action | Audit event tests and retention policy |

### WEB-BE-001 — Validate at trusted boundary
- Severity: `blocker`
- Applies when: `all`
- Rule: Treat all client and external-provider input as untrusted; validate shape, type, ranges, ownership context and business invariants server-side.
- Required evidence: Schema validation + negative tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-JSONSCHEMA-202012`

### WEB-BE-002 — Authorization on every protected action
- Severity: `blocker`
- Applies when: `protected-resource`
- Rule: Enforce authorization at trusted server boundaries for each action/resource; hidden UI is never authorization.
- Required evidence: Permission tests for allow/deny/cross-tenant cases
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-BE-003 — Business invariants in services/domain
- Severity: `critical`
- Applies when: `application`
- Rule: Durable business rules MUST live in reusable server-side use-case/domain boundaries, not only route handlers or UI.
- Required evidence: Unit/integration tests around invariants
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-BE-004 — Transactions match invariants
- Severity: `critical`
- Applies when: `multi-write`
- Rule: Operations that must succeed/fail together MUST share an explicit transaction boundary; external side effects require outbox/saga/reconciliation where atomicity is impossible.
- Required evidence: Transaction tests including injected failure
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-BE-005 — Idempotency for retryable commands
- Severity: `critical`
- Applies when: `retryable-write`
- Rule: Commands exposed to network retry, webhook redelivery, jobs or payment/order creation MUST define idempotency semantics and key scope.
- Required evidence: Duplicate-delivery tests
- Test mode: `review`
- Sources: `SRC-HTTP-9110`, `SRC-SRE`

### WEB-BE-006 — Concurrency conflicts deliberate
- Severity: `critical`
- Applies when: `concurrent-write`
- Rule: For contested state define locking, version checks, uniqueness constraints, atomic updates or conflict responses; never assume requests serialize.
- Required evidence: Concurrent test + DB constraint evidence
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-BE-007 — Timeout every remote call
- Severity: `critical`
- Applies when: `external-integration`
- Rule: Remote calls MUST have finite timeouts appropriate to user/job budget; defaults are not accepted blindly.
- Required evidence: Config + failure test
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-BE-008 — Retries bounded and selective
- Severity: `critical`
- Applies when: `external-integration`
- Rule: Retry only failures likely to be transient; use bounded attempts, backoff/jitter where appropriate and avoid retrying non-idempotent work without protection.
- Required evidence: Retry policy + tests
- Test mode: `review`
- Sources: `SRC-SRE`, `SRC-HTTP-9110`

### WEB-BE-009 — Errors translated by boundary
- Severity: `major`
- Applies when: `all`
- Rule: Infrastructure/provider errors MUST be translated into stable domain/application errors without leaking secrets or vendor internals.
- Required evidence: Error contract tests
- Test mode: `review`
- Sources: `SRC-HTTP-9457`, `SRC-OWASP-ASVS-5`

### WEB-BE-010 — No swallowed failures
- Severity: `critical`
- Applies when: `all`
- Rule: Do not catch and ignore failures that change correctness; handled failures require explicit fallback, metric/log and user/job outcome.
- Required evidence: Code review + fault injection
- Test mode: `review`
- Sources: `SRC-OTEL`, `SRC-SRE`

### WEB-BE-011 — Jobs observable and reconcilable
- Severity: `critical`
- Applies when: `async-work`
- Rule: Jobs MUST expose status, attempts, age, terminal failure and reconciliation path for important work.
- Required evidence: Job metrics/dashboard + recovery runbook
- Test mode: `review`
- Sources: `SRC-OTEL`, `SRC-SRE`

### WEB-BE-012 — Schedulers safe under multiple instances
- Severity: `critical`
- Applies when: `scheduled-work`
- Rule: Scheduled tasks MUST define leader/lease/unique job semantics so scale-out does not duplicate unsafe work.
- Required evidence: Multi-instance test/design evidence
- Test mode: `review`
- Sources: `SRC-12FACTOR`, `SRC-SRE`

### WEB-BE-013 — Graceful shutdown
- Severity: `major`
- Applies when: `service`
- Rule: Services/workers SHOULD stop accepting new work, finish or safely checkpoint in-flight work and close resources within deployment timeout.
- Required evidence: Shutdown integration test
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-BE-014 — Startup validates dependencies/config
- Severity: `major`
- Applies when: `service`
- Rule: Fail fast on invalid required configuration; distinguish optional dependency degradation from impossible startup.
- Required evidence: Startup tests + health semantics
- Test mode: `review`
- Sources: `SRC-12FACTOR`, `SRC-SRE`

### WEB-BE-015 — Structured audit for high-impact actions
- Severity: `critical`
- Applies when: `sensitive-action`
- Rule: High-impact business/admin/security actions MUST emit durable audit evidence with actor, action, target, time and outcome while avoiding secret leakage.
- Required evidence: Audit event tests and retention policy
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-OWASP-CHEATS`

## API

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-API-001` | critical | HTTP method semantics respected | http-api | Contract review + integration tests |
| `WEB-API-002` | major | Status codes represent outcome | http-api | OpenAPI/contract tests |
| `WEB-API-003` | critical | Machine-readable error contract | http-api | Contract tests |
| `WEB-API-004` | major | API contract version pinned | http-api | OpenAPI artifact + lint/contract check |
| `WEB-API-005` | critical | Request/response schemas explicit | http-api | Schema tests |
| `WEB-API-006` | critical | Compatibility policy explicit | multi-client-api | Versioning policy + consumer tests |
| `WEB-API-007` | critical | Pagination bounded | collection-api | Load/contract tests |
| `WEB-API-008` | critical | Filtering and sorting allowlisted | query-api | Negative tests/security review |
| `WEB-API-009` | major | Resource identifiers opaque enough | public-api | Authorization tests |
| `WEB-API-010` | major | Conditional requests used when valuable | cacheable-api | HTTP tests |
| `WEB-API-011` | critical | Cacheability explicit | http-api | Header tests |
| `WEB-API-012` | critical | Idempotency contract documented | retryable-write | Duplicate/replay tests |
| `WEB-API-013` | major | Rate-limit behavior explicit | public-api | Load/limit tests + docs |
| `WEB-API-014` | major | Correlation IDs propagate | distributed-request | Trace/log evidence |
| `WEB-API-015` | blocker | Webhooks verify authenticity before parsing trust | webhook | Real signed fixture tests including modified payload |
| `WEB-API-016` | critical | Webhooks acknowledge and process deliberately | webhook | Redelivery/out-of-order tests |
| `WEB-API-017` | critical | Outbound webhooks safe | outbound-webhook | Contract + retry tests |
| `WEB-API-018` | blocker | OAuth follows current BCP | oauth | Flow diagram + security tests |
| `WEB-API-019` | critical | CORS is allowlist not auth | cross-origin-api | Header/security tests |
| `WEB-API-020` | blocker | API secrets never in URLs | all | Static review + log test |
| `WEB-API-021` | critical | File transfer contracts bounded | upload-download | Upload/download negative tests |
| `WEB-API-022` | critical | Realtime authentication lifecycle | websocket-or-sse | Connection expiry/permission tests |
| `WEB-API-023` | major | No undocumented magic fields | http-api | Contract review/tests |
| `WEB-API-024` | critical | Time and timezone semantics explicit | time-data | Schema + timezone tests |
| `WEB-API-025` | major | Partial update semantics explicit | patch-api | Contract tests |

### WEB-API-001 — HTTP method semantics respected
- Severity: `critical`
- Applies when: `http-api`
- Rule: Use HTTP methods according to safety/idempotency semantics; do not hide state-changing behavior behind GET.
- Required evidence: Contract review + integration tests
- Test mode: `review`
- Sources: `SRC-HTTP-9110`, `SRC-HTTP-9205`

### WEB-API-002 — Status codes represent outcome
- Severity: `major`
- Applies when: `http-api`
- Rule: Choose status codes by protocol outcome, not frontend convenience; document async, conflict, validation, auth and not-found behavior.
- Required evidence: OpenAPI/contract tests
- Test mode: `review`
- Sources: `SRC-HTTP-9110`

### WEB-API-003 — Machine-readable error contract
- Severity: `critical`
- Applies when: `http-api`
- Rule: Use one stable error shape. Prefer RFC 9457 problem details where suitable and include machine-readable type/code without leaking sensitive internals.
- Required evidence: Contract tests
- Test mode: `review`
- Sources: `SRC-HTTP-9457`

### WEB-API-004 — API contract version pinned
- Severity: `major`
- Applies when: `http-api`
- Rule: Maintain an explicit OpenAPI contract for externally consumed or multi-client APIs; pin version and validate in CI.
- Required evidence: OpenAPI artifact + lint/contract check
- Test mode: `review`
- Sources: `SRC-OPENAPI-311`

### WEB-API-005 — Request/response schemas explicit
- Severity: `critical`
- Applies when: `http-api`
- Rule: Define schemas for payloads and validate at boundaries; distinguish absent, null and empty semantics.
- Required evidence: Schema tests
- Test mode: `review`
- Sources: `SRC-JSONSCHEMA-202012`, `SRC-OPENAPI-311`

### WEB-API-006 — Compatibility policy explicit
- Severity: `critical`
- Applies when: `multi-client-api`
- Rule: Define what is breaking, deprecation window and migration process before independent clients depend on the API.
- Required evidence: Versioning policy + consumer tests
- Test mode: `review`
- Sources: `SRC-OPENAPI-311`

### WEB-API-007 — Pagination bounded
- Severity: `critical`
- Applies when: `collection-api`
- Rule: Large collections MUST use bounded pagination; define stable order and cursor/offset trade-offs. Never return unbounded datasets by default.
- Required evidence: Load/contract tests
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-API-008 — Filtering and sorting allowlisted
- Severity: `critical`
- Applies when: `query-api`
- Rule: Expose only supported filter/sort fields and operators; prevent arbitrary query construction from untrusted input.
- Required evidence: Negative tests/security review
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-API-009 — Resource identifiers opaque enough
- Severity: `major`
- Applies when: `public-api`
- Rule: Do not rely on guess-resistant IDs for authorization; choose identifier shape deliberately and always enforce ownership.
- Required evidence: Authorization tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-API-010 — Conditional requests used when valuable
- Severity: `major`
- Applies when: `cacheable-api`
- Rule: For expensive/cacheable resources consider validators such as ETag/Last-Modified and correct conditional semantics.
- Required evidence: HTTP tests
- Test mode: `review`
- Sources: `SRC-HTTP-9110`, `SRC-HTTP-9111`

### WEB-API-011 — Cacheability explicit
- Severity: `critical`
- Applies when: `http-api`
- Rule: Sensitive and mutable responses MUST have deliberate cache semantics; shared caching requires explicit review.
- Required evidence: Header tests
- Test mode: `review`
- Sources: `SRC-HTTP-9111`

### WEB-API-012 — Idempotency contract documented
- Severity: `critical`
- Applies when: `retryable-write`
- Rule: If an endpoint supports idempotency keys, define key generation, scope, expiration, replay response and conflicting-payload behavior.
- Required evidence: Duplicate/replay tests
- Test mode: `review`
- Sources: `SRC-HTTP-9110`

### WEB-API-013 — Rate-limit behavior explicit
- Severity: `major`
- Applies when: `public-api`
- Rule: Define abuse/resource protection limits and client-visible behavior when limits apply; avoid silently relying on infrastructure defaults.
- Required evidence: Load/limit tests + docs
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-SRE`

### WEB-API-014 — Correlation IDs propagate
- Severity: `major`
- Applies when: `distributed-request`
- Rule: Generate/accept safe correlation context and propagate across services/jobs without treating client-provided IDs as trusted identity.
- Required evidence: Trace/log evidence
- Test mode: `review`
- Sources: `SRC-OTEL`

### WEB-API-015 — Webhooks verify authenticity before parsing trust
- Severity: `blocker`
- Applies when: `webhook`
- Rule: Verify provider-defined signature/authenticity using the exact required raw representation and replay protections before treating payload as trusted.
- Required evidence: Real signed fixture tests including modified payload
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-API-016 — Webhooks acknowledge and process deliberately
- Severity: `critical`
- Applies when: `webhook`
- Rule: Separate receipt from long processing when needed; define deduplication, ordering assumptions, retries, dead-letter and reconciliation.
- Required evidence: Redelivery/out-of-order tests
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-API-017 — Outbound webhooks safe
- Severity: `critical`
- Applies when: `outbound-webhook`
- Rule: Sign outbound events where appropriate, document retries and event IDs, prevent secret leakage and allow consumers to deduplicate.
- Required evidence: Contract + retry tests
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-API-018 — OAuth follows current BCP
- Severity: `blocker`
- Applies when: `oauth`
- Rule: OAuth integrations MUST be reviewed against RFC 9700; deprecated/insecure modes are not allowed by convenience.
- Required evidence: Flow diagram + security tests
- Test mode: `review`
- Sources: `SRC-OAUTH-9700`

### WEB-API-019 — CORS is allowlist not auth
- Severity: `critical`
- Applies when: `cross-origin-api`
- Rule: CORS configuration MUST be minimal and explicit; never treat CORS as authorization. Credentials with broad origins are prohibited.
- Required evidence: Header/security tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-API-020 — API secrets never in URLs
- Severity: `blocker`
- Applies when: `all`
- Rule: Do not place credentials, bearer tokens or sensitive personal data in URLs/query strings when avoidable because URLs leak to logs/history/referrers.
- Required evidence: Static review + log test
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-REFERRER-POLICY`

### WEB-API-021 — File transfer contracts bounded
- Severity: `critical`
- Applies when: `upload-download`
- Rule: Define allowed size, type verification, storage, scanning/quarantine where needed, authorization and content disposition for files.
- Required evidence: Upload/download negative tests
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-API-022 — Realtime authentication lifecycle
- Severity: `critical`
- Applies when: `websocket-or-sse`
- Rule: Long-lived connections MUST define origin/auth checks, expiry, revocation, authorization per subscription/action and backpressure.
- Required evidence: Connection expiry/permission tests
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-API-023 — No undocumented magic fields
- Severity: `major`
- Applies when: `http-api`
- Rule: Fields with sentinel values, implicit units, polymorphism or special strings MUST be documented and validated.
- Required evidence: Contract review/tests
- Test mode: `review`
- Sources: `SRC-OPENAPI-311`

### WEB-API-024 — Time and timezone semantics explicit
- Severity: `critical`
- Applies when: `time-data`
- Rule: API timestamps MUST define format, timezone/offset semantics and business-local-date behavior. Store instants and local calendar facts deliberately.
- Required evidence: Schema + timezone tests
- Test mode: `review`
- Sources: `SRC-JSONSCHEMA-202012`

### WEB-API-025 — Partial update semantics explicit
- Severity: `major`
- Applies when: `patch-api`
- Rule: PATCH/update endpoints MUST define omitted vs null vs clear behavior and concurrency strategy.
- Required evidence: Contract tests
- Test mode: `review`
- Sources: `SRC-HTTP-9110`

## DATA

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-DATA-001` | blocker | Database constraints protect invariants | database | Schema inspection + negative DB tests |
| `WEB-DATA-002` | critical | Schema changes via migrations | database | Migration history + clean-db test |
| `WEB-DATA-003` | critical | Migrations designed for live traffic | production-database | Migration plan + staging/prod-like timing evidence |
| `WEB-DATA-004` | critical | Backfills resumable | data-migration | Restart test + metrics |
| `WEB-DATA-005` | critical | Deletion semantics explicit | all | Data lifecycle policy + tests |
| `WEB-DATA-006` | blocker | Tenant key on tenant-owned data | multi-tenant | Schema + allow/deny integration tests |
| `WEB-DATA-007` | blocker | Money uses exact representation | money | Schema + rounding tests |
| `WEB-DATA-008` | critical | Quantities and units explicit | quantity-data | Schema/unit tests |
| `WEB-DATA-009` | critical | Immutable business history where required | ledger-or-audit | Data model + reconciliation tests |
| `WEB-DATA-010` | major | Derived values declare recomputation | derived-data | Source-of-truth map + rebuild test |
| `WEB-DATA-011` | critical | Cache never becomes accidental truth | cache | Cache miss/stale tests |
| `WEB-DATA-012` | major | Indexes justified by query patterns | database | Query plan/perf evidence |
| `WEB-DATA-013` | blocker | Backups are restored in tests | production-database | Restore evidence + timestamp |
| `WEB-DATA-014` | critical | Sensitive fields classified | personal-or-secret-data | Data inventory + privacy/security review |
| `WEB-DATA-015` | critical | Data export/import validated | import-export | Negative tests + sample evidence |

### WEB-DATA-001 — Database constraints protect invariants
- Severity: `blocker`
- Applies when: `database`
- Rule: Use NOT NULL, UNIQUE, FK, CHECK or equivalent constraints for invariants the database can enforce; application validation alone is insufficient.
- Required evidence: Schema inspection + negative DB tests
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-DATA-002 — Schema changes via migrations
- Severity: `critical`
- Applies when: `database`
- Rule: Production schema changes MUST be versioned, reviewable and repeatable; no undocumented manual drift.
- Required evidence: Migration history + clean-db test
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-DATA-003 — Migrations designed for live traffic
- Severity: `critical`
- Applies when: `production-database`
- Rule: Assess locks, table rewrites, backfills, dual-read/write compatibility and rollback/roll-forward before large changes.
- Required evidence: Migration plan + staging/prod-like timing evidence
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-DATA-004 — Backfills resumable
- Severity: `critical`
- Applies when: `data-migration`
- Rule: Large data migrations SHOULD be chunked, idempotent/resumable and observable with progress and failure recovery.
- Required evidence: Restart test + metrics
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-DATA-005 — Deletion semantics explicit
- Severity: `critical`
- Applies when: `all`
- Rule: Define hard delete, soft delete, retention, restore and referential consequences; never accumulate undeletable personal data by accident.
- Required evidence: Data lifecycle policy + tests
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`

### WEB-DATA-006 — Tenant key on tenant-owned data
- Severity: `blocker`
- Applies when: `multi-tenant`
- Rule: Tenant ownership MUST be explicit in schema and enforced in trusted query/policy boundaries; cross-tenant access tests are mandatory.
- Required evidence: Schema + allow/deny integration tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-DATA-007 — Money uses exact representation
- Severity: `blocker`
- Applies when: `money`
- Rule: Represent money using exact decimal/minor-unit semantics with explicit currency; binary floating point is not authoritative for monetary totals.
- Required evidence: Schema + rounding tests
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-DATA-008 — Quantities and units explicit
- Severity: `critical`
- Applies when: `quantity-data`
- Rule: Store units and precision deliberately; conversions must be centralized and tested.
- Required evidence: Schema/unit tests
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-DATA-009 — Immutable business history where required
- Severity: `critical`
- Applies when: `ledger-or-audit`
- Rule: For stock movements, payments, audit and ledgers prefer append-only event/movement records with compensating corrections over silent mutation.
- Required evidence: Data model + reconciliation tests
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-DATA-010 — Derived values declare recomputation
- Severity: `major`
- Applies when: `derived-data`
- Rule: For denormalized/derived fields document source, freshness and rebuild path.
- Required evidence: Source-of-truth map + rebuild test
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-DATA-011 — Cache never becomes accidental truth
- Severity: `critical`
- Applies when: `cache`
- Rule: Caches MUST have explicit key, scope, TTL/invalidation and failure behavior; correctness cannot depend on an unowned stale cache.
- Required evidence: Cache miss/stale tests
- Test mode: `review`
- Sources: `SRC-HTTP-9111`, `SRC-SRE`

### WEB-DATA-012 — Indexes justified by query patterns
- Severity: `major`
- Applies when: `database`
- Rule: Create indexes from measured/query-plan needs and consider write/storage cost; remove redundant indexes deliberately.
- Required evidence: Query plan/perf evidence
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-DATA-013 — Backups are restored in tests
- Severity: `blocker`
- Applies when: `production-database`
- Rule: A backup without a tested restore is not accepted as recovery evidence. Define RPO/RTO and regularly perform restore verification.
- Required evidence: Restore evidence + timestamp
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-DATA-014 — Sensitive fields classified
- Severity: `critical`
- Applies when: `personal-or-secret-data`
- Rule: Classify personal, secret, financial and operationally sensitive fields; define encryption, access, logging and retention behavior.
- Required evidence: Data inventory + privacy/security review
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`, `SRC-OWASP-ASVS-5`

### WEB-DATA-015 — Data export/import validated
- Severity: `critical`
- Applies when: `import-export`
- Rule: Imports MUST validate format, size, authorization and partial-failure semantics; exports MUST enforce scope and avoid formula/content injection risks where relevant.
- Required evidence: Negative tests + sample evidence
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

## SEC

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-SEC-001` | blocker | ASVS target declared | production-web | Security plan with target and applicability |
| `WEB-SEC-002` | critical | Threat model before sensitive architecture | sensitive-flow | Threat model linked to requirements/tests |
| `WEB-SEC-003` | blocker | HTTPS only in production | production-web | TLS scan/config evidence |
| `WEB-SEC-004` | critical | HSTS reviewed | https-public-site | Header test + rollout decision |
| `WEB-SEC-005` | blocker | Secure cookies | cookie-session | Cookie header tests |
| `WEB-SEC-006` | blocker | Session identifiers unpredictable | session-auth | Session tests/design evidence |
| `WEB-SEC-007` | blocker | Session fixation prevented | session-auth | E2E auth test |
| `WEB-SEC-008` | critical | Logout invalidates trusted session | session-auth | Logout/replay test |
| `WEB-SEC-009` | critical | Reauthentication for high-risk actions | high-risk-action | E2E negative/positive tests |
| `WEB-SEC-010` | blocker | Passwords stored with approved adaptive hashing | password-auth | Config/code review + migration policy |
| `WEB-SEC-011` | critical | MFA risk policy explicit | sensitive-auth | Auth policy + tests |
| `WEB-SEC-012` | blocker | Authorization deny by default | protected-resource | Permission matrix + tests |
| `WEB-SEC-013` | blocker | Object-level authorization | resource-api | IDOR/BOLA tests |
| `WEB-SEC-014` | blocker | Function-level authorization | role-based-action | Privilege escalation tests |
| `WEB-SEC-015` | blocker | Cross-tenant isolation | multi-tenant | Dedicated cross-tenant test suite |
| `WEB-SEC-016` | blocker | Output encoding by context | html-output | XSS tests/static review |
| `WEB-SEC-017` | blocker | No dangerous HTML without sanitizer policy | rich-html | Sanitizer tests |
| `WEB-SEC-018` | blocker | Parameterized database access | database | SAST/review + injection tests |
| `WEB-SEC-019` | blocker | Command execution isolated | os-command | Negative tests + review |
| `WEB-SEC-020` | blocker | SSRF controls on server fetches | server-side-url-fetch | SSRF tests |
| `WEB-SEC-021` | blocker | CSRF protection matches auth model | cookie-auth-mutating | Cross-site request tests |
| `WEB-SEC-022` | critical | CSP planned and tested | browser-app | Header + violation report + E2E evidence |
| `WEB-SEC-023` | critical | Clickjacking defense | browser-app | Header/browser test |
| `WEB-SEC-024` | major | Referrer leakage controlled | browser-app | Header test |
| `WEB-SEC-025` | major | Browser capabilities minimized | browser-app | Header review + compatibility evidence |
| `WEB-SEC-026` | blocker | Secrets never committed | all | Secret scan + incident evidence if exposed |
| `WEB-SEC-027` | blocker | Least privilege credentials | all | Permission inventory |
| `WEB-SEC-028` | critical | Secret rotation/revocation exists | secret-bearing-system | Runbook + exercise evidence |
| `WEB-SEC-029` | blocker | Sensitive data excluded from logs | all | Log sample scan/tests |
| `WEB-SEC-030` | critical | Security logs tamper-aware | production | Access policy + ingestion evidence |
| `WEB-SEC-031` | blocker | File uploads treated as hostile | file-upload | Malicious fixture tests |
| `WEB-SEC-032` | blocker | Path traversal prevented | file-access | Traversal tests |
| `WEB-SEC-033` | critical | Open redirect prevented | redirect-input | Negative tests |
| `WEB-SEC-034` | critical | Error responses do not leak internals | production | Production-mode tests |
| `WEB-SEC-035` | blocker | Admin surfaces separately protected | admin | Admin privilege tests |
| `WEB-SEC-036` | critical | Dependency vulnerabilities managed | all | SCA report + ownership |
| `WEB-SEC-037` | critical | Lockfile and reproducible install policy | package-managed | CI config + lockfile evidence |
| `WEB-SEC-038` | major | Build provenance target declared | released-artifact | SLSA mapping/provenance artifact |
| `WEB-SEC-039` | blocker | Untrusted PR secrets isolated | ci | CI permission review/tests |
| `WEB-SEC-040` | critical | Security headers tested not assumed | browser-app | Runtime header capture |
| `WEB-SEC-041` | blocker | OAuth tokens scoped and protected | oauth | OAuth test matrix |
| `WEB-SEC-042` | critical | Webhook replay protections | webhook | Replay tests |
| `WEB-SEC-043` | major | Security tests tied to abuse cases | all | Threat-to-test matrix |
| `WEB-SEC-044` | major | Pentest scope follows attack surface | high-risk-production | WSTG-based test report |
| `WEB-SEC-045` | major | Vulnerability recurrence creates learning | all | Brain lesson + regression evidence |

### WEB-SEC-001 — ASVS target declared
- Severity: `blocker`
- Applies when: `production-web`
- Rule: Every production web project MUST declare an ASVS verification target. Default is Level 2 for most applications; Level 3 for high-value/high-assurance/high-safety systems.
- Required evidence: Security plan with target and applicability
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-002 — Threat model before sensitive architecture
- Severity: `critical`
- Applies when: `sensitive-flow`
- Rule: Identify assets, actors, entry points, trust boundaries, abuse cases and mitigations before implementing high-risk flows.
- Required evidence: Threat model linked to requirements/tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-NIST-SSDF-11`

### WEB-SEC-003 — HTTPS only in production
- Severity: `blocker`
- Applies when: `production-web`
- Rule: Serve authenticated or sensitive production traffic only over secure transport; redirect/disable insecure access deliberately.
- Required evidence: TLS scan/config evidence
- Test mode: `review`
- Sources: `SRC-TLS-9325`

### WEB-SEC-004 — HSTS reviewed
- Severity: `critical`
- Applies when: `https-public-site`
- Rule: Use HSTS after confirming HTTPS readiness, subdomain implications and preload decisions.
- Required evidence: Header test + rollout decision
- Test mode: `review`
- Sources: `SRC-HSTS-6797`

### WEB-SEC-005 — Secure cookies
- Severity: `blocker`
- Applies when: `cookie-session`
- Rule: Session/security cookies MUST use Secure, HttpOnly where script access is unnecessary, deliberate SameSite, narrow Path/Domain and rotation semantics.
- Required evidence: Cookie header tests
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-006 — Session identifiers unpredictable
- Severity: `blocker`
- Applies when: `session-auth`
- Rule: Session IDs MUST be generated with secure entropy and never contain sensitive meaning; server-side state/validation must support revocation.
- Required evidence: Session tests/design evidence
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-007 — Session fixation prevented
- Severity: `blocker`
- Applies when: `session-auth`
- Rule: Rotate session identifiers on authentication and relevant privilege changes.
- Required evidence: E2E auth test
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-008 — Logout invalidates trusted session
- Severity: `critical`
- Applies when: `session-auth`
- Rule: Logout MUST invalidate/revoke server-side session or token capability as designed, not only remove UI state.
- Required evidence: Logout/replay test
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-009 — Reauthentication for high-risk actions
- Severity: `critical`
- Applies when: `high-risk-action`
- Rule: Require recent/strong authentication for sensitive account, payment, credential or administrative changes according to risk.
- Required evidence: E2E negative/positive tests
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-010 — Passwords stored with approved adaptive hashing
- Severity: `blocker`
- Applies when: `password-auth`
- Rule: Never encrypt or fast-hash passwords as storage. Use current OWASP-recommended password storage approach and parameters, reviewed for platform.
- Required evidence: Config/code review + migration policy
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-011 — MFA risk policy explicit
- Severity: `critical`
- Applies when: `sensitive-auth`
- Rule: Define where MFA is required, recovery behavior and bypass protections; admin/high-value accounts receive stronger treatment.
- Required evidence: Auth policy + tests
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-012 — Authorization deny by default
- Severity: `blocker`
- Applies when: `protected-resource`
- Rule: New protected actions/resources MUST be inaccessible until explicit policy allows them.
- Required evidence: Permission matrix + tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-013 — Object-level authorization
- Severity: `blocker`
- Applies when: `resource-api`
- Rule: Check access to each referenced object on the server; possession of an ID is never authority.
- Required evidence: IDOR/BOLA tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-014 — Function-level authorization
- Severity: `blocker`
- Applies when: `role-based-action`
- Rule: Check action capability/role server-side for admin and privileged operations.
- Required evidence: Privilege escalation tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-015 — Cross-tenant isolation
- Severity: `blocker`
- Applies when: `multi-tenant`
- Rule: Test read, write, search, export, files, jobs, caches and realtime paths for tenant isolation.
- Required evidence: Dedicated cross-tenant test suite
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-016 — Output encoding by context
- Severity: `blocker`
- Applies when: `html-output`
- Rule: Untrusted data rendered into HTML, attributes, URLs, JS, CSS or templates MUST use context-appropriate safe APIs/encoding.
- Required evidence: XSS tests/static review
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-OWASP-CHEATS`

### WEB-SEC-017 — No dangerous HTML without sanitizer policy
- Severity: `blocker`
- Applies when: `rich-html`
- Rule: Rendering user-controlled HTML requires an allowlist sanitizer, reviewed configuration and tests; bypassing framework escaping is prohibited by default.
- Required evidence: Sanitizer tests
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-018 — Parameterized database access
- Severity: `blocker`
- Applies when: `database`
- Rule: Use parameterized queries or safe ORM binding; never concatenate untrusted input into SQL/NoSQL query code.
- Required evidence: SAST/review + injection tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-019 — Command execution isolated
- Severity: `blocker`
- Applies when: `os-command`
- Rule: Avoid shell execution with untrusted input. If unavoidable, use fixed executables, argument separation, allowlists and least privilege.
- Required evidence: Negative tests + review
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-020 — SSRF controls on server fetches
- Severity: `blocker`
- Applies when: `server-side-url-fetch`
- Rule: Validate destination scheme/host, block internal/link-local/metadata ranges as applicable, control redirects and DNS rebinding risk.
- Required evidence: SSRF tests
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-021 — CSRF protection matches auth model
- Severity: `blocker`
- Applies when: `cookie-auth-mutating`
- Rule: State-changing cookie-authenticated requests MUST use an appropriate CSRF defense plus SameSite as defense-in-depth; SameSite alone is not universal proof.
- Required evidence: Cross-site request tests
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-022 — CSP planned and tested
- Severity: `critical`
- Applies when: `browser-app`
- Rule: Deploy a restrictive CSP appropriate to architecture; prefer nonce/hash-based designs over broad unsafe-inline/eval. Roll out with reporting when needed.
- Required evidence: Header + violation report + E2E evidence
- Test mode: `review`
- Sources: `SRC-CSP3`, `SRC-OWASP-ASVS-5`

### WEB-SEC-023 — Clickjacking defense
- Severity: `critical`
- Applies when: `browser-app`
- Rule: Control framing via CSP frame-ancestors and/or compatible policy; embedded use cases must be explicit.
- Required evidence: Header/browser test
- Test mode: `review`
- Sources: `SRC-CSP3`, `SRC-OWASP-ASVS-5`

### WEB-SEC-024 — Referrer leakage controlled
- Severity: `major`
- Applies when: `browser-app`
- Rule: Set a deliberate referrer policy and avoid sensitive data in URLs.
- Required evidence: Header test
- Test mode: `review`
- Sources: `SRC-REFERRER-POLICY`

### WEB-SEC-025 — Browser capabilities minimized
- Severity: `major`
- Applies when: `browser-app`
- Rule: Use Permissions Policy to disable unneeded powerful features when supported and relevant.
- Required evidence: Header review + compatibility evidence
- Test mode: `review`
- Sources: `SRC-PERMISSIONS-POLICY`

### WEB-SEC-026 — Secrets never committed
- Severity: `blocker`
- Applies when: `all`
- Rule: Secrets, private keys and live tokens MUST not be committed to source or Brain notes. Use managed secret channels and rotation after exposure.
- Required evidence: Secret scan + incident evidence if exposed
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`, `SRC-NIST-SSDF-11`

### WEB-SEC-027 — Least privilege credentials
- Severity: `blocker`
- Applies when: `all`
- Rule: Database, cloud, CI and provider credentials MUST have minimum necessary scope, environment separation and ownership.
- Required evidence: Permission inventory
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-SEC-028 — Secret rotation/revocation exists
- Severity: `critical`
- Applies when: `secret-bearing-system`
- Rule: Define rotation and emergency revocation for critical secrets; test without full system rebuild where feasible.
- Required evidence: Runbook + exercise evidence
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-029 — Sensitive data excluded from logs
- Severity: `blocker`
- Applies when: `all`
- Rule: Do not log passwords, session IDs, bearer tokens, private keys or unnecessary personal data; redact at structured boundaries.
- Required evidence: Log sample scan/tests
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-030 — Security logs tamper-aware
- Severity: `critical`
- Applies when: `production`
- Rule: Protect security/audit logs from unauthorized modification/deletion and record sufficient context for investigation.
- Required evidence: Access policy + ingestion evidence
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-031 — File uploads treated as hostile
- Severity: `blocker`
- Applies when: `file-upload`
- Rule: Enforce authorization, size limits, generated storage names, content/type validation, non-executable storage, scanning/quarantine based on risk and safe serving.
- Required evidence: Malicious fixture tests
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`

### WEB-SEC-032 — Path traversal prevented
- Severity: `blocker`
- Applies when: `file-access`
- Rule: Never resolve user-controlled paths directly; canonicalize/allowlist and enforce storage root boundaries.
- Required evidence: Traversal tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-033 — Open redirect prevented
- Severity: `critical`
- Applies when: `redirect-input`
- Rule: Redirect destinations MUST be fixed or allowlisted/validated; never forward arbitrary attacker-controlled URLs.
- Required evidence: Negative tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-034 — Error responses do not leak internals
- Severity: `critical`
- Applies when: `production`
- Rule: Do not expose stack traces, SQL, filesystem paths, secrets or internal topology to untrusted clients.
- Required evidence: Production-mode tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-HTTP-9457`

### WEB-SEC-035 — Admin surfaces separately protected
- Severity: `blocker`
- Applies when: `admin`
- Rule: Administrative actions require explicit strong authorization, audit, safer session policy and minimized exposure.
- Required evidence: Admin privilege tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-036 — Dependency vulnerabilities managed
- Severity: `critical`
- Applies when: `all`
- Rule: Continuously inventory dependencies, review vulnerabilities, remove unused packages and patch based on exploitability/risk.
- Required evidence: SCA report + ownership
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`, `SRC-SLSA-12`

### WEB-SEC-037 — Lockfile and reproducible install policy
- Severity: `critical`
- Applies when: `package-managed`
- Rule: Commit the appropriate lockfile and use deterministic CI install commands; avoid unreviewed floating dependencies.
- Required evidence: CI config + lockfile evidence
- Test mode: `review`
- Sources: `SRC-SLSA-12`

### WEB-SEC-038 — Build provenance target declared
- Severity: `major`
- Applies when: `released-artifact`
- Rule: For important production artifacts declare a supply-chain assurance target and preserve provenance where platform supports it.
- Required evidence: SLSA mapping/provenance artifact
- Test mode: `review`
- Sources: `SRC-SLSA-12`

### WEB-SEC-039 — Untrusted PR secrets isolated
- Severity: `blocker`
- Applies when: `ci`
- Rule: CI for untrusted contributions MUST not expose production secrets or privileged tokens.
- Required evidence: CI permission review/tests
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`, `SRC-SLSA-12`

### WEB-SEC-040 — Security headers tested not assumed
- Severity: `critical`
- Applies when: `browser-app`
- Rule: Security headers must be verified in deployed responses, including CDN/proxy behavior, not only app config.
- Required evidence: Runtime header capture
- Test mode: `review`
- Sources: `SRC-CSP3`, `SRC-HSTS-6797`

### WEB-SEC-041 — OAuth tokens scoped and protected
- Severity: `blocker`
- Applies when: `oauth`
- Rule: Use least privilege scopes/audience, secure redirect URI handling and token storage appropriate to client type; follow RFC 9700.
- Required evidence: OAuth test matrix
- Test mode: `review`
- Sources: `SRC-OAUTH-9700`

### WEB-SEC-042 — Webhook replay protections
- Severity: `critical`
- Applies when: `webhook`
- Rule: Where provider supports timestamp/nonce/event IDs, enforce replay window/dedup semantics after signature verification.
- Required evidence: Replay tests
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`

### WEB-SEC-043 — Security tests tied to abuse cases
- Severity: `major`
- Applies when: `all`
- Rule: Every critical threat/abuse case must map to a preventive control and verification evidence.
- Required evidence: Threat-to-test matrix
- Test mode: `review`
- Sources: `SRC-OWASP-WSTG`, `SRC-OWASP-ASVS-5`

### WEB-SEC-044 — Pentest scope follows attack surface
- Severity: `major`
- Applies when: `high-risk-production`
- Rule: High-risk releases require a documented security test scope covering identity, auth, session, input, business logic, client, API and configuration as applicable.
- Required evidence: WSTG-based test report
- Test mode: `review`
- Sources: `SRC-OWASP-WSTG`

### WEB-SEC-045 — Vulnerability recurrence creates learning
- Severity: `major`
- Applies when: `all`
- Rule: Verified security failures MUST create a failure signature/root-cause lesson and regression test before closure.
- Required evidence: Brain lesson + regression evidence
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

## A11Y

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-A11Y-001` | blocker | Accessibility target declared | user-facing | Accessibility plan |
| `WEB-A11Y-002` | blocker | Keyboard complete | interactive-ui | Manual keyboard journey evidence |
| `WEB-A11Y-003` | blocker | Visible focus | interactive-ui | Manual + screenshot evidence |
| `WEB-A11Y-004` | blocker | Accessible names | controls | Automated + accessibility tree test |
| `WEB-A11Y-005` | critical | Labels and instructions | forms | Manual/automated test |
| `WEB-A11Y-006` | critical | Error identification and recovery | forms | Screen reader/keyboard E2E |
| `WEB-A11Y-007` | critical | Color not sole signal | all | Visual/manual test |
| `WEB-A11Y-008` | critical | Contrast verified | all | Automated + manual edge-case check |
| `WEB-A11Y-009` | major | Heading hierarchy meaningful | content | DOM outline review |
| `WEB-A11Y-010` | major | Landmarks meaningful | application | Accessibility tree review |
| `WEB-A11Y-011` | critical | Images have correct alternatives | images | Content review + automated checks |
| `WEB-A11Y-012` | critical | Media alternatives | audio-video | Manual evidence |
| `WEB-A11Y-013` | critical | Zoom and reflow | responsive-ui | Manual viewport/zoom matrix |
| `WEB-A11Y-014` | critical | Target size reviewed | touch-ui | Mobile manual test |
| `WEB-A11Y-015` | critical | Drag has alternative | drag-interaction | Keyboard/touch test |
| `WEB-A11Y-016` | critical | Authentication not cognitive puzzle only | auth-ui | Auth accessibility test |
| `WEB-A11Y-017` | critical | Dynamic updates announced intentionally | dynamic-ui | Screen-reader test |
| `WEB-A11Y-018` | blocker | Automated checks never equal conformance | all | Combined report |

### WEB-A11Y-001 — Accessibility target declared
- Severity: `blocker`
- Applies when: `user-facing`
- Rule: Declare target. Default for user-facing web is WCAG 2.2 AA unless legal/product requirements demand otherwise.
- Required evidence: Accessibility plan
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-002 — Keyboard complete
- Severity: `blocker`
- Applies when: `interactive-ui`
- Rule: All functionality MUST be operable by keyboard without keyboard trap; interaction order must be logical.
- Required evidence: Manual keyboard journey evidence
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-003 — Visible focus
- Severity: `blocker`
- Applies when: `interactive-ui`
- Rule: Keyboard focus MUST be visible and not obscured by sticky content; custom focus styling must meet target.
- Required evidence: Manual + screenshot evidence
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-004 — Accessible names
- Severity: `blocker`
- Applies when: `controls`
- Rule: Interactive controls and form inputs MUST have programmatically determinable accessible names.
- Required evidence: Automated + accessibility tree test
- Test mode: `review`
- Sources: `SRC-WCAG-22`, `SRC-W3C-ACT-11`

### WEB-A11Y-005 — Labels and instructions
- Severity: `critical`
- Applies when: `forms`
- Rule: Provide labels/instructions for required formats and constraints; placeholders are not the only label.
- Required evidence: Manual/automated test
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-006 — Error identification and recovery
- Severity: `critical`
- Applies when: `forms`
- Rule: Identify errors in text, associate them with controls, focus/announce appropriately and preserve valid input.
- Required evidence: Screen reader/keyboard E2E
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-007 — Color not sole signal
- Severity: `critical`
- Applies when: `all`
- Rule: Do not rely only on color to communicate status, errors, selection or meaning.
- Required evidence: Visual/manual test
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-008 — Contrast verified
- Severity: `critical`
- Applies when: `all`
- Rule: Text, UI components and focus indicators MUST meet applicable WCAG contrast criteria.
- Required evidence: Automated + manual edge-case check
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-009 — Heading hierarchy meaningful
- Severity: `major`
- Applies when: `content`
- Rule: Use headings for document structure; do not choose heading levels only for visual size.
- Required evidence: DOM outline review
- Test mode: `review`
- Sources: `SRC-WHATWG-HTML`, `SRC-WCAG-22`

### WEB-A11Y-010 — Landmarks meaningful
- Severity: `major`
- Applies when: `application`
- Rule: Use semantic landmarks and avoid redundant/unnamed landmark clutter.
- Required evidence: Accessibility tree review
- Test mode: `review`
- Sources: `SRC-WHATWG-HTML`, `SRC-WCAG-22`

### WEB-A11Y-011 — Images have correct alternatives
- Severity: `critical`
- Applies when: `images`
- Rule: Informative images need meaningful alternatives; decorative images must be ignorable; complex images need equivalent explanation.
- Required evidence: Content review + automated checks
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-012 — Media alternatives
- Severity: `critical`
- Applies when: `audio-video`
- Rule: Provide captions/transcripts/audio description as required by content and conformance target.
- Required evidence: Manual evidence
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-013 — Zoom and reflow
- Severity: `critical`
- Applies when: `responsive-ui`
- Rule: Content must remain usable at required zoom/reflow conditions without loss of content/functionality except valid exceptions.
- Required evidence: Manual viewport/zoom matrix
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-014 — Target size reviewed
- Severity: `critical`
- Applies when: `touch-ui`
- Rule: Interactive target size and spacing MUST meet applicable WCAG 2.2 target-size criteria or documented exceptions.
- Required evidence: Mobile manual test
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-015 — Drag has alternative
- Severity: `critical`
- Applies when: `drag-interaction`
- Rule: Functionality requiring dragging MUST provide a non-drag alternative where WCAG target applies.
- Required evidence: Keyboard/touch test
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-016 — Authentication not cognitive puzzle only
- Severity: `critical`
- Applies when: `auth-ui`
- Rule: Authentication must not rely solely on cognitive function tests where WCAG criteria apply; support password managers/paste and alternatives.
- Required evidence: Auth accessibility test
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-017 — Dynamic updates announced intentionally
- Severity: `critical`
- Applies when: `dynamic-ui`
- Rule: Important async status changes must be perceivable to assistive technology without creating noisy live-region spam.
- Required evidence: Screen-reader test
- Test mode: `review`
- Sources: `SRC-WCAG-22`

### WEB-A11Y-018 — Automated checks never equal conformance
- Severity: `blocker`
- Applies when: `all`
- Rule: Automated accessibility scans are required where practical but MUST be supplemented by manual keyboard and representative assistive-technology review for critical flows.
- Required evidence: Combined report
- Test mode: `review`
- Sources: `SRC-W3C-ACT-11`, `SRC-WCAG-22`

## PERF

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-PERF-001` | blocker | Field performance target | public-user-facing | RUM/CrUX dashboard or documented pre-traffic proxy plan |
| `WEB-PERF-002` | critical | Performance budget declared | user-facing | Budget file + CI/report |
| `WEB-PERF-003` | major | Measure before optimize | all | Before/after trace |
| `WEB-PERF-004` | critical | LCP resource discoverable | content-pages | Trace/Lighthouse evidence |
| `WEB-PERF-005` | critical | Images dimensioned and responsive | images | Network + CLS evidence |
| `WEB-PERF-006` | major | Below-fold lazy loading deliberate | media | Trace evidence |
| `WEB-PERF-007` | critical | JavaScript cost controlled | client-js | Bundle + CPU profile |
| `WEB-PERF-008` | critical | Long tasks reduced | interactive-ui | Performance trace + INP diagnostics |
| `WEB-PERF-009` | major | Event handlers bounded | interactive-ui | Profile evidence |
| `WEB-PERF-010` | major | Layout thrash avoided | dynamic-ui | Performance trace |
| `WEB-PERF-011` | major | Fonts budgeted | custom-fonts | Network/CLS evidence |
| `WEB-PERF-012` | critical | Caching based on immutability | static-assets | Response header tests |
| `WEB-PERF-013` | major | Compression verified | text-assets | Runtime header/size evidence |
| `WEB-PERF-014` | critical | Third-party cost budget | third-party-script | Third-party waterfall + owner |
| `WEB-PERF-015` | critical | API fan-out controlled | data-heavy-page | Trace/query count evidence |
| `WEB-PERF-016` | critical | Database performance measured | database | Query plan + load test |
| `WEB-PERF-017` | major | Performance regression gate | user-facing | CI/lab delta + field alert |
| `WEB-PERF-018` | critical | Mobile and constrained conditions tested | public-user-facing | Throttled lab + real device evidence |

### WEB-PERF-001 — Field performance target
- Severity: `blocker`
- Applies when: `public-user-facing`
- Rule: Track real-user Core Web Vitals where traffic allows. Default good targets: p75 LCP <=2.5s, INP <=200ms, CLS <=0.1, segmented mobile/desktop.
- Required evidence: RUM/CrUX dashboard or documented pre-traffic proxy plan
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-002 — Performance budget declared
- Severity: `critical`
- Applies when: `user-facing`
- Rule: Set budgets for JS/CSS, images, fonts, third-party scripts and critical route timings before growth makes them accidental.
- Required evidence: Budget file + CI/report
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-003 — Measure before optimize
- Severity: `major`
- Applies when: `all`
- Rule: Use field and lab evidence to identify bottlenecks; avoid speculative micro-optimization that adds complexity.
- Required evidence: Before/after trace
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-004 — LCP resource discoverable
- Severity: `critical`
- Applies when: `content-pages`
- Rule: Critical LCP content SHOULD be discoverable early; avoid lazy-loading likely LCP images and prioritize appropriately.
- Required evidence: Trace/Lighthouse evidence
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-005 — Images dimensioned and responsive
- Severity: `critical`
- Applies when: `images`
- Rule: Provide intrinsic dimensions/aspect ratio, appropriate formats and responsive sources; avoid serving desktop-sized media to small viewports.
- Required evidence: Network + CLS evidence
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-006 — Below-fold lazy loading deliberate
- Severity: `major`
- Applies when: `media`
- Rule: Lazy-load offscreen heavy media where beneficial, but never blindly lazy-load critical above-fold/LCP content.
- Required evidence: Trace evidence
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-007 — JavaScript cost controlled
- Severity: `critical`
- Applies when: `client-js`
- Rule: Minimize shipped/executed JS; split by real boundaries, remove unused dependencies and avoid hydration/client rendering when unnecessary.
- Required evidence: Bundle + CPU profile
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-008 — Long tasks reduced
- Severity: `critical`
- Applies when: `interactive-ui`
- Rule: Break or move expensive main-thread work; measure interactions causing poor INP.
- Required evidence: Performance trace + INP diagnostics
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-009 — Event handlers bounded
- Severity: `major`
- Applies when: `interactive-ui`
- Rule: Avoid expensive global listeners and repeated synchronous work on high-frequency events; debounce/throttle only with UX-correct semantics.
- Required evidence: Profile evidence
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-010 — Layout thrash avoided
- Severity: `major`
- Applies when: `dynamic-ui`
- Rule: Avoid forced synchronous layout loops; batch DOM reads/writes where relevant.
- Required evidence: Performance trace
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-011 — Fonts budgeted
- Severity: `major`
- Applies when: `custom-fonts`
- Rule: Limit font families/weights, preload only proven critical fonts and define fallback behavior to reduce blocking and layout shift.
- Required evidence: Network/CLS evidence
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-012 — Caching based on immutability
- Severity: `critical`
- Applies when: `static-assets`
- Rule: Fingerprint immutable assets and cache long; HTML/data cache policy must reflect freshness and invalidation.
- Required evidence: Response header tests
- Test mode: `review`
- Sources: `SRC-HTTP-9111`

### WEB-PERF-013 — Compression verified
- Severity: `major`
- Applies when: `text-assets`
- Rule: Use appropriate transfer compression for compressible text responses and verify CDN/proxy behavior.
- Required evidence: Runtime header/size evidence
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-014 — Third-party cost budget
- Severity: `critical`
- Applies when: `third-party-script`
- Rule: Third-party scripts must justify CPU, network, privacy and failure cost; load strategy should protect critical path.
- Required evidence: Third-party waterfall + owner
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`, `SRC-W3C-PRIVACY-PRINCIPLES`

### WEB-PERF-015 — API fan-out controlled
- Severity: `critical`
- Applies when: `data-heavy-page`
- Rule: Avoid unbounded N+1 browser/server fan-out; aggregate, batch or parallelize only within dependency budgets.
- Required evidence: Trace/query count evidence
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-PERF-016 — Database performance measured
- Severity: `critical`
- Applies when: `database`
- Rule: Critical queries require representative plans/latency evidence; protect against N+1 and missing-index regressions.
- Required evidence: Query plan + load test
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-PERF-017 — Performance regression gate
- Severity: `major`
- Applies when: `user-facing`
- Rule: Critical routes MUST have repeatable performance checks and investigate material regression before release.
- Required evidence: CI/lab delta + field alert
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

### WEB-PERF-018 — Mobile and constrained conditions tested
- Severity: `critical`
- Applies when: `public-user-facing`
- Rule: Test representative low-end/mobile CPU and network conditions; desktop localhost is not sufficient evidence.
- Required evidence: Throttled lab + real device evidence
- Test mode: `review`
- Sources: `SRC-WEB-VITALS`

## SEO

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-SEO-001` | major | SEO applicability explicit | public-content | SEO scope map |
| `WEB-SEO-002` | critical | Crawlability intentional | indexable | URL inspection/crawl test |
| `WEB-SEO-003` | critical | Indexable pages return useful success content | indexable | HTTP/crawl evidence |
| `WEB-SEO-004` | major | Canonical URLs deliberate | duplicate-content | Canonical test matrix |
| `WEB-SEO-005` | major | Titles unique and descriptive | indexable | Crawl report |
| `WEB-SEO-006` | major | Meta descriptions intentional | indexable | Crawl report |
| `WEB-SEO-007` | critical | Structured data matches visible truth | structured-data | Rich Results test + content review |
| `WEB-SEO-008` | major | JSON-LD preferred when suitable | structured-data | Validation evidence |
| `WEB-SEO-009` | major | Sitemaps generated from canonical inventory | large-public-site | Sitemap validation |
| `WEB-SEO-010` | major | Internal links crawlable | public-site | Crawler test |
| `WEB-SEO-011` | major | Redirect chains minimized | public-site | Crawler/HTTP tests |
| `WEB-SEO-012` | major | SEO changes monitored after release | important-seo | Post-release Search Console checklist |

### WEB-SEO-001 — SEO applicability explicit
- Severity: `major`
- Applies when: `public-content`
- Rule: Declare whether pages are intended for public indexing. Auth/private/admin pages should not accidentally enter index.
- Required evidence: SEO scope map
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`

### WEB-SEO-002 — Crawlability intentional
- Severity: `critical`
- Applies when: `indexable`
- Rule: Ensure intended pages are accessible to crawlers and unintended areas are controlled appropriately; robots.txt is not access control.
- Required evidence: URL inspection/crawl test
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`

### WEB-SEO-003 — Indexable pages return useful success content
- Severity: `critical`
- Applies when: `indexable`
- Rule: Intended indexable pages should return correct success status and meaningful indexable content; avoid soft-error pages.
- Required evidence: HTTP/crawl evidence
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`

### WEB-SEO-004 — Canonical URLs deliberate
- Severity: `major`
- Applies when: `duplicate-content`
- Rule: Define canonicalization for parameters, variants, trailing slash, host and duplicate paths without masking genuinely distinct pages.
- Required evidence: Canonical test matrix
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`

### WEB-SEO-005 — Titles unique and descriptive
- Severity: `major`
- Applies when: `indexable`
- Rule: Provide useful, page-specific titles aligned with visible content.
- Required evidence: Crawl report
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`

### WEB-SEO-006 — Meta descriptions intentional
- Severity: `major`
- Applies when: `indexable`
- Rule: Provide useful descriptions where valuable; do not mass-duplicate misleading snippets.
- Required evidence: Crawl report
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`

### WEB-SEO-007 — Structured data matches visible truth
- Severity: `critical`
- Applies when: `structured-data`
- Rule: Structured data MUST represent visible page content and follow feature guidelines; never mark up hidden/misleading facts.
- Required evidence: Rich Results test + content review
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`

### WEB-SEO-008 — JSON-LD preferred when suitable
- Severity: `major`
- Applies when: `structured-data`
- Rule: Use a supported structured data format; Google generally recommends JSON-LD when it fits the integration.
- Required evidence: Validation evidence
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`

### WEB-SEO-009 — Sitemaps generated from canonical inventory
- Severity: `major`
- Applies when: `large-public-site`
- Rule: Sitemaps should contain canonical indexable URLs and update predictably; do not treat sitemap inclusion as authorization/index guarantee.
- Required evidence: Sitemap validation
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`

### WEB-SEO-010 — Internal links crawlable
- Severity: `major`
- Applies when: `public-site`
- Rule: Important pages need discoverable links with meaningful anchor context; critical navigation should not depend on opaque script-only behavior.
- Required evidence: Crawler test
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`, `SRC-WHATWG-HTML`

### WEB-SEO-011 — Redirect chains minimized
- Severity: `major`
- Applies when: `public-site`
- Rule: Use permanent/temporary redirects according to intent and avoid unnecessary chains/loops.
- Required evidence: Crawler/HTTP tests
- Test mode: `review`
- Sources: `SRC-HTTP-9110`, `SRC-GOOGLE-SEO`

### WEB-SEO-012 — SEO changes monitored after release
- Severity: `major`
- Applies when: `important-seo`
- Rule: Monitor coverage, crawl errors, structured data and traffic after significant URL/rendering changes.
- Required evidence: Post-release Search Console checklist
- Test mode: `review`
- Sources: `SRC-GOOGLE-SEO`

## TEST

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-TEST-001` | blocker | Risk-based test strategy | all | Risk-to-test matrix |
| `WEB-TEST-002` | critical | Acceptance criteria executable or inspectable | all | Task/evidence links |
| `WEB-TEST-003` | major | Unit tests for dense invariants | business-logic | Unit suite |
| `WEB-TEST-004` | critical | Integration tests for real boundaries | database-or-provider | Integration suite |
| `WEB-TEST-005` | critical | E2E tests for critical journeys | user-facing | E2E suite/report |
| `WEB-TEST-006` | major | Tests resemble user behavior | ui-tests | Test review |
| `WEB-TEST-007` | critical | Test isolation | all | Randomized/repeated run evidence |
| `WEB-TEST-008` | major | Deterministic time control | time-dependent | Tests with fake/injected clock where appropriate |
| `WEB-TEST-009` | major | No arbitrary sleeps in reliable E2E | e2e | Test review |
| `WEB-TEST-010` | critical | Failure-path tests mandatory | all | Negative test matrix |
| `WEB-TEST-011` | critical | Concurrency tests where contested | concurrent-write | Concurrent integration test |
| `WEB-TEST-012` | critical | Migration tests from supported state | database | Migration CI evidence |
| `WEB-TEST-013` | critical | Contract tests prevent drift | multi-client-or-provider | Contract report |
| `WEB-TEST-014` | blocker | Accessibility automated plus manual | user-facing | Accessibility evidence pack |
| `WEB-TEST-015` | critical | Security test scope explicit | production | Security test report |
| `WEB-TEST-016` | major | Cross-browser matrix declared | user-facing | Browser matrix + CI report |
| `WEB-TEST-017` | major | Visual regression selective | visual-critical | Baseline/review process |
| `WEB-TEST-018` | critical | Flaky tests treated as defects | all | Flake tracking |

### WEB-TEST-001 — Risk-based test strategy
- Severity: `blocker`
- Applies when: `all`
- Rule: Map business/security/reliability risks to test layers. Do not chase arbitrary coverage percentage as the only quality signal.
- Required evidence: Risk-to-test matrix
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`, `SRC-OWASP-WSTG`

### WEB-TEST-002 — Acceptance criteria executable or inspectable
- Severity: `critical`
- Applies when: `all`
- Rule: Each task/feature acceptance criterion must map to a deterministic test, command, inspection or runtime evidence.
- Required evidence: Task/evidence links
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-TEST-003 — Unit tests for dense invariants
- Severity: `major`
- Applies when: `business-logic`
- Rule: Use unit tests for deterministic domain rules, transformations and edge cases; avoid testing framework internals.
- Required evidence: Unit suite
- Test mode: `review`
- Sources: `SRC-TESTING-LIBRARY`

### WEB-TEST-004 — Integration tests for real boundaries
- Severity: `critical`
- Applies when: `database-or-provider`
- Rule: Test real persistence/serialization/contracts at boundaries; mocks alone do not prove migrations, SQL or provider adapters.
- Required evidence: Integration suite
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-TEST-005 — E2E tests for critical journeys
- Severity: `critical`
- Applies when: `user-facing`
- Rule: Critical user journeys require browser-level verification across trusted boundaries.
- Required evidence: E2E suite/report
- Test mode: `review`
- Sources: `SRC-PLAYWRIGHT`

### WEB-TEST-006 — Tests resemble user behavior
- Severity: `major`
- Applies when: `ui-tests`
- Rule: Prefer user-visible roles, labels and behavior over implementation-detail selectors where chosen tooling supports it.
- Required evidence: Test review
- Test mode: `review`
- Sources: `SRC-PLAYWRIGHT`, `SRC-TESTING-LIBRARY`

### WEB-TEST-007 — Test isolation
- Severity: `critical`
- Applies when: `all`
- Rule: Tests must not depend on execution order or leaked state; fixtures own setup/cleanup.
- Required evidence: Randomized/repeated run evidence
- Test mode: `review`
- Sources: `SRC-PLAYWRIGHT`

### WEB-TEST-008 — Deterministic time control
- Severity: `major`
- Applies when: `time-dependent`
- Rule: Time-dependent logic needs explicit clock control or stable boundary strategy; do not rely on wall-clock sleeps.
- Required evidence: Tests with fake/injected clock where appropriate
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-TEST-009 — No arbitrary sleeps in reliable E2E
- Severity: `major`
- Applies when: `e2e`
- Rule: Wait on observable conditions/events, not fixed delays, except deliberately testing time behavior.
- Required evidence: Test review
- Test mode: `review`
- Sources: `SRC-PLAYWRIGHT`

### WEB-TEST-010 — Failure-path tests mandatory
- Severity: `critical`
- Applies when: `all`
- Rule: Test permission denial, validation failure, dependency failure, timeout, duplicate/retry and partial failure where applicable.
- Required evidence: Negative test matrix
- Test mode: `review`
- Sources: `SRC-SRE`, `SRC-OWASP-WSTG`

### WEB-TEST-011 — Concurrency tests where contested
- Severity: `critical`
- Applies when: `concurrent-write`
- Rule: Run real concurrent operations against contested invariants.
- Required evidence: Concurrent integration test
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-TEST-012 — Migration tests from supported state
- Severity: `critical`
- Applies when: `database`
- Rule: Verify migrations on representative prior schema/data, not only empty database.
- Required evidence: Migration CI evidence
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-TEST-013 — Contract tests prevent drift
- Severity: `critical`
- Applies when: `multi-client-or-provider`
- Rule: Validate API/provider contracts in CI and test backward compatibility for supported consumers.
- Required evidence: Contract report
- Test mode: `review`
- Sources: `SRC-OPENAPI-311`

### WEB-TEST-014 — Accessibility automated plus manual
- Severity: `blocker`
- Applies when: `user-facing`
- Rule: Combine automated checks with manual keyboard and representative assistive-tech checks for critical journeys.
- Required evidence: Accessibility evidence pack
- Test mode: `review`
- Sources: `SRC-W3C-ACT-11`, `SRC-WCAG-22`

### WEB-TEST-015 — Security test scope explicit
- Severity: `critical`
- Applies when: `production`
- Rule: Use ASVS/WSTG applicability to plan security verification; scanners alone are insufficient.
- Required evidence: Security test report
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-OWASP-WSTG`

### WEB-TEST-016 — Cross-browser matrix declared
- Severity: `major`
- Applies when: `user-facing`
- Rule: Declare supported browsers/devices and run critical journeys accordingly; do not promise untested compatibility.
- Required evidence: Browser matrix + CI report
- Test mode: `review`
- Sources: `SRC-PLAYWRIGHT`

### WEB-TEST-017 — Visual regression selective
- Severity: `major`
- Applies when: `visual-critical`
- Rule: Use visual regression for stable high-value surfaces, not as a substitute for semantic assertions.
- Required evidence: Baseline/review process
- Test mode: `review`
- Sources: `SRC-PLAYWRIGHT`

### WEB-TEST-018 — Flaky tests treated as defects
- Severity: `critical`
- Applies when: `all`
- Rule: Quarantine only with owner and deadline; repeated reruns must not normalize nondeterminism.
- Required evidence: Flake tracking
- Test mode: `review`
- Sources: `SRC-SRE`

## OBS

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-OBS-001` | major | Telemetry purpose declared | production | Observability plan |
| `WEB-OBS-002` | critical | Traces metrics logs correlated | distributed-or-critical | Telemetry sample |
| `WEB-OBS-003` | major | Structured logs | production | Log sample/schema |
| `WEB-OBS-004` | blocker | PII and secrets scrubbed | production | Telemetry scan |
| `WEB-OBS-005` | critical | Golden signals or equivalent | service | Dashboard links |
| `WEB-OBS-006` | critical | Business outcomes observable | business-critical | Metrics/events dashboard |
| `WEB-OBS-007` | major | Trace critical external dependencies | external-integration | Trace evidence |
| `WEB-OBS-008` | critical | Health endpoints meaningful | service | Failure tests |
| `WEB-OBS-009` | critical | Alert on actionability | production | Alert review |
| `WEB-OBS-010` | major | No alert without owner | production | Alert registry |
| `WEB-OBS-011` | major | Deploy markers correlated | production | Dashboard evidence |
| `WEB-OBS-012` | major | Observability tested | production | Captured trace/metric/log evidence |

### WEB-OBS-001 — Telemetry purpose declared
- Severity: `major`
- Applies when: `production`
- Rule: Instrument to answer user-impact and debugging questions, not to collect everything blindly.
- Required evidence: Observability plan
- Test mode: `review`
- Sources: `SRC-OTEL`, `SRC-SRE`

### WEB-OBS-002 — Traces metrics logs correlated
- Severity: `critical`
- Applies when: `distributed-or-critical`
- Rule: Use consistent service/resource identity and correlation so traces, metrics and logs can be joined where architecture needs it.
- Required evidence: Telemetry sample
- Test mode: `review`
- Sources: `SRC-OTEL`

### WEB-OBS-003 — Structured logs
- Severity: `major`
- Applies when: `production`
- Rule: Emit structured logs with stable fields and severity; avoid multiline free-text as the only machine signal.
- Required evidence: Log sample/schema
- Test mode: `review`
- Sources: `SRC-OTEL`

### WEB-OBS-004 — PII and secrets scrubbed
- Severity: `blocker`
- Applies when: `production`
- Rule: Telemetry must apply data classification/redaction and never leak credentials or unnecessary personal data.
- Required evidence: Telemetry scan
- Test mode: `review`
- Sources: `SRC-OWASP-CHEATS`, `SRC-NIST-PRIVACY-10`

### WEB-OBS-005 — Golden signals or equivalent
- Severity: `critical`
- Applies when: `service`
- Rule: Monitor user-relevant latency, traffic, errors and saturation or a justified equivalent.
- Required evidence: Dashboard links
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-OBS-006 — Business outcomes observable
- Severity: `critical`
- Applies when: `business-critical`
- Rule: Track critical business events/outcomes separately from technical logs: orders created, payments failed, webhook lag, jobs stuck, etc.
- Required evidence: Metrics/events dashboard
- Test mode: `review`
- Sources: `SRC-SRE`, `SRC-OTEL`

### WEB-OBS-007 — Trace critical external dependencies
- Severity: `major`
- Applies when: `external-integration`
- Rule: Measure dependency latency/error and propagate context safely when supported.
- Required evidence: Trace evidence
- Test mode: `review`
- Sources: `SRC-OTEL`

### WEB-OBS-008 — Health endpoints meaningful
- Severity: `critical`
- Applies when: `service`
- Rule: Separate liveness/readiness/startup semantics as platform needs; do not report healthy when required dependencies make service unable to serve.
- Required evidence: Failure tests
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-OBS-009 — Alert on actionability
- Severity: `critical`
- Applies when: `production`
- Rule: Pages/urgent alerts should correspond to user impact or imminent SLO threat and have an owner/runbook.
- Required evidence: Alert review
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-OBS-010 — No alert without owner
- Severity: `major`
- Applies when: `production`
- Rule: Every production alert has owner, severity, expected action and escalation behavior.
- Required evidence: Alert registry
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-OBS-011 — Deploy markers correlated
- Severity: `major`
- Applies when: `production`
- Rule: Record deployment/revision markers so regressions can be correlated with change.
- Required evidence: Dashboard evidence
- Test mode: `review`
- Sources: `SRC-OTEL`, `SRC-SRE`

### WEB-OBS-012 — Observability tested
- Severity: `major`
- Applies when: `production`
- Rule: Verify critical telemetry during pre-release/fault tests; logging code existing is not evidence it reaches the backend.
- Required evidence: Captured trace/metric/log evidence
- Test mode: `review`
- Sources: `SRC-OTEL`

## REL

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-REL-001` | critical | SLIs/SLOs for critical services | important-production | SLO document/dashboard |
| `WEB-REL-002` | major | Error budget influences release risk | slo-managed | Review record |
| `WEB-REL-003` | critical | Dependency budgets | distributed | Sequence budget + tests |
| `WEB-REL-004` | major | Circuit/bulkhead only with evidence | unstable-dependency | Failure test + rationale |
| `WEB-REL-005` | critical | Load shedding deliberate | capacity-risk | Load test |
| `WEB-REL-006` | major | Capacity assumptions documented | production | Capacity plan + load evidence |
| `WEB-REL-007` | major | Graceful degradation | optional-dependency | Fault test |
| `WEB-REL-008` | blocker | Disaster recovery tested | critical-production | DR exercise evidence |
| `WEB-REL-009` | major | Incident roles and communication | critical-production | Incident runbook |
| `WEB-REL-010` | major | Blameless root-cause learning | incident | Postmortem + tracked actions |
| `WEB-REL-011` | major | Release canary/gradual rollout where risk warrants | high-risk-release | Rollout plan + metrics |
| `WEB-REL-012` | critical | Reconciliation for eventual consistency | eventual-consistency | Reconciliation job/test/dashboard |

### WEB-REL-001 — SLIs/SLOs for critical services
- Severity: `critical`
- Applies when: `important-production`
- Rule: Define user-centered indicators and objectives for critical availability/latency/correctness journeys.
- Required evidence: SLO document/dashboard
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-002 — Error budget influences release risk
- Severity: `major`
- Applies when: `slo-managed`
- Rule: When reliability is materially below objective, prioritize reliability work according to agreed policy.
- Required evidence: Review record
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-003 — Dependency budgets
- Severity: `critical`
- Applies when: `distributed`
- Rule: Define timeout/retry/latency budget per downstream call so total request budget is coherent.
- Required evidence: Sequence budget + tests
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-004 — Circuit/bulkhead only with evidence
- Severity: `major`
- Applies when: `unstable-dependency`
- Rule: Use resilience patterns where failure mode justifies them; avoid decorative complexity.
- Required evidence: Failure test + rationale
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-005 — Load shedding deliberate
- Severity: `critical`
- Applies when: `capacity-risk`
- Rule: Define behavior under overload; protect critical work and fail fast rather than collapse unpredictably.
- Required evidence: Load test
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-006 — Capacity assumptions documented
- Severity: `major`
- Applies when: `production`
- Rule: Record expected traffic, concurrency, data size and growth assumptions; validate before major launch.
- Required evidence: Capacity plan + load evidence
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-007 — Graceful degradation
- Severity: `major`
- Applies when: `optional-dependency`
- Rule: Optional dependency failures should degrade explicitly rather than corrupt core flow.
- Required evidence: Fault test
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-008 — Disaster recovery tested
- Severity: `blocker`
- Applies when: `critical-production`
- Rule: Recovery plans for critical data/services require exercises, not documents only.
- Required evidence: DR exercise evidence
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-009 — Incident roles and communication
- Severity: `major`
- Applies when: `critical-production`
- Rule: Define incident command, communication and escalation for serious production events.
- Required evidence: Incident runbook
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-010 — Blameless root-cause learning
- Severity: `major`
- Applies when: `incident`
- Rule: Postmortems focus on contributing system conditions, corrective actions and recurrence prevention.
- Required evidence: Postmortem + tracked actions
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-011 — Release canary/gradual rollout where risk warrants
- Severity: `major`
- Applies when: `high-risk-release`
- Rule: Use staged exposure/feature flags/canary when blast radius justifies it and define success/rollback signals.
- Required evidence: Rollout plan + metrics
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-REL-012 — Reconciliation for eventual consistency
- Severity: `critical`
- Applies when: `eventual-consistency`
- Rule: Systems with asynchronous/partial state MUST have reconciliation to detect and repair divergence.
- Required evidence: Reconciliation job/test/dashboard
- Test mode: `review`
- Sources: `SRC-SRE`

## DEL

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-DEL-001` | critical | One codebase and revision identity | all | Revision/deploy metadata |
| `WEB-DEL-002` | critical | CI is repeatable | all | CI config + local commands |
| `WEB-DEL-003` | critical | Clean dependency install in CI | package-managed | CI log/config |
| `WEB-DEL-004` | critical | Build artifact immutable | artifact-deploy | Artifact digest/provenance |
| `WEB-DEL-005` | major | Environment parity managed | multi-env | Environment matrix |
| `WEB-DEL-006` | critical | Configuration validated at deploy/startup | all | Validation command/test |
| `WEB-DEL-007` | blocker | Database migration gate | database-release | Release evidence |
| `WEB-DEL-008` | critical | Rollback not assumed | production-release | Release plan |
| `WEB-DEL-009` | major | Feature flags have lifecycle | feature-flag | Flag registry |
| `WEB-DEL-010` | blocker | Pre-release smoke on deployed artifact | production-release | Smoke report |
| `WEB-DEL-011` | critical | Post-release verification | production-release | Release evidence pack |
| `WEB-DEL-012` | major | Automatic rollback signals explicit | automated-rollout | Rollout policy/tests |
| `WEB-DEL-013` | major | Operational runbook updated | production-change | Docs diff |
| `WEB-DEL-014` | major | Release evidence retained | production-release | Evidence pack |

### WEB-DEL-001 — One codebase and revision identity
- Severity: `critical`
- Applies when: `all`
- Rule: Every deployable app MUST be traceable to source revision and environment; deployments are instances of a versioned codebase.
- Required evidence: Revision/deploy metadata
- Test mode: `review`
- Sources: `SRC-12FACTOR`, `SRC-SLSA-12`

### WEB-DEL-002 — CI is repeatable
- Severity: `critical`
- Applies when: `all`
- Rule: Build, lint, test and package steps MUST be scriptable and repeatable outside one developer machine.
- Required evidence: CI config + local commands
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-DEL-003 — Clean dependency install in CI
- Severity: `critical`
- Applies when: `package-managed`
- Rule: CI MUST use lockfile-respecting clean install and fail on unexpected dependency drift.
- Required evidence: CI log/config
- Test mode: `review`
- Sources: `SRC-SLSA-12`

### WEB-DEL-004 — Build artifact immutable
- Severity: `critical`
- Applies when: `artifact-deploy`
- Rule: Promote the same built artifact between stages when architecture permits; do not rebuild differently for production without traceability.
- Required evidence: Artifact digest/provenance
- Test mode: `review`
- Sources: `SRC-SLSA-12`

### WEB-DEL-005 — Environment parity managed
- Severity: `major`
- Applies when: `multi-env`
- Rule: Minimize accidental dev/staging/prod divergence; document unavoidable differences.
- Required evidence: Environment matrix
- Test mode: `review`
- Sources: `SRC-12FACTOR`

### WEB-DEL-006 — Configuration validated at deploy/startup
- Severity: `critical`
- Applies when: `all`
- Rule: Required configuration MUST be schema-validated and environment-specific missing values must fail safely.
- Required evidence: Validation command/test
- Test mode: `review`
- Sources: `SRC-12FACTOR`

### WEB-DEL-007 — Database migration gate
- Severity: `blocker`
- Applies when: `database-release`
- Rule: Release plan MUST order schema/app changes compatibly and verify migration status before dependent code.
- Required evidence: Release evidence
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-DEL-008 — Rollback not assumed
- Severity: `critical`
- Applies when: `production-release`
- Rule: For each release classify rollback safety. Data migrations and external side effects may require roll-forward; document exact recovery path.
- Required evidence: Release plan
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-DEL-009 — Feature flags have lifecycle
- Severity: `major`
- Applies when: `feature-flag`
- Rule: Flags require owner, default, exposure, kill behavior and removal date/condition; stale flags are debt.
- Required evidence: Flag registry
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-DEL-010 — Pre-release smoke on deployed artifact
- Severity: `blocker`
- Applies when: `production-release`
- Rule: Run critical smoke journeys against the actual deployed candidate/environment, not only local tests.
- Required evidence: Smoke report
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-DEL-011 — Post-release verification
- Severity: `critical`
- Applies when: `production-release`
- Rule: Verify health, critical journeys, errors, latency and business signals immediately after release.
- Required evidence: Release evidence pack
- Test mode: `review`
- Sources: `SRC-SRE`, `SRC-OTEL`

### WEB-DEL-012 — Automatic rollback signals explicit
- Severity: `major`
- Applies when: `automated-rollout`
- Rule: If automation can rollback, define trusted signals and safeguards against flapping or data corruption.
- Required evidence: Rollout policy/tests
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-DEL-013 — Operational runbook updated
- Severity: `major`
- Applies when: `production-change`
- Rule: Changes to deployment, dependencies, recovery, jobs or configuration MUST update runbook in same batch.
- Required evidence: Docs diff
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-DEL-014 — Release evidence retained
- Severity: `major`
- Applies when: `production-release`
- Rule: Record revision, migrations, commands, tests, known risks, approver/agent and post-release status.
- Required evidence: Evidence pack
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

## SUP

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-SUP-001` | critical | Dependency inventory | all | Lockfile/SBOM where required |
| `WEB-SUP-002` | major | New dependency review | all | Dependency decision record for material packages |
| `WEB-SUP-003` | major | Unused dependency removal | all | Periodic audit |
| `WEB-SUP-004` | blocker | Package source trusted | package-managed | Registry config review |
| `WEB-SUP-005` | blocker | CI token least privilege | ci | Permission capture |
| `WEB-SUP-006` | critical | Protected release path | production-release | SCM/CI settings evidence |
| `WEB-SUP-007` | major | Artifact provenance preserved | artifact-release | Provenance evidence |
| `WEB-SUP-008` | major | Build isolation target | high-assurance | SLSA mapping |
| `WEB-SUP-009` | critical | Secret scanning and rotation response | all | Scan report + incident record |
| `WEB-SUP-010` | major | Dependency update cadence | production | Maintenance policy |

### WEB-SUP-001 — Dependency inventory
- Severity: `critical`
- Applies when: `all`
- Rule: Maintain machine-readable dependency inventory through lockfiles and platform tooling; know direct and transitive exposure.
- Required evidence: Lockfile/SBOM where required
- Test mode: `review`
- Sources: `SRC-SLSA-12`, `SRC-NIST-SSDF-11`

### WEB-SUP-002 — New dependency review
- Severity: `major`
- Applies when: `all`
- Rule: Before adding a dependency assess necessity, maintenance, license, security posture, size, permissions and alternatives.
- Required evidence: Dependency decision record for material packages
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-SUP-003 — Unused dependency removal
- Severity: `major`
- Applies when: `all`
- Rule: Remove dependencies and tools no longer needed to reduce attack and maintenance surface.
- Required evidence: Periodic audit
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

### WEB-SUP-004 — Package source trusted
- Severity: `blocker`
- Applies when: `package-managed`
- Rule: Use approved registries/sources; protect against typosquatting and namespace confusion.
- Required evidence: Registry config review
- Test mode: `review`
- Sources: `SRC-SLSA-12`

### WEB-SUP-005 — CI token least privilege
- Severity: `blocker`
- Applies when: `ci`
- Rule: CI/CD tokens MUST have minimum scopes and short-lived credentials where platform supports them.
- Required evidence: Permission capture
- Test mode: `review`
- Sources: `SRC-SLSA-12`

### WEB-SUP-006 — Protected release path
- Severity: `critical`
- Applies when: `production-release`
- Rule: Production release workflows require protected identity/branch/environment controls appropriate to risk.
- Required evidence: SCM/CI settings evidence
- Test mode: `review`
- Sources: `SRC-SLSA-12`

### WEB-SUP-007 — Artifact provenance preserved
- Severity: `major`
- Applies when: `artifact-release`
- Rule: Preserve provenance/attestation for important artifacts when platform supports it; verify before promotion for higher-assurance systems.
- Required evidence: Provenance evidence
- Test mode: `review`
- Sources: `SRC-SLSA-12`

### WEB-SUP-008 — Build isolation target
- Severity: `major`
- Applies when: `high-assurance`
- Rule: For higher-risk systems define desired SLSA build level and use hosted/hardened builders accordingly.
- Required evidence: SLSA mapping
- Test mode: `review`
- Sources: `SRC-SLSA-12`

### WEB-SUP-009 — Secret scanning and rotation response
- Severity: `critical`
- Applies when: `all`
- Rule: Scan source/history where feasible and treat committed secrets as compromised until revoked/rotated.
- Required evidence: Scan report + incident record
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`, `SRC-OWASP-CHEATS`

### WEB-SUP-010 — Dependency update cadence
- Severity: `major`
- Applies when: `production`
- Rule: Define routine and emergency dependency update paths; avoid permanent pinning to known vulnerable versions.
- Required evidence: Maintenance policy
- Test mode: `review`
- Sources: `SRC-NIST-SSDF-11`

## PRIV

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-PRIV-001` | blocker | Data processing inventory | personal-data | Data processing map |
| `WEB-PRIV-002` | critical | Data minimization | personal-data | Field-by-field justification |
| `WEB-PRIV-003` | critical | Purpose limitation | personal-data | Privacy decision record |
| `WEB-PRIV-004` | critical | Retention and deletion | personal-data | Lifecycle tests/runbook |
| `WEB-PRIV-005` | critical | Third-party data sharing inventory | third-party-data | Vendor data map |
| `WEB-PRIV-006` | critical | Consent/preferences not dark patterns | tracking-or-consent | UX/privacy review |
| `WEB-PRIV-007` | critical | Client storage classified | browser-storage | Storage inspection/test |
| `WEB-PRIV-008` | major | Analytics scope minimized | analytics | Analytics schema review |
| `WEB-PRIV-009` | critical | Privacy impact for new sensitive features | sensitive-feature | Privacy review |
| `WEB-PRIV-010` | major | User data requests operationalized | personal-data | Runbook + test case |

### WEB-PRIV-001 — Data processing inventory
- Severity: `blocker`
- Applies when: `personal-data`
- Rule: Inventory personal/sensitive data, purpose, source, storage, sharing, retention and owner.
- Required evidence: Data processing map
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`

### WEB-PRIV-002 — Data minimization
- Severity: `critical`
- Applies when: `personal-data`
- Rule: Collect and retain only data necessary for explicit product/legal purpose; convenience is not enough.
- Required evidence: Field-by-field justification
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`, `SRC-W3C-PRIVACY-PRINCIPLES`

### WEB-PRIV-003 — Purpose limitation
- Severity: `critical`
- Applies when: `personal-data`
- Rule: New use of collected data requires explicit review against original purpose and user expectations.
- Required evidence: Privacy decision record
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`

### WEB-PRIV-004 — Retention and deletion
- Severity: `critical`
- Applies when: `personal-data`
- Rule: Define retention periods/triggers and verifiable deletion/anonymization behavior across primary stores, replicas and vendors.
- Required evidence: Lifecycle tests/runbook
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`

### WEB-PRIV-005 — Third-party data sharing inventory
- Severity: `critical`
- Applies when: `third-party-data`
- Rule: Document which vendors receive data, why, fields, region/contract controls and failure/removal path.
- Required evidence: Vendor data map
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`

### WEB-PRIV-006 — Consent/preferences not dark patterns
- Severity: `critical`
- Applies when: `tracking-or-consent`
- Rule: Where consent/preferences apply, choices must be meaningful, reversible and not deceptively designed.
- Required evidence: UX/privacy review
- Test mode: `review`
- Sources: `SRC-W3C-PRIVACY-PRINCIPLES`

### WEB-PRIV-007 — Client storage classified
- Severity: `critical`
- Applies when: `browser-storage`
- Rule: Do not put secrets or unnecessary personal data in localStorage/IndexedDB/caches; define logout and shared-device behavior.
- Required evidence: Storage inspection/test
- Test mode: `review`
- Sources: `SRC-OWASP-ASVS-5`, `SRC-NIST-PRIVACY-10`

### WEB-PRIV-008 — Analytics scope minimized
- Severity: `major`
- Applies when: `analytics`
- Rule: Collect analytics events/properties with explicit purpose and avoid leaking free-text or identifiers unnecessarily.
- Required evidence: Analytics schema review
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`

### WEB-PRIV-009 — Privacy impact for new sensitive features
- Severity: `critical`
- Applies when: `sensitive-feature`
- Rule: Before shipping new sensitive processing, assess users, harms, data flows, mitigations and residual risk.
- Required evidence: Privacy review
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`, `SRC-W3C-PRIVACY-PRINCIPLES`

### WEB-PRIV-010 — User data requests operationalized
- Severity: `major`
- Applies when: `personal-data`
- Rule: Where product/legal requirements include access/export/correction/deletion, define identity verification and end-to-end fulfillment.
- Required evidence: Runbook + test case
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`

## I18N

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-I18N-001` | critical | Document language declared | all | DOM test |
| `WEB-I18N-002` | critical | Direction explicit for RTL | rtl | Arabic/RTL manual test |
| `WEB-I18N-003` | major | Strings externalized when localized | localized | I18n catalog review |
| `WEB-I18N-004` | critical | Locale-aware formatting | localized | Locale matrix tests |
| `WEB-I18N-005` | major | Identifiers separate from labels | localized | Schema review |
| `WEB-I18N-006` | critical | BiDi mixed-content tested | rtl | RTL fixture screenshots/manual test |
| `WEB-I18N-007` | major | Layout tolerates expansion | localized | Pseudo/localization viewport test |
| `WEB-I18N-008` | major | Search/collation semantics deliberate | localized-search | Search fixtures |

### WEB-I18N-001 — Document language declared
- Severity: `critical`
- Applies when: `all`
- Rule: Set correct document/content language metadata so browsers and assistive technologies can process pronunciation and rules.
- Required evidence: DOM test
- Test mode: `review`
- Sources: `SRC-WHATWG-HTML`, `SRC-W3C-I18N`

### WEB-I18N-002 — Direction explicit for RTL
- Severity: `critical`
- Applies when: `rtl`
- Rule: Use correct dir semantics at document/component boundaries; do not reverse layouts through ad-hoc CSS only.
- Required evidence: Arabic/RTL manual test
- Test mode: `review`
- Sources: `SRC-W3C-I18N`

### WEB-I18N-003 — Strings externalized when localized
- Severity: `major`
- Applies when: `localized`
- Rule: User-facing strings requiring localization MUST be separated from code and support interpolation/pluralization safely.
- Required evidence: I18n catalog review
- Test mode: `review`
- Sources: `SRC-W3C-I18N`

### WEB-I18N-004 — Locale-aware formatting
- Severity: `critical`
- Applies when: `localized`
- Rule: Format dates, numbers, currencies and units using explicit locale/timezone rules; never assume US/English defaults.
- Required evidence: Locale matrix tests
- Test mode: `review`
- Sources: `SRC-W3C-I18N`

### WEB-I18N-005 — Identifiers separate from labels
- Severity: `major`
- Applies when: `localized`
- Rule: Persist stable language-neutral IDs/codes; localized labels are presentation, not authoritative identifiers.
- Required evidence: Schema review
- Test mode: `review`
- Sources: `SRC-W3C-I18N`

### WEB-I18N-006 — BiDi mixed-content tested
- Severity: `critical`
- Applies when: `rtl`
- Rule: Test Arabic/RTL mixed with Latin text, phone numbers, URLs, SKU/code and user input for bidirectional rendering errors.
- Required evidence: RTL fixture screenshots/manual test
- Test mode: `review`
- Sources: `SRC-W3C-I18N`

### WEB-I18N-007 — Layout tolerates expansion
- Severity: `major`
- Applies when: `localized`
- Rule: UI must tolerate longer translations and different scripts without clipping or hidden controls.
- Required evidence: Pseudo/localization viewport test
- Test mode: `review`
- Sources: `SRC-W3C-I18N`

### WEB-I18N-008 — Search/collation semantics deliberate
- Severity: `major`
- Applies when: `localized-search`
- Rule: Define normalization, case/accent/script handling and locale-specific collation where search/sort correctness matters.
- Required evidence: Search fixtures
- Test mode: `review`
- Sources: `SRC-W3C-I18N`

## PWA

| ID | Severity | Title | Applies when | Evidence |
|---|---|---|---|---|
| `WEB-PWA-001` | major | PWA applicability explicit | pwa | PWA decision record |
| `WEB-PWA-002` | major | Manifest validated | pwa | Manifest test/install evidence |
| `WEB-PWA-003` | critical | Service worker update strategy | service-worker | Update E2E test |
| `WEB-PWA-004` | critical | Offline state explicit | offline-capable | Offline matrix + tests |
| `WEB-PWA-005` | critical | Cache namespaces/versioning | service-worker | Cache inspection/tests |
| `WEB-PWA-006` | critical | Push permission contextual | push | UX + revocation test |
| `WEB-PWA-007` | critical | Push payload privacy | push | Payload review |
| `WEB-PWA-008` | major | Install/offline tested on real target | pwa | Device evidence |

### WEB-PWA-001 — PWA applicability explicit
- Severity: `major`
- Applies when: `pwa`
- Rule: Do not add service worker/manifest complexity unless installability, offline, push or caching outcomes justify it.
- Required evidence: PWA decision record
- Test mode: `review`
- Sources: `SRC-W3C-APP-MANIFEST`

### WEB-PWA-002 — Manifest validated
- Severity: `major`
- Applies when: `pwa`
- Rule: Manifest metadata, icons, start URL and scope must match intended app behavior and be tested on target platforms.
- Required evidence: Manifest test/install evidence
- Test mode: `review`
- Sources: `SRC-W3C-APP-MANIFEST`

### WEB-PWA-003 — Service worker update strategy
- Severity: `critical`
- Applies when: `service-worker`
- Rule: Define activation/update behavior so users do not stay indefinitely on incompatible mixed versions.
- Required evidence: Update E2E test
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-PWA-004 — Offline state explicit
- Severity: `critical`
- Applies when: `offline-capable`
- Rule: Define which routes/actions work offline, how stale data is labeled and how queued mutations reconcile.
- Required evidence: Offline matrix + tests
- Test mode: `review`
- Sources: `SRC-SRE`

### WEB-PWA-005 — Cache namespaces/versioning
- Severity: `critical`
- Applies when: `service-worker`
- Rule: Service-worker caches require explicit versioning, eviction and cleanup; never cache sensitive responses by wildcard.
- Required evidence: Cache inspection/tests
- Test mode: `review`
- Sources: `SRC-HTTP-9111`, `SRC-OWASP-ASVS-5`

### WEB-PWA-006 — Push permission contextual
- Severity: `critical`
- Applies when: `push`
- Rule: Request notification permission only with clear user context/value; define unsubscribe and token lifecycle.
- Required evidence: UX + revocation test
- Test mode: `review`
- Sources: `SRC-W3C-PRIVACY-PRINCIPLES`

### WEB-PWA-007 — Push payload privacy
- Severity: `critical`
- Applies when: `push`
- Rule: Do not place unnecessary sensitive content in notification payloads or lock-screen text.
- Required evidence: Payload review
- Test mode: `review`
- Sources: `SRC-NIST-PRIVACY-10`

### WEB-PWA-008 — Install/offline tested on real target
- Severity: `major`
- Applies when: `pwa`
- Rule: At least one real target-device test is required for installability, launch, update and offline behavior.
- Required evidence: Device evidence
- Test mode: `review`
- Sources: `SRC-W3C-APP-MANIFEST`
