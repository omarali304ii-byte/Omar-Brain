---
type: standard
status: active
created: 2026-07-07
topics: [modules, files, maintainability]
ai_access: allowed
maturity: standard
---
# Module and File Boundary Standard

## Feature boundaries
Each meaningful feature/module owns its behavior and exposes a narrow contract. Do not scatter one feature across random global folders without reason.

## File size guardrails
- under 300 lines: normal,
- 300–600: inspect cohesion,
- over 600: mandatory architectural review,
- over 1,000: prohibited unless generated/vendor artifact, migration, fixture, or documented waiver.

Line count is a smell detector, not a substitute for design. Split by responsibility, not arbitrary chunks.

## Shared code
- shared UI primitives live in a deliberate shared layer,
- shared domain primitives require stable semantics,
- do not create “utils” dumping grounds,
- duplication is preferable to a false abstraction until shared meaning is proven.
