# Data and Truth Domain Model

## Freshness
```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-10
verification_scope: full static schema + migration + code surface inspection at bd8a7a6
freshness: current_for_verified_scope
```

## Workspace / Tenant Truth

```yaml
canonical_workspace_id: Workspace.id (UUID, globally unique)
membership_truth: WorkspaceMember with @@unique([workspaceId, userId])
role_truth: WorkspaceRole enum (OWNER, ADMIN, AGENT, VIEWER) stored on WorkspaceMember
permission_truth: Derived from workspace role via ROLE_PERMISSIONS map in permissions.ts
```

Tenant-scoped models (workspaceId required): WorkspaceMember, MetaConnection, MetaAsset, ContentMediaAsset, InstagramPost, Person, Customer, Conversation, Message, IntelligenceJob, PersonSignal, Opportunity, OpportunityEvidence, PersonIntelligenceSnapshot, ConversationNote, LeadDetails, AiSuggestion, AiSuggestionFeedback, AiSummary, AuditLog, FollowUpTask, AttributionTouch, AiBrain, AiBrainPromptVersion, KnowledgeDomain, KnowledgeSource, KnowledgeSourceVersion, KnowledgeChunk

Global models (no workspaceId): User, Session

Cross-workspace relations are structurally prevented by workspaceId FK on every tenant model. Unique constraints on Customer include workspaceId. Unique constraints on Conversation include workspaceId. No raw SQL paths cross workspace boundaries without workspaceId filtering.

## Person / Customer / Identity Truth

```yaml
canonical_person: Person (one per workspace)
canonical_customer: Customer (platform-specific identity)
identity_link: Customer.personId -> Person.id (nullable, one Person can have many Customers)
provider_id: Customer.providerCustomerId (external truth, platform-scoped)
uniqueness: @@unique([workspaceId, platform, providerCustomerId]) on Customer
merge_behavior: No automatic merge; identity linking is explicit
```

A Person has zero or more Customer identities. Each Customer belongs to exactly one workspace and one platform. The `@@unique([workspaceId, platform, providerCustomerId])` on Customer prevents duplicate platform identities within a workspace. The `personId` FK on Customer is nullable (onDelete: SetNull) so a Customer can exist without a linked Person during ingestion. Person is the canonical CRM entity; Customer is the raw platform identity.

## Conversation Truth

```yaml
canonical_conversation: Conversation row
platform_identity: providerConversationId (nullable, external)
status: ConversationStatus enum (NEW, OPEN, NEEDS_REPLY, NEEDS_HUMAN, WAITING_CUSTOMER, CLOSED)
uniqueness: @@unique([workspaceId, platform, customerId, metaAssetId])
```

| Field | Classification | Source |
|---|---|---|
| `lastMessagePreview` | CACHED | Written by finalize-send.ts during send, sync during ingestion |
| `lastMessageAt` | CANONICAL | Written by finalize-send.ts and sync processes |
| `unreadCount` | DERIVED | Incremented on new inbound messages |
| `replyAllowed` | CACHED | Evaluated from send policy; stored for UI convenience |
| `lastIntent` | DERIVED | Set by intelligence analysis |

The send workflow transitions conversation status to WAITING_CUSTOMER on successful send. Stale SENDING messages are escalated to RECONCILIATION_REQUIRED by the recovery worker.

## Message Truth

```yaml
canonical_message: Message row
provider_message_id: providerMessageId (unique, inbound)
provider_send_id: providerSendId (unique, outbound)
status_enum: MessageStatus (RECEIVED, SENDING, SENT, FAILED, RECONCILIATION_REQUIRED)
direction: INBOUND, OUTBOUND, SYSTEM
sender: CUSTOMER, HUMAN, AI, SYSTEM
```

State transitions:
```
INBOUND: RECEIVED (terminal)
OUTBOUND: SENDING -> SENT | FAILED | RECONCILIATION_REQUIRED
```

- **SENT**: Meta accepted + local finalization completed (conversation updated, audit logged). providerSendId is guaranteed present.
- **FAILED**: Meta rejected OR unknown error before Meta accepted. Local state is final.
- **RECONCILIATION_REQUIRED**: Meta may have accepted but local finalization failed. providerSendId is preserved if known. Human intervention needed before retry.
- Can RECONCILIATION_REQUIRED exist without providerSendId? Yes — when Meta returned 200 but no providerSendId, and local finalization also failed.

Invariant: A provider-accepted + local-finalization-failed send must not be represented as simple FAILED. It must become RECONCILIATION_REQUIRED to prevent silent retry that duplicates customer delivery.

The `providerSendId` unique constraint prevents one Meta message_id from accidentally linking to multiple local messages.

## Intelligence Job Truth

```yaml
job_identity: IntelligenceJob
idempotency: sourceMessageId is @unique — one message cannot generate duplicate jobs
claim_semantics: FOR UPDATE SKIP LOCKED with LIMIT 1 on PENDING jobs
stale_lock_semantics: Jobs PROCESSING with lockedAt > 5min stale -> recovered to PENDING or terminal FAILED
max_attempts: 3 (MAX_JOB_ATTEMPTS)
terminal: COMPLETED, FAILED (after terminal error or max attempts)
```

Claim: `SELECT id FROM intelligence_jobs WHERE status = 'PENDING' ORDER BY createdAt ASC FOR UPDATE SKIP LOCKED LIMIT 1`. In a single transaction, the row is claimed by setting status=PROCESSING, locking at now, incrementing attemptCount.

Recovery: Startup + periodic (every 60 ticks). `SELECT id, attemptCount FROM intelligence_jobs WHERE status = 'PROCESSING' AND lockedAt < stale FOR UPDATE SKIP LOCKED`. Attempts >= max -> FAILED; else -> requeue to PENDING.

## Person Intelligence Truth

```yaml
signal_truth: PersonSignal — evidence-linked interpretation of a single source message
snapshot_truth: PersonIntelligenceSnapshot — derived aggregate projection, one per person (personId unique)
source_evidence: PersonSignal.sourceMessageId links to Message
ordering: compareSourceOrder(observedAt, createdAt, messageId) — deterministic three-way tiebreak
concurrency: FOR UPDATE on job + person + snapshot within single $transaction
```

| Field | Classification |
|---|---|
| PersonSignal.type/label/value/confidence | CANONICAL (AI interpretation) |
| PersonIntelligenceSnapshot.summary | DERIVED (merged over time) |
| PersonIntelligenceSnapshot.latestSummaryDelta | DERIVED (latest delta) |
| PersonIntelligenceSnapshot.leadScore | DERIVED (from signals) |
| PersonIntelligenceSnapshot.priorityScore | DERIVED |
| PersonIntelligenceSnapshot.interests/objections/risks | DERIVED |
| PersonIntelligenceSnapshot.latestSourceMessageAt | CANONICAL (ordering anchor) |
| PersonIntelligenceSnapshot.version | AUDIT (incremented on update) |

Snapshot update locking order: intelligence_jobs FOR UPDATE, people FOR UPDATE, person_intelligence_snapshots FOR UPDATE. When incoming source message is older than current snapshot's latest, only summary is merged and version incremented — full field overwrite is rejected.

## Opportunity / Lead Truth

```yaml
canonical_lead: Opportunity row
system_derived: stage, status, score, priorityScore — from intelligence + scoring
human_override: overrideStatus, overrideAt, overrideByUserId
effective_truth: overrideStatus ?? status (override wins when present)
evidence: OpportunityEvidence -> PersonSignal | Message (gated by view_intelligence)
```

The evidence include in both leads list and detail routes is conditional on `hasPermission("view_intelligence")`. At the DTO level, evidence is only included in output when `exposeIntelligence` is true. Provider IDs in the DTO are masked via `resolveProviderIdDisplay()` unless `exposeProviderIds` is true (`view_provider_ids` permission).

Manual override (`overrideOpportunity`) sets `overrideStatus`, `overrideByUserId`, `overrideAt`. The effective lead status is the override when present, otherwise the system-derived status. Intelligence refresh does not overwrite overrideStatus.

## AI Suggestion Truth

```yaml
canonical_suggestion: AiSuggestion row
usage_recording: Server-side feedback (HELPFUL, NOT_HELPFUL) can be recorded independently
used_recording: USED_AS_IS or EDITED_BEFORE_SEND feedback is rejected with 409 unless recorded after successful send
classification: classifyStoredSuggestionUsage in suggestion-usage.ts determines USED_AS_IS vs EDITED_BEFORE_SEND
```

The feedback route explicitly rejects USED_AS_IS/EDITED_BEFORE_SEND with 409: "Feedback of this type is only recorded server-side after a successful message send." The inbox messages route records feedback after successful send at lines 394-403.

## AI Brain Schema Truth

```yaml
brain_profile: AiBrain — one per workspace (workspaceId unique)
active_prompt: activePromptVersionId on AiBrain — @unique FK to AiBrainPromptVersion
prompt_lifecycle: DRAFT -> PUBLISHED -> SUPERSEDED (ARCHIVED also available)
one_published_per_brain: Enforced by partial unique index WHERE status = 'PUBLISHED'
version_authority: activePromptVersionId is the canonical active prompt pointer
version_immutability: PUBLISHED and SUPERSEDED versions are never mutated (only updated to SUPERSEDED on publish)
draft_concurrency: FOR UPDATE on ai_brains row within savePromptDraft transaction
knowledge_source: KnowledgeSource with status DRAFT/ACTIVE/ARCHIVED
source_versioning: KnowledgeSourceVersion with @@unique([sourceId, version]), status DRAFT/PROCESSING/REVIEW_REQUIRED/PUBLISHED/SUPERSEDED/FAILED/ARCHIVED
chunk: KnowledgeChunk with embedding (pgvector 1536-dimensional), @@unique([sourceVersionId, chunkIndex])
```

The publish operation:
1. FOR UPDATE lock on ai_brains row
2. Verify target version exists and is DRAFT
3. updateMany all PUBLISHED -> SUPERSEDED (within same brain)
4. Update target version to PUBLISHED
5. Update AiBrain.activePromptVersionId + status = READY
6. Audit log

The partial index `ai_brain_prompt_versions_one_published_per_brain_idx` enforces at most one published prompt at the database level, independent of application code.

## Provider ID / Privacy Truth

```yaml
storage: Customer.providerCustomerId, Message.providerMessageId, Message.providerSendId
centralized_masking: resolveProviderIdDisplay() in src/lib/privacy/provider-id.ts
permission_gate: canExposeProviderId() checks view_provider_ids permission
roles_with_access: OWNER, ADMIN
roles_without_access: AGENT, VIEWER
```

All API routes (leads list/detail, people list/detail, inbox list/detail) consistently:
1. Call `canExposeProviderId(user.activeWorkspace.role)` to get `exposeProviderIds`
2. Pass `exposeProviderIds` to DTO mapper
3. DTO mapper calls `resolveProviderIdDisplay(providerId, exposeProviderIds)` which masks unless permitted

The People search query adds `providerCustomerId` to search criteria only when `exposeProviderIds` is true — preventing provider ID enumeration via search.

## Current structural strengths
- Tenant scoping is consistent across all models
- Source message uniqueness prevents duplicate intelligence jobs
- Three-outcome send model distinguishes provider failure from local failure
- RECONCILIATION_REQUIRED preserves providerSendId for recovery
- AI Brain prompt publication has DB-level one-published-per-brain constraint
- FOR UPDATE locking pattern is used consistently for intelligence jobs, snapshots, and brain operations
- Provider ID masking is centralized in one function, applied consistently across surfaces
- Intelligence evidence is gated at both query include and DTO output layers

## Current risks
- Concurrency locking is code-level; test coverage for concurrent execution is not runtime-proven
- Migration chain has not been tested against production data volumes
- pgvector extension must be installed on the database for AI Brain to function
- Deployed worker topology (intelligence + reconciliation workers running) is unknown
- Snapshot stale update rejection uses a fallback without all ordering fields when existing snapshot was created before the source-order migration — equal timestamps favor existing (first-writer-wins)
