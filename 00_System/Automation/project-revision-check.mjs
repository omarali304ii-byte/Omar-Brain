#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  appendEvent,
  dateOnly,
  enqueueImpact,
  loadProjectManifests,
  readJson,
  resolveProject,
  slash,
  writeJsonAtomic
} from './ci-lib.mjs';

const vault = path.resolve(process.argv[2] || process.cwd());
const args = process.argv.slice(3);
const dryRun = args.includes('--dry-run');
const all = args.includes('--all');

function argValue(name, fallback = '') {
  const idx = args.indexOf(name);
  if (idx >= 0 && args[idx + 1]) return args[idx + 1];
  const prefixed = args.find((arg) => arg.startsWith(`${name}=`));
  return prefixed ? prefixed.slice(name.length + 1) : fallback;
}

const projectHint = argValue('--project', '');
const simulatedRevision = argValue('--simulate-revision', '');

function manifestPath(manifest) {
  return path.join(vault, ...manifest.__path.split('/'));
}

function currentRevision(manifest) {
  if (simulatedRevision) return simulatedRevision;
  if (!manifest.local_path || !fs.existsSync(manifest.local_path)) return null;
  const gitDir = path.join(manifest.local_path, '.git');
  if (!fs.existsSync(gitDir)) return null;
  const result = spawnSync('git', ['rev-parse', 'HEAD'], {
    cwd: manifest.local_path,
    encoding: 'utf8'
  });
  if (result.status !== 0) return null;
  return result.stdout.trim();
}

function check(manifest) {
  const recorded = manifest.repo_revision || '';
  const current = currentRevision(manifest);
  if (!recorded || !current) {
    return {
      project_id: manifest.project_id,
      status: 'skipped',
      reason: !recorded ? 'manifest has no repo_revision' : 'no local git revision available'
    };
  }
  if (recorded === current) {
    return {
      project_id: manifest.project_id,
      status: 'fresh',
      recorded_revision: recorded,
      current_revision: current
    };
  }

  const result = {
    project_id: manifest.project_id,
    status: dryRun ? 'stale-dry-run' : 'stale-recorded',
    recorded_revision: recorded,
    current_revision: current,
    actions: [
      'project.truth.stale event',
      'impact queued for targeted reinspection',
      'manifest truth_freshness marked stale'
    ]
  };

  if (dryRun) return result;

  const file = manifestPath(manifest);
  const editable = readJson(file);
  editable.truth_freshness = 'stale';
  editable.previous_repo_revision = recorded;
  editable.detected_repo_revision = current;
  editable.revision_drift_detected_at = new Date().toISOString();
  editable.exact_next_verification = 'Repo revision drift detected. Run targeted changed-file impact analysis and refresh affected project truth before relying on repo-observed claims.';
  editable.source_boundary = `${editable.source_boundary || ''} Revision drift detected: Brain inspected ${recorded}, local checkout is ${current}. Treat repo-observed project truth as stale until targeted reinspection completes.`.trim();
  editable.updated = dateOnly();
  writeJsonAtomic(file, editable);

  const event = appendEvent(vault, {
    event_type: 'project.truth.stale',
    project_id: manifest.project_id,
    object_id: `obj-${manifest.project_id.slice(4)}`,
    payload: {
      recorded_revision: recorded,
      current_revision: current,
      manifest: slash(path.relative(vault, file))
    }
  });

  const impact = enqueueImpact(vault, {
    source_object: `obj-${manifest.project_id.slice(4)}`,
    project_id: manifest.project_id,
    reason: 'repository revision drift requires targeted project truth reinspection',
    affected_objects: [`obj-${manifest.project_id.slice(4)}`],
    actions: [
      'changed-file-impact-analysis',
      'review-project-truth',
      'review-evidence-freshness',
      'refresh-retrieval-cases'
    ],
    causation_id: event.event_id
  });

  result.event_id = event.event_id;
  result.impact_id = impact.impact_id;
  return result;
}

let manifests = [];
if (all) {
  manifests = loadProjectManifests(vault);
} else {
  const resolved = resolveProject(vault, projectHint);
  if (resolved.status !== 'resolved') {
    console.log(JSON.stringify({ status: 'unresolved', project: resolved }, null, 2));
    process.exit(1);
  }
  manifests = [resolved.project];
}

const results = manifests.map(check);
console.log(JSON.stringify({
  dry_run: dryRun,
  simulated_revision: simulatedRevision || null,
  checked: results.length,
  results
}, null, 2));

process.exit(results.some((result) => result.status === 'stale-recorded') ? 2 : 0);
