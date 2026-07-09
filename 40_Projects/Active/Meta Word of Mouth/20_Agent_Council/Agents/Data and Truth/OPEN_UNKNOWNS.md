# Data and Truth Open Unknowns

Unknowns must not be guessed away.

## Schema
- [ ] Current migration-applied state not proven in a disposable DB
- [ ] Whether clean migrations pass against empty database is not runtime-verified (test-clean-migration.ts exists but execution not verified)
- [ ] Whether old migrations contain hidden drift against current schema beyond the three recent ones

## Runtime
- [ ] Whether pgvector extension is available on the production database
- [ ] Whether deployed database schema matches migration chain expectations
- [ ] Whether customer-intelligence-worker is deployed and running in production
- [ ] Whether outbound-send-reconciliation-worker is deployed and running in production
- [ ] Whether stale SENDING messages exist in production that need reconciliation
- [ ] Whether pre-migration snapshots exist with null latestSourceMessageAt/CreatedAt/Id (affects MWOM-DATA-004)

## Provider ID
- [ ] Whether any uninspected surface (e.g., Instagram posts, webhook event responses, internal tooling) exposes raw provider IDs
- [ ] Whether frontend components (ReplyComposer, Sidebar) expose provider IDs through client-side rendering

## Intelligence
- [ ] Whether concurrent intelligence job race is reproducible under realistic load (test exists, execution not verified)
- [ ] Whether OpenAI API behavior (retry, timeout, partial response) can create inconsistent intelligence state

## AI Brain
- [ ] Whether knowledge ingestion pipeline is implemented beyond schema (KnowledgeSourceVersion processing to chunks)
- [ ] Whether AI Brain published prompts are injected into AI suggestion generation
- [ ] Whether multiple workspaces can have independent AI Brain configurations without cross-tenant leakage

## Data correctness
- [ ] Whether Conversation.status and Message.status can diverge under transaction failure
- [ ] Whether opportunity scores can get stale when intelligence jobs fail
- [ ] Whether audit logs are complete for all state transitions (send, override, publish)

## Closure rule
When an unknown is proven, update the owning current model and attach evidence; do not merely delete uncertainty without proof.
