---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [web-development, 02_frontend]
ai_access: allowed
---
# Semantic Frontend and Component Architecture

## Principle

The DOM is a contract with browsers, assistive technology, tests and search engines. Native semantics first.

## Component boundaries

A component should have a coherent responsibility. Split when it simultaneously owns unrelated:
- data fetching
- mutations
- business rules
- complex state orchestration
- layout
- provider integration

## State taxonomy

- server/remote state
- URL/navigation state
- ephemeral interaction state
- form draft state
- persisted device state

Do not duplicate authority across categories without sync rules.

## Required UI states

For each async journey:
- initial
- loading
- success
- empty
- partial
- error
- retry
- permission denied
- offline/stale where applicable

## Interaction contract

- buttons are buttons, links navigate
- explicit form submit behavior
- keyboard operation
- visible focus
- accessible names
- no color-only meaning
- optimistic updates reconcile or rollback
