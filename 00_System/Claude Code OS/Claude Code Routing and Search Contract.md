---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [claude-code, retrieval, routing, search]
ai_access: allowed
version: 1.0
---
# Claude Code Routing and Search Contract

Claude should not search the Brain like a pile of notes. It should search like Omar follows a dependency graph.

## Query planning order

```text
request
  -> real outcome
  -> exact constraints/non-goals
  -> route
  -> project/entity resolution
  -> authority requirement
  -> freshness requirement
  -> risk class
  -> exact search
  -> scoped retrieval expansion
  -> context pack
  -> execution proof
```

## Search ladder
1. exact `project_id`, repo URL/path, title, alias, error string, symbol, table, endpoint, migration, provider ID;
2. project manifest and canonical packet;
3. project current state and execution queue;
4. exact decisions, failures, evidence, runs, and accepted architecture;
5. applicable standards and smallest relevant skill set;
6. `brain-context.mjs` lexical/semantic retrieval when exact search is insufficient;
7. `context-plan.mjs` and Connected Intelligence graph for relationship/cross-project planning;
8. external primary sources only when local authority is insufficient or current public truth is required.

## Search stop rule
Stop expanding context when the agent has enough authoritative evidence to decide and verify the next batch. More context is not automatically more intelligence.

## Prompt router output
The `UserPromptSubmit` hook injects:
- selected route ID,
- route evidence,
- entrypoint,
- read-first set,
- destination proof,
- exact project resolution when detected,
- advisory relevant Brain paths.

Advisory search hits never outrank canonical/project/repo authority merely because their lexical score is high.

## Project resolution
Strongest signals:
1. exact project ID,
2. exact path/repo URL,
3. exact title,
4. aliases,
5. company/product link,
6. unique stack/business context,
7. semantic similarity.

Ambiguous aliases fail safe. A fuzzy match cannot authorize a project-specific write.

## Context economy
- No whole-vault dump.
- No whole-repo dump.
- Prefer headings and task-relevant paths.
- Preserve exact identifiers and source paths.
- Expand only after insufficiency is visible.
- Use subagents for high-volume exploration so verbose output does not poison main context.
