---
type: system
status: active
created: 2026-07-07
topics: [ai, project-resolution, retrieval]
ai_access: allowed
---
# Project Resolver Protocol

When Omar says “project X,” the agent must not rely on conversation memory alone.

## Resolution signals, strongest first
1. exact `project_id`,
2. exact repository URL/path,
3. exact canonical title,
4. aliases/acronyms,
5. company/product link,
6. unique technology/business context,
7. semantic similarity.

## Ambiguous matches
Inspect current-state and repository identifiers. If still ambiguous, choose no project and record a resolver blocker rather than corrupt the wrong project.

## Resolution result
Return internally:
- project path,
- project_id,
- repo path/URL,
- profile,
- current phase,
- confidence,
- evidence used.
