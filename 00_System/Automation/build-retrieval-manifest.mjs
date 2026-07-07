#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const vault = path.resolve(process.argv[2] || process.cwd());
const outPath = path.resolve(process.argv[3] || path.join(vault, '00_System', 'Runtime Index', 'retrieval-manifest.json'));

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git','node_modules','.trash'].includes(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p)); else out.push(p);
  }
  return out;
}
function hash(s) { return crypto.createHash('sha256').update(s).digest('hex'); }
function frontmatter(text) {
  const n = text.replace(/\r\n/g,'\n');
  if (!n.startsWith('---\n')) return { data:{}, body:n };
  const end = n.indexOf('\n---\n',4); if (end < 0) return { data:{}, body:n };
  const data = {};
  for (const line of n.slice(4,end).split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/); if (!m) continue;
    data[m[1]] = m[2].trim().replace(/^['"]|['"]$/g,'');
  }
  return {data, body:n.slice(end+5)};
}
function sections(body) {
  const lines = body.split('\n');
  const out=[]; let stack=[]; let cur={heading:'', level:0, lines:[]};
  const flush=()=>{ const text=cur.lines.join('\n').trim(); if(text) out.push({...cur,text}); };
  for (const line of lines) {
    const m=line.match(/^(#{1,6})\s+(.+)$/);
    if(m){ flush(); const level=m[1].length; stack=stack.slice(0,level-1); stack[level-1]=m[2].trim(); cur={heading:m[2].trim(),level,headingPath:stack.filter(Boolean),lines:[line]}; }
    else cur.lines.push(line);
  }
  flush(); return out;
}
const docs=[]; const chunks=[];
for (const file of walk(vault).filter(f=>f.endsWith('.md'))) {
  const rel=path.relative(vault,file).replaceAll('\\','/');
  const raw=fs.readFileSync(file,'utf8'); const {data,body}=frontmatter(raw);
  if (data.ai_access === 'denied') continue;
  const docId=`note://${rel.replace(/\.md$/,'')}`; const contentHash=hash(raw);
  const stat=fs.statSync(file);
  docs.push({doc_id:docId,path:rel,content_hash:contentHash,updated:data.updated||data.created||stat.mtime.toISOString(),type:data.type||null,status:data.status||null,ai_access:data.ai_access||null});
  let i=0;
  for (const sec of sections(body)) {
    const text=sec.text.trim(); if(!text) continue;
    const anchor=(sec.heading||'root').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'root';
    chunks.push({chunk_id:`${docId}#${anchor}:${String(i).padStart(4,'0')}`,doc_id:docId,path:rel,heading_path:sec.headingPath||[],chunk_index:i,text,content_hash:hash(text),updated:data.updated||data.created||stat.mtime.toISOString(),type:data.type||null,status:data.status||null,ai_access:data.ai_access||null,memory_class:data.memory_class||null,project_id:data.project_id||null}); i++;
  }
}
const manifest={manifest_version:'1.0',generated_at:new Date().toISOString(),vault:path.basename(vault),doc_count:docs.length,chunk_count:chunks.length,documents:docs,chunks};
fs.mkdirSync(path.dirname(outPath),{recursive:true}); fs.writeFileSync(outPath,JSON.stringify(manifest,null,2));
console.log(`Retrieval manifest: ${outPath}`); console.log(`Documents: ${docs.length}`); console.log(`Chunks: ${chunks.length}`);
