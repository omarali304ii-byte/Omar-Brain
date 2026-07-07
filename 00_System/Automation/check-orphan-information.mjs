#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { ciPaths, loadRegistry, readJsonl } from './ci-lib.mjs';

const vault = path.resolve(process.argv[2] || process.cwd());
const p = ciPaths(vault);
const registry = loadRegistry(vault);
const provenance = readJsonl(p.provenance);
const provObjects = new Set(provenance.map((record) => record.object_id).filter(Boolean));
const errors = [];
const warnings = [];

const registryNativeTypes = new Set(['domain', 'pattern', 'failure-signature']);

function isRegistryNativeValid(object) {
  if (!registryNativeTypes.has(object.object_type)) return false;
  if (!object.summary) return false;
  if (['pattern', 'failure-signature'].includes(object.object_type)) {
    if (!Array.isArray(object.source_runs) || object.source_runs.length === 0) return false;
    if (!Array.isArray(object.source_evidence) || object.source_evidence.length === 0) return false;
  }
  return true;
}

for (const object of registry.objects || []) {
  if (!object.object_id || !object.object_type || !object.status || !object.authority || !object.verification_state) {
    errors.push(`object missing required identity/control fields: ${object.object_id || '(no id)'}`);
  }

  if (object.canonical_path) {
    const abs = path.join(vault, ...object.canonical_path.split('/'));
    if (!fs.existsSync(abs)) errors.push(`object ${object.object_id} canonical_path missing: ${object.canonical_path}`);
  } else if (object.status !== 'inbox' && !isRegistryNativeValid(object)) {
    warnings.push(`ledger-only object without canonical_path: ${object.object_id}`);
  }

  if (!provObjects.has(object.object_id) && object.authority !== 'canonical') {
    errors.push(`object has no provenance: ${object.object_id}`);
  }

  if (object.project_id && !String(object.project_id).startsWith('prj-')) {
    warnings.push(`object ${object.object_id} has suspicious project_id ${object.project_id}`);
  }
}

console.log(JSON.stringify({
  objects: (registry.objects || []).length,
  errors,
  warnings
}, null, 2));
process.exit(errors.length ? 1 : 0);
