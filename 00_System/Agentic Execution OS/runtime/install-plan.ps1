param(
    [Parameter(Mandatory = $true)]
    [string]$PlanSpec,

    [Parameter(Mandatory = $true)]
    [string]$AgentLoopDir
)

$ErrorActionPreference = 'Stop'
$compiler = Join-Path $PSScriptRoot 'plan-compiler.mjs'
$validator = Join-Path $PSScriptRoot 'validate-agent-loop.mjs'

if (-not (Test-Path -LiteralPath $PlanSpec)) {
    throw "Plan spec not found: $PlanSpec"
}

& node $compiler $PlanSpec $AgentLoopDir
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& node $validator $AgentLoopDir
exit $LASTEXITCODE
