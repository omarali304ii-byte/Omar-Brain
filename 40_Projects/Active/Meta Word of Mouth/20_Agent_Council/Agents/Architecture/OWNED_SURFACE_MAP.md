# Architecture Owned Surface Map

```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
freshness: current_for_verified_scope
completeness: verified_from_bounded_architecture_inspection
```

## Ingress boundary
| Path | Architectural Role |
|------|-------------------|
| `src/lib/meta/webhook-signature.ts` | Raw-byte signature verification (per-profile) |
| `src/lib/meta/meta-config.ts` | Multi-profile Meta configuration (Social/WhatsApp) |
| `prisma/schema.prisma` (WebhookEvent) | Idempotent webhook event storage (payloadHash) |
| webhook route handler (if present in app/api/meta) | Ingress entry point — must remain thin |

## Intelligence boundary
| Path | Architectural Role |
|------|-------------------|
| `src/lib/intelligence/customer-intelligence.ts` | Full intelligence lifecycle: enqueue, claim, process, store, complete/fail, stale recovery. Major orchestration hotspot at 865 lines. |
| `src/lib/intelligence/source-order.ts` | Deterministic tie-breaking for concurrent intelligence updates |
| `src/lib/intelligence/memory-merge.ts` | Durable memory merging |
| `scripts/customer-intelligence-worker.ts` | Worker runtime: startup recovery + periodic recovery + poll/claim/process loop |
| `prisma/schema.prisma` (IntelligenceJob, PersonSignal, PersonIntelligenceSnapshot) | Intelligence persistence models |

## Messaging boundary
| Path | Architectural Role |
|------|-------------------|
| `src/lib/messaging/send-message.ts` | Dedicated send workflow: local create -> provider call -> finalize/reconcile (NOT used by current route) |
| `src/lib/messaging/send-reconciliation.ts` | Stale send recovery + human reconciliation for RECONCILIATION_REQUIRED |
| `src/lib/messaging/finalize-send.ts` | Transaction-based finalization: message status + conversation update + audit |
| `scripts/outbound-send-reconciliation-worker.ts` | Reconciliation worker: polling loop for stale SENDING recovery |
| `app/api/inbox/conversations/[id]/messages/route.ts` | Outbound send route — contains duplicated send orchestration (ARCH-001) |
| `prisma/schema.prisma` (Message with RECONCILIATION_REQUIRED status) | Message status model with send uncertainty |

## AI Brain boundary
| Path | Architectural Role |
|------|-------------------|
| `src/lib/brain/brain-profile.ts` | Brain lifecycle: ensure, overview, domain seeding |
| `src/lib/brain/prompt-versions.ts` | Prompt version lifecycle: draft, publish, supersede with FOR UPDATE locking |
| `src/lib/brain/domains.ts` | Knowledge domain listing with source counts |
| `src/lib/brain/constants.ts` | Embedding config, default domains, limits |
| `src/lib/brain/brain-errors.ts` | Typed error hierarchy |
| `src/lib/brain/route-errors.ts` | Error -> HTTP response mapping |
| `src/lib/brain/repositories/knowledge.repository.ts` | Repository interface (KnowledgeRepository) |
| `src/lib/brain/repositories/pgvector-knowledge.repository.ts` | PostgreSQL/pgvector implementation |
| `app/api/ai-brain/**` | All 7 AI Brain routes — thin transport layer |
| `src/services/ai-brain.service.ts` | Frontend service wrapper (API client calls) |
| `src/features/ai-brain/**` | 5 UI feature components |
| `prisma/schema.prisma` (AiBrain, AiBrainPromptVersion, KnowledgeDomain, KnowledgeSource, KnowledgeSourceVersion, KnowledgeChunk) | AI Brain persistence models |

## Provider adapter boundary
| Path | Architectural Role |
|------|-------------------|
| `src/lib/meta/meta-send-client.ts` | Meta send provider adapter |
| `src/lib/meta/meta-send-token.ts` | Send token resolution (asset, permission model) |
| `src/lib/meta/meta-config.ts` | Multi-profile Meta configuration |
| `src/lib/meta/webhook-signature.ts` | Webhook signature verification |
| `src/lib/meta/meta-oauth.ts` | OAuth flow |
| `src/lib/meta/integration-profile.ts` | Platform -> profile mapping |
| `src/lib/meta/messaging-policy.ts` | Messaging policy evaluation |
| `src/lib/meta/permission-catalog.ts` | Permission requirements catalog |

## Architecture-sensitive CI/tests
| Path | Architectural Role |
|------|-------------------|
| `scripts/test-meta-architecture.ts` | Static Meta adapter boundary verification |
| `scripts/test-route-security.ts` | Live-server route permission boundary tests |
| `scripts/test-message-send-integrity.ts` | Send workflow outcome integrity |
| `scripts/test-send-reconciliation.ts` | Reconciliation lifecycle tests |
| `scripts/test-intelligence-stale-lock-recovery.ts` | Stale lock recovery boundary proof |
| `scripts/test-intelligence-ordering-concurrency.ts` | Concurrency ordering deterministic tests |
| `scripts/test-intelligence-memory-concurrency.ts` | Memory merge concurrency tests |
| `scripts/test-ai-brain-isolation.ts` | AI Brain workspace isolation proof |
| `scripts/test-ai-brain-permissions.ts` | AI Brain permission boundary |
| `scripts/test-ai-brain-prompt-versioning.ts` | Prompt version lifecycle proof |
| `scripts/test-ai-suggestion-usage.ts` | AI suggestion usage classification tests |
| `scripts/test-ai-suggestion-feedback.ts` | AI suggestion feedback recording tests |
| `scripts/test-lead-permissions.ts` | Lead route permission tests |
| `scripts/test-lead-provider-id-permissions.ts` | Lead provider-ID privacy tests |
| `package.json` (test:* scripts) | 37 test script definitions |
| `.github/workflows/verify.yml` | GitHub Actions Verify pipeline (34+ steps, pgvector PostgreSQL); execution status not verified |

## Route architecture-sensitive routes
| Path | Risk |
|------|------|
| `app/api/inbox/conversations/[id]/messages/route.ts` | Route contains full send orchestration (duplicated from send-message.ts), cross-domain coordination (AI feedback + reconciliation) |
| `app/api/leads/route.ts` | Intelligence evidence gating in route (exposeIntelligence check) |
| `app/api/leads/[id]/route.ts` | Same intelligence evidence gating pattern |

## Rule
On revision drift, inspect changed files intersecting these surfaces first. Expand only when evidence shows a new owned surface.
