---
type: system
status: active
created: 2026-07-07
topics: [automation, validation, scaffold]
ai_access: allowed
---
# Automation

Dependency-free Node.js helpers.

## Create a project scaffold
From vault root:

```powershell
node .\00_System\Automation\new-project.mjs --name "Project X" --id "prj-project-x" --class software --domain business
```

The script refuses to overwrite an existing project.

## Validate brain structure

```powershell
node .\00_System\Automation\brain-validator.mjs .
```

Checks include:
- required frontmatter basics,
- controlled types/statuses/AI access,
- duplicate project IDs,
- active project next action,
- project packet completeness,
- template variables quoted in YAML,
- stale active project review dates,
- suspicious duplicate filenames.

Automation supports governance; it does not replace AI/entity resolution.


## Create a governed web project

```powershell
node .\00_System\Automation\new-project.mjs `
  --name "Project X" `
  --id "prj-project-x" `
  --class software `
  --kind web `
  --domain business
```

## Static web repository evidence helper

```powershell
node .\00_System\Automation\web-project-audit.mjs "D:\path\to\repo"
```

This helper only surfaces static evidence and warnings. It does not prove security, accessibility, runtime correctness or release readiness.


## Dynamic Brain v4 commands
```powershell
# Build a structure-aware derived retrieval manifest
node .\00_System\Automation\build-retrieval-manifest.mjs .

# Search the local manifest and emit a compact context pack
node .\00_System\Automation\brain-context.mjs --query "memory single writer" --k 8

# Create append-only global episode
node .\00_System\Automation\new-episode.mjs --title "Project X architecture review"

# Create governed memory proposal
node .\00_System\Automation\memory-proposal.mjs --title "Use raw body for signed webhooks" --class procedural

# Run retrieval smoke evals
node .\00_System\Automation\eval-retrieval.mjs .

# Report brain health
node .\00_System\Automation\brain-health.mjs .

# Full control cycle
node .\00_System\Automation\brain-cycle.mjs .
```

The retrieval manifest and indexes are derived. Never edit them as canonical truth.


## Skill Graph v8 commands

```powershell
# Select a primary skill and show graph/bundle candidates
node .\00_System\Automation\skill-route.mjs . "make my website production ready"

# Inspect a real project stack; recommendations are candidates only
node .\00_System\Automation\skill-stack.mjs "D:\path\to\repo" .

# Validate skill registry, graph edges and bundles
node .\00_System\Automation\check-skill-registry.mjs .
node .\00_System\Automation\check-skill-connectivity.mjs .

# Propose a missing skill candidate without activating it
node .\00_System\Automation\skill-dev.mjs . propose "Webhook Replay Safety" --category Technical --reason "repeated incidents"

# Append real skill-application evidence
node .\00_System\Automation\skill-evidence.mjs . skill-security-and-hardening prj-x SUCCESS "verified auth hardening"
```

Context law: one primary skill; add support only through an explicit handoff, a validated bundle phase, or stack evidence. Stack detection never means load every recommendation.


## Connected Experience v9 commands

```powershell
# Plan routing for new information without writing
node .\00_System\Automation\brain-ingest.mjs . --text "Prisma ECONNREFUSED during login" --project "Meta Word of Mouth" --source terminal

# Commit a safe unverified intake with identity, provenance, event and impact
node .\00_System\Automation\brain-ingest.mjs . --text "Prisma ECONNREFUSED during login" --project "Meta Word of Mouth" --source terminal --commit

# Explain project/context resolution
node .\00_System\Automation\context-plan.mjs . "continue Meta Word of Mouth webhook fix"

# Create an observed run record for a resolved real project
node .\00_System\Automation\new-run.mjs . --project "Meta Word of Mouth" --title "Webhook verification" --result success --summary "Verified inbound webhook path"

# Record observed evidence and optionally connect it to a run
node .\00_System\Automation\new-evidence.mjs . --project "Meta Word of Mouth" --title "Webhook smoke passed" --kind test --ref "npm run smoke:webhook" --run "run-..."

# Compile learning candidates only from observed/verified real run notes
node .\00_System\Automation\experience-compile.mjs .

# Promote durable project experience into first-class pattern/failure objects and graph edges
node .\00_System\Automation\learning-objectify.mjs .

# Process impact queue items with auditable processed/blocked outcomes
node .\00_System\Automation\impact-process.mjs .

# Plan future-project transfer from graph-backed experience
node .\00_System\Automation\project-experience-plan.mjs . --project "Meta Word of Mouth" --query "I am building a new AI CRM"

# Detect repository revision drift for repo-grounded projects
node .\00_System\Automation\project-revision-check.mjs . --all

# Honest reality and integrity checks
node .\00_System\Automation\reality-coverage.mjs .
node .\00_System\Automation\check-orphan-information.mjs .
node .\00_System\Automation\check-causal-integrity.mjs .
node .\00_System\Automation\check-learning-quality.mjs .
node .\00_System\Automation\check-impact-queue.mjs .
node .\00_System\Automation\check-experience-graph.mjs .

# Dedicated real-project experience retrieval eval
node .\00_System\Automation\eval-project-experience.mjs .
```

Important: imported project manifests are navigation bootstrap only and use `context-import-needs-repo-check`. They do not count as verified evidence.
