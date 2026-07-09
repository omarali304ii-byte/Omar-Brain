---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, projects, execution]
ai_access: allowed
paths:
  - "40_Projects/**/*"
---
# Project Execution Rules

When touching project knowledge:
- Resolve `project_id` before project-specific writes.
- Read the manifest, canonical project home, current state, and execution queue first.
- Repository truth is required for current code claims when a repo is available.
- Compare documentation with the exact repo revision; record drift explicitly.
- Build a dependency-aware task graph and choose the smallest verifiable batch.
- Preserve scope: no unrelated redesign, cleanup, fake data, or feature expansion.
- Keep current truth separate from history.
- A state update requires evidence; a completion update requires acceptance proof.
- If project resolution is ambiguous, stop project-specific writes and preserve the ambiguity.
