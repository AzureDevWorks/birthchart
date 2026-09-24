<#
.SYNOPSIS
  Exports the whole project into one Markdown/JSON file for AI analysis.
.USAGE
  powershell -ExecutionPolicy Bypass -File .\Export-ProjectForAI.ps1
  powershell -ExecutionPolicy Bypass -File .\Export-ProjectForAI.ps1 -Format json
#>

param(
  [string]$Root        = ".",
  [string]$OutFile     = "ai-context.md",
  [string]$Format      = "md",   # "md" or "json"
  [int]$MaxFileKB      = 300,    # skip files larger than this
  [switch]$IncludeLock           # include package-lock.json (big)
)

$ErrorActionPreference = "Stop"
$Root = (Resolve-Path $Root).Path

# --- folders/files to skip ---
$IgnoreDirs = @(
  "node_modules",".git","dist","build",".next",".vite",
  ".turbo","coverage",".cache",".idea",".vscode","out"
)
$IgnoreFiles = @(
  "*.log","*.lock","package-lock.json","yarn.lock","pnpm-lock.yaml",
  "*.png","*.jpg","*.jpeg","*.gif","*.webp","*.ico","*.svg",
  "*.woff","*.woff2","*.ttf","*.otf","*.eot",
  "*.mp4","*.mp3","*.zip","*.pdf","*.exe","*.dll",
  ".DS_Store","Thumbs.db"
)
if (-not $IncludeLock) { $IgnoreFiles += "package-lock.json" }

# --- code / config extensions to include ---
$CodeExts = @(
  ".ts",".tsx",".js",".jsx",".mjs",".cjs",
  ".json",".html",".css",".scss",".sass",".less",
  ".md",".mdx",".yml",".yaml",".toml",".env",".env.example",
  ".ps1",".sh",".sql",".prisma",".graphql",".gql",
  ".py",".go",".rs",".java",".kt",".cs",".php",".rb",
  ".vue",".svelte",".astro"
)

function Test-Ignored {
  param([string]$Path, [string]$Name, [string]$Type)
  $list = if ($Type -eq "dir") { $IgnoreDirs } else { $IgnoreFiles }
  foreach ($p in $list) {
    if ($Name -like $p) { return $true }
    if ($Path -match [regex]::Escape("\$p\")) { return $true }
  }
  return $false
}

# --- gather files ---
Write-Host "Scanning $Root ..." -ForegroundColor Cyan
$files = Get-ChildItem -Path $Root -Recurse -File -Force |
  Where-Object {
    $rel = $_.FullName.Substring($Root.Length).TrimStart('\')
    # skip ignored dirs anywhere in path
    -not ($IgnoreDirs | Where-Object { $rel -split '\\' -contains $_ }) -and
    -not (Test-Ignored -Path $rel -Name $_.Name -Type "file") -and
    ($CodeExts -contains $_.Extension.ToLower() -or $_.Name -match '^\.env' -or $_.Name -eq 'Dockerfile' -or $_.Name -like '*.config.*')
  }

Write-Host ("Found {0} files." -f $files.Count) -ForegroundColor Green

# --- build output ---
$sb = New-Object System.Text.StringBuilder
$entries = @()

# project tree
$tree = $files | ForEach-Object { $_.FullName.Substring($Root.Length).TrimStart('\') } | Sort-Object
$pkg = Join-Path $Root "package.json"

if ($Format -eq "md") {
  [void]$sb.AppendLine("# PROJECT CONTEXT DUMP")
  [void]$sb.AppendLine()
  [void]$sb.AppendLine("Generated: $(Get-Date -Format 'u')")
  [void]$sb.AppendLine("Root: ``$Root``")
  [void]$sb.AppendLine("Files: $($files.Count)")
  [void]$sb.AppendLine()

  if (Test-Path $pkg) {
    [void]$sb.AppendLine("## package.json")
    [void]$sb.AppendLine('```json')
    [void]$sb.AppendLine((Get-Content $pkg -Raw))
    [void]$sb.AppendLine('```')
    [void]$sb.AppendLine()
  }

  [void]$sb.AppendLine("## File Tree")
  [void]$sb.AppendLine('```')
  $tree | ForEach-Object { [void]$sb.AppendLine($_) }
  [void]$sb.AppendLine('```')
  [void]$sb.AppendLine()

  [void]$sb.AppendLine("## File Contents")
  [void]$sb.AppendLine()

  foreach ($f in $files) {
    $rel = $f.FullName.Substring($Root.Length).TrimStart('\')
    $sizeKB = [math]::Round($f.Length / 1KB, 1)
    if ($sizeKB -gt $MaxFileKB) {
      [void]$sb.AppendLine("### $rel  _(skipped: ${sizeKB} KB > ${MaxFileKB} KB)_")
      [void]$sb.AppendLine()
      continue
    }
    $ext = $f.Extension.TrimStart('.').ToLower()
    if (-not $ext) { $ext = "txt" }
    [void]$sb.AppendLine("### $rel")
    [void]$sb.AppendLine('```' + $ext)
    try {
      [void]$sb.AppendLine((Get-Content $f.FullName -Raw -ErrorAction Stop))
    } catch {
      [void]$sb.AppendLine("<<could not read: $($_.Exception.Message)>>")
    }
    [void]$sb.AppendLine('```')
    [void]$sb.AppendLine()
  }
}
else {
  # JSON output
  foreach ($f in $files) {
    $rel = $f.FullName.Substring($Root.Length).TrimStart('\')
    if (([math]::Round($f.Length/1KB,1)) -gt $MaxFileKB) { continue }
    try {
      $entries += [pscustomobject]@{
        path    = $rel
        size    = $f.Length
        content = (Get-Content $f.FullName -Raw -ErrorAction Stop)
      }
    } catch {
      $entries += [pscustomobject]@{
        path = $rel; size = $f.Length; content = "<<unreadable>>"
      }
    }
  }
  $obj = [pscustomobject]@{
    root      = $Root
    generated = (Get-Date).ToString("u")
    fileCount = $files.Count
    tree      = $tree
    files     = $entries
  }
  $obj | ConvertTo-Json -Depth 6 | Out-File $OutFile -Encoding utf8
}

if ($Format -eq "md") {
  $sb.ToString() | Out-File $OutFile -Encoding utf8
}

$outPath = (Resolve-Path $OutFile).Path
$sizeMB  = [math]::Round((Get-Item $outPath).Length / 1MB, 2)
Write-Host ""
Write-Host "Done.  ->  $outPath  ($sizeMB MB)" -ForegroundColor Green
