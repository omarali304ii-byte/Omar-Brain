---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [project-council, loop, dynamic-agents, execution, living-agents]
ai_access: allowed
version: 2.0
---
# Dynamic Project Agent Loop

## Loop summary
```text
Resolve Project
  -> Build Deterministic Start Brief
  -> Load Current Council State
  -> Read Exact NEXT_START
  -> Verify Repo/Runtime Freshness
  -> Select Fewest Relevant Agents
  -> Each Agent Runs Owned Cognition Loop
  -> Supervisor Merges Findings
  -> Build Dependency-Aware Work Graph
  -> Toolsmith Implements Smallest Safe Batch
  -> Quality Engineer Defines/Updates Proof
  -> Critic Falsifies Completion
  -> Specialists Reconcile Their Current Models
  -> Project Observer Reconciles Cross-Project Truth
  -> Failure Immunity Loop for Every Meaningful Problem
  -> Memory Curator Reviews Global Candidates
  -> Write Exact NEXT_START
  -> Continue or Stop with Evidence
```

## Step 0 — Deterministic entry
Use `Deterministic Agent Entry Protocol.md`.

When possible run:
```bash
node "00_System/Project Council OS/runtime/build-agent-start-brief.mjs" \
  "40_Projects/Active/<Project>" "<Agent Name>"
```

The brief is navigation only; authoritative files remain on disk.

## Step 1 — Resolve project
Required output:
```yaml
project_id:
project_path:
repo_path_or_url:
current_branch:
current_revision:
scope:
```

## Step 2 — Load control plane
Read:
```text
20_Agent_Council/00_COUNCIL_HOME.md
20_Agent_Council/07_ACTIVE_WORK_BOARD.md
20_Agent_Council/09_AGENT_FINDINGS_INDEX.md
20_Agent_Council/Runtime/COUNCIL_STATE.json
20_Agent_Council/Runtime/LOOP_STATE.json
```

## Step 3 — Select agents
Activation is based on touched surfaces and known failure triggers, not ego.

Examples:
```text
schema change              -> Data & Truth + Architecture + Quality
webhook/provider change    -> Integration + Data & Truth + Runtime + Quality
UI screen change           -> Product & UX (+ Architecture if state boundary changes)
slow query/heavy loop      -> Logic & Performance + Data & Truth
shared state mutation      -> Logic & Performance + Data & Truth + Quality
deployment/server work     -> Runtime & Reliability + Quality
completion claim           -> Critic Verifier + Project Observer
learning promotion         -> Memory Curator
```

## Step 4 — Agent owned cognition loop
Each selected agent:
```text
read NEXT_START
  -> load owned cognitive stack
  -> verify revision/freshness
  -> inspect exact owned reality
  -> update DOMAIN_MODEL / SURFACE_MAP if drifted
  -> evaluate active findings + learned triggers
  -> work or propose change
  -> update CURRENT_FINDINGS / ACTIVE_WORK
  -> if problem: run Failure Immunity Loop
  -> update EVAL_REGISTRY
  -> self-review
  -> write NEXT_START
```

## Step 5 — Finding format
```yaml
id:
severity: P0 | P1 | P2 | P3
status: open | blocked | fixed-pending-proof | accepted-risk | closed
claim:
evidence:
risk:
required_change:
required_proof:
owner_agent:
last_verified_revision:
```

## Step 6 — Work graph
Supervisor converts findings into dependency-aware batches.
Specialists do not all edit application code. Toolsmith is default integrated implementer.

## Step 7 — Proof
Quality Engineer owns proof design. Critic independently challenges completion.

## Step 8 — Reconcile current truth
Update only affected current files. Do not append history sludge.

Project Observer reconciles:
```text
05_CURRENT_PROJECT_TRUTH.md
07_ACTIVE_WORK_BOARD.md
09_AGENT_FINDINGS_INDEX.md
Runtime state
```

Selected specialists reconcile their own cognitive stacks.

## Step 9 — Failure immunity
Every meaningful failure, incident, near miss or review catch must be assessed for:
```text
failure pattern
triggered rule
checklist detector
regression/eval
runtime detector if applicable
```

## Step 10 — Exact restart
No run ends without a valid `NEXT_START.md` for every active agent.

## Stop conditions
Valid stop:
- objective proven,
- real blocker recorded,
- explicit scope boundary reached.

Invalid stop:
- context is messy,
- first attempt failed,
- agent no longer remembers where it was.
