---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [memory, semantic-memory, episodic-memory, procedural-memory, ai-runtime]
ai_access: allowed
version: 4.0
---
# Memory OS

## Mission
Make the Brain improve over time without turning it into an untrusted pile of AI text.

## Core model
The Brain uses three durable memory classes:

```text
Semantic memory   = what is believed to be true
Episodic memory   = what happened during real work
Procedural memory = how the system should behave repeatedly
```

The classes are deliberately separated because they have different write rules, retention rules, confidence rules, and retrieval priority.

## Canonical placement

### Semantic memory
Semantic memory does **not** get a new duplicate folder. It lives in the canonical object that already owns the truth:
- project truth in `40_Projects/`,
- capabilities in `50_Skills/`,
- reusable knowledge in `60_Knowledge/`,
- organizations/products/clients in `30_Business/`,
- people in `70_People/`,
- life/career facts in their canonical domains.

Use `memory_class: semantic` when a note is explicitly part of durable memory.

### Episodic memory
- global episodes: `85_Episodes/`, append-only,
- project execution: project `80_Runs/`, append-only,
- detailed machine traces may live outside Obsidian; the vault stores the human-readable episode summary and evidence pointers.

### Procedural memory
Procedural memory lives under governed system areas:
- `00_System/AI Runtime/`,
- `00_System/Agent OS/`,
- `00_System/Project OS/`,
- `00_System/Architecture Standards/`,
- `00_System/Web Development Expert System/`,
- approved playbooks/standards in `60_Knowledge/`.

Use `memory_class: procedural` and a version when behavior changes.

## Non-negotiable invariants
1. **Single writer for durable memory.** Agents may propose; the Memory Curator commits.
2. **Episodes are append-only.** Corrections append or supersede; they do not erase history.
3. **Every durable assertion has provenance.** Source, episode, evidence, or verified repository/runtime fact.
4. **Search before create.** Canonical notes are updated rather than duplicated.
5. **Inference is labeled.** AI guesses never silently become facts.
6. **Procedures are versioned.** A behavior change is a controlled system change.
7. **Memory is reversible.** Every promotion can be traced and superseded.
8. **Sensitive memory stays local by default.** `ai_access` gates indexing and external model context.

## Write path

```text
Observation / run / user correction
              ↓
        Episodic record
              ↓
      Memory proposal queue
              ↓
 Provenance + contradiction checks
              ↓
       Critic verification
              ↓
     Memory Curator decision
       ┌──────┼───────┐
       ▼      ▼       ▼
 semantic  procedural reject/episode-only
       │      │
       └──┬───┘
          ▼
 canonical commit
          ↓
 re-index changed content only
          ↓
 evaluation + later revalidation
```

## Read priority
For personal/project questions:
1. canonical current truth,
2. applicable procedural rules,
3. recent verified episodes,
4. broader knowledge,
5. raw inbox only as last resort and clearly labeled.

## Related
- [[Semantic Memory Standard]]
- [[Episodic Memory Standard]]
- [[Procedural Memory Standard]]
- [[Memory Promotion Pipeline]]
- [[Memory Single-Writer and Conflict Protocol]]
- [[Memory Revalidation Decay and Retention]]
