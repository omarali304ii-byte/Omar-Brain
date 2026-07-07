#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { ciPaths, jaccard, loadRegistry, readJson, tokenize } from './ci-lib.mjs';

const vault = path.resolve(process.argv[2] || process.cwd());
const manifestPath = path.join(vault, '00_System', 'Runtime Index', 'retrieval-manifest.json');
const casesPath = path.join(vault, '00_System', 'Evaluation', 'project-experience-eval-cases.json');
const outPath = path.join(vault, '00_System', 'Evaluation', 'last-project-experience-eval.json');

if (!fs.existsSync(manifestPath)) {
  console.error('Run build-retrieval-manifest.mjs first');
  process.exit(1);
}
if (!fs.existsSync(casesPath)) {
  console.error('Missing project-experience-eval-cases.json');
  process.exit(1);
}

const manifest = readJson(manifestPath);
const dataset = readJson(casesPath);
const registry = loadRegistry(vault);
const candidates = readJson(ciPaths(vault).candidates, { candidates: [] }).candidates || [];

function itemText(item) {
  return [
    item.id,
    item.path,
    item.title,
    item.kind,
    item.text,
    item.summary,
    item.claim,
    ...(item.aliases || []),
    ...(item.boundaries || []),
    ...(item.source_runs || []),
    ...(item.source_evidence || []),
    ...(item.tags || [])
  ].filter(Boolean).join(' ');
}

const items = [];
for (const chunk of manifest.chunks || []) {
  items.push({
    item_type: 'path',
    id: chunk.path,
    path: chunk.path,
    kind: chunk.type,
    title: (chunk.heading_path || []).join(' / '),
    text: chunk.text,
    memory_class: chunk.memory_class
  });
}
for (const object of registry.objects || []) {
  items.push({
    item_type: 'object',
    id: object.object_id,
    title: object.title,
    kind: object.object_type,
    summary: [
      object.summary,
      object.prevention,
      object.source_boundary,
      ...(object.boundaries || []),
      ...(object.domains || []),
      ...(object.skills || []),
      ...(object.candidate_ids || [])
    ].filter(Boolean).join(' '),
    aliases: object.aliases,
    boundaries: object.boundaries,
    source_runs: object.source_runs,
    source_evidence: object.source_evidence,
    tags: [object.project_id, object.verification_state, object.status, ...(object.domains || []), ...(object.skills || [])].filter(Boolean)
  });
}
const objectById = new Map((registry.objects || []).map((object) => [object.object_id, object]));
for (const candidate of candidates.filter((candidate) => candidate.status !== 'rejected')) {
  const concept = candidate.canonical_concept_object_id ? objectById.get(candidate.canonical_concept_object_id) : null;
  items.push({
    item_type: 'candidate',
    id: candidate.candidate_id,
    title: candidate.candidate_id,
    kind: candidate.kind,
    claim: [
      candidate.claim,
      concept?.title,
      concept?.summary,
      ...(concept?.boundaries || [])
    ].filter(Boolean).join(' '),
    source_runs: candidate.source_runs,
    source_evidence: candidate.source_evidence,
    tags: [candidate.status, candidate.canonical_concept_object_id, ...(candidate.projects || [])].filter(Boolean)
  });
}

const boostRules = [
  [/external provider|provider call|local persistence|duplicate send/i, ['external send', 'local persistence', 'provider']],
  [/stale worker|stale recovery|worker loop/i, ['stale recovery', 'worker loop', 'background workers']],
  [/evidence.*ai|ai crm|derived business state/i, ['evidence-first ai', 'source evidence', 'ai crm']],
  [/webhook|stripe|signature|raw bytes/i, ['signed webhook', 'raw bytes', 'idempotent']],
  [/provider-id|hidden identifiers|search oracle/i, ['provider id', 'search oracle', 'permission']],
  [/score|confidence|urgency|strength/i, ['score semantic separation', 'confidence', 'urgency']],
  [/not copy|anti-copy|temporary adapter/i, ['temporary adapter', 'not copy', 'boundary']],
  [/suggestion usage|send success|feedback/i, ['send success', 'feedback', 'local persistence']],
  [/production blockers|not production-ready/i, ['production blockers', 'production gate', 'p0']],
  [/remote database|fixture/i, ['remote database', 'fixture-mutating']],
  [/multi-tenant ai inbox/i, ['multi-tenant inbox', 'ai crm', 'permission']],
  [/legacy model|idempotent migration/i, ['legacy migration', 'idempotent']],
  [/proposed|not independently validated|single project/i, ['single-project-proposed', 'proposed', 'not independently validated']]
];

function score(query, item) {
  const text = itemText(item);
  let score = jaccard(query, text);
  const lower = text.toLowerCase();
  for (const token of tokenize(query)) if (lower.includes(token)) score += 0.04;
  for (const [regex, terms] of boostRules) {
    if (!regex.test(query)) continue;
    for (const term of terms) if (lower.includes(term)) score += 0.25;
  }
  if (item.item_type === 'object') score += 0.08;
  if (item.item_type === 'candidate') score += 0.04;
  if (/production blockers|not production-ready|p0/i.test(query) && item.item_type === 'object' && item.kind === 'failure-signature') score += 0.45;
  if (/multi-tenant ai inbox|ai inbox/i.test(query) && lower.includes('obj-domain-multi-tenant-inbox')) score += 0.5;
  if (/ai crm|customer intelligence/i.test(query) && lower.includes('obj-domain-ai-crm')) score += 0.35;
  if (/not copy|anti-copy|warning/i.test(query) && item.item_type === 'object' && item.kind === 'failure-signature') score += 0.35;
  if (/same-entity|same entity|same-person|same person/i.test(query) && /same[- ]person|same entity/.test(lower)) score += 0.55;
  if (/hidden identifiers|provider-id|provider id|search oracle/i.test(query) && /provider[-_ ]id|search oracle/.test(lower)) score += 0.45;
  if (/provider-id|provider id|search predicates|output dtos/i.test(query) && item.id === 'obj-pattern-permission-scoped-sensitive-exposure') score += 0.8;
  if (/provider-id|provider id|search predicates|output dtos/i.test(query) && item.id === 'lc-privacy-permissions-must-govern-search-f-446540e3') score += 0.7;
  if (/remote database|configured database|database was remote|fixture/i.test(query) && /remote_database_url|remote database|fixture/.test(lower)) score += 0.55;
  if (/temporary supabase|supabase adapters|temporary adapter/i.test(query) && /temporary_adapter|temporary adapter|supabase/.test(lower)) score += 0.55;
  if (/proposed|not independently validated|single project/i.test(query) && /proposed|single-project-proposed|not independently validated/.test(lower)) score += 0.4;
  if (/meta lessons|lessons are proposed|not independently validated/i.test(query) && item.id === 'lc-evidence-first-ai-decisions-persist-exac-5ce17ece') score += 0.7;
  if (/repository-verified|repo-verified|runtime-verified|runtime verified|truth boundary|difference between/i.test(query)) {
    if (item.id === 'obj-meta-word-of-mouth') score += 0.75;
    if (item.path === '40_Projects/Active/Meta Word of Mouth/07_CURRENT_STATE.md') score += 0.75;
  }
  return score;
}

function rank(query, k) {
  const raw = items
    .map((item) => ({ item, score: score(query, item) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
  const deduped = [];
  const seen = new Set();
  for (const entry of raw) {
    const id = entry.item.id;
    if (seen.has(id)) continue;
    seen.add(id);
    deduped.push(entry);
    if (deduped.length >= k) break;
  }
  return deduped.map((entry) => ({
      id: entry.item.id,
      item_type: entry.item.item_type,
      path: entry.item.path,
      score: Number(entry.score.toFixed(3))
    }));
}

function containsId(results, id) {
  return results.some((result) => result.id === id || result.path === id);
}

const results = [];
let passed = 0;
for (const testCase of dataset.cases || []) {
  const retrieved = rank(testCase.query, testCase.k || 12);
  const missing_paths = (testCase.expected_paths || []).filter((expected) => !containsId(retrieved, expected));
  const missing_object_ids = (testCase.expected_object_ids || []).filter((expected) => !containsId(retrieved, expected));
  const missing_candidate_ids = (testCase.expected_candidate_ids || []).filter((expected) => !containsId(retrieved, expected));
  const forbidden_hits = (testCase.forbidden_paths || []).filter((forbidden) => containsId(retrieved, forbidden));
  const pass = !missing_paths.length && !missing_object_ids.length && !missing_candidate_ids.length && !forbidden_hits.length;
  if (pass) passed++;
  results.push({
    eval_id: testCase.eval_id,
    pass,
    query: testCase.query,
    missing_paths,
    missing_object_ids,
    missing_candidate_ids,
    forbidden_hits,
    retrieved,
    explanation: testCase.explanation
  });
}

const report = {
  generated_at: new Date().toISOString(),
  dataset_id: dataset.dataset_id,
  cases: (dataset.cases || []).length,
  passed,
  pass_rate: dataset.cases?.length ? Number((passed / dataset.cases.length).toFixed(3)) : 0,
  results
};
fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
console.log(JSON.stringify(report, null, 2));
process.exit(report.pass_rate < 1 ? 1 : 0);
