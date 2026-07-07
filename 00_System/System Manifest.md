---
type: system
status: active
created: 2026-07-07
topics: [manifest, system, architecture]
ai_access: allowed
version: 8.0
---
# System Manifest

## Top-level architecture

```text
00_System     governance, Project OS, AI Runtime, learning, standards, automation
01_Inbox      unprocessed or ambiguous capture queue
10_Life       ongoing personal systems, vision, goals, routines
15_Ideas      durable ideas and incubation before project commitment
20_Career     professional identity, roles, opportunities, portfolio
30_Business   organizations, products, clients, strategy, operations
40_Projects   finite outcomes with a universal project contract
50_Skills     capabilities being deliberately improved
60_Knowledge  reusable understanding, patterns, failures, standards, playbooks
70_People     respectful person/relationship context
80_Reviews    daily-to-yearly reflection and system maintenance
85_Episodes   append-only cross-project episodic memory
90_Archive    inactive material mirrored by category
99_Assets     non-note files and raw imports
```

## System layers

```text
Brain Constitution
       ↓
Governance and truth rules
       ↓
Project OS
       ↓
AI Runtime
       ↓
Architecture + Quality standards
       ↓
Project-specific contract and ADR overrides
       ↓
Tasks, code, tests, evidence, runs
       ↓
Learning extraction
       ↓
Validated lessons → patterns → standards
```

## Core separation
- **domains**: life, career, business,
- **ideas**: possibilities not yet committed as projects,
- **projects**: finite outcomes,
- **skills**: capabilities,
- **knowledge**: reusable understanding,
- **entities**: organizations, products, clients, people,
- **time**: reviews and dated events,
- **execution evidence**: runs, tests, failures, verification.

Relationships are expressed through links and metadata rather than copied content.


## v6 dynamic layers
```text
Navigation OS   road-sign route registry, intersections, destination proof
Startup/State   operating map, bounded HOT cache, global state/gaps/log
Memory OS      semantic / episodic / procedural contracts
Retrieval OS   hybrid retrieval, chunking, reranking, freshness, evals
Agent OS       supervisor + minimal specialists + single durable writer
Dynamic Brain event/control loop, capability loading, model routing
Evaluation OS retrieval/agent/memory regression gates
Production OS audit → classify → harden → re-verify → critic → release
```

## Canonical vs derived
```text
Obsidian Markdown = canonical human-readable truth
Runtime indexes   = derived and disposable
Vector embeddings = derived and migratable
Entity graph      = derived and rebuildable
Trace store       = operational evidence linked by ID
```

Runtime Integration connects the canonical vault to durable orchestration, MCP-compatible tools, retrieval backends, sandboxes, and trace/eval stores without making any one framework the source of truth.


## Startup control plane
```text
Operating Map
    ↓
brain-state.json
    ↓
HOT context
    ↓
OPEN P0/P1 gaps
    ↓
route-registry.json
    ↓
route entrypoint + next signs
    ↓
route-specific minimum context
    ↓
execute / verify / write back
```

The startup control plane prevents full-vault context dumping and makes resume behavior explicit.

## Source-backed graph rule
Source-heavy work uses the existing canonical taxonomy under `60_Knowledge`, `30_Business`, `40_Projects`, and `70_People`; it does not create a duplicate parallel wiki. See [[00_System/Knowledge Graph/Source-Backed Knowledge Protocol]].


## v8 capability graph layer

```text
Route
  ↓
Primary skill
  ↓
Skill graph handoff / lazy bundle / stack evidence
  ↓
0-2 support skills
  ↓
Execute + quality gates
  ↓
Evidence ledger
  ↓
Maturity review / candidate gap / distillation
```

Canonical capability files:
- `00_System/Skill OS/skill-registry.json`
- `00_System/Skill OS/skill-graph.json`
- `00_System/Skill OS/skill-bundles.json`
- `00_System/Skill OS/skill-candidates.json`
- `00_System/Skill OS/skill-evidence.jsonl`

The active marketplace contains 61 skills. Candidates do not become active merely because a file was created.
