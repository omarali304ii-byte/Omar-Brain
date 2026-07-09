#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const projectPath = process.argv[2];
if (!projectPath) { console.error('Usage: node scaffold-project-council.mjs "40_Projects/Active/<Project Name>"'); process.exit(1); }
const council = path.join(projectPath, '20_Agent_Council');
const agents = ['Architecture','Data and Truth','Integration and Workflow','Logic and Performance','Product and UX','Runtime and Reliability','Quality Engineer'];
const control = ['Supervisor','Project Observer','Toolsmith','Critic Verifier','Memory Curator'];
function writeIfMissing(file, content) { fs.mkdirSync(path.dirname(file), { recursive: true }); if (!fs.existsSync(file)) fs.writeFileSync(file, content.trimStart() + '\n', 'utf8'); }
const simple={
 '00_START_HERE.md': a=>`# ${a} — Start Here\n\n1. Read NEXT_START.md first.\n2. Load current council/runtime state.\n3. Load owned cognitive stack.\n4. Verify repo/runtime freshness.\n5. Start from active work, finding, drift or unknown.\n6. Before stopping update current files and NEXT_START.md.\n`,
 'AGENT_HOME.md': a=>`# ${a} Home\n\n## Mission\nOwn this role's project view.\n\n## Non-goal\nDo not silently take over another agent's model or application implementation.\n`,
 'DOMAIN_MODEL.md': a=>`# ${a} Domain Model\n\n## Freshness\n\`\`\`yaml\nlast_verified_revision: null\nlast_verified_at: null\nverification_scope: not_assessed\nfreshness: unknown\n\`\`\`\n\n## Current model\nNot assessed yet.\n`,
 'OWNED_SURFACE_MAP.md': a=>`# ${a} Owned Surface Map\n\nNot mapped yet.\n`,
 'CHANGE_IMPACT_MAP.md': a=>`# ${a} Change Impact Map\n\n## Activate when\n- owned surface changes.\n\n## Cross-agent handoffs\nNot mapped yet.\n`,
 'RULES.md': a=>`# ${a} Rules\n\nCurrent project-local rules only.\n`,
 'LEARNED_RULES.md': a=>`# ${a} Learned Rules\n\nNo evidence-derived project-local rules recorded yet.\n`,
 'CHECKLIST.md': a=>`# ${a} Checklist\n\n- Confirm current revision.\n- Inspect exact owned reality.\n- Apply learned triggers.\n- Record evidence and required proof.\n- Update NEXT_START before stopping.\n`,
 'FAILURE_PATTERNS.md': a=>`# ${a} Failure Patterns\n\nNo active failure patterns recorded yet.\n`,
 'EVAL_REGISTRY.md': a=>`# ${a} Eval Registry\n\n| Eval ID | Trigger/Rule | Scenario | Command/Procedure | Status | Last proven revision | Evidence |\n|---|---|---|---|---|---|---|\n`,
 'CURRENT_FINDINGS.md': a=>`# ${a} Current Findings\n\nNo active findings recorded yet.\n`,
 'ACTIVE_WORK.md': a=>`# ${a} Active Work\n\n\`\`\`yaml\nstatus: idle\nactive_finding_ids: []\ncurrent_objective: null\nnext_proof: null\n\`\`\`\n`,
 'OPEN_UNKNOWNS.md': a=>`# ${a} Open Unknowns\n\n- Current owned runtime/repo truth not assessed.\n`,
 'EVIDENCE_REQUIREMENTS.md': a=>`# ${a} Evidence Requirements\n\nDefine proof before closing findings.\n`,
 'DECISIONS_TO_REVIEW.md': a=>`# ${a} Decisions To Review\n\nNo open decisions recorded yet.\n`,
 'SELF_REVIEW.md': a=>`# ${a} Self Review\n\n## Current weaknesses\n- surface completeness not yet assessed.\n`,
 'NEXT_START.md': a=>`# ${a} Next Start\n\n\`\`\`yaml\nstatus: ready\nlast_verified_revision: null\nstart_here: verify current project reality\nfirst_files_to_open: []\nactive_finding_ids: []\nopen_unknowns: []\nfirst_action: inspect owned surface and reconcile current model\ndo_not_repeat: []\nproof_needed_next: []\n\`\`\`\n`,
 'HANDOFF.md': a=>`# ${a} Handoff\n\nNo active handoff recorded yet.\n`
};
writeIfMissing(path.join(council,'00_COUNCIL_HOME.md'),`# Project Council Home\n\nCurrent project cognition for specialist agents. History goes to Runs/Evidence.\n`);
writeIfMissing(path.join(council,'01_OPERATING_LOOP.md'),`# Operating Loop\n\nresolve -> deterministic start -> verify freshness -> audit -> work -> prove -> immunity -> reconcile truth -> exact restart\n`);
writeIfMissing(path.join(council,'02_AGENT_ROSTER.md'),`# Agent Roster\n\n${[...control,...agents].map(x=>'- '+x).join('\n')}\n`);
for(const f of ['03_ACTIVATION_MATRIX.md','04_CROSS_AGENT_HANDOFF.md','05_CURRENT_PROJECT_TRUTH.md','06_ENVIRONMENT_AND_REPO_READINESS.md','07_ACTIVE_WORK_BOARD.md','08_RULE_PROMOTION_QUEUE.md','09_AGENT_FINDINGS_INDEX.md']) writeIfMissing(path.join(council,f),`# ${f.replace(/^\d+_|\.md$/g,'').replaceAll('_',' ')}\n\nNot assessed yet.\n`);
for(const [kind,list] of [['Agents',agents],['Control',control]]) for(const a of list){ const dir=path.join(council,kind,a); for(const [f,fn] of Object.entries(simple)) writeIfMissing(path.join(dir,f),fn(a)); }
const rt=path.join(council,'Runtime'); fs.mkdirSync(path.join(rt,'AGENT_STATES'),{recursive:true});
writeIfMissing(path.join(rt,'COUNCIL_STATE.json'),JSON.stringify({council_status:'active',version:'2.0',current_phase:'not_assessed',last_verified_revision:null},null,2));
writeIfMissing(path.join(rt,'LOOP_STATE.json'),JSON.stringify({loop_status:'idle',current_batch:null,recommended_next_action:'inspect project reality',blockers:[]},null,2));
writeIfMissing(path.join(rt,'FRESHNESS_STATE.json'),JSON.stringify({project_revision:null,status:'unknown',agent_freshness:{}},null,2));
writeIfMissing(path.join(rt,'IMMUNITY_REGISTRY.json'),JSON.stringify({version:'1.0',patterns:[],evals:[]},null,2));
writeIfMissing(path.join(rt,'ACTIVATION_HISTORY.jsonl'),''); writeIfMissing(path.join(rt,'LEARNING_EVENTS.jsonl'),'');
for(const a of [...agents,...control]) writeIfMissing(path.join(rt,'AGENT_STATES',a.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.json'),JSON.stringify({agent:a,status:'idle',last_verified_revision:null,active_finding_ids:[],next_start:'see agent NEXT_START.md'},null,2));
for(const d of ['Runs','Evidence','Templates']) fs.mkdirSync(path.join(council,d),{recursive:true});
console.log(`Living Project Council v2 scaffolded at ${council}`);
