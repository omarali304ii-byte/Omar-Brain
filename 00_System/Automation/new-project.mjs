#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const get = (name, fallback = '') => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};

const name = get('name');
const projectId = get('id');
const projectClass = get('class', 'software');
const projectKind = get('kind', projectClass === 'software' ? 'generic' : projectClass);
const domain = get('domain', 'business');
const vault = path.resolve(get('vault', process.cwd()));

if (!name || !projectId) {
  console.error('Usage: node new-project.mjs --name "Project X" --id "prj-project-x" [--class software] [--kind web|generic] [--domain business] [--vault path]');
  process.exit(2);
}

const allowedClasses = new Set(['software', 'business', 'research', 'personal', 'learning']);
const profiles = {
  software: projectKind === 'web' ? 'web-expert-v1' : 'software-standard-v1',
  business: 'business-project-v1',
  research: 'research-project-v1',
  personal: 'personal-project-v1',
  learning: 'learning-project-v1'
};
if (!allowedClasses.has(projectClass)) {
  console.error(`Invalid project class: ${projectClass}`);
  process.exit(2);
}
if (!['life', 'career', 'business'].includes(domain)) {
  console.error(`Invalid domain: ${domain}`);
  process.exit(2);
}

const projectDir = path.join(vault, '40_Projects', 'Active', name);
if (fs.existsSync(projectDir)) {
  console.error(`Refusing to overwrite existing project folder: ${projectDir}`);
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
const yamlString = (v) => JSON.stringify(v);
const projectLink = `[[${name}]]`;
const commonFm = (type, topics = []) => `---\ntype: ${type}\nstatus: active\ncreated: ${date}\nupdated: ${date}\ntopics: [${topics.join(', ')}]\nai_access: allowed\nproject: ${yamlString(projectLink)}\nlast_reviewed: ${date}\n---\n`;

fs.mkdirSync(projectDir, { recursive: true });
for (const d of ['15_Ideas','20_Decisions','40_Tasks','50_Research','60_Problems','70_Evidence','80_Runs','90_Archive']) fs.mkdirSync(path.join(projectDir, d), { recursive: true });
if (projectClass === 'software') {
  for (const d of ['30_Features']) fs.mkdirSync(path.join(projectDir, d), { recursive: true });
}

const manifest = {
  manifest_version: '1.0',
  project_id: projectId,
  title: name,
  aliases: [],
  ambiguous_aliases: [],
  status: 'active',
  project_class: projectClass,
  project_kind: projectKind,
  canonical_packet_path: path.relative(vault, projectDir).replaceAll('\\','/'),
  packet_status: 'full-project-packet',
  verification_state: 'scaffold-created-needs-repo-check',
  authority: 'contextual',
  repo_url: null,
  local_path: null,
  entrypoints: {
    context: '01_CONTEXT.md',
    requirements: '02_REQUIREMENTS.md',
    current_state: '09_CURRENT_STATE.md',
    execution_queue: '10_EXECUTION_QUEUE.md',
    repo_map: projectClass === 'software' ? '11_REPO_MAP.md' : null
  },
  learning: { runs: path.relative(vault, path.join(projectDir,'80_Runs')).replaceAll('\\','/'), evidence: path.relative(vault, path.join(projectDir,'70_Evidence')).replaceAll('\\','/'), episodes: '85_Episodes' },
  source_boundary: 'Scaffold identity only. Inspect real repository/runtime before current-truth claims.',
  updated: date
};
fs.writeFileSync(path.join(projectDir, 'PROJECT_MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n', {encoding:'utf8', flag:'wx'});
const manifestRegistryDir = path.join(vault, '40_Projects', 'Manifests');
fs.mkdirSync(manifestRegistryDir, {recursive:true});
fs.writeFileSync(path.join(manifestRegistryDir, `${projectId}.json`), JSON.stringify(manifest, null, 2) + '\n', {encoding:'utf8', flag:'wx'});
const ciRoot = path.join(vault, '00_System', 'Connected Intelligence OS');
const objectRegistryPath = path.join(ciRoot, 'object-registry.json');
if (fs.existsSync(objectRegistryPath)) {
  const or = JSON.parse(fs.readFileSync(objectRegistryPath, 'utf8'));
  or.objects = or.objects || [];
  const objectId = `obj-${projectId.startsWith('prj-') ? projectId.slice(4) : projectId}`;
  if (or.objects.some(o => o.object_id === objectId || o.project_id === projectId)) {
    console.error(`Connected Intelligence registry already contains project ${projectId}`);
    process.exit(1);
  }
  const ts = new Date().toISOString();
  or.objects.push({object_id:objectId, object_type:'project', title:name, aliases:[], ambiguous_aliases:[], canonical_path:path.relative(vault,path.join(projectDir,'PROJECT_MANIFEST.json')).replaceAll('\\','/'), status:'active', authority:'contextual', verification_state:'scaffold-created-needs-repo-check', project_id:projectId, summary:`Project scaffold for ${name}`, created_at:ts, updated_at:ts});
  or.updated = date;
  fs.writeFileSync(objectRegistryPath, JSON.stringify(or,null,2)+'\n','utf8');
  const provPath = path.join(ciRoot,'provenance-ledger.jsonl');
  fs.appendFileSync(provPath, JSON.stringify({provenance_id:`prov-${projectId}-${Date.now().toString(36)}`,object_id:objectId,source_type:'project-scaffold',source_ref:path.relative(vault,projectDir).replaceAll('\\','/'),authority:'contextual',verification_state:'scaffold-created-needs-repo-check',recorded_at:ts,note:'Identity and packet scaffold only; verify real repository/runtime.'})+'\n','utf8');
}


const files = new Map();
files.set(`${name}.md`, `---\ntype: project\nstatus: active\ncreated: ${date}\nupdated: ${date}\ndomains: [${domain}]\ntopics: []\naliases: []\nai_access: allowed\nproject_id: ${projectId}\nproject_class: ${projectClass}\narchitecture_profile: ${profiles[projectClass]}\nproject_kind: ${projectKind}\nweb_rule_profile: ${projectKind === 'web' ? 'web-expert-v1' : ''}\nagent_profile: supervisor-led-v1\nretrieval_profile: retrieval-hybrid-v1\nmemory_scope: project-first\nphase: foundation\nhealth: unknown\npriority: P2\nrepo_url:\nlocal_path:\nprimary_branch: main\ncurrent_batch:\nproduction_status: NOT_ASSESSED\nnext_action: Define first verified batch\nstarted: ${date}\ntarget_date:\nlast_reviewed: ${date}\n---\n# ${name}\n\n## Outcome\n\n## Done definition\n- [ ]\n\n## Why this matters\n\n## Scope\n### In\n- \n### Out\n- \n\n## Current phase\nFoundation\n\n## Current health\nUnknown until first verification.\n\n## Next action\n- [ ] Define first verified batch.\n\n## Blockers\n- None known.\n\n## Truth map\n- [[01_CONTEXT]]\n- [[02_REQUIREMENTS]]\n- [[08_ROADMAP]]\n- [[09_CURRENT_STATE]]\n- [[10_EXECUTION_QUEUE]]\n- [[14_AGENT_CONTRACT]]\n- [[15_MEMORY_SCOPE]]\n- [[16_PRODUCTION_READINESS]]\n- [[17_PRODUCTION_HARDENING_QUEUE]]\n- [[18_RELEASE_EVIDENCE]]\n\n## Key decisions\n- \n\n## Repository\n- \n`);

files.set('01_CONTEXT.md', `${commonFm('project-note', ['project-context','ai-context'])}# Project Context\n\n> Compact AI boot cache. Source documents overrule this file.\n\n## One-sentence mission\n\n## Current outcome\n\n## Current phase\nFoundation\n\n## Critical invariants\n- \n\n## Current stack\n\n## Current batch\n\n## Exact next action\nDefine first verified batch.\n\n## Active blockers\nNone known.\n\n## Verification commands\n\`\`\`text\n\n\`\`\`\n`);
files.set('02_REQUIREMENTS.md', `${commonFm('requirement', ['requirements'])}# Requirements\n\n## Outcome requirements\n\n## Functional requirements\n\n## Non-functional requirements\n\n## Constraints\n\n## Non-scope\n\n## Open questions\n`);
files.set('08_ROADMAP.md', `${commonFm('project-note', ['roadmap','phases'])}# Roadmap\n\n## Phase 0 — Discovery / recovery\n\n## Phase 1 — Foundation\n\n## Phase 2 — Core outcome\n\n## Phase 3 — Verification\n\n## Phase 4 — Release / handoff\n`);
files.set('09_CURRENT_STATE.md', `${commonFm('project-note', ['current-state'])}# Current State\n\n> Current truth only.\n\n## Executive state\nNew scaffold; not yet verified.\n\n## Verified working\n- \n\n## Partially working\n- \n\n## Not implemented\n- \n\n## Verification status\nNot yet established.\n\n## Active blockers\nNone known.\n\n## Exact next action\nDefine first verified batch.\n`);
files.set('10_EXECUTION_QUEUE.md', `${commonFm('project-note', ['execution-queue','tasks'])}# Execution Queue\n\n## Current batch\n\n## Ready\n- [ ] Define first verified batch — acceptance and verification required.\n\n## In progress\n- \n\n## Verifying\n- \n\n## Blocked\n- \n\n## Recently done\n- \n`);

if (projectClass === 'software') {
  files.set('03_ARCHITECTURE.md', `${commonFm('project-note', ['architecture'])}# Architecture\n\n## Architecture goal\n\n## Primary flow\n\`\`\`text\nUI → action/controller → service/use case → permission/policy → transaction → repository/gateway → DB/provider → event/audit → response\n\`\`\`\n\n## Modules and responsibilities\n\n## Trust boundaries\n\n## Data flow\n\n## Invariants\n- UI never writes directly to DB.\n- Services own business rules.\n- Repositories own persistence mechanics.\n`);
  files.set('04_DATA_MODEL.md', `${commonFm('project-note', ['data-model','schema'])}# Data Model\n\n## Authoritative entities\n\n## Relationships\n\n## Tenant/ownership model\n\n## Source-of-truth matrix\n\n## Transaction boundaries\n\n## Idempotency and concurrency\n\n## Migrations\n\n## Audit/events\n`);
  files.set('05_API_CONTRACTS.md', `${commonFm('project-note', ['api','contracts'])}# API Contracts\n\n## Authentication and authorization\n\n## Endpoints / actions\n\n## External provider contracts\n`);
  files.set('06_SECURITY.md', `${commonFm('project-note', ['security']).replace('ai_access: allowed','ai_access: restricted')}# Security\n\n## Assets to protect\n\n## Trust boundaries\n\n## Authentication\n\n## Authorization\n\n## Tenant isolation\n\n## Secrets and tokens\n\n## Threats and mitigations\n`);
  files.set('07_TEST_STRATEGY.md', `${commonFm('project-note', ['testing','verification'])}# Test Strategy\n\n## Risk map\n\n## Verification commands\n\`\`\`text\n\n\`\`\`\n\n## Unit\n\n## Integration\n\n## E2E\n\n## Permanent story / smoke path\n`);
  files.set('11_REPO_MAP.md', `${commonFm('project-note', ['repository','repo-map'])}# Repo Map\n\n## Repository identity\n- URL:\n- Local path:\n- Primary branch: main\n\n## Workspace/packages\n\n## Entry points\n\n## Feature modules\n\n## Data/schema/migrations\n\n## Tests\n\n## Build/run commands\n`);
  files.set('12_RUNBOOK.md', `${commonFm('project-note', ['runbook','operations']).replace('ai_access: allowed','ai_access: restricted')}# Runbook\n\n## Prerequisites\n\n## Local start\n\n## Verification\n\n## Database/migrations\n\n## Deployment\n\n## Recovery\n\n> Do not store actual secrets here.\n`);
  files.set('16_PRODUCTION_READINESS.md', `${commonFm('project-note', ['production','audit','readiness']).replace('ai_access: allowed','ai_access: restricted')}# Production Readiness\n\n## Audit identity\n- Repo:\n- Branch:\n- Revision:\n- Worktree:\n- Stack:\n- Deployment target:\n\n## Production status\n\`NOT_ASSESSED\`\n\n## Applicability\n| Matrix ID | REQUIRED / N/A / DEFERRED | Reason |\n|---|---|---|\n\n## Findings summary\n- Open P0: unknown\n- Open P1: unknown\n- Open P2: unknown\n- Open P3: unknown\n\n## Findings\n| ID | Matrix | Severity | Status | Title | Evidence | Verification |\n|---|---|---|---|---|---|---|\n\n## Critical journeys\n\n## Commands and runtime checks\n\n## Known risks\n\n## Critic verdict\nPending.\n`);
  files.set('17_PRODUCTION_HARDENING_QUEUE.md', `${commonFm('project-note', ['production','hardening','queue']).replace('ai_access: allowed','ai_access: restricted')}# Production Hardening Queue\n\n## Current batch\n\n## Ready\n| Finding | Severity | Dependency | Fix | Verification |\n|---|---|---|---|---|\n\n## In progress\n\n## Verifying\n\n## Blocked\n\n## Fixed with evidence\n\n## Accepted risks\n`);
  files.set('18_RELEASE_EVIDENCE.md', `${commonFm('evidence', ['production','release','evidence']).replace('ai_access: allowed','ai_access: restricted')}# Production Release Evidence\n\n## Candidate identity\n- Revision:\n- Artifact:\n- Environment:\n- Deployment target:\n\n## Gate results\n| Gate | Result | Evidence |\n|---|---|---|\n\n## Commands\n\n## Negative security/authorization checks\n\n## Critical journey smoke\n\n## Data/migration/backup/recovery proof\n\n## Observability and health proof\n\n## Remaining risks\n\n## Independent Critic verdict\n\n## Final status\n\`NOT_ASSESSED\`\n`);
}


files.set('14_AGENT_CONTRACT.md', `${commonFm('project-note', ['agents','execution-contract'])}# Agent Contract

## Default orchestration
Supervisor-led. Use the fewest specialists necessary.

## Required boot
- Canonical project note
- 01_CONTEXT
- 09_CURRENT_STATE
- 10_EXECUTION_QUEUE
- Applicable architecture profile
- 15_MEMORY_SCOPE
- Real repository/runtime state when available

## Durable memory
Workers may propose; only the Memory Curator commits semantic/procedural memory.

## Allowed tools

## High-risk actions

## Verification authority
Critic/Verifier independently checks acceptance criteria before completion.

## Stop conditions
Follow global Stop Conditions and Blocker Policy.
`);
files.set('15_MEMORY_SCOPE.md', `${commonFm('project-note', ['memory','retrieval-scope'])}# Memory Scope

## Retrieval priority
1. This project's current truth
2. Applicable project decisions
3. Architecture/profile procedures
4. Relevant recent runs
5. Cross-project validated patterns
6. General knowledge

## Semantic memory owners

## Episodic memory
Project runs live in 80_Runs and are append-only summaries.

## Procedural memory

## Restricted/denied context

## Promotion rules
Project lessons become global patterns only through the learning and memory promotion pipelines.
`);


if (projectClass === 'software' && projectKind === 'web') {
  const webDir = path.join(projectDir, '13_Web');
  fs.mkdirSync(webDir, { recursive: true });
  const wf = (topics = []) => commonFm('project-note', ['web-development', ...topics]);
  const webFiles = new Map([
    ['00_WEB_PROFILE.md', `${wf(['web-profile'])}# Web Profile\n\n## Project facts\n\`\`\`yaml\npublic:\nindexable:\nauthenticated:\nadmin:\npersonal_data:\nsensitive_data:\nmulti_tenant:\nexternal_integrations:\noauth:\nwebhooks:\nrealtime:\nfile_upload:\npayments:\necommerce:\npwa:\noffline:\npush:\nlocalized:\nrtl:\ncritical_production:\nmulti_client_api:\n\`\`\`\n\n## Targets\n- ASVS: Level 2 default until risk review\n- WCAG: 2.2 AA for user-facing UI\n- Core Web Vitals: p75 LCP <=2.5s, INP <=200ms, CLS <=0.1\n- Browser support:\n- SLO:\n\n## Highest risks\n`],
    ['01_APPLICABILITY_MATRIX.md', `${wf(['applicability','rules'])}# Web Applicability Matrix\n\n| Rule ID | State | Reason/Evidence | Owner | Expiry/Trigger |\n|---|---|---|---|---|\n`],
    ['02_THREAT_MODEL.md', `${wf(['threat-model','security']).replace('ai_access: allowed','ai_access: restricted')}# Web Threat Model\n\n## Assets\n## Actors\n## Entry points\n## Trust boundaries\n## Abuse cases\n| Abuse case | Impact | Control rule IDs | Verification |\n|---|---|---|---|\n## Residual risk\n`],
    ['03_FRONTEND_CONTRACT.md', `${wf(['frontend','ui'])}# Frontend Contract\n\n## Rendering model\n## State ownership\n## Navigation/URL state\n## Component boundaries\n## Async state matrix\n## Responsive support\n## Accessibility semantics\n`],
    ['04_BACKEND_CONTRACT.md', `${wf(['backend','services'])}# Backend Contract\n\n## Request flow\n## Use cases/services\n## Permission boundaries\n## Transactions\n## Background work\n## External gateways\n## Failure modes\n`],
    ['05_HTTP_API_CONTRACT.md', `${wf(['api','http'])}# HTTP API Contract\n\n## API consumers\n## OpenAPI version/artifact\n## Authentication\n## Error contract\n## Pagination/filtering\n## Idempotency/concurrency\n## Compatibility/deprecation\n## Webhooks/realtime\n`],
    ['06_DATA_INTEGRITY_PLAN.md', `${wf(['data','integrity'])}# Data Integrity Plan\n\n## Source-of-truth matrix\n## Constraints\n## Tenant ownership\n## Transactions\n## Migrations\n## Backup/restore\n## Reconciliation\n## Retention/deletion\n`],
    ['07_ACCESSIBILITY_PLAN.md', `${wf(['accessibility','wcag'])}# Accessibility Plan\n\n## Target\nWCAG 2.2 AA unless approved otherwise.\n\n## Critical journeys\n## Keyboard/manual checks\n## Assistive-technology checks\n## Automated checks\n## Known exceptions\n`],
    ['08_PERFORMANCE_BUDGET.md', `${wf(['performance','web-vitals'])}# Performance Budget\n\n## Field targets\n- LCP p75 <= 2.5s\n- INP p75 <= 200ms\n- CLS p75 <= 0.1\n\n## Route/resource budgets\n## Server/API budgets\n## Field measurement\n## Regression gate\n`],
    ['09_SEO_DISCOVERABILITY.md', `${wf(['seo','discoverability'])}# SEO and Discoverability\n\n## Applicability\n## Indexable URL inventory\n## Canonical rules\n## Metadata\n## Structured data\n## Sitemap/crawl\n## Monitoring\n`],
    ['10_OBSERVABILITY_SLO.md', `${wf(['observability','slo'])}# Observability and SLO\n\n## Critical journeys\n## SLIs/SLOs\n## Traces\n## Metrics\n## Logs\n## Business signals\n## Alerts/runbooks\n`],
    ['11_WEB_TEST_MATRIX.md', `${wf(['testing','matrix'])}# Web Test Matrix\n\n| Risk/Journey | Unit | Integration | Contract | E2E | A11y | Security | Perf | Runtime |\n|---|---|---|---|---|---|---|---|---|\n\n## Browser/device matrix\n## Failure injection\n## Verification commands\n`],
    ['12_RELEASE_GATES.md', `${wf(['release','quality-gates'])}# Web Release Gates\n\n## Blocker rules\n## Critical rules\n## Migration gate\n## Accessibility gate\n## Security gate\n## Performance gate\n## Deployed smoke\n## Post-release verification\n## Rollback/roll-forward\n`],
    ['13_BROWSER_SUPPORT.md', `${wf(['browser-support','compatibility'])}# Browser Support\n\n## Supported browsers/devices\n## Minimum versions policy\n## Progressive enhancement\n## Polyfill policy\n## Real-device evidence\n`],
    ['14_SUPPLY_CHAIN.md', `${wf(['supply-chain','dependencies'])}# Supply Chain\n\n## Package manager/lockfile\n## Dependency review\n## Vulnerability management\n## CI permissions\n## Secret scanning\n## Artifact provenance target\n## SLSA target if applicable\n`],
  ]);
  for (const [rel, content] of webFiles) fs.writeFileSync(path.join(webDir, rel), content, { encoding: 'utf8', flag: 'wx' });
}

for (const [rel, content] of files) {
  fs.writeFileSync(path.join(projectDir, rel), content, { encoding: 'utf8', flag: 'wx' });
}

console.log(`Created ${projectClass} project scaffold:`);
console.log(projectDir);
console.log(`Project ID: ${projectId}`);
console.log(`Profile: ${profiles[projectClass]}`);
console.log(`Manifest: ${path.join(projectDir, 'PROJECT_MANIFEST.json')}`);
