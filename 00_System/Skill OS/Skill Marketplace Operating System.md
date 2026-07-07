---
type: system
status: active
created: 2026-07-07
topics: [skills, capability-routing, learning, graph]
ai_access: allowed
---
# Skill Marketplace Operating System

The Skill Marketplace lets AI select the smallest useful capability, compose it through explicit graph handoffs, execute with evidence, and improve without confusing imported knowledge with proven Omar capability.

## Core law

A skill is not just a note. It needs activation triggers, inputs, workflow, outputs, quality gates, provenance, maturity, graph edges, and evidence requirements.

## Runtime

```text
Request
  -> resolve brain route
  -> rank skills
  -> choose ONE primary skill
  -> inspect graph/bundle/stack evidence
  -> lazy-load 0-2 support skills
  -> execute
  -> verify gates
  -> record evidence
  -> handoff / complete / candidate gap
```

## Canonical files

- [[00_System/Skill OS/Skill Maturity Ladder]]
- [[00_System/Skill OS/Skill Graph Standard]]
- [[00_System/Skill OS/Skill Composition and Handoff Protocol]]
- [[00_System/Skill OS/Skill Development Lifecycle]]
- [[00_System/Skill OS/Skill Evidence Ledger]]
- `00_System/Skill OS/skill-registry.json`
- `00_System/Skill OS/skill-graph.json`
- `00_System/Skill OS/skill-bundles.json`
- `00_System/Skill OS/skill-candidates.json`

## AI road signs

| Situation | Go to |
|---|---|
| choose primary skill | `00_System/Automation/skill-route.mjs` |
| inspect a real repo stack | `00_System/Automation/skill-stack.mjs` |
| validate graph and bundles | `00_System/Automation/check-skill-connectivity.mjs` |
| record real application | `00_System/Automation/skill-evidence.mjs` |
| propose missing capability | `00_System/Automation/skill-dev.mjs` |
| repeated verified workflow | [[50_Skills/AI-Work/skill-distillation]] |
| production claim | [[00_System/Production Readiness OS/Production Readiness Operating System]] |

## Anti-bloat laws

- Never load the whole marketplace.
- Never activate a candidate automatically.
- Never create a skill for one tiny task or a fact.
- Never promote maturity from self-description.
- Prefer improving an existing skill over creating a near-duplicate.
