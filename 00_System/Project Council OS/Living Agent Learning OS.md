---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [project-council, living-agents, learning, restartability, cognition]
ai_access: allowed
version: 2.0
---
# Living Agent Learning OS

## Purpose
Turn project specialists from temporary prompts into persistent, evidence-governed teammates.

A living project agent must be able to enter a project and answer, with minimal rediscovery:
- what is true now,
- what surface it owns,
- what changed on that surface,
- what remains open,
- what failed before,
- what rules were learned,
- what proof prevents recurrence,
- where to resume next.

## Core law
Conversation memory is never the project brain. The project council is the durable brain.

```text
fresh agent context
  -> deterministic entry
  -> load owned project cognition
  -> compare with repo/runtime reality
  -> work only owned view
  -> document present truth
  -> convert failures into immunity
  -> leave exact restart point
  -> next context resumes without archaeology
```

## Two memory layers
### Layer A — governed project cognition
Authoritative for project work:
```text
20_Agent_Council/
```
This stores current truth, owned maps, findings, learned rules, failure patterns, evals, unknowns and restart pointers.

### Layer B — Claude subagent memory
Optional acceleration layer:
```text
.claude/agent-memory/<agent-name>/
```
Useful for concise recurring navigation insights. It must never override project council truth, accepted decisions, repository state or evidence.

## Agent cognitive stack
Every specialist maintains:
```text
00_START_HERE.md          deterministic entry contract
AGENT_HOME.md             role, scope, non-goals
DOMAIN_MODEL.md           current model of its project surface
OWNED_SURFACE_MAP.md      files/modules/routes/tables/jobs/runtime it owns
CHANGE_IMPACT_MAP.md      what changes activate it and who else is affected
RULES.md                  current project rules
LEARNED_RULES.md          evidence-derived local rules with triggers
CHECKLIST.md              operational checks
FAILURE_PATTERNS.md       recurring signatures and root-cause models
EVAL_REGISTRY.md          regression/eval immunity attached to lessons
CURRENT_FINDINGS.md       current open/fixed-pending-proof findings only
ACTIVE_WORK.md            current task state on this surface
OPEN_UNKNOWNS.md          uncertainty that must not be guessed away
EVIDENCE_REQUIREMENTS.md  closure proof
DECISIONS_TO_REVIEW.md    unresolved decisions
SELF_REVIEW.md            agent self-audit and knowledge gaps
NEXT_START.md             exact restart pointer
HANDOFF.md                compact cross-agent transfer
```

## The intelligence rule
More files do not mean more intelligence. The system is intelligent only when:
1. startup is deterministic,
2. stale claims are detected,
3. failures change future checks,
4. rules contain triggers and boundaries,
5. proof is attached to closure,
6. the next agent has an exact restart point.

## Current-truth rule
Primary files describe the present. History belongs in `Runs/` and `Evidence/`.

Bad:
```text
On Tuesday we tried X, then Wednesday Y, then Thursday Z...
```

Good:
```text
Current mechanism: Z
Open risk: R
Evidence: E-17
Superseded mechanism: linked in run R-09
```

## Agent write boundary
Specialists may update their own council cognition. They do not casually implement application changes.

```text
specialist -> inspect, model, document, propose, learn
Supervisor -> merge and prioritize
Toolsmith -> integrated implementation
Quality Engineer -> proof design
Critic -> independent challenge
Observer -> cross-project current truth
Memory Curator -> global promotion
```

## Exit contract
A specialist may stop only after it has either:
- completed the owned task with proof, or
- recorded a real blocker/unknown,

and has updated `NEXT_START.md` with the exact next action and entry evidence.
