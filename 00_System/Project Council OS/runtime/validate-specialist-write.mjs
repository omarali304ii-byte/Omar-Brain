#!/usr/bin/env node
import path from 'node:path';
const agentName = process.argv[2];
let input=''; process.stdin.setEncoding('utf8'); process.stdin.on('data',d=>input+=d); process.stdin.on('end',()=>{
  let obj={}; try { obj=JSON.parse(input||'{}'); } catch {}
  const ti=obj.tool_input||{};
  const raw=ti.file_path||ti.path||ti.filename||'';
  if (!raw) process.exit(0);
  const norm=path.resolve(raw).replace(/\\/g,'/');
  const memory=`/.claude/agent-memory/`;
  if (norm.includes(memory)) process.exit(0);
  const ownAgent=`/20_Agent_Council/Agents/${agentName}/`;
  const ownControl=`/20_Agent_Council/Control/${agentName}/`;
  if (norm.includes(ownAgent) || norm.includes(ownControl)) process.exit(0);

  if (agentName === 'Project Observer') {
    const allowedTop=[
      '/20_Agent_Council/05_CURRENT_PROJECT_TRUTH.md',
      '/20_Agent_Council/06_ENVIRONMENT_AND_REPO_READINESS.md',
      '/20_Agent_Council/07_ACTIVE_WORK_BOARD.md',
      '/20_Agent_Council/09_AGENT_FINDINGS_INDEX.md'
    ];
    if (allowedTop.some(x=>norm.endsWith(x)) || norm.includes('/20_Agent_Council/Runtime/')) process.exit(0);
  }

  if (agentName === 'Memory Curator') {
    if (norm.endsWith('/20_Agent_Council/08_RULE_PROMOTION_QUEUE.md') ||
        norm.includes('/20_Agent_Council/Runtime/LEARNING_EVENTS.jsonl')) process.exit(0);
  }

  console.error(`Blocked role write outside governed scope for ${agentName}: ${raw}`);
  process.exit(2);
});
