#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const projectPath = process.argv[2];
if (!projectPath) { console.error('Usage: node validate-project-council.mjs "40_Projects/Active/<Project>"'); process.exit(1); }
const council = path.resolve(process.cwd(), projectPath, '20_Agent_Council');
const agents = ['Architecture','Data and Truth','Integration and Workflow','Logic and Performance','Product and UX','Runtime and Reliability','Quality Engineer'];
const control = ['Supervisor','Project Observer','Toolsmith','Critic Verifier','Memory Curator'];
const required = ['00_START_HERE.md','AGENT_HOME.md','DOMAIN_MODEL.md','OWNED_SURFACE_MAP.md','CHANGE_IMPACT_MAP.md','RULES.md','LEARNED_RULES.md','CHECKLIST.md','FAILURE_PATTERNS.md','EVAL_REGISTRY.md','CURRENT_FINDINGS.md','ACTIVE_WORK.md','OPEN_UNKNOWNS.md','EVIDENCE_REQUIREMENTS.md','DECISIONS_TO_REVIEW.md','SELF_REVIEW.md','NEXT_START.md','HANDOFF.md'];
let errors=[];
for (const [kind,list] of [['Agents',agents],['Control',control]]) {
  for (const name of list) {
    for (const f of required) {
      const p=path.join(council,kind,name,f);
      if (!fs.existsSync(p)) errors.push(`missing ${path.relative(process.cwd(),p)}`);
    }
  }
}
for (const j of ['COUNCIL_STATE.json','LOOP_STATE.json','FRESHNESS_STATE.json','IMMUNITY_REGISTRY.json']) {
  const p=path.join(council,'Runtime',j);
  try { JSON.parse(fs.readFileSync(p,'utf8')); } catch(e) { errors.push(`invalid/missing JSON ${path.relative(process.cwd(),p)}: ${e.message}`); }
}
for (const [kind,list] of [['Agents',agents],['Control',control]]) {
  for (const name of list) {
    const p=path.join(council,kind,name,'NEXT_START.md');
    if (fs.existsSync(p)) {
      const t=fs.readFileSync(p,'utf8');
      for (const key of ['first_action:','last_verified_revision:','proof_needed_next:']) if (!t.includes(key)) errors.push(`invalid NEXT_START ${name}: missing ${key}`);
    }
  }
}
if (errors.length) { console.error(`Council validation FAILED (${errors.length})`); for (const e of errors) console.error(`- ${e}`); process.exit(2); }
console.log('Council validation PASS');
