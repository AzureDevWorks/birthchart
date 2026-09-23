# scripts/normalize-encoding.ps1
#
# Re-encodes every text file in the repo to UTF-8 without BOM,
# with LF line endings. Reports what it would change. Only writes
# when -Apply is passed.
#
# Usage:
#   .\scripts\normalize-encoding.ps1          # dry run (report only)
#   .\scripts\normalize-encoding.ps1 -Apply   # write changes

[CmdletBinding()]
param(
    [switch]$Apply
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot

$textExts = @('.ts','.tsx','.js','.jsx','.json','.css','.md','.html','.svg','.txt')
$skipDirs = @('node_modules','dist','.git','.fix-backup','coverage','.vscode')

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$utf8Strict = New-Object System.Text.UTF8Encoding($false, $true)

$scanned = 0
$hasBom = 0
$hasCrlf = 0
$notUtf8 = @()
$changed = 0
$applied = 0

Write-Host ""
Write-Host "Repo root: $repoRoot"
Write-Host ("Mode:      " + ($(if ($Apply) { 'APPLY' } else { 'DRY RUN' }))) -ForegroundColor $(if ($Apply) { 'Yellow' } else { 'Cyan' })
Write-Host ""

Get-ChildItem -Path $repoRoot -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
    $file = $_
    $rel = $file.FullName.Substring($repoRoot.Length + 1)

    if ($textExts -notcontains $file.Extension.ToLower()) { return }
    if ($file.Name -like '*.bak') { return }

    $skip = $false
    foreach ($part in ($rel -split '\\')) {
        if ($skipDirs -contains $part) { $skip = $true; break }
    }
    if ($skip) { return }

    $script:scanned++

    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)

    # Detect UTF-8 BOM
    $bomLen = 0
    $fileHasBom = $false
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        $bomLen = 3
        $fileHasBom = $true
        $script:hasBom++
    }

    # Reject UTF-16 for now (report only)
    if ($bytes.Length -ge 2 -and (
        ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) -or
        ($bytes[0] -eq 0xFE -and $bytes[1] -eq 0xFF))) {
        Write-Host "  UTF-16 detected (skipping): $rel" -ForegroundColor Red
        $script:notUtf8 += $rel
        return
    }

    # Try strict UTF-8 decode of the payload after any BOM
    try {
        $text = $utf8Strict.GetString($bytes, $bomLen, $bytes.Length - $bomLen)
    } catch {
        Write-Host "  NOT VALID UTF-8 (skipping): $rel" -ForegroundColor Red
        $script:notUtf8 += $rel
        return
    }

    $fileHasCrlf = $text.Contains("`r`n")
    if ($fileHasCrlf) { $script:hasCrlf++ }

    $normalized = $text -replace "`r`n", "`n" -replace "`r", "`n"

    if (-not ($fileHasBom -or $fileHasCrlf)) { return }

    $script:changed++
    $reasons = @()
    if ($fileHasBom)  { $reasons += 'BOM' }
    if ($fileHasCrlf) { $reasons += 'CRLF' }

    if ($Apply) {
        [System.IO.File]::WriteAllText($file.FullName, $normalized, $utf8NoBom)
        $script:applied++
        Write-Host ("  FIXED  [$($reasons -join ',')] $rel") -ForegroundColor Green
    } else {
        Write-Host ("  NEEDS  [$($reasons -join ',')] $rel") -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "================== SUMMARY ==================" -ForegroundColor Cyan
Write-Host ("  Scanned:            {0}" -f $scanned)
Write-Host ("  Had BOM:            {0}" -f $hasBom)
Write-Host ("  Had CRLF:           {0}" -f $hasCrlf)
Write-Host ("  Not valid UTF-8:    {0}" -f $notUtf8.Count) -ForegroundColor $(if ($notUtf8.Count -gt 0) { 'Red' } else { 'Gray' })
Write-Host ("  Files to change:    {0}" -f $changed) -ForegroundColor Yellow
if ($Apply) {
    Write-Host ("  Applied:            {0}" -f $applied) -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "  Dry run complete. Re-run with -Apply to write changes." -ForegroundColor Yellow
}
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

if ($notUtf8.Count -gt 0) {
    Write-Host "Files that could not be decoded as UTF-8:" -ForegroundColor Red
    $notUtf8 | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host ""
}
