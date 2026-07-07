---
type: standard
status: active
created: 2026-07-07
topics: [ui, shared-components, frontend]
ai_access: allowed
maturity: standard
---
# UI and Shared Component Standard

## Rules
- UI calls actions/services/API contracts; no direct database access.
- Reuse stable design primitives and shared components.
- Feature-specific UI stays near its feature.
- Accessibility, loading, empty, error, permission-denied, and mobile states are explicit.
- Do not duplicate large UI patterns across pages.
- Do not make a shared component so generic that product behavior becomes unreadable.
- UI must not claim success before the trusted backend/result confirms it.
