#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const vault = path.resolve(process.argv[2] || process.cwd());
const regPath = path.join(vault, '00_System', 'Navigation OS', 'route-registry.json');
const errors = [], warnings = [];

if (!fs.existsSync(regPath)) errors.push('Missing route-registry.json');
let reg = null;
try { reg = JSON.parse(fs.readFileSync(regPath, 'utf8')); } catch (e) { errors.push(`Invalid route registry JSON: ${e.message}`); }

const pathExists = (rel) => {
  if (!rel || /real repository|matched route|linked project|resolved project|60_Knowledge\/Concepts$/.test(rel)) return true;
  return fs.existsSync(path.join(vault, rel));
};

if (reg) {
  const ids = new Set();
  for (const route of reg.routes || []) {
    if (!route.route_id) errors.push('Route missing route_id');
    else if (ids.has(route.route_id)) errors.push(`Duplicate route_id ${route.route_id}`);
    else ids.add(route.route_id);
    for (const key of ['intent','entrypoint','destination','arrival_proof']) if (!route[key]) errors.push(`${route.route_id}: missing ${key}`);
    if (!pathExists(route.entrypoint)) errors.push(`${route.route_id}: missing entrypoint ${route.entrypoint}`);
    for (const rel of route.read_first || []) if (!pathExists(rel)) errors.push(`${route.route_id}: read_first path missing ${rel}`);
    if (!(route.next_signs || []).length) warnings.push(`${route.route_id}: no next_signs`);
  }
}

const hubs = [
  'HOME.md','START HERE.md',
  '10_Life/Life HQ.md','20_Career/Career HQ.md','30_Business/Business HQ.md',
  '40_Projects/Projects HQ.md','50_Skills/Skills HQ.md','60_Knowledge/Knowledge HQ.md',
  '70_People/People HQ.md','80_Reviews/Reviews HQ.md'
];
for (const rel of hubs) {
  const p = path.join(vault, rel);
  if (!fs.existsSync(p)) errors.push(`Missing major hub ${rel}`);
  else if (!/## AI Road Signs/.test(fs.readFileSync(p,'utf8'))) errors.push(`${rel}: missing AI Road Signs section`);
}

console.log(`Navigation registry: ${regPath}`);
console.log(`Routes: ${reg?.routes?.length || 0}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
if (errors.length) { console.log('\nERRORS'); for (const x of errors) console.log(`- ${x}`); }
if (warnings.length) { console.log('\nWARNINGS'); for (const x of warnings) console.log(`- ${x}`); }
process.exit(errors.length ? 1 : 0);
