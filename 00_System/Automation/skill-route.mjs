#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path';
const argv=process.argv.slice(2); const vault=path.resolve(argv[0]||process.cwd());
const jsonMode=argv.includes('--json'); const qparts=argv.slice(1).filter(x=>x!=='--json'); const query=qparts.join(' ').trim();
if(!query){console.error('Usage: node skill-route.mjs <vault> <request text> [--json]');process.exit(2)}
const load=p=>JSON.parse(fs.readFileSync(path.join(vault,p),'utf8'));
const reg=load('00_System/Skill OS/skill-registry.json'); const graph=load('00_System/Skill OS/skill-graph.json'); const bundles=load('00_System/Skill OS/skill-bundles.json');
const q=query.toLowerCase(); const words=new Set(q.split(/[^a-z0-9+#.]+/).filter(Boolean));
function scoreText(text,weight=1){const t=String(text||'').toLowerCase();let s=0;if(q.includes(t)&&t.length>2)s+=8*weight+Math.min(6,t.split(/\s+/).length)*weight;const toks=t.split(/[^a-z0-9+#.]+/).filter(Boolean);s+=toks.filter(x=>words.has(x)).length*2*weight;return s}
function skillScore(s){let z=scoreText(s.name,2)+scoreText(s.category,0.5);for(const t of s.triggers||[])z+=scoreText(t,1);return z}
function bundleScore(b){let z=scoreText(b.name,1);for(const t of b.triggers||[])z+=scoreText(t,1.4);return z}
const ranked=reg.skills.map(s=>({...s,score:skillScore(s)})).filter(s=>s.score>0).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));
const br=bundles.bundles.map(b=>({...b,score:bundleScore(b)})).filter(b=>b.score>=8).sort((a,b)=>b.score-a.score);
let primary=ranked[0]||null; const topBundle=br[0]||null;
if(topBundle && (!primary || primary.score<6 || topBundle.score>=primary.score*1.1)){
  const coreRanked=(topBundle.core_skills||[]).map(id=>reg.skills.find(s=>s.skill_id===id)).filter(Boolean).map(s=>({...s,score:skillScore(s)})).sort((a,b)=>b.score-a.score);
  primary=coreRanked.find(s=>s.score>0)||coreRanked[0]||primary;
  if(primary) primary={...primary,selection_reason:`bundle:${topBundle.bundle_id}`};
}
const node=primary?graph.nodes.find(n=>n.skill_id===primary.skill_id):null;
const result={query,primary:primary?{...primary}:null,bundle:topBundle,support_candidates:[],alternatives:ranked.filter(x=>!primary||x.skill_id!==primary.skill_id).slice(0,5)};
if(primary&&node){const ids=[...(node.handoff_to||[]),...(node.related||[])];for(const id of ids){const s=reg.skills.find(x=>x.skill_id===id);if(s&&!result.support_candidates.some(x=>x.skill_id===id))result.support_candidates.push(s)}result.support_candidates=result.support_candidates.slice(0,5)}
if(jsonMode){console.log(JSON.stringify(result,null,2));process.exit(0)}
console.log('OMAR BRAIN SKILL ROUTER v2');console.log(`Query: ${query}`);
if(!primary){console.log('No confident active skill match. Route through Skills HQ; consider a candidate skill only after deduplication.');process.exit(0)}
console.log(`\nPRIMARY\n- ${primary.name} (${primary.skill_id})${primary.selection_reason?` via ${primary.selection_reason}`:` score=${primary.score}`}`);console.log(`  maturity=${primary.maturity} risk=${primary.risk_level||'unknown'} context=${primary.context_cost||'medium'}`);console.log(`  path=${primary.path}`);
if(br[0]){console.log(`\nBUNDLE CANDIDATE\n- ${br[0].name} (${br[0].bundle_id}) score=${br[0].score}`);console.log(`  core=${br[0].core_skills.join(', ')}`);console.log('  NOTE: optional skills are lazy-loaded, never all at once.');}
if(result.support_candidates.length){console.log('\nGRAPH HANDOFF / NEIGHBORS');for(const s of result.support_candidates)console.log(`- ${s.name} (${s.skill_id})`)}
console.log('\nCONTEXT LAW: one primary skill; add 0-2 support skills only through explicit handoff, graph edge, stack evidence, or active bundle phase.');
