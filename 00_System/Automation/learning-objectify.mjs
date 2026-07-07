#!/usr/bin/env node
import path from 'node:path';
import {
  appendEvent,
  appendJsonl,
  appendProvenance,
  ciPaths,
  dateOnly,
  id,
  loadRegistry,
  now,
  readJsonl,
  saveRegistry,
  sha256,
  slug
} from './ci-lib.mjs';

const vault = path.resolve(process.argv[2] || process.cwd());
const p = ciPaths(vault);
const registry = loadRegistry(vault);
const objects = new Map((registry.objects || []).map((o) => [o.object_id, o]));
const edges = readJsonl(p.edges);
const edgeKeys = new Set(edges.map((e) => `${e.from}|${e.relation}|${e.to}`));
const created = [];
const updated = [];
const addedEdges = [];
const createdAt = now();
const today = dateOnly();

const project = 'obj-meta-word-of-mouth';
const sourceProject = 'prj-meta-word-of-mouth';

const runRepo = 'obj-run-mrb1o0ob-731bc079';
const runLocal = 'obj-run-mrb34rdn-eebbc7fd';
const runAudit = 'obj-run-mrb3iohg-6d1d9a66';

const evidence = {
  revision: 'obj-evd-mrb1oc73-25062d49',
  aiWorker: 'obj-evd-mrb1oc94-40290714',
  webhook: 'obj-evd-mrb1ocbf-29126148',
  privacyOps: 'obj-evd-mrb1ocdf-0f4342d1',
  localStatic: 'obj-evd-mrb351xk-224ef696',
  dbSkipped: 'obj-evd-mrb351xs-27ac41ce',
  prodAudit: 'obj-evd-mrb3iwud-aba73203'
};

const skillObjects = [
  {
    object_id: 'obj-skill-backend-patterns',
    object_type: 'skill',
    title: 'Backend Patterns',
    canonical_path: '50_Skills/Technical/backend-patterns.md',
    summary: 'Existing skill for backend architecture, API boundaries, service flows, jobs, and reliability patterns.'
  },
  {
    object_id: 'obj-skill-security-and-hardening',
    object_type: 'skill',
    title: 'Security and Hardening',
    canonical_path: '50_Skills/Technical/security-and-hardening.md',
    summary: 'Existing skill for authorization, webhook signatures, sensitive data, secrets, and hardening checks.'
  },
  {
    object_id: 'obj-skill-database-migrations',
    object_type: 'skill',
    title: 'Database Migrations',
    canonical_path: '50_Skills/Technical/database-migrations.md',
    summary: 'Existing skill for schema changes, backfills, idempotent migrations, and rollback safety.'
  },
  {
    object_id: 'obj-skill-test-scenarios',
    object_type: 'skill',
    title: 'Test Scenarios',
    canonical_path: '50_Skills/Execution/test-scenarios.md',
    summary: 'Existing skill for acceptance, route-level, regression, and edge-case validation scenarios.'
  },
  {
    object_id: 'obj-skill-product-strategy',
    object_type: 'skill',
    title: 'Product Strategy',
    canonical_path: '50_Skills/Strategy/product-strategy.md',
    summary: 'Existing skill for keeping business meaning, metrics, and product decisions semantically clear.'
  },
  {
    object_id: 'obj-skill-skill-distillation',
    object_type: 'skill',
    title: 'Skill Distillation',
    canonical_path: '50_Skills/AI-Work/skill-distillation.md',
    summary: 'Existing skill for turning repeated project experience into reusable skills without premature promotion.'
  }
];

const domains = [
  {
    object_id: 'obj-domain-ai-crm',
    title: 'AI CRM and Customer Intelligence Systems',
    summary: 'Projects that derive business state, suggestions, or memory from customer conversations using AI.'
  },
  {
    object_id: 'obj-domain-multi-tenant-inbox',
    title: 'Multi-Tenant Inbox and Shared Conversation Systems',
    summary: 'Projects that combine workspace authorization, people identities, messages, opportunities, and follow-up state.'
  },
  {
    object_id: 'obj-domain-webhook-integrations',
    title: 'Webhook and External Provider Integrations',
    summary: 'Projects that receive or send third-party provider events and must preserve exact provider-contract boundaries.'
  },
  {
    object_id: 'obj-domain-background-workers',
    title: 'Background Workers and Durable Jobs',
    summary: 'Projects with asynchronous side effects, leases, stale recovery, idempotency, and retry behavior.'
  },
  {
    object_id: 'obj-domain-legacy-migration',
    title: 'Legacy Model Migration',
    summary: 'Projects moving from a temporary or deprecated model into a stronger canonical domain model.'
  }
].map((d) => ({ ...d, object_type: 'domain' }));

const patterns = [
  {
    object_id: 'obj-pattern-evidence-first-ai',
    title: 'Evidence-First AI Decisions',
    summary: 'AI-derived business state should keep exact source evidence, validate model output with a schema, and keep model confidence separate from deterministic business scoring.',
    source_runs: [runRepo],
    source_evidence: [evidence.aiWorker],
    candidate_ids: ['lc-evidence-first-ai-decisions-persist-exac-5ce17ece'],
    skills: ['obj-skill-backend-patterns', 'obj-skill-security-and-hardening', 'obj-skill-skill-distillation'],
    domains: ['obj-domain-ai-crm', 'obj-domain-multi-tenant-inbox'],
    boundaries: ['Proposed from one reference project; not independently validated as universal.', 'Does not prove model quality or production runtime behavior.']
  },
  {
    object_id: 'obj-pattern-durable-async-side-effects',
    title: 'Durable Async Side Effects',
    summary: 'Slow or external work should be committed/enqueued before execution, claimed idempotently, and monitored with stale lease recovery that is actually invoked.',
    source_runs: [runRepo, runAudit],
    source_evidence: [evidence.aiWorker, evidence.prodAudit],
    candidate_ids: ['lc-durable-async-side-effects-commit-enqueu-3593276b', 'lc-worker-recovery-functions-are-not-produc-8649f8b6'],
    skills: ['obj-skill-backend-patterns', 'obj-skill-test-scenarios'],
    domains: ['obj-domain-background-workers', 'obj-domain-webhook-integrations'],
    boundaries: ['The positive pattern is repo-observed; the audit also proved a production blocker when recovery is not wired into the live loop.']
  },
  {
    object_id: 'obj-pattern-signed-webhook-integrity',
    title: 'Signed Webhook Integrity',
    summary: 'Verify exact raw request bytes before parsing provider webhooks and deduplicate at provider-event and domain-message layers.',
    source_runs: [runRepo],
    source_evidence: [evidence.webhook],
    candidate_ids: ['lc-signed-webhook-integrity-verify-exact-ra-88927d4c'],
    skills: ['obj-skill-security-and-hardening', 'obj-skill-backend-patterns'],
    domains: ['obj-domain-webhook-integrations'],
    boundaries: ['Do not copy Meta-specific headers or signature format into Stripe, WhatsApp, or another provider without checking that provider contract.']
  },
  {
    object_id: 'obj-pattern-permission-scoped-sensitive-exposure',
    title: 'Permission-Scoped Sensitive Exposure',
    summary: 'Sensitive fields must be gated at query, search, evidence loading, and DTO serialization layers rather than only hidden in response formatting.',
    source_runs: [runRepo, runAudit],
    source_evidence: [evidence.privacyOps, evidence.prodAudit],
    candidate_ids: ['lc-permission-scoped-dto-exposure-sensitive-43e47143', 'lc-privacy-permissions-must-govern-search-f-446540e3'],
    skills: ['obj-skill-security-and-hardening', 'obj-skill-backend-patterns', 'obj-skill-test-scenarios'],
    domains: ['obj-domain-ai-crm', 'obj-domain-multi-tenant-inbox'],
    boundaries: ['Current Meta implementation has confirmed gaps; use as a warning and design target, not as proof the repo already satisfies the pattern everywhere.']
  },
  {
    object_id: 'obj-pattern-idempotent-legacy-migration',
    title: 'Idempotent Legacy Migration',
    summary: 'Legacy migrations should support dry-run, repeat-safe execution, audit markers, and idempotency tests before old models are retired.',
    source_runs: [runRepo],
    source_evidence: [evidence.privacyOps],
    candidate_ids: ['lc-idempotent-legacy-migration-dry-run-repe-2cba6c81'],
    skills: ['obj-skill-database-migrations', 'obj-skill-test-scenarios'],
    domains: ['obj-domain-legacy-migration'],
    boundaries: ['The Meta repo still has compatibility debt; this is a candidate pattern, not proof the migration is complete.']
  },
  {
    object_id: 'obj-pattern-score-semantic-separation',
    title: 'Score Semantic Separation',
    summary: 'AI confidence, commercial opportunity strength, and operational urgency are different concepts and should not collapse into one score.',
    source_runs: [runRepo],
    source_evidence: [evidence.aiWorker],
    candidate_ids: ['lc-separate-ai-confidence-commercial-streng-96e89af4'],
    skills: ['obj-skill-backend-patterns', 'obj-skill-product-strategy'],
    domains: ['obj-domain-ai-crm'],
    boundaries: ['Observed in one AI CRM reference project; validate independently before promoting as a universal product rule.']
  }
].map((x) => ({ ...x, object_type: 'pattern' }));

const failures = [
  {
    object_id: 'obj-failure-external-send-local-persistence',
    title: 'External Send Succeeded, Local Persistence Failed',
    summary: 'An external provider call can succeed before local persistence or audit fails; treating the whole operation as failed risks duplicate sends and false state.',
    source_runs: [runAudit],
    source_evidence: [evidence.prodAudit],
    candidate_ids: ['lc-external-send-succeeded-local-persistenc-f1d297e1'],
    skills: ['obj-skill-backend-patterns', 'obj-skill-test-scenarios'],
    domains: ['obj-domain-webhook-integrations', 'obj-domain-multi-tenant-inbox'],
    prevention: 'Model provider success and local persistence as separate durable facts, with uncertain reconciliation states.',
    status: 'proposed'
  },
  {
    object_id: 'obj-failure-provider-id-search-oracle',
    title: 'Provider-ID Search Oracle',
    summary: 'A hidden provider identifier can still leak if search predicates match it for users who are not allowed to see provider IDs.',
    source_runs: [runAudit],
    source_evidence: [evidence.prodAudit],
    candidate_ids: ['lc-provider-id-search-oracle-4355a070'],
    skills: ['obj-skill-security-and-hardening', 'obj-skill-backend-patterns', 'obj-skill-test-scenarios'],
    domains: ['obj-domain-ai-crm', 'obj-domain-multi-tenant-inbox'],
    prevention: 'Gate sensitive search predicates with the same permission that governs sensitive output exposure.',
    status: 'proposed'
  },
  {
    object_id: 'obj-failure-stale-recovery-dead-runtime-code',
    title: 'Stale Recovery Dead Runtime Code',
    summary: 'A stale-job recovery function is not a production protection if the worker loop never invokes it.',
    source_runs: [runAudit],
    source_evidence: [evidence.prodAudit],
    candidate_ids: ['lc-stale-recovery-dead-runtime-code-7551f1c1', 'lc-worker-recovery-functions-are-not-produc-8649f8b6'],
    skills: ['obj-skill-backend-patterns', 'obj-skill-test-scenarios'],
    domains: ['obj-domain-background-workers'],
    prevention: 'Verify the actual process loop calls recovery on a schedule or startup path, and test stale-lock recovery against a disposable DB.',
    status: 'proposed'
  },
  {
    object_id: 'obj-failure-leads-intelligence-permission-bypass',
    title: 'Leads Evidence Bypasses Intelligence Permission',
    summary: 'A route can enforce a broad leads permission while loading and serializing AI evidence that should require intelligence-specific permission.',
    source_runs: [runAudit],
    source_evidence: [evidence.prodAudit],
    candidate_ids: ['lc-leads-evidence-bypasses-intelligence-per-2aafb5aa'],
    skills: ['obj-skill-security-and-hardening', 'obj-skill-test-scenarios'],
    domains: ['obj-domain-ai-crm', 'obj-domain-multi-tenant-inbox'],
    prevention: 'Test route-level permission boundaries, not only DTO helpers.',
    status: 'proposed'
  },
  {
    object_id: 'obj-failure-same-person-ai-snapshot-race',
    title: 'Same-Person AI Snapshot Race',
    summary: 'Concurrent AI jobs for the same entity can finish out of order and allow older analysis to overwrite newer durable memory.',
    source_runs: [runAudit],
    source_evidence: [evidence.prodAudit],
    candidate_ids: ['lc-same-person-ai-snapshot-out-of-order-ove-f8365709'],
    skills: ['obj-skill-backend-patterns', 'obj-skill-database-migrations', 'obj-skill-test-scenarios'],
    domains: ['obj-domain-ai-crm', 'obj-domain-background-workers'],
    prevention: 'Serialize per entity or use version/updated-at guards inside the transaction.',
    status: 'proposed'
  },
  {
    object_id: 'obj-failure-test-privacy-policy-drift',
    title: 'Test Expectation Drifts From Privacy Policy',
    summary: 'Tests can encode stale expectations, such as expecting raw provider IDs while the privacy policy now defaults to masking.',
    source_runs: [runAudit],
    source_evidence: [evidence.prodAudit],
    candidate_ids: ['lc-test-expectation-drifts-from-privacy-pol-22a677ae'],
    skills: ['obj-skill-test-scenarios', 'obj-skill-security-and-hardening'],
    domains: ['obj-domain-ai-crm', 'obj-domain-multi-tenant-inbox'],
    prevention: 'Keep tests tied to canonical privacy policy and update fixtures when masking defaults change.',
    status: 'proposed'
  },
  {
    object_id: 'obj-failure-temporary-adapter-production-drift',
    title: 'Temporary Adapter Production Drift',
    summary: 'Temporary webhook/OAuth adapters can diverge from the intended owned-server production path and become false readiness evidence.',
    source_runs: [runRepo],
    source_evidence: [evidence.privacyOps],
    candidate_ids: ['lc-temporary-adapter-production-drift-dev-w-c4828049'],
    skills: ['obj-skill-backend-patterns', 'obj-skill-security-and-hardening'],
    domains: ['obj-domain-webhook-integrations'],
    prevention: 'Track adapter boundaries explicitly and require production-path evidence before readiness claims.',
    status: 'proposed'
  },
  {
    object_id: 'obj-failure-weak-commit-provenance',
    title: 'Weak Commit Provenance',
    summary: 'Repeated low-information commit messages erase intent and reduce future learning value even when code history exists.',
    source_runs: [runRepo],
    source_evidence: [evidence.revision],
    candidate_ids: ['lc-weak-commit-provenance-repeated-commit-m-e7ff99ab'],
    skills: ['obj-skill-release-notes', 'obj-skill-skill-distillation'],
    domains: ['obj-domain-legacy-migration'],
    prevention: 'Use commit and run summaries that state intent, risk, and verification evidence.',
    status: 'proposed'
  }
].map((x) => ({ ...x, object_type: 'failure-signature' }));

const extraSkill = {
  object_id: 'obj-skill-release-notes',
  object_type: 'skill',
  title: 'Release Notes',
  canonical_path: '50_Skills/Execution/release-notes.md',
  summary: 'Existing skill for preserving shipped intent, change context, and release history.'
};

function upsertObject(base) {
  const existing = objects.get(base.object_id);
  const normalized = {
    status: base.status || (base.object_type === 'skill' || base.object_type === 'domain' ? 'active' : 'proposed'),
    authority: 'observed',
    verification_state: base.verification_state || (base.object_type === 'skill' ? 'contextual' : 'repo-observed'),
    project_id: base.project_id || (['pattern', 'failure-signature'].includes(base.object_type) ? sourceProject : ''),
    created_at: base.created_at || createdAt,
    updated_at: createdAt,
    ...base
  };
  if (!existing) {
    registry.objects.push(normalized);
    objects.set(base.object_id, normalized);
    created.push(base.object_id);
    appendProvenance(vault, {
      object_id: base.object_id,
      source_type: base.object_type === 'skill' ? 'skill-registry' : 'learning-objectification',
      source_ref: base.canonical_path || 'Meta Word of Mouth project experience graph',
      authority: normalized.authority,
      verification_state: normalized.verification_state
    });
    appendEvent(vault, {
      event_type: base.object_type === 'failure-signature' ? 'failure_signature.created' : 'learning.objectified',
      project_id: normalized.project_id || sourceProject,
      object_id: base.object_id,
      payload: {
        object_type: base.object_type,
        title: base.title,
        source_runs: base.source_runs || [],
        source_evidence: base.source_evidence || []
      }
    });
    return;
  }
  const merged = { ...existing, ...normalized, created_at: existing.created_at || normalized.created_at };
  objects.set(base.object_id, merged);
  const idx = registry.objects.findIndex((o) => o.object_id === base.object_id);
  registry.objects[idx] = merged;
  updated.push(base.object_id);
}

function addEdge(from, relation, to) {
  if (!objects.has(from) || !objects.has(to)) return;
  const key = `${from}|${relation}|${to}`;
  if (edgeKeys.has(key)) return;
  const edge = {
    edge_id: `edge-${slug(`${from}-${relation}-${to}`).slice(0, 92)}-${sha256(key).slice(0, 8)}`,
    from,
    relation,
    to,
    project_id: sourceProject,
    created_at: createdAt
  };
  appendJsonl(p.edges, edge);
  edgeKeys.add(key);
  addedEdges.push(edge.edge_id);
}

for (const object of [...skillObjects, extraSkill, ...domains, ...patterns, ...failures]) upsertObject(object);
saveRegistry(vault, registry);

for (const pattern of patterns) {
  addEdge(project, 'implements', pattern.object_id);
  for (const run of pattern.source_runs || []) addEdge(pattern.object_id, 'learned_from', run);
  for (const ev of pattern.source_evidence || []) {
    addEdge(pattern.object_id, 'verified_by', ev);
    addEdge(pattern.object_id, 'derived_from', ev);
  }
  for (const skill of pattern.skills || []) addEdge(pattern.object_id, 'requires_skill', skill);
  for (const domain of pattern.domains || []) addEdge(pattern.object_id, 'applies_to', domain);
}

for (const failure of failures) {
  addEdge(failure.object_id, 'affects', project);
  for (const run of failure.source_runs || []) addEdge(failure.object_id, 'learned_from', run);
  for (const ev of failure.source_evidence || []) addEdge(failure.object_id, 'verified_by', ev);
  for (const skill of failure.skills || []) addEdge(failure.object_id, 'requires_skill', skill);
  for (const domain of failure.domains || []) addEdge(failure.object_id, 'applies_to', domain);
}

if (created.length || addedEdges.length) {
  appendJsonl(p.transactions, {
    transaction_id: id('txn'),
    transaction_type: 'learning-objectification',
    status: 'committed',
    created_at: createdAt,
    committed_at: now(),
    project_id: sourceProject,
    objects_created: created,
    objects_updated: updated.filter((x) => !created.includes(x)),
    edges_added: addedEdges,
    summary: 'Objectified high-value Meta Word of Mouth patterns and failure signatures with source evidence, skills, and applicability domains.'
  });
}

console.log(JSON.stringify({
  objects_created: created.length,
  objects_updated: updated.length,
  edges_added: addedEdges.length,
  created,
  edges: addedEdges.length
}, null, 2));
