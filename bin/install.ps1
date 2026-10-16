<#
.SYNOPSIS
    Instala ou atualiza a skill RWS no Antigravity (global ou por projeto).

.DESCRIPTION
    Copia os workflows como skills individuais no diretório de skills do Antigravity
    (~/.gemini/config/skills ou <projeto>/.agents/skills), garantindo que todos os
    comandos (/implement, /ticket-new, /grill, etc.) apareçam nativamente no menu
    de autocomplete (slash commands) da UI do Antigravity.

.PARAMETER Scope
    "global" (padrão) para ~/.gemini/config ou "project" para o projeto local.

.PARAMETER TargetDir
    Caminho do projeto alvo (obrigatório se Scope for "project").
#>
[CmdletBinding()]
param(
    [ValidateSet("global", "project")]
    [string]$Scope = "global",

    [string]$TargetDir = ""
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent $ScriptDir

if ($Scope -eq "global") {
    $TargetRoot = Join-Path $HOME ".gemini\config"
} else {
    if (-not $TargetDir) {
        $TargetDir = Get-Location
    }
    $TargetRoot = Join-Path $TargetDir ".agents"
}

$SkillsDir = Join-Path $TargetRoot "skills"

Write-Host "==> Instalando RWS Skill no Antigravity (Escopo: $Scope)..." -ForegroundColor Cyan
Write-Host "    Destino: $SkillsDir" -ForegroundColor Gray

# 1. Cria diretórios base
New-Item -ItemType Directory -Path $SkillsDir -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $TargetRoot "core") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $TargetRoot "templates") -Force | Out-Null

# 2. Copia core e templates para resolução de links relativos (../../core e ../../templates)
Copy-Item -Path (Join-Path $RepoRoot "core\*") -Destination (Join-Path $TargetRoot "core") -Recurse -Force
Copy-Item -Path (Join-Path $RepoRoot "templates\*") -Destination (Join-Path $TargetRoot "templates") -Recurse -Force

# 3. Instala a skill mestra 'rws'
$RwsSkillDir = Join-Path $SkillsDir "rws"
New-Item -ItemType Directory -Path $RwsSkillDir -Force | Out-Null
Copy-Item -Path (Join-Path $RepoRoot "SKILL.md") -Destination (Join-Path $RwsSkillDir "SKILL.md") -Force
Copy-Item -Path (Join-Path $RepoRoot "core") -Destination $RwsSkillDir -Recurse -Force
Copy-Item -Path (Join-Path $RepoRoot "templates") -Destination $RwsSkillDir -Recurse -Force
if (Test-Path (Join-Path $RepoRoot "bin")) {
    Copy-Item -Path (Join-Path $RepoRoot "bin") -Destination $RwsSkillDir -Recurse -Force
}

# 4. Instala cada skill modular
$SourceSkillsDir = if (Test-Path (Join-Path $RepoRoot "skills")) {
    Join-Path $RepoRoot "skills"
} else {
    Join-Path $RepoRoot "workflows"
}
$InstalledCount = 1

Get-ChildItem -Directory $SourceSkillsDir | ForEach-Object {
    $SkillName = $_.Name
    if ($SkillName -ne "rws") {
        $TargetSkillDir = Join-Path $SkillsDir $SkillName
        New-Item -ItemType Directory -Path $TargetSkillDir -Force | Out-Null
        Copy-Item -Path (Join-Path $_.FullName "*") -Destination $TargetSkillDir -Recurse -Force
        $InstalledCount++
        Write-Host "    [+] /$SkillName" -ForegroundColor Green
    }
}

Write-Host "`n==> Sucesso! $InstalledCount skills instaladas em $SkillsDir" -ForegroundColor Cyan
Write-Host "    Slash commands disponíveis na UI do Antigravity:" -ForegroundColor Yellow
Write-Host "    /implement, /ticket-new, /ticket-tdd, /ticket-code, /ticket-review, /ticket-add," -ForegroundColor Gray
Write-Host "    /grill, /grill-design, /setup-brown-space, /setup-green-space, /rws, etc." -ForegroundColor Gray
