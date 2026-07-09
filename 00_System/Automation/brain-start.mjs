#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const vault = path.resolve(process.argv[2] || process.cwd());
const mode = (process.argv[3] || 'auto').toLowerCase();

const p = (...parts) => path.join(vault, ...parts);
const read = (...parts) => fs.readFileSync(p(...parts), 'utf8');
const exists = (...parts) => fs.existsSync(p(...parts));

const statePath = ['00_System','Runtime State','brain-state.json'];
const hotPath = ['00_System','Runtime State','HOT.md'];
const gapsPath = ['00_System','Runtime State','GAP_REGISTER.md'];

if (!exists(...statePath) || !exists(...hotPath) || !exists(...gapsPath)) {
  console.error('Brain startup failed: missing Runtime State control-plane files.');
  process.exit(1);
}

const state = JSON.parse(read(...statePath));
const hot = read(...hotPath).replace(/^---[\s\S]*?---\s*/m, '').trim();
const gaps = read(...gapsPath).split(/\r?\n/)
  .filter(line => /^\|\s*G-\d+\s*\|/.test(line))
  .map(line => line.split('|').slice(1,-1).map(x => x.trim()))
  .filter(cols => ['OPEN','IN_PROGRESS'].includes(cols[4]));

const routes = {
  auto: ['00_System/Operating Map.md'],
  project: [
    '00_System/Project OS/Universal Project Contract.md',
    '00_System/AI Runtime/Project Resolver Protocol.md',
    '00_System/AI Runtime/Project Agent Boot Protocol.md',
    '00_System/AI Runtime/Repo Inspection Protocol.md'
  ],
  business: ['30_Business/Business HQ.md'],
  research: ['00_System/Knowledge Graph/Source-Backed Knowledge Protocol.md','60_Knowledge/Knowledge HQ.md'],
  personal: ['10_Life/Life HQ.md'],
  skill: ['50_Skills/Skills HQ.md','00_System/Learning System/Lesson and Pattern Promotion Ladder.md'],
  system: ['00_System/Brain Constitution.md','00_System/System Manifest.md','00_System/Governance/System Change Control.md'],
  claude: ['CLAUDE.md','00_System/Claude Code OS/Claude Code Native Runtime.md','00_System/Claude Code OS/Omar Thinking Execution Policy.md']
};

if (!routes[mode]) {
  console.error(`Unknown mode '${mode}'. Use: ${Object.keys(routes).join(', ')}`);
  process.exit(1);
}

console.log('OMAR BRAIN START');
console.log(`Version: ${state.brain_version}`);
console.log(`Status: ${state.status}`);
console.log(`Mode: ${mode}`);
console.log(`Current focus: ${state.current_focus ?? 'none'}`);
console.log(`Active project: ${state.active_project_id ?? 'none'}`);
console.log(`Open gaps: ${gaps.length} (P0/P1: ${gaps.filter(g => ['P0','P1'].includes(g[1])).length})`);
console.log('\nHOT CONTEXT');
console.log(hot);
console.log('\nREAD NEXT');
for (const rel of routes[mode]) console.log(`- ${rel}`);
if (gaps.some(g => ['P0','P1'].includes(g[1]))) {
  console.log('\nCRITICAL OPEN GAPS');
  for (const g of gaps.filter(g => ['P0','P1'].includes(g[1]))) console.log(`- ${g[0]} ${g[1]}: ${g[2]} [${g[4]}]`);
}
