
## 5. Project Conventions

### Imports
- Absolute imports via ``@/`` alias: ``@/components/ui/button``
- Relative imports only within the same feature folder.

### Components
- Functional components only.
- Report sections live in ``src/features/report/sections/`` and take ``kundli`` (and sometimes ``profile``) as props.
- Return ``null`` for empty states -- never crash.

### Styling
- Tailwind utility classes; no inline ``style`` except for dynamic values.
- Use CSS variables: ``hsl(var(--primary))``.
- Cards: ``rounded-2xl border bg-card``.

### Time & Dates
- **Always** Luxon. **Never** ``new Date(str)`` for birth data.

### Astrology
- The ``@prisri/jyotish`` library is behind ``JyotishPort``.
- **Never** import the library outside ``src/infrastructure/astrology/``.
- Treat ``Kundli`` as ``Record<string, any>`` when reading.

### i18n
- All user-facing text has an i18n key.
- Languages: ``en``, ``hi``, ``ne``. Add keys to all three locale files.
- Use ``t('key.path', { defaultValue: 'Fallback' })``.

### TypeScript
- Strict mode enabled.
- Avoid ``any`` except when interacting with the Kundli object.

## 6. Common Tasks

### Adding a new report section
1. Create ``src/features/report/sections/NewSection.tsx``.
2. Accept ``kundli`` as a prop.
3. Import shared primitives from ``../primitives/`` (``Section``, ``GlyphBadge``, ``AttributeBadge``).
4. Wire it into ``ReportOverview.tsx`` with an ``<OrnamentalDivider />`` and a ``<Section>``.
5. Add i18n keys to all three locale files.

### Adding a new chart style
1. Edit ``src/features/chart/theme.ts``.
2. Change the color, size, or stroke value -- all charts update automatically.

## 7. Instructions for the AI Assistant

**Do:**
- Follow the existing file structure and naming conventions.
- Reuse ``Section``, ``GlyphBadge``, ``AttributeBadge``, ``ChartCard``, etc.
- Match the visual language (rounded-2xl, warm palette, serif headings).
- Add i18n keys to all 3 locale files.
- Wrap expensive operations in ``useMemo``.
- Return full, runnable code -- no ``...existing code...`` placeholders.

**Do not:**
- Do not use ``require()`` in any file.
- Do not import ``@prisri/jyotish`` outside ``src/infrastructure/astrology/``.
- Do not use ``new Date(birthString)`` -- always Luxon with timezone.
- Do not add new dependencies without a strong reason.
- Do not use ``any`` except for the Kundli object.
- Do not break the three-layer architecture.
- Do not hardcode colors -- use CSS variables or the chart theme.
"@

Write-Utf8NoBom -Path $aiPath -Content $aiContent
Write-Host "      AI-CONTEXT.md regenerated." -ForegroundColor Green

# ------------------------------------------------------------
# Done
# ------------------------------------------------------------
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Done" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Backups saved to: $BackupRoot" -ForegroundColor DarkGray
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. npm run lint"
Write-Host "  2. npm run build"
Write-Host "  3. npm run dev"
Write-Host "  4. If anything looks wrong, restore from the backup folder above."
Write-Host ""
```

---

## How to Run It

Open PowerShell and run these four lines:

```powershell
cd D:\Development\Astrogyan\kundaliyatra
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
.\fix-kundaliyatra.ps1
```

**Before running:**
- Close VS Code / any editor so files aren't locked.
- Make sure your working directory really is `D:\Development\Astrogyan\kundaliyatra` (the script checks `package.json` and `src/` exist — it will refuse to run elsewhere).

**If PowerShell blocks the script** because of execution policy:

```powershell
powershell -ExecutionPolicy Bypass -File .\fix-kundaliyatra.ps1
```

---

## What It Does (Summary)

| Step | Action |
|------|--------|
| **0** | Creates `.cleanup-backup-YYYYMMDD-HHMMSS/` (mirror of every file it touches) |
| **1** | Deletes all `*.bak` / `*.bak-*` files in the tree |
| **2** | Deletes `src/features/report/sections/PanchangSection.tsx` (dead code) |
| **3** | Rewrites `src/App.tsx` to render `<DailyPanchangView />` on the Panchang tab |
| **4a** | Rewrites `report/lib/glyphs.ts` with `\u`-escaped glyphs |
| **4b** | Rewrites `chart/theme.ts` with clean comments and no mojibake |
| **4c** | Rewrites `report/lib/devanagari.ts` with `\u`-escaped Devanagari |
| **4d** | Rewrites `infrastructure/calendar/nepali-date.ts` with clean month names |
| **4e** | Repairs the Devanagari digit string + retrograde marker in `BaseChart.tsx` |
| **4f** | Normalizes `en.json`, `hi.json`, `ne.json` (round-trip through JSON, UTF-8 no BOM) |
| **5** | Appends `.cleanup-backup-*/` and `*.bak` rules to `.gitignore` |
| **6** | Regenerates `AI-CONTEXT.md` from the actual current file tree |

---

## After Running

```powershell
npm run lint
npm run build
npm run dev
```

If anything breaks, restore individual files from the `.cleanup-backup-*/` folder — the structure inside mirrors your project root exactly.

To delete the backup once you're happy:

```powershell
Remove-Item -Recurse -Force .\.cleanup-backup-*
```