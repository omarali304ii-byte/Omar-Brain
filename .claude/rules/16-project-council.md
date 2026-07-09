---
type: claude-rule
status: active
created: 2026-07-09
updated: 2026-07-09
topics: [project-council, project-agents]
ai_access: allowed
---
# Project Council Rule

When a resolved project contains `20_Agent_Council/`, use that folder as the local agent operating surface.

## Must
- read `00_COUNCIL_HOME.md`, `03_ACTIVATION_MATRIX.md`, and selected agent folders,
- select the fewest agents necessary,
- keep current truth separate from history,
- update project council files after meaningful work,
- route reusable learning through Memory Curator.

## Must not
- spawn all agents for every task,
- let multiple specialists edit the same code surface independently,
- call stale council findings current without repo inspection,
- write global rules from one project without promotion review.
