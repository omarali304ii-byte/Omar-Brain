#!/usr/bin/env node
import path from 'node:path';
import {ciPaths,readJsonl,loadRegistry,readJson} from './ci-lib.mjs';
const vault=path.resolve(process.argv[2]||process.cwd()), p=ciPaths(vault), objects=new Map((loadRegistry(vault).objects||[]).map(o=>[o.object_id,o])), edges=readJsonl(p.edges), events=readJsonl(p.events), vocab=readJson(p.vocabulary,{relations:[]}), rels=new Map((vocab.relations||[]).map(r=>[r.id,r])); const errors=[],warnings=[]; const eventIds=new Set(events.map(e=>e.event_id));
for(const e of events){if(!e.event_id||!e.event_type||!e.occurred_at||!e.correlation_id)errors.push(`event missing causal context: ${e.event_id||'(no id)'}`);if(e.causation_id&&!eventIds.has(e.causation_id))warnings.push(`event ${e.event_id} causation_id not found: ${e.causation_id}`)}
for(const e of edges){if(!e.edge_id||!rels.has(e.relation))errors.push(`edge invalid relation/id: ${e.edge_id||'(no id)'} ${e.relation}`);if(!objects.has(e.from)||!objects.has(e.to))errors.push(`edge endpoint missing: ${e.edge_id}`);const rule=rels.get(e.relation);if(rule?.target_type&&objects.get(e.to)?.object_type!==rule.target_type)errors.push(`edge ${e.edge_id} ${e.relation} target must be ${rule.target_type}`)}
console.log(JSON.stringify({events:events.length,edges:edges.length,errors,warnings},null,2));process.exit(errors.length?1:0);
