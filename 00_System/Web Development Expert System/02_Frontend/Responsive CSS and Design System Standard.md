---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 02_frontend]
ai_access: allowed
---
# Responsive CSS and Design System Standard

## Rules

- Design from content constraints, not a list of device names.
- Prefer layout primitives over position hacks.
- Reserve media/async dimensions when known.
- Shared tokens for spacing, typography, radii and layers where a design system exists.
- Avoid unbounded z-index escalation; define layer scale.
- Do not hide required information only because viewport is small.
- Test keyboard, touch, zoom and long translated strings.
- Components must define loading/error/disabled/focus behavior, not only visual happy state.

## Required viewport evidence

Project declares a support matrix. At minimum, critical journeys are reviewed at representative narrow mobile, wide mobile/tablet and desktop widths, plus zoom/reflow requirements from accessibility target.
