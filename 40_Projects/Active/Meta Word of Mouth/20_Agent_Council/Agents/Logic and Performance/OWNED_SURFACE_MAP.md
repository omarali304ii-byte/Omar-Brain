# Logic and Performance Owned Surface Map

## Freshness
```yaml
last_verified_revision: bd8a7a6286e3df35b1c69439eb583061bc264aa7
last_verified_at: 2026-07-10
universe: full deep read + static verification + targeted DB-backed test execution
freshness: current
```

## Primary Owned

| Surface | Path | Trigger |
|---|---|---|
| Intelligence snapshot persistence | `src/lib/intelligence/customer-intelligence.ts` | any change to storeIntelligenceResult, lock ordering, source order usage |
| Source order comparison | `src/lib/intelligence/source-order.ts` | any change to compareSourceOrder, tiebreaking |
| Durable memory merge | `src/lib/intelligence/memory-merge.ts` | any change to mergeDurableMemory, fact extraction, dedup |
| Job claiming | `src/lib/intelligence/customer-intelligence.ts` (claimPendingIntelligenceJob) | any change to FOR UPDATE, SKIP LOCKED, index usage |
| Stale lock recovery | `src/lib/intelligence/customer-intelligence.ts` (recoverStaleIntelligenceJobs) | any change to recovery threshold, attempt counting |
| Worker loop | `scripts/customer-intelligence-worker.ts` | any change to poll interval, recovery cadence, batch size |
| Lead scoring | `src/lib/intelligence/lead-scoring.ts` | any change to RULES, score computation, status/stage thresholds |
| Opportunity refresh | `src/lib/opportunities/opportunity-engine.ts` (refreshOpportunityForPerson) | any change to evidence handling, transaction boundaries, override protection |
| Opportunity override | `src/lib/opportunities/opportunity-engine.ts` (overrideOpportunity) | any change to overrideStatus → status/stage mapping |
| Follow-up deduplication | `src/lib/attention/attention-engine.ts` | any change to dedupeKey construction, upsert logic |
| People search/query | `src/lib/people/people-query.ts` | any change to search predicates, OR breadth, cursor, sort |

## Shared

| Surface | Path | Shared With | Reason |
|---|---|---|---|
| Intelligence job lifecycle | `src/lib/intelligence/customer-intelligence.ts`, `prisma/schema.prisma` | Runtime & Reliability, Data & Truth | Worker deployment, schema invariants |
| Opportunity model | `prisma/schema.prisma` (Opportunity), `src/lib/opportunities/opportunity-dto.ts` | Data & Truth, Product & UX | Schema truth, human-visible meaning |
| Send reconciliation | `src/lib/messaging/send-reconciliation.ts` | Integration & Workflow, Runtime & Reliability | Message state transitions, provider semantics |
| Attention engine | `src/lib/attention/attention-engine.ts` | Runtime & Reliability, Product & UX | Worker deployment, business rules |
| DTO mapping (opportunities, people) | `src/lib/opportunities/opportunity-dto.ts`, `src/lib/people/people-dto.ts` | Data & Truth | Provider-ID privacy, DTO structure |

## Watched

| Surface | Path | Reason |
|---|---|---|
| AI context construction | `src/lib/intelligence/customer-intelligence.ts` (buildIntelligencePrompt, loadIntelligenceContext) | Context window size, token cost |
| AI suggestion usage | `src/lib/ai/suggestion-usage.ts` | Feedback recording timing, attribution |
| Inbox reply flow | `src/lib/inbox/inbox-dto.ts` | Concurrent send state |
| Instagram publishing | `scripts/instagram-publishing-worker.ts` | Queue semantics, retry model (parallel to intelligence worker pattern) |

## Change triggers — activate Logic & Performance when

- read-modify-write on shared person/opportunity/message state
- new FOR UPDATE, SKIP LOCKED, or transaction boundary
- lock order change
- score/rank/priority weight change
- search predicate change (new contains, OR branch)
- batch size or cursor behavior change
- worker poll interval or recovery cadence change
- `compareSourceOrder` or any tiebreaker change
- `mergeDurableMemory` algorithm change
- AI prompt context window change
- new worker or queue introduced
- pagination or take limit change on hot queries
