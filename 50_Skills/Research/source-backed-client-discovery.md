---
type: skill
status: active
created: 2026-07-07
skill_id: skill-source-backed-client-discovery
category: Research
maturity: S1_IMPORTED
source_repo: omarali304ii-byte/My-Brain
source_path: "WOM/11 Skills/WOM-Custom/agency/source-backed-client-discovery.md"
provenance_mode: imported-adapted
ai_access: allowed
---
# Source-Backed Client Discovery

## Purpose

Detect clients/entities from conversations, files, domains, proposals, reports, and screenshots while preserving provenance and uncertainty.

## When to activate

- discover clients from files
- extract client names
- import folders
- client discovery
- chat export extraction
- source backed extraction

## Inputs required

- Source inventory/path
- Existing brain indexes
- No-overwrite policy
- Patch/run identifier

## Workflow

1. Inventory sources and stable identifiers/hashes.
2. Extract candidate client/entity evidence.
3. Classify output type and confidence.
4. Check existing canonical entities before creation.
5. Merge additively, or create candidate/conflict when uncertain.
6. Link each durable claim back to source evidence.
7. Update indexes/road signs and record coverage.
8. Run QA for duplicates, broken links, and unsupported certainty.

## Outputs

- Client/entity candidates
- Source links
- Conflict log
- Coverage report
- Index updates

## Quality gates

- [ ] No silent overwrite
- [ ] Uncertainty preserved
- [ ] No client created from ambiguous single mention without candidate state
- [ ] Coverage and source trail retained

## Road signs

- When **generic ingestion** dominates → go to **Source-Backed Knowledge Protocol**.
- When **repeated workflow** dominates → go to **Skill Distillation**.

## Maturity and evidence

- Current maturity: `S1_IMPORTED`
- Imported capability is usable guidance, not proof of Omar-specific mastery.
- Promote only through [[00_System/Skill OS/Skill Maturity Ladder]].
- Attach real project/episode evidence when applied.

## Provenance

- Source repository: `omarali304ii-byte/My-Brain`
- Source path: `WOM/11 Skills/WOM-Custom/agency/source-backed-client-discovery.md`
- Adapted for Omar Brain v7: activation, evidence gates, road signs, and maturity were normalized to the local Brain OS.
