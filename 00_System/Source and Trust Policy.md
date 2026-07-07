---
type: system
status: active
created: 2026-07-07
topics: [sources, trust, ai, evidence]
ai_access: allowed
version: 2.0
---
# Source and Trust Policy

## Source kinds
- `self`: Omar's explicit decision, preference, experience, observation.
- `official`: authoritative owner documentation.
- `primary`: original paper, dataset, law, source code, direct statement.
- `secondary`: analysis/reporting about primary material.
- `conversation`: chat/email/meeting content not independently verified.
- `repository`: code, schema, migrations, repository state.
- `runtime`: observed execution/provider/system behavior.
- `test`: automated or manual verification evidence.
- `ai`: AI-generated/synthesized/inferred content.

## Confidence
- `high`: direct observation or strong authoritative evidence.
- `medium`: supported but incomplete/context-dependent.
- `low`: hypothesis, memory fragment, uncertain extraction.

## Trust rules
1. Confidence comes from evidence, not prose style.
2. `source_kind: ai` never becomes primary evidence by repetition.
3. Preserve exact identifiers and failure strings.
4. Preserve disagreement instead of blending to false certainty.
5. Distinguish “Omar decided” from “AI recommended.”
6. Summary never outranks source.
7. Repository proves code existence, not user acceptance.
8. Test evidence proves only its tested claim and environment.
9. Runtime observation may outrank stale docs for actual behavior, but not automatically change intended requirements.
10. External volatile facts require revalidation before durable high-confidence use.
