#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const args = process.argv.slice(2);
const repo = path.resolve(args[0] || process.cwd());
const runSafe = args.includes('--run-safe');
const jsonOutIndex = args.indexOf('--json');
const mdOutIndex = args.indexOf('--md');
const jsonOut = jsonOutIndex >= 0 ? path.resolve(args[jsonOutIndex+1]) : null;
const mdOut = mdOutIndex >= 0 ? path.resolve(args[mdOutIndex+1]) : null;

if (!fs.existsSync(repo) || !fs.statSync(repo).isDirectory()) {
  console.error(`Repository/workspace not found: ${repo}`);
  process.exit(2);
}

const findings = [];
const add = (matrix_id, severity, title, evidence, risk, recommendation, status='OPEN') =>
  findings.push({id:`AUTO-${String(findings.length+1).padStart(3,'0')}`, matrix_id, severity, status, title, evidence, risk, recommendation});

const skipDirs = new Set(['.git','node_modules','.next','dist','build','coverage','.turbo','.venv','venv','target','vendor']);
function walk(dir) {
  const out=[];
  let ents=[];
  try { ents=fs.readdirSync(dir,{withFileTypes:true}); } catch { return out; }
  for (const e of ents) {
    if (skipDirs.has(e.name)) continue;
    const p=path.join(dir,e.name);
    if (e.isDirectory()) out.push(...walk(p)); else out.push(p);
  }
  return out;
}
const files=walk(repo);
const rel=p=>path.relative(repo,p).replaceAll('\\','/');
const exists=r=>fs.existsSync(path.join(repo,r));
const content=(r)=>{try{return fs.readFileSync(path.join(repo,r),'utf8')}catch{return ''}};
const smallTextFiles=files.filter(p=>{try{return fs.statSync(p).size<2_000_000}catch{return false}});

let pkg=null;
if (exists('package.json')) { try { pkg=JSON.parse(content('package.json')); } catch {} }
const deps = {...(pkg?.dependencies||{}), ...(pkg?.devDependencies||{})};
const stacks=[];
if(pkg) stacks.push('node');
if(deps.next) stacks.push('nextjs');
if(deps.react) stacks.push('react');
if(exists('pyproject.toml')||exists('requirements.txt')) stacks.push('python');
if(exists('composer.json')) stacks.push('php');
if(exists('go.mod')) stacks.push('go');
if(exists('Cargo.toml')) stacks.push('rust');
if(exists('pubspec.yaml')) stacks.push('flutter');
if(files.some(p=>/\.(csproj|sln)$/.test(rel(p)))) stacks.push('dotnet');
if(exists('Dockerfile')||exists('docker-compose.yml')||exists('compose.yml')||exists('compose.yaml')) stacks.push('docker');

let git = {available:false};
if (exists('.git')) {
  const rev=spawnSync('git',['rev-parse','HEAD'],{cwd:repo,encoding:'utf8'});
  const branch=spawnSync('git',['branch','--show-current'],{cwd:repo,encoding:'utf8'});
  const status=spawnSync('git',['status','--short'],{cwd:repo,encoding:'utf8'});
  if(rev.status===0) git={available:true,revision:rev.stdout.trim(),branch:branch.stdout.trim(),dirty:Boolean(status.stdout.trim()),status:status.stdout.trim().split(/\r?\n/).filter(Boolean)};
}
if (!git.available) add('PROD-001','P2','Exact revision is not automatically pinned','No readable .git revision found','Audit can drift from the release candidate','Record exact revision/artifact digest manually.');
else if (git.dirty) add('PROD-001','P2','Working tree is not clean',git.status.slice(0,20).join('; '),'Audit may not match intended release','Decide intended revision and commit/stash intentional changes.');

if(!exists('.gitignore')) add('PROD-013','P1','No .gitignore found','Repository root lacks .gitignore','Secrets/generated files may be committed','Add and review repository ignore policy.');

const envFiles=files.map(rel).filter(r=>/(^|\/)\.env($|\.)/.test(r) && !/(example|sample|template)/i.test(r));
for(const r of envFiles) add('PROD-005','P0','Possible real environment file in workspace',r,'Secrets may leak through repo/artifacts','Remove from tracked content, rotate exposed secrets, keep safe example only.');

const lockfiles=['package-lock.json','pnpm-lock.yaml','yarn.lock','bun.lock','bun.lockb'].filter(exists);
if(pkg && lockfiles.length===0) add('PROD-012','P1','Node project has no recognized lockfile','package.json exists without lockfile','Non-reproducible installs and supply-chain drift','Commit one canonical lockfile.');
if(lockfiles.length>1) add('PROD-012','P2','Multiple Node lockfiles found',lockfiles.join(', '),'Package manager ambiguity','Keep one canonical package manager/lockfile.');

const ci = files.some(p=>/\.github\/workflows\/.*\.ya?ml$/.test(rel(p))) || exists('.gitlab-ci.yml') || exists('Jenkinsfile');
if(!ci) add('PROD-025','P2','No recognized CI pipeline found','No GitHub/GitLab/Jenkins CI detected','Release checks may be manual/inconsistent','Add repeatable CI for required gates or document equivalent.');

const tests=files.filter(p=>/(^|\/)(test|tests|__tests__|e2e)(\/|$)|\.(test|spec)\.[^.]+$/.test(rel(p)));
if(tests.length===0) add('PROD-015','P1','No recognized tests found','Static scan found no common test paths','Critical behavior may regress silently','Add risk-based tests or document alternative executable evidence.');
const e2e=files.some(p=>/playwright\.config|cypress\.config|(^|\/)e2e\//.test(rel(p)));
if((stacks.includes('nextjs')||stacks.includes('react'))&&!e2e) add('PROD-015','P2','No recognized browser E2E setup','No Playwright/Cypress/e2e directory detected','Critical user journeys may be unverified','Add E2E for critical journeys or record manual runtime evidence.');

if(pkg){
  const scripts=pkg.scripts||{};
  if(!scripts.build) add('PROD-014','P1',"Missing 'build' script",'package.json scripts','Release build cannot be reproduced by standard command',"Add a deterministic build script.");
  if(!scripts.test) add('PROD-015','P2',"Missing 'test' script",'package.json scripts','Test gate may be absent or hidden',"Add test script or document exact test commands.");
  if(!scripts.lint && !scripts.typecheck && !scripts['type-check']) add('PROD-014','P2','No lint/typecheck script found','package.json scripts','Static defects may escape','Add applicable lint/typecheck gate.');
}

const sourceCandidates=smallTextFiles.filter(p=>/\.(js|jsx|ts|tsx|mjs|cjs|py|php|go|rs|java|cs|json|ya?ml)$/.test(rel(p)));
const secretPatterns=[
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,'private key material'],
  [/\bAKIA[0-9A-Z]{16}\b/,'AWS access key pattern'],
  [/\bghp_[A-Za-z0-9]{30,}\b/,'GitHub token pattern'],
  [/\bsk-[A-Za-z0-9_-]{20,}\b/,'API key pattern']
];
for(const p of sourceCandidates){
  let t=''; try{t=fs.readFileSync(p,'utf8')}catch{continue}
  for(const [rx,label] of secretPatterns) if(rx.test(t)) add('PROD-005','P0',`Possible ${label} in source`,rel(p),'Credential exposure','Remove, rotate, and add secret scanning.');
}

const generatedPatterns=[
  /(^|\/)playwright-report\//, /(^|\/)test-results\//, /(^|\/)coverage\//,
  /\.db$/, /\.sqlite$/, /(^|\/)public\/uploads\//
];
for(const r of files.map(rel)) {
  if(generatedPatterns.some(rx=>rx.test(r))) {
    add('PROD-013','P2','Generated/local mutable artifact requires review',r,'Accidental data leak or release pollution','Verify whether intentional production asset; otherwise untrack/ignore.');
    if(findings.filter(f=>f.matrix_id==='PROD-013'&&f.title.startsWith('Generated')).length>=8) break;
  }
}

const allSmallText = sourceCandidates.map(p=>({r:rel(p),t:(()=>{try{return fs.readFileSync(p,'utf8')}catch{return ''}})()}));
const joined = allSmallText.slice(0,3000).map(x=>x.t).join('\n');
const apiFiles = files.map(rel).filter(r=>/(^|\/)(api|routes?|controllers?)(\/|$)/i.test(r));
if(apiFiles.length && !/(rate.?limit|limiter|throttle)/i.test(joined)) add('PROD-007','P2','No obvious rate limiting/abuse control detected',`${apiFiles.length} API/route-like files detected`,'Public or expensive endpoints may be abused','Review auth/contact/order/upload/webhook endpoints and implement applicable limits.');

const uploadFiles=allSmallText.filter(x=>/upload|multipart|formdata/i.test(x.r+' '+x.t));
if(uploadFiles.length){
  const hasSize=uploadFiles.some(x=>/(max.?size|file.?size|size\s*[<>]=?|content-length)/i.test(x.t));
  const hasType=uploadFiles.some(x=>/(mime|mimetype|content-type|allowed.?type|extension)/i.test(x.t));
  if(!hasSize||!hasType) add('PROD-006','P1','Upload handling may lack size/type hardening',uploadFiles.slice(0,5).map(x=>x.r).join(', '),'Resource abuse or unsafe content','Verify server-side size, MIME/signature, extension, storage path and deletion safety.');
}
const dshi=allSmallText.filter(x=>/dangerouslySetInnerHTML/.test(x.t));
if(dshi.length) add('PROD-006','P2','dangerouslySetInnerHTML requires sanitization proof',dshi.slice(0,5).map(x=>x.r).join(', '),'XSS if content is untrusted','Prove trusted source or sanitize with tested policy.');

if(stacks.includes('nextjs')){
  const nextFiles=['next.config.js','next.config.mjs','next.config.ts','middleware.ts','src/middleware.ts','proxy.ts','src/proxy.ts'].filter(exists);
  const nt=nextFiles.map(content).join('\n');
  if(!/(X-Content-Type-Options|Content-Security-Policy|Referrer-Policy|Permissions-Policy|Strict-Transport-Security)/i.test(nt))
    add('PROD-017','P2','No obvious web security headers configuration detected',nextFiles.join(', ')||'no common Next config/middleware file','Missing browser hardening','Define applicable security headers and test deployed responses.');
  if(!/(metadataBase|NEXT_PUBLIC_SITE_URL|SITE_URL)/.test(joined))
    add('PROD-020','P2','No obvious canonical site URL/metadataBase strategy detected','Next.js project scan','OG/canonical URLs may fall back incorrectly','Define production site URL and canonical metadata strategy.');
}

const healthDetected=allSmallText.some(x=>/(\/health|healthz|readyz|readiness|liveness)/i.test(x.r+' '+x.t));
if((apiFiles.length||stacks.includes('docker'))&&!healthDetected) add('PROD-024','P2','No obvious health/readiness endpoint detected','Service/API/container indicators found','Orchestrator and operators may not know service readiness','Add health/readiness behavior appropriate to dependencies.');

const observabilityDetected=/(sentry|opentelemetry|pino|winston|datadog|newrelic|prom-client|request.?id|trace.?id)/i.test(joined);
if(apiFiles.length&&!observabilityDetected) add('PROD-023','P2','No obvious production observability instrumentation detected','API routes detected','Failures may be invisible or untraceable','Add structured logs/error capture/request correlation and critical metrics.');

const deployDetected=exists('Dockerfile')||exists('docker-compose.yml')||exists('compose.yml')||exists('compose.yaml')||
  files.some(p=>/(^|\/)(vercel\.json|netlify\.toml|fly\.toml|render\.yaml|ecosystem\.config\.)/.test(rel(p)));
if(!deployDetected) add('PROD-025','P2','No recognized deployment definition found','Static scan','Deploy may be tribal/manual','Document and automate repeatable production deployment.');

const runbookDetected=files.some(p=>/(^|\/)(runbook|deployment|deploy|operations|recovery|rollback).*\.md$/i.test(rel(p)));
if(!runbookDetected) add('PROD-029','P2','No obvious deployment/recovery runbook found','Static scan','Operational recovery may depend on memory','Add verified deploy, rollback/roll-forward and recovery instructions.');

const backupDetected=allSmallText.some(x=>/(backup|restore)/i.test(x.r+' '+x.t));
const dataIndicators=/(prisma|sequelize|typeorm|drizzle|mongoose|postgres|mysql|sqlite|redis|database_url)/i.test(joined);
if(dataIndicators&&!backupDetected) add('PROD-011','P1','Data store detected without obvious backup/restore evidence','Database-related code/config found','Data loss or unrecoverable release','Define backup and test restore/recovery.');

const mutableJson = allSmallText.filter(x=>/src\/data\/.*\.json$/i.test(x.r));
const writesFiles = allSmallText.some(x=>/(writeFile|writeFileSync|appendFile|renameSync)/.test(x.t));
if(mutableJson.length && writesFiles) add('PROD-009','P1','Possible mutable JSON/file persistence in application source',mutableJson.slice(0,5).map(x=>x.r).join(', '),'Concurrent writes/deploy overwrite/no transactions','Prove persistence/locking/backups or migrate mutable state to durable datastore.');

const commandResults=[];
if(runSafe && pkg){
  const scripts=pkg.scripts||{};
  for(const name of ['lint','typecheck','type-check','test','build']){
    if(!scripts[name]) continue;
    const r=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['run',name],{cwd:repo,encoding:'utf8',timeout:180000});
    commandResults.push({command:`npm run ${name}`,status:r.status,stdout:(r.stdout||'').slice(-4000),stderr:(r.stderr||'').slice(-4000)});
    if(r.status!==0) add(name==='build'?'PROD-014':'PROD-015','P1',`Command failed: npm run ${name}`,`exit ${r.status}`,'Release gate failed','Fix root cause and rerun the same command.');
  }
}

const counts={P0:0,P1:0,P2:0,P3:0};
for(const f of findings) counts[f.severity]=(counts[f.severity]||0)+1;
let preliminary_status='PRELIMINARY_PASS';
if(counts.P0||counts.P1) preliminary_status='BLOCKED';
else if(counts.P2) preliminary_status='HARDENING_REQUIRED';

const report={
  tool:'omar-brain-production-readiness-baseline-v1',
  disclaimer:'Preliminary scanner only. It cannot certify PRODUCTION_READY; follow the Production Readiness OS and independent critic review.',
  repo,
  checked_at:new Date().toISOString(),
  stack:[...new Set(stacks)],
  git,
  run_safe_commands:runSafe,
  command_results:commandResults,
  counts,
  preliminary_status,
  findings
};

function toMarkdown(r){
  const lines=[
    '# Preliminary Production Readiness Audit',
    '',
    `- Repo: \`${r.repo}\``,
    `- Checked: ${r.checked_at}`,
    `- Stack: ${r.stack.join(', ')||'unknown'}`,
    `- Revision: ${r.git.revision||'unknown'}`,
    `- Branch: ${r.git.branch||'unknown'}`,
    `- Preliminary status: **${r.preliminary_status}**`,
    `- Findings: P0=${r.counts.P0}, P1=${r.counts.P1}, P2=${r.counts.P2}, P3=${r.counts.P3}`,
    '',
    '> This scan cannot certify production readiness. Manual/applicable gate review and independent Critic verdict are required.',
    '',
    '## Findings',
    ''
  ];
  for(const f of r.findings){
    lines.push(`### ${f.id} — ${f.severity} — ${f.title}`,'',`- Matrix: \`${f.matrix_id}\``,`- Evidence: ${f.evidence}`,`- Risk: ${f.risk}`,`- Recommendation: ${f.recommendation}`,'');
  }
  if(!r.findings.length) lines.push('No static findings. This is not proof of production readiness.');
  return lines.join('\n');
}
if(jsonOut){fs.mkdirSync(path.dirname(jsonOut),{recursive:true});fs.writeFileSync(jsonOut,JSON.stringify(report,null,2));}
if(mdOut){fs.mkdirSync(path.dirname(mdOut),{recursive:true});fs.writeFileSync(mdOut,toMarkdown(report));}
console.log(JSON.stringify(report,null,2));
process.exit(counts.P0||counts.P1?2:counts.P2?1:0);
