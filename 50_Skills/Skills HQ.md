---
type: system
status: active
created: 2026-07-07
topics: [skills, learning, capability-routing, graph]
ai_access: allowed
---
# Skills HQ

A skill is a reusable capability contract connected to routes, neighboring capabilities, handoffs, evidence, and maturity.

## Skill OS

- [[00_System/Skill OS/Skill Marketplace Operating System]]
- [[00_System/Skill OS/Skill Maturity Ladder]]
- [[00_System/Skill OS/Skill Graph Standard]]
- [[00_System/Skill OS/Skill Composition and Handoff Protocol]]
- [[00_System/Skill OS/Skill Development Lifecycle]]
- [[00_System/Skill OS/Skill Evidence Ledger]]
- `00_System/Skill OS/skill-registry.json`
- `00_System/Skill OS/skill-graph.json`
- `00_System/Skill OS/skill-bundles.json`

## Marketplace

This v8 marketplace contains **61 active skills**. Imported is not mastered; every imported capability begins at `S1_IMPORTED` until evidence promotes it.

| Category | Index | Count |
|---|---|---:|
| AI-Work | [[50_Skills/AI-Work/_Index|AI-Work Skills]] | 3 |
| Analytics | [[50_Skills/Analytics/_Index|Analytics Skills]] | 4 |
| Execution | [[50_Skills/Execution/_Index|Execution Skills]] | 8 |
| Growth | [[50_Skills/Growth/_Index|Growth Skills]] | 5 |
| Marketing | [[50_Skills/Marketing/_Index|Marketing Skills]] | 12 |
| Research | [[50_Skills/Research/_Index|Research Skills]] | 10 |
| SEO | [[50_Skills/SEO/_Index|SEO Skills]] | 4 |
| Strategy | [[50_Skills/Strategy/_Index|Strategy Skills]] | 3 |
| Technical | [[50_Skills/Technical/_Index|Technical Skills]] | 12 |

## External Claude Skill Library

Omar Brain also contains **559 imported on-demand Claude skills** at `50_Skills/Claude Skill Library/`. They are **not** part of the 61-skill canonical active marketplace and are not preloaded.

Use:

- `/skill-find`, or
- `node "00_System/Automation/external-skill-route.mjs" "." "<task request>"`

External skills begin at `S0_DISCOVERED`, stay subordinate to Brain governance and repository truth, and require inspection before use. Maximum active external set: one primary plus at most two support skills.

## AI Road Signs

| Need | Go to |
|---|---|
| choose a primary canonical skill | `00_System/Automation/skill-route.mjs` |
| search 559 external skills lazily | `/skill-find` or `external-skill-route.mjs` |
| inspect project stack and suggest technical skills | `00_System/Automation/skill-stack.mjs` |
| see capability connections | `00_System/Skill OS/skill-graph.json` |
| use a common multi-skill journey | `00_System/Skill OS/skill-bundles.json` |
| propose a missing capability | `00_System/Automation/skill-dev.mjs` |
| record a real application | `00_System/Automation/skill-evidence.mjs` |
| distill repeated work | [[50_Skills/AI-Work/skill-distillation]] |
| production-ready outcome | [[00_System/Production Readiness OS/Production Readiness Operating System]] |

**Do not stay here when:** the work is a one-off project, a fact belongs in Knowledge, or a candidate has not passed the development gate.

**Arrival proof:** primary skill selected + support skills justified + gates checked + evidence/handoff verdict.
