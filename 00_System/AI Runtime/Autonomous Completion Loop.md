---
type: system
status: active
created: 2026-07-07
topics: [ai, execution, completion-loop]
ai_access: allowed
---
# Autonomous Completion Loop

The purpose is to prevent premature “done” answers.

```text
Resolve project
   ↓
Boot project context
   ↓
Inspect real repo/state
   ↓
Build dependency-aware batch
   ↓
Implement smallest coherent increment
   ↓
Run verification
   ├── PASS → integrate evidence
   └── FAIL → diagnose root cause
                  ↓
            search memory + repo
                  ↓
              repair/retry
                  └───────────────┐
                                  ↓
Checkpoint persistent run state
   ↓
Update current state + queue + run record
   ↓
Extract reusable learning
   ↓
Are all acceptance criteria and applicable Done gates proven?
   ├── NO → select next ready work and continue
   └── YES → completion evidence + close task/project
```

## Anti-stopping rules
An agent must not stop merely because:
- code compiled once,
- one test passed,
- a file was created,
- a prompt was written,
- a partial screen exists,
- a likely fix was suggested,
- context became inconvenient,
- the first attempt failed.

Use [[00_System/AI Runtime/Stop Conditions and Blocker Policy]] for valid exits.


## Production hardening sub-loop

For `route-project-production`, ordinary completion is only the entry condition:

```text
Feature complete
   ↓
Baseline production audit
   ↓
P0/P1 blockers?
   ├── YES → hardening queue → fix batch → original proof → regressions ─┐
   │                                                                    │
   └────────────────────────────────────────────────────────────────────┘
   ↓
All required matrix gates evidenced
   ↓
Candidate ready
   ↓
Independent Critic
   ├── REJECT → hardening loop
   └── APPROVE
          ↓
Release gate
          ↓
Production status transition
```

A build pass cannot skip this sub-loop.
