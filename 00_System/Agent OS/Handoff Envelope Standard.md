---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [agents, handoff, state, context]
ai_access: allowed
memory_class: procedural
version: 1.0
---
# Handoff Envelope Standard

Agents exchange structured state, not vague prose.

```json
{
  "run_id": "run-...",
  "task_id": "task-...",
  "from_role": "librarian",
  "to_role": "researcher",
  "objective": "...",
  "acceptance_criteria": ["..."],
  "facts": [],
  "evidence": [],
  "uncertainties": [],
  "decisions": [],
  "artifacts": [],
  "failures": [],
  "permissions": [],
  "exact_next_action": "..."
}
```

## Rule
Do not forward entire hidden reasoning or full chat history when a smaller state envelope is sufficient.
