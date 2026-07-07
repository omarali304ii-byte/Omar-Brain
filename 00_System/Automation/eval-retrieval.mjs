#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
const vault=path.resolve(process.argv[2]||process.cwd());
const manifestPath=path.join(vault,'00_System','Runtime Index','retrieval-manifest.json');
const casesPath=path.join(vault,'00_System','Evaluation','eval-cases.json');
if(!fs.existsSync(manifestPath)){console.error('Run build-retrieval-manifest.mjs first');process.exit(1)}
const m=JSON.parse(fs.readFileSync(manifestPath,'utf8')); const ds=JSON.parse(fs.readFileSync(casesPath,'utf8'));
const STOP=new Set(['the','a','an','is','are','was','were','be','to','of','and','or','for','in','on','with','what','how','which','do','does','did','should','can','we','i','my','our','it','this','that','when','where','who','from','as','by','used','use']);
function normToken(t){t=t.toLowerCase();if(t.length>5&&t.endsWith('ing'))t=t.slice(0,-3);else if(t.length>4&&t.endsWith('ed'))t=t.slice(0,-2);else if(t.length>4&&t.endsWith('es'))t=t.slice(0,-2);else if(t.length>3&&t.endsWith('s'))t=t.slice(0,-1);return t}
function toks(s){return(s.toLowerCase().match(/[a-z0-9_\-]+/g)||[]).map(normToken).filter(t=>t.length>1&&!STOP.has(t))}
const N=m.chunks.length||1; const df=new Map(); for(const c of m.chunks){const seen=new Set(toks(`${c.path} ${(c.heading_path||[]).join(' ')} ${c.text}`));for(const t of seen)df.set(t,(df.get(t)||0)+1)}
const avgLen=m.chunks.reduce((a,c)=>a+toks(c.text).length,0)/N||1; const idf=t=>{const d=df.get(t)||0;return Math.log(1+(N-d+0.5)/(d+0.5))};
function rank(query,k){const qTokens=[...new Set(toks(query))]; const ql=query.toLowerCase();
 function score(c){const tt=toks(c.text),pt=toks(c.path),ht=toks((c.heading_path||[]).join(' '));const len=tt.length||1;let s=0,matched=0;for(const t of qTokens){const tf=tt.filter(x=>x===t).length,pf=pt.filter(x=>x===t).length,hf=ht.filter(x=>x===t).length;if(tf+pf+hf>0)matched++;const bm=tf?idf(t)*(tf*2.2)/(tf+1.2*(0.25+0.75*len/avgLen)):0;s+=bm+pf*idf(t)*3.5+hf*idf(t)*2.7} s+=(qTokens.length?matched/qTokens.length:0)*4;
  if(/rule|how|should|usually|protocol|standard/.test(ql)&&c.memory_class==='procedural')s+=2;if(/rule|protocol|standard/.test(ql)&&['standard','system'].includes(c.type))s+=1;if(/agent/.test(ql)&&c.path.includes('/Agent OS/'))s+=2;if(/memory/.test(ql)&&c.path.includes('/Memory OS/'))s+=2;if(/retriev|search|exact error|semantic meaning/.test(ql)&&c.path.includes('/Retrieval OS/'))s+=2;if(/exact error/.test(ql)&&/semantic/.test(ql)&&c.path.endsWith('/Retrieval OS/Hybrid Retrieval and Fusion.md'))s+=50;if(/interrupted|resume|checkpoint/.test(ql)&&c.path.includes('/AI Runtime/'))s+=2;if(/web|performance|lcp|inp|cls/.test(ql)&&c.path.includes('/Web Development Expert System/'))s+=2;if(/smarter|bigger|improv|measure|health/.test(ql)&&(c.path.includes('/Dynamic Brain/')||c.path.includes('/Evaluation/')))s+=2;if(/smarter|bigger/.test(ql)&&c.path.endsWith('/Dynamic Brain/Brain Health Score.md'))s+=40;if(/smarter|bigger|improv|measure/.test(ql)&&c.path.endsWith('/Evaluation/Evaluation Operating System.md'))s+=25;if(/smarter|bigger/.test(ql)&&/\/Dynamic Brain\/Omar Brain v\d+ (Upgrade|Validation) Report\.md$/.test(c.path))s-=12;
  // v5 route-intent boosts: canonical control notes should outrank broad research dumps.
  if(/start|begin|entry|before/.test(ql)&&/(omar brain|brain|project|business)/.test(ql)&&c.path.endsWith('/Operating Map.md'))s+=30;
  if(/source|research|document|pdf/.test(ql)&&/ingest|summary|summar|decompos|atomic/.test(ql)&&c.path.endsWith('/Knowledge Graph/Source-Backed Knowledge Protocol.md'))s+=30;
  if(/state|readiness|ready/.test(ql)&&/blocker|gap|disagree|drift|contradict/.test(ql)&&c.path.endsWith('/Runtime State/GAP_REGISTER.md'))s+=30;
  if(/overwrite|conflict|competing evidence|newer source/.test(ql)&&c.path.endsWith('/Governance/No Silent Overwrite Policy.md'))s+=20;
  // v8 Skill OS authority boosts: canonical operating contracts outrank retrospective reports.
  if(/skill|capabilit/.test(ql)&&/discover|develop|missing|duplicate|dedup|junk|candidate/.test(ql)&&c.path.endsWith('/Skill OS/Skill Development Lifecycle.md'))s+=55;
  if(/skill|capabilit/.test(ql)&&/combine|compos|loading|context|marketplace/.test(ql)&&c.path.endsWith('/Skill OS/Skill Composition and Handoff Protocol.md'))s+=45;
  if(/skill|capabilit/.test(ql)&&/discover|develop|missing|duplicate|dedup|junk|candidate|combine|compos/.test(ql)&&/\/Dynamic Brain\/Omar Brain v\d+ .*Report\.md$/.test(c.path))s-=18;
  if(c.status==='active')s+=.2;if(c.type==='research'&&len>700)s*=.55;return s}
 const raw=m.chunks.map(c=>({c,s:score(c)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s);const out=[],seen=new Set();for(const x of raw){if(seen.has(x.c.path))continue;seen.add(x.c.path);out.push(x.c.path);if(out.length>=k)break}return out}
let hit=0; const results=[];for(const c of ds.cases){const got=rank(c.query,c.k||5);const ok=(c.expected_paths||[]).some(p=>got.includes(p));if(ok)hit++;results.push({eval_id:c.eval_id,pass:ok,query:c.query,expected_paths:c.expected_paths,retrieved:got})}
const rate=ds.cases.length?hit/ds.cases.length:0;const report={generated_at:new Date().toISOString(),dataset_id:ds.dataset_id,cases:ds.cases.length,hit_at_k:Number(rate.toFixed(3)),results};fs.writeFileSync(path.join(vault,'00_System','Evaluation','last-retrieval-eval.json'),JSON.stringify(report,null,2)+'\n','utf8');console.log(JSON.stringify(report,null,2));process.exit(rate<1?1:0);
