---
type: system
status: active
created: 2026-07-07
topics: [metadata, schema, retrieval]
ai_access: allowed
version: 4.0
---
# Metadata Schema

The schema stays controlled but is now strong enough for multi-project execution and AI learning.

## Common properties

| Property | Type | Required | Purpose |
|---|---|---:|---|
| `type` | text | yes | Stable object type |
| `status` | text | yes | Type-valid lifecycle state |
| `created` | date | yes | Creation date |
| `updated` | date | recommended | Last meaningful content update |
| `domains` | list | recommended | `life`, `career`, `business` |
| `topics` | list | recommended | Stable subject labels |
| `aliases` | list | optional | Alternate names/acronyms |
| `ai_access` | text | yes | `allowed`, `restricted`, `denied` |
| `source_kind` | text | factual notes | Evidence origin |
| `confidence` | text | factual/inferred notes | `high`, `medium`, `low` |
| `last_reviewed` | date | active durable items | Human/agent review date |

## Project identity and portfolio properties
Use on canonical project notes.

| Property | Purpose |
|---|---|
| `project_id` | Stable unique ID such as `prj-ovx-smart-inbox` |
| `project_class` | software, business, research, personal, learning |
| `architecture_profile` | Approved global baseline |
| `phase` | Current lifecycle phase |
| `health` | green, yellow, red, unknown |
| `priority` | P0–P4 |
| `repo_url` | Canonical repository URL when applicable |
| `local_path` | Local workspace path when applicable |
| `primary_branch` | Main integration branch |
| `current_batch` | Current execution batch ID/name |
| `next_action` | Short machine-readable next step |
| `target_date` | Optional target date |

## Execution properties

| Property | Purpose |
|---|---|
| `task_id` | Stable task ID |
| `feature_id` | Stable feature ID |
| `run_id` | Stable execution run ID |
| `depends_on` | Links to prerequisite work |
| `acceptance` | Short acceptance reference |
| `verification` | Verification method/reference |
| `blocked_by` | Explicit blocker links/IDs |
| `attempt_count` | Retry/repair attempts when useful |

## Learning properties

| Property | Purpose |
|---|---|
| `maturity` | observation → candidate → validated → pattern → standard |
| `evidence_count` | Number of linked verified evidence records |
| `success_count` | Successful applications |
| `failure_count` | Failed applications |
| `validated_projects` | Distinct linked projects validating transfer |
| `last_validated` | Last real verification date |
| `supersedes` | Older knowledge replaced by this item |
| `superseded_by` | Newer authoritative replacement |

## Entity link properties
Use Obsidian links rather than duplicated text.

- `project: "[[Project Name]]"`
- `projects: ["[[Project A]]", "[[Project B]]"]`
- `company: "[[Company Name]]"`
- `product: "[[Product Name]]"`
- `skill: "[[Skill Name]]"`
- `goal: "[[Goal Name]]"`
- `people: ["[[Person Name]]"]`
- `evidence: ["[[Evidence Note]]"]`

## Property discipline
Agents must never silently create near-duplicates such as:
- `project_status` beside `status`,
- `topic` beside `topics`,
- `created_at` beside `created`,
- `repo` beside `repo_url`,
- `next_step` beside `next_action`,
- `ai-safe` beside `ai_access`.

Schema changes require change control.


## v4 memory properties
| Property | Purpose |
|---|---|
| `memory_class` | `semantic`, `episodic`, `procedural` |
| `episode_id` | Stable append-only episode ID |
| `thread_id` | Cross-run conversation/task thread |
| `proposal_id` | Stable memory proposal ID |
| `candidate_memory_class` | Intended semantic/procedural promotion |
| `sources` | Evidence/source links |
| `derived_from` | Episode/evidence lineage |
| `review_by` | Freshness revalidation deadline |
| `base_content_hash` | Optimistic concurrency for memory writes |

## v4 agent/eval/capability properties
| Property | Purpose |
|---|---|
| `role_id` | Stable agent role ID |
| `capability_id` | Stable capability ID |
| `eval_id` | Stable evaluation case/result ID |
| `eval_kind` | retrieval, agent, memory, project |
| `score` | Evaluation result where applicable |
| `risk` | low, medium, high, critical |
