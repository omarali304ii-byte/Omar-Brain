---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, definition-of-done, quality]
ai_access: allowed
---
# Web Definition of Done

A web change is done only when all applicable conditions are proven.

## Outcome
- Acceptance criteria pass.
- No known contradictory requirement remains hidden.

## Architecture
- Correct module/boundary owns the change.
- Data source of truth is preserved.
- External side effects and failure modes are explicit.

## Security
- Applicable blocker/critical security rules pass.
- Authorization denial paths pass.
- Secrets and sensitive telemetry are clean.

## Data
- Constraints/migrations/transactions are verified where changed.
- Duplicate/concurrency behavior is proven where relevant.

## Frontend
- Loading/empty/error/permission states are complete.
- No false success.
- Responsive states pass.

## Accessibility
- Applicable automated checks pass.
- Critical journeys pass keyboard/manual evidence.
- WCAG target exceptions are documented, not hidden.

## Performance
- No unexplained material regression.
- Critical route budgets and Core Web Vitals plan remain valid.

## API
- Contract/status/error/idempotency semantics pass where relevant.
- API docs/schema match implementation.

## Testing
- Risk-to-test mapping complete.
- Required unit/integration/E2E/security/accessibility/performance checks pass.

## Operations
- Telemetry exists for critical behavior.
- Runbook/recovery changed with behavior.
- Deployment and rollback/roll-forward are understood.

## Evidence
- Revision recorded.
- Commands/tools and results recorded.
- Deployed runtime checks recorded when required.
- Known limitations explicit.

## Learning
- Important failure signatures and validated lessons written back.
