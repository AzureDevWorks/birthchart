<#
.SYNOPSIS
    KundaliYatra - mojibake repair + curly-quote syntax fix.

.DESCRIPTION
    Reverses UTF-8-as-cp1252 mojibake, replaces smart quotes with straight
    quotes in code files, and fixes literal \uXXXX sequences in JSX text.

.PARAMETER Apply
    Actually write changes. Without this flag, runs dry-run (report-only).

.PARAMETER Root
    Project root. Defaults to the parent of this script's folder.
#>
[CmdletBinding()]
param(
    [string]$Root,
    [switch]$Apply
)

$ErrorActionPreference = 'Stop'

if (-not $Root) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
}

$Utf8NoBom  = New-Object System.Text.UTF8Encoding($false)
$Cp1252     = [System.Text.Encoding]::GetEncoding(1252)
$Utf8Strict = New-Object System.Text.UTF8Encoding($false, $true)

$extensions  = @('.ts', '.tsx', '.js', '.jsx', '.css', '.json', '.md', '.html', '.ps1')
$excludeDirs = @('node_modules', 'dist', 'build', '.git', 'dev', '_backup_')

function Test-Excluded {
    param([string]$FullPath)
    foreach ($part in $FullPath.Split([IO.Path]::DirectorySeparatorChar)) {
        if ($excludeDirs -contains $part) { return $true }
        if ($part -like '_backup_*') { return $true }
        if ($part -like '.cleanup-backup-*') { return $true }
    }
    return $false
}

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

function Repair-Mojibake {
    param([AllowEmptyString()][string]$Text)
    if ([string]::IsNullOrEmpty($Text)) { return $Text }

    $sb = New-Object System.Text.StringBuilder ($Text.Length)
    $i = 0
    while ($i -lt $Text.Length) {
        $c = $Text[$i]
        if ([int]$c -lt 128) {
            [void]$sb.Append($c); $i++; continue
        }
        $start = $i
        while ($i -lt $Text.Length -and [int]$Text[$i] -ge 128) { $i++ }
        $slice = $Text.Substring($start, $i - $start)
        try {
            $bytes = $Cp1252.GetBytes($slice)
            $decoded = $Utf8Strict.GetString($bytes)
            if ($decoded.Length -lt $slice.Length) {
                [void]$sb.Append($decoded)
            } else {
                [void]$sb.Append($slice)
            }
        } catch {
            [void]$sb.Append($slice)
        }
    }
    return $sb.ToString()
}

function Fix-CurlyQuotes {
    param([string]$Text, [string]$Ext)
    if ($Ext -notin @('.ts', '.tsx', '.js', '.jsx', '.json', '.css')) {
        return $Text
    }
    $Text = $Text.Replace([char]0x2018, "'")
    $Text = $Text.Replace([char]0x2019, "'")
    $Text = $Text.Replace([char]0x201C, '"')
    $Text = $Text.Replace([char]0x201D, '"')
    return $Text
}

function Fix-LiteralUnicodeInJsx {
    param([string]$Text, [string]$Ext)
    if ($Ext -ne '.tsx') { return $Text }
    $pattern = '(?<![\\"''`])\\\\u([0-9a-fA-F]{4})'
    return [regex]::Replace($Text, $pattern, {
        param($m)
        $hex = $m.Groups[1].Value
        $cp = [Convert]::ToInt32($hex, 16)
        if ($cp -lt 128) { return $m.Value }
        return "{'\u$hex'}"
    })
}

function Test-DataLoss {
    param([string]$Text)
    return [regex]::IsMatch($Text, '\?{4,}')
}

$files = Get-ChildItem -Path $Root -Recurse -File |
    Where-Object { $extensions -contains $_.Extension.ToLower() } |
    Where-Object { -not (Test-Excluded $_.FullName) }

Write-Host ''
Write-Host 'KundaliYatra encoding + syntax fix' -ForegroundColor Cyan
Write-Host "  Root:  $Root"
Write-Host "  Mode:  $(if ($Apply) { 'APPLY (writing files)' } else { 'DRY-RUN (report only)' })"
Write-Host "  Files: $($files.Count)"
Write-Host ''

$stats = @{ repaired = 0; dataLoss = @() }

foreach ($f in $files) {
    $original = Read-Text $f.FullName
    if ([string]::IsNullOrEmpty($original)) { continue }
    if ($original.Contains([char]0)) { continue }

    $text = $original
    $text = Repair-Mojibake         -Text $text
    $text = Fix-CurlyQuotes         -Text $text -Ext $f.Extension.ToLower()
    $text = Fix-LiteralUnicodeInJsx -Text $text -Ext $f.Extension.ToLower()

    $rel = $f.FullName.Substring($Root.Length + 1) -replace '\\', '/'

    if (Test-DataLoss $text) {
        $stats.dataLoss += $rel
    }

    if ($text -ne $original) {
        $stats.repaired++
        if ($Apply) {
            Write-Text -Path $f.FullName -Content $text
        }
        $delta = $text.Length - $original.Length
        Write-Host ("  FIX  {0,-70} ({1:+#;-#;0} chars)" -f $rel, $delta) -ForegroundColor Green
    }
}

Write-Host ''
Write-Host 'Summary' -ForegroundColor Cyan
Write-Host "  Files modified:  $($stats.repaired)"

if ($stats.dataLoss.Count -gt 0) {
    Write-Host ''
    Write-Host '  DATA LOSS (unrecoverable - must be re-authored by hand):' -ForegroundColor Red
    foreach ($d in $stats.dataLoss) { Write-Host "    - $d" -ForegroundColor Red }
    Write-Host '  These files contain literal "?" where Devanagari used to be.' -ForegroundColor DarkYellow
    Write-Host '  Git history is the only source of truth now.' -ForegroundColor DarkYellow
}

Write-Host ''
if (-not $Apply) {
    Write-Host 'Dry-run complete. Re-run with  -Apply  to write changes.' -ForegroundColor Yellow
} else {
    Write-Host 'Done. Now run:  npm run build' -ForegroundColor Green
}
