# Integration and Workflow Open Unknowns

Unknowns must not be guessed away.

## Provider behavior unknowns
- Meta send endpoint: can a sent message be queried by ID after the fact? (GET /{messageId}) If yes, transport-failed sends could be resolved by checking Meta for the message.
- Meta webhook delivery: what is Meta's actual retry behavior for failed deliveries? Exponential backoff? Max attempts? This affects how the application should handle transient DB failures.
- Meta rate limits: what are the actual rate limits for send endpoints (per-page, per-phone-number)? Currently relying on Meta 429 responses with no proactive throttling.
- Meta idempotency: does Meta support any idempotency key mechanism for the send endpoint? Not documented in current Meta API reference.

## Runtime unknowns
- Worker deployment: which of the 4 workers (customer-intelligence, outbound-send-reconciliation, instagram-publishing, attention) actually run in production? How many instances?
- Worker concurrency: are workers deployed as single instances or multiple? FOR UPDATE SKIP LOCKED is used but production concurrency model is unknown.
- Supabase Edge Functions: are meta-webhook and meta-oauth-callback edge functions actively deployed and receiving traffic? Or have they been superseded by Next.js routes?
- Database connection pooling: how does the production deployment handle connection limits between workers + Next.js + Edge Functions all connecting to the same Supabase pool?
- CI execution: does the GitHub Actions Verify workflow (`.github/workflows/verify.yml`) successfully execute all 34+ test scripts at revision bd8a7a6?

## Test coverage unknowns
- Inbox sync (Instagram/Facebook): no test scripts found
- Instagram publishing worker: no test scripts found
- Meta OAuth flow: no test scripts found
- sendConversationMessage standalone: no dedicated test script (covered only via route tests)
- AI suggestions: no dedicated test script
- Audit log deduplication: no test for duplicate audit prevention during reconciliation
- All existing test scripts: execution status unknown (commands exist in package.json; CI execution unproven)

## Architecture unknowns
- Supabase Edge Function future: when will the temporary Supabase adapters be replaced by native Next.js routes? The `.env.local` and `supabase/.env` use different Meta App credentials — are both sets active?
- Dual send path resolution: when will the route delegate to sendConversationMessage (MWOM-ARCH-001)? Until then, both paths must be kept in sync.

## Closure rule
When an unknown is proven, update the owning current model and attach evidence; do not merely delete uncertainty without proof.
