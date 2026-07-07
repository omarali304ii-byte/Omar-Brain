#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const vault = path.resolve(process.argv[2] || process.cwd());
const req = rel => path.join(vault, rel);
const errors = [];
const warnings = [];

const required = [
  '00_System/Operating Map.md',
  '00_System/Runtime State/brain-state.json',
  '00_System/Runtime State/HOT.md',
  '00_System/Runtime State/GAP_REGISTER.md',
  '00_System/Runtime State/OPERATION_LOG.md',
  '00_System/Governance/No Silent Overwrite Policy.md',
  '00_System/Knowledge Graph/Source-Backed Knowledge Protocol.md'
];
for (const rel of required) if (!fs.existsSync(req(rel))) errors.push(`missing ${rel}`);

let state;
try { state = JSON.parse(fs.readFileSync(req('00_System/Runtime State/brain-state.json'),'utf8')); }
catch (e) { errors.push(`invalid brain-state.json: ${e.message}`); }

let gapRows = [];
if (fs.existsSync(req('00_System/Runtime State/GAP_REGISTER.md'))) {
  const text = fs.readFileSync(req('00_System/Runtime State/GAP_REGISTER.md'),'utf8');
  gapRows = text.split(/\r?\n/)
    .filter(line => /^\|\s*G-\d+\s*\|/.test(line))
    .map(line => line.split('|').slice(1,-1).map(x => x.trim()));
  const ids = new Set();
  for (const row of gapRows) {
    if (ids.has(row[0])) errors.push(`duplicate gap id ${row[0]}`);
    ids.add(row[0]);
    if (!['P0','P1','P2','P3'].includes(row[1])) errors.push(`invalid severity ${row[0]}=${row[1]}`);
    if (!['OPEN','IN_PROGRESS','FIXED','DEFERRED','ACCEPTED_RISK'].includes(row[4])) errors.push(`invalid gap status ${row[0]}=${row[4]}`);
    if (row[4] === 'FIXED' && (!row[5] || row[5] === '—')) errors.push(`fixed gap ${row[0]} missing fix evidence`);
  }
}

if (state) {
  const open = gapRows.filter(r => ['OPEN','IN_PROGRESS'].includes(r[4]));
  const p0 = open.filter(r => r[1] === 'P0').length;
  const p1 = open.filter(r => r[1] === 'P1').length;
  const summary = state.open_gaps_summary || {};
  if (summary.open !== open.length) errors.push(`state gap count ${summary.open} != register ${open.length}`);
  if (summary.p0 !== p0) errors.push(`state P0 count ${summary.p0} != register ${p0}`);
  if (summary.p1 !== p1) errors.push(`state P1 count ${summary.p1} != register ${p1}`);
  for (const key of ['startup_map','hot_context','gap_register','operation_log']) {
    if (!state[key] || !fs.existsSync(req(state[key]))) errors.push(`state path '${key}' missing or invalid`);
  }
}

if (fs.existsSync(req('00_System/Runtime State/HOT.md'))) {
  const hot = fs.readFileSync(req('00_System/Runtime State/HOT.md'),'utf8').replace(/^---[\s\S]*?---\s*/m,'').trim();
  if (hot.length > 1600) errors.push(`HOT context too large (${hot.length} chars > 1600)`);
  else if (hot.length > 1200) warnings.push(`HOT context approaching limit (${hot.length} chars)`);
}

console.log(`Runtime consistency errors: ${errors.length}`);
console.log(`Runtime consistency warnings: ${warnings.length}`);
if (errors.length) { console.log('\nERRORS'); for (const e of errors) console.log(`- ${e}`); }
if (warnings.length) { console.log('\nWARNINGS'); for (const w of warnings) console.log(`- ${w}`); }
process.exit(errors.length ? 1 : 0);
