---
type: system
status: active
created: 2026-07-07
topics: [ai, runtime, brain-service, architecture]
ai_access: allowed
---
# Brain Service Runtime Architecture

The vault defines memory and control. A real persistent AI brain needs a runtime around it.

## Recommended components

```text
Obsidian Vault (source truth)
        │
        ▼
1. Vault Watcher + Content Hashes
        │
        ▼
2. Markdown/Frontmatter/Link Parser
        │
        ├─────────────► Access Policy Gate
        │
        ▼
3. Derived Search Index
   PostgreSQL FTS + pgvector + entity links
        │
        ▼
4. Project Resolver
        │
        ▼
5. Context Pack Builder
        │
        ▼
6. Agent Orchestrator
   task graph + tool calls + retry policy
        │
        ├─────────────► Repo/Git Tools
        ├─────────────► Shell/Test Tools
        ├─────────────► Web/Official Sources
        ├─────────────► Connected Services
        │
        ▼
7. Persistent Run State / Checkpoints
        │
        ▼
8. Verification Engine
   acceptance + quality gates + evidence
        │
        ▼
9. Memory Writeback
   current state + queue + runs + evidence
        │
        ▼
10. Learning Extractor
   failures + lessons + pattern candidates
        │
        ▼
11. Governance Gate
   promotion/change proposals only
```

## Design invariant
The LLM is replaceable. The vault, run state, evidence, and project identity must survive model changes and context resets.

## Persistent execution
A long task must not depend on one conversation. The orchestrator stores checkpoints under [[00_System/AI Runtime/Persistent Agent Run State Contract]].

## Queue model
Suggested runtime tables/records:
- `agent_runs`,
- `run_tasks`,
- `run_attempts`,
- `run_checkpoints`,
- `verification_results`,
- `memory_writebacks`,
- `learning_candidates`.

These are runtime state, not replacements for canonical vault memory.

## Safety and privacy
Before retrieval/tool use:
- enforce `ai_access`,
- enforce project/tenant boundaries,
- mask secrets,
- require approval for destructive actions,
- log meaningful actions and evidence.

## Key principle
Persistence comes from explicit state machines and checkpoints, not from telling an LLM “remember everything.”
