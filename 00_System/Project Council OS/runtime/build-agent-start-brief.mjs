#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const projectPath = process.argv[2];
const agentName = process.argv[3];
if (!projectPath || !agentName) {
  console.error('Usage: node build-agent-start-brief.mjs "40_Projects/Active/<Project>" "<Agent Name>"');
  process.exit(1);
}
const root = process.cwd();
const project = path.resolve(root, projectPath);
const council = path.join(project, '20_Agent_Council');
const specialist = path.join(council, 'Agents', agentName);
const control = path.join(council, 'Control', agentName);
const agentDir = fs.existsSync(specialist) ? specialist : control;
if (!fs.existsSync(agentDir)) {
  console.error(`Agent folder not found for ${agentName}`);
  process.exit(2);
}

const read = p => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '[MISSING]';
const compact = (s, max=9000) => s.length > max ? s.slice(0,max) + '\n...[TRUNCATED: open authoritative file for full content]' : s;
const files = [
  'NEXT_START.md','00_START_HERE.md','AGENT_HOME.md','DOMAIN_MODEL.md','OWNED_SURFACE_MAP.md',
  'ACTIVE_WORK.md','RULES.md','LEARNED_RULES.md','FAILURE_PATTERNS.md','EVAL_REGISTRY.md',
  'CURRENT_FINDINGS.md','OPEN_UNKNOWNS.md','EVIDENCE_REQUIREMENTS.md','HANDOFF.md'
];
const controlFiles = [
  path.join(council,'Runtime','COUNCIL_STATE.json'),
  path.join(council,'Runtime','LOOP_STATE.json'),
  path.join(council,'07_ACTIVE_WORK_BOARD.md'),
  path.join(council,'09_AGENT_FINDINGS_INDEX.md')
];

console.log(`# Deterministic Start Brief\nagent: ${agentName}\nproject: ${projectPath}\n`);
console.log('## Control plane');
for (const f of controlFiles) {
  console.log(`\n### ${path.relative(root,f)}\n${compact(read(f), 5000)}`);
}
console.log('\n## Agent cognition');
for (const f of files) {
  const p=path.join(agentDir,f);
  console.log(`\n### ${path.relative(root,p)}\n${compact(read(p))}`);
}
console.log('\n## Entry invariant');
console.log('Verify current repo/runtime reality before treating revision-bound claims as current. Start from NEXT_START; do not broad-explore by default.');
