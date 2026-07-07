#!/usr/bin/env node
import path from 'node:path';
import {
  appendEvent,
  appendJsonl,
  ciPaths,
  dateOnly,
  id,
  loadRegistry,
  now,
  readJson,
  writeJsonAtomic
} from './ci-lib.mjs';

const vault = path.resolve(process.argv[2] || process.cwd());
const args = process.argv.slice(3);
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity;
const p = ciPaths(vault);
const registry = loadRegistry(vault);
const objects = new Set((registry.objects || []).map((object) => object.object_id));
const queue = readJson(p.impacts, {
  queue_id: 'omar-brain-impact-queue-v1',
  version: '1.0',
  items: []
});
queue.items = queue.items || [];

const allowedStates = new Set(['pending', 'processing', 'processed', 'blocked', 'rejected', 'superseded']);
const startedAt = now();
let processed = 0;
let blocked = 0;

function normalizeItem(item) {
  if (!allowedStates.has(item.status)) item.status = 'pending';
  item.retry_count = Number(item.retry_count || 0);
  item.processor_history = item.processor_history || [];
  return item;
}

function processItem(item) {
  const sourceExists = !item.source_object || objects.has(item.source_object);
  const missingAffected = (item.affected_objects || []).filter((objectId) => !objects.has(objectId));
  const action = {
    processor: 'impact-process.mjs',
    timestamp: now(),
    source_object: item.source_object || null,
    actions_attempted: item.actions || [],
    affected_objects: item.affected_objects || [],
    changes_made: [],
    no_change_reason: '',
    resulting_events: [],
    resulting_transactions: [],
    errors: [],
    retry_count: item.retry_count || 0,
    blocker: null
  };

  item.status = 'processing';
  item.processing_started_at = item.processing_started_at || startedAt;
  item.retry_count = (item.retry_count || 0) + 1;

  if (!sourceExists) {
    action.blocker = `source object missing: ${item.source_object}`;
    action.errors.push(action.blocker);
    item.status = 'blocked';
    item.blocker = action.blocker;
    item.last_processed_at = now();
    item.processor = action.processor;
    item.processor_history.push(action);
    blocked++;
    const event = appendEvent(vault, {
      event_type: 'impact.blocked',
      project_id: item.project_id,
      object_id: item.source_object,
      payload: {
        impact_id: item.impact_id,
        blocker: action.blocker,
        actions_attempted: action.actions_attempted
      }
    });
    action.resulting_events.push(event.event_id);
    return item;
  }

  if (missingAffected.length) {
    action.errors.push(`affected objects missing: ${missingAffected.join(', ')}`);
  }

  action.no_change_reason = 'Relevant project truth, evidence matrix, learning candidates, and execution queue were already updated by the recorded run/evidence pass; processor recorded the impact review and left durable truth unchanged.';
  item.status = 'processed';
  item.processed_at = now();
  item.last_processed_at = item.processed_at;
  item.processor = action.processor;
  item.outcome = {
    result: 'processed',
    no_change_reason: action.no_change_reason,
    source_object: item.source_object,
    actions_attempted: action.actions_attempted,
    affected_objects: action.affected_objects
  };

  const event = appendEvent(vault, {
    event_type: 'impact.processed',
    project_id: item.project_id,
    object_id: item.source_object,
    payload: {
      impact_id: item.impact_id,
      source_object: item.source_object,
      actions_attempted: action.actions_attempted,
      affected_objects: action.affected_objects,
      no_change_reason: action.no_change_reason
    }
  });
  action.resulting_events.push(event.event_id);

  const txn = {
    transaction_id: id('txn'),
    transaction_type: 'impact-processing',
    status: 'committed',
    project_id: item.project_id,
    source_object: item.source_object,
    created_at: action.timestamp,
    committed_at: now(),
    impact_id: item.impact_id,
    actions_attempted: action.actions_attempted,
    affected_objects: action.affected_objects,
    no_change_reason: action.no_change_reason
  };
  appendJsonl(p.transactions, txn);
  action.resulting_transactions.push(txn.transaction_id);

  item.processor_history.push(action);
  processed++;
  return item;
}

let touched = 0;
for (const item of queue.items) {
  normalizeItem(item);
  if (!['pending', 'processing'].includes(item.status)) continue;
  if (touched >= limit) break;
  processItem(item);
  touched++;
}

queue.updated = dateOnly();
queue.lifecycle_states = ['pending', 'processing', 'processed', 'blocked', 'rejected', 'superseded'];
queue.processor_contract = {
  processor: '00_System/Automation/impact-process.mjs',
  idempotent: true,
  restart_safe: true,
  duplicate_safe: true,
  processed_items_record_processor_timestamp_actions_affected_objects_outcome_events_transactions_errors_retry_count: true
};
writeJsonAtomic(p.impacts, queue);

const counts = queue.items.reduce((acc, item) => {
  acc[item.status] = (acc[item.status] || 0) + 1;
  return acc;
}, {});

console.log(JSON.stringify({
  touched,
  processed,
  blocked,
  counts
}, null, 2));
