import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const now = () => new Date().toISOString();
export const dateOnly = () => new Date().toISOString().slice(0,10);
export const id = (prefix) => `${prefix}-${Date.now().toString(36)}-${crypto.randomBytes(4).toString('hex')}`;
export const sha256 = (value) => crypto.createHash('sha256').update(String(value)).digest('hex');
export const slash = (p) => p.replaceAll('\\','/');
export const slug = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80) || 'item';
export const tokenize = (s) => new Set((String(s).toLowerCase().match(/[a-z0-9_\-]+/g)||[]).filter(x=>x.length>2));
export function jaccard(a,b){ const A=tokenize(a), B=tokenize(b); if(!A.size||!B.size)return 0; let i=0; for(const x of A) if(B.has(x))i++; return i/(A.size+B.size-i); }

export function readJson(file, fallback=null){
  try { return JSON.parse(fs.readFileSync(file,'utf8')); }
  catch(e){ if(fallback!==null)return fallback; throw e; }
}
export function writeJsonAtomic(file, value){
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const tmp=`${file}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmp,JSON.stringify(value,null,2)+'\n','utf8');
  fs.renameSync(tmp,file);
}
export function appendJsonl(file, value){
  fs.mkdirSync(path.dirname(file),{recursive:true});
  fs.appendFileSync(file,JSON.stringify(value)+'\n','utf8');
}
export function readJsonl(file){
  if(!fs.existsSync(file))return[];
  return fs.readFileSync(file,'utf8').split(/\r?\n/).filter(Boolean).map((line,i)=>{
    try{return JSON.parse(line)}catch(e){throw new Error(`${file}:${i+1}: ${e.message}`)}
  });
}
export function ciPaths(vault){
  const root=path.join(vault,'00_System','Connected Intelligence OS');
  return {
    root,
    registry:path.join(root,'object-registry.json'),
    vocabulary:path.join(root,'relation-vocabulary.json'),
    edges:path.join(root,'edge-ledger.jsonl'),
    events:path.join(root,'event-ledger.jsonl'),
    provenance:path.join(root,'provenance-ledger.jsonl'),
    transactions:path.join(root,'transaction-ledger.jsonl'),
    impacts:path.join(root,'impact-queue.json'),
    candidates:path.join(root,'learning-candidates.json'),
    coverage:path.join(root,'reality-coverage.json')
  };
}
export function loadRegistry(vault){ return readJson(ciPaths(vault).registry,{registry_id:'omar-brain-object-registry-v1',version:'1.0',objects:[]}); }
export function saveRegistry(vault, registry){ registry.updated=dateOnly(); writeJsonAtomic(ciPaths(vault).registry,registry); }
export function relationSet(vault){ const v=readJson(ciPaths(vault).vocabulary,{relations:[]}); return new Set((v.relations||[]).map(x=>x.id)); }

export function loadProjectManifests(vault){
  const dir=path.join(vault,'40_Projects','Manifests'); if(!fs.existsSync(dir))return[];
  return fs.readdirSync(dir).filter(x=>x.endsWith('.json')).map(name=>{
    const p=path.join(dir,name); const m=readJson(p); return {...m,__path:slash(path.relative(vault,p))};
  });
}
export function resolveProject(vault, query){
  if(!query)return {status:'unresolved',reason:'no project hint'};
  const q=String(query).trim().toLowerCase(); const manifests=loadProjectManifests(vault);
  const exact=[];
  for(const m of manifests){
    const values=[m.project_id,m.title,...(m.aliases||[]),...(m.ambiguous_aliases||[])].filter(Boolean);
    if(values.some(v=>String(v).toLowerCase()===q))exact.push(m);
  }
  if(exact.length===1)return {status:'resolved',project:exact[0],method:'exact'};
  if(exact.length>1)return {status:'ambiguous',candidates:exact.map(x=>({project_id:x.project_id,title:x.title,path:x.__path})),reason:'alias maps to multiple projects'};
  const contained=[];
  for(const m of manifests){
    const values=[m.project_id,m.title,...(m.aliases||[]),...(m.ambiguous_aliases||[])].filter(Boolean);
    if(values.some(v=>q.includes(String(v).toLowerCase()) || String(v).toLowerCase().includes(q)))contained.push(m);
  }
  if(contained.length===1)return {status:'resolved',project:contained[0],method:'contained'};
  if(contained.length>1)return {status:'ambiguous',candidates:contained.map(x=>({project_id:x.project_id,title:x.title,path:x.__path})),reason:'multiple partial project matches'};
  return {status:'unresolved',reason:'no manifest match'};
}

export function parseFrontmatter(text){
  const n=String(text).replace(/\r\n/g,'\n'); if(!n.startsWith('---\n'))return {data:{},body:n};
  const e=n.indexOf('\n---\n',4); if(e<0)return {data:{},body:n};
  const data={}; for(const line of n.slice(4,e).split('\n')){ const m=line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/); if(m)data[m[1]]=m[2].trim().replace(/^['"]|['"]$/g,''); }
  return {data,body:n.slice(e+5)};
}
export function walk(dir){
  if(!fs.existsSync(dir))return[]; const out=[];
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(['.git','node_modules'].includes(ent.name))continue; const p=path.join(dir,ent.name);
    if(ent.isDirectory())out.push(...walk(p)); else out.push(p);
  }
  return out;
}
export function appendEvent(vault, evt){
  const event={...evt,event_id:evt.event_id||id('evt'),event_type:evt.event_type,occurred_at:evt.occurred_at||now(),correlation_id:evt.correlation_id||id('corr')};
  appendJsonl(ciPaths(vault).events,event); return event;
}
export function appendProvenance(vault, prov){
  const record={...prov,provenance_id:prov.provenance_id||id('prov'),recorded_at:prov.recorded_at||now()};
  appendJsonl(ciPaths(vault).provenance,record); return record;
}
export function enqueueImpact(vault, item){
  const p=ciPaths(vault); const q=readJson(p.impacts,{queue_id:'omar-brain-impact-queue-v1',version:'1.0',items:[]});
  q.items=q.items||[]; const rec={impact_id:item.impact_id||id('imp'),status:'pending',created_at:now(),...item}; q.items.push(rec); q.updated=dateOnly(); writeJsonAtomic(p.impacts,q); return rec;
}
