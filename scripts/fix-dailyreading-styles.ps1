# scripts/fix-dailyreading-styles.ps1
# Re-adds styles={styles} to <Block>, <MiniBlock>, and <Divider> calls
# in DailyReadingView.tsx. Leaves <ListBlock> alone (it doesn't use it).

$ErrorActionPreference = 'Stop'

$path = 'src/features/ai-reading/DailyReadingView.tsx'

if (-not (Test-Path $path)) {
    Write-Host "File not found: $path" -ForegroundColor Red
    exit 1
}

$src = Get-Content $path -Raw -Encoding UTF8
$original = $src

# Re-add styles={styles} to <Block ... />
$src = [regex]::Replace($src, '<Block\b([^>/]*?)\s*/>', '<Block$1 styles={styles} />')

# Re-add styles={styles} to <MiniBlock ... />
$src = [regex]::Replace($src, '<MiniBlock\b([^>/]*?)\s*/>', '<MiniBlock$1 styles={styles} />')

# Re-add styles={styles} to <Divider />
$src = [regex]::Replace($src, '<Divider\s*/>', '<Divider styles={styles} />')

if ($src -eq $original) {
    Write-Host "Nothing changed — patterns didn't match." -ForegroundColor Yellow
    Write-Host "The file may already be correct. Run  npm run build  to check." -ForegroundColor Yellow
    exit 0
}

$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Resolve-Path $path).Path, $src, $enc)

Write-Host "Patched $path" -ForegroundColor Green
Write-Host ""
Write-Host "Now run:" -ForegroundColor Cyan
Write-Host "  npm run build"
Write-Host ""
