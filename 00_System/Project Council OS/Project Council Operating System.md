---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [project-council, agents, project-work, specialist-agents, current-truth]
ai_access: allowed
version: 1.0
---
# Project Council Operating System

## Purpose
The Project Council turns Omar Brain from a passive project notebook into an active project team. A resolved project may contain a local council where specialist agents keep current rules, current findings, evidence requirements, and next actions in one governed place.

The council is not a chat room and not a history archive. It is the living operating surface for project work.

## Core idea
```text
Project
  -> Project Council
      -> specialist agents
          -> inspect their own surface
          -> record current truth
          -> propose fixes
          -> provide evidence requirements
      -> Toolsmith implements integrated changes
      -> Critic verifies independently
      -> Observer updates current project truth
      -> Memory Curator promotes reusable learning only after review
```

## Default council
```text
Control plane:
- Supervisor
- Project Observer
- Toolsmith
- Critic Verifier
- Memory Curator

Specialists:
- Architecture Agent
- Data & Truth Agent
- Integration & Workflow Agent
- Logic & Performance Agent
- Product & UX Agent
- Runtime & Reliability Agent
- Quality Engineer Agent
```

## Activation law
Use the fewest agents necessary.

An agent is activated only when its ownership surface is materially touched. Do not activate every agent for every change.

## Local project authority
When a project has `20_Agent_Council/`, agents read it after the canonical project packet and before broad global standards.

Required read order for project work:
```text
1. 00_PROJECT_HOME.md or canonical project note
2. 01_CONTEXT.md
3. 07_CURRENT_STATE.md or 09_CURRENT_STATE.md
4. 08_EXECUTION_QUEUE.md or 10_EXECUTION_QUEUE.md
5. 20_Agent_Council/00_COUNCIL_HOME.md
6. selected specialist AGENT_HOME.md files
7. real repository state
8. applicable global standards
```

Repository/runtime truth still beats notes for live software claims.

## Council responsibilities
- Keep agent-specific work surfaces organized.
- Make handoffs compact and evidence-backed.
- Prevent rediscovery by maintaining current repo/project maps.
- Separate current truth from old run history.
- Prevent one agent from silently writing global lessons.
- Make repeated project work faster and stricter over time.

## What belongs in project council
```text
current rules
current findings
current risks
open decisions
agent-specific checklists
required evidence
accepted project-specific overrides
active work board
latest handoff
rule promotion candidates
```

## What does not belong in current council files
```text
long chronological logs
conversation transcripts
old obsolete findings
unverified memories
personal opinions without evidence
copy-pasted whole repo contents
random future ideas not tied to current work
```

Old execution facts belong in `Runs/` or evidence files. Current control files should stay small enough for agents to load.

## Completion rule
A council run is complete only when:
1. selected agents produced findings or explicit no-finding verdicts,
2. Toolsmith completed the approved integrated changes when implementation was requested,
3. Quality Engineer defined or updated proof requirements,
4. Critic attempted to falsify the completion claim,
5. Project Observer updated current truth and open work,
6. reusable learning was proposed, not blindly promoted.

## v14 — Living Agent Learning hardening
Project Council now adds deterministic entry, per-role cognitive stacks, freshness checks, failure immunity, exact restart pointers, project-local learned rules and eval registries.

Authoritative companion docs:
- `Living Agent Learning OS.md`
- `Deterministic Agent Entry Protocol.md`
- `Failure Immunity Loop.md`
- `Agent Cognitive Stack Standard.md`
- `Knowledge Freshness and Restart Standard.md`
- `Cross-Agent Ownership and Conflict Standard.md`
