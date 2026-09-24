<#
.SYNOPSIS
    Repair single-quoted TS/TSX string literals whose internal apostrophes
    (') were flattened from curly quotes by an earlier fix and now break
    parsing.

.DESCRIPTION
    Walks each .ts/.tsx file character-by-character, tracking whether we are
    inside a single-quoted string, double-quoted string, backtick string,
    line comment, or block comment. When a ' is encountered inside a
    single-quoted string with a letter on both sides, it is treated as an
    in-word apostrophe (contraction/possessive) and rewritten as \'.

.PARAMETER Root
    Project root. Defaults to the parent of this script's folder.

.PARAMETER Files
    Optional. If provided, only these files (absolute or relative to Root)
    are processed. Useful for narrowing scope to files reported by tsc.

.PARAMETER Apply
    Actually write changes. Without this, runs dry-run (report only).
#>
[CmdletBinding()]
param(
    [string]$Root,
    [string[]]$Files,
    [switch]$Apply
)

$ErrorActionPreference = 'Stop'

if (-not $Root) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
}

$Utf8NoBom  = New-Object System.Text.UTF8Encoding($false)
$Utf8Strict = New-Object System.Text.UTF8Encoding($false, $true)
$Cp1252     = [System.Text.Encoding]::GetEncoding(1252)

function Read-Text {
    param([string]$Path)
    $bytes = [System.IO.File]::ReadAllBytes($Path)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        $bytes = $bytes[3..($bytes.Length - 1)]
    }
    try { return $Utf8Strict.GetString($bytes) }
    catch { return $Cp1252.GetString($bytes) }
}

function Write-Text {
    param([string]$Path, [string]$Content)
    [System.IO.File]::WriteAllText($Path, $Content, $Utf8NoBom)
}

function Repair-SingleQuoteStrings {
    param([string]$Text)

    $sb = New-Object System.Text.StringBuilder ($Text.Length + 128)
    $n  = $Text.Length
    $i  = 0

    $inSq          = $false
    $inDq          = $false
    $inBt          = $false
    $inLineComment = $false
    $inBlockComment = $false
    $escapes       = 0

    while ($i -lt $n) {
        $c  = $Text[$i]
        $n1 = if ($i + 1 -lt $n) { $Text[$i + 1] } else { [char]0 }

        # --- Comments (only when not in any string) ---
        if (-not $inSq -and -not $inDq -and -not $inBt) {
            if ($inLineComment) {
                [void]$sb.Append($c)
                if ($c -eq "`n") { $inLineComment = $false }
                $i++; continue
            }
            if ($inBlockComment) {
                [void]$sb.Append($c)
                if ($c -eq '*' -and $n1 -eq '/') {
                    [void]$sb.Append($n1); $i += 2; $inBlockComment = $false; continue
                }
                $i++; continue
            }
            if ($c -eq '/' -and $n1 -eq '/') {
                [void]$sb.Append($c); [void]$sb.Append($n1)
                $i += 2; $inLineComment = $true; continue
            }
            if ($c -eq '/' -and $n1 -eq '*') {
                [void]$sb.Append($c); [void]$sb.Append($n1)
                $i += 2; $inBlockComment = $true; continue
            }
        }

        # --- Inside single-quoted string ---
        if ($inSq) {
            if ($c -eq '\') {
                [void]$sb.Append($c)
                if ($i + 1 -lt $n) { [void]$sb.Append($n1) }
                $i += 2; continue
            }
            if ($c -eq "'") {
                $prev = if ($sb.Length -gt 0) { $sb.Chars($sb.Length - 1) } else { [char]0 }
                if ([char]::IsLetter($prev) -and [char]::IsLetter($n1)) {
                    # In-word apostrophe: write \' and stay in the string
                    [void]$sb.Append('\')
                    [void]$sb.Append("'")
                    $escapes++
                    $i++; continue
                }
                # Closing quote
                [void]$sb.Append($c)
                $inSq = $false
                $i++; continue
            }
            [void]$sb.Append($c); $i++; continue
        }

        # --- Inside double-quoted string ---
        if ($inDq) {
            if ($c -eq '\') {
                [void]$sb.Append($c)
                if ($i + 1 -lt $n) { [void]$sb.Append($n1) }
                $i += 2; continue
            }
            if ($c -eq '"') { [void]$sb.Append($c); $inDq = $false; $i++; continue }
            [void]$sb.Append($c); $i++; continue
        }

        # --- Inside backtick string ---
        if ($inBt) {
            if ($c -eq '\') {
                [void]$sb.Append($c)
                if ($i + 1 -lt $n) { [void]$sb.Append($n1) }
                $i += 2; continue
            }
            if ($c -eq '`') { [void]$sb.Append($c); $inBt = $false; $i++; continue }
            [void]$sb.Append($c); $i++; continue
        }

        # --- Not inside any string ---
        if ($c -eq "'") { $inSq = $true; [void]$sb.Append($c); $i++; continue }
        if ($c -eq '"') { $inDq = $true; [void]$sb.Append($c); $i++; continue }
        if ($c -eq '`') { $inBt = $true; [void]$sb.Append($c); $i++; continue }

        [void]$sb.Append($c); $i++
    }

    return [pscustomobject]@{ Text = $sb.ToString(); Escapes = $escapes }
}

# --- Collect targets ---
$targets = @()
if ($Files -and $Files.Count -gt 0) {
    foreach ($f in $Files) {
        $p = if ([IO.Path]::IsPathRooted($f)) { $f } else { Join-Path $Root $f }
        if (Test-Path -LiteralPath $p) { $targets += Get-Item -LiteralPath $p }
        else { Write-Warning "Not found: $p" }
    }
} else {
    $targets = Get-ChildItem -Path $Root -Recurse -File |
        Where-Object { $_.Extension -in '.ts', '.tsx' } |
        Where-Object { $_.FullName -notmatch '\\node_modules\\|\\dist\\|\\build\\|\\.git\\|\\dev\\|_backup_' }
}

Write-Host ''
Write-Host 'KundaliYatra apostrophe repair' -ForegroundColor Cyan
Write-Host "  Root:  $Root"
Write-Host "  Mode:  $(if ($Apply) { 'APPLY (writing files)' } else { 'DRY-RUN (report only)' })"
Write-Host "  Files: $($targets.Count)"
Write-Host ''

$totalEscapes = 0
$changedCount = 0

foreach ($f in $targets) {
    $orig = Read-Text $f.FullName
    if ([string]::IsNullOrEmpty($orig)) { continue }
    if ($orig.Contains([char]0)) { continue }

    $result = Repair-SingleQuoteStrings -Text $orig
    if ($result.Text -ne $orig) {
        $rel = $f.FullName.Substring($Root.Length + 1) -replace '\\', '/'
        Write-Host ("  FIX  {0,-72}  ({1} apostrophe(s) escaped)" -f $rel, $result.Escapes) -ForegroundColor Green
        $totalEscapes += $result.Escapes
        $changedCount++
        if ($Apply) { Write-Text -Path $f.FullName -Content $result.Text }
    }
}

Write-Host ''
Write-Host 'Summary' -ForegroundColor Cyan
Write-Host "  Files modified:    $changedCount"
Write-Host "  Apostrophes fixed: $totalEscapes"
Write-Host ''
if (-not $Apply) {
    Write-Host 'Dry-run complete. Re-run with -Apply to write changes.' -ForegroundColor Yellow
} else {
    Write-Host 'Done. Now run:  npm run build' -ForegroundColor Green
}
