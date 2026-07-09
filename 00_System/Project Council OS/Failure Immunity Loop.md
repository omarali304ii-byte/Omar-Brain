---
type: system
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [learning, failures, regression, immunity]
ai_access: allowed
version: 2.0
---
# Failure Immunity Loop

## Purpose
A solved problem that does not change future behavior is wasted experience.

## Loop
```text
problem / near miss / review catch
  -> reproduce or bound
  -> root cause
  -> classify failure signature
  -> repair
  -> adversarial proof
  -> update current project model
  -> add or change triggered rule
  -> add checklist detector
  -> add regression/eval entry
  -> add future activation trigger
  -> critic challenge
  -> local immunity active
  -> candidate for global promotion if general
```

## Required failure record
```yaml
pattern_id:
title:
status: active | contained | superseded
origin_finding:
signature:
preconditions:
root_cause:
why_existing_checks_missed_it:
local_fix:
detection_trigger:
prevention_rule_ids:
regression_eval_ids:
known_counterexamples:
last_reproduced_revision:
last_proven_revision:
```

## Triggered rule requirement
A learned rule is invalid if it only says "be careful".

Valid rule:
```yaml
id: LOGIC-CONC-004
trigger:
  all:
    - read-modify-write shared state
    - multiple workers can target same logical entity
rule:
  require explicit lost-update protection
allowed_mechanisms:
  - optimistic version check
  - row lock
  - atomic database operation
  - serialized owner
  - merge-safe event model
required_proof:
  - overlapping concurrent writers
  - assert zero lost deltas
boundary:
  does not apply to immutable append-only writes
```

## Immunity levels
```text
I0 remembered prose only                 weak
I1 failure pattern documented            better
I2 triggered rule added                  good
I3 checklist detector added              stronger
I4 automated regression/eval attached    strong
I5 runtime detection/alert attached       strongest practical level
```

Do not claim "never happens again". Claim the actual immunity level and evidence.

## Promotion law
Project-local immunity may become immediate local truth after evidence.
Global Brain promotion still requires applicability boundary, conflict check, Critic review and Memory Curator decision.
