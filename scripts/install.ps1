<#
.SYNOPSIS
  Install the rws skill into Claude Code and/or Antigravity skill folders.
.PARAMETER Claude    Install for Claude Code.
.PARAMETER Agy       Install for Antigravity (agy).
.PARAMETER Project   Install into this project directory instead of globally.
.PARAMETER Link      Symlink instead of copy (needs Developer Mode or admin on Windows).
.PARAMETER Uninstall Remove the skill from the selected targets.
With no -Claude/-Agy, both are installed.
#>
param([switch]$Claude, [switch]$Agy, [string]$Project, [switch]$Link, [switch]$Uninstall)
$ErrorActionPreference = 'Stop'

$src  = (Resolve-Path (Join-Path $PSScriptRoot '..\skills\rws')).Path
$name = 'rws'
if (-not $Claude -and -not $Agy) { $Claude = $true; $Agy = $true }

$targets = @()
if ($Project) {
  if ($Claude) { $targets += Join-Path $Project '.claude\skills' }
  if ($Agy)    { $targets += Join-Path $Project '.agents\skills' }
} else {
  if ($Claude) { $targets += Join-Path $HOME '.claude\skills' }
  # Antigravity documents ~/.gemini/config/skills; the skills CLI writes to antigravity-cli/skills.
  if ($Agy)    { $targets += Join-Path $HOME '.gemini\config\skills'; $targets += Join-Path $HOME '.gemini\antigravity-cli\skills' }
}

foreach ($dir in $targets) {
  $dest = Join-Path $dir $name
  if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
  if ($Uninstall) { Write-Host "removed  $dest"; continue }
  New-Item -ItemType Directory -Force $dir | Out-Null
  if ($Link) { New-Item -ItemType SymbolicLink -Path $dest -Target $src | Out-Null; Write-Host "linked   $dest -> $src" }
  else { Copy-Item $src $dest -Recurse; Write-Host "copied   $dest" }
}
