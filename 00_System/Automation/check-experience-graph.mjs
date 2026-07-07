#!/usr/bin/env node
import path from 'node:path';
import { ciPaths, loadRegistry, readJsonl } from './ci-lib.mjs';

const vault = path.resolve(process.argv[2] || process.cwd());
const p = ciPaths(vault);
const registry = loadRegistry(vault);
const objects = new Map((registry.objects || []).map((object) => [object.object_id, object]));
const edges = readJsonl(p.edges);
const provenance = readJsonl(p.provenance);
const provenanceObjects = new Set(provenance.map((record) => record.object_id));
const errors = [];
const warnings = [];
const normalizedConcepts = new Map();

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function hasEdge(from, relation) {
  return edges.some((edge) => edge.from === from && edge.relation === relation);
}

function requireObjects(owner, field, expectedType) {
  for (const id of owner[field] || []) {
    const objectId = id.startsWith('obj-') ? id : `obj-${id}`;
    const object = objects.get(objectId);
    if (!object) errors.push(`${owner.object_id}: ${field} references missing object ${id}`);
    else if (expectedType && object.object_type !== expectedType) errors.push(`${owner.object_id}: ${field} ${id} is ${object.object_type}, expected ${expectedType}`);
  }
}

for (const object of objects.values()) {
  if (!['pattern', 'failure-signature'].includes(object.object_type)) continue;
  const key = `${object.object_type}:${normalize(object.title)}`;
  if (normalizedConcepts.has(key)) errors.push(`${object.object_id}: duplicates concept ${normalizedConcepts.get(key)}`);
  normalizedConcepts.set(key, object.object_id);

  if (!provenanceObjects.has(object.object_id)) errors.push(`${object.object_id}: first-class learning object lacks provenance`);
  if (!object.source_runs?.length) errors.push(`${object.object_id}: lacks source_runs`);
  if (!object.source_evidence?.length) errors.push(`${object.object_id}: lacks source_evidence`);
  requireObjects(object, 'source_runs', 'run');
  requireObjects(object, 'source_evidence', 'evidence');

  if (!hasEdge(object.object_id, 'verified_by')) errors.push(`${object.object_id}: lacks verified_by edge`);
  if (!hasEdge(object.object_id, 'learned_from')) errors.push(`${object.object_id}: lacks learned_from edge`);
  if (!hasEdge(object.object_id, 'requires_skill')) warnings.push(`${object.object_id}: lacks requires_skill edge`);
  if (!hasEdge(object.object_id, 'applies_to')) warnings.push(`${object.object_id}: lacks applies_to edge`);

  if (object.object_type === 'failure-signature' && !object.prevention) {
    errors.push(`${object.object_id}: failure signature lacks prevention`);
  }
  if (object.status === 'promoted' && (object.independent_validations || 0) < 2) {
    errors.push(`${object.object_id}: promoted learning object lacks independent validations`);
  }
}

const report = {
  learning_objects: [...objects.values()].filter((object) => ['pattern', 'failure-signature'].includes(object.object_type)).length,
  errors,
  warnings
};
console.log(JSON.stringify(report, null, 2));
process.exit(errors.length ? 1 : 0);
