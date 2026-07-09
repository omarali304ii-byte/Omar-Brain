#!/usr/bin/env node
import path from 'node:path';
const root=path.resolve(process.cwd()).replace(/\\/g,'/');
let input=''; process.stdin.setEncoding('utf8'); process.stdin.on('data',d=>input+=d); process.stdin.on('end',()=>{
  let obj={}; try{obj=JSON.parse(input||'{}')}catch{}
  const ti=obj.tool_input||{}; const raw=ti.file_path||ti.path||ti.filename||'';
  if(!raw) process.exit(0);
  const norm=path.resolve(raw).replace(/\\/g,'/');
  const blocked=[ '/.git/', '/.env', '/secrets/', '/credentials/' ];
  if(!norm.startsWith(root+'/') || blocked.some(x=>norm.toLowerCase().includes(x.toLowerCase()))){
    console.error(`Blocked Memory Curator write outside governed Brain or into protected path: ${raw}`); process.exit(2);
  }
  process.exit(0);
});
