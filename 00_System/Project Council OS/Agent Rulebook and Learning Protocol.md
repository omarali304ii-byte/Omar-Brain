---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [agent-rules, learning, promotion, project-council, immunity]
ai_access: allowed
version: 2.0
---
# Agent Rulebook and Learning Protocol

## Rule layers
```text
Global Brain rules
  -> specialist global contract
  -> project council rules
  -> agent local RULES.md
  -> agent LEARNED_RULES.md
  -> accepted ADR/project override
  -> repo/runtime evidence
```

## Durable rule format
```yaml
id:
title:
status: active | candidate | superseded | project-local | rejected
scope:
trigger:
rule:
rationale:
allowed_mechanisms:
boundary:
evidence_required:
examples:
anti_examples:
source:
last_reviewed:
last_proven_revision:
```

## Trigger requirement
A learned rule without a concrete trigger is advice, not executable cognition.

Bad:
```text
Be careful with concurrency.
```

Good:
```yaml
trigger:
  all:
    - read-modify-write shared state
    - multiple workers can target same logical entity
rule:
  require explicit lost-update protection
```

## Project-local learning
A project-local rule may become active after:
1. observed problem or high-confidence near miss,
2. root-cause analysis,
3. evidence-backed repair or bounded rationale,
4. applicability boundary,
5. regression/eval registration when testable.

## Global promotion
Global rule still requires:
1. real-project evidence,
2. clear applicability boundary,
3. conflict/generalization check,
4. Critic review,
5. Memory Curator promotion.

## Learning candidate format
```yaml
candidate_id:
origin_project:
origin_agent:
observation:
root_cause_pattern:
why_it_matters:
possible_rule:
trigger:
applicability_boundary:
known_counterexamples:
evidence:
regression_eval_ids:
confidence: low | medium | high
status: proposed | needs-more-evidence | approved | rejected | promoted
```

## Poisoning protection
Agents may not silently update global standards because one project felt successful.

## Recurrence hardening
For each meaningful failure, ask:
```text
What detector would have caught this earlier?
What rule should fire next time?
What regression proves the repair?
What future change should activate this agent?
```

## Growth goal
Agents become sharper, not merely larger:
- better triggers,
- better surface maps,
- better root-cause patterns,
- better evals,
- fewer repeated searches,
- stronger restart pointers.
