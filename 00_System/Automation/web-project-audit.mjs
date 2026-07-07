#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const repo = path.resolve(process.argv[2] || process.cwd());
const findings=[];
const add=(severity,id,msg,evidence='')=>findings.push({severity,id,message:msg,evidence});
const exists=(p)=>fs.existsSync(path.join(repo,p));
function walk(dir){let out=[]; for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','node_modules','.next','dist','build','coverage','.turbo'].includes(e.name)) continue; const p=path.join(dir,e.name); if(e.isDirectory()) out.push(...walk(p)); else out.push(p);} return out;}
const files=walk(repo);
const rel=p=>path.relative(repo,p).replaceAll('\\','/');
const packageFiles=['package-lock.json','pnpm-lock.yaml','yarn.lock','bun.lock','bun.lockb'].filter(exists);
if(exists('package.json') && packageFiles.length===0) add('critical','WEB-SUP-001','package.json exists but no recognized lockfile found');
if(packageFiles.length>1) add('major','WEB-SUP-001',`multiple lockfiles found: ${packageFiles.join(', ')}`);
if(!exists('.gitignore')) add('major','WEB-DEL-002','no .gitignore found');
for(const p of files){
  const r=rel(p); const st=fs.statSync(p);
  if(/(^|\/)\.env($|\.)/.test(r) && !/\.example$|\.sample$|\.template$/.test(r)) add('blocker','WEB-SEC-026',`possible environment secret file in repo tree: ${r}`);
  if(st.size<2_000_000 && /\.(js|jsx|ts|tsx|mjs|cjs|py|php|java|go|rs)$/.test(r)){
    const lines=fs.readFileSync(p,'utf8').split(/\r?\n/).length;
    if(lines>1000) add('critical','WEB-ARCH-018',`source file exceeds 1000 lines: ${r} (${lines})`);
    else if(lines>600) add('major','WEB-ARCH-018',`source file exceeds 600-line architecture review threshold: ${r} (${lines})`);
  }
}
const ci = files.some(p=>/\.github\/workflows\/.*\.ya?ml$/.test(rel(p))) || exists('.gitlab-ci.yml') || exists('Jenkinsfile');
if(!ci) add('major','WEB-DEL-002','no recognized CI configuration found');
const tests=files.filter(p=>/(^|\/)(test|tests|__tests__|e2e)(\/|$)|\.(test|spec)\.[^.]+$/.test(rel(p)));
if(tests.length===0) add('critical','WEB-TEST-001','no recognized tests found');
const e2e=files.some(p=>/playwright\.config|cypress\.config|(^|\/)e2e\//.test(rel(p)));
if(!e2e) add('major','WEB-TEST-005','no recognized browser E2E setup found (may be not applicable; verify manually)');
const pkg=exists('package.json')?JSON.parse(fs.readFileSync(path.join(repo,'package.json'),'utf8')):null;
if(pkg){
  const scripts=pkg.scripts||{};
  for(const s of ['build','test']) if(!scripts[s]) add('major','WEB-DEL-002',`package.json missing '${s}' script`);
  if(!scripts.lint && !scripts['typecheck'] && !scripts['type-check']) add('major','WEB-DEL-002','no lint/typecheck script found');
}
const sevRank={blocker:0,critical:1,major:2,minor:3}; findings.sort((a,b)=>sevRank[a.severity]-sevRank[b.severity]||a.id.localeCompare(b.id));
console.log(JSON.stringify({repo,checked:new Date().toISOString(),finding_count:findings.length,findings},null,2));
process.exit(findings.some(f=>f.severity==='blocker')?1:0);
