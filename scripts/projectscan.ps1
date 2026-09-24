#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Scans the KundaliYatra project and writes AI-CONTEXT-SCAN.md in UTF-8.

.NOTES
    Run from repo root:   .\scripts\scan-src.ps1
    Or from anywhere:     pwsh -File .\scripts\scan-src.ps1

    WHY THIS VERSION EXISTS:
      The previous script used Get-Content / Out-File without explicit
      encoding. On Windows PowerShell 5.1 that meant:
         - read:  system codepage (Windows-1252) -> killed every UTF-8 char
         - write: UTF-16 LE                        -> wrong byte format
      This version reads via [IO.File]::ReadAllBytes + UTF-8 decode,
      and writes via [IO.File]::WriteAllText with a no-BOM UTF-8 encoder.
      Identical output on PS 5.1 and PS 7+.
#>

[CmdletBinding()]
param(
    [string]$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
    [string]$SrcSubdir   = 'src',
    [string]$OutputName  = 'AI-CONTEXT-SCAN.md'
)

$ErrorActionPreference = 'Stop'

# ── UTF-8 (no BOM) helpers ──────────────────────────────────────────
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Read-Utf8 {
    param([Parameter(Mandatory)][string]$Path)
    $bytes = [System.IO.File]::ReadAllBytes($Path)
    if ($bytes.Length -ge 3 -and
        $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        return $Utf8NoBom.GetString($bytes, 3, $bytes.Length - 3)
    }
    return $Utf8NoBom.GetString($bytes)
}

function Write-Utf8 {
    param(
        [Parameter(Mandatory)][string]$Path,
        [Parameter(Mandatory)][AllowEmptyString()][string]$Content
    )
    [System.IO.File]::WriteAllText($Path, $Content, $Utf8NoBom)
}

function Get-FenceLang {
    param([string]$Path)
    switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
        '.ts'   { 'typescript' }
        '.tsx'  { 'tsx' }
        '.js'   { 'javascript' }
        '.jsx'  { 'jsx' }
        '.json' { 'json' }
        '.css'  { 'css' }
        '.html' { 'html' }
        '.md'   { 'text' }
        '.ps1'  { 'powershell' }
        default { '' }
    }
}

function Format-Kb {
    param([long]$Bytes)
    '{0:N1} KB' -f ($Bytes / 1KB)
}

# ── Collect source files ────────────────────────────────────────────
$srcRoot = Join-Path $ProjectRoot $SrcSubdir
if (-not (Test-Path $srcRoot)) { throw "Source directory not found: $srcRoot" }

$srcFiles = Get-ChildItem -Path $srcRoot -Recurse -File |
    Where-Object { $_.FullName -notmatch '\\_backup_' } |
    Sort-Object FullName

$rootConfigNames = @(
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'tsconfig.app.json',
    'tsconfig.node.json',
    'vite.config.ts',
    'tailwind.config.js',
    'postcss.config.js',
    'eslint.config.js',
    'components.json',
    'index.html',
    '.gitignore',
    '.gitattributes',
    'README.md'
)

$rootConfigs = $rootConfigNames |
    ForEach-Object { Join-Path $ProjectRoot $_ } |
    Where-Object { Test-Path -LiteralPath $_ }

# ── Build the markdown in memory ────────────────────────────────────
$sb = [System.Text.StringBuilder]::new()

[void]$sb.AppendLine('# KundaliYatra — Full Source Scan')
[void]$sb.AppendLine()
[void]$sb.AppendLine("**Generated:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
[void]$sb.AppendLine("**Project root:** $ProjectRoot")
[void]$sb.AppendLine("**Total src files:** $($srcFiles.Count)")
[void]$sb.AppendLine()
[void]$sb.AppendLine('> This document contains the full contents of every source file in the project.')
[void]$sb.AppendLine('> Use it to understand the current state, spot errors, or plan new components.')
[void]$sb.AppendLine()
[void]$sb.AppendLine('## 1. File Tree')
[void]$sb.AppendLine()
[void]$sb.AppendLine('```')

foreach ($f in $srcFiles) {
    $rel  = $f.FullName.Substring($ProjectRoot.Length + 1) -replace '\\', '/'
    $size = Format-Kb $f.Length
    [void]$sb.AppendLine("$rel  ($size)")
}

[void]$sb.AppendLine('```')
[void]$sb.AppendLine()

[void]$sb.AppendLine('## 2. Root Config Files')
[void]$sb.AppendLine()

foreach ($cfg in $rootConfigs) {
    $rel  = Split-Path $cfg -Leaf
    $lang = Get-FenceLang $cfg
    $body = Read-Utf8 $cfg

    [void]$sb.AppendLine("### ``$rel``")
    [void]$sb.AppendLine()
    [void]$sb.AppendLine("``````$lang")
    [void]$sb.Append($body)
    if (-not $body.EndsWith("`n")) { [void]$sb.AppendLine() }
    [void]$sb.AppendLine('``````')
    [void]$sb.AppendLine()
}

[void]$sb.AppendLine('## 3. Source Files (`src/`)')
[void]$sb.AppendLine()

foreach ($f in $srcFiles) {
    $rel  = $f.FullName.Substring($ProjectRoot.Length + 1) -replace '\\', '/'
    $lang = Get-FenceLang $f.FullName
    $body = Read-Utf8 $f.FullName

    [void]$sb.AppendLine("### ``$rel``")
    [void]$sb.AppendLine()
    [void]$sb.AppendLine("``````$lang")
    [void]$sb.Append($body)
    if (-not $body.EndsWith("`n")) { [void]$sb.AppendLine() }
    [void]$sb.AppendLine('``````')
    [void]$sb.AppendLine()
}

[void]$sb.AppendLine('---')
[void]$sb.AppendLine()
[void]$sb.AppendLine('## 4. How to Use This Document')
[void]$sb.AppendLine()
[void]$sb.AppendLine('Paste the whole thing into an AI and ask:')
[void]$sb.AppendLine()
[void]$sb.AppendLine('- *"Find any TypeScript errors or unused imports across these files."*')
[void]$sb.AppendLine('- *"Where would I add a new section component, and what should it import?"*')
[void]$sb.AppendLine('- *"Which files import `@prisri/jyotish`? Are any outside `src/infrastructure/`?"*')
[void]$sb.AppendLine('- *"Show me every file that renders a `<Section>` — I want to see the pattern."*')
[void]$sb.AppendLine('- *"Is there any leftover Panchang-related code that is not wired in?"*')
[void]$sb.AppendLine()
[void]$sb.AppendLine('The AI will have the complete current state — no guessing.')

# ── Write it out ────────────────────────────────────────────────────
$outPath = Join-Path $ProjectRoot $OutputName
Write-Utf8 -Path $outPath -Content $sb.ToString()

Write-Host "Wrote $outPath" -ForegroundColor Green
Write-Host ("  {0} files, {1:N1} KB" -f $srcFiles.Count, ((Get-Item $outPath).Length / 1KB)) `
    -ForegroundColor DarkGray