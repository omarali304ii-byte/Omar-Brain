---
type: system
status: active
created: 2026-07-07
updated: 2026-07-09
topics: [operating-map, startup, routing, source-of-truth]
ai_access: allowed
version: 11.0
---
# Omar Brain Operating Map

This is the mandatory first map for AI work that depends on Omar's memory, projects, business context, skills, or system rules.

## Current source of truth
- Canonical human-readable truth: this Obsidian vault.
- Global runtime state: `00_System/Runtime State/brain-state.json`.
- Short rolling context: `00_System/Runtime State/HOT.md`.
- Open system gaps: `00_System/Runtime State/GAP_REGISTER.md`.
- Append-only system history: `00_System/Runtime State/OPERATION_LOG.md`.
- Machine-readable road signs: `00_System/Navigation OS/route-registry.json`.
- Production hardening control plane: `00_System/Production Readiness OS/`.
- Project truth: each resolved canonical project packet under `40_Projects/`.
- Real software truth: the actual repository, migrations, tests, runtime evidence, and production state. The brain supports repo work; it never replaces repo inspection.


## Claude Code native front door
When Claude Code opens at the vault root, `CLAUDE.md` is the first native contract. The runtime then adds current state and prompt-specific routing through `.claude/` hooks.

Native sequence:
```text
CLAUDE.md
  -> SessionStart live snapshot
  -> UserPromptSubmit route/project/search packet
  -> scoped rules + lazy skill
  -> execute under Brain authority
  -> tool guards
  -> validator-backed stop gate for control-plane edits
```

Read [[00_System/Claude Code OS/Claude Code Native Runtime]]. Claude Code auto memory is disabled in this vault; durable learning stays in governed Memory OS.

## Persistent Agentic Batch Execution
When a project has an active `Agent Loop`, use [[00_System/Agentic Execution OS/Agentic Execution Operating System]] before ordinary queue execution. The active batch capsule becomes the smallest authoritative working packet.

Native path:
```text
resolved project
  -> Agent Loop/RUNTIME_STATE.json
  -> Runtime/CURRENT_CONTEXT.md
  -> execute current batch
  -> machine verifier
  -> evidence + handoff
  -> fresh context for next batch
  -> final goal gate
```

The Brain persists exact state, repo/file intelligence, edit events, failures, reports, and handoffs so later contexts do not rediscover the whole project.

## Universal startup protocol
1. Read this file.
2. Read `brain-state.json`.
3. Read `HOT.md`.
4. Read OPEN P0/P1 gaps from `GAP_REGISTER.md`.
5. Classify the task route using `00_System/Navigation OS/route-registry.json`.
6. Read the matched entrypoint and follow conditional next signs.
7. Load only the route-specific minimum context.
8. Execute under the Constitution, truth hierarchy, and applicable project/quality contracts.
9. After meaningful work, write back state, evidence, learning proposals, and operation history.

## Route-specific reading order

### Project or software work
1. [[00_System/Project OS/Universal Project Contract]]
2. [[00_System/AI Runtime/Project Resolver Protocol]]
3. resolved project canonical note
4. project `01_CONTEXT.md`
5. `09_CURRENT_STATE.md`
6. `10_EXECUTION_QUEUE.md`
7. applicable architecture profile and decisions
8. inspect the real repo through [[00_System/AI Runtime/Repo Inspection Protocol]]

**Rule:** never infer repository truth from notes when the repository can be inspected.


### Production readiness / hardening
1. [[00_System/Production Readiness OS/Production Readiness Operating System]]
2. resolve project + inspect exact repo revision
3. [[00_System/Production Readiness OS/Universal Production Hardening Matrix]]
4. project `16_PRODUCTION_READINESS.md`
5. project `17_PRODUCTION_HARDENING_QUEUE.md`
6. independent [[00_System/Agent OS/Critic Verifier Agent Contract]]
7. [[00_System/Quality System/Release Gate]]

**Rule:** feature completeness and a passing build are never sufficient production proof.

### Business or client work
1. [[30_Business/Business HQ]]
2. relevant organization/product/client canonical note
3. relevant project links
4. relevant skills, playbooks, decisions, and evidence

**OVX rule:** if the work concerns OVX, the OVX software house, or an OVX-aligned project, read [[30_Business/Organizations/OVX Smart Connected AI]] and [[00_System/Project OS/OVX Smart Connected AI Project Standard]] before architecture or strategy decisions.

### Research or source-heavy work
1. [[00_System/Knowledge Graph/Source-Backed Knowledge Protocol]]
2. [[60_Knowledge/Knowledge HQ]]
3. relevant source records
4. linked concepts/entities/analyses
5. primary evidence before strong factual claims

### Personal or life work
1. [[10_Life/Life HQ]]
2. relevant goal/routine/area
3. active reviews and recent episodes when needed

### Skill or learning work
1. [[50_Skills/Skills HQ]]
2. relevant skill note
3. [[00_System/Learning System/Lesson and Pattern Promotion Ladder]]
4. evidence from real practice before promotion

### Brain/system work
1. [[00_System/Brain Constitution]]
2. [[00_System/System Manifest]]
3. [[00_System/Governance/System Change Control]]
4. current state + gaps + operation log
5. run validation after changes

## Memory write rule
- Worker agents propose.
- Durable semantic/procedural writes go through the Memory Curator flow.
- Read the target before editing it.
- Prefer additive changes.
- Never erase conflicting evidence silently.

## Completion rule
A task is not complete because text or code was produced. Completion requires the applicable evidence, verification, state update, and a valid exit condition.

## AI Road Signs

**You are here:** mandatory entry intersection for all AI work.

| When the destination is... | Go to... |
|---|---|
| Claude Code native operation | [[00_System/Claude Code OS/Claude Code Native Runtime]] |
| choose exact route | [[00_System/Navigation OS/Road Sign Navigation System]] |
| run/continue a multi-batch final-goal plan | [[00_System/Agentic Execution OS/Agentic Execution Operating System]] |
| continue/finish project | [[00_System/AI Runtime/Project Agent Master Prompt]] |
| make project production-ready | [[00_System/Production Readiness OS/Production Readiness Operating System]] |
| source-heavy research | [[00_System/Knowledge Graph/Source-Backed Knowledge Protocol]] |
| durable memory change | [[00_System/Memory OS/Memory OS]] |
| brain system change | [[00_System/Governance/System Change Control]] |

**Do not stay here when:** the route is resolved.  
**Arrival proof:** route ID + resolved canonical target + explicit destination proof.

## Skill road

For learning or reusable capability work: [[50_Skills/Skills HQ]] → [[00_System/Skill OS/Skill Marketplace Operating System]] → `skill-registry.json` → selected skill. Load the smallest relevant skill set.

## Skill capability runtime

- Select: `00_System/Automation/skill-route.mjs`
- Compose: [[00_System/Skill OS/Skill Composition and Handoff Protocol]]
- Graph: `00_System/Skill OS/skill-graph.json`
- Project stack: `00_System/Automation/skill-stack.mjs`
- Develop missing capability: [[00_System/Skill OS/Skill Development Lifecycle]]


## Connected experience control
Before durable writes or real-project learning, use:
- [[Connected Intelligence Operating System]]
- [[Universal Ingestion Gateway]]
- [[Brain Transaction Protocol]]
- [[Query Planning Protocol]]

Reality rule: imported project context helps navigation but never substitutes for repository/runtime evidence.

## Project Council control plane
When an active project has `20_Agent_Council/`, use it as the local specialist-agent operating surface after resolving the project and before broad standards.

Council route:
```text
resolved project
  -> current project packet
  -> 20_Agent_Council/00_COUNCIL_HOME.md
  -> selected specialist folders
  -> real repository/runtime inspection
  -> evidence-backed update
```

See [[00_System/Project Council OS/Project Council Operating System]].

## Living Project Council v14
For active project specialist work, route through `Project Council OS/Living Agent Learning OS.md`.

The first specialist read is now the role's `NEXT_START.md`, followed by its owned cognitive stack. Meaningful failures enter the Failure Immunity Loop. Every active role leaves an exact restart pointer before stopping.
