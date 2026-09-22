# scan-src.ps1
# Generates a complete snapshot of the src/ tree (and a few root config files)
# into a single markdown file, suitable for pasting into an AI.
#
# Usage:
#   .\scan-src.ps1                    # default: writes AI-CONTEXT-SCAN.md
#   .\scan-src.ps1 -Output my.md      # custom filename
#   .\scan-src.ps1 -IncludeNodeModules  # (don't — huge)

param(
    [string]$Output = 'AI-CONTEXT-SCAN.md',
    [switch]$IncludeNodeModules
)

$ErrorActionPreference = 'Stop'

# ─── Sanity: are we in the project root? ────────────────────
if (-not (Test-Path -LiteralPath 'package.json')) {
    Write-Host "ERROR: Run this from the KundaliYatra project root (where package.json lives)." -ForegroundColor Red
    exit 1
}

# ─── Config ─────────────────────────────────────────────────

# File extensions we care about. Everything else is listed but not dumped.
$textExtensions = @(
    '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
    '.json', '.css', '.scss',
    '.html', '.md', '.txt',
    '.ps1', '.sh', '.bat', '.cmd'
)

# Paths to always skip.
$skipDirs = @(
    'node_modules', 'dist', 'build', '.git', '.vite',
    'coverage', '.next', '.turbo', '.cache'
)

# Files at the repo root worth including (config, etc.).
$rootFiles = @(
    'package.json', 'package-lock.json',
    'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json',
    'vite.config.ts', 'tailwind.config.js', 'postcss.config.js',
    'eslint.config.js', 'components.json',
    'index.html', '.gitignore', '.gitattributes',
    'README.md', 'AI-CONTEXT.md'
)

# ─── Collect src/ files ─────────────────────────────────────

function Test-SkipDir($fullPath) {
    foreach ($d in $skipDirs) {
        if ($fullPath -match "[\\/]$d([\\/]|$)") { return $true }
    }
    return $false
}

$srcFiles = @()
if (Test-Path -LiteralPath 'src') {
    $srcFiles = Get-ChildItem -Path 'src' -Recurse -File -Force |
        Where-Object { -not (Test-SkipDir $_.FullName) } |
        Sort-Object FullName
}

# ─── Write the markdown ─────────────────────────────────────

$sb = New-Object System.Text.StringBuilder

[void]$sb.AppendLine('# KundaliYatra — Full Source Scan')
[void]$sb.AppendLine()
[void]$sb.AppendLine("**Generated:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
[void]$sb.AppendLine("**Project root:** $(Get-Location)")
[void]$sb.AppendLine("**Total src files:** $($srcFiles.Count)")
[void]$sb.AppendLine()
[void]$sb.AppendLine('> This document contains the full contents of every source file in the project.')
[void]$sb.AppendLine('> Use it to understand the current state, spot errors, or plan new components.')
[void]$sb.AppendLine()

# ─── Table of contents ──────────────────────────────────────

[void]$sb.AppendLine('## 1. File Tree')
[void]$sb.AppendLine()
[void]$sb.AppendLine('```')
foreach ($f in $srcFiles) {
    $rel = $f.FullName.Substring((Get-Location).Path.Length + 1)
    $kb = [math]::Round($f.Length / 1KB, 1)
    [void]$sb.AppendLine(("{0}  ({1} KB)" -f $rel, $kb))
}
[void]$sb.AppendLine('```')
[void]$sb.AppendLine()

# ─── Root config files ──────────────────────────────────────

[void]$sb.AppendLine('## 2. Root Config Files')
[void]$sb.AppendLine()

foreach ($name in $rootFiles) {
    if (-not (Test-Path -LiteralPath $name)) { continue }
    $content = Get-Content -LiteralPath $name -Raw -ErrorAction SilentlyContinue
    if ($null -eq $content) { continue }

    $ext = [System.IO.Path]::GetExtension($name).ToLower()
    $lang = switch ($ext) {
        '.json' { 'json' }
        '.js'   { 'javascript' }
        '.ts'   { 'typescript' }
        '.html' { 'html' }
        default { 'text' }
    }

    [void]$sb.AppendLine("### ``$name``")
    [void]$sb.AppendLine()
    [void]$sb.AppendLine("``````$lang")
    [void]$sb.AppendLine($content.TrimEnd())
    [void]$sb.AppendLine('``````')
    [void]$sb.AppendLine()
}

# ─── src/ files ─────────────────────────────────────────────

[void]$sb.AppendLine('## 3. Source Files (`src/`)')
[void]$sb.AppendLine()

foreach ($f in $srcFiles) {
    $rel = $f.FullName.Substring((Get-Location).Path.Length + 1)
    $ext = $f.Extension.ToLower()

    [void]$sb.AppendLine("### ``$rel``")
    [void]$sb.AppendLine()

    if ($textExtensions -notcontains $ext) {
        [void]$sb.AppendLine("_(binary or unsupported file type: $ext, $([math]::Round($f.Length/1KB,1)) KB)_")
        [void]$sb.AppendLine()
        continue
    }

    $content = Get-Content -LiteralPath $f.FullName -Raw -ErrorAction SilentlyContinue
    if ($null -eq $content) {
        [void]$sb.AppendLine('_(could not read file)_')
        [void]$sb.AppendLine()
        continue
    }

    $lang = switch ($ext) {
        '.ts'   { 'typescript' }
        '.tsx'  { 'tsx' }
        '.js'   { 'javascript' }
        '.jsx'  { 'jsx' }
        '.json' { 'json' }
        '.css'  { 'css' }
        '.html' { 'html' }
        '.md'   { 'markdown' }
        '.ps1'  { 'powershell' }
        default { 'text' }
    }

    [void]$sb.AppendLine("``````$lang")
    [void]$sb.AppendLine($content.TrimEnd())
    [void]$sb.AppendLine('``````')
    [void]$sb.AppendLine()
}

# ─── Footer: how to use this document ───────────────────────

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
[void]$sb.AppendLine()

# ─── Write ──────────────────────────────────────────────────

$utf8 = New-Object System.Text.UTF8Encoding($false)
$outPath = Join-Path (Get-Location) $Output
[System.IO.File]::WriteAllText($outPath, $sb.ToString(), $utf8)

$sizeKB = [math]::Round((Get-Item -LiteralPath $outPath).Length / 1KB, 1)

Write-Host ""
Write-Host "Written: $outPath" -ForegroundColor Green
Write-Host "Size:    $sizeKB KB" -ForegroundColor DarkGray
Write-Host "Files:   $($srcFiles.Count) src files + root configs" -ForegroundColor DarkGray
Write-Host ""
Write-Host "Next:" -ForegroundColor Cyan
Write-Host "  1. Open $Output in VS Code"
Write-Host "  2. Copy all (Ctrl+A, Ctrl+C)"
Write-Host "  3. Paste into ChatGPT/Claude/Gemini/Cursor"
Write-Host ""
Write-Host "Tip: add it to .gitignore so it is never committed:" -ForegroundColor Yellow
Write-Host "  Add-Content .gitignore '`nAI-CONTEXT-SCAN.md'" -ForegroundColor DarkGray
Write-Host ""