---
type: standard
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [project, ovx, smart-connected-ai, architecture, intake]
ai_access: allowed
object_id: obj-ovx-smart-connected-ai-standard
---
# OVX Smart Connected AI Project Standard

## Purpose
This standard makes the OVX company vision operational inside Omar Brain.

Use it for OVX-owned projects, client systems built under the OVX philosophy, and any project Omar explicitly wants to align with OVX Smart Connected AI.

It inherits from [[30_Business/Organizations/OVX Smart Connected AI]].

## Standard
Every meaningful OVX project should solve today's problem and strengthen tomorrow's ecosystem.

The project does not need to become huge. It does need to be designed with awareness of the larger client organism.

## Architecture Intake Questions
Before approving architecture for an OVX project, answer these questions.

### 1. Problem
What real problem are we solving now?

### 2. Existing Reality
What systems, databases, documents, workflows, people, customers, organizations, products, and source-of-truth boundaries already exist?

### 3. Connection
What should this project understand from the existing ecosystem?

### 4. Contribution
What useful context will this project add back?

### 5. Identity
How will people, customers, organizations, accounts, objects, and business entities be consistently recognized where appropriate and authorized?

### 6. Events
Which meaningful events should be captured for future analysis, automation, audit, or AI context?

### 7. Knowledge
Which information belongs in searchable organizational knowledge?

### 8. Structured Data
Which information requires databases, analytics, deterministic queries, or reporting instead of RAG?

### 9. Intelligence
Where can AI create measurable value with the right context?

### 10. Permissions
Who may know what, retrieve what, change what, and ask AI to act on what?

### 11. Action
What may automation or AI agents actually do, and what requires human approval?

### 12. Future
How does this work make future OVX systems faster, smarter, safer, or more valuable?

## Required Design Outputs
An OVX-aligned project should document:

- canonical entities and ownership,
- source-of-truth rules,
- event candidates,
- knowledge sources,
- structured data and analytics needs,
- identity and permission boundaries,
- integration boundaries,
- AI use cases and non-use cases,
- audit and lineage needs,
- reusable capabilities,
- future ecosystem contribution.

## AI Rule
Do not add AI as decoration.

AI should be used only when connected context, evidence, permissions, and action paths create real value. If the best answer requires a structured query, use a structured query. If the best answer requires approved knowledge retrieval, use RAG. If the best answer requires both, design both deliberately.

## Data Rule
Connected does not mean one giant database.

Use the right pattern for the truth:

- authoritative system,
- synchronized copy,
- event stream,
- federated query,
- derived analytics store,
- knowledge index,
- relationship graph,
- audit log.

The client owns the client data. OVX helps make it connected, governed, useful, and intelligent.

## Integration Rule
Avoid unique point-to-point integration wherever a reusable API, event, schema, connector, identity primitive, or permission model would serve future OVX work better.

## Security Rule
Permissions are part of the intelligence architecture.

Every project must preserve tenant boundaries, least privilege, data classification, authorization, audit history, AI retrieval permission, AI tool permission, and human approval requirements.

## Done Proof
An OVX project is not fully aligned with this standard until its project packet or architecture notes include:

- the immediate problem,
- the ecosystem connection,
- the context contribution,
- the source-of-truth boundary,
- the permission boundary,
- the structured-vs-knowledge retrieval boundary,
- the future reuse or compounding-intelligence value.

## Brain Routing
When starting or resuming an OVX project, Omar Brain should load this standard after [[00_System/Project OS/Universal Project Contract]] and before final architecture approval.
