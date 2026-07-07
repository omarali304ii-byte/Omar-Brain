#!/usr/bin/env node
import path from 'node:path';
import { ciPaths, readJson } from './ci-lib.mjs';

const vault = path.resolve(process.argv[2] || process.cwd());
const queue = readJson(ciPaths(vault).impacts, { items: [] });
const allowed = new Set(['pending', 'processing', 'processed', 'blocked', 'rejected', 'superseded']);
const errors = [];
const warnings = [];
const pendingThreshold = Number(process.env.OMAR_BRAIN_PENDING_IMPACT_THRESHOLD || 0);

const counts = {};
for (const item of queue.items || []) {
  counts[item.status] = (counts[item.status] || 0) + 1;
  if (!allowed.has(item.status)) errors.push(`${item.impact_id}: invalid impact status ${item.status}`);
  if (item.status === 'processed') {
    if (!item.processor) errors.push(`${item.impact_id}: processed impact lacks processor`);
    if (!item.processed_at) errors.push(`${item.impact_id}: processed impact lacks processed_at`);
    if (!item.outcome) errors.push(`${item.impact_id}: processed impact lacks outcome`);
    if (!item.processor_history?.length) errors.push(`${item.impact_id}: processed impact lacks processor_history`);
    const last = item.processor_history?.at(-1);
    if (last && !last.no_change_reason && !(last.changes_made || []).length) {
      errors.push(`${item.impact_id}: processed impact lacks changes_made or no_change_reason`);
    }
  }
  if (item.status === 'blocked' && !item.blocker) errors.push(`${item.impact_id}: blocked impact lacks blocker`);
}

const pending = (counts.pending || 0) + (counts.processing || 0);
if (pending > pendingThreshold) {
  errors.push(`pending impacts ${pending} exceed threshold ${pendingThreshold}`);
}

const report = { items: (queue.items || []).length, counts, pending_threshold: pendingThreshold, errors, warnings };
console.log(JSON.stringify(report, null, 2));
process.exit(errors.length ? 1 : 0);
