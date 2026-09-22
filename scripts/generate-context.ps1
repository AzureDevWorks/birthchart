<#
.SYNOPSIS
    KundaliYatra — AI context generator.
.DESCRIPTION
    Reads every source file in the project and produces a single
    markdown document describing the architecture, data flow,
    components, and conventions of the app.

    The output (AI-CONTEXT.md) can be pasted into any AI assistant
    so it understands the codebase fully.

    Run from the project root:
        .\generate-context.ps1
#>

$ErrorActionPreference = "Stop"

# ─────────────────────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────────────────────
$ProjectRoot = (Get-Location).Path
$OutputFile  = Join-Path $ProjectRoot "AI-CONTEXT.md"

# Folders to include (relative to project root)
$SourceFolders = @(
    "src"
)

# Folders to exclude from scanning
$ExcludeFolders = @(
    "node_modules",
    "dist",
    "build",
    ".vite",
    ".git",
    "coverage"
)

# File extensions to include
$IncludeExtensions = @(
    ".ts", ".tsx",
    ".css",
    ".json",
    ".html",
    ".js", ".jsx",
    ".md"
)

# Specific files to include (outside of source folders)
$IncludeRootFiles = @(
    "package.json",
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.app.json",
    "tailwind.config.js",
    "postcss.config.js",
    "index.html"
)

# Files to exclude even if they match extensions
$ExcludeFiles = @(
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "AI-CONTEXT.md"
)

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  KundaliYatra — AI Context Generator" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# ─────────────────────────────────────────────────────────────
# Helper functions
# ─────────────────────────────────────────────────────────────
function Get-RelativePath {
    param([string]$FullPath)
    return $FullPath.Substring($ProjectRoot.Length).TrimStart('\', '/')
}

function Get-FileLanguage {
    param([string]$Extension)
    switch ($Extension) {
        ".ts"   { return "typescript" }
        ".tsx"  { return "tsx" }
        ".js"   { return "javascript" }
        ".jsx"  { return "jsx" }
        ".css"  { return "css" }
        ".json" { return "json" }
        ".html" { return "html" }
        ".md"   { return "markdown" }
        default { return "" }
    }
}

function Get-FileCategory {
    param([string]$RelativePath)
    if ($RelativePath -match "domain[\\/]") { return "Domain Layer" }
    if ($RelativePath -match "infrastructure[\\/]") { return "Infrastructure Layer" }
    if ($RelativePath -match "features[\\/]") { return "Features Layer" }
    if ($RelativePath -match "components[\\/]ui[\\/]") { return "UI Primitives (shadcn)" }
    if ($RelativePath -match "components[\\/]") { return "Shared Components" }
    if ($RelativePath -match "lib[\\/]") { return "Library/Utils" }
    if ($RelativePath -match "i18n[\\/]") { return "i18n" }
    if ($RelativePath -match "styles[\\/]") { return "Styles" }
    if ($RelativePath -match "hooks[\\/]") { return "Hooks" }
    if ($RelativePath -match "store\.ts") { return "State Stores" }
    if ($RelativePath -match "main\.tsx|App\.tsx") { return "App Entry" }
    if ($RelativePath -match "^src[\\/][^\\/]+\.tsx?$") { return "App Entry" }
    return "Other"
}

# ─────────────────────────────────────────────────────────────
# Collect files
# ─────────────────────────────────────────────────────────────
Write-Host "Scanning project files..." -ForegroundColor Yellow

$allFiles = @()

# Files from source folders
foreach ($folder in $SourceFolders) {
    $fullFolder = Join-Path $ProjectRoot $folder
    if (-not (Test-Path $fullFolder)) { continue }

    $files = Get-ChildItem -Path $fullFolder -Recurse -File |
        Where-Object {
            $rel = Get-RelativePath $_.FullName
            $ext = $_.Extension
            $isExcluded = $false
            foreach ($ex in $ExcludeFolders) {
                if ($rel -match "(^|[\\/])$ex([\\/]|$)") { $isExcluded = $true; break }
            }
            $isExcludedFile = $ExcludeFiles -contains $_.Name
            (-not $isExcluded) -and (-not $isExcludedFile) -and ($IncludeExtensions -contains $ext)
        }

    $allFiles += $files
}

# Specific root files
foreach ($file in $IncludeRootFiles) {
    $fullFile = Join-Path $ProjectRoot $file
    if (Test-Path $fullFile) {
        $allFiles += Get-Item $fullFile
    }
}

# Deduplicate and sort
$allFiles = $allFiles | Sort-Object FullName -Unique

$totalCount = $allFiles.Count
$totalBytes = ($allFiles | Measure-Object -Property Length -Sum).Sum
Write-Host "  Found $totalCount files ($([math]::Round($totalBytes / 1KB, 1)) KB)" -ForegroundColor Green

# Group files by category
$categorized = @{}
foreach ($file in $allFiles) {
    $rel = Get-RelativePath $file.FullName
    $cat = Get-FileCategory $rel
    if (-not $categorized.ContainsKey($cat)) {
        $categorized[$cat] = @()
    }
    $categorized[$cat] += $file
}

# ─────────────────────────────────────────────────────────────
# Build the output document
# ─────────────────────────────────────────────────────────────
Write-Host "Building context document..." -ForegroundColor Yellow

$output = [System.Text.StringBuilder]::new()

function Add-Line {
    param([string]$Text = "")
    [void]$output.AppendLine($Text)
}

# ─── Header ─────────────────────────────────────────────
Add-Line "# KundaliYatra — Complete Project Context"
Add-Line ""
Add-Line "> **Purpose:** This document contains everything an AI assistant needs to understand the KundaliYatra codebase and write correct code for it."
Add-Line "> "
Add-Line "> **Usage:** Paste this entire document into any AI (ChatGPT, Claude, Cursor, Gemini) and then tell it what you want to build. It will understand the architecture, data flow, conventions, and existing components."
Add-Line ""
Add-Line "**Generated:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line "**Total files:** $totalCount"
Add-Line ""
Add-Line "---"
Add-Line ""

# ─── Architecture ────────────────────────────────────────
Add-Line "## 1. Architecture Overview"
Add-Line ""
Add-Line "KundaliYatra follows a **three-layer clean architecture**:"
Add-Line ""
Add-Line '```'
Add-Line "┌─────────────────────────────────────────────────────────────┐"
Add-Line "│  FEATURES           (React, hooks, UI)                      │"
Add-Line "│  src/features/**                                            │"
Add-Line "│  Depends on: domain, infrastructure, components             │"
Add-Line "└──────────────────────┬──────────────────────────────────────┘"
Add-Line "                       │"
Add-Line "┌──────────────────────▼──────────────────────────────────────┐"
Add-Line "│  INFRASTRUCTURE     (adapters, external APIs)               │"
Add-Line "│  src/infrastructure/**                                      │"
Add-Line "│  Depends on: domain only                                    │"
Add-Line "└──────────────────────┬──────────────────────────────────────┘"
Add-Line "                       │"
Add-Line "┌──────────────────────▼──────────────────────────────────────┐"
Add-Line "│  DOMAIN             (pure types, no deps)                   │"
Add-Line "│  src/domain/**                                              │"
Add-Line "│  Zero runtime deps. Pure TypeScript.                        │"
Add-Line "└─────────────────────────────────────────────────────────────┘"
Add-Line '```'
Add-Line ""
Add-Line "**Layer rules:**"
Add-Line "- Domain has no external dependencies."
Add-Line "- Infrastructure depends only on domain."
Add-Line "- Features depend on both."
Add-Line "- External libraries (like `@prisri/jyotish`) are wrapped in adapters under `infrastructure/`."
Add-Line ""

# ─── Data Flow ───────────────────────────────────────────
Add-Line "## 2. Core Data Flow"
Add-Line ""
Add-Line "The app has one primary user journey: **enter birth data → compute chart → render report**."
Add-Line ""
Add-Line '```'
Add-Line "1. User submits BirthProfileForm"
Add-Line "       ↓"
Add-Line "2. addProfile() stores BirthData in Zustand (persisted to localStorage)"
Add-Line "       ↓"
Add-Line "3. OverviewView subscribes → sees activeProfile → renders <ReportOverview>"
Add-Line "       ↓"
Add-Line "4. ReportOverview calls prisriJyotish.calculate(profile) once (useMemo)"
Add-Line "       ↓"
Add-Line "5. Adapter:"
Add-Line "     - Converts localDate + localTime + timezone → Date via Luxon"
Add-Line "     - Builds Observer(lat, lon, elevation)"
Add-Line "     - Calls getKundli(date, observer, config) from @prisri/jyotish"
Add-Line "       ↓"
Add-Line "6. Returns a Kundli object (planets, houses, dasha, vargas, ...)"
Add-Line "       ↓"
Add-Line "7. ReportOverview passes kundli to each section as a prop"
Add-Line "       ↓"
Add-Line "8. Each section reads what it needs from kundli"
Add-Line '```'
Add-Line ""
Add-Line "**Critical rules:**"
Add-Line "- **Never** call `new Date(birthString)` — always use Luxon with the birth place's IANA timezone."
Add-Line "- **Always** wrap `calculate()` in `useMemo` — the computation is expensive."
Add-Line "- Store holds **wall-clock strings** + timezone, never a Date object."
Add-Line ""

# ─── File Tree ───────────────────────────────────────────
Add-Line "## 3. Complete File Tree"
Add-Line ""
Add-Line "All source files, grouped by layer:"
Add-Line ""

$layerOrder = @(
    "App Entry",
    "Domain Layer",
    "Infrastructure Layer",
    "State Stores",
    "Hooks",
    "Features Layer",
    "Shared Components",
    "UI Primitives (shadcn)",
    "Library/Utils",
    "i18n",
    "Styles",
    "Other"
)

foreach ($layer in $layerOrder) {
    if (-not $categorized.ContainsKey($layer)) { continue }
    Add-Line "### $layer"
    Add-Line ""
    foreach ($file in ($categorized[$layer] | Sort-Object FullName)) {
        $rel = Get-RelativePath $file.FullName
        $size = [math]::Round($file.Length / 1KB, 1)
        Add-Line "- ``$rel`` ($size KB)"
    }
    Add-Line ""
}

Add-Line "---"
Add-Line ""

# ─── File Contents ───────────────────────────────────────
Add-Line "## 4. Complete File Contents"
Add-Line ""
Add-Line "Every source file, grouped by layer. Use these to understand existing patterns before writing new code."
Add-Line ""

foreach ($layer in $layerOrder) {
    if (-not $categorized.ContainsKey($layer)) { continue }

    Add-Line "### $layer"
    Add-Line ""

    foreach ($file in ($categorized[$layer] | Sort-Object FullName)) {
        $rel = Get-RelativePath $file.FullName
        $ext = $file.Extension
        $lang = Get-FileLanguage $ext

        Add-Line "#### ``$rel``"
        Add-Line ""
        Add-Line "``````$lang"

        try {
            $contents = Get-Content -Path $file.FullName -Raw -Encoding UTF8
            if ($null -eq $contents) { $contents = "" }
            Add-Line $contents.TrimEnd()
        } catch {
            Add-Line "// (could not read file: $($_.Exception.Message))"
        }

        Add-Line '``````'
        Add-Line ""
    }
}

Add-Line "---"
Add-Line ""

# ─── Conventions ─────────────────────────────────────────
Add-Line "## 5. Project Conventions"
Add-Line ""
Add-Line "Follow these rules when writing code for KundaliYatra:"
Add-Line ""
Add-Line "### Imports"
Add-Line '- Use the `@/` path alias for absolute imports: `@/components/ui/button`'
Add-Line '- Relative imports only within the same folder: `./Hero`, `../lib/glyphs`'
Add-Line '- Never use `require()` — this is a browser app, always use ES `import`'
Add-Line ""
Add-Line "### Components"
Add-Line '- Functional components only (no class components)'
Add-Line '- Each major section is a **single component** in `src/features/report/sections/`'
Add-Line '- Sub-components that are only used once live in the same file'
Add-Line '- Sections take `kundli` (and sometimes `profile`) as props — no global state reads'
Add-Line '- Return `null` for empty states, never crash'
Add-Line ""
Add-Line "### Styling"
Add-Line '- Tailwind utility classes'
Add-Line '- No inline `style` unless for dynamic values (colors, sizes from JS)'
Add-Line '- Use CSS variables: `hsl(var(--primary))`, `hsl(var(--muted-foreground))`'
Add-Line '- Cards use `rounded-2xl border bg-card` pattern'
Add-Line ""
Add-Line "### Time & Dates"
Add-Line '- **Always** use Luxon for date/time manipulation'
Add-Line '- **Never** `new Date(str)` for birth data'
Add-Line '- Wall-clock strings + IANA timezone → Luxon DateTime → JS Date (at adapter boundary only)'
Add-Line ""
Add-Line "### Astrology"
Add-Line '- The `@prisri/jyotish` library is behind `JyotishPort`'
Add-Line '- **Never** import the library outside `src/infrastructure/astrology/`'
Add-Line '- The `Kundli` object is large — treat it as `Record<string, any>` when reading'
Add-Line ""
Add-Line "### i18n"
Add-Line '- All user-facing text has an i18n key'
Add-Line '- Languages: `en`, `hi`, `ne`'
Add-Line '- Add keys to all three locale files'
Add-Line "- Use `t('key.path', { defaultValue: 'Fallback' })`"
Add-Line ""
Add-Line "### TypeScript"
Add-Line '- Strict mode enabled'
Add-Line '- Avoid `any` unless interacting with the astrology library'
Add-Line "- Use `Record<string, any>` for library objects"
Add-Line ""

# ─── Common Tasks ────────────────────────────────────────
Add-Line "## 6. How to Add Common Things"
Add-Line ""
Add-Line "### Adding a new report section"
Add-Line "1. Create `src/features/report/sections/NewSection.tsx`"
Add-Line '2. Accept `kundli` as a prop'
Add-Line '3. Import shared primitives from `../primitives/` (`Section`, `GlyphBadge`, `AttributeBadge`)'
Add-Line "4. Add `<Section>` wrapper in `ReportOverview.tsx` between existing sections"
Add-Line "5. Add i18n keys to all 3 locale files"
Add-Line ""
Add-Line "### Adding a new divisional chart"
Add-Line "1. It's already returned by the library if `includeVargas` is on"
Add-Line "2. Add an entry to `VARGA_INFO` in `src/features/report/lib/varga-info.ts`"
Add-Line "3. It automatically appears in the Divisional Charts section"
Add-Line ""
Add-Line "### Adding a new language"
Add-Line "1. Create `src/i18n/locales/xx.json` mirroring `en.json`"
Add-Line "2. Add to `SUPPORTED_LANGS` and `LANG_META` in `src/i18n/index.ts`"
Add-Line "3. Add to the language switcher dropdown"
Add-Line ""
Add-Line "### Modifying the chart's appearance"
Add-Line "1. Open `src/features/chart/theme.ts`"
Add-Line "2. Change the color, size, or stroke value"
Add-Line "3. All charts update automatically"
Add-Line ""

# ─── AI Instructions ─────────────────────────────────────
Add-Line "## 7. Instructions for the AI Assistant"
Add-Line ""
Add-Line "You have now read the entire KundaliYatra codebase. When the user asks you to build something:"
Add-Line ""
Add-Line "### Do"
Add-Line '- Follow the existing file structure and naming conventions'
Add-Line '- Use the same import patterns (`@/` for absolute, `./` for relative)'
Add-Line '- Reuse existing components (`Section`, `GlyphBadge`, `AttributeBadge`, `ChartCard`, etc.)'
Add-Line '- Match the visual language (rounded-2xl, warm palette, serif headings)'
Add-Line '- Add i18n keys to all 3 locale files'
Add-Line '- Write TypeScript with proper types'
Add-Line '- Wrap expensive operations in `useMemo`'
Add-Line '- Return full, runnable code — no `...existing code...` placeholders'
Add-Line ""
Add-Line "### Do Not"
Add-Line '- Do not use `require()` in any file (browser app, ES modules only)'
Add-Line '- Do not import `@prisri/jyotish` outside `src/infrastructure/astrology/`'
Add-Line '- Do not use `new Date(birthString)` — always Luxon with timezone'
Add-Line '- Do not add new dependencies without a strong reason'
Add-Line '- Do not use `any` except for interacting with the Kundli object'
Add-Line '- Do not break the three-layer architecture'
Add-Line '- Do not hardcode colors — use CSS variables or the chart theme'
Add-Line ""
Add-Line "### When Writing Files"
Add-Line "Provide the **complete file** — no partial snippets — because the user pastes directly into their editor or the scaffold script."
Add-Line ""
Add-Line "---"
Add-Line ""
Add-Line "*End of context document.*"
Add-Line ""

# ─────────────────────────────────────────────────────────────
# Write the file
# ─────────────────────────────────────────────────────────────
[System.IO.File]::WriteAllText($OutputFile, $output.ToString(), (New-Object System.Text.UTF8Encoding $false))

$outputSize = [math]::Round((Get-Item $OutputFile).Length / 1KB, 1)
$outputLines = (Get-Content $OutputFile).Count

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  ✓ Context document generated" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "  File:  AI-CONTEXT.md" -ForegroundColor Cyan
Write-Host "  Size:  $outputSize KB" -ForegroundColor Cyan
Write-Host "  Lines: $outputLines" -ForegroundColor Cyan
Write-Host "  Files: $totalCount" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Location: $OutputFile" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Next steps:" -ForegroundColor Yellow
Write-Host "    1. Open AI-CONTEXT.md" -ForegroundColor White
Write-Host "    2. Copy the entire file contents" -ForegroundColor White
Write-Host "    3. Paste into any AI (ChatGPT, Claude, Gemini, Cursor)" -ForegroundColor White
Write-Host "    4. Tell the AI what to build next" -ForegroundColor White
Write-Host ""
Write-Host "  Regenerate this file anytime with: .\generate-context.ps1" -ForegroundColor Cyan
Write-Host ""