$ErrorActionPreference = 'Stop'

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$repoRoot  = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoRoot

function Decode-Escapes([string]$s) {
    return [regex]::Replace($s, '\\u([0-9A-Fa-f]{4})', {
        param($m) [char][int]("0x" + $m.Groups[1].Value)
    })
}

$path = Join-Path $repoRoot 'src\features\report\components\Hero.tsx'
if (-not (Test-Path -LiteralPath $path)) {
    Write-Host "ERROR: not found: $path" -ForegroundColor Red
    exit 1
}

$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
Copy-Item -LiteralPath $path -Destination "$path.bak-$stamp" -Force
Write-Host "Backup: $path.bak-$stamp" -ForegroundColor DarkGray

$content  = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$original = $content
$applied  = 0

$hind = @{
    lagna   = Decode-Escapes '\u0932\u0917\u094D\u0928'
    body    = Decode-Escapes '\u0924\u0928'
    chandra = Decode-Escapes '\u091A\u0928\u094D\u0926\u094D\u0930'
    mind    = Decode-Escapes '\u092E\u0928'
    surya   = Decode-Escapes '\u0938\u0942\u0930\u094D\u092F'
    soul    = Decode-Escapes '\u0906\u0924\u094D\u092E\u093E'
}

$labelPairs = @(
    @("label={isDevanagari ? '????' : 'Lagna'}",     "label={isDevanagari ? '" + $hind.lagna   + "' : 'Lagna'}"),
    @("sublabel={isDevanagari ? '???' : 'Body'}",    "sublabel={isDevanagari ? '" + $hind.body    + "' : 'Body'}"),
    @("label={isDevanagari ? '??????' : 'Chandra'}", "label={isDevanagari ? '" + $hind.chandra + "' : 'Chandra'}"),
    @("sublabel={isDevanagari ? '??' : 'Mind'}",     "sublabel={isDevanagari ? '" + $hind.mind    + "' : 'Mind'}"),
    @("label={isDevanagari ? '?????' : 'Surya'}",    "label={isDevanagari ? '" + $hind.surya   + "' : 'Surya'}"),
    @("sublabel={isDevanagari ? '?????' : 'Soul'}",  "sublabel={isDevanagari ? '" + $hind.soul    + "' : 'Soul'}")
)

foreach ($pair in $labelPairs) {
    if ($content.Contains($pair[0])) {
        $content = $content.Replace($pair[0], $pair[1])
        $applied++
        Write-Host "  label fixed: $($pair[0])" -ForegroundColor Green
    } else {
        Write-Host "  label already correct: $($pair[0])" -ForegroundColor DarkGray
    }
}

$badChar = [char]0xFFFD
$beforeSweep = $content
$content = $content.Replace($badChar, [char]0x00B7)
if ($content -ne $beforeSweep) {
    $applied++
    Write-Host "  U+FFFD chars -> middle dot" -ForegroundColor Green
}

if ($content -ne $original) {
    [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
    Write-Host ""
    Write-Host "WRITTEN: $path" -ForegroundColor Green
    Write-Host "Total changes: $applied" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "No changes applied." -ForegroundColor Yellow
}
