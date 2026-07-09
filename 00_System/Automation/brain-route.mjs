#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const vault = path.resolve(args[0] || process.cwd());
const query = args.slice(1).join(' ').trim();
if (!query) {
  console.error('Usage: node brain-route.mjs <vault> "<task text>"');
  process.exit(2);
}

const registryPath = path.join(vault, '00_System', 'Navigation OS', 'route-registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const q = query.toLowerCase();

const weights = new Map();
for (const route of registry.routes) {
  let score = 0;
  const matches = [];
  for (const trigger of route.triggers || []) {
    const t = trigger.toLowerCase();
    if (q.includes(t)) {
      const w = Math.max(2, t.split(/\s+/).length * 4);
      score += w;
      matches.push(trigger);
    }
  }
  if (route.route_id === 'route-project-production' && /(production|deploy|harden|final audit|missing|weak)/.test(q)) score += 12;
  if (route.route_id === 'route-project-resume' && /(continue|finish|fix|check|resume)/.test(q) && /project|website|app|repo/.test(q)) score += 6;
  if (route.route_id === 'route-research' && /(research|source|pdf|report|study)/.test(q)) score += 5;
  if (route.route_id === 'route-system' && /(brain|vault|system)/.test(q) && /(upgrade|audit|architecture)/.test(q)) score += 8;
  if (route.route_id === 'route-claude-code' && /(claude code|claude agent|claude hooks|claude skills|think like me|work like me)/.test(q)) score += 18;
  weights.set(route.route_id, {route, score, matches});
}
const ranked = [...weights.values()].sort((a,b)=>b.score-a.score);
const best = ranked[0];
if (!best || best.score <= 0) {
  console.log(JSON.stringify({
    query,
    resolved: false,
    fallback: registry.fallback,
    reason: 'No route had positive evidence'
  }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({
  query,
  resolved: true,
  route_id: best.route.route_id,
  intent: best.route.intent,
  score: best.score,
  matched_triggers: best.matches,
  entrypoint: best.route.entrypoint,
  read_first: best.route.read_first,
  next_signs: best.route.next_signs,
  destination: best.route.destination,
  arrival_proof: best.route.arrival_proof,
  alternatives: ranked.slice(1,4).filter(x=>x.score>0).map(x=>({route_id:x.route.route_id,score:x.score}))
}, null, 2));
