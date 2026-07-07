---
type: system
status: active
created: 2026-07-07
topics: [ai, governance, retrieval, execution]
ai_access: allowed
version: 2.0
---
# AI Operating Manual

This is the general vault read/write contract. Project execution additionally obeys `00_System/AI Runtime/`.

## Priority order
1. [[00_System/Brain Constitution]]
2. [[00_System/Governance/Truth Hierarchy and Conflict Policy]]
3. [[00_System/Taxonomy and Routing Rules]]
4. [[00_System/Metadata Schema]]
5. [[00_System/Naming Standard]]
6. Relevant Project OS / AI Runtime / Architecture Standard
7. Project-specific accepted decisions
8. Type-specific template
9. Current user instruction

## Mandatory read-before-write
Before creating durable memory:
1. identify intended `type`,
2. identify domains/entities,
3. search exact title and aliases,
4. search exact identifiers,
5. search semantic near-duplicates,
6. inspect likely canonical notes,
7. choose create, update, merge, link, inbox, or discard-with-reason.

## Project-trigger behavior
If input names or implies one of Omar's projects, resolve the project and follow [[00_System/AI Runtime/Project Agent Boot Protocol]] before implementation work.

## Write behavior
- use controlled properties,
- preserve exact identifiers,
- link known entities,
- separate raw evidence from summaries,
- keep current truth near top,
- use meaningful heading chunks,
- avoid duplicated paragraphs,
- preserve source/confidence.

## Forbidden behavior
- invent global structure,
- invent status/property/type,
- mark completion without evidence,
- turn inference into personal history,
- overwrite human decisions with AI recommendations,
- expose `ai_access: denied`,
- create wording duplicates,
- silently delete uncertainty,
- silently promote AI learning into global standards.

## End-of-operation verification
1. path correct,
2. metadata controlled,
3. no obvious duplicate,
4. links meaningful,
5. access policy respected,
6. project state updated when relevant,
7. completion claims backed by evidence,
8. reusable learning considered.
