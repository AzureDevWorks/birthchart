$ErrorActionPreference = 'Stop'

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$repoRoot  = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoRoot

function Decode-Escapes([string]$s) {
    return [regex]::Replace($s, '\\u([0-9A-Fa-f]{4})', {
        param($m) [char][int]("0x" + $m.Groups[1].Value)
    })
}

$path = Join-Path $repoRoot 'src\features\report\components\ReportOverview.tsx'
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

$pairs = @(
    @('devanagari="\u0930\u093E\u0936\u093F"',
      'devanagari="' + (Decode-Escapes '\u0930\u093E\u0936\u093F') + '"'),
    @('devanagari="\u0928\u0935\u093E\u0902\u0936"',
      'devanagari="' + (Decode-Escapes '\u0928\u0935\u093E\u0902\u0936') + '"'),
    @('devanagari="\u091A\u0928\u094D\u0926\u094D\u0930 \u0915\u0941\u0923\u094D\u0921\u0932\u0940"',
      'devanagari="' + (Decode-Escapes '\u091A\u0928\u094D\u0926\u094D\u0930 \u0915\u0941\u0923\u094D\u0921\u0932\u0940') + '"'),
    @('devanagari="\u0938\u0942\u0930\u094D\u092F \u0915\u0941\u0923\u094D\u0921\u0932\u0940"',
      'devanagari="' + (Decode-Escapes '\u0938\u0942\u0930\u094D\u092F \u0915\u0941\u0923\u094D\u0921\u0932\u0940') + '"')
)

foreach ($pair in $pairs) {
    if ($content.Contains($pair[0])) {
        $content = $content.Replace($pair[0], $pair[1])
        $applied++
        Write-Host "  attribute fixed: $($pair[0])" -ForegroundColor Green
    } else {
        Write-Host "  already correct: $($pair[0])" -ForegroundColor DarkGray
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
