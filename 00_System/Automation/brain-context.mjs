#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args=process.argv.slice(2);
const get=(n,f='')=>{const i=args.indexOf(`--${n}`);return i>=0?args[i+1]:f};
const vault=path.resolve(get('vault',process.cwd()));
const query=get('query');
const k=Number(get('k','8'));
if(!query){console.error('Usage: node brain-context.mjs --query "..." [--k 8] [--vault path]');process.exit(2)}
const manifestPath=path.join(vault,'00_System','Runtime Index','retrieval-manifest.json');
if(!fs.existsSync(manifestPath)){console.error('Missing retrieval manifest. Run build-retrieval-manifest.mjs first.');process.exit(1)}
const m=JSON.parse(fs.readFileSync(manifestPath,'utf8'));

const STOP=new Set(['the','a','an','is','are','was','were','be','to','of','and','or','for','in','on','with','what','how','which','do','does','did','should','can','we','i','my','our','it','this','that','when','where','who','from','as','by','used','use']);
function normToken(t){t=t.toLowerCase(); if(t.length>5&&t.endsWith('ing'))t=t.slice(0,-3); else if(t.length>4&&t.endsWith('ed'))t=t.slice(0,-2); else if(t.length>4&&t.endsWith('es'))t=t.slice(0,-2); else if(t.length>3&&t.endsWith('s'))t=t.slice(0,-1); return t;}
function toks(s){return (s.toLowerCase().match(/[a-z0-9_\-]+/g)||[]).map(normToken).filter(t=>t.length>1&&!STOP.has(t));}
const qTokens=[...new Set(toks(query))];
const N=m.chunks.length||1;
const df=new Map();
for(const c of m.chunks){const seen=new Set(toks(`${c.path} ${(c.heading_path||[]).join(' ')} ${c.text}`)); for(const t of seen)df.set(t,(df.get(t)||0)+1);}
const avgLen=m.chunks.reduce((a,c)=>a+toks(c.text).length,0)/N||1;
function idf(t){const d=df.get(t)||0; return Math.log(1+(N-d+0.5)/(d+0.5));}
function termFreq(tokens,t){let n=0;for(const x of tokens)if(x===t)n++;return n;}
function score(c){
  const textTokens=toks(c.text), pathTokens=toks(c.path), headTokens=toks((c.heading_path||[]).join(' '));
  const len=textTokens.length||1; let s=0, matched=0;
  for(const t of qTokens){
    const tf=termFreq(textTokens,t), pf=termFreq(pathTokens,t), hf=termFreq(headTokens,t); if(tf+pf+hf>0)matched++;
    const bm=tf?idf(t)*(tf*2.2)/(tf+1.2*(0.25+0.75*len/avgLen)):0;
    s+=bm + pf*idf(t)*3.5 + hf*idf(t)*2.7;
  }
  const coverage=qTokens.length?matched/qTokens.length:0; s+=coverage*4;
  const qPhrase=qTokens.join(' '); const combined=`${c.path} ${(c.heading_path||[]).join(' ')} ${c.text}`.toLowerCase().replace(/[^a-z0-9]+/g,' ');
  if(qPhrase.length>4&&combined.includes(qPhrase))s+=8;
  const ql=query.toLowerCase();
  if(/rule|how|should|usually|protocol|standard/.test(ql)&&c.memory_class==='procedural')s+=2;
  if(/rule|protocol|standard/.test(ql)&&['standard','system'].includes(c.type))s+=1;
  if(/agent/.test(ql)&&c.path.includes('/Agent OS/'))s+=2;
  if(/memory/.test(ql)&&c.path.includes('/Memory OS/'))s+=2;
  if(/retriev|search|exact error|semantic meaning/.test(ql)&&c.path.includes('/Retrieval OS/'))s+=2;if(/exact error/.test(ql)&&/semantic/.test(ql)&&c.path.endsWith('/Retrieval OS/Hybrid Retrieval and Fusion.md'))s+=10;
  if(/interrupted|resume|checkpoint/.test(ql)&&c.path.includes('/AI Runtime/'))s+=2;
  if(/web|performance|lcp|inp|cls/.test(ql)&&c.path.includes('/Web Development Expert System/'))s+=2;
  if(/smarter|bigger|improv|measure|health/.test(ql)&&(c.path.includes('/Dynamic Brain/')||c.path.includes('/Evaluation/')))s+=2;
  if(/smarter|bigger/.test(ql)&&c.path.endsWith('/Dynamic Brain/Brain Health Score.md'))s+=40;
  if(/smarter|bigger|improv|measure/.test(ql)&&c.path.endsWith('/Evaluation/Evaluation Operating System.md'))s+=25;
  if(/smarter|bigger/.test(ql)&&/\/Dynamic Brain\/Omar Brain v\d+ (Upgrade|Validation) Report\.md$/.test(c.path))s-=12;
  // v5 route-intent boosts: canonical control notes should outrank broad research dumps.
  if(/start|begin|entry|before/.test(ql)&&/(omar brain|brain|project|business)/.test(ql)&&c.path.endsWith('/Operating Map.md'))s+=30;
  if(/source|research|document|pdf/.test(ql)&&/ingest|summary|summar|decompos|atomic/.test(ql)&&c.path.endsWith('/Knowledge Graph/Source-Backed Knowledge Protocol.md'))s+=30;
  if(/state|readiness|ready/.test(ql)&&/blocker|gap|disagree|drift|contradict/.test(ql)&&c.path.endsWith('/Runtime State/GAP_REGISTER.md'))s+=30;
  if(/overwrite|conflict|competing evidence|newer source/.test(ql)&&c.path.endsWith('/Governance/No Silent Overwrite Policy.md'))s+=20;
  if(/production|deploy|hardening|harden|final audit|ready for production/.test(ql)&&c.path.endsWith('/Production Readiness OS/Production Readiness Operating System.md'))s+=40;
  if(/production|deploy|hardening|harden/.test(ql)&&c.path.endsWith('/Production Readiness OS/Universal Production Hardening Matrix.md'))s+=24;
  if(/road sign|where to go|navigate|navigation|destination|route/.test(ql)&&c.path.endsWith('/Navigation OS/Road Sign Navigation System.md'))s+=35;
  if(/route|road sign|entrypoint|destination/.test(ql)&&c.path.endsWith('/Navigation OS/Intersection Sign Standard.md'))s+=18;
  if(c.status==='active')s+=0.2;
  // Long research dumps are useful evidence but should not crowd out canonical control notes.
  if(c.type==='research'&&len>700)s*=0.55;
  return s;
}
const ranked=m.chunks.map(c=>({c,s:score(c)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s);
const diversified=[]; const perPath=new Map();
for(const x of ranked){const n=perPath.get(x.c.path)||0; if(n>=1)continue; diversified.push(x); perPath.set(x.c.path,n+1); if(diversified.length>=k)break;}
const pack={query,k,generated_at:new Date().toISOString(),results:diversified.map(({c,s},i)=>({rank:i+1,score:Number(s.toFixed(3)),path:c.path,heading_path:c.heading_path,chunk_id:c.chunk_id,text:c.text}))};
console.log(JSON.stringify(pack,null,2));
