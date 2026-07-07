---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [onboarding, brain]
ai_access: allowed
version: 6.0
---
# START HERE

Omar Brain v6 is a governed personal/company cognition system. It is intentionally layered so AI does not drown in the whole vault.

```text
0. Operating Map — where to start and what is authoritative
1. Memory OS     — durable semantic / episodic / procedural memory
2. Project OS    — same control plane across projects
3. AI Runtime    — resolve, boot, inspect, execute, verify, resume
4. Retrieval OS — smallest sufficient context, hybrid search, graph expansion
5. Agent OS      — supervisor + minimal specialists + single durable writer
6. Evaluation   — prove retrieval, agents, and memory changes improve
7. Learning      — failures/lessons → validated patterns → standards
```

## The first file for AI
[[00_System/Operating Map]]

Then read:
1. `00_System/Runtime State/brain-state.json`
2. [[00_System/Runtime State/HOT]]
3. OPEN P0/P1 rows in [[00_System/Runtime State/GAP_REGISTER]]

CLI:
```powershell
node .\00_System\Automation\brain-start.mjs . auto
```

Modes: `project`, `business`, `research`, `personal`, `skill`, `system`.

Task router:
```powershell
node .\00_System\Automation\brain-route.mjs . "make my website ready for production"
```

## First laws to understand
1. [[00_System/Brain Constitution]]
2. [[00_System/Governance/Truth Hierarchy and Conflict Policy]]
3. [[00_System/Governance/No Silent Overwrite Policy]]
4. [[00_System/Taxonomy and Routing Rules]]
5. [[00_System/Metadata Schema]]

## When you have a new idea
Use `15_Ideas/Incubator` and `TPL - Idea`. Do not create a project until outcome and done definition exist.

## When you create a project
Use:
- [[00_System/Project OS/Universal Project Contract]]
- [[00_System/Project OS/Project Folder Blueprint v2]]
- `00_System/Automation/new-project.mjs`

## When AI is asked to build Project X
It must:
1. resolve Project X,
2. boot project context,
3. inspect the real repo,
4. build a dependency-aware task graph,
5. implement,
6. verify,
7. diagnose/repair failures,
8. checkpoint state and evidence,
9. extract learning proposals,
10. continue until a valid exit condition.

Read:
- [[00_System/AI Runtime/Project Agent Master Prompt]]
- [[00_System/AI Runtime/Autonomous Completion Loop]]
- [[00_System/AI Runtime/Stop Conditions and Blocker Policy]]
- [[00_System/AI Runtime/Persistent Agent Run State Contract]]

## When a project must become production-ready
Use [[00_System/Production Readiness OS/Production Readiness Operating System]].

The agent must:
1. resolve the project,
2. inspect the actual repo and exact revision,
3. baseline-audit applicable production domains,
4. classify P0–P3 findings,
5. create a dependency-aware hardening queue,
6. fix and re-verify repeatedly,
7. hand the final claim to an independent Critic,
8. pass the release gate before calling it production-ready.

Preliminary scanner:
```powershell
node .\00_System\Automation\production-readiness.mjs "<repo-path>"
```

## When new research or a big source arrives
Use [[00_System/Knowledge Graph/Source-Backed Knowledge Protocol]]. Do not save one giant summary when the source contains reusable claims, entities, concepts, contradictions, or analyses.

## How the brain gets smarter
Read:
- [[00_System/Learning System/AI Learning Flywheel]]
- [[00_System/Learning System/Lesson and Pattern Promotion Ladder]]
- [[00_System/Learning System/Self-Improvement Guardrails]]

The rule is: **promotion, not accumulation**.

## Validate the vault
```powershell
node .\00_System\Automation\brain-validator.mjs .
node .\00_System\Automation\check-runtime-consistency.mjs .
node .\00_System\Automation\brain-cycle.mjs .
```

## v6 mental model
The Brain is five coupled systems:
1. canonical Obsidian truth,
2. explicit startup/state control plane,
3. derived retrieval/index layer,
4. persistent minimal-agent runtime,
5. evaluation and governed learning loop.

Do not let agents bypass the Memory Curator for durable semantic/procedural writes. Do not let notes replace real repository inspection for live software truth.

## AI Road Signs

**You are here:** onboarding intersection.

| When the destination is... | Go to... |
|---|---|
| choose a route by task intent | [[00_System/Navigation OS/Road Sign Navigation System]] |
| machine-readable routes | `00_System/Navigation OS/route-registry.json` |
| continue a real project | [[00_System/AI Runtime/Project Agent Master Prompt]] |
| make a project production-ready | [[00_System/Production Readiness OS/Production Readiness Operating System]] |
| improve the brain itself | [[00_System/Governance/System Change Control]] |

**Do not stay here when:** onboarding is complete.  
**Arrival proof:** the AI knows the route ID, entrypoint, next signs, and destination proof.
