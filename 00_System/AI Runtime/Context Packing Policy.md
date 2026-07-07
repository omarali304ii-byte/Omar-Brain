---
type: system
status: active
created: 2026-07-07
topics: [ai, context, tokens, retrieval]
ai_access: allowed
---
# Context Packing Policy

The brain may grow huge. Context must stay selective.

## Boot context order
1. Constitution/rules only as needed or cached,
2. project canonical note,
3. compact `01_CONTEXT.md`,
4. current state,
5. execution queue,
6. task-relevant authorities,
7. top relevant decisions/failures/patterns,
8. repo snippets/files directly required.

## Context tiers
- **Tier 0 identity**: project ID, profile, repo, phase.
- **Tier 1 control**: outcome, current state, queue.
- **Tier 2 task**: requirements, architecture sections, relevant decisions.
- **Tier 3 evidence**: tests, failures, run records.
- **Tier 4 expansion**: broader knowledge only when insufficient.

## Rules
- never dump whole vault,
- never dump whole repo,
- prefer heading-level retrieval,
- preserve exact identifiers,
- use source paths,
- expand only after evidence of insufficiency,
- `01_CONTEXT.md` is a cache and must not overrule sources.
