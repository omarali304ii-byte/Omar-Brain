#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
import {ciPaths,readJson,writeJsonAtomic,readJsonl,appendJsonl,loadRegistry,saveRegistry,relationSet,appendEvent,appendProvenance,enqueueImpact,id,now,dateOnly} from './ci-lib.mjs';
const args=process.argv.slice(2); const vault=path.resolve(args[0]||process.cwd()); const get=(n,f='')=>{const i=args.indexOf(`--${n}`);return i>=0?args[i+1]:f};
const file=get('file'); if(!file){console.error('Usage: node brain-transaction.mjs <vault> --file transaction.json');process.exit(2)}
const tx=readJson(path.resolve(file)); tx.transaction_id=tx.transaction_id||id('btx'); tx.created_at=tx.created_at||now(); tx.operations=tx.operations||[];
const p=ciPaths(vault), rels=relationSet(vault), registry=loadRegistry(vault); const objMap=new Map((registry.objects||[]).map(o=>[o.object_id,o]));
const plannedObjects=new Map(objMap);for(const op of tx.operations||[])if(op.op==='create_object'&&op.object?.object_id)plannedObjects.set(op.object.object_id,op.object);
const allowed=new Set(['create_object','update_object','add_edge','append_event','append_provenance','enqueue_impact']);
const errors=[];
for(const op of tx.operations){
  if(!allowed.has(op.op))errors.push(`unsupported op ${op.op}`);
  if(op.op==='create_object'&&(!op.object?.object_id||objMap.has(op.object.object_id)))errors.push(`create_object invalid/duplicate ${op.object?.object_id}`);
  if(op.op==='update_object'&&!objMap.has(op.object_id))errors.push(`update_object unknown ${op.object_id}`);
  if(op.op==='add_edge'){
    if(!rels.has(op.edge?.relation))errors.push(`unknown relation ${op.edge?.relation}`);
    if(!plannedObjects.has(op.edge?.from)||!plannedObjects.has(op.edge?.to))errors.push(`edge endpoint missing ${op.edge?.from} -> ${op.edge?.to}`);
  }
  if(op.op==='append_event'&&!op.event?.event_type)errors.push('append_event missing event_type');
}
if(errors.length){appendJsonl(p.transactions,{...tx,status:'rejected',rejected_at:now(),errors});console.error(JSON.stringify({status:'rejected',transaction_id:tx.transaction_id,errors},null,2));process.exit(1)}
const snapshots={registry:fs.readFileSync(p.registry,'utf8'),edges:fs.existsSync(p.edges)?fs.readFileSync(p.edges,'utf8'):'',events:fs.existsSync(p.events)?fs.readFileSync(p.events,'utf8'):'',provenance:fs.existsSync(p.provenance)?fs.readFileSync(p.provenance,'utf8'):'',impacts:fs.readFileSync(p.impacts,'utf8')};
try{
  for(const op of tx.operations){
    if(op.op==='create_object'){registry.objects.push({...op.object,created_at:op.object.created_at||now(),updated_at:op.object.updated_at||now()});objMap.set(op.object.object_id,op.object)}
    else if(op.op==='update_object'){const o=objMap.get(op.object_id);Object.assign(o,op.patch||{}, {updated_at:now()})}
    else if(op.op==='add_edge')appendJsonl(p.edges,{edge_id:op.edge.edge_id||id('edge'),created_at:now(),...op.edge});
    else if(op.op==='append_event')appendEvent(vault,{correlation_id:tx.correlation_id||undefined,...op.event});
    else if(op.op==='append_provenance')appendProvenance(vault,op.provenance);
    else if(op.op==='enqueue_impact')enqueueImpact(vault,op.impact);
  }
  saveRegistry(vault,registry);
  const committed={...tx,status:'committed',committed_at:now()}; appendJsonl(p.transactions,committed); appendEvent(vault,{event_type:'transaction.committed',correlation_id:tx.correlation_id||undefined,transaction_id:tx.transaction_id});
  console.log(JSON.stringify({status:'committed',transaction_id:tx.transaction_id,operations:tx.operations.length},null,2));
}catch(e){
  fs.writeFileSync(p.registry,snapshots.registry);fs.writeFileSync(p.edges,snapshots.edges);fs.writeFileSync(p.events,snapshots.events);fs.writeFileSync(p.provenance,snapshots.provenance);fs.writeFileSync(p.impacts,snapshots.impacts);
  appendJsonl(p.transactions,{...tx,status:'rejected',rejected_at:now(),errors:[e.message]});console.error(JSON.stringify({status:'rolled_back',transaction_id:tx.transaction_id,error:e.message},null,2));process.exit(1)
}
