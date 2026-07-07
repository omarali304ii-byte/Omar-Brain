#!/usr/bin/env node
import path from 'node:path';
import { ciPaths, loadRegistry, readJson } from './ci-lib.mjs';

const vault = path.resolve(process.argv[2] || process.cwd());
const p = ciPaths(vault);
const registry = loadRegistry(vault);
const objects = new Map((registry.objects || []).map((object) => [object.object_id, object]));
const candidates = readJson(p.candidates, { candidates: [] }).candidates || [];

const errors = [];
const warnings = [];
const activeNormalized = new Map();

function normalize(claim) {
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
  const last = value.split(/\s+/).at(-1) || '';
  return /^[a-z]{2,7}$/.test(last);
}

function objectForEvidence(evidenceId) {
  if (!evidenceId) return null;
  if (objects.has(evidenceId)) return objects.get(evidenceId);
  const objectId = evidenceId.startsWith('obj-') ? evidenceId : `obj-${evidenceId}`;
  return objects.get(objectId) || null;
}

for (const candidate of candidates) {
  if (!candidate.candidate_id) errors.push('candidate missing candidate_id');
  if (!candidate.kind) errors.push(`${candidate.candidate_id}: missing kind`);
  if (!candidate.status) errors.push(`${candidate.candidate_id}: missing status`);

  const rejected = candidate.status === 'rejected';
  if (looksMalformed(candidate.claim)) {
    if (!rejected) errors.push(`${candidate.candidate_id}: malformed or truncated claim '${candidate.claim}'`);
    if (rejected && !candidate.rejection_reason) errors.push(`${candidate.candidate_id}: rejected malformed candidate lacks rejection_reason`);
  }

  if (!rejected) {
    const normalized = normalize(candidate.claim);
    if (activeNormalized.has(normalized)) {
      errors.push(`${candidate.candidate_id}: duplicate normalized claim also in ${activeNormalized.get(normalized)}`);
    } else {
      activeNormalized.set(normalized, candidate.candidate_id);
    }

    if (!Array.isArray(candidate.source_runs) || candidate.source_runs.length === 0) {
      errors.push(`${candidate.candidate_id}: active candidate lacks source_runs`);
    } else {
      for (const runId of candidate.source_runs) {
        const objectId = runId.startsWith('obj-') ? runId : `obj-${runId}`;
        if (!objects.has(objectId)) errors.push(`${candidate.candidate_id}: source_run missing object ${runId}`);
      }
    }

    if (!Array.isArray(candidate.source_evidence) || candidate.source_evidence.length === 0) {
      errors.push(`${candidate.candidate_id}: active candidate lacks source_evidence`);
    } else {
      for (const evidenceId of candidate.source_evidence) {
        const evidence = objectForEvidence(evidenceId);
        if (!evidence) errors.push(`${candidate.candidate_id}: source_evidence missing object ${evidenceId}`);
        else if (evidence.object_type !== 'evidence') errors.push(`${candidate.candidate_id}: source_evidence is not evidence ${evidenceId}`);
      }
    }

    if (candidate.canonical_concept_object_id && !objects.has(candidate.canonical_concept_object_id)) {
      errors.push(`${candidate.candidate_id}: canonical concept object missing ${candidate.canonical_concept_object_id}`);
    }
  }

  if (candidate.status === 'promoted' && candidate.independent_project_count < 2) {
    errors.push(`${candidate.candidate_id}: promoted candidate lacks independent validation`);
  }
  if (!candidate.promotion_rule) warnings.push(`${candidate.candidate_id}: missing promotion_rule`);
}

const report = {
  candidates: candidates.length,
  active_candidates: candidates.filter((c) => c.status !== 'rejected').length,
  rejected_candidates: candidates.filter((c) => c.status === 'rejected').length,
  errors,
  warnings
};
console.log(JSON.stringify(report, null, 2));
process.exit(errors.length ? 1 : 0);
