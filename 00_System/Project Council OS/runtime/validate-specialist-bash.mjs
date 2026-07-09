#!/usr/bin/env node
const agentName=process.argv[2]||'unknown';
let input=''; process.stdin.setEncoding('utf8'); process.stdin.on('data',d=>input+=d); process.stdin.on('end',()=>{
  let obj={}; try { obj=JSON.parse(input||'{}'); } catch {}
  const cmd=((obj.tool_input||{}).command||'').trim();
  if (!cmd) process.exit(0);
  const blocked=[
    /(^|\s)rm\s+/i, /(^|\s)(cp|mv|touch|mkdir|rmdir|chmod|chown|tee)\s+/i,
    /(^|\s)git\s+(reset|checkout|clean|rebase|merge|commit|push|pull|add|restore|switch|cherry-pick)\b/i,
    /(^|\s)(npm|pnpm|yarn)\s+(install|add|remove|update|uninstall)\b/i,
    /(^|\s)(docker\s+compose\s+down|docker\s+rm|kubectl\s+(apply|delete|patch)|terraform\s+apply)\b/i,
    /(^|\s)(psql|mysql|sqlite3)\b.*\b(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|CREATE)\b/i,
    /(^|[^<])>(?!>)/, /\bsed\s+-i\b/i, /\bperl\s+-pi\b/i,
    /\bpython(?:3)?\s+-c\b/i, /\bnode\s+(-e|--eval)\b/i, /\bpowershell\b/i, /\bcmd\s+\/c\b/i
  ];
  if (blocked.some(r=>r.test(cmd))) {
    console.error(`Blocked mutating Bash command for specialist ${agentName}: ${cmd}`);
    process.exit(2);
  }
  process.exit(0);
});
