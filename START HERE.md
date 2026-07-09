---
type: system
status: active
created: 2026-07-07
updated: 2026-07-09
topics: [onboarding, brain, claude-code]
ai_access: allowed
version: 11.0
---
# START HERE

Omar Brain v11 is a governed cognition, project execution, retrieval, learning, and Claude Code runtime system. It is layered so AI can act intelligently without drowning in the whole vault.

## Claude Code: the native first file
When Claude Code opens at the vault root, it automatically loads `CLAUDE.md`.

That contract sends Claude through:
```text
CLAUDE.md
  ↓
Operating Map
  ↓
brain-state.json + HOT + critical gaps
  ↓
per-prompt route selection
  ↓
project/entity resolution
  ↓
minimum authoritative context
  ↓
execute + verify + repair
  ↓
governed writeback
```

Read [[00_System/Claude Code OS/Claude Code Native Runtime]] for the native runtime architecture.

## The first map for any AI
[[00_System/Operating Map]]

Then read only as needed:
1. `00_System/Runtime State/brain-state.json`
2. [[00_System/Runtime State/HOT]]
3. OPEN P0/P1 rows in [[00_System/Runtime State/GAP_REGISTER]]
4. the matched route from `00_System/Navigation OS/route-registry.json`

CLI:
```powershell
node .\00_System\Automation\brain-start.mjs . auto
```

Task router:
```powershell
node .\00_System\Automation\brain-route.mjs . "make my website ready for production"
```

## System layers
```text
1. Constitution/Governance — truth, conflicts, change control
2. Memory OS              — semantic, episodic, procedural memory
3. Project OS             — same control plane across projects
4. AI Runtime             — resolve, boot, inspect, execute, verify, resume
5. Retrieval OS           — smallest sufficient context and graph expansion
6. Agent OS               — supervisor + few specialists + single durable writer
7. Production OS          — audit, harden, critic, release evidence
8. Evaluation/Learning    — prove improvement; promote from real evidence
9. Connected Intelligence — objects, relationships, causal lineage, impact
10. Claude Code OS        — native front door, scoped rules, skills, hooks, guards
11. Agentic Execution OS  — persistent batch state, compact capsules, verification gates, fresh contexts
```

## First laws
1. [[00_System/Brain Constitution]]
2. [[00_System/Governance/Truth Hierarchy and Conflict Policy]]
3. [[00_System/Governance/No Silent Overwrite Policy]]
4. [[00_System/Taxonomy and Routing Rules]]
5. [[00_System/Metadata Schema]]

## When Claude should think like Omar
Read [[00_System/Claude Code OS/Omar Thinking Execution Policy]].

The core loop is:
```text
outcome -> constraints -> current reality -> exact authority
-> root cause/dependency chain -> smallest correct move
-> blast radius -> proof -> execute -> diagnose/repair -> re-verify
```

This is decision structure, not imitation of wording.

## When you have a new idea
Use `15_Ideas/Incubator` and `TPL - Idea`. Do not create a project until outcome and done definition exist.

## When you create a project
Use:
- [[00_System/Project OS/Universal Project Contract]]
- [[00_System/Project OS/Project Folder Blueprint v2]]
- `00_System/Automation/new-project.mjs`

## When Omar has a detailed plan with batches and a final goal
Use [[00_System/Agentic Execution OS/Agentic Execution Operating System]].

Best flow:
```text
source plan -> /plan-install -> validated Agent Loop
-> B001 compact capsule -> execute -> verify
-> evidence + handoff -> fresh context
-> B002 -> ... -> final goal gate
```

Claude skills: `/plan-install`, `/agent-loop`, `/batch-resume`.
Windows fresh-context runner: [[00_System/Agentic Execution OS/Quick Start - Install and Run a Plan]].

## When AI is asked to build or continue Project X
It must:
1. resolve Project X,
2. boot compact project context,
3. inspect the real repository,
4. compare docs to code,
5. build a dependency-aware task graph,
6. implement the smallest verifiable batch,
7. verify,
8. diagnose/repair failures,
9. checkpoint state and evidence,
10. extract learning proposals,
11. continue until a valid exit condition.

Read:
- [[00_System/AI Runtime/Project Agent Master Prompt]]
- [[00_System/AI Runtime/Autonomous Completion Loop]]
- [[00_System/AI Runtime/Stop Conditions and Blocker Policy]]

Claude skill: `/project-run`.

## When a project must become production-ready
Use [[00_System/Production Readiness OS/Production Readiness Operating System]].

The agent must:
1. resolve project and exact revision,
2. inspect the real repo/runtime evidence,
3. audit applicable production domains,
4. classify P0-P3 findings,
5. fix P0/P1 in dependency order,
6. re-verify changed boundaries,
7. hand claims to an independent Critic,
8. pass release gates before readiness claims.

Claude skill: `/production-harden`.

## When research or a large source arrives
Use [[00_System/Knowledge Graph/Source-Backed Knowledge Protocol]]. Do not save one giant summary when reusable claims, entities, concepts, contradictions, or analyses exist.

## How the brain gets smarter
Read:
- [[00_System/Learning System/AI Learning Flywheel]]
- [[00_System/Learning System/Lesson and Pattern Promotion Ladder]]
- [[00_System/Learning System/Self-Improvement Guardrails]]

Rule: **promotion, not accumulation**.

## Validate the vault
```powershell
node .\00_System\Automation\brain-validator.mjs .
node .\00_System\Automation\check-runtime-consistency.mjs .
node .\00_System\Automation\check-navigation-connectivity.mjs .
node .\00_System\Automation\brain-cycle.mjs .
```

Claude skill: `/brain-audit`.

## AI Road Signs

**You are here:** onboarding intersection.

| Destination | Go to |
|---|---|
| Claude Code native operation | [[00_System/Claude Code OS/Claude Code Native Runtime]] |
| exact route selection | [[00_System/Navigation OS/Road Sign Navigation System]] |
| run a multi-batch plan to final goal | [[00_System/Agentic Execution OS/Agentic Execution Operating System]] |
| continue a real project | [[00_System/AI Runtime/Project Agent Master Prompt]] |
| production hardening | [[00_System/Production Readiness OS/Production Readiness Operating System]] |
| durable memory | [[00_System/Memory OS/Memory OS]] |
| improve the brain | [[00_System/Governance/System Change Control]] |

**Do not stay here when:** onboarding is complete.  
**Arrival proof:** route ID + canonical target + minimum authority + explicit destination proof.
