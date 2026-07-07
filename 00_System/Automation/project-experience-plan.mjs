#!/usr/bin/env node
import path from 'node:path';
import {
  ciPaths,
  jaccard,
  loadRegistry,
  readJson,
  readJsonl,
  resolveProject,
  tokenize
} from './ci-lib.mjs';

const vault = path.resolve(process.argv[2] || process.cwd());
const args = process.argv.slice(3);

function argValue(name, fallback = '') {
  const idx = args.indexOf(name);
  if (idx >= 0 && args[idx + 1]) return args[idx + 1];
  const prefixed = args.find((arg) => arg.startsWith(`${name}=`));
  return prefixed ? prefixed.slice(name.length + 1) : fallback;
}

const projectHint = argValue('--project', args[0] || '');
const query = argValue('--query', args.filter((arg) => !arg.startsWith('--')).slice(1).join(' '));
const context = argValue('--context', '');
const maxItems = Number(argValue('--max', '8'));

const registry = loadRegistry(vault);
const objects = registry.objects || [];
const byId = new Map(objects.map((object) => [object.object_id, object]));
const edges = readJsonl(ciPaths(vault).edges);
const candidates = readJson(ciPaths(vault).candidates, { candidates: [] }).candidates || [];
const project = resolveProject(vault, projectHint);

const searchText = `${query} ${context}`.trim();

const domainHints = [
  ['ai crm customer intelligence lead opportunity inbox conversation suggestion memory', 'obj-domain-ai-crm'],
  ['inbox message conversation tenant workspace people provider id shared', 'obj-domain-multi-tenant-inbox'],
  ['webhook stripe meta provider signature raw bytes event idempotent replay', 'obj-domain-webhook-integrations'],
  ['worker queue async job lease stale recovery background retry', 'obj-domain-background-workers'],
  ['legacy migration backfill deprecated model compatibility idempotent', 'obj-domain-legacy-migration']
];

function relatedTargets(from, relation) {
  return edges.filter((edge) => edge.from === from && edge.relation === relation).map((edge) => edge.to);
}

function objectText(object) {
  return [
    object.object_id,
    object.title,
    object.summary,
    object.problem_solved,
    object.prevention,
    ...(object.boundaries || []),
    ...(object.source_runs || []),
    ...(object.source_evidence || []),
    ...(object.domains || []),
    ...(object.skills || [])
  ].filter(Boolean).join(' ');
}

function scoreObject(object) {
  const text = objectText(object);
  let score = jaccard(searchText, text);
  const qTokens = tokenize(searchText);
  const textLower = text.toLowerCase();
  for (const token of qTokens) if (textLower.includes(token)) score += 0.05;
  for (const [hint, domainId] of domainHints) {
    if (jaccard(searchText, hint) > 0.08 && relatedTargets(object.object_id, 'applies_to').includes(domainId)) score += 0.4;
  }
  if (/not copy|avoid|warning|risk|failure|blocker/i.test(searchText) && object.object_type === 'failure-signature') score += 0.4;
  if (/pattern|learn|should|build|crm|webhook|migration/i.test(searchText) && object.object_type === 'pattern') score += 0.2;
  return score;
}

function explain(object, score) {
  const domains = relatedTargets(object.object_id, 'applies_to').map((id) => byId.get(id)?.title || id);
  const skills = relatedTargets(object.object_id, 'requires_skill').map((id) => byId.get(id)?.title || id);
  return {
    object_id: object.object_id,
    title: object.title,
    score: Number(score.toFixed(3)),
    why_included: [
      `Matched query against ${object.object_type} summary and source context.`,
      domains.length ? `Applies to: ${domains.join(', ')}.` : '',
      skills.length ? `Requires skills: ${skills.join(', ')}.` : ''
    ].filter(Boolean),
    source_runs: object.source_runs || relatedTargets(object.object_id, 'learned_from').filter((id) => byId.get(id)?.object_type === 'run'),
    source_evidence: object.source_evidence || relatedTargets(object.object_id, 'verified_by').filter((id) => byId.get(id)?.object_type === 'evidence'),
    relevant_skills: skills,
    applicability: domains,
    boundaries: object.boundaries || [
      object.object_type === 'failure-signature'
        ? 'Failure signature is observed in one project unless independent validations are later added.'
        : 'Pattern is proposed from available evidence and must not be treated as universally proven.'
    ]
  };
}

const ranked = objects
  .filter((object) => ['pattern', 'failure-signature'].includes(object.object_type))
  .map((object) => ({ object, score: scoreObject(object) }))
  .filter((entry) => entry.score > 0.04)
  .sort((a, b) => b.score - a.score)
  .slice(0, maxItems)
  .map((entry) => explain(entry.object, entry.score));

const relevantPatterns = ranked.filter((entry) => byId.get(entry.object_id)?.object_type === 'pattern');
const relevantFailures = ranked.filter((entry) => byId.get(entry.object_id)?.object_type === 'failure-signature');
const relevantRuns = [...new Set(ranked.flatMap((entry) => entry.source_runs))];
const relevantEvidence = [...new Set(ranked.flatMap((entry) => entry.source_evidence))];
const relevantSkills = [...new Set(ranked.flatMap((entry) => entry.relevant_skills))];
const antiCopyWarnings = relevantFailures
  .filter((entry) => /temporary|provider|adapter|weak|privacy|oracle|persistence|stale/i.test(`${entry.title} ${entry.boundaries.join(' ')}`))
  .map((entry) => ({
    object_id: entry.object_id,
    warning: byId.get(entry.object_id)?.prevention || entry.title,
    boundary: entry.boundaries[0]
  }));

const relevantCandidates = candidates
  .filter((candidate) => candidate.status !== 'rejected')
  .filter((candidate) => ranked.some((entry) => entry.object_id === candidate.canonical_concept_object_id))
  .map((candidate) => ({
    candidate_id: candidate.candidate_id,
    claim: candidate.claim,
    status: candidate.status,
    canonical_concept_object_id: candidate.canonical_concept_object_id,
    confidence: candidate.confidence || 'single-project-proposed'
  }));

const result = {
  project: project.status === 'resolved' ? project.project.project_id : project,
  query: searchText,
  relevant_patterns: relevantPatterns,
  relevant_failure_signatures: relevantFailures,
  relevant_runs: relevantRuns,
  relevant_evidence: relevantEvidence,
  relevant_skills: relevantSkills,
  relevant_learning_candidates: relevantCandidates,
  anti_copy_warnings: antiCopyWarnings,
  boundaries: [
    'Meta Word of Mouth is a reference source, not a universal template.',
    'Items with one source project remain proposed until independently validated.',
    'Repo-observed and static-test evidence must not be described as runtime, deployment, database, or provider verification.'
  ],
  confidence: ranked.length ? 'bounded-transfer-suggestions' : 'no-strong-match'
};

console.log(JSON.stringify(result, null, 2));
