---
type: system
status: active
created: 2026-07-07
updated: 2026-07-07
topics: [connected-intelligence, control, experience]
ai_access: allowed
---
# Experience Compiler

The Experience Compiler turns real run records into learning candidates without pretending that one outcome is universal truth.

## Accepted input
Real `type: run` notes, evidence records and explicit sections:
- `## Reusable learning candidates`
- `## Failure signatures`

## Output
`learning-candidates.json` entries with project, run, claim, candidate kind, validation count and status.

## Promotion ladder
- One run: observation/candidate only.
- Repeated evidence in the same project: stronger project pattern, still bounded.
- Independent validation in another project: cross-project candidate.
- Governance review: may become procedural/semantic memory.
- Contradictory failure: narrow applicability, revalidate or reject.

## Never
- Promote from document popularity.
- Count copied notes as independent validation.
- Treat contextual conversation imports as run evidence.
