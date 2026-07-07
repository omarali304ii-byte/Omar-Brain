---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [navigation, routing, graph, road-signs]
ai_access: allowed
version: 1.0
---
# Road Sign Navigation System

Omar Brain must behave like a road network with visible signs, not a warehouse of files.

## Goal

At every meaningful intersection, an AI should know:

```text
YOU ARE HERE
    ↓
WHAT DESTINATION IS REQUESTED?
    ↓
WHICH ROAD APPLIES?
    ↓
WHAT MUST BE READ NEXT?
    ↓
WHAT EVIDENCE PROVES ARRIVAL?
```

The system is intentionally layered:

1. **Entry sign** — [[00_System/Operating Map]].
2. **Route registry** — `00_System/Navigation OS/route-registry.json`.
3. **Area signs** — HQ notes such as [[40_Projects/Projects HQ]] and [[60_Knowledge/Knowledge HQ]].
4. **Project signs** — project truth map and packet files.
5. **Destination contract** — explicit exit condition for the route.
6. **Fallback sign** — when unresolved, return to the nearest canonical hub or Inbox; never invent a road.

## Mandatory navigation algorithm

1. Identify the user's destination, not merely keywords.
2. Resolve named entities/projects/repositories.
3. Read the current intersection sign.
4. Choose one primary route from `route-registry.json`.
5. Load only `read_first`.
6. Follow `next_signs` when their condition becomes true.
7. Stop only when the route's `arrival_proof` exists.
8. If a route changes, record the transition rather than silently drifting.

## Road-sign rule

Every high-value hub or packet must answer:

- **You are here:** what this node owns.
- **Go here when:** conditions that require another node.
- **Do not stay here when:** boundary conditions.
- **Destination proof:** what proves the user reached the requested outcome.

## Anti-patterns

- loading the entire vault "just in case",
- staying inside Business when the task became a finite Project,
- staying inside Project notes when live repo truth is required,
- staying inside a Source when reusable concepts/entities should be extracted,
- staying inside implementation after the user requested production readiness,
- declaring arrival because a document or code file exists.

## Required machine check

Run:

```powershell
node .\00_System\Automation\check-navigation-connectivity.mjs .
```

This verifies that routes, entrypoints, destinations, and major hub signs resolve.
