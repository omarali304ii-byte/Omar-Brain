#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const vault = path.resolve(process.argv[2] || process.cwd());
const allowedTypes = new Set([
  'system','template','change-proposal','architecture-profile','area','goal','routine','idea',
  'project','project-note','requirement','feature','task','decision','meeting','run','evidence','blocker',
  'organization','product','client','offer','process','strategy','skill','lesson','pattern','anti-pattern',
  'failure-signature','concept','how-to','problem-solution','playbook','research','source','standard','checklist',
  'person','agent-role','tool-contract','capability','eval-case','eval-result','memory-proposal','episode','daily','weekly-review','monthly-review','quarterly-review','yearly-review'
]);
const allowedStatuses = new Set([
  'inbox','active','paused','waiting','completed','evergreen','deprecated','archived','superseded',
  'candidate','validating','validated','rejected','promoted','proposed','ready','in-progress','blocked',
  'verifying','done','cancelled','checking','ready-for-critic','critic-approved','critic-rejected','needs-evidence','ready-for-curator','committed','merged','episode-only','deferred','completed-with-warnings','failed','interrupted'
]);
const allowedAccess = new Set(['allowed','restricted','denied']);
const allowedProductionStatuses = new Set([
  'NOT_ASSESSED','AUDIT_IN_PROGRESS','BLOCKED','HARDENING','VERIFYING',
  'CANDIDATE_READY','INDEPENDENT_REVIEW','READY_WITH_ACCEPTED_RISKS',
  'PRODUCTION_READY','RELEASED','POST_RELEASE_VERIFIED'
]);

const errors = [];
const warnings = [];
const projectIds = new Map();
const stems = new Map();

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === '.git' || ent.name === 'node_modules') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function parseFrontmatter(text) {
  if (!text.startsWith('---\n') && !text.startsWith('---\r\n')) return null;
  const normalized = text.replace(/\r\n/g, '\n');
  const end = normalized.indexOf('\n---\n', 4);
  if (end < 0) return null;
  const block = normalized.slice(4, end);
  const data = {};
  for (const line of block.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1,-1);
    data[m[1]] = value;
  }
  return { data, block, body: normalized.slice(end + 5) };
}

function normStem(file) {
  return path.basename(file, path.extname(file)).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

const files = walk(vault);
for (const file of files) {
  if (!file.endsWith('.md')) continue;
  const rel = path.relative(vault, file).replaceAll('\\','/');
  const text = fs.readFileSync(file, 'utf8');
  const fm = parseFrontmatter(text);
  const isIndex = path.basename(file).startsWith('_Index');
  const isTemplate = rel.startsWith('00_System/Templates/');

  if (!fm) {
    if (!isIndex) warnings.push(`${rel}: missing parseable frontmatter`);
    continue;
  }
  const { data, block, body } = fm;
  if (!data.type) errors.push(`${rel}: missing type`);
  if (!data.status) errors.push(`${rel}: missing status`);
  if (!data.created && !isTemplate) errors.push(`${rel}: missing created`);
  if (!data.ai_access) errors.push(`${rel}: missing ai_access`);

  if (data.type && !allowedTypes.has(data.type)) errors.push(`${rel}: uncontrolled type '${data.type}'`);
  if (data.status && !allowedStatuses.has(data.status)) errors.push(`${rel}: uncontrolled status '${data.status}'`);
  if (data.ai_access && !allowedAccess.has(data.ai_access)) errors.push(`${rel}: invalid ai_access '${data.ai_access}'`);

  for (const line of block.split('\n')) {
    if (line.includes('{{') && !/^[^:]+:\s*["'].*\{\{.*\}\}.*["']\s*$/.test(line)) {
      errors.push(`${rel}: unquoted template variable in YAML: ${line.trim()}`);
    }
  }

  if (data.type === 'project' && !isTemplate) {
    if (!data.project_id) errors.push(`${rel}: project missing project_id`);
    else {
      if (projectIds.has(data.project_id)) errors.push(`${rel}: duplicate project_id '${data.project_id}' also in ${projectIds.get(data.project_id)}`);
      else projectIds.set(data.project_id, rel);
    }
    if (!data.project_class) errors.push(`${rel}: project missing project_class`);
    if (!data.architecture_profile) errors.push(`${rel}: project missing architecture_profile`);
    if (data.project_kind === 'web') {
      if (!data.web_rule_profile) errors.push(`${rel}: web project missing web_rule_profile`);
    }
    if (data.status === 'active') {
      if (!data.next_action) errors.push(`${rel}: active project missing next_action`);
      if (!data.last_reviewed) warnings.push(`${rel}: active project missing last_reviewed`);
      if (!/## Done definition/i.test(body)) errors.push(`${rel}: active project missing Done definition section`);
      if (!/## Next action/i.test(body)) errors.push(`${rel}: active project missing Next action section`);

      const dir = path.dirname(file);
      const core = ['01_CONTEXT.md','02_REQUIREMENTS.md','08_ROADMAP.md','09_CURRENT_STATE.md','10_EXECUTION_QUEUE.md','14_AGENT_CONTRACT.md','15_MEMORY_SCOPE.md'];
      for (const req of core) if (!fs.existsSync(path.join(dir, req))) errors.push(`${rel}: project packet missing ${req}`);
      if (data.project_class === 'software') {
        if (!data.production_status) errors.push(`${rel}: active software project missing production_status`);
        else if (!allowedProductionStatuses.has(data.production_status)) errors.push(`${rel}: invalid production_status '${data.production_status}'`);
        for (const req of ['03_ARCHITECTURE.md','04_DATA_MODEL.md','05_API_CONTRACTS.md','06_SECURITY.md','07_TEST_STRATEGY.md','11_REPO_MAP.md','12_RUNBOOK.md','16_PRODUCTION_READINESS.md','17_PRODUCTION_HARDENING_QUEUE.md','18_RELEASE_EVIDENCE.md']) {
          if (!fs.existsSync(path.join(dir, req))) errors.push(`${rel}: software project packet missing ${req}`);
        }
      }
      if (data.project_kind === 'web') {
        const webDir = path.join(dir, '13_Web');
        const webReq = ['00_WEB_PROFILE.md','01_APPLICABILITY_MATRIX.md','02_THREAT_MODEL.md','03_FRONTEND_CONTRACT.md','04_BACKEND_CONTRACT.md','05_HTTP_API_CONTRACT.md','06_DATA_INTEGRITY_PLAN.md','07_ACCESSIBILITY_PLAN.md','08_PERFORMANCE_BUDGET.md','09_SEO_DISCOVERABILITY.md','10_OBSERVABILITY_SLO.md','11_WEB_TEST_MATRIX.md','12_RELEASE_GATES.md','13_BROWSER_SUPPORT.md','14_SUPPLY_CHAIN.md'];
        for (const req of webReq) if (!fs.existsSync(path.join(webDir, req))) errors.push(`${rel}: web project packet missing 13_Web/${req}`);
      }

      if (data.last_reviewed && /^\d{4}-\d{2}-\d{2}$/.test(data.last_reviewed)) {
        const ageDays = (Date.now() - new Date(`${data.last_reviewed}T00:00:00Z`).getTime()) / 86400000;
        if (ageDays > 14) warnings.push(`${rel}: active project review is ${Math.floor(ageDays)} days old`);
      }
    }
  }


  if (data.type === 'episode' && !isTemplate) {
    if (!data.episode_id) errors.push(`${rel}: episode missing episode_id`);
    if (data.memory_class !== 'episodic') errors.push(`${rel}: episode must use memory_class episodic`);
  }
  if (data.type === 'memory-proposal' && !isTemplate) {
    if (!data.proposal_id) errors.push(`${rel}: memory proposal missing proposal_id`);
    if (!['semantic','procedural'].includes(data.candidate_memory_class)) errors.push(`${rel}: invalid candidate_memory_class '${data.candidate_memory_class}'`);
  }
  if (data.type === 'agent-role' && !isTemplate && !data.role_id) errors.push(`${rel}: agent-role missing role_id`);
  if (data.type === 'capability' && !isTemplate && !data.capability_id) errors.push(`${rel}: capability missing capability_id`);
  if (data.type === 'eval-case' && !isTemplate && !data.eval_id) errors.push(`${rel}: eval-case missing eval_id`);

  const stem = normStem(file);
  if (stem && !['index','inbox'].includes(stem)) {
    const arr = stems.get(stem) || [];
    arr.push(rel);
    stems.set(stem, arr);
  }
}

const allowedRepeatedProjectStems = new Set(['01 context','02 requirements','03 architecture','04 data model','05 api contracts','06 security','07 test strategy','08 roadmap','09 current state','10 execution queue','11 repo map','12 runbook','14 agent contract','15 memory scope','00 web profile','01 applicability matrix','02 threat model','03 frontend contract','04 backend contract','05 http api contract','06 data integrity plan','07 accessibility plan','08 performance budget','09 seo discoverability','10 observability slo','11 web test matrix','12 release gates','13 browser support','14 supply chain']);
for (const [stem, rels] of stems) {
  const repeatedProjectPacket = allowedRepeatedProjectStems.has(stem) && rels.every(r => r.startsWith('40_Projects/'));
  if (rels.length > 1 && !rels.every(r => r.startsWith('00_System/Templates/')) && !repeatedProjectPacket) {
    warnings.push(`Suspicious duplicate filename '${stem}': ${rels.join(' | ')}`);
  }
}


const webRulesPath = path.join(vault, '00_System', 'Web Development Expert System', 'web-rules.json');
if (!fs.existsSync(webRulesPath)) errors.push('Web Expert: missing web-rules.json');
else {
  try {
    const wr = JSON.parse(fs.readFileSync(webRulesPath, 'utf8'));
    const ids = new Set();
    for (const rule of (wr.rules || [])) {
      if (!rule.id || !/^WEB-[A-Z0-9]+-\d{3}$/.test(rule.id)) errors.push(`Web Expert: invalid rule id '${rule.id}'`);
      if (ids.has(rule.id)) errors.push(`Web Expert: duplicate rule id '${rule.id}'`);
      ids.add(rule.id);
      if (!['blocker','critical','major','minor'].includes(rule.severity)) errors.push(`Web Expert: invalid severity for ${rule.id}`);
      if (!rule.rule || !rule.evidence || !Array.isArray(rule.source_ids) || rule.source_ids.length === 0) errors.push(`Web Expert: incomplete rule ${rule.id}`);
    }
    if ((wr.rule_count || 0) !== (wr.rules || []).length) errors.push('Web Expert: rule_count does not match rules length');
    if ((wr.rules || []).length < 150) warnings.push(`Web Expert: unexpectedly small rule registry (${(wr.rules || []).length})`);
  } catch (e) { errors.push(`Web Expert: invalid web-rules.json: ${e.message}`); }
}


// Dynamic Brain v6 required control plane
const v4Required = [
  '00_System/Operating Map.md',
  '00_System/Navigation OS/Road Sign Navigation System.md',
  '00_System/Navigation OS/Intersection Sign Standard.md',
  '00_System/Navigation OS/route-registry.json',
  '00_System/Production Readiness OS/Production Readiness Operating System.md',
  '00_System/Production Readiness OS/Universal Production Hardening Matrix.md',
  '00_System/Production Readiness OS/Production Status State Machine.md',
  '00_System/Production Readiness OS/Production Evidence Contract.md',
  '00_System/Agent OS/Production Hardener Agent Contract.md',
  '00_System/Runtime State/brain-state.json',
  '00_System/Runtime State/HOT.md',
  '00_System/Runtime State/GAP_REGISTER.md',
  '00_System/Runtime State/OPERATION_LOG.md',
  '00_System/Governance/No Silent Overwrite Policy.md',
  '00_System/Knowledge Graph/Source-Backed Knowledge Protocol.md',
  '00_System/Memory OS/Memory OS.md',
  '00_System/Retrieval OS/Retrieval OS.md',
  '00_System/Agent OS/Multi-Agent Operating Model.md',
  '00_System/Dynamic Brain/Dynamic Brain Control Loop.md',
  '00_System/Evaluation/Evaluation Operating System.md',
  '00_System/Retrieval OS/retrieval-profile.json',
  '00_System/Agent OS/agent-registry.json',
  '00_System/Dynamic Brain/brain-runtime-contract.json',
  '00_System/Evaluation/eval-cases.json',
  '00_System/Runtime Integration/runtime-integration-profile.json'
];
for (const req of v4Required) if (!fs.existsSync(path.join(vault, req))) errors.push(`Dynamic Brain v4: missing ${req}`);
for (const jf of v4Required.filter(x=>x.endsWith('.json'))) {
  try { JSON.parse(fs.readFileSync(path.join(vault,jf),'utf8')); } catch(e) { errors.push(`Dynamic Brain v4: invalid JSON ${jf}: ${e.message}`); }
}

// Skill OS registry
const skillRequired = [
  '00_System/Skill OS/Skill Marketplace Operating System.md',
  '00_System/Skill OS/Skill Maturity Ladder.md',
  '00_System/Skill OS/skill-registry.json',
  '00_System/Automation/skill-route.mjs',
  '00_System/Automation/check-skill-registry.mjs'
];
for (const req of skillRequired) if (!fs.existsSync(path.join(vault, req))) errors.push(`Skill OS: missing ${req}`);
const skillRegistryPath = path.join(vault,'00_System','Skill OS','skill-registry.json');
if (fs.existsSync(skillRegistryPath)) {
  try {
    const sr = JSON.parse(fs.readFileSync(skillRegistryPath,'utf8'));
    const ids = new Set(); const pathsSeen = new Set();
    const maturity = new Set(['S0_DISCOVERED','S1_IMPORTED','S2_REVIEWED','S3_APPLIED','S4_VERIFIED','S5_PRODUCTION_PROVEN','S6_ADAPTIVE']);
    for (const s of (sr.skills || [])) {
      if (!s.skill_id || ids.has(s.skill_id)) errors.push(`Skill OS: missing/duplicate skill_id '${s.skill_id}'`); else ids.add(s.skill_id);
      if (!s.path || pathsSeen.has(s.path)) errors.push(`Skill OS: missing/duplicate skill path '${s.path}'`); else pathsSeen.add(s.path);
      if (s.path && !fs.existsSync(path.join(vault,s.path))) errors.push(`Skill OS: missing skill file ${s.path}`);
      if (!maturity.has(s.maturity)) errors.push(`Skill OS: invalid maturity for ${s.skill_id}: ${s.maturity}`);
      if (!Array.isArray(s.triggers) || !s.triggers.length) errors.push(`Skill OS: no triggers for ${s.skill_id}`);
      if (!s.source_repo || !s.source_path) errors.push(`Skill OS: missing provenance for ${s.skill_id}`);
    }
    if ((sr.skills || []).length < 20) warnings.push(`Skill OS: unexpectedly small registry (${(sr.skills || []).length})`);
  } catch(e) { errors.push(`Skill OS: invalid skill-registry.json: ${e.message}`); }
}


// Skill OS v8 required graph runtime
const skillV8Required = [
  '00_System/Skill OS/Skill Graph Standard.md',
  '00_System/Skill OS/Skill Composition and Handoff Protocol.md',
  '00_System/Skill OS/Skill Development Lifecycle.md',
  '00_System/Skill OS/Skill Evidence Ledger.md',
  '00_System/Skill OS/skill-graph.json',
  '00_System/Skill OS/skill-bundles.json',
  '00_System/Skill OS/skill-candidates.json',
  '00_System/Automation/skill-stack.mjs',
  '00_System/Automation/check-skill-connectivity.mjs',
  '00_System/Automation/skill-dev.mjs',
  '00_System/Automation/skill-evidence.mjs'
];
for (const req of skillV8Required) if (!fs.existsSync(path.join(vault, req))) errors.push(`Skill OS v8: missing ${req}`);
for (const jf of skillV8Required.filter(x=>x.endsWith('.json'))) {
  try { JSON.parse(fs.readFileSync(path.join(vault,jf),'utf8')); } catch(e) { errors.push(`Skill OS v8: invalid JSON ${jf}: ${e.message}`); }
}

const agentRegistryPath=path.join(vault,'00_System','Agent OS','agent-registry.json');
if(fs.existsSync(agentRegistryPath)){
  try {
    const ar=JSON.parse(fs.readFileSync(agentRegistryPath,'utf8'));
    const writers=(ar.roles||[]).filter(r=>r.may_commit_memory);
    if(writers.length!==1||writers[0].id!=='memory-curator') errors.push('Dynamic Brain v6: agent registry must have exactly one default durable memory writer: memory-curator');
    if(!(ar.roles||[]).some(r=>r.id==='production-hardener')) errors.push('Dynamic Brain v6: agent registry missing production-hardener role');
  } catch {}
}


// Connected Intelligence v9 required control fabric
const v9Required = [
  '00_System/Connected Intelligence OS/Connected Intelligence Operating System.md',
  '00_System/Connected Intelligence OS/Universal Object Contract.md',
  '00_System/Connected Intelligence OS/Relationship Ontology.md',
  '00_System/Connected Intelligence OS/Brain Transaction Protocol.md',
  '00_System/Connected Intelligence OS/Universal Ingestion Gateway.md',
  '00_System/Connected Intelligence OS/Causal Lineage Standard.md',
  '00_System/Connected Intelligence OS/Experience Compiler.md',
  '00_System/Connected Intelligence OS/No Orphan Information Policy.md',
  '00_System/Connected Intelligence OS/object-registry.json',
  '00_System/Connected Intelligence OS/relation-vocabulary.json',
  '00_System/Connected Intelligence OS/edge-ledger.jsonl',
  '00_System/Connected Intelligence OS/event-ledger.jsonl',
  '00_System/Connected Intelligence OS/provenance-ledger.jsonl',
  '00_System/Connected Intelligence OS/transaction-ledger.jsonl',
  '00_System/Connected Intelligence OS/impact-queue.json',
  '00_System/Connected Intelligence OS/learning-candidates.json',
  '00_System/Automation/brain-ingest.mjs',
  '00_System/Automation/brain-transaction.mjs',
  '00_System/Automation/context-plan.mjs',
  '00_System/Automation/new-run.mjs',
  '00_System/Automation/new-evidence.mjs',
  '00_System/Automation/experience-compile.mjs',
  '00_System/Automation/reality-coverage.mjs',
  '00_System/Automation/reality-eval.mjs',
  '00_System/Automation/check-causal-integrity.mjs',
  '00_System/Automation/check-orphan-information.mjs'
];
for (const req of v9Required) if (!fs.existsSync(path.join(vault, req))) errors.push(`Connected Intelligence v9: missing ${req}`);
for (const jf of v9Required.filter(x=>x.endsWith('.json'))) {
  try { JSON.parse(fs.readFileSync(path.join(vault,jf),'utf8')); } catch(e) { errors.push(`Connected Intelligence v9: invalid JSON ${jf}: ${e.message}`); }
}
if (fs.existsSync(path.join(vault,'00_System','Connected Intelligence OS','object-registry.json'))) {
  try {
    const or=JSON.parse(fs.readFileSync(path.join(vault,'00_System','Connected Intelligence OS','object-registry.json'),'utf8'));
    const ids=new Set();
    for(const o of (or.objects||[])){
      if(!o.object_id||ids.has(o.object_id))errors.push(`Connected Intelligence v9: missing/duplicate object_id '${o.object_id}'`); else ids.add(o.object_id);
      if(!o.object_type||!o.status||!o.authority||!o.verification_state)errors.push(`Connected Intelligence v9: incomplete object ${o.object_id}`);
    }
  } catch {}
}

console.log(`Vault: ${vault}`);
console.log(`Markdown files checked: ${files.filter(f => f.endsWith('.md')).length}`);
console.log(`Projects found: ${projectIds.size}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (errors.length) {
  console.log('\nERRORS');
  for (const e of errors) console.log(`- ${e}`);
}
if (warnings.length) {
  console.log('\nWARNINGS');
  for (const w of warnings) console.log(`- ${w}`);
}
process.exit(errors.length ? 1 : 0);
