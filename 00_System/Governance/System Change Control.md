---
type: system
status: active
created: 2026-07-07
topics: [governance, migration, change-control]
ai_access: allowed
---
# System Change Control

Global structure is infrastructure. Treat it like a production schema.

## Changes requiring a proposal
- new top-level folder,
- new note type,
- new status or metadata property,
- changed project packet,
- changed architecture baseline,
- changed AI stop rule,
- changed access/trust policy,
- changed promotion threshold,
- renamed canonical path.

## Required proposal sections
1. Problem.
2. Evidence.
3. Existing mechanisms considered.
4. Proposed change.
5. Compatibility impact.
6. Migration plan.
7. Rollback plan.
8. Validators/templates/dashboards affected.
9. Acceptance criteria.

## Execution
A change is complete only when:
- rule docs updated,
- templates updated,
- dashboards updated,
- automation/validator updated,
- existing content migrated,
- validation passes,
- change log records the result.

AI may create a `change-proposal`; it may not silently approve its own global change.
