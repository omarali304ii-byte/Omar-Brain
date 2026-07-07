---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [registry, capabilities, skills]
ai_access: allowed
---
# Capability Registry

## Purpose
Index reusable expertise without loading all expertise into every agent.

## Seed capabilities
| Capability ID | Source | Trigger |
|---|---|---|
| cap-project-boot | [[Project Agent Boot Protocol]] | project work |
| cap-repo-inspection | [[Repo Inspection Protocol]] | codebase task |
| cap-web-expert | [[Web Development Expert System]] | `project_kind: web` |
| cap-hybrid-retrieval | [[Retrieval OS]] | memory lookup/research |
| cap-memory-curation | [[Memory OS]] | durable write proposal |
| cap-failure-recovery | [[Failure Recovery Loop]] | failed verification |

Future runtime should track version, success/failure counts, and eval performance.
