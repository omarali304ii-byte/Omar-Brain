param(
    [Parameter(Mandatory = $true)]
    [string]$AgentLoopDir,

    [switch]$DryRun,
    [int]$MaxBatches = 20,
    [int]$MaxAttempts = 3,
    [int]$MaxTurns = 80,
    [ValidateSet('default','acceptEdits','plan','auto','dontAsk','manual')]
    [string]$PermissionMode = 'acceptEdits',
    [string]$Model = ''
)

$ErrorActionPreference = 'Stop'
$runner = Join-Path $PSScriptRoot 'claude-batch-runner.mjs'

if (-not (Test-Path -LiteralPath $runner)) {
    throw "Runner not found: $runner"
}
if (-not (Test-Path -LiteralPath $AgentLoopDir)) {
    throw "Agent Loop directory not found: $AgentLoopDir"
}

$argsList = @(
    $runner,
    $AgentLoopDir,
    '--max-batches', $MaxBatches,
    '--max-attempts', $MaxAttempts,
    '--max-turns', $MaxTurns,
    '--permission-mode', $PermissionMode
)

if ($DryRun) { $argsList += '--dry-run' }
if ($Model) { $argsList += @('--model', $Model) }

& node @argsList
exit $LASTEXITCODE
