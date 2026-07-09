# Integration and Workflow Change Impact Map

## Activate this agent when
- external API call added/changed
- retry/timeout behavior changes
- webhook event changes
- provider version change
- side effect before local commit
- adapter cutover
- Meta Graph API version changes (META_GRAPH_API_VERSION)
- OpenAI model changes
- new external system integration

## Invalidation triggers
When changed files match these patterns, corresponding truth must be re-verified:

```yaml
change_pattern: "src/lib/meta/**"
invalidate:
  - Meta provider contract
  - retry matrix
  - error classification
  - outbound workflow truth
  - external system registry (Meta)
reinspect:
  - send clients
  - token resolution
  - reply-window logic
  - webhook handling
required_agents:
  - Integration & Workflow
  - Quality Engineer

change_pattern: "src/lib/messaging/**"
invalidate:
  - send state machine
  - reconciliation model
  - retry matrix
reinspect:
  - all tests in EVAL_REGISTRY
required_agents:
  - Integration & Workflow
  - Quality Engineer
  - Data & Truth

change_pattern: "app/api/meta/webhooks/**"
invalidate:
  - webhook registry
  - signature verification model
  - inbound event handling
reinspect:
  - webhook route handlers
  - signature verification
  - profile matching
required_agents:
  - Integration & Workflow
  - Runtime & Reliability

change_pattern: "app/api/inbox/conversations/**/messages/route.ts"
invalidate:
  - outbound workflow truth
  - MWOM-ARCH-001 state
reinspect:
  - route POST handler
  - provider imports
  - error mapping
required_agents:
  - Integration & Workflow
  - Architecture

change_pattern: "prisma/schema.prisma"
invalidate:
  - idempotency registry (constraints)
  - message state model
  - event model
reinspect:
  - Message, WebhookEvent, IntelligenceJob models
  - unique constraints and indexes
required_agents:
  - Integration & Workflow
  - Data & Truth

change_pattern: "src/lib/ai/suggestions.ts" or "src/lib/intelligence/customer-intelligence.ts"
invalidate:
  - OpenAI contract
  - AI timeout configuration
reinspect:
  - OpenAI API calls
  - model references
  - timeout values
required_agents:
  - Integration & Workflow
  - Logic & Performance

change_pattern: "scripts/*worker*"
invalidate:
  - worker topology
  - reconciliation timing
reinspect:
  - worker scripts
  - poll intervals
  - recovery mechanisms
required_agents:
  - Integration & Workflow
  - Runtime & Reliability

change_pattern: "META_GRAPH_API_VERSION" env var
invalidate:
  - all Meta provider contracts
  - API URLs
reinspect:
  - all Meta client code for API version compatibility
required_agents:
  - Integration & Workflow
  - Architecture
```

## Cross-agent protocol
- Architecture boundary change → handoff Architecture
- Invariant/schema/privacy truth → handoff Data & Truth
- Provider workflow semantics → handoff Integration & Workflow
- Concurrency/complexity → handoff Logic & Performance
- Human-visible state meaning → handoff Product & UX
- Worker/deployment/recovery → handoff Runtime & Reliability
- Any closure claim → handoff Quality Engineer; Critic for final challenge
