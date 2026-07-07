---
type: system
status: active
created: 2026-07-07
topics: [brain, governance, execution, learning]
ai_access: allowed
version: 6.0
---
# Brain Constitution

This is the highest-level law of Omar Brain. Humans and AI agents follow it before lower-level prompts, templates, project instructions, or convenience.

## Article 1 — One canonical home
Every durable object has one primary note and one primary path. Other places link to it; they do not copy it.

## Article 2 — Folder means what the object is
Metadata and links describe what the object is about. A PostgreSQL item may relate to OVX, career, and a client, but its primary home depends on purpose: skill, project, reusable knowledge, or solved problem.

## Article 3 — Inbox is the only legal uncertainty zone
Unclassified or ambiguous input goes to `01_Inbox`. Permanent folders must not become dumping grounds.

## Article 4 — Search before create
Before creating durable memory, search:
1. exact title,
2. aliases and acronyms,
3. exact identifiers, paths, IDs, function names, and error strings,
4. semantic near-duplicates,
5. related entities and backlinks.

Creation is never the default merely because wording differs.

## Article 5 — Projects are resolved before execution
When a task names or implies a personal project, the agent must resolve the canonical project before acting. It must use project title, aliases, `project_id`, repository URL, local path, company/product links, and semantic search. The agent must not guess which project is meant when the brain can resolve it.

## Article 6 — No project work before boot
An AI agent may not begin implementation in a project until it completes the [[00_System/AI Runtime/Project Agent Boot Protocol|Project Agent Boot Protocol]]. It must load the project contract, current state, requirements, architecture, execution queue, relevant decisions, and inspect the real repository when available.

## Article 7 — Current truth is separate from history
Canonical project/entity notes describe current truth. Dated runs, meetings, decisions, experiments, failures, and logs remain separate records. Never turn a project overview into an endless diary.

## Article 8 — Truth has an explicit hierarchy
Requirements, architecture intent, repository code, migrations, tests, runtime evidence, external official sources, and AI summaries are not equal. Resolve conflicts through [[00_System/Governance/Truth Hierarchy and Conflict Policy]].

## Article 9 — Completion requires evidence
An agent may not claim `done`, `fixed`, `working`, `ready`, `secure`, or `complete` merely because code was written. Completion requires acceptance criteria plus the applicable quality gates and evidence defined by [[00_System/Project OS/Definition of Done]].

## Article 10 — Continue until an objective exit condition
For an execution task, the agent follows the autonomous completion loop: inspect → plan → implement → test → diagnose → repair → verify → document → continue. It stops only at a valid exit condition from [[00_System/AI Runtime/Stop Conditions and Blocker Policy]].

## Article 11 — Failures are memory assets
Every meaningful failure must produce, at minimum, a searchable signature and root-cause result when known. Reusable failures escape projects into `60_Knowledge/Failure Signatures` or `60_Knowledge/Problems and Solutions`.

## Article 12 — Intelligence improves through promotion, not accumulation
Raw AI notes are not intelligence. Observations become candidate lessons; verified lessons may become patterns; repeated successful patterns may become standards. Promotion requires evidence under [[00_System/Learning System/Lesson and Pattern Promotion Ladder]].

## Article 13 — AI may learn; AI may not rewrite its own laws silently
Agents may create learning candidates and change proposals. They may not silently modify this Constitution, controlled vocabulary, global standards, architecture profiles, trust policy, or security policy. Global change requires explicit change control.

## Article 14 — Universal project control, profile-specific implementation
Every project uses the same project control model: identity, outcome, done definition, requirements, current state, execution queue, decisions, evidence, runs, learning extraction, and closeout. Project classes may add profile-specific documents.

## Article 15 — Software architecture has a default baseline
Unless an approved ADR overrides it, software projects follow the global flow:

```text
UI
  ↓
action / controller / route
  ↓
service / use case
  ↓
permission / policy
  ↓
transaction boundary
  ↓
repository / gateway
  ↓
database or external system
  ↓
business event / audit / observability
  ↓
response
```

UI must not write directly to the database. Services are the business brain. Repositories handle persistence, not business decisions.

## Article 16 — Data architecture is designed before page-by-page backend growth
For connected systems, define schema, source of truth, tenancy/isolation, migrations, data flow, transaction boundaries, report sources, audit/event behavior, and failure handling before building disconnected page backends.

## Article 17 — Important business actions create durable evidence
Important business actions require the appropriate business event, audit record, ledger movement, or equivalent durable evidence. A feature is not complete when its important state changes are invisible.

## Article 18 — Idempotency, concurrency, and transactions are explicit
Any operation that can be retried, duplicated, race, or partially fail must explicitly document idempotency, concurrency, and transaction behavior.

## Article 19 — No secret or permission shortcuts
Secrets remain server-side. Authorization is enforced at the business boundary, not merely hidden in UI. Multi-tenant systems must prove tenant isolation. External platform integrations must use approved official flows for the project.

## Article 20 — No fake truth
Mock or demo data must be clearly isolated from production paths. Never present fabricated connected state, fake conversations, fake completion, fake test success, or guessed external facts as real.

## Article 21 — Modules stay bounded
Each feature has a clear module boundary. Shared UI and shared domain primitives are reused. Files over 600 lines trigger architectural review. Files over 1,000 lines are prohibited except generated/vendor artifacts, migrations, fixtures, or an explicit documented waiver.

## Article 22 — Reusable knowledge escapes projects
Project-specific working material stays with the project. Reusable lessons, concepts, patterns, playbooks, standards, and solved problems are extracted to `60_Knowledge` and linked to evidence.

## Article 23 — Evidence beats confident prose
Facts preserve source and confidence when relevant. AI-generated text is not automatically truth. Exact technical identifiers must remain exact.

## Article 24 — Contradictions are visible
Do not silently overwrite conflicting memory. Record contradiction, determine authority and freshness, supersede explicitly, and preserve history.

## Article 25 — Active things reveal next state
Active projects need a next action and current phase. Active skills need a next practice. Open goals need a next review. Ideas need a next validation step. Inbox items need a route or deletion decision.

## Article 26 — Portfolio WIP is controlled
Not every interesting project may remain “active.” Stale or unfocused projects are paused, waiting, incubated, completed, or archived. Active views must reflect real attention.

## Article 27 — Sensitive content obeys access policy
Every sensitive note uses `ai_access: restricted` or `ai_access: denied`. External AI indexing excludes denied notes. Restricted content requires an approved transmission policy.

## Article 28 — The brain remains understandable without AI
Markdown, human-readable names, explicit links, structured metadata, and core Obsidian capabilities are the foundation. AI is an intelligence layer, not a dependency for basic access.

## Article 29 — Context is retrieved, not dumped
Agents search first and load the smallest sufficient context. They do not inject the entire vault or entire repository by default.

## Article 30 — System changes are deliberate and reversible
No casual top-level folders, note types, statuses, properties, or global standards. Structural changes require a proposal, impact check, migration plan, validation, and changelog entry.


## Article 31 — Every meaningful run starts from the operating map
AI work that depends on Omar Brain must begin from [[00_System/Operating Map]], then load global state, bounded HOT context, and OPEN P0/P1 gaps before route-specific context.

## Article 32 — Hot context is bounded working memory
`HOT.md` is not a diary. It contains only current goal, active open loops, recent decisive context, and exact next focus. Compress it instead of appending forever.

## Article 33 — Global state and gap counts must agree
Machine-readable state may not claim readiness that contradicts the gap register. State/gap drift is a validation failure.

## Article 34 — Read before edit; never overwrite silently
Before changing durable memory, read the target and preserve provenance. Competing evidence is made visible through conflict, correction, or supersession—not deletion for convenience. Follow [[00_System/Governance/No Silent Overwrite Policy]].

## Article 35 — Source-heavy knowledge is decomposed and linked
Rich sources are not reduced to one monolithic summary. Extract source records, atomic claims, entities, concepts, contradictions, and analyses using [[00_System/Knowledge Graph/Source-Backed Knowledge Protocol]].

## Article 36 — Live software truth requires live inspection
When a task belongs to a real repository or application, inspect that repository/runtime directly. Brain notes are supporting context and architectural intent, not proof of current code or production state.

## Article 37 — Navigation uses explicit road signs
Every non-trivial AI run must know its route, current intersection, next sign, and destination proof. Use [[00_System/Navigation OS/Road Sign Navigation System]] and the machine-readable route registry. Do not wander across the vault or stay in a hub after the task crosses into another ownership boundary.

## Article 38 — Production readiness is a separate proven state
Feature completeness, a passing build, and a polished UI do not prove production readiness. When production readiness is requested, follow [[00_System/Production Readiness OS/Production Readiness Operating System]]. No agent may claim `PRODUCTION_READY` with open P0/P1 blockers, missing required evidence, or without independent Critic review.

## Final law
The objective is not maximum notes or maximum AI output. The objective is a continuously improving, evidence-backed system that can locate truth, execute work, learn from reality, and remain understandable years later.


## Article — Memory classes are explicit
Durable memory is semantic, episodic, or procedural. Each class follows its own write and retention policy.

## Article — Durable memory has a single writer
Worker agents may propose. The Memory Curator is the default commit authority for semantic and procedural memory.

## Article — Derived indexes are disposable
Vector stores, lexical indexes, and entity graphs never become the canonical source of truth.

## Article — Improvement requires evaluation
The Brain may not promote self-modifying retrieval, routing, prompts, or procedures solely on subjective model preference. Use eval evidence and reversible change control.

## Article — Minimal agent complexity
Use the fewest agents necessary. Additional agents must justify cost, latency, and coordination risk.


## Capability growth law

- One primary skill owns an outcome; support skills require explicit graph/bundle/stack justification.
- A new candidate is not an active skill.
- Do not create near-duplicate skills to solve routing problems.
- Imported is not mastered; maturity requires evidence.
- Repeated failures must update the skill, its gates, or its routing—not just the answer.
