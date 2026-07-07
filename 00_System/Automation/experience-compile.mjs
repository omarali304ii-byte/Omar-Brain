#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {
  ciPaths,
  dateOnly,
  parseFrontmatter,
  readJson,
  sha256,
  slug,
  walk,
  writeJsonAtomic
} from './ci-lib.mjs';

const vault = path.resolve(process.argv[2] || process.cwd());
const p = ciPaths(vault);
const registry = readJson(p.candidates, {
  registry_id: 'omar-brain-learning-candidates-v1',
  version: '1.0',
  candidates: []
});
const existing = new Map((registry.candidates || []).map((c) => [c.candidate_key, c]));

const canonicalConcepts = [
  ['evidence-first ai decisions', 'obj-pattern-evidence-first-ai'],
  ['durable async side effects', 'obj-pattern-durable-async-side-effects'],
  ['signed webhook integrity', 'obj-pattern-signed-webhook-integrity'],
  ['permission-scoped dto exposure', 'obj-pattern-permission-scoped-sensitive-exposure'],
  ['privacy permissions must govern search', 'obj-pattern-permission-scoped-sensitive-exposure'],
  ['idempotent legacy migration', 'obj-pattern-idempotent-legacy-migration'],
  ['separate ai confidence', 'obj-pattern-score-semantic-separation'],
  ['external send succeeded local persistence failed', 'obj-failure-external-send-local-persistence'],
  ['provider id search oracle', 'obj-failure-provider-id-search-oracle'],
  ['stale recovery dead runtime code', 'obj-failure-stale-recovery-dead-runtime-code'],
  ['worker recovery functions are not production protections', 'obj-failure-stale-recovery-dead-runtime-code'],
  ['leads evidence bypasses intelligence permission', 'obj-failure-leads-intelligence-permission-bypass'],
  ['same person ai snapshot out of order overwrite', 'obj-failure-same-person-ai-snapshot-race'],
  ['test expectation drifts from privacy policy', 'obj-failure-test-privacy-policy-drift'],
  ['temporary adapter production drift', 'obj-failure-temporary-adapter-production-drift'],
  ['weak commit provenance', 'obj-failure-weak-commit-provenance']
];

function section(body, title) {
  const re = new RegExp(`^##\\s+${title}\\s*$([\\s\\S]*?)(?=^##\\s+|\\Z)`, 'gmi');
  const match = re.exec(body);
  return match ? match[1] : '';
}

function cleanClaim(value) {
  let text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  if (text.length <= 260) return text;

  const clipped = text.slice(0, 260);
  const sentence = clipped.match(/^([\s\S]*?[.!?`])(?:\s|$)/);
  if (sentence && sentence[1].length >= 60) return sentence[1].trim();
  const lastBreak = Math.max(clipped.lastIndexOf(';'), clipped.lastIndexOf(','), clipped.lastIndexOf(' '));
  return `${clipped.slice(0, lastBreak > 120 ? lastBreak : 257).trim()}...`;
}

function bullets(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*[-*]\s+(.+)/)?.[1])
    .map(cleanClaim)
    .filter(Boolean)
    .filter((claim) => !/^none\b|^no reusable learning\b/i.test(claim))
    .filter((claim) => !looksMalformed(claim));
}

function evidenceIds(body) {
  const ids = new Set();
  for (const match of body.matchAll(/\bevd-[a-z0-9]+-[a-z0-9]+\b/g)) ids.add(match[0]);
  return [...ids];
}

function normalizeClaim(claim) {
  return String(claim || '')
    .toLowerCase()
    .replace(/[`"'’]/g, '')
    .replace(/provider-id/g, 'provider id')
    .replace(/[^a-z0-9_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function looksMalformed(claim) {
  const value = String(claim || '').trim();
  if (!value) return true;
  if (/^[A-Z0-9_]+$/.test(value)) return false;
  if (value.length < 24) return true;
  if (/\.\.\.$/.test(value)) return false;
  if (/[.!?`]$/.test(value)) return false;
  const words = value.split(/\s+/);
  const last = words.at(-1) || '';
  if (/^[a-z]{2,7}$/.test(last)) return true;
  return false;
}

function conceptFor(claim) {
  const normalized = normalizeClaim(claim);
  const found = canonicalConcepts.find(([needle]) => normalized.includes(needle));
  return found?.[1] || null;
}

function candidateIdFor(claim, key) {
  return `lc-${slug(claim).slice(0, 44)}-${key.slice(0, 8)}`;
}

const runs = walk(path.join(vault, '40_Projects'))
  .filter((file) => file.endsWith('.md'))
  .map((file) => ({ file, ...parseFrontmatter(fs.readFileSync(file, 'utf8')) }))
  .filter((entry) => entry.data.type === 'run')
  .filter((entry) => ['observed', 'verified', 'runtime-verified', 'repo-verified'].includes(entry.data.verification_state));

let discovered = 0;
let updated = 0;

for (const run of runs) {
  const runId = run.data.run_id || path.basename(run.file, '.md');
  const projectId = run.data.project_id || '';
  const runEvidence = evidenceIds(run.body);
  const groups = [
    ['lesson', [...new Set([...bullets(section(run.body, 'Reusable learning candidates')), ...bullets(section(run.body, 'Learning candidates'))])]],
    ['failure-signature', bullets(section(run.body, 'Failure signatures'))]
  ];

  for (const [kind, claims] of groups) {
    for (const claim of claims) {
      const key = sha256(`${kind}:${normalizeClaim(claim)}`);
      const current = existing.get(key);
      if (current) {
        const before = JSON.stringify(current);
        current.source_runs = [...new Set([...(current.source_runs || []), runId])];
        current.projects = [...new Set([...(current.projects || []), projectId].filter(Boolean))];
        current.source_evidence = [...new Set([...(current.source_evidence || []), ...runEvidence])];
        current.validation_count = current.source_runs.length;
        current.independent_project_count = new Set(current.projects || []).size;
        current.canonical_concept_object_id = current.canonical_concept_object_id || conceptFor(claim) || undefined;
        current.extraction_provenance = current.extraction_provenance || [];
        const provenanceKey = `${runId}:${kind}:${sha256(claim).slice(0, 8)}`;
        if (!current.extraction_provenance.some((x) => x.key === provenanceKey)) {
          current.extraction_provenance.push({
            key: provenanceKey,
            source_run: runId,
            section: kind === 'lesson' ? 'Reusable learning candidates' : 'Failure signatures',
            extracted_at: dateOnly()
          });
        }
        current.updated = dateOnly();
        if (JSON.stringify(current) !== before) updated++;
      } else {
        const concept = conceptFor(claim);
        const candidate = {
          candidate_id: candidateIdFor(claim, key),
          candidate_key: key,
          kind,
          claim,
          status: 'proposed',
          source_runs: [runId],
          source_evidence: runEvidence,
          projects: [projectId].filter(Boolean),
          validation_count: 1,
          independent_project_count: projectId ? 1 : 0,
          applicability_conditions: [],
          non_applicability_conditions: [],
          transfer_mode: kind === 'failure-signature' ? 'warning' : 'candidate-pattern',
          confidence: 'single-project-proposed',
          authority: 'run-derived-candidate',
          created: dateOnly(),
          updated: dateOnly(),
          promotion_rule: 'Never auto-promote; require evidence and governance review.',
          extraction_provenance: [{
            key: `${runId}:${kind}:${sha256(claim).slice(0, 8)}`,
            source_run: runId,
            section: kind === 'lesson' ? 'Reusable learning candidates' : 'Failure signatures',
            extracted_at: dateOnly()
          }]
        };
        if (concept) candidate.canonical_concept_object_id = concept;
        existing.set(key, candidate);
        discovered++;
      }
    }
  }
}

const candidates = [...existing.values()];
for (const candidate of candidates) {
  if (candidate.status === 'rejected') continue;
  if (!looksMalformed(candidate.claim)) continue;
  const prefix = normalizeClaim(candidate.claim);
  const replacement = candidates.find((other) =>
    other !== candidate &&
    other.status !== 'rejected' &&
    other.kind === candidate.kind &&
    normalizeClaim(other.claim).startsWith(prefix) &&
    (candidate.source_runs || []).some((runId) => (other.source_runs || []).includes(runId))
  );
  candidate.status = 'rejected';
  candidate.rejection_reason = replacement
    ? 'Malformed truncated extraction superseded by complete candidate.'
    : 'Malformed truncated extraction rejected by candidate quality gate.';
  if (replacement) candidate.superseded_by = replacement.candidate_id;
  candidate.updated = dateOnly();
}

const activeGroups = new Map();
for (const candidate of candidates) {
  if (candidate.status === 'rejected') continue;
  const key = `${candidate.kind}:${normalizeClaim(candidate.claim)}`;
  const group = activeGroups.get(key) || [];
  group.push(candidate);
  activeGroups.set(key, group);
}

for (const group of activeGroups.values()) {
  if (group.length < 2) continue;
  const keeper = group[0];
  for (const duplicate of group.slice(1)) {
    keeper.source_runs = [...new Set([...(keeper.source_runs || []), ...(duplicate.source_runs || [])])];
    keeper.source_evidence = [...new Set([...(keeper.source_evidence || []), ...(duplicate.source_evidence || [])])];
    keeper.projects = [...new Set([...(keeper.projects || []), ...(duplicate.projects || [])])];
    keeper.extraction_provenance = [
      ...new Map([...(keeper.extraction_provenance || []), ...(duplicate.extraction_provenance || [])].map((entry) => [entry.key, entry])).values()
    ];
    keeper.validation_count = keeper.source_runs.length;
    keeper.independent_project_count = new Set(keeper.projects || []).size;
    keeper.canonical_concept_object_id = keeper.canonical_concept_object_id || duplicate.canonical_concept_object_id;
    keeper.confidence = keeper.confidence || duplicate.confidence;
    keeper.transfer_mode = keeper.transfer_mode || duplicate.transfer_mode;
    keeper.updated = dateOnly();

    duplicate.status = 'rejected';
    duplicate.rejection_reason = 'Duplicate normalized claim merged into earlier stable candidate ID.';
    duplicate.superseded_by = keeper.candidate_id;
    duplicate.updated = dateOnly();
  }
}

registry.candidates = candidates.map((candidate) => ({
  ...candidate,
  independent_project_count: new Set(candidate.projects || []).size
}));
registry.updated = dateOnly();
writeJsonAtomic(p.candidates, registry);

console.log(JSON.stringify({
  runs_scanned: runs.length,
  new_candidates: discovered,
  updated_candidates: updated,
  total_candidates: registry.candidates.length,
  rejected_candidates: registry.candidates.filter((c) => c.status === 'rejected').length
}, null, 2));
