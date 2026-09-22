# KundaliYatra â€” Full Source Scan

**Generated:** 2026-09-21 22:23:17
**Project root:** D:\Development\Astrogyan\kundaliyatra
**Total src files:** 96

> This document contains the full contents of every source file in the project.
> Use it to understand the current state, spot errors, or plan new components.

## 1. File Tree

```
src\App.tsx  (2.8 KB)
src\App.tsx.bak-20260921-221415  (1.7 KB)
src\components\app-header-tabs.tsx  (1.2 KB)
src\components\bs-date-picker.tsx  (3.2 KB)
src\components\change-birth-details-button.tsx  (0.8 KB)
src\components\icons.ts  (0.4 KB)
src\components\language-switcher.tsx  (1.3 KB)
src\components\palette-provider.tsx  (1.1 KB)
src\components\palette-switcher.tsx  (1.5 KB)
src\components\print-button.tsx  (0.9 KB)
src\components\theme-provider.tsx  (0.4 KB)
src\components\theme-toggle.tsx  (1.2 KB)
src\components\ui\button.tsx  (1.7 KB)
src\components\ui\card.tsx  (1.8 KB)
src\components\ui\command.tsx  (4.5 KB)
src\components\ui\dialog.tsx  (3.2 KB)
src\components\ui\dropdown-menu.tsx  (6.4 KB)
src\components\ui\input.tsx  (0.7 KB)
src\components\ui\label.tsx  (0.7 KB)
src\components\ui\popover.tsx  (1 KB)
src\components\ui\select.tsx  (5.1 KB)
src\components\ui\sonner.tsx  (0.8 KB)
src\domain\astrology\birth-data.ts  (0.2 KB)
src\domain\astrology\port.ts  (1.7 KB)
src\domain\geo\place.ts  (0.9 KB)
src\domain\geo\port.ts  (0.2 KB)
src\features\birth-profile\components\BirthDateField.tsx  (3.2 KB)
src\features\birth-profile\components\BirthProfileForm.tsx  (5.2 KB)
src\features\birth-profile\components\PlaceCombobox.tsx  (3.6 KB)
src\features\birth-profile\components\PlacePreview.tsx  (2.6 KB)
src\features\birth-profile\hooks\usePlaceSearch.ts  (1.7 KB)
src\features\birth-profile\schema.ts  (1.7 KB)
src\features\birth-profile\store.ts  (1.7 KB)
src\features\chart\ChartPreview.tsx  (0.7 KB)
src\features\chart\components\BaseChart.tsx  (11.6 KB)
src\features\chart\components\ChartStyleToggle.tsx  (1.1 KB)
src\features\chart\components\VedicChart.tsx  (1.8 KB)
src\features\chart\lib\adapters.ts  (9.7 KB)
src\features\chart\lib\geometry.ts  (4.6 KB)
src\features\chart\lib\glyphs.ts  (2.4 KB)
src\features\chart\lib\useChartStyle.ts  (0.5 KB)
src\features\chart\theme.ts  (4.6 KB)
src\features\chart\types.ts  (0.8 KB)
src\features\overview\OverviewView.tsx  (1.7 KB)
src\features\panchang\components\PanchangStrip.tsx  (1.5 KB)
src\features\panchang\DailyPanchangView.tsx  (17.8 KB)
src\features\report\components\ChartCard.tsx  (3.4 KB)
src\features\report\components\Hero.tsx  (10.3 KB)
src\features\report\components\ReportOverview.tsx  (7.8 KB)
src\features\report\components\SnapshotStrip.tsx  (1.9 KB)
src\features\report\components\SnapshotTile.tsx  (1.3 KB)
src\features\report\lib\aspect-info.ts  (2.1 KB)
src\features\report\lib\devanagari.ts  (2.1 KB)
src\features\report\lib\glyphs.ts  (1.3 KB)
src\features\report\lib\interpretations.ts  (7.1 KB)
src\features\report\lib\varga-info.ts  (9.6 KB)
src\features\report\primitives\AttributeBadge.tsx  (0.8 KB)
src\features\report\primitives\GlyphBadge.tsx  (1.5 KB)
src\features\report\primitives\index.ts  (0.3 KB)
src\features\report\primitives\InfoRow.tsx  (0.5 KB)
src\features\report\primitives\InfoTile.tsx  (1.3 KB)
src\features\report\primitives\OrnamentalDivider.tsx  (0.8 KB)
src\features\report\primitives\ReportPage.tsx  (0.4 KB)
src\features\report\primitives\Section.tsx  (1.3 KB)
src\features\report\sections\AdvancedSection.tsx  (4.5 KB)
src\features\report\sections\AspectsSection.tsx  (18.3 KB)
src\features\report\sections\BhavaSection.tsx  (3.6 KB)
src\features\report\sections\ChalitSection.tsx  (18.3 KB)
src\features\report\sections\CoreIdentitySection.tsx  (5.2 KB)
src\features\report\sections\DashaSection.tsx  (5.7 KB)
src\features\report\sections\DivisionalChartsSection.tsx  (5.7 KB)
src\features\report\sections\GrahaSection.tsx  (5.5 KB)
src\features\report\sections\HouseMapSection.tsx  (4.4 KB)
src\features\report\sections\PanchangSection.tsx  (7.6 KB)
src\features\report\sections\PanchangSection.tsx.bak-20260921-221638  (2 KB)
src\features\report\sections\PlanetaryMapSection.tsx  (6.3 KB)
src\features\report\sections\SpecialPointsSection.tsx  (3.6 KB)
src\features\report\sections\StrengthSection.tsx  (2.8 KB)
src\features\report\sections\ThreeAnchorsSection.tsx  (5.4 KB)
src\features\report\sections\UnfoldingSection.tsx  (6.2 KB)
src\features\report\sections\VitalSignsSection.tsx  (16.5 KB)
src\features\report\tokens.ts  (1.5 KB)
src\i18n\index.ts  (1.1 KB)
src\i18n\locales\en.json  (10.5 KB)
src\i18n\locales\hi.json  (9.3 KB)
src\i18n\locales\ne.json  (9.5 KB)
src\infrastructure\astrology\panchang.adapter.ts  (10.5 KB)
src\infrastructure\astrology\panchang.adapter.ts.bak-20260921-221309  (4.8 KB)
src\infrastructure\astrology\prisri-jyotish.adapter.ts  (1.7 KB)
src\infrastructure\calendar\nepali-date.ts  (2.9 KB)
src\infrastructure\geo\photon.geocoder.ts  (1.8 KB)
src\infrastructure\geo\tz.resolver.ts  (0.4 KB)
src\lib\utils.ts  (0.2 KB)
src\main.tsx  (0.5 KB)
src\styles\globals.css  (7.2 KB)
src\styles\print.css  (9.7 KB)
```

## 2. Root Config Files

### `package.json`

```json
{
  "name": "kundaliyatra",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "3.10.0",
    "@prisri/jyotish": "1.1.7",
    "@radix-ui/react-dialog": "1.1.6",
    "@radix-ui/react-dropdown-menu": "2.1.6",
    "@radix-ui/react-label": "2.1.2",
    "@radix-ui/react-popover": "1.1.6",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-slot": "1.1.2",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "cmdk": "1.0.4",
    "d3-shape": "3.2.0",
    "i18next": "24.2.2",
    "i18next-browser-languagedetector": "8.0.4",
    "lucide-react": "0.475.0",
    "luxon": "3.6.0",
    "nepali-date-converter": "3.4.0",
    "next-themes": "0.4.4",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-hook-form": "7.54.2",
    "react-i18next": "15.4.0",
    "sonner": "2.0.1",
    "tailwind-merge": "2.6.0",
    "tz-lookup": "6.1.25",
    "zod": "3.24.2",
    "zustand": "5.0.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/d3-shape": "3.1.7",
    "@types/luxon": "3.4.2",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@types/tz-lookup": "6.1.2",
    "@vitejs/plugin-react": "^6.1.1",
    "autoprefixer": "10.4.20",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "postcss": "8.4.49",
    "tailwindcss": "3.4.17",
    "tailwindcss-animate": "1.0.7",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.69.0",
    "vite": "^8.3.0"
  }
}
``````

### `package-lock.json`

```json
{
  "name": "kundaliyatra",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "kundaliyatra",
      "version": "0.0.0",
      "dependencies": {
        "@hookform/resolvers": "3.10.0",
        "@prisri/jyotish": "1.1.7",
        "@radix-ui/react-dialog": "1.1.6",
        "@radix-ui/react-dropdown-menu": "2.1.6",
        "@radix-ui/react-label": "2.1.2",
        "@radix-ui/react-popover": "1.1.6",
        "@radix-ui/react-select": "2.1.4",
        "@radix-ui/react-slot": "1.1.2",
        "class-variance-authority": "0.7.1",
        "clsx": "2.1.1",
        "cmdk": "1.0.4",
        "d3-shape": "3.2.0",
        "i18next": "24.2.2",
        "i18next-browser-languagedetector": "8.0.4",
        "lucide-react": "0.475.0",
        "luxon": "3.6.0",
        "nepali-date-converter": "3.4.0",
        "next-themes": "0.4.4",
        "react": "^19.2.8",
        "react-dom": "^19.2.8",
        "react-hook-form": "7.54.2",
        "react-i18next": "15.4.0",
        "sonner": "2.0.1",
        "tailwind-merge": "2.6.0",
        "tz-lookup": "6.1.25",
        "zod": "3.24.2",
        "zustand": "5.0.3"
      },
      "devDependencies": {
        "@eslint/js": "^10.0.1",
        "@types/d3-shape": "3.1.7",
        "@types/luxon": "3.4.2",
        "@types/node": "^24.13.3",
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.7",
        "@types/tz-lookup": "6.1.2",
        "@vitejs/plugin-react": "^6.1.1",
        "autoprefixer": "10.4.20",
        "eslint": "^10.10.0",
        "eslint-plugin-react-hooks": "^7.1.1",
        "eslint-plugin-react-refresh": "^0.5.6",
        "globals": "^17.12.0",
        "postcss": "8.4.49",
        "tailwindcss": "3.4.17",
        "tailwindcss-animate": "1.0.7",
        "typescript": "~6.0.2",
        "typescript-eslint": "^8.69.0",
        "vite": "^8.3.0"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.3.0.tgz",
      "integrity": "sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz",
      "integrity": "sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.29.7",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz",
      "integrity": "sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz",
      "integrity": "sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.7",
        "@babel/helper-compilation-targets": "^7.29.7",
        "@babel/helper-module-transforms": "^7.29.7",
        "@babel/helpers": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/template": "^7.29.7",
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.8.tgz",
      "integrity": "sha512-gZbepsdh3WDtgZKWL+vTPh71LSBrm/Y4/QDZBVCcYfmeTEEuoOYwlSy+G1StfJg+/Zy550u/3TATbm7qDbbMtg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.8",
        "@babel/types": "^7.29.8",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.7.tgz",
      "integrity": "sha512-wem6WaBj4NaVYVdNhLPPVacES6ZJ+KBBfSkTMD3YZxbP3rm3Di85tJU5ljaUNhaOynt+Aj0xruhYuzQBt8n71g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.29.7",
        "@babel/helper-validator-option": "^7.29.7",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz",
      "integrity": "sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz",
      "integrity": "sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.7.tgz",
      "integrity": "sha512-UPUVSyXbOh627KiCIGQSgwWzGeBKLkaJ9PJEdrngIwMSzxLR4jS4+f1f1jb7VzBbg8nFLaYotvVPFCTqdrmTAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7",
        "@babel/traverse": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.7.tgz",
      "integrity": "sha512-Pb5ijPrZ89GDH8223L4UP8i6QApWxs04RbPQJTeWDV0/keR2E36MeKnyr6LYmUUvqRRI+Iv87SuF1W6ErINzYw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz",
      "integrity": "sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz",
      "integrity": "sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.7.tgz",
      "integrity": "sha512-1k2lAGRMfHTcwuNYcCNUmaUffmQv8KWMfh2iJUUeRlwlwH4FdNG7mfPI10NPfLHJFThE4Tyr4mv7kTNZOiPuBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.9",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.9.tgz",
      "integrity": "sha512-CjXrNHTnvqBVqHgdBysY3vk2T8tpJHb5/RMeHJBTyVa9xgugCB0CJTx/3oO8RV2QRQP391RWpB7D6hLjm8V9uA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.8"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.7.tgz",
      "integrity": "sha512-Nq8OhGWiZIZGV6hLHoyAKLLcJihP/xFeBMGJoUrxTX2psI8dCifzLhZISFb+VWS3wFMRDmCGw5R+dOySCqPLhw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz",
      "integrity": "sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.8.tgz",
      "integrity": "sha512-I5z7H3bf/41ktsNVLtpN0wAa336HkqIHQ5BuPLEhTkt1jVSyZpeNKIzTgEWmlxjdg81R0IgUCcaE+Ok3NvrfZg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.8",
        "@babel/helper-globals": "^7.29.7",
        "@babel/parser": "^7.29.8",
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.8",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.8.tgz",
      "integrity": "sha512-Vj1jF3cPfxg7OAfoI7QnVKLoILlm2JF9pnVHrX8qx7AHMiYWT+NDAA7jChlNgRS4WTLc/fD1lXLmPixluj+3Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@cacheable/memory": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/@cacheable/memory/-/memory-2.2.0.tgz",
      "integrity": "sha512-CTLKqLItRCEixEAewD3/j9DB3/o96gpTPD4eJ1v+DGOlxZRZncRQkGYqqnAGCscYd6RNeXfGeiuCphsPtqyIfQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@cacheable/utils": "^2.5.0",
        "@keyv/bigmap": "^1.3.1",
        "hookified": "^1.15.1",
        "keyv": "^5.6.0"
      }
    },
    "node_modules/@cacheable/utils": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/@cacheable/utils/-/utils-2.5.0.tgz",
      "integrity": "sha512-buipgOVDkkPXNR5+xBpDw7Zk2n1EvU7qBJCNUcL7rhQ//kfpOXPAvQ511Os0vpLYJ1pZnvudNytkQt2hst3wqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hashery": "^1.5.1",
        "keyv": "^5.6.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.10.1.tgz",
      "integrity": "sha512-cuadcxVFE8sDK6iWJbs8Sn0av2Nrh2QSGQhVlBW9AaAHqHwjWsZHT8LJ4hFGPh7ASBV2deFdM7H/DPjulmh8rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.23.5",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.23.5.tgz",
      "integrity": "sha512-Y3kKLvC1dvTOT+oGlqNQ1XLqK6D1HU2YXPc52NmAlJZbMMWDzGYXMiPRJ8TYD39muD/OTjlZmNJ4ib7dvSrMBA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^3.0.5",
        "debug": "^4.3.1",
        "minimatch": "^10.2.4"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.7.0.tgz",
      "integrity": "sha512-DObd/KKUsU+FaFv4PLxSRenpXfQWmPXXP3pPZ6/K1PCrMu2vQpMDMuQe/BqYeoLcz8ro0bVDF1RxOJgfVEdhUw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^1.2.1"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/core": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-1.2.1.tgz",
      "integrity": "sha512-MwcE1P+AZ4C6DWlpin/OmOA54mmIZ/+xZuJiQd4SyB29oAJjN30UW9wkKNptW2ctp4cEsvhlLY/CsQ1uoHDloQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/js": {
      "version": "10.0.1",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-10.0.1.tgz",
      "integrity": "sha512-zeR9k5pd4gxjZ0abRoIaxdc7I3nDktoXZk2qOv9gCNWx3mVwEn32VRhyLaRsDiJjTs0xq/T8mfPtyuXu7GWBcA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "eslint": "^10.0.0"
      },
      "peerDependenciesMeta": {
        "eslint": {
          "optional": true
        }
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-3.0.5.tgz",
      "integrity": "sha512-vqTaUEgxzm+YDSdElad6PiRoX4t8VGDjCtt05zn4nU810UIx/uNEV7/lZJ6KwFThKZOzOxzXy48da+No7HZaMw==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.7.3",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.7.3.tgz",
      "integrity": "sha512-IkO+/KEUvwbVpiURZg+P7zF74z5Jxe0UgJxVni+RtoHQ6IZieXaO02kmadomap/q+l6bc/jdPGGqTjhuZnuz1Q==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^1.2.1",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@floating-ui/core": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/@floating-ui/core/-/core-1.8.0.tgz",
      "integrity": "sha512-0CIZ5itps/8x7BG8dEIhs53BvCUH2PCoogtakwRTut+Arm58sJooJ0AuZhLw2HJYIR5cMLNPBSS728sPho2khQ==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/utils": "^0.2.12"
      }
    },
    "node_modules/@floating-ui/dom": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.8.0.tgz",
      "integrity": "sha512-yXSrzeHZBTZadLOlfyhCkJHNeLJnHRnRInwdZ40L7ZiaAtrBwoYlsDrX3v5zB1Utk7CLfzcOVnVVWoXEky7Ceg==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/core": "^1.8.0",
        "@floating-ui/utils": "^0.2.12"
      }
    },
    "node_modules/@floating-ui/react-dom": {
      "version": "2.1.9",
      "resolved": "https://registry.npmjs.org/@floating-ui/react-dom/-/react-dom-2.1.9.tgz",
      "integrity": "sha512-JDjEFGCpImxDCA7JJKviA0M9+RtmJdj0m/NVU5IMgBK+AmZouAQQ7/+2GLH0GXXY0YMw9oXPB8hKdbPYg5QLYg==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/dom": "^1.8.0"
      },
      "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    },
    "node_modules/@floating-ui/utils": {
      "version": "0.2.12",
      "resolved": "https://registry.npmjs.org/@floating-ui/utils/-/utils-0.2.12.tgz",
      "integrity": "sha512-HpCo8tmWzLVad5s2d19EhAz5zqrrQ6s69qd6moPMQvkOuSwDT1YgRfWSVuc4ennqrgv3OHppiOGMQ7oC13yIww==",
      "license": "MIT"
    },
    "node_modules/@hookform/resolvers": {
      "version": "3.10.0",
      "resolved": "https://registry.npmjs.org/@hookform/resolvers/-/resolvers-3.10.0.tgz",
      "integrity": "sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag==",
      "license": "MIT",
      "peerDependencies": {
        "react-hook-form": "^7.0.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.2.tgz",
      "integrity": "sha512-UhXNm+CFMWcbChXywFwkmhqjs3PRCmcSa/hfBgLIb7oQ5HNb1wS0icWsGtSAUNgefHeI+eBrA8I1fxmbHsGdvA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/types": "^0.15.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.8",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.8.tgz",
      "integrity": "sha512-gE1eQNZ3R++kTzFUpdGlpmy8kDZD/MLyHqDwqjkVQI0JMdI1D51sy1H958PNXYkM2rAac7e5/CnIKZrHtPh3BQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.2",
        "@humanfs/types": "^0.15.0",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/types": {
      "version": "0.15.0",
      "resolved": "https://registry.npmjs.org/@humanfs/types/-/types-0.15.0.tgz",
      "integrity": "sha512-ZZ1w0aoQkwuUuC7Yf+7sdeaNfqQiiLcSRbfI08oAxqLtpXQr9AIVX7Ay7HLDuiLYAaFPu8oBYNq/QIi9URHJ3Q==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@keyv/bigmap": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/@keyv/bigmap/-/bigmap-1.3.1.tgz",
      "integrity": "sha512-WbzE9sdmQtKy8vrNPa9BRnwZh5UF4s1KTmSK0KUVLo3eff5BlQNNWDnFOouNpKfPKDnms9xynJjsMYjMaT/aFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hashery": "^1.4.0",
        "hookified": "^1.15.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "peerDependencies": {
        "keyv": "^5.6.0"
      }
    },
    "node_modules/@keyv/serialize": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@keyv/serialize/-/serialize-1.1.1.tgz",
      "integrity": "sha512-dXn3FZhPv0US+7dtJsIi2R+c7qWYiReoEh5zUntWCf4oSpMNib8FDhSoed6m3QyZdx5hK7iLFkYk3rNxwt8vTA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.150.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.150.0.tgz",
      "integrity": "sha512-rDS5/31E9HfPl/CIzGrn0DOlvBbXFseQ5URJ9sYMfstbKLD/c6Gm9vmRzRGDdAXyOIL4zmO37lc9RIwYqVruZw==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/oxc-project"
      }
    },
    "node_modules/@prisri/jyotish": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/@prisri/jyotish/-/jyotish-1.1.7.tgz",
      "integrity": "sha512-4DwPa4ojCufOTj/9z0q+2tzlnrlGQILQuKN1VvUV9BSrXgK7xSKQ7jXk/Fd3e9tdRypvY27hYIe+sEdJGgJP3Q==",
      "license": "ISC",
      "dependencies": {
        "astronomy-engine": "^2.1.19"
      }
    },
    "node_modules/@radix-ui/number": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/number/-/number-1.1.0.tgz",
      "integrity": "sha512-V3gRzhVNU1ldS5XhAPTom1fOIo4ccrjjJgmE+LI2h/WaFpHmx0MQApT+KZHnx8abG6Avtfcz4WoEciMnpFT3HQ==",
      "license": "MIT"
    },
    "node_modules/@radix-ui/primitive": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/primitive/-/primitive-1.1.1.tgz",
      "integrity": "sha512-SJ31y+Q/zAyShtXJc8x83i9TYdbAfHZ++tUZnvjJJqFjzsdUnKsxPL6IEtBlxKkU7yzer//GQtZSV4GbldL3YA==",
      "license": "MIT"
    },
    "node_modules/@radix-ui/react-arrow": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-arrow/-/react-arrow-1.1.2.tgz",
      "integrity": "sha512-G+KcpzXHq24iH0uGG/pF8LyzpFJYGD4RfLjCIBfGdSLXvjLHST31RUiRVrupIBMvIppMgSzQ6l66iAxl03tdlg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-collection": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-collection/-/react-collection-1.1.2.tgz",
      "integrity": "sha512-9z54IEKRxIa9VityapoEYMuByaG42iSy1ZXlY2KcuLSEtq8x4987/N6m15ppoMffgZX72gER2uHe1D9Y6Unlcw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-slot": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-compose-refs": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-compose-refs/-/react-compose-refs-1.1.1.tgz",
      "integrity": "sha512-Y9VzoRDSJtgFMUCoiZBDVo084VQ5hfpXxVE+NgkdNsjiDBByiImMZKKhxMwCbdHvhlENG6a833CbFkOQvTricw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-context": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context/-/react-context-1.1.1.tgz",
      "integrity": "sha512-UASk9zi+crv9WteK/NU4PLvOoL3OuE6BWVKNF6hPRBtYBDXQ2u5iu3O59zUlJiTVvkyuycnqrztsHVJwcK9K+Q==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dialog": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dialog/-/react-dialog-1.1.6.tgz",
      "integrity": "sha512-/IVhJV5AceX620DUJ4uYVMymzsipdKBzo3edo+omeskCKGm9FRHM0ebIdbPnlQVJqyuHbuBltQUOG2mOTq2IYw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-dismissable-layer": "1.1.5",
        "@radix-ui/react-focus-guards": "1.1.1",
        "@radix-ui/react-focus-scope": "1.1.2",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-portal": "1.1.4",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-slot": "1.1.2",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-direction": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-direction/-/react-direction-1.1.0.tgz",
      "integrity": "sha512-BUuBvgThEiAXh2DWu93XsT+a3aWrGqolGlqqw5VU1kG7p/ZH2cuDlM1sRLNnY3QcBS69UIz2mcKhMxDsdewhjg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dismissable-layer": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dismissable-layer/-/react-dismissable-layer-1.1.5.tgz",
      "integrity": "sha512-E4TywXY6UsXNRhFrECa5HAvE5/4BFcGyfTyK36gP+pAW1ed7UTK4vKwdr53gAJYwqbfCWC6ATvJa3J3R/9+Qrg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-escape-keydown": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dropdown-menu": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dropdown-menu/-/react-dropdown-menu-2.1.6.tgz",
      "integrity": "sha512-no3X7V5fD487wab/ZYSHXq3H37u4NVeLDKI/Ks724X/eEFSSEFYZxWgsIlr1UBeEyDaM29HM5x9p1Nv8DuTYPA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-menu": "2.1.6",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-guards": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-guards/-/react-focus-guards-1.1.1.tgz",
      "integrity": "sha512-pSIwfrT1a6sIoDASCSpFwOasEwKTZWDw/iBdtnqKO7v6FeOzYJ7U53cPzYFVR3geGGXgVHaH+CdngrrAzqUGxg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-scope": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-scope/-/react-focus-scope-1.1.2.tgz",
      "integrity": "sha512-zxwE80FCU7lcXUGWkdt6XpTTCKPitG1XKOwViTxHVKIJhZl9MvIl2dVHeZENCWD9+EdWv05wlaEkRXUykU27RA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-id": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-id/-/react-id-1.1.0.tgz",
      "integrity": "sha512-EJUrI8yYh7WOjNOqpoJaf1jlFIH2LvtgAl+YcFqNCa+4hj64ZXmPkAKOFs/ukjz3byN6bdb/AVUqHkI8/uWWMA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-label": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-label/-/react-label-2.1.2.tgz",
      "integrity": "sha512-zo1uGMTaNlHehDyFQcDZXRJhUPDuukcnHz0/jnrup0JA6qL+AFpAnty+7VKa9esuU5xTblAZzTGYJKSKaBxBhw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-menu": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-menu/-/react-menu-2.1.6.tgz",
      "integrity": "sha512-tBBb5CXDJW3t2mo9WlO7r6GTmWV0F0uzHZVFmlRmYpiSK1CDU5IKojP1pm7oknpBOrFZx/YgBRW9oorPO2S/Lg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-collection": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-dismissable-layer": "1.1.5",
        "@radix-ui/react-focus-guards": "1.1.1",
        "@radix-ui/react-focus-scope": "1.1.2",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-popper": "1.2.2",
        "@radix-ui/react-portal": "1.1.4",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-roving-focus": "1.1.2",
        "@radix-ui/react-slot": "1.1.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-popover": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-popover/-/react-popover-1.1.6.tgz",
      "integrity": "sha512-NQouW0x4/GnkFJ/pRqsIS3rM/k97VzKnVb2jB7Gq7VEGPy5g7uNV1ykySFt7eWSp3i2uSGFwaJcvIRJBAHmmFg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-dismissable-layer": "1.1.5",
        "@radix-ui/react-focus-guards": "1.1.1",
        "@radix-ui/react-focus-scope": "1.1.2",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-popper": "1.2.2",
        "@radix-ui/react-portal": "1.1.4",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-slot": "1.1.2",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-popper": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-popper/-/react-popper-1.2.2.tgz",
      "integrity": "sha512-Rvqc3nOpwseCyj/rgjlJDYAgyfw7OC1tTkKn2ivhaMGcYt8FSBlahHOZak2i3QwkRXUXgGgzeEe2RuqeEHuHgA==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/react-dom": "^2.0.0",
        "@radix-ui/react-arrow": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0",
        "@radix-ui/react-use-rect": "1.1.0",
        "@radix-ui/react-use-size": "1.1.0",
        "@radix-ui/rect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-portal": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-portal/-/react-portal-1.1.4.tgz",
      "integrity": "sha512-sn2O9k1rPFYVyKd5LAJfo96JlSGVFpa1fS6UuBJfrZadudiw5tAmru+n1x7aMRQ84qDM71Zh1+SzK5QwU0tJfA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-presence": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-presence/-/react-presence-1.1.2.tgz",
      "integrity": "sha512-18TFr80t5EVgL9x1SwF/YGtfG+l0BS0PRAlCWBDoBEiDQjeKgnNZRVJp/oVBl24sr3Gbfwc/Qpj4OcWTQMsAEg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-primitive": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.0.2.tgz",
      "integrity": "sha512-Ec/0d38EIuvDF+GZjcMU/Ze6MxntVJYO/fRlCPhCaVUyPY9WTalHJw54tp9sXeJo3tlShWpy41vQRgLRGOuz+w==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-roving-focus": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-roving-focus/-/react-roving-focus-1.1.2.tgz",
      "integrity": "sha512-zgMQWkNO169GtGqRvYrzb0Zf8NhMHS2DuEB/TiEmVnpr5OqPU3i8lfbxaAmC2J/KYuIQxyoQQ6DxepyXp61/xw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-collection": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-select/-/react-select-2.1.4.tgz",
      "integrity": "sha512-pOkb2u8KgO47j/h7AylCj7dJsm69BXcjkrvTqMptFqsE2i0p8lHkfgneXKjAgPzBMivnoMyt8o4KiV4wYzDdyQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/number": "1.1.0",
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-collection": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-dismissable-layer": "1.1.3",
        "@radix-ui/react-focus-guards": "1.1.1",
        "@radix-ui/react-focus-scope": "1.1.1",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-popper": "1.2.1",
        "@radix-ui/react-portal": "1.1.3",
        "@radix-ui/react-primitive": "2.0.1",
        "@radix-ui/react-slot": "1.1.1",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0",
        "@radix-ui/react-use-previous": "1.1.0",
        "@radix-ui/react-visually-hidden": "1.1.1",
        "aria-hidden": "^1.1.1",
        "react-remove-scroll": "^2.6.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-arrow": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-arrow/-/react-arrow-1.1.1.tgz",
      "integrity": "sha512-NaVpZfmv8SKeZbn4ijN2V3jlHA9ngBG16VnIIm22nUR0Yk8KUALyBxT3KYEUnNuch9sTE8UTsS3whzBgKOL30w==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-collection": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-collection/-/react-collection-1.1.1.tgz",
      "integrity": "sha512-LwT3pSho9Dljg+wY2KN2mrrh6y3qELfftINERIzBUO9e0N+t0oMTyn3k9iv+ZqgrwGkRnLpNJrsMv9BZlt2yuA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-primitive": "2.0.1",
        "@radix-ui/react-slot": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-dismissable-layer": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dismissable-layer/-/react-dismissable-layer-1.1.3.tgz",
      "integrity": "sha512-onrWn/72lQoEucDmJnr8uczSNTujT0vJnA/X5+3AkChVPowr8n1yvIKIabhWyMQeMvvmdpsvcyDqx3X1LEXCPg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-primitive": "2.0.1",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-escape-keydown": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-focus-scope": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-scope/-/react-focus-scope-1.1.1.tgz",
      "integrity": "sha512-01omzJAYRxXdG2/he/+xy+c8a8gCydoQ1yOxnWNcRhrrBW5W+RQJ22EK1SaO8tb3WoUsuEw7mJjBozPzihDFjA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-primitive": "2.0.1",
        "@radix-ui/react-use-callback-ref": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-popper": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-popper/-/react-popper-1.2.1.tgz",
      "integrity": "sha512-3kn5Me69L+jv82EKRuQCXdYyf1DqHwD2U/sxoNgBGCB7K9TRc3bQamQ+5EPM9EvyPdli0W41sROd+ZU1dTCztw==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/react-dom": "^2.0.0",
        "@radix-ui/react-arrow": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-primitive": "2.0.1",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0",
        "@radix-ui/react-use-rect": "1.1.0",
        "@radix-ui/react-use-size": "1.1.0",
        "@radix-ui/rect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-portal": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-portal/-/react-portal-1.1.3.tgz",
      "integrity": "sha512-NciRqhXnGojhT93RPyDaMPfLH3ZSl4jjIFbZQ1b/vxvZEdHsBZ49wP9w8L3HzUQwep01LcWtkUvm0OVB5JAHTw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.1",
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-primitive": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.0.1.tgz",
      "integrity": "sha512-sHCWTtxwNn3L3fH8qAfnF3WbUZycW93SM1j3NFDzXBiz8D6F5UTTy8G1+WFEaiCdvCVRJWj6N2R4Xq6HdiHmDg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-slot": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.1.1.tgz",
      "integrity": "sha512-RApLLOcINYJA+dMVbOju7MYv1Mb2EBp2nH4HdDzXTSyaR5optlm6Otrz1euW3HbdOR8UmmFK06TD+A9frYWv+g==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-slot": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.1.2.tgz",
      "integrity": "sha512-YAKxaiGsSQJ38VzKH86/BPRC4rh+b1Jpa+JneA5LRE7skmLPNAyeG8kPJj/oo4STLvlrs8vkf/iYyc3A5stYCQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-callback-ref": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-callback-ref/-/react-use-callback-ref-1.1.0.tgz",
      "integrity": "sha512-CasTfvsy+frcFkbXtSJ2Zu9JHpN8TYKxkgJGWbjiZhFivxaeW7rMeZt7QELGVLaYVfFMsKHjb7Ak0nMEe+2Vfw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-controllable-state": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-controllable-state/-/react-use-controllable-state-1.1.0.tgz",
      "integrity": "sha512-MtfMVJiSr2NjzS0Aa90NPTnvTSg6C/JLCV7ma0W6+OMV78vd8OyRpID+Ng9LxzsPbLeuBnWBA1Nq30AtBIDChw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-callback-ref": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-escape-keydown": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-escape-keydown/-/react-use-escape-keydown-1.1.0.tgz",
      "integrity": "sha512-L7vwWlR1kTTQ3oh7g1O0CBF3YCyyTj8NmhLR+phShpyA50HCfBFKVJTpshm9PzLiKmehsrQzTYTpX9HvmC9rhw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-callback-ref": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-layout-effect": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-layout-effect/-/react-use-layout-effect-1.1.0.tgz",
      "integrity": "sha512-+FPE0rOdziWSrH9athwI1R0HDVbWlEhd+FR+aSDk4uWGmSJ9Z54sdZVDQPZAinJhJXwfT+qnj969mCsT2gfm5w==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-previous": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-previous/-/react-use-previous-1.1.0.tgz",
      "integrity": "sha512-Z/e78qg2YFnnXcW88A4JmTtm4ADckLno6F7OXotmkQfeuCVaKuYzqAATPhVzl3delXE7CxIV8shofPn3jPc5Og==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-rect": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-rect/-/react-use-rect-1.1.0.tgz",
      "integrity": "sha512-0Fmkebhr6PiseyZlYAOtLS+nb7jLmpqTrJyv61Pe68MKYW6OWdRE2kI70TaYY27u7H0lajqM3hSMMLFq18Z7nQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/rect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-size": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-size/-/react-use-size-1.1.0.tgz",
      "integrity": "sha512-XW3/vWuIXHa+2Uwcc2ABSfcCledmXhhQPlGbfcRXbiUQI5Icjcg19BGCZVKKInYbvUCut/ufbbLLPFC5cbb1hw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-visually-hidden": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-visually-hidden/-/react-visually-hidden-1.1.1.tgz",
      "integrity": "sha512-vVfA2IZ9q/J+gEamvj761Oq1FpWgCDaNOOIfbPVp2MVPLEomUr5+Vf7kJGwQ24YxZSlQVar7Bes8kyTo5Dshpg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-primitive": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.0.1.tgz",
      "integrity": "sha512-sHCWTtxwNn3L3fH8qAfnF3WbUZycW93SM1j3NFDzXBiz8D6F5UTTy8G1+WFEaiCdvCVRJWj6N2R4Xq6HdiHmDg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-slot": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.1.1.tgz",
      "integrity": "sha512-RApLLOcINYJA+dMVbOju7MYv1Mb2EBp2nH4HdDzXTSyaR5optlm6Otrz1euW3HbdOR8UmmFK06TD+A9frYWv+g==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/rect": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/rect/-/rect-1.1.0.tgz",
      "integrity": "sha512-A9+lCBZoaMJlVKcRBz2YByCG+Cp2t6nAnMnNba+XiWxnj6r4JUFqfsgwocMBZU9LPtdxC6wB56ySYpc7LQIoJg==",
      "license": "MIT"
    },
    "node_modules/@rolldown/binding-android-arm-eabi": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm-eabi/-/binding-android-arm-eabi-1.2.9.tgz",
      "integrity": "sha512-tNISae1QEf/vkb3xkRcjV5SEdzPE97We5IVaa2Z8jSszQPZ8U60B/YCYpw4QI7VidYsBtKavczXf+DyDs9WGxw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.2.9.tgz",
      "integrity": "sha512-YC8YsI30o606GTZi0VyzYlsDKFP8W61i/QzayHDkLbNEz/IShqAmTa+hsJRj13xTHA0H+6fk4b2UmGn+Q/cMlg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.2.9.tgz",
      "integrity": "sha512-IwhlH3qK5urrY8hZiEgGkHKEFN901p/p2bjxCxJlr4GyNnF7wYpUvK+Y43uaRYuC4hpfjzbR3SJC3arX1jGvmw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.2.9.tgz",
      "integrity": "sha512-XxpJfVzFh+jilRxIXUqcfYAYcunIc/XEzIizsOL1fcJee5Sf7H3mH8WlLmfHfluz5amqR88QQo9izKtmMlavAw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.2.9.tgz",
      "integrity": "sha512-kSfvhmgeWyfkbT3p/1s5vSgboogoah2zkm9fX2zjg2hHxSV7T4KhMWRUUaRk4OXNqoD3QAUeRqLcs1aZOK4U1g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.2.9.tgz",
      "integrity": "sha512-1RVzG17pxqbTfYLC352JlLt6kKLG+6Hr30n8DlIJqsnV5luUDd2Qdx9Ayw1Cabfyb1K9k0jXEZ7evxkRoT+uiw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.2.9.tgz",
      "integrity": "sha512-BXqPvZ2drqVD+/Z8UpKwcs4Mp7grM+eGFku4CAEKrEtcbAsUpzREphK1sogCRZGreVPiMkiiBtw0n3TPteuqvw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.2.9.tgz",
      "integrity": "sha512-11vWvo8YDwLzukt27J3aYDWU+gg2P7J+ZOmiJ0hkF5BXZDW7pVya7r40MXDy6ya0i9KamoENSVKIugvJNgFXIA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.2.9.tgz",
      "integrity": "sha512-a1tijMkdwsIARtc0F39ApURROkf3NwqinI6TOiSSWCTR7dT96dffNvMUtDHnq64wKNTIZOIlzKrFvvFUznJiyw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.2.9.tgz",
      "integrity": "sha512-x6SQNdAvv4c3hWqTMaWuawzMX9myaCs/yEmlGsxJzkdClnHW7FbrjQuSiRDhuSYzEYoEMhsaJy9qHG/XNemJPQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.2.9.tgz",
      "integrity": "sha512-9s0AZ8BFK5/n7B/TBoa2yJE3gI3KURrbXcPBlsAsvjU4VeJKgE90y1YtNxyEUIcHPQkg6/yfF3qihUrcM/Kf0Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.2.9.tgz",
      "integrity": "sha512-P7VWAmV+WdJluH7ovnRGoiv2i8To7GAZ+kGzfGup635cyL7SyYl3lSUaA3Gp5THf0n/Co5EyEqb2zbqq+nMOHQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.2.9.tgz",
      "integrity": "sha512-1qixtsE4BK8h+yS3BfmZ09UhA7O/N4IACva6YBr7EBvCJraByTuRcgOTaiA62Tm0vey3UcKXLOaoGHtYmNGEVg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.2.9.tgz",
      "integrity": "sha512-ok8IQjcEPs1AKZfuEUznVBrJw+gK4soq+bx8b1X2XoMqVClarc1q5JDmVtWXY1xfr6ZuHTAsPXHTgTrqKTZeww==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.2.9.tgz",
      "integrity": "sha512-Ip2mXoU0hM0boq3Rf+ekuT653OROSo6aSYcPT1VHE4q52KvyxgFkQgrgb/IEsxOuvQ2fZZbs8khJAyCEPM24/g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz",
      "integrity": "sha512-2j9bGt5Jh8hj+vPtgzPtl72j0yRxHAyumoo6TNfAjsLB04UtpSvPbPcDcBMxz7n+9CYB0c1GxQFxYRg2jimqGw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/d3-path": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/@types/d3-path/-/d3-path-3.1.1.tgz",
      "integrity": "sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/d3-shape": {
      "version": "3.1.7",
      "resolved": "https://registry.npmjs.org/@types/d3-shape/-/d3-shape-3.1.7.tgz",
      "integrity": "sha512-VLvUQ33C+3J+8p+Daf+nYSOsjB4GXp19/S/aGo60m9h1v6XaxjiT82lKVWJCfzhtuZ3yD7i/TPeC/fuKLLOSmg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/d3-path": "*"
      }
    },
    "node_modules/@types/esrecurse": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/@types/esrecurse/-/esrecurse-4.3.1.tgz",
      "integrity": "sha512-xJBAbDifo5hpffDBuHl0Y8ywswbiAp/Wi7Y/GtAgSlZyIABppyurxVueOPE8LUQOxdlgi6Zqce7uoEpqNTeiUw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz",
      "integrity": "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/luxon": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/@types/luxon/-/luxon-3.4.2.tgz",
      "integrity": "sha512-TifLZlFudklWlMBfhubvgqTXRzLDI5pCbGa4P8a3wPyUQSW+1xQ5eDsreP9DWHX3tjq1ke96uYG/nwundroWcA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.13.6",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.13.6.tgz",
      "integrity": "sha512-SGrw/h3KPFshy3OE6ZL53LMBG5vGQQ8/gIpiqz/kRZhPJ7HgwCEs8LBuNtWLa8dvGZVpSF7+Bf+c11HUrCb/yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.18.0"
      }
    },
    "node_modules/@types/react": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.3.0.tgz",
      "integrity": "sha512-N0rFCuH9YoxG9/m61l9MfpJKfmLOVU0em7ipIz6TRgSSkvReLB9vL85GB+yr8Bs5leqpvg96JSwF4ZS1s4viQg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.3.0.tgz",
      "integrity": "sha512-ZI7bU42mZXXKHn/qNLEw2IrbiINU7X5+vfgdixBHkCNpYWXjKgfQ/P+uyGb5CjOLB9UcnTeg3rylQtV2hym44Q==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.3.0"
      }
    },
    "node_modules/@types/tz-lookup": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/@types/tz-lookup/-/tz-lookup-6.1.2.tgz",
      "integrity": "sha512-9y31Xf/8FHXrCHjvVjGZLcsayAa6ABNc8bZlk6MPOQLLlr41tICSqW3TRPRIx2nodbzdKs5N7ipHWBrUsWUiAA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@typescript-eslint/eslint-plugin": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.70.1.tgz",
      "integrity": "sha512-nDNrUQ/4ruSNYbu749TRY7cfrzPtoLHEXSNBI8aaNY32LlZCajixqRf3FqcKC4p5Cam4VOHYx/t+i5+nKXvrqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/regexpp": "^4.12.2",
        "@typescript-eslint/scope-manager": "8.70.1",
        "@typescript-eslint/type-utils": "8.70.1",
        "@typescript-eslint/utils": "8.70.1",
        "@typescript-eslint/visitor-keys": "8.70.1",
        "ignore": "^7.0.5",
        "natural-compare": "^1.4.0",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "@typescript-eslint/parser": "^8.70.1",
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin/node_modules/ignore": {
      "version": "7.0.9",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.9.tgz",
      "integrity": "sha512-brTTsvFRt5C1gGHtPst/281UjPD5t9fBqbgoMPlVWy11ZLTPfu7HxK4ZYqO9H7o/yC9rSTCI85EaQ4OoY12qYw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.70.1.tgz",
      "integrity": "sha512-nO974WLllwhSFWQXnMLj6nDGa8f0khKEz1JzpPJ1u7Vm/4X1X6ZHajpoknU4bb41vJyMB0HHVyS2GqdhWfIXZw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/scope-manager": "8.70.1",
        "@typescript-eslint/types": "8.70.1",
        "@typescript-eslint/typescript-estree": "8.70.1",
        "@typescript-eslint/visitor-keys": "8.70.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/project-service": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.70.1.tgz",
      "integrity": "sha512-62xOgboPfwc3/IgPSX/W6oQR3ZbF04194FPGUGH8HL8iLFHbt/456/8Ph1wLNUgVF+s94FlHoipBsz+v7+LMnA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/tsconfig-utils": "^8.70.1",
        "@typescript-eslint/types": "^8.70.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.70.1.tgz",
      "integrity": "sha512-Pa0EeSeAusQc1WbjQMac+YfenewYTBu0KjgYvkUKwhXaHUKbFog23Dm/rp0DX/6tyYOQ3Xl1a+3EcFNZynGHCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.70.1",
        "@typescript-eslint/visitor-keys": "8.70.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/tsconfig-utils": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.70.1.tgz",
      "integrity": "sha512-jumze1fPI+sDOaM2TWGQdn39PDxTr7TZGeuyLkAbNyx2vtMT3uRnVKChN0hfht5V2TugphJzF6bYXvBcE09qqg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/type-utils": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.70.1.tgz",
      "integrity": "sha512-7zKTnyvaVWqzLZHPFQtX1hVHqgkMC+WebPWakNCSyrQVbIP1AM0L0TlBZtACldIRb6PptI8Odk+jyZ5kP3B1VA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.70.1",
        "@typescript-eslint/typescript-estree": "8.70.1",
        "@typescript-eslint/utils": "8.70.1",
        "debug": "^4.4.3",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.70.1.tgz",
      "integrity": "sha512-Dm1ypdhhrGCTyyehxElhgJ6kgk8MVCv5qXdoOVqPr1uqk42jX8KjrZqhROvdShczA8qrDoYiOWn1ykWlx2k81Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.70.1.tgz",
      "integrity": "sha512-TU8PwyGN0PQJUcE96mw8eCQ44SmxGdQlJmlWakHaHQ15eIuuvye5yNtmh/i6oS88jzXVQB71xdNkbkB/fMwL0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/project-service": "8.70.1",
        "@typescript-eslint/tsconfig-utils": "8.70.1",
        "@typescript-eslint/types": "8.70.1",
        "@typescript-eslint/visitor-keys": "8.70.1",
        "debug": "^4.4.3",
        "minimatch": "^10.2.2",
        "semver": "^7.7.3",
        "tinyglobby": "^0.2.15",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@typescript-eslint/utils": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.70.1.tgz",
      "integrity": "sha512-Esgul8MsnKnRLdYU2Eb2cRV9bS5HJYtKj1ByJnOzzG2M58DGdSUQ1jUuILxipqcpB2h9WLrbD5GijIWUjX/Tqw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.9.1",
        "@typescript-eslint/scope-manager": "8.70.1",
        "@typescript-eslint/types": "8.70.1",
        "@typescript-eslint/typescript-estree": "8.70.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.70.1.tgz",
      "integrity": "sha512-Vwj9lUIW5Xq3wQ9w6gv3R86g1hMK8f2zNOdGTAgeXUMMXFK78G9ruCjjqutHMNJc0+CH7LYRnHeUB9IT8wFmcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.70.1",
        "eslint-visitor-keys": "^5.0.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "6.1.1",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-6.1.1.tgz",
      "integrity": "sha512-yxLaQV9gkhS8ezJqCM6+ndU7mDY6gqAg75NQ+0IjwEI8IYOmQCgkRwHKVSfWXW076DsqMo0Dk+0FK1U+M5RgFw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rolldown/pluginutils": "^1.0.1"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "@rolldown/plugin-babel": "^0.1.7 || ^0.2.0",
        "babel-plugin-react-compiler": "^1.0.0",
        "oxc-transform-react": "^0.145.0",
        "vite": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "@rolldown/plugin-babel": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        },
        "oxc-transform-react": {
          "optional": true
        }
      }
    },
    "node_modules/acorn": {
      "version": "8.18.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.18.0.tgz",
      "integrity": "sha512-lGq+9yr1/GuAWaVYIHRjvvySG5/4VfKIvC8EWxStPdcDh/Ka7FG3twP6v4d5BkravUilhIAsG4Qj83t02LWUPQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.15.0.tgz",
      "integrity": "sha512-fgFx7Hfoq60ytK2c7DhnF8jIvzYgOMxfugjLOSMHjLIPgenqa7S7oaagATUq99mV6IYvN2tRmC0wnTYX6iPbMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/anymatch/node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/aria-hidden": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/aria-hidden/-/aria-hidden-1.2.6.tgz",
      "integrity": "sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/astronomy-engine": {
      "version": "2.1.19",
      "resolved": "https://registry.npmjs.org/astronomy-engine/-/astronomy-engine-2.1.19.tgz",
      "integrity": "sha512-8yWKNf7UeNbH458h3sAJ6ZgAjE5jTXp/mNNRFoC20j2SHwZIjAQeEsBB2Q3uCFRaTCCJRv33K2XhkhZQMXoX6w==",
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.4.20",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.20.tgz",
      "integrity": "sha512-XY25y5xSv/wEoqzDyXXME4AFfkZI0P23z6Fs3YgymDnKJkCGOnkL0iTxCa85UTqaSgfcqyf3UA6+c7wUvx/16g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.23.3",
        "caniuse-lite": "^1.0.30001646",
        "fraction.js": "^4.3.7",
        "normalize-range": "^0.1.2",
        "picocolors": "^1.0.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.25",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.25.tgz",
      "integrity": "sha512-gMmEShwwq7FJqMwvfRwvCl00v4kN+KOfJqXn+f4nrufak5gNHJOksd/60Dvjuz7sI8Y5WiSFBa8FEYr+zoyqCw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/brace-expansion": {
      "version": "5.0.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.12.tgz",
      "integrity": "sha512-YovQ3rzhaLMIrDjNDMkNS01tea93qhEhG5xy8f6+R0l+dw3Ki+5sCoIoI942iuLZTHWogWktgwVDhU09iNEimQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "20 || >=22"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.29.0",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.29.0.tgz",
      "integrity": "sha512-3GSvyjvDI4Dur1Meg2BekJquu5uF+9R9a1+5M1Mde192eZoXbeXjzgOsgqPS2V8D5wrrip0gR5Hf/GhWQ9ZzaA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.11.23",
        "caniuse-lite": "^1.0.30001810",
        "electron-to-chromium": "^1.5.427",
        "node-releases": "^2.0.55",
        "update-browserslist-db": "^1.3.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/cacheable": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/cacheable/-/cacheable-2.5.0.tgz",
      "integrity": "sha512-60cyAOytib/OzBw1JNSoSV/boK1AtHryDIjvVBk7XbN4ugfkM3+Sry7fEjNgPMGgOjuaZPAp8ruZ0Cxafwyq9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@cacheable/memory": "^2.2.0",
        "@cacheable/utils": "^2.5.0",
        "hookified": "^1.15.0",
        "keyv": "^5.6.0",
        "qified": "^0.10.1"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001810",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001810.tgz",
      "integrity": "sha512-TITQPUkaz+aVk5GL6NhOdwk1aEaNTSDPsGFWrTuhKGtjTF70jL/Oht2W4c6rXUe5fu7Ie19VIahAXHIIiWWNeg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/class-variance-authority": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.1.tgz",
      "integrity": "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==",
      "license": "Apache-2.0",
      "dependencies": {
        "clsx": "^2.1.1"
      },
      "funding": {
        "url": "https://polar.sh/cva"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/cmdk": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/cmdk/-/cmdk-1.0.4.tgz",
      "integrity": "sha512-AnsjfHyHpQ/EFeAnG216WY7A5LiYCoZzCSygiLvfXC3H3LFGCprErteUcszaVluGOhuOTbJS3jWHrSDYPBBygg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-dialog": "^1.1.2",
        "@radix-ui/react-id": "^1.1.0",
        "@radix-ui/react-primitive": "^2.0.0",
        "use-sync-external-store": "^1.2.2"
      },
      "peerDependencies": {
        "react": "^18 || ^19 || ^19.0.0-rc",
        "react-dom": "^18 || ^19 || ^19.0.0-rc"
      }
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/d3-path": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-path/-/d3-path-3.1.0.tgz",
      "integrity": "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==",
      "license": "ISC",
      "dependencies": {
        "d3-path": "^3.1.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/detect-node-es": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/detect-node-es/-/detect-node-es-1.1.0.tgz",
      "integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==",
      "license": "MIT"
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.433",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.433.tgz",
      "integrity": "sha512-5lCAbyZBjtmUt/RAGHRqrL2q0oEFRThDAsZHHDn9XHa89Qw7gMYOeSicBTy+AHfvo0r6vwsZvqNJTQIQy1BLzA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "10.11.0",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-10.11.0.tgz",
      "integrity": "sha512-P7a6UEEqb9G95MYAtqkmsTbVXIYyzIfl6NGOIJk162PaahFxFyeGcrlXYFSiagECg4sEm8IseJdZBKR3rx6MsQ==",
      "dev": true,
      "license": "MIT",
      "workspaces": [
        "packages/*"
      ],
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.2",
        "@eslint/config-array": "^0.23.5",
        "@eslint/config-helpers": "^0.7.0",
        "@eslint/core": "^1.2.1",
        "@eslint/plugin-kit": "^0.7.3",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.14.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^9.1.2",
        "eslint-visitor-keys": "^5.0.1",
        "espree": "^11.2.0",
        "esquery": "^1.7.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "11.1.5 || >11.1.6 <12",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "minimatch": "^10.2.5",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-7.1.1.tgz",
      "integrity": "sha512-f2I7Gw6JbvCexzIInuSbZpfdQ44D7iqdWX01FKLvrPgqxoE7oMj8clOfto8U6vYiz4yd5oKu39rRSVOe1zRu0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.24.4",
        "@babel/parser": "^7.24.4",
        "hermes-parser": "^0.25.1",
        "zod": "^3.25.0 || ^4.0.0",
        "zod-validation-error": "^3.5.0 || ^4.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0 || ^10.0.0"
      }
    },
    "node_modules/eslint-plugin-react-hooks/node_modules/zod": {
      "version": "4.6.5",
      "resolved": "https://registry.npmjs.org/zod/-/zod-4.6.5.tgz",
      "integrity": "sha512-v5l/aFXZQeai4awLbOpSoHecE9UiMrnfx75tEXLjNonXVARxQ5mOeipTjROUchszUNCqnE+hqAMujRsRHsut2Q==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/eslint-plugin-react-refresh": {
      "version": "0.5.7",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-refresh/-/eslint-plugin-react-refresh-0.5.7.tgz",
      "integrity": "sha512-XhJSzLljuYD4UjNuFGJu2v7aD3sqNVK12w5/DCUfrNfHWegZo2+TsavNx8MuxMwEquuFAzNbNfXKU0WoZ+YUIg==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "eslint": "^9 || ^10"
      }
    },
    "node_modules/eslint-scope": {
      "version": "9.1.2",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-9.1.2.tgz",
      "integrity": "sha512-xS90H51cKw0jltxmvmHy2Iai1LIqrfbw57b79w/J7MfvDfkIkFZ+kj6zC3BjtUwh150HsSSdxXZcsuv72miDFQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "@types/esrecurse": "^4.3.1",
        "@types/estree": "^1.0.8",
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
      "integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "11.2.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-11.2.0.tgz",
      "integrity": "sha512-7p3DrVEIopW1B1avAGLuCSh1jubc01H2JHc8B4qqGblmg5gI9yumBgACjWo4JlIc04ufug4xJ3SQI8HkS/Rgzw==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.16.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^5.0.1"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fastq": {
      "version": "1.20.3",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.3.tgz",
      "integrity": "sha512-XKv5nnLs6nLF71NgiKJLIZFLkPyIEuOselLG7ujZnGrRfQK8HpvY+WqKhAJUAdLomwVHErVS4LfxFlPq0/FTAw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/file-entry-cache": {
      "version": "11.1.5",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-11.1.5.tgz",
      "integrity": "sha512-+PFTHITI08JIGhnNpGNI8T8inUpgZfk3GNEqfT9R2zZV2iFXg3CvqzSl/uEhs7TSGujYRELEANyDvS8Fj7+S7Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^6.1.23"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "6.1.23",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-6.1.23.tgz",
      "integrity": "sha512-f++BY9pTk+983xK1FLzlLpmM0i0z+jHmx3QESGkURMXujQZz1k5wzwX6hjnQ8goaD0B+sYnDK1yZ6MTyZfUaqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cacheable": "^2.5.0",
        "flatted": "^3.4.2",
        "hookified": "^1.15.0"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.4",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.4.tgz",
      "integrity": "sha512-5+ybhBZANEJxaH3X5evAFatUxLfEHSr7n6kYJ+1Qd0mUqr4eu9gIf6GDbWHf8RJijHrjjO8G+la14SlL2SeS1Q==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/fraction.js": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.7.tgz",
      "integrity": "sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "patreon",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-nonce": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-nonce/-/get-nonce-1.0.1.tgz",
      "integrity": "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "17.12.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-17.12.0.tgz",
      "integrity": "sha512-cezEd/DTyyht9cvSSURyygXPfy04GtWO/5e6ZPvH7fCtjKz9PYOmuawphw1Ctd1f6C+5JypXfGD7ahNMXvevBA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/hashery": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/hashery/-/hashery-1.5.1.tgz",
      "integrity": "sha512-iZyKG96/JwPz1N55vj2Ie2vXbhu440zfUfJvSwEqEbeLluk7NnapfGqa7LH0mOsnDxTF85Mx8/dyR6HfqcbmbQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hookified": "^1.15.0"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/hermes-estree": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.25.1.tgz",
      "integrity": "sha512-0wUoCcLp+5Ev5pDW2OriHC2MJCbwLwuRx+gAqMTOkGKJJiBCLjtrvy4PWUGn6MIVefecRpzoOZ/UV6iGdOr+Cw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/hermes-parser": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.25.1.tgz",
      "integrity": "sha512-6pEjquH3rqaI6cYAXYPcz9MS4rY6R4ngRgrgfDshRptUZIc3lw0MCIJIGDj9++mfySOuPTHB4nrSW99BCvOPIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hermes-estree": "0.25.1"
      }
    },
    "node_modules/hookified": {
      "version": "1.15.1",
      "resolved": "https://registry.npmjs.org/hookified/-/hookified-1.15.1.tgz",
      "integrity": "sha512-MvG/clsADq1GPM2KGo2nyfaWVyn9naPiXrqIe4jYjXNZQt238kWyOGrsyc/DmRAQ+Re6yeo6yX/yoNCG5KAEVg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/html-parse-stringify": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/html-parse-stringify/-/html-parse-stringify-3.1.0.tgz",
      "integrity": "sha512-E0oAXcELOtsXe+BmpJ2EZyedbldPpriV5vICzEuo6xjC/D1lDukOI7KrpfQGF2Qc4wWEy0nk3bFORS2K5ZAhFQ==",
      "license": "MIT",
      "dependencies": {
        "void-elements": "3.1.0"
      }
    },
    "node_modules/i18next": {
      "version": "24.2.2",
      "resolved": "https://registry.npmjs.org/i18next/-/i18next-24.2.2.tgz",
      "integrity": "sha512-NE6i86lBCKRYZa5TaUDkU5S4HFgLIEJRLr3Whf2psgaxBleQ2LC1YW1Vc+SCgkAW7VEzndT6al6+CzegSUHcTQ==",
      "funding": [
        {
          "type": "individual",
          "url": "https://locize.com"
        },
        {
          "type": "individual",
          "url": "https://locize.com/i18next.html"
        },
        {
          "type": "individual",
          "url": "https://www.i18next.com/how-to/faq#i18next-is-awesome.-how-can-i-support-the-project"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.23.2"
      },
      "peerDependencies": {
        "typescript": "^5"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/i18next-browser-languagedetector": {
      "version": "8.0.4",
      "resolved": "https://registry.npmjs.org/i18next-browser-languagedetector/-/i18next-browser-languagedetector-8.0.4.tgz",
      "integrity": "sha512-f3frU3pIxD50/Tz20zx9TD9HobKYg47fmAETb117GKGPrhwcSSPJDoCposXlVycVebQ9GQohC3Efbpq7/nnJ5w==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.23.2"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.17.0",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.17.0.tgz",
      "integrity": "sha512-J/vG0zBCbIKOQFfufSwyXdMrsohyJIUNkrnmo6WZGzoM7tr/lsbfW5b2BvisL6zsyMzK9UxV9L6c7AoFbyXHOA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/keyv": {
      "version": "5.6.0",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-5.6.0.tgz",
      "integrity": "sha512-CYDD3SOtsHtyXeEORYRx2qBtpDJFjRTGXUtmNEMGyzYOKj1TE3tycdlho7kA1Ufx9OYWZzg52QFBGALTirzDSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@keyv/serialize": "^1.1.1"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.33.0.tgz",
      "integrity": "sha512-WkUDrojuJs0xkgGf2udWxa3yGBRxPtxUkB79i6aCZLRgc7PM8fZe9TosfPDcvEpQZbuFASnHYmRLBLUbmLOIIA==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.33.0",
        "lightningcss-darwin-arm64": "1.33.0",
        "lightningcss-darwin-x64": "1.33.0",
        "lightningcss-freebsd-x64": "1.33.0",
        "lightningcss-linux-arm-gnueabihf": "1.33.0",
        "lightningcss-linux-arm64-gnu": "1.33.0",
        "lightningcss-linux-arm64-musl": "1.33.0",
        "lightningcss-linux-x64-gnu": "1.33.0",
        "lightningcss-linux-x64-musl": "1.33.0",
        "lightningcss-win32-arm64-msvc": "1.33.0",
        "lightningcss-win32-x64-msvc": "1.33.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.33.0.tgz",
      "integrity": "sha512-gEpRTalKdosp4Bb8qWtc2iOgE5SeIHlpS1up9bFq2wAyYhl1UdTObYiHe98zEM9SQvSoqQZ1IQD0JNpg3Ml5pg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.33.0.tgz",
      "integrity": "sha512-Sciaz8eenNTKn9b3t7+xr0ipTp9YxKQY4npwQ3mrRuL0BAVHBLyZxofhaKBAVtzmtRZ/zTyo0/to4B1uWG/Djg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.33.0.tgz",
      "integrity": "sha512-Z5UPAxzrjlWNNyGy6i65cJzzvgJ5D3T6wMvs+gWpY9d7qRhANrxqAp6LhxIgZhWEw18RfJTGcRxjuLIBr+m8XQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.33.0.tgz",
      "integrity": "sha512-QQM/Ti/hQajJwCY+RiWuCZ9sdtI/XQk7nDK5vC8kkdwixezOlDgvDx7+RT+QjK6FcFT4MpsuoBnHIo/O3StRRg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.33.0.tgz",
      "integrity": "sha512-N7FVBe6iS24MlM6R/4RBTxGhQheZGs7tiQ9U32UtF75NzP5Q7xWPRqLBCKxlRQRk3rY1jCIPLzx7WzOhuUIRLQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.33.0.tgz",
      "integrity": "sha512-j2v/itmy4HlNxlc6voKXYgBqNi0Ng2LShg4z7GufpEgs05P+2suBVyi9I6YHq5uoVFx9ETin3eCEhLVyXGQnKg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.33.0.tgz",
      "integrity": "sha512-yiO5ROMuYQgXbC60yjZU5CYSFZGKXL0HFATXt9mHJn1+zW55oCtMI9NfcVhYLMFDL7gV7oBPon/EmMMGg2OvtQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.33.0.tgz",
      "integrity": "sha512-ar+Ju7LmcN0Jo4FpL4hpFybwNG9/3A/Br5KW2n2jyODg3MEZXaDYADdemoNS+BDNfMgKvylJLj4S5tyRActuAg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.33.0.tgz",
      "integrity": "sha512-RYiYbkokw0trfKqqzfF55lginwEPrD3OJDfTuJzFs1MK6iFnDenaz1fqLLtX4ITG3OktJQXOeTaw1awrBAlZPw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.33.0.tgz",
      "integrity": "sha512-1K+MPfLSFVpphzpdbfkhlWk6wBrTObBzS2T6db10PNOZgR9GoVsAWzwNyuhUYYbTp23j+4RrncfujZ4uAzXvwA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.33.0.tgz",
      "integrity": "sha512-OlEICDx/Xl0FqSp4bry8zFnCvGpig3Gl4gCquvYwHuqJKEC1+n9NgDniFvqHGmMv1ZkqDJrDqKKSykTDX+ehuA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.475.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.475.0.tgz",
      "integrity": "sha512-NJzvVu1HwFVeZ+Gwq2q00KygM1aBhy/ZrhY9FsAgJtpB+E4R7uxRk9M2iKvHa6/vNxZydIB59htha4c2vvwvVg==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/luxon": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/luxon/-/luxon-3.6.0.tgz",
      "integrity": "sha512-WE7p0p7W1xji9qxkLYsvcIxZyfP48GuFrWIBQZIsbjCyf65dG1rv4n83HcOyEyhvzxJCrUoObCRNFgRNIQ5KNA==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/micromatch/node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/minimatch": {
      "version": "10.2.6",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.6.tgz",
      "integrity": "sha512-vpLQEs+VLCr1nU0BXS07maYoFwlDAH0gngQuuttxIwutDFEMHq2blX+8vpgxDdK3J1PwjCJiep77OitTZ4Ll1A==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.8"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.19",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.19.tgz",
      "integrity": "sha512-Y2tUNy4ouw6tq5oDSKeQYGOyhkUBhNOcGV/02KC+6kd9eDGqdZd++mjMiIDilrBYvjEnCYvVtsuHCuP+okSfug==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nepali-date-converter": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/nepali-date-converter/-/nepali-date-converter-3.4.0.tgz",
      "integrity": "sha512-hBojNXCQN69I533CnxNubl72uNx2Zcow9t2bOML3CxXv227s7NKA2kStUGO5xysg0SwsubTTxAO6tcg9IhS61w==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/next-themes": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/next-themes/-/next-themes-0.4.4.tgz",
      "integrity": "sha512-LDQ2qIOJF0VnuVrrMSMLrWGjRMkq+0mpgl6e0juCLqdJ+oo8Q84JRWT6Wh11VDQKkMMe+dVzDKLWs5n87T+PkQ==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.56",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.56.tgz",
      "integrity": "sha512-x0InOIyzgdk+eyaWaRJFH5snEtiImgBgblZ2CyPrLmqqcuMQkEvcDPHbzqbD8eDsSeJbVOjn+crzyzHaM4D+/A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/normalize-range": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
      "integrity": "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.4.49",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.49.tgz",
      "integrity": "sha512-OCVPnIObs4N29kxTjzLfUryOkvZEq+pf8jTF0lg8E7uETuWHA+v7j3c/xJmiqpX450191LlmZfUKkXxkTry7nA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.7",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-4.0.2.tgz",
      "integrity": "sha512-bSVhyJGL00wMVoPUzAVAnbEoWyqRxkjv64tUl427SKnPrENtq6hJwUojroMz2VB+Q1edmi4IfrAPpami5VVgMQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.0.0",
        "yaml": "^2.3.4"
      },
      "engines": {
        "node": ">= 14"
      },
      "peerDependencies": {
        "postcss": ">=8.0.9",
        "ts-node": ">=9.0.0"
      },
      "peerDependenciesMeta": {
        "postcss": {
          "optional": true
        },
        "ts-node": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.4",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.4.tgz",
      "integrity": "sha512-bIoJLOmjCO1S9XdY/DcnR5hJxvrDir1PbGChrzXG3vw0/FOliy/fA3dmdhQ441kah4gKv+TwckGzex6wNS5cnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/qified": {
      "version": "0.10.1",
      "resolved": "https://registry.npmjs.org/qified/-/qified-0.10.1.tgz",
      "integrity": "sha512-+Owyggi9IxT1ePKGafcI87ubSmxol6smwJ+RAHDQlx9+9cPwFWDiKFFCPuWhr9ignlGpZ9vDQLw67N4dcTVFEA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hookified": "^2.1.1"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/qified/node_modules/hookified": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/hookified/-/hookified-2.2.0.tgz",
      "integrity": "sha512-p/LgFzRN5FeoD3DLS6bkUapeye6E4SI6yJs6KetENd18S+FBthqYq2amJUWpt5z0EQwwHemidjY5OqJGEKm5uA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/react/-/react-19.3.0.tgz",
      "integrity": "sha512-E8LUcbtBWt20bbl2YoHfx4ZDBdxVTfOKtCZn9cDSJ4l6/nuoApcpIBcj47t2wZoVX8g2ZHuMHbiShgCR1T5Sog==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.3.0.tgz",
      "integrity": "sha512-JDk8dgif51OjFoDE70+OT9ICyYr+69HlmihNwp1+Nsfbna3t5sIiCa9ZJktDmQ4/1b/rn26hIAR2uYXDMr5r0Q==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.28.0"
      },
      "peerDependencies": {
        "react": "^19.3.0"
      }
    },
    "node_modules/react-hook-form": {
      "version": "7.54.2",
      "resolved": "https://registry.npmjs.org/react-hook-form/-/react-hook-form-7.54.2.tgz",
      "integrity": "sha512-eHpAUgUjWbZocoQYUHposymRb4ZP6d0uwUnooL2uOybA9/3tPUvoAKqEWK1WaSiTxxOfTpffNZP7QwlnM3/gEg==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/react-hook-form"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17 || ^18 || ^19"
      }
    },
    "node_modules/react-i18next": {
      "version": "15.4.0",
      "resolved": "https://registry.npmjs.org/react-i18next/-/react-i18next-15.4.0.tgz",
      "integrity": "sha512-Py6UkX3zV08RTvL6ZANRoBh9sL/ne6rQq79XlkHEdd82cZr2H9usbWpUNVadJntIZP2pu3M2rL1CN+5rQYfYFw==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.25.0",
        "html-parse-stringify": "^3.0.1"
      },
      "peerDependencies": {
        "i18next": ">= 23.2.3",
        "react": ">= 16.8.0"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        },
        "react-native": {
          "optional": true
        }
      }
    },
    "node_modules/react-remove-scroll": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/react-remove-scroll/-/react-remove-scroll-2.7.2.tgz",
      "integrity": "sha512-Iqb9NjCCTt6Hf+vOdNIZGdTiH1QSqr27H/Ek9sv/a97gfueI/5h1s3yRi1nngzMUaOOToin5dI1dXKdXiF+u0Q==",
      "license": "MIT",
      "dependencies": {
        "react-remove-scroll-bar": "^2.3.7",
        "react-style-singleton": "^2.2.3",
        "tslib": "^2.1.0",
        "use-callback-ref": "^1.3.3",
        "use-sidecar": "^1.1.3"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-remove-scroll-bar": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/react-remove-scroll-bar/-/react-remove-scroll-bar-2.3.8.tgz",
      "integrity": "sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q==",
      "license": "MIT",
      "dependencies": {
        "react-style-singleton": "^2.2.2",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-style-singleton": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/react-style-singleton/-/react-style-singleton-2.2.3.tgz",
      "integrity": "sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ==",
      "license": "MIT",
      "dependencies": {
        "get-nonce": "^1.0.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.2.tgz",
      "integrity": "sha512-/peqiBB/n07gQGLsWaHho3WfvUyRscw0gYTsEFMhrIe/nWLkYaf5SbKYjGYqtRV3aPwykJgF2VEMo1ac4bnsGA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/readdirp/node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rolldown": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.2.9.tgz",
      "integrity": "sha512-hx/Pv0N1haXRb11qkfnK5MXB/iqr7i0yjWQqmO9uHqZpBgQSqzc8UsSnEpalsh+j1I8qQ2CkXAkJC8Br3dKSlg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@oxc-project/types": "=0.150.0",
        "@rolldown/pluginutils": "^1.0.0"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm-eabi": "1.2.9",
        "@rolldown/binding-android-arm64": "1.2.9",
        "@rolldown/binding-darwin-arm64": "1.2.9",
        "@rolldown/binding-darwin-x64": "1.2.9",
        "@rolldown/binding-freebsd-x64": "1.2.9",
        "@rolldown/binding-linux-arm-gnueabihf": "1.2.9",
        "@rolldown/binding-linux-arm64-gnu": "1.2.9",
        "@rolldown/binding-linux-arm64-musl": "1.2.9",
        "@rolldown/binding-linux-ppc64-gnu": "1.2.9",
        "@rolldown/binding-linux-s390x-gnu": "1.2.9",
        "@rolldown/binding-linux-x64-gnu": "1.2.9",
        "@rolldown/binding-linux-x64-musl": "1.2.9",
        "@rolldown/binding-openharmony-arm64": "1.2.9",
        "@rolldown/binding-win32-arm64-msvc": "1.2.9",
        "@rolldown/binding-win32-x64-msvc": "1.2.9"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.28.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.28.0.tgz",
      "integrity": "sha512-juorfCmIkIw8tT+p5BXSm6PJjQF/ycEYmKyzURCIt/RaZIhL+PulbQ9Yu2z1HdOJDdqDTlxA1+xKBmHXJsczAw==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/sonner": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/sonner/-/sonner-2.0.1.tgz",
      "integrity": "sha512-FRBphaehZ5tLdLcQ8g2WOIRE+Y7BCfWi5Zyd8bCvBjiW8TxxAyoWZIxS661Yz6TGPqFQ4VLzOF89WEYhfynSFQ==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0 || ^19.0.0-rc",
        "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.1",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz",
      "integrity": "sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "tinyglobby": "^0.2.11",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "2.6.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-2.6.0.tgz",
      "integrity": "sha512-P+Vu1qXfzediirmHOC3xKGAYeZtPcV9g76X+xg2FD4tYgR71ewMA35Y3sCz3zhiN/dwefRpJX0yBcgwi1fXNQA==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.17",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.17.tgz",
      "integrity": "sha512-w33E2aCvSDP0tW9RZuNXadXlkHXqFzSkQew/aIa2i/Sj8fThxwovwlXHSPXTbAHwEIhBFXAedUhP2tueAKP8Og==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.6",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/tailwindcss-animate": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/tailwindcss-animate/-/tailwindcss-animate-1.0.7.tgz",
      "integrity": "sha512-bl6mpH3T7I3UFxuvDEXLxy/VuFxBk5bbzplh7tXI68mwMokNYd1t9qPBHlnyTwfa4JGC4zP516I1hYYtQ/vspA==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "tailwindcss": ">=3.0.0 || insiders"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-api-utils": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.5.0.tgz",
      "integrity": "sha512-OJ/ibxhPlqrMM0UiNHJ/0CKQkoKF243/AEmplt3qpRgkW8VG7IfOS41h7V8TjITqdByHzrjcS/2si+y4lIh8NA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.12"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/typescript": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-6.0.3.tgz",
      "integrity": "sha512-y2TvuxSZPDyQakkFRPZHKFm+KKVqIisdg9/CZwm9ftvKXLP8NRWj38/ODjNbr43SsoXqNuAisEf1GdCxqWcdBw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/typescript-eslint": {
      "version": "8.70.1",
      "resolved": "https://registry.npmjs.org/typescript-eslint/-/typescript-eslint-8.70.1.tgz",
      "integrity": "sha512-AcWG7KDjZ2THNXsgwttMaGmzVi0VFRlFYfqFHYQRbDpF3owuYbuiL8c7UUrd2k8s3PoSfIQrWfrGXfcElrWLYA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/eslint-plugin": "8.70.1",
        "@typescript-eslint/parser": "8.70.1",
        "@typescript-eslint/typescript-estree": "8.70.1",
        "@typescript-eslint/utils": "8.70.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/tz-lookup": {
      "version": "6.1.25",
      "resolved": "https://registry.npmjs.org/tz-lookup/-/tz-lookup-6.1.25.tgz",
      "integrity": "sha512-fFewT9o1uDzsW1QnUU1ValqaihFnwiUiiHr1S79/fxOzKXYYvX+EHeRnpvQJ9B3Qg67wPXT6QF2Esc4pFOrvLg==",
      "license": "CC0-1.0"
    },
    "node_modules/undici-types": {
      "version": "7.18.2",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.18.2.tgz",
      "integrity": "sha512-AsuCzffGHJybSaRrmr5eHr81mwJU3kjw6M+uprWvCXiNeN9SOGwQ3Jn8jb8m3Z6izVgknn1R0FTCEAP2QrLY/w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.3.tgz",
      "integrity": "sha512-pJ2sYawQS0R/WI928Gj5GlPhTGzbMelq0+4INtSYNDV9ErKJcX6xjGWkoG/VnB3dpUm00zALaqkrUD77pO5TDQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/use-callback-ref": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/use-callback-ref/-/use-callback-ref-1.3.3.tgz",
      "integrity": "sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-sidecar": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/use-sidecar/-/use-sidecar-1.1.3.tgz",
      "integrity": "sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ==",
      "license": "MIT",
      "dependencies": {
        "detect-node-es": "^1.1.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.7.0.tgz",
      "integrity": "sha512-6L+EeigHMQhdaIPNIFUKwfWJSwWFQ8gJbJ2DLOs5sDIegTwR9fRxvnM3uciHKjIZhFz+KAv2emhWMRvDmMcY8A==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/vite/-/vite-8.3.0.tgz",
      "integrity": "sha512-lhZBVvEHefgE+HQZC9O7EBJgCU/nVzFNl7vkS4RE0APtWLP02/8QVIkQtzBxPquh7lq5/78NHipTj7ODQ6XuyQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "lightningcss": "^1.33.0",
        "picomatch": "^4.0.7",
        "postcss": "^8.5.28",
        "rolldown": "~1.2.6",
        "tinyglobby": "^0.2.17"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.7.1",
        "esbuild": "^0.27.0 || ^0.28.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vite/node_modules/postcss": {
      "version": "8.5.28",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.28.tgz",
      "integrity": "sha512-RRuzqDtt5Y9h3quz5hWhK+TPnsmVs6WwSU6LkJMeY4HstUEDuYTG8UJSdawMRzmzAtV+KEoG8N3Qg2qLy5vM/A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.18",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/void-elements": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/void-elements/-/void-elements-3.1.0.tgz",
      "integrity": "sha512-Dhxzh5HZuiHQhbvTW9AMetFfBHDMYpo23Uo9btPXgdYP+3T5S+p+jgNy7spra+veYhBP2dCSgxR/i2Y02h5/6w==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yaml": {
      "version": "2.9.1",
      "resolved": "https://registry.npmjs.org/yaml/-/yaml-2.9.1.tgz",
      "integrity": "sha512-3NxN8+78OdzbT7C/WjGsyfPAtJaN3FNDsWxv7Y7mcDsT/oOmgW8BpyQQFFBnvZE3j9Y2Sdz1ULFLezL7Eb2yFw==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "yaml": "bin.mjs"
      },
      "engines": {
        "node": ">= 14.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/eemeli"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "3.24.2",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.24.2.tgz",
      "integrity": "sha512-lY7CDW43ECgW9u1TcT3IoXHflywfVqDYze4waEz812jR/bZ8FHDsl7pFQoSZTz5N+2NqRXs8GBwnAwo3ZNxqhQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zod-validation-error": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/zod-validation-error/-/zod-validation-error-4.0.2.tgz",
      "integrity": "sha512-Q6/nZLe6jxuU80qb/4uJ4t5v2VEZ44lzQjPDhYJNztRQ4wyWc6VF3D3Kb/fAuPetZQnhS3hnajCf9CsWesghLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "peerDependencies": {
        "zod": "^3.25.0 || ^4.0.0"
      }
    },
    "node_modules/zustand": {
      "version": "5.0.3",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.3.tgz",
      "integrity": "sha512-14fwWQtU3pH4dE0dOpdMiWjddcH+QzKIgk1cl8epwSE7yag43k/AD/m4L6+K7DytAOr9gGBe3/EXj9g7cdostg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
    }
  }
}
``````

### `tsconfig.json`

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
``````

### `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
``````

### `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
``````

### `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
});
``````

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        display: ['Crimson Pro', 'Noto Sans Devanagari', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
``````

### `postcss.config.js`

```javascript
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
``````

### `eslint.config.js`

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
``````

### `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
``````

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KundaliYatra</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Crimson+Pro:wght@500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Symbols+2&family=Tiro+Devanagari+Sanskrit:ital@0;1&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
``````

### `.gitignore`

```text
# Dependencies
node_modules/
.pnp
.pnp.js

# Build output
dist/
dist-ssr/
build/
*.local

# Editor / OS
.vscode/*
!.vscode/extensions.json
.idea/
.DS_Store
Thumbs.db
*.swp
*.swo
*~

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Vite cache
.vite/
node_modules/.vite/

# Environment
.env
.env.local
.env.*.local

# Test / coverage
coverage/
.nyc_output/

# Backups from our scaffolding mishaps
*.bak
*.bak-*
*.orig
*.rej

# TypeScript build info
*.tsbuildinfo
``````

### `.gitattributes`

```text
* text=auto eol=lf

*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.svg text
*.ico binary

*.ps1 text eol=crlf
``````

### `README.md`

```text
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
``````

### `AI-CONTEXT.md`

```text
# KundaliYatra â€” Complete Project Context

> **Purpose:** This document contains everything an AI assistant needs to understand the KundaliYatra codebase and write correct code for it.
> 
> **Usage:** Paste this entire document into any AI (ChatGPT, Claude, Cursor, Gemini) and then tell it what you want to build. It will understand the architecture, data flow, conventions, and existing components.

**Generated:** 2026-09-21 21:19:19
**Total files:** 95

---

## 1. Architecture Overview

KundaliYatra follows a **three-layer clean architecture**:

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  FEATURES           (React, hooks, UI)                      â”‚
â”‚  src/features/**                                            â”‚
â”‚  Depends on: domain, infrastructure, components             â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                       â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  INFRASTRUCTURE     (adapters, external APIs)               â”‚
â”‚  src/infrastructure/**                                      â”‚
â”‚  Depends on: domain only                                    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                       â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  DOMAIN             (pure types, no deps)                   â”‚
â”‚  src/domain/**                                              â”‚
â”‚  Zero runtime deps. Pure TypeScript.                        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Layer rules:**
- Domain has no external dependencies.
- Infrastructure depends only on domain.
- Features depend on both.
- External libraries (like @prisri/jyotish) are wrapped in adapters under infrastructure/.

## 2. Core Data Flow

The app has one primary user journey: **enter birth data â†’ compute chart â†’ render report**.

```
1. User submits BirthProfileForm
       â†“
2. addProfile() stores BirthData in Zustand (persisted to localStorage)
       â†“
3. OverviewView subscribes â†’ sees activeProfile â†’ renders <ReportOverview>
       â†“
4. ReportOverview calls prisriJyotish.calculate(profile) once (useMemo)
       â†“
5. Adapter:
     - Converts localDate + localTime + timezone â†’ Date via Luxon
     - Builds Observer(lat, lon, elevation)
     - Calls getKundli(date, observer, config) from @prisri/jyotish
       â†“
6. Returns a Kundli object (planets, houses, dasha, vargas, ...)
       â†“
7. ReportOverview passes kundli to each section as a prop
       â†“
8. Each section reads what it needs from kundli
```

**Critical rules:**
- **Never** call 
ew Date(birthString) â€” always use Luxon with the birth place's IANA timezone.
- **Always** wrap calculate() in useMemo â€” the computation is expensive.
- Store holds **wall-clock strings** + timezone, never a Date object.

## 3. Complete File Tree

All source files, grouped by layer:

### App Entry

- `src\App.tsx` (1.8 KB)
- `src\main.tsx` (0.5 KB)

### Domain Layer

- `src\domain\astrology\birth-data.ts` (0.2 KB)
- `src\domain\astrology\port.ts` (0.2 KB)
- `src\domain\geo\place.ts` (0.9 KB)
- `src\domain\geo\port.ts` (0.2 KB)

### Infrastructure Layer

- `src\infrastructure\astrology\prisri-jyotish.adapter.ts` (1.7 KB)
- `src\infrastructure\calendar\nepali-date.ts` (2.9 KB)
- `src\infrastructure\geo\photon.geocoder.ts` (1.8 KB)
- `src\infrastructure\geo\tz.resolver.ts` (0.4 KB)

### Features Layer

- `src\features\birth-profile\components\BirthDateField.tsx` (3.2 KB)
- `src\features\birth-profile\components\BirthProfileForm.tsx` (5.2 KB)
- `src\features\birth-profile\components\PlaceCombobox.tsx` (3.6 KB)
- `src\features\birth-profile\components\PlacePreview.tsx` (2.6 KB)
- `src\features\birth-profile\hooks\usePlaceSearch.ts` (1.7 KB)
- `src\features\birth-profile\schema.ts` (1.7 KB)
- `src\features\birth-profile\store.ts` (1.7 KB)
- `src\features\chart\ChartPreview.tsx` (0.7 KB)
- `src\features\chart\components\BaseChart.tsx` (11.6 KB)
- `src\features\chart\components\ChartStyleToggle.tsx` (1.1 KB)
- `src\features\chart\components\VedicChart.tsx` (1.8 KB)
- `src\features\chart\lib\adapters.ts` (7.4 KB)
- `src\features\chart\lib\geometry.ts` (4.6 KB)
- `src\features\chart\lib\glyphs.ts` (2.4 KB)
- `src\features\chart\lib\useChartStyle.ts` (0.5 KB)
- `src\features\chart\theme.ts` (4.6 KB)
- `src\features\chart\types.ts` (0.8 KB)
- `src\features\overview\OverviewView.tsx` (1.7 KB)
- `src\features\report\components\ChartCard.tsx` (3.4 KB)
- `src\features\report\components\Hero.tsx` (11 KB)
- `src\features\report\components\ReportOverview.tsx` (7.4 KB)
- `src\features\report\components\SnapshotStrip.tsx` (1.9 KB)
- `src\features\report\components\SnapshotTile.tsx` (1.3 KB)
- `src\features\report\lib\aspect-info.ts` (2.1 KB)
- `src\features\report\lib\devanagari.ts` (2.1 KB)
- `src\features\report\lib\glyphs.ts` (1.3 KB)
- `src\features\report\lib\interpretations.ts` (7.1 KB)
- `src\features\report\lib\varga-info.ts` (9.6 KB)
- `src\features\report\primitives\AttributeBadge.tsx` (0.8 KB)
- `src\features\report\primitives\GlyphBadge.tsx` (1.5 KB)
- `src\features\report\primitives\index.ts` (0.3 KB)
- `src\features\report\primitives\InfoRow.tsx` (0.5 KB)
- `src\features\report\primitives\InfoTile.tsx` (1.3 KB)
- `src\features\report\primitives\OrnamentalDivider.tsx` (0.8 KB)
- `src\features\report\primitives\ReportPage.tsx` (0.4 KB)
- `src\features\report\primitives\Section.tsx` (1.3 KB)
- `src\features\report\sections\AdvancedSection.tsx` (4.5 KB)
- `src\features\report\sections\AspectsSection.tsx` (18.3 KB)
- `src\features\report\sections\BhavaSection.tsx` (3.6 KB)
- `src\features\report\sections\CoreIdentitySection.tsx` (5.2 KB)
- `src\features\report\sections\DashaSection.tsx` (5.7 KB)
- `src\features\report\sections\DivisionalChartsSection.tsx` (5.7 KB)
- `src\features\report\sections\GrahaSection.tsx` (5.5 KB)
- `src\features\report\sections\HouseMapSection.tsx` (4.4 KB)
- `src\features\report\sections\PanchangSection.tsx` (2 KB)
- `src\features\report\sections\PlanetaryMapSection.tsx` (6.3 KB)
- `src\features\report\sections\SpecialPointsSection.tsx` (3.6 KB)
- `src\features\report\sections\StrengthSection.tsx` (2.8 KB)
- `src\features\report\sections\ThreeAnchorsSection.tsx` (5.4 KB)
- `src\features\report\sections\UnfoldingSection.tsx` (6.2 KB)
- `src\features\report\sections\VitalSignsSection.tsx` (16.5 KB)
- `src\features\report\tokens.ts` (1.5 KB)

### Shared Components

- `src\components\bs-date-picker.tsx` (3.2 KB)
- `src\components\change-birth-details-button.tsx` (0.8 KB)
- `src\components\icons.ts` (0.4 KB)
- `src\components\language-switcher.tsx` (1.3 KB)
- `src\components\palette-provider.tsx` (1.1 KB)
- `src\components\palette-switcher.tsx` (1.5 KB)
- `src\components\print-button.tsx` (0.9 KB)
- `src\components\theme-provider.tsx` (0.4 KB)
- `src\components\theme-toggle.tsx` (1.2 KB)

### UI Primitives (shadcn)

- `src\components\ui\button.tsx` (1.7 KB)
- `src\components\ui\card.tsx` (1.8 KB)
- `src\components\ui\command.tsx` (4.5 KB)
- `src\components\ui\dialog.tsx` (3.2 KB)
- `src\components\ui\dropdown-menu.tsx` (6.4 KB)
- `src\components\ui\input.tsx` (0.7 KB)
- `src\components\ui\label.tsx` (0.7 KB)
- `src\components\ui\popover.tsx` (1 KB)
- `src\components\ui\select.tsx` (5.1 KB)
- `src\components\ui\sonner.tsx` (0.8 KB)

### Library/Utils

- `src\lib\utils.ts` (0.2 KB)

### i18n

- `src\i18n\index.ts` (1.1 KB)
- `src\i18n\locales\en.json` (7.7 KB)
- `src\i18n\locales\hi.json` (5.7 KB)
- `src\i18n\locales\ne.json` (5.9 KB)

### Styles

- `src\styles\globals.css` (7.2 KB)
- `src\styles\print.css` (9.7 KB)

### Other

- `index.html` (0.8 KB)
- `package.json` (1.7 KB)
- `postcss.config.js` (0.1 KB)
- `tailwind.config.js` (1.5 KB)
- `tsconfig.app.json` (0.6 KB)
- `tsconfig.json` (0.1 KB)
- `vite.config.ts` (0.2 KB)

---

## 4. Complete File Contents

Every source file, grouped by layer. Use these to understand existing patterns before writing new code.

### App Entry

#### `src\App.tsx`

```tsx
import { OverviewView } from '@/features/overview/OverviewView';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { PaletteSwitcher } from '@/components/palette-switcher';
import { PrintButton } from '@/components/print-button';
import { ChangeBirthDetailsButton } from '@/components/change-birth-details-button';
import { Toaster } from '@/components/ui/sonner';
import { IconSparkle } from '@/components/icons';
import { useTranslation } from 'react-i18next';
import { useActiveProfile } from '@/features/birth-profile/store';

export default function App() {
  const { t } = useTranslation();
  const profile = useActiveProfile();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2 font-display font-semibold text-lg">
            <IconSparkle size={20} className="text-primary" />
            {t('app.name')}
          </div>
          <div className="flex items-center gap-1">
            {/* Contextual actions â€” only when a chart is loaded */}
            {profile && (
              <>
                <ChangeBirthDetailsButton />
                <PrintButton />
                <div className="w-px h-5 bg-border mx-1" />
              </>
            )}
            <LanguageSwitcher />
            <PaletteSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <OverviewView />
      </main>

      <Toaster richColors position="top-center" />
    </div>
  );
}
``````

#### `src\main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { PaletteProvider } from '@/components/palette-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <PaletteProvider>
        <App />
      </PaletteProvider>
    </ThemeProvider>
  </React.StrictMode>
);
``````

### Domain Layer

#### `src\domain\astrology\birth-data.ts`

```typescript
import type { Place } from '../geo/place';

export interface BirthData {
  id: string;
  profileName: string;
  localDate: string;
  localTime: string;
  place: Place;
  createdAt: string;
}
``````

#### `src\domain\astrology\port.ts`

```typescript
import type { Kundli, KundliConfig } from '@prisri/jyotish';
import type { BirthData } from './birth-data';

export interface JyotishPort {
  calculate(data: BirthData, config?: KundliConfig): Kundli;
}
``````

#### `src\domain\geo\place.ts`

```typescript
export interface Place {
  id: string;
  label: string;
  shortLabel: string;
  lat: number;
  lon: number;
  timezone: string;
  countryCode?: string;
  admin1?: string;
  placeType: 'city' | 'town' | 'village' | 'unknown';
}

export function isValidLatitude(lat: number): boolean {
  return Number.isFinite(lat) && lat >= -90 && lat <= 90;
}

export function isValidLongitude(lon: number): boolean {
  return Number.isFinite(lon) && lon >= -180 && lon <= 180;
}

export function isValidTimezone(tz: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export function isPlaceValid(place: unknown): place is Place {
  if (!place || typeof place !== 'object') return false;
  const p = place as Place;
  return (
    isValidLatitude(p.lat) &&
    isValidLongitude(p.lon) &&
    isValidTimezone(p.timezone) &&
    typeof p.label === 'string' &&
    p.label.trim().length > 0
  );
}
``````

#### `src\domain\geo\port.ts`

```typescript
import type { Place } from './place';

export type PlaceSearchResult = Omit<Place, 'timezone'>;

export interface GeocoderPort {
  search(query: string, signal: AbortSignal): Promise<PlaceSearchResult[]>;
}
``````

### Infrastructure Layer

#### `src\infrastructure\astrology\prisri-jyotish.adapter.ts`

```typescript
import { DateTime } from 'luxon';
import { getKundli, Observer } from '@prisri/jyotish';
import type { Kundli, KundliConfig } from '@prisri/jyotish';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { JyotishPort } from '@/domain/astrology/port';

const DEFAULT_CONFIG: KundliConfig = {
  ayanamsa: 'lahiri',
  houseSystem: 'whole_sign',
  includeChalit: true,
  includeKp: true,
  includeSpecialLagnas: true,
  includeArudhas: true,
  includeReferenceCharts: true,
};

export class BirthDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BirthDataError';
  }
}

export const prisriJyotish: JyotishPort = {
  calculate(data, config = DEFAULT_CONFIG): Kundli {
    // Build the exact instant the library expects.
    // Example: localDate="1995-05-15", localTime="14:30", tz="Asia/Kolkata"
    //   â†’ dt.toJSDate() = new Date('1995-05-15T14:30:00+05:30')
    const dt = DateTime.fromISO(`${data.localDate}T${data.localTime}`, {
      zone: data.place.timezone,
    });

    if (!dt.isValid) {
      throw new BirthDataError(`Invalid birth datetime: ${dt.invalidReason ?? 'unknown'}`);
    }

    const observer = new Observer(data.place.lat, data.place.lon, 0);
    return getKundli(dt.toJSDate(), observer, config);
  },
};

export function previewBirthInstant(data: BirthData): {
  iso: string;
  utc: string;
  offset: string;
} {
  const dt = DateTime.fromISO(`${data.localDate}T${data.localTime}`, {
    zone: data.place.timezone,
  });
  if (!dt.isValid) throw new BirthDataError(`Invalid: ${dt.invalidReason}`);
  return {
    iso: dt.toISO() ?? '',
    utc: dt.toUTC().toISO() ?? '',
    offset: dt.toFormat('ZZ'),
  };
}
``````

#### `src\infrastructure\calendar\nepali-date.ts`

```typescript
import NepaliDate from 'nepali-date-converter';

export const NEPALI_MONTHS = [
  'à¤¬à¥ˆà¤¶à¤¾à¤–', 'à¤œà¥‡à¤ ', 'à¤…à¤¸à¤¾à¤°', 'à¤¸à¤¾à¤‰à¤¨', 'à¤­à¤¦à¥Œ', 'à¤…à¤¸à¥‹à¤œ',
  'à¤•à¤¾à¤¤à¥à¤¤à¤¿à¤•', 'à¤®à¤‚à¤¸à¤¿à¤°', 'à¤ªà¥à¤·', 'à¤®à¤¾à¤˜', 'à¤«à¤¾à¤²à¥à¤—à¥à¤¨', 'à¤šà¥ˆà¤¤',
] as const;

export const NEPALI_MONTHS_EN = [
  'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra',
] as const;

const DEVANAGARI_DIGITS = ['à¥¦', 'à¥§', 'à¥¨', 'à¥©', 'à¥ª', 'à¥«', 'à¥¬', 'à¥­', 'à¥®', 'à¥¯'];

export function toDevanagari(num: number | string): string {
  return String(num).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

export function toArabicNumerals(str: string): string {
  return str.replace(/[à¥¦-à¥¯]/g, (d) => String(DEVANAGARI_DIGITS.indexOf(d)));
}

export const BS_MIN_YEAR = 1975;
export const BS_MAX_YEAR = 2090;

export interface BSDate {
  year: number;
  month: number; // 0-indexed (0 = Baishakh)
  day: number;
}

export function toGregorianISO(bs: BSDate): string | null {
  try {
    const d = new NepaliDate(bs.year, bs.month, bs.day);
    const js = d.toJsDate();
    // Use local getters, not toISOString(), to avoid UTC shifts
    const yyyy = js.getFullYear();
    const mm = String(js.getMonth() + 1).padStart(2, '0');
    const dd = String(js.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return null;
  }
}

export function fromGregorianISO(iso: string): BSDate | null {
  try {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return null;
    // Construct in local time to avoid UTC offsets
    const localDate = new Date(y, m - 1, d);
    const nep = new NepaliDate(localDate);
    return {
      year: nep.getYear(),
      month: nep.getMonth(),
      day: nep.getDate(),
    };
  } catch {
    return null;
  }
}

export function daysInBsMonth(year: number, month: number): number {
  try {
    // Try days 32 down to 29 until valid
    for (let d = 32; d >= 29; d--) {
      try {
        new NepaliDate(year, month, d);
        return d;
      } catch {
        // keep trying
      }
    }
    return 30;
  } catch {
    return 30;
  }
}

export function formatBS(bs: BSDate, options: { devanagari?: boolean; monthNames?: readonly string[] } = {}): string {
  const { devanagari = true, monthNames = NEPALI_MONTHS } = options;
  const yStr = devanagari ? toDevanagari(bs.year) : String(bs.year);
  const dStr = devanagari ? toDevanagari(bs.day) : String(bs.day);
  return `${yStr} ${monthNames[bs.month]} ${dStr}`;
}

export function formatADFromISO(iso: string): string {
  try {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    const localDate = new Date(y, m - 1, d);
    return localDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}
``````

#### `src\infrastructure\geo\photon.geocoder.ts`

```typescript
import type { GeocoderPort, PlaceSearchResult } from '@/domain/geo/port';

interface PhotonFeature {
  properties: {
    osm_id: number;
    osm_type?: string;
    name?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    countrycode?: string;
    type?: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

const ALLOWED = new Set(['city', 'town', 'village', 'municipality', 'district']);

function buildLabel(p: PhotonFeature['properties']): string {
  return [p.name ?? p.city, p.state, p.country].filter(Boolean).join(', ');
}

function buildShortLabel(p: PhotonFeature['properties']): string {
  const primary = p.name ?? p.city ?? p.district ?? 'Unknown';
  return p.state ? `${primary}, ${p.state}` : primary;
}

export const photonGeocoder: GeocoderPort = {
  async search(query, signal) {
    const url =
      'https://photon.komoot.io/api/?' +
      new URLSearchParams({ q: query, limit: '8', lang: 'en' }).toString();

    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Geocoder failed: ${res.status}`);

    const data: { features: PhotonFeature[] } = await res.json();

    return data.features
      .filter((f) => ALLOWED.has(f.properties.type ?? ''))
      .map<PlaceSearchResult>((f) => ({
        id: `osm:${(f.properties.osm_type ?? 'N')[0]}${f.properties.osm_id}`,
        label: buildLabel(f.properties),
        shortLabel: buildShortLabel(f.properties),
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
        countryCode: f.properties.countrycode,
        admin1: f.properties.state,
        placeType:
          f.properties.type === 'city' ||
          f.properties.type === 'town' ||
          f.properties.type === 'village'
            ? (f.properties.type as 'city' | 'town' | 'village')
            : 'unknown',
      }));
  },
};
``````

#### `src\infrastructure\geo\tz.resolver.ts`

```typescript
import tzlookup from 'tz-lookup';
import { isValidTimezone } from '@/domain/geo/place';

export interface TzResolution {
  timezone: string;
  fallbackUsed: boolean;
}

export function resolveTimezone(lat: number, lon: number): TzResolution {
  try {
    const tz = tzlookup(lat, lon);
    if (isValidTimezone(tz)) return { timezone: tz, fallbackUsed: false };
  } catch {
    // fall through
  }
  return { timezone: 'UTC', fallbackUsed: true };
}
``````

### Features Layer

#### `src\features\birth-profile\components\BirthDateField.tsx`

```tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BSDatePicker } from '@/components/bs-date-picker';
import {
  fromGregorianISO,
  toGregorianISO,
  formatADFromISO,
  type BSDate,
} from '@/infrastructure/calendar/nepali-date';

type CalendarMode = 'bs' | 'ad';

interface Props {
  value: string; // Gregorian ISO "YYYY-MM-DD"
  onChange: (iso: string) => void;
  minYear?: number;
  maxYear?: number;
}

export function BirthDateField({ value, onChange, minYear, maxYear }: Props) {
  const { t, i18n } = useTranslation();

  // Default to B.S. if UI language is Nepali, else A.D.
  const initialMode: CalendarMode =
    (i18n.resolvedLanguage ?? 'en') === 'ne' ? 'bs' : 'ad';
  const [mode, setMode] = useState<CalendarMode>(initialMode);

  // Derive B.S. from current Gregorian value
  const [bsValue, setBsValue] = useState<BSDate | null>(() =>
    value ? fromGregorianISO(value) : null
  );

  // Keep B.S. state in sync when user switches to B.S. mode
  useEffect(() => {
    if (mode === 'bs' && value) {
      const converted = fromGregorianISO(value);
      if (converted) setBsValue(converted);
    }
  }, [mode, value]);

  const handleBsChange = (iso: string) => {
    const converted = fromGregorianISO(iso);
    setBsValue(converted);
    onChange(iso);
  };

  const handleAdChange = (iso: string) => {
    onChange(iso);
  };

  return (
    <div className="space-y-2">
      {/* Toggle */}
      <div className="flex items-center gap-1 p-0.5 rounded-md border bg-muted/40 w-fit">
        <Button
          type="button"
          variant={mode === 'bs' ? 'default' : 'ghost'}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setMode('bs')}
        >
          {t('birth.calendarBS')}
        </Button>
        <Button
          type="button"
          variant={mode === 'ad' ? 'default' : 'ghost'}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setMode('ad')}
        >
          {t('birth.calendarAD')}
        </Button>
      </div>

      {/* Picker */}
      {mode === 'bs' ? (
        <BSDatePicker
          value={bsValue}
          onChange={handleBsChange}
          nepaliScript={(i18n.resolvedLanguage ?? 'en') === 'ne'}
        />
      ) : (
        <Input
          type="date"
          value={value}
          min={minYear ? `${minYear}-01-01` : undefined}
          max={maxYear ? `${maxYear}-12-31` : undefined}
          onChange={(e) => handleAdChange(e.target.value)}
        />
      )}

      {/* Approximate A.D. display */}
      {mode === 'bs' && value && (
        <p className="text-xs text-muted-foreground">
          {t('birth.approximateAD', { ad: formatADFromISO(value) })}
        </p>
      )}
      {mode === 'ad' && value && (
        <p className="text-xs text-muted-foreground">
          {t('birth.approximateBS', {
            bs: (() => {
              const converted = fromGregorianISO(value);
              if (!converted) return 'â€”';
              return `${converted.year} ${converted.month + 1} ${converted.day}`;
            })(),
          })}
        </p>
      )}
    </div>
  );
}
``````

#### `src\features\birth-profile\components\BirthProfileForm.tsx`

```tsx
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconSparkle } from '@/components/icons';
import { birthFormSchema, type BirthFormValues } from '../schema';
import { useBirthStore } from '../store';
import { PlaceCombobox } from './PlaceCombobox';
import { BirthDateField } from './BirthDateField';
import { PlacePreview } from './PlacePreview';
import type { Place } from '@/domain/geo/place';

const TODAY = new Date().toISOString().slice(0, 10);

export function BirthProfileForm() {
  const { t } = useTranslation();
  const addProfile = useBirthStore((s) => s.addProfile);
  const [showPreview, setShowPreview] = useState(true);

  const form = useForm<BirthFormValues>({
    resolver: zodResolver(birthFormSchema),
    defaultValues: {
      profileName: '',
      localDate: '',
      localTime: '',
      place: null,
    },
    mode: 'onChange',
  });

  const place = form.watch('place');
  const localDate = form.watch('localDate');
  const localTime = form.watch('localTime');

  const onSubmit = (values: BirthFormValues) => {
    if (!values.place) return;
    addProfile({
      profileName: values.profileName,
      localDate: values.localDate,
      localTime: values.localTime,
      place: values.place,
    });
    toast.success(`Chart for ${values.profileName} is ready.`);
  };

  const translateError = (key?: string) =>
    key ? t(`birth.errors.${key}`) : undefined;

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconSparkle size={18} className="text-primary" />
          {t('birth.title')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t('birth.subtitle')}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="profileName">{t('birth.name')}</Label>
            <Input
              id="profileName"
              placeholder={t('birth.namePlaceholder')}
              {...form.register('profileName')}
            />
            {form.formState.errors.profileName && (
              <p className="text-xs text-destructive">
                {translateError(form.formState.errors.profileName.message)}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>{t('birth.date')}</Label>
              <Controller
                control={form.control}
                name="localDate"
                render={({ field }) => (
                  <BirthDateField
                    value={field.value}
                    onChange={field.onChange}
                    minYear={1900}
                    maxYear={new Date().getFullYear()}
                  />
                )}
              />
              {form.formState.errors.localDate && (
                <p className="text-xs text-destructive">
                  {translateError(form.formState.errors.localDate.message)}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="localTime">{t('birth.time')}</Label>
              <Input
                id="localTime"
                type="time"
                step="1"
                {...form.register('localTime')}
              />
              {form.formState.errors.localTime && (
                <p className="text-xs text-destructive">
                  {translateError(form.formState.errors.localTime.message)}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('birth.city')}</Label>
            {!place || !showPreview ? (
              <Controller
                control={form.control}
                name="place"
                render={({ field }) => (
                  <PlaceCombobox
                    value={field.value as Place | null}
                    onChange={(p) => {
                      field.onChange(p);
                      setShowPreview(true);
                    }}
                  />
                )}
              />
            ) : (
              <PlacePreview
                place={place}
                localDate={localDate}
                localTime={localTime}
                onChange={() => setShowPreview(false)}
              />
            )}
            {form.formState.errors.place && (
              <p className="text-xs text-destructive">
                {translateError(form.formState.errors.place.message)}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {t('birth.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
``````

#### `src\features\birth-profile\components\PlaceCombobox.tsx`

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { IconCheck, IconChevronsUpDown, IconLoader } from '@/components/icons';
import { cn } from '@/lib/utils';
import { usePlaceSearch } from '../hooks/usePlaceSearch';
import { photonGeocoder } from '@/infrastructure/geo/photon.geocoder';
import { resolveTimezone } from '@/infrastructure/geo/tz.resolver';
import type { Place } from '@/domain/geo/place';
import type { PlaceSearchResult } from '@/domain/geo/port';

interface Props {
  value: Place | null;
  onChange: (place: Place | null) => void;
}

export function PlaceCombobox({ value, onChange }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const search = usePlaceSearch(photonGeocoder, query);

  const handleSelect = (r: PlaceSearchResult) => {
    const { timezone } = resolveTimezone(r.lat, r.lon);
    onChange({ ...r, timezone });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {value ? (
            <span className="truncate">{value.shortLabel}</span>
          ) : (
            <span className="text-muted-foreground">{t('birth.cityPlaceholder')}</span>
          )}
          <IconChevronsUpDown size={16} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t('birth.cityPlaceholder')}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {search.status === 'loading' && (
              <div className="flex items-center gap-2 px-3 py-6 text-sm text-muted-foreground">
                <IconLoader size={14} className="animate-spin" />
                {t('common.searching')}
              </div>
            )}
            {search.status === 'empty' && (
              <CommandEmpty>{t('common.noResults', { query: query.trim() })}</CommandEmpty>
            )}
            {search.status === 'error' && (
              <CommandEmpty>{t('common.searchFailed')}</CommandEmpty>
            )}
            {search.status === 'success' && (
              <CommandGroup heading="Cities">
                {search.results.map((r) => (
                  <CommandItem
                    key={r.id}
                    value={r.id}
                    onSelect={() => handleSelect(r)}
                    className="gap-2"
                  >
                    <IconCheck
                      size={14}
                      className={cn(value?.id === r.id ? 'opacity-100' : 'opacity-0')}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm">{r.shortLabel}</span>
                      <span className="text-xs text-muted-foreground">{r.label}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
``````

#### `src\features\birth-profile\components\PlacePreview.tsx`

```tsx
import { DateTime } from 'luxon';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconPin, IconClock } from '@/components/icons';
import { useTranslation } from 'react-i18next';
import type { Place } from '@/domain/geo/place';

interface Props {
  place: Place;
  localDate: string;
  localTime: string;
  onChange: () => void;
}

function fmtLat(lat: number) {
  return `${Math.abs(lat).toFixed(4)}Â° ${lat >= 0 ? 'N' : 'S'}`;
}
function fmtLon(lon: number) {
  return `${Math.abs(lon).toFixed(4)}Â° ${lon >= 0 ? 'E' : 'W'}`;
}

export function PlacePreview({ place, localDate, localTime, onChange }: Props) {
  const { t } = useTranslation();

  let interpreted = 'â€”';
  let utcLine = '';
  let offset = '';

  if (localDate && localTime) {
    const dt = DateTime.fromISO(`${localDate}T${localTime}`, { zone: place.timezone });
    if (dt.isValid) {
      interpreted = dt.toFormat('dd LLL yyyy, hh:mm:ss a');
      utcLine = dt.toUTC().toFormat("dd LLL yyyy, HH:mm:ss 'UTC'");
      offset = dt.toFormat('ZZ');
    } else {
      interpreted = `âš  ${dt.invalidReason ?? 'Invalid'}`;
    }
  }

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="pt-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <IconPin size={14} />
              {place.label}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {fmtLat(place.lat)}, {fmtLon(place.lon)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <IconClock size={12} />
              {place.timezone} (UTC{offset})
            </div>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onChange}>
            {t('common.change')}
          </Button>
        </div>

        {localDate && localTime && (
          <div className="pt-3 border-t border-primary/20 space-y-0.5">
            <div className="text-xs">
              <span className="text-muted-foreground">
                {t('birth.interpretedAs')}:
              </span>{' '}
              <span className="font-medium">{interpreted}</span>
            </div>
            {utcLine && (
              <div className="text-xs text-muted-foreground font-mono">
                = {utcLine}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
``````

#### `src\features\birth-profile\hooks\usePlaceSearch.ts`

```typescript
import { useEffect, useState } from 'react';
import type { GeocoderPort, PlaceSearchResult } from '@/domain/geo/port';

export type PlaceSearchState =
  | { status: 'idle'; results: PlaceSearchResult[] }
  | { status: 'loading'; results: PlaceSearchResult[] }
  | { status: 'success'; results: PlaceSearchResult[] }
  | { status: 'empty'; results: PlaceSearchResult[] }
  | { status: 'error'; results: PlaceSearchResult[]; error: string };

const IDLE: PlaceSearchState = { status: 'idle', results: [] };

export function usePlaceSearch(
  geocoder: GeocoderPort,
  query: string,
  options: { debounceMs?: number; minChars?: number } = {}
): PlaceSearchState {
  const { debounceMs = 300, minChars = 2 } = options;
  const [state, setState] = useState<PlaceSearchState>(IDLE);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < minChars) {
      setState(IDLE);
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setState((s) => ({ status: 'loading', results: s.results }));
      try {
        const results = await geocoder.search(trimmed, ctrl.signal);
        if (ctrl.signal.aborted) return;
        setState({
          status: results.length === 0 ? 'empty' : 'success',
          results,
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setState({
          status: 'error',
          results: [],
          error: (err as Error).message ?? 'Search failed',
        });
      }
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, geocoder, debounceMs, minChars]);

  return state;
}
``````

#### `src\features\birth-profile\schema.ts`

```typescript
import { z } from 'zod';
import { DateTime } from 'luxon';
import { isValidLatitude, isValidLongitude, isValidTimezone } from '@/domain/geo/place';

const placeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  shortLabel: z.string().min(1),
  lat: z.number().refine(isValidLatitude, 'Invalid latitude'),
  lon: z.number().refine(isValidLongitude, 'Invalid longitude'),
  timezone: z.string().refine(isValidTimezone, 'Invalid timezone'),
  countryCode: z.string().optional(),
  admin1: z.string().optional(),
  placeType: z.enum(['city', 'town', 'village', 'unknown']),
});

export const birthFormSchema = z
  .object({
    profileName: z.string().trim().min(1, 'nameRequired').max(100, 'nameTooLong'),
    localDate: z.string().min(1, 'dateRequired'),
    localTime: z.string().min(1, 'timeRequired'),
    place: placeSchema.nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.place) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['place'],
        message: 'placeRequired',
      });
      return;
    }

    const dt = DateTime.fromISO(`${data.localDate}T${data.localTime}`, {
      zone: data.place.timezone,
    });

    if (!dt.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['localTime'],
        message: 'invalidDateTime',
      });
      return;
    }

    if (dt.year < 1900) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['localDate'],
        message: 'dateTooEarly',
      });
    }
    if (dt > DateTime.utc()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['localDate'],
        message: 'dateFuture',
      });
    }
  });

export type BirthFormValues = z.infer<typeof birthFormSchema>;
``````

#### `src\features\birth-profile\store.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BirthData } from '@/domain/astrology/birth-data';

const STORE_VERSION = 1;

interface BirthStore {
  profiles: Record<string, BirthData>;
  activeProfileId: string | null;
  addProfile: (data: Omit<BirthData, 'id' | 'createdAt'>) => string;
  removeProfile: (id: string) => void;
  setActive: (id: string) => void;
  clearAll: () => void;
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const useBirthStore = create<BirthStore>()(
  persist(
    (set) => ({
      profiles: {},
      activeProfileId: null,

      addProfile: (data) => {
        const id = makeId();
        const full: BirthData = {
          ...data,
          id,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({
          profiles: { ...s.profiles, [id]: full },
          activeProfileId: id,
        }));
        return id;
      },

      removeProfile: (id) =>
        set((s) => {
          const next = { ...s.profiles };
          delete next[id];
          return {
            profiles: next,
            activeProfileId: s.activeProfileId === id ? null : s.activeProfileId,
          };
        }),

      setActive: (id) => set({ activeProfileId: id }),
      clearAll: () => set({ profiles: {}, activeProfileId: null }),
    }),
    { name: 'kundaliyatra-store', version: STORE_VERSION }
  )
);

export const useActiveProfile = (): BirthData | null =>
  useBirthStore((s) =>
    s.activeProfileId ? s.profiles[s.activeProfileId] ?? null : null
  );
``````

#### `src\features\chart\ChartPreview.tsx`

```tsx
import { VedicChart } from './components/VedicChart';

export function ChartPreview() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Vedic Chart Preview
        </h1>
        <p className="text-sm text-muted-foreground">
          Session 1 â€” grid only. Toggle between North Indian and South Indian styles.
          Verify the house layout matches your reference chart.
        </p>
      </div>

      <VedicChart
        size={520}
        defaultStyle="north"
        caption="Empty chart grid â€” planets coming in Session 2"
      />
    </div>
  );
}
``````

#### `src\features\chart\components\BaseChart.tsx`

```tsx
import { useMemo, useId } from 'react';
import {
  getHousePolygon,
  getHouseCentroid,
  getOuterSquarePath,
  getDiamondPath,
  getDiagonalPaths,
  getSouthInnerCells,
  pointsToPath,
  type Point,
} from '../lib/geometry';
import { CHART_THEME } from '../theme';
import type { ChartStyle, ChartHouse, ChartPlanetPlacement } from '../types';

interface BaseChartProps {
  style: ChartStyle;
  size: number;
  houses?: ChartHouse[];
  lang?: 'en' | 'hi' | 'ne';
}

export function BaseChart({ style, size, houses, lang = 'en' }: BaseChartProps) {
  const padding = CHART_THEME.padding;
  const innerSize = size - padding * 2;
  const uid = useId().replace(/:/g, '');

  const outerPath = useMemo(() => getOuterSquarePath(innerSize), [innerSize]);
  const diamondPath = useMemo(
    () => (style === 'north' ? getDiamondPath(innerSize) : null),
    [style, innerSize]
  );
  const diagonals = useMemo(
    () => (style === 'north' ? getDiagonalPaths(innerSize) : []),
    [style, innerSize]
  );

  const houseShapes = useMemo(() => {
    const result: Array<{
      house: number;
      path: string;
      center: Point;
      data: ChartHouse | null;
    }> = [];
    for (let h = 1; h <= 12; h++) {
      const pts = getHousePolygon(h, style);
      if (pts.length === 0) continue;
      const data = houses?.find((hh) => hh.number === h) ?? null;
      result.push({
        house: h,
        path: pointsToPath(pts, innerSize),
        center: getHouseCentroid(h, style),
        data,
      });
    }
    return result;
  }, [style, innerSize, houses]);

  const southInner = useMemo(
    () => (style === 'south' ? getSouthInnerCells(innerSize) : []),
    [style, innerSize]
  );

  const centerX = innerSize / 2;
  const centerY = innerSize / 2;
  const medallionOuter = CHART_THEME.medallionRadius * innerSize;
  const medallionInner = CHART_THEME.medallionInnerRadius * innerSize;
  const imageInset = CHART_THEME.ganeshImageInset * innerSize;
  const imageSize = medallionInner * 2 - imageInset * 2;
  const maskRadius = medallionOuter + 4;

  const houseNumDisplay = (n: number) =>
    lang === 'ne' || lang === 'hi'
      ? String(n).replace(/\d/g, (d) => 'à¥¦à¥§à¥¨à¥©à¥ªà¥«à¥¬à¥­à¥®à¥¯'[Number(d)])
      : String(n);

  const frameGradId = `sacred-frame-${uid}`;
  const ganeshClipId = `ganesh-clip-${uid}`;
  const centerMaskId = `center-mask-${uid}`;
  const innerShadowId = `medallion-inner-shadow-${uid}`;
  const dropShadowFilterId = `medallion-drop-shadow-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={style === 'north' ? 'North Indian chart' : 'South Indian chart'}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      <defs>
        <linearGradient id={frameGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(38 90% 62%)" />
          <stop offset="50%" stopColor="hsl(38 85% 52%)" />
          <stop offset="100%" stopColor="hsl(32 90% 48%)" />
        </linearGradient>

        <clipPath id={ganeshClipId}>
          <circle cx={centerX} cy={centerY} r={medallionInner - 1} />
        </clipPath>

        <mask id={centerMaskId}>
          <rect x={0} y={0} width={innerSize} height={innerSize} fill="white" />
          <circle cx={centerX} cy={centerY} r={maskRadius} fill="black" />
        </mask>

        <radialGradient id={innerShadowId}>
          <stop offset="0%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity="0" />
          <stop offset="70%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity="0" />
          <stop offset="95%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity={CHART_THEME.medallionShadowOpacity} />
          <stop offset="100%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity={CHART_THEME.medallionShadowOpacity + 0.15} />
        </radialGradient>

        {CHART_THEME.medallionDropShadow && (
          <filter id={dropShadowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope={CHART_THEME.medallionDropShadowOpacity} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <rect
        x={padding}
        y={padding}
        width={innerSize}
        height={innerSize}
        rx={CHART_THEME.frameCornerRadius ?? 0}
        ry={CHART_THEME.frameCornerRadius ?? 0}
        fill={CHART_THEME.canvasBg}
        stroke={`url(#${frameGradId})`}
        strokeWidth={CHART_THEME.frameStrokeWidth}
      />
      <rect
        x={padding + 4}
        y={padding + 4}
        width={innerSize - 8}
        height={innerSize - 8}
        rx={Math.max(0, (CHART_THEME.frameCornerRadius ?? 0) - 4)}
        ry={Math.max(0, (CHART_THEME.frameCornerRadius ?? 0) - 4)}
        fill="none"
        stroke={CHART_THEME.frameInnerGlow}
        strokeWidth={1}
      />

      <g transform={`translate(${padding}, ${padding})`}>
        {/* House backgrounds */}
        {houseShapes.map(({ house, path }) => (
          <path key={`bg-${house}`} d={path} fill={CHART_THEME.houseBackground} />
        ))}

        {southInner.map((cell, i) => (
          <rect
            key={`inner-${i}`}
            x={cell.x}
            y={cell.y}
            width={cell.width}
            height={cell.height}
            fill="none"
            stroke={CHART_THEME.innerStroke}
            strokeWidth={CHART_THEME.innerStrokeWidth}
            opacity={0.4}
          />
        ))}

        {/* Medallion */}
        {CHART_THEME.medallionDropShadow && (
          <circle
            cx={centerX}
            cy={centerY}
            r={medallionOuter}
            fill={CHART_THEME.canvasBg}
            filter={`url(#${dropShadowFilterId})`}
          />
        )}
        <circle cx={centerX} cy={centerY} r={medallionInner} fill={CHART_THEME.canvasBg} />
        <circle cx={centerX} cy={centerY} r={medallionInner} fill={`url(#${innerShadowId})`} pointerEvents="none" />
        <g clipPath={`url(#${ganeshClipId})`} opacity={CHART_THEME.ganeshImageOpacity}>
          <image
            href={CHART_THEME.ganeshImagePath}
            x={centerX - imageSize / 2}
            y={centerY - imageSize / 2}
            width={imageSize}
            height={imageSize}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
        <circle
          cx={centerX}
          cy={centerY}
          r={medallionInner - 1}
          fill="none"
          stroke={CHART_THEME.medallionHighlightColor}
          strokeWidth={CHART_THEME.medallionHighlightWidth}
          opacity={0.6}
          pointerEvents="none"
        />
        <circle cx={centerX} cy={centerY} r={medallionOuter} fill="none" stroke={`url(#${frameGradId})`} strokeWidth={1.75} />

        {/* Chart structure (masked) */}
        <g mask={`url(#${centerMaskId})`}>
          <path d={outerPath} fill="none" stroke={CHART_THEME.borderStroke} strokeWidth={CHART_THEME.borderStrokeWidth} />
          {diagonals.map((d, i) => (
            <path key={`diag-${i}`} d={d} fill="none" stroke={CHART_THEME.innerStroke} strokeWidth={CHART_THEME.innerStrokeWidth} />
          ))}
          {diamondPath && (
            <path d={diamondPath} fill="none" stroke={CHART_THEME.innerStroke} strokeWidth={CHART_THEME.innerStrokeWidth} />
          )}
          {style === 'north' &&
            houseShapes.map(({ house, path }) => (
              <path
                key={`outline-${house}`}
                d={path}
                fill="none"
                stroke={CHART_THEME.innerStroke}
                strokeWidth={CHART_THEME.innerStrokeWidth}
              />
            ))}
          {style === 'south' && (
            <>
              {[1, 2, 3].map((i) => (
                <line
                  key={`vline-${i}`}
                  x1={(i * innerSize) / 4}
                  y1={0}
                  x2={(i * innerSize) / 4}
                  y2={innerSize}
                  stroke={CHART_THEME.innerStroke}
                  strokeWidth={CHART_THEME.innerStrokeWidth}
                />
              ))}
              {[1, 2, 3].map((i) => (
                <line
                  key={`hline-${i}`}
                  x1={0}
                  y1={(i * innerSize) / 4}
                  x2={innerSize}
                  y2={(i * innerSize) / 4}
                  stroke={CHART_THEME.innerStroke}
                  strokeWidth={CHART_THEME.innerStrokeWidth}
                />
              ))}
            </>
          )}
        </g>

        {/* Planets + house numbers (masked) */}
        <g mask={`url(#${centerMaskId})`}>
          {houseShapes.map(({ house, center, data }) => (
            <HouseContents
              key={`contents-${house}`}
              house={house}
              center={center}
              size={innerSize}
              planets={data?.planets ?? []}
              numDisplay={houseNumDisplay(house)}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

/**
 * Render house contents â€” planets stack compactly, adapt to count.
 * Planets group in rows of up to 3, columns adjust.
 */
function HouseContents({
  house,
  center,
  size,
  planets,
  numDisplay,
}: {
  house: number;
  center: Point;
  size: number;
  planets: ChartPlanetPlacement[];
  numDisplay: string;
}) {
  const cx = center.x * size;
  const cy = center.y * size;
  const n = planets.length;

  // Adaptive sizing
  const fontSize = n === 0 ? 0 : n === 1 ? 13 : n === 2 ? 11 : n <= 4 ? 9 : 8;
  const degFontSize = Math.max(7, fontSize - 3);
  const lineHeight = fontSize + 3;
  const colGap = fontSize + 8;

  // Grid layout: max 2 columns, rows as needed
  const cols = n <= 2 ? 1 : n <= 4 ? 2 : 3;
  const rows = Math.ceil(n / cols) || 0;
  const totalWidth = (cols - 1) * colGap;
  const totalHeight = rows * lineHeight;

  const startX = cx - totalWidth / 2;
  const startY = cy - totalHeight / 2 + lineHeight / 2 - (n > 0 ? 4 : 0);

  return (
    <g>
      {/* House number â€” above the planets */}
      <text
        x={cx}
        y={cy - (n > 0 ? totalHeight / 2 + 10 : 0)}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fontFamily={CHART_THEME.houseNumberFont}
        fontWeight={CHART_THEME.houseNumberWeight}
        fill={CHART_THEME.houseNumberColor}
        opacity={0.55}
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {numDisplay}
      </text>

      {/* Planets grid */}
      {planets.map((p, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * colGap;
        const y = startY + row * lineHeight;

        const color = p.isAscendant ? CHART_THEME.ascendantColor : CHART_THEME.planetColor;
        const weight = p.isAscendant ? 700 : 600;

        return (
          <text
            key={`${p.planet}-${i}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fontFamily={CHART_THEME.planetFont}
            fontWeight={weight}
            fill={color}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          >
            {p.abbr}
            {p.isRetrograde && (
              <tspan fontSize={degFontSize} fill={CHART_THEME.retrogradeColor} dx={0.5} dy={-2}>
                Ê³
              </tspan>
            )}
          </text>
        );
      })}
    </g>
  );
}
``````

#### `src\features\chart\components\ChartStyleToggle.tsx`

```tsx
import { Button } from '@/components/ui/button';
import { useChartStyleStore } from '../lib/useChartStyle';
import type { ChartStyle } from '../types';

interface ChartStyleToggleProps {
  value?: ChartStyle;
  onChange?: (style: ChartStyle) => void;
}

export function ChartStyleToggle({ value, onChange }: ChartStyleToggleProps) {
  const { style, setStyle } = useChartStyleStore();
  const current = value ?? style;

  const handleChange = (next: ChartStyle) => {
    if (onChange) onChange(next);
    setStyle(next);
  };

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-md border bg-muted/40 w-fit no-print">
      <Button
        type="button"
        variant={current === 'north' ? 'default' : 'ghost'}
        size="sm"
        className="h-6 px-2 text-[11px]"
        onClick={() => handleChange('north')}
      >
        N
      </Button>
      <Button
        type="button"
        variant={current === 'south' ? 'default' : 'ghost'}
        size="sm"
        className="h-6 px-2 text-[11px]"
        onClick={() => handleChange('south')}
      >
        S
      </Button>
    </div>
  );
}
``````

#### `src\features\chart\components\VedicChart.tsx`

```tsx
import { BaseChart } from './BaseChart';
import { ChartStyleToggle } from './ChartStyleToggle';
import { useChartStyleStore } from '../lib/useChartStyle';
import { useTranslation } from 'react-i18next';
import type { ChartStyle, ChartHouse } from '../types';

interface VedicChartProps {
  size?: number;
  defaultStyle?: ChartStyle;
  style?: ChartStyle;       // â† NEW: explicit style (overrides global)
  houses?: ChartHouse[];
  label?: string;
  caption?: string;
  className?: string;
  hideToggle?: boolean;
  lang?: 'en' | 'hi' | 'ne';
}

export function VedicChart({
  size = 320,
  defaultStyle = 'north',
  style: styleProp,
  houses,
  label,
  caption,
  className,
  hideToggle = false,
  lang,
}: VedicChartProps) {
  const { style: globalStyle, setStyle } = useChartStyleStore();
  const { i18n } = useTranslation();

  const resolvedLang = lang ?? ((i18n.resolvedLanguage === 'ne'
    ? 'ne'
    : i18n.resolvedLanguage === 'hi'
      ? 'hi'
      : 'en') as 'en' | 'hi' | 'ne');

  // Priority: explicit prop > global store > default
  const activeStyle = styleProp ?? globalStyle ?? defaultStyle;

  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {label && <p className="text-sm font-semibold">{label}</p>}
        {!hideToggle && (
          <ChartStyleToggle value={activeStyle} onChange={setStyle} />
        )}
      </div>

      <div className="flex justify-center">
        <div className="w-full" style={{ maxWidth: `${size}px` }}>
          <BaseChart
            style={activeStyle}
            size={size}
            houses={houses}
            lang={resolvedLang}
          />
        </div>
      </div>

      {caption && (
        <p className="text-xs text-muted-foreground text-center">{caption}</p>
      )}
    </div>
  );
}
``````

#### `src\features\chart\lib\adapters.ts`

```typescript
import type { ChartHouse, ChartPlanetPlacement } from '../types';

const MAIN_PLANETS = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter',
  'Venus', 'Saturn', 'Rahu', 'Ketu',
];

const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

interface RawPlanet {
  rashi?: number;
  rashiName?: string;
  degree?: number;
  minute?: number;
  isRetrograde?: boolean;
  isCombust?: boolean;
}

interface RawVarga {
  ascendant?: { rashi?: number; rashiName?: string };
  planets?: Record<string, RawPlanet>;
  houses?: Array<{
    number: number;
    rashi?: number;
    planets?: string[];
  }>;
}

interface RawKundli {
  ascendant?: { rashiName?: string; degree?: number };
  planets?: Record<string, RawPlanet>;
  houses?: Array<{
    number: number;
    rashi?: number;
    planets?: string[];
  }>;
  vargas?: Record<string, RawVarga>;
}

interface BuildOptions {
  resolveAbbr: (planet: string) => string;
}

function rashiLabel(num: number | undefined, name: string | undefined): string {
  if (name) return name;
  if (num && num >= 1 && num <= 12) return RASHI_NAMES[num - 1];
  return '';
}

/**
 * Convert library houses into our ChartHouse[].
 * Works for both the main chart (from kundli.houses/planets)
 * and any varga (from kundli.vargas.dN.houses/planets).
 */
function buildFromHouses(
  houses: RawVarga['houses'] = [],
  planets: Record<string, RawPlanet> = {},
  ascendant: { rashi?: number; rashiName?: string; degree?: number } | undefined,
  options: BuildOptions
): ChartHouse[] {
  const planetsByHouse: Record<number, string[]> = {};
  for (const h of houses) {
    planetsByHouse[h.number] = h.planets ?? [];
  }

  return houses.map((h) => {
    const housePlanets: ChartPlanetPlacement[] = [];

    // Ascendant marker in House 1
    if (h.number === 1 && ascendant) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: options.resolveAbbr('Ascendant'),
        degree: Math.floor(ascendant.degree ?? 0),
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    // Planets in this house
    for (const planetName of planetsByHouse[h.number] ?? []) {
      if (!MAIN_PLANETS.includes(planetName)) continue;
      const p = planets[planetName];
      if (!p) continue;
      housePlanets.push({
        planet: planetName,
        abbr: options.resolveAbbr(planetName),
        degree: Math.floor(p.degree ?? 0),
        isRetrograde: !!p.isRetrograde,
        isCombust: !!p.isCombust,
        isAscendant: false,
      });
    }

    return {
      number: h.number,
      rashi: rashiLabel(h.rashi, undefined),
      planets: housePlanets,
    };
  });
}

/**
 * Build chart houses for the D1 (main) chart.
 */
export function buildChartHouses(
  kundli: RawKundli,
  options: BuildOptions
): ChartHouse[] {
  return buildFromHouses(
    kundli.houses,
    kundli.planets,
    kundli.ascendant,
    options
  );
}

/**
 * Build chart houses for a specific varga (d9, d10, etc.).
 * Uses the simple { rashi, rashiName } shape from kundli.vargas.dN.
 */
export function buildVargaHouses(
  kundli: RawKundli,
  vargaCode: string,
  options: BuildOptions
): ChartHouse[] {
  const varga = kundli.vargas?.[vargaCode];
  if (!varga) return [];

  // If the varga has full houses[] (like d1), use them directly
  if (varga.houses && varga.houses.length > 0) {
    return buildFromHouses(
      varga.houses,
      varga.planets,
      varga.ascendant,
      options
    );
  }

  // Otherwise, construct houses from the simplified varga
  // (each planet has only rashi/rashiName; we group by rashi to assign houses)
  const ascRashi = varga.ascendant?.rashi ?? 1;

  const planetSigns: Record<string, number> = {};
  for (const [name, p] of Object.entries(varga.planets ?? {})) {
    if (MAIN_PLANETS.includes(name) && p.rashi) {
      planetSigns[name] = p.rashi;
    }
  }

  // Compute house for each planet: house = ((rashi - ascRashi + 12) % 12) + 1
  const planetsByHouse: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) planetsByHouse[h] = [];

  for (const [name, rashi] of Object.entries(planetSigns)) {
    const house = ((rashi - ascRashi + 12) % 12) + 1;
    planetsByHouse[house].push(name);
  }

  // Build houses
  const result: ChartHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseRashi = ((ascRashi + h - 2) % 12) + 1;
    const housePlanets: ChartPlanetPlacement[] = [];

    if (h === 1 && varga.ascendant) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: options.resolveAbbr('Ascendant'),
        degree: 0,
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    for (const planetName of planetsByHouse[h]) {
      const p = varga.planets?.[planetName];
      if (!p) continue;
      housePlanets.push({
        planet: planetName,
        abbr: options.resolveAbbr(planetName),
        degree: Math.floor(p.degree ?? 0),
        isRetrograde: !!p.isRetrograde,
        isCombust: !!p.isCombust,
        isAscendant: false,
      });
    }

    result.push({
      number: h,
      rashi: rashiLabel(houseRashi, undefined),
      planets: housePlanets,
    });
  }

  return result;
}

/**
 * Build chart houses for a reference chart (Chandra Kundli or Surya Kundli).
 * These come from kundli.chandraKundli / kundli.suryaKundli, which have
 * the same shape as varga charts.
 */
export function buildReferenceChartHouses(
  kundli: RawKundli,
  type: 'chandra' | 'surya',
  options: BuildOptions
): ChartHouse[] {
  const ref =
    type === 'chandra'
      ? (kundli as any).chandraKundli
      : (kundli as any).suryaKundli;

  if (!ref) return [];

  // Reference charts use the same shape as vargas: { ascendant, planets, houses }
  if (ref.houses && ref.houses.length > 0) {
    return buildFromHouses(ref.houses, ref.planets, ref.ascendant, options);
  }

  // Fallback: build from planets' rashi values
  const ascRashi = ref.ascendant?.rashi ?? 1;
  const planetSigns: Record<string, number> = {};
  for (const [name, p] of Object.entries(ref.planets ?? {})) {
    if (MAIN_PLANETS.includes(name) && (p as any).rashi) {
      planetSigns[name] = (p as any).rashi;
    }
  }

  const planetsByHouse: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) planetsByHouse[h] = [];
  for (const [name, rashi] of Object.entries(planetSigns)) {
    const house = ((rashi - ascRashi + 12) % 12) + 1;
    planetsByHouse[house].push(name);
  }

  const result: ChartHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseRashi = ((ascRashi + h - 2) % 12) + 1;
    const housePlanets: ChartPlanetPlacement[] = [];

    if (h === 1 && ref.ascendant) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: options.resolveAbbr('Ascendant'),
        degree: 0,
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    for (const planetName of planetsByHouse[h]) {
      const p = ref.planets?.[planetName];
      if (!p) continue;
      housePlanets.push({
        planet: planetName,
        abbr: options.resolveAbbr(planetName),
        degree: Math.floor((p as any).degree ?? 0),
        isRetrograde: !!(p as any).isRetrograde,
        isCombust: !!(p as any).isCombust,
        isAscendant: false,
      });
    }

    result.push({
      number: h,
      rashi: rashiLabel(houseRashi, undefined),
      planets: housePlanets,
    });
  }

  return result;
}
``````

#### `src\features\chart\lib\geometry.ts`

```typescript
export interface Point {
  x: number;
  y: number;
}

export type ChartStyle = 'north' | 'south';

// â”€â”€â”€ North Indian chart vertices â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TL: Point = { x: 0,   y: 0 };
const T:  Point = { x: 0.5, y: 0 };
const TR: Point = { x: 1,   y: 0 };
const R:  Point = { x: 1,   y: 0.5 };
const BR: Point = { x: 1,   y: 1 };
const B:  Point = { x: 0.5, y: 1 };
const BL: Point = { x: 0,   y: 1 };
const L:  Point = { x: 0,   y: 0.5 };
const C:  Point = { x: 0.5, y: 0.5 };

const D1: Point = { x: 0.25, y: 0.25 };
const D2: Point = { x: 0.75, y: 0.25 };
const D3: Point = { x: 0.75, y: 0.75 };
const D4: Point = { x: 0.25, y: 0.75 };

export const NORTH_HOUSE_POLYGONS: Record<number, Point[]> = {
  1:  [T, D2, C, D1],
  2:  [TL, T, D1],
  3:  [TL, D1, L],
  4:  [L, D1, C],
  5:  [L, C, D4],
  6:  [BL, L, D4],
  7:  [BL, D4, B],
  8:  [B, D4, C, D3],
  9:  [B, D3, BR],
  10: [BR, D3, R],
  11: [R, D3, C],
  12: [R, C, D2],
};

export const SOUTH_HOUSE_GRID: Record<number, { row: number; col: number }> = {
  1:  { row: 0, col: 0 },
  2:  { row: 0, col: 1 },
  3:  { row: 0, col: 2 },
  4:  { row: 0, col: 3 },
  5:  { row: 1, col: 3 },
  6:  { row: 2, col: 3 },
  7:  { row: 3, col: 3 },
  8:  { row: 3, col: 2 },
  9:  { row: 3, col: 1 },
  10: { row: 3, col: 0 },
  11: { row: 2, col: 0 },
  12: { row: 1, col: 0 },
};

// â”€â”€â”€ Path generation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function pointsToPath(points: Point[], size: number): string {
  if (points.length === 0) return '';
  const cmds = points.map(
    (p, i) => `${i === 0 ? 'M' : 'L'} ${(p.x * size).toFixed(2)} ${(p.y * size).toFixed(2)}`
  );
  return cmds.join(' ') + ' Z';
}

export function centroid(points: Point[]): Point {
  const n = points.length;
  if (n === 0) return { x: 0.5, y: 0.5 };
  const sum = points.reduce(
    (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
    { x: 0, y: 0 }
  );
  return { x: sum.x / n, y: sum.y / n };
}

/** Visual incenter for triangles â€” better text placement */
export function visualCenter(points: Point[]): Point {
  if (points.length === 3) {
    const [a, b, c] = points;
    const la = Math.hypot(b.x - c.x, b.y - c.y);
    const lb = Math.hypot(a.x - c.x, a.y - c.y);
    const lc = Math.hypot(a.x - b.x, a.y - b.y);
    const sum = la + lb + lc;
    if (sum === 0) return { x: 0.5, y: 0.5 };
    return {
      x: (la * a.x + lb * b.x + lc * c.x) / sum,
      y: (la * a.y + lb * b.y + lc * c.y) / sum,
    };
  }
  return centroid(points);
}

export function getHousePolygon(house: number, style: ChartStyle): Point[] {
  if (style === 'north') {
    return NORTH_HOUSE_POLYGONS[house] ?? [];
  }
  const g = SOUTH_HOUSE_GRID[house];
  if (!g) return [];
  const cell = 1 / 4;
  const x0 = g.col * cell;
  const y0 = g.row * cell;
  return [
    { x: x0,           y: y0 },
    { x: x0 + cell,    y: y0 },
    { x: x0 + cell,    y: y0 + cell },
    { x: x0,           y: y0 + cell },
  ];
}

export function getHouseCentroid(house: number, style: ChartStyle): Point {
  return visualCenter(getHousePolygon(house, style));
}

export function getOuterSquarePath(size: number): string {
  return `M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} Z`;
}

export function getDiamondPath(size: number): string {
  return `M ${size / 2} 0 L ${size} ${size / 2} L ${size / 2} ${size} L 0 ${size / 2} Z`;
}

export function getDiagonalPaths(size: number): string[] {
  return [
    `M 0 0 L ${size} ${size}`,
    `M ${size} 0 L 0 ${size}`,
  ];
}

export function getSouthInnerCells(size: number) {
  const cell = size / 4;
  return [
    { x: cell,     y: cell,     width: cell, height: cell },
    { x: 2 * cell, y: cell,     width: cell, height: cell },
    { x: cell,     y: 2 * cell, width: cell, height: cell },
    { x: 2 * cell, y: 2 * cell, width: cell, height: cell },
  ];
}

/**
 * Generate sunburst rays emanating from the center.
 * Returns an array of {x1, y1, x2, y2} line coordinates.
 */
export function getSunburstRays(
  size: number,
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  rayCount: number
): Array<{ x1: number; y1: number; x2: number; y2: number }> {
  const rays = [];
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * 2 * Math.PI;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    rays.push({
      x1: centerX + cos * innerRadius * size,
      y1: centerY + sin * innerRadius * size,
      x2: centerX + cos * outerRadius * size,
      y2: centerY + sin * outerRadius * size,
    });
  }
  return rays;
}
``````

#### `src\features\chart\lib\glyphs.ts`

```typescript
import type { PlanetKey } from '../primitives/GlyphBadge';

// â”€â”€â”€ English abbreviations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const PLANET_GLYPHS_EN: Record<string, string> = {
  Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me',
  Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa',
  Rahu: 'Ra', Ketu: 'Ke', Ascendant: 'Asc',
};

// â”€â”€â”€ Devanagari abbreviations (traditional) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const PLANET_GLYPHS_DEVANAGARI: Record<string, string> = {
  Sun: 'à¤¸à¥‚',
  Moon: 'à¤šà¤‚',
  Mars: 'à¤®à¤‚',
  Mercury: 'à¤¬à¥',
  Jupiter: 'à¤¬à¥ƒà¤‚',
  Venus: 'à¤¶à¥',
  Saturn: 'à¤¶',
  Rahu: 'à¤°à¤¾',
  Ketu: 'à¤•à¥‡',
  Ascendant: 'à¤²',
};

// Keep the default (English) for backward compatibility
export const PLANET_GLYPHS = PLANET_GLYPHS_EN;

/**
 * Get the correct abbreviation for a planet in a given language.
 */
export function getPlanetAbbr(planet: string, lang: 'en' | 'hi' | 'ne'): string {
  if (lang === 'hi' || lang === 'ne') {
    return PLANET_GLYPHS_DEVANAGARI[planet] ?? PLANET_GLYPHS_EN[planet] ?? planet.slice(0, 2);
  }
  return PLANET_GLYPHS_EN[planet] ?? planet.slice(0, 2);
}

// â”€â”€â”€ Rashi glyphs (unchanged) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const RASHI_GLYPHS: Record<string, string> = {
  Aries: 'â™ˆ', Taurus: 'â™‰', Gemini: 'â™Š', Cancer: 'â™‹',
  Leo: 'â™Œ', Virgo: 'â™', Libra: 'â™Ž', Scorpio: 'â™',
  Sagittarius: 'â™', Capricorn: 'â™‘', Aquarius: 'â™’', Pisces: 'â™“',
};

// â”€â”€â”€ Rashi lords (unchanged) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const RASHI_LORDS: Record<string, string> = {
  Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon',
  Leo: 'Sun', Virgo: 'Mercury', Libra: 'Venus', Scorpio: 'Mars',
  Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Saturn', Pisces: 'Jupiter',
};

export const HOUSE_NAMES_EN: Record<number, string> = {
  1: 'Self', 2: 'Wealth', 3: 'Siblings', 4: 'Home',
  5: 'Children', 6: 'Enemies', 7: 'Marriage', 8: 'Death',
  9: 'Fortune', 10: 'Career', 11: 'Gains', 12: 'Loss',
};

export const PLANET_TO_KEY: Record<string, PlanetKey> = {
  Sun: 'Sun', Moon: 'Moon', Mars: 'Mars', Mercury: 'Mercury',
  Jupiter: 'Jupiter', Venus: 'Venus', Saturn: 'Saturn',
  Rahu: 'Rahu', Ketu: 'Ketu', Ascendant: 'Ascendant',
};
``````

#### `src\features\chart\lib\useChartStyle.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChartStyle } from '../types';

interface ChartStyleState {
  style: ChartStyle;
  setStyle: (s: ChartStyle) => void;
  toggle: () => void;
}

export const useChartStyleStore = create<ChartStyleState>()(
  persist(
    (set, get) => ({
      style: 'north',
      setStyle: (style) => set({ style }),
      toggle: () => set({ style: get().style === 'north' ? 'south' : 'north' }),
    }),
    { name: 'kundaliyatra-chart-style' }
  )
);
``````

#### `src\features\chart\theme.ts`

```typescript
export const CHART_THEME = {
  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Frame Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  frameStroke: 'hsl(38 85% 52%)',
  frameStrokeWidth: 5,
  frameCornerRadius: 0,
  frameInnerGlow: 'hsl(38 90% 65% / 0.35)',

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Canvas background Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  canvasBg: 'hsl(42 55% 97%)',
  canvasBgDark: 'hsl(30 25% 14%)',

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Chart lines (deep gold) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  borderStroke: 'hsl(38 75% 42%)',
  borderStrokeWidth: 1.75,
  innerStroke: 'hsl(38 65% 55%)',
  innerStrokeWidth: 1.25,

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ House fills Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  houseBackground: 'hsl(42 55% 97%)',
  houseHoverBackground: 'hsl(38 80% 88%)',
  houseSelectedBackground: 'hsl(32 95% 85%)',

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ House numbers Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  houseNumberColor: 'hsl(30 45% 38%)',
  houseNumberSize: 11,
  houseNumberFont: "'Noto Serif Devanagari', ui-monospace, monospace",
  houseNumberWeight: 500,

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Planet glyphs Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  planetColor: 'hsl(25 55% 22%)',
  planetSize: 13,
  planetFont: "'Noto Serif Devanagari', 'Noto Sans Devanagari', sans-serif",
  planetWeight: 600,

  planetDegreeColor: 'hsl(30 35% 45%)',
  planetDegreeSize: 9,
  planetDegreeFont: 'ui-monospace, monospace',

  retrogradeColor: 'hsl(355 70% 48%)',
  combustColor: 'hsl(28 90% 45%)',

  ascendantColor: 'hsl(32 95% 40%)',
  ascendantWeight: 700,

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Center medallion (Ganesh) Ã¢â‚¬â€ INSET look Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  medallionRadius: 0.14,          // outer ring
  medallionInnerRadius: 0.135,    // inner cream fill
  ganeshImagePath: '/ganesh.png',
  ganeshImageOpacity: 0.85,       // slight fade = printed feel
  ganeshImageInset: 0.06,         // padding between image and medallion edge

  // Inner shadow ring Ã¢â‚¬â€ creates the "pressed into paper" feel
  medallionShadowColor: 'hsl(30 60% 35%)',
  medallionShadowOpacity: 0.35,
  medallionShadowWidth: 3,        // px stroke that fades inward

  // Outer highlight ring
  medallionHighlightColor: 'hsl(45 95% 88%)',
  medallionHighlightWidth: 1.5,

  // Soft drop shadow cast by the medallion
  medallionDropShadow: true,
  medallionDropShadowOpacity: 0.15,

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ No sunburst (removes the "floating" feel) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  sunburstRayCount: 0,
  sunburstColor: 'hsl(38 90% 60%)',
  sunburstOpacity: 0,
  sunburstRadius: 0,
  sunburstRayLength: 0,

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Layout Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  padding: 8,
  houseNumberOffset: { x: 0, y: -6 },
  planetLineHeight: 14,
} as const;

export type ChartTheme = typeof CHART_THEME;
``````

#### `src\features\chart\types.ts`

```typescript
export type ChartStyle = 'north' | 'south';

export interface ChartHouse {
  number: number;
  rashi: string;
  planets: ChartPlanetPlacement[];
}

export interface ChartPlanetPlacement {
  planet: string;
  /** Abbreviation to display â€” resolved by caller based on language */
  abbr: string;
  degree: number;
  isRetrograde: boolean;
  isCombust: boolean;
  isAscendant?: boolean;
}

export interface VedicChartProps {
  style: ChartStyle;
  houses: ChartHouse[];
  size?: number;
  onPlanetClick?: (planet: string, house: number) => void;
  onHouseClick?: (house: number) => void;
  selectedPlanet?: string | null;
  ariaLabel?: string;
  className?: string;
  /** Language code â€” determines Devanagari vs English abbreviations */
  lang?: 'en' | 'hi' | 'ne';
}
``````

#### `src\features\overview\OverviewView.tsx`

```tsx
import { useMemo } from 'react';
import type { Kundli } from '@prisri/jyotish';
import { Button } from '@/components/ui/button';
import {
  prisriJyotish,
  BirthDataError,
} from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { useActiveProfile, useBirthStore } from '../birth-profile/store';
import { BirthProfileForm } from '../birth-profile/components/BirthProfileForm';
import { ReportOverview } from '@/features/report/components/ReportOverview';

export function OverviewView() {
  const profile = useActiveProfile();

  if (!profile) {
    return (
      <div className="p-8">
        <BirthProfileForm />
      </div>
    );
  }
  return <ReportView profile={profile} />;
}

function ReportView({
  profile,
}: {
  profile: NonNullable<ReturnType<typeof useActiveProfile>>;
}) {
  const clearAll = useBirthStore((s) => s.clearAll);

  const { kundli, error } = useMemo(() => {
    try {
      return { kundli: prisriJyotish.calculate(profile), error: null as string | null };
    } catch (e) {
      return {
        kundli: null as Kundli | null,
        error: e instanceof BirthDataError ? e.message : 'Chart calculation failed.',
      };
    }
  }, [profile]);

  if (error || !kundli) {
    return (
      <div className="p-8 max-w-lg mx-auto space-y-4">
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {error ?? 'Chart calculation failed.'}
        </div>
        <Button variant="destructive" onClick={clearAll}>
          Reset
        </Button>
      </div>
    );
  }

  return (
    <ReportOverview
      profile={profile}
      kundli={kundli as unknown as Record<string, any>}
      onReset={clearAll}
    />
  );
}
``````

#### `src\features\report\components\ChartCard.tsx`

```tsx
import { VedicChart } from '@/features/chart/components/VedicChart';
import { ChartStyleToggle } from '@/features/chart/components/ChartStyleToggle';
import { useChartStyleStore } from '@/features/chart/lib/useChartStyle';
import { useTranslation } from 'react-i18next';
import type { ChartHouse } from '@/features/chart/types';

interface ChartCardProps {
  code: string;
  name: string;
  subtitle: string;
  lagna: string;
  lagnaDegree?: string;
  useFor: string[];
  houses: ChartHouse[];
  showToggle?: boolean;
  size?: number;
}

export function ChartCard({
  code,
  name,
  subtitle,
  lagna,
  lagnaDegree,
  useFor,
  houses,
  showToggle = false,
  size = 320,
}: ChartCardProps) {
  const { i18n } = useTranslation();
  const style = useChartStyleStore((s) => s.style);
  const setStyle = useChartStyleStore((s) => s.setStyle);

  const lang = (i18n.resolvedLanguage === 'ne'
    ? 'ne'
    : i18n.resolvedLanguage === 'hi'
      ? 'hi'
      : 'en') as 'en' | 'hi' | 'ne';

  return (
    <article className="rounded-2xl border bg-card overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div>
            <h3
              className="text-lg font-bold leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {code} Â· {name}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          </div>
          {showToggle && (
            <div className="shrink-0">
              <ChartStyleToggle value={style} onChange={setStyle} />
            </div>
          )}
        </div>
      </div>

      {/* Chart â€” pass style explicitly */}
      <div className="flex justify-center py-5 px-4">
        <VedicChart
          size={size}
          houses={houses}
          style={style}
          hideToggle
          lang={lang}
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t space-y-3 mt-auto">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Lagna
          </span>
          <span className="flex items-baseline gap-2">
            <strong
              className="text-sm font-semibold text-primary"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {lagna}
            </strong>
            {lagnaDegree && (
              <span className="text-[10px] font-mono text-muted-foreground">
                {lagnaDegree}
              </span>
            )}
          </span>
        </div>

        <div className="space-y-1.5 pt-3 border-t border-border/50">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Use for
          </p>
          <ul className="space-y-1">
            {useFor.map((u) => (
              <li key={u} className="flex items-start gap-2 text-xs leading-relaxed">
                <span className="text-primary mt-0.5 shrink-0">â€¢</span>
                <span className="text-foreground/85">{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
``````

#### `src\features\report\components\Hero.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { IconPin } from '@/components/icons';
import { PLANET_GLYPHS, RASHI_GLYPHS } from '@/features/report/lib/glyphs';
import type { BirthData } from '@/domain/astrology/birth-data';

interface HeroProps {
  profile: BirthData;
  kundli: Record<string, any>;
  onReset: () => void;
}

function formatLongDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const localDate = new Date(y, m - 1, d, 12, 0, 0);
  return localDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function formatTime12h(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m ?? 0).padStart(2, '0')} ${suffix}`;
}

function formatDegree(deg?: number, min?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  return `${d}Â° ${String(m).padStart(2, '0')}â€²`;
}

export function Hero({ profile, kundli }: HeroProps) {
  const { t } = useTranslation();

  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const sun = kundli.planets?.Sun ?? {};
  const dasha = kundli.dasha?.currentMahadasha;
  const antar = kundli.dasha?.currentAntar;
  const birthNak = kundli.dasha?.birthNakshatra ?? moon.nakshatra;
  const sav = kundli.ashtakavarga?.sav;
  const strongest = sav?.strongestHouse;
  const strongestData = sav?.houseStrengths?.find((h: any) => h.house === strongest);

  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  // The three "identity" signs
  const identitySigns = [
    {
      key: 'chandra',
      label: t('hero.chandraRashi', { defaultValue: 'Chandra Rashi' }),
      sublabel: t('hero.chandraSub', { defaultValue: 'Moon Sign Â· Mind' }),
      rashi: moon.rashiName ?? 'â€”',
      glyph: RASHI_GLYPHS[moon.rashiName] ?? 'Â·',
      nakshatra: moon.nakshatra,
      pada: moon.pada,
      degree: formatDegree(moon.degree, moon.minute),
      isPrimary: true,
    },
    {
      key: 'surya',
      label: t('hero.suryaRashi', { defaultValue: 'Surya Rashi' }),
      sublabel: t('hero.suryaSub', { defaultValue: 'Sun Sign Â· Soul' }),
      rashi: sun.rashiName ?? 'â€”',
      glyph: RASHI_GLYPHS[sun.rashiName] ?? 'Â·',
      nakshatra: sun.nakshatra,
      pada: sun.pada,
      degree: formatDegree(sun.degree, sun.minute),
    },
    {
      key: 'lagna',
      label: t('hero.lagnaRashi', { defaultValue: 'Lagna' }),
      sublabel: t('hero.lagnaSub', { defaultValue: 'Ascendant Â· Body' }),
      rashi: asc.rashiName ?? 'â€”',
      glyph: RASHI_GLYPHS[asc.rashiName] ?? 'Â·',
      nakshatra: asc.nakshatra,
      pada: asc.pada,
      degree: formatDegree(asc.degree, asc.minute),
    },
  ];

  // Secondary metrics
  const secondary = [
    {
      label: t('hero.dasha', { defaultValue: 'Current Mahadasha' }),
      glyph: dasha ? PLANET_GLYPHS[dasha.planet] ?? 'Â·' : 'Â·',
      value: dasha?.planet ?? 'â€”',
      sub: dasha ? `${dasha.progressPercent?.toFixed(1)}% complete` : '',
    },
    {
      label: t('hero.nakshatra', { defaultValue: 'Birth Nakshatra' }),
      glyph: 'âœ¦',
      value: birthNak ?? 'â€”',
      sub: moon.pada ? `Pada ${moon.pada}` : '',
    },
    {
      label: t('hero.strongest', { defaultValue: 'Strongest House' }),
      glyph: 'â˜…',
      value: strongest ? `House ${ROMAN[strongest - 1]}` : 'â€”',
      sub: strongestData ? `${strongestData.bindus} bindus` : '',
    },
    {
      label: t('hero.antar', { defaultValue: 'Current Antar' }),
      glyph: antar ? PLANET_GLYPHS[antar.planet] ?? 'Â·' : 'Â·',
      value: antar?.planet ?? 'â€”',
      sub: antar ? 'Antardasha' : '',
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card">
      {/* Warm cream background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, hsl(42 60% 98%) 0%, hsl(42 55% 97%) 55%, hsl(38 50% 96%) 100%)',
        }}
      />

      {/* Soft radial glow behind Ganesh */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, hsl(38 90% 60% / 0.12) 0%, transparent 55%)',
        }}
      />

      <div className="relative px-6 pt-12 pb-10 md:pt-14 md:pb-12 space-y-8">
        {/* â”€â”€â”€ Ganesh centered â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="flex flex-col items-center gap-5">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: 'clamp(100px, 14vw, 130px)',
              height: 'clamp(100px, 14vw, 130px)',
              border: '2px solid hsl(38 85% 55%)',
              background: 'hsl(42 55% 97%)',
              boxShadow:
                '0 0 0 6px hsl(38 90% 60% / 0.14), 0 0 60px hsl(38 90% 60% / 0.35), 0 8px 24px hsl(30 40% 20% / 0.12)',
            }}
          >
            <img
              src="/ganesh.png"
              alt="Ganesh"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* Mantra below Ganesh */}
          <p
            className="text-primary text-center"
            style={{
              fontFamily: "'Noto Serif Devanagari', 'Crimson Pro', Georgia, serif",
              fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              lineHeight: 1.3,
            }}
          >
            à¥ à¤¶à¥à¤°à¥€ à¤—à¤£à¥‡à¤¶à¤¾à¤¯ à¤¨à¤®à¤ƒ
          </p>

          {/* Divider */}
          <div
            className="h-px"
            style={{
              width: 'clamp(140px, 20vw, 220px)',
              background:
                'linear-gradient(to right, transparent, hsl(32 85% 55% / 0.5), transparent)',
            }}
          />
        </div>

        {/* â”€â”€â”€ Name + subtitle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="text-center space-y-3">
          <h1
            className="text-foreground"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {profile.profileName}
          </h1>
          <p className="text-[11px] uppercase tracking-[0.4em] text-primary font-medium">
            {t('hero.reading', { defaultValue: 'A Vedic Reading' })}
          </p>
        </div>

        {/* â”€â”€â”€ Birth line â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="text-center space-y-1.5 text-sm text-muted-foreground">
          <p>
            {formatLongDate(profile.localDate)}
            <span className="mx-2 opacity-40">Â·</span>
            {formatTime12h(profile.localTime)}
          </p>
          <p className="flex items-center justify-center gap-1.5 text-xs">
            <IconPin size={11} className="text-primary/70" />
            {profile.place.shortLabel}
            <span className="opacity-40 mx-1">Â·</span>
            <span className="font-mono">{profile.place.timezone}</span>
          </p>
        </div>

        {/* â”€â”€â”€ YOUR RASHI â€” prominent block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="max-w-3xl mx-auto pt-4">
          <p className="text-center text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-4">
            {t('hero.yourRashi', { defaultValue: 'Your Rashi' })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {identitySigns.map((s) => (
              <div
                key={s.key}
                className={`rounded-2xl border p-5 text-center space-y-2 transition-shadow ${
                  s.isPrimary
                    ? 'border-primary/50 bg-primary/[0.06] shadow-md'
                    : 'border-border/60 bg-background/70'
                }`}
              >
                <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  {s.label}
                </p>
                <p className="text-[10px] text-muted-foreground italic">{s.sublabel}</p>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span
                    className="text-3xl leading-none"
                    style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                  >
                    {s.glyph}
                  </span>
                  <p
                    className={`text-2xl font-bold leading-tight ${
                      s.isPrimary ? 'text-primary' : 'text-foreground'
                    }`}
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {s.rashi}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground font-mono pt-1">
                  {s.degree}
                </p>
                {s.nakshatra && (
                  <p className="text-[11px] text-muted-foreground">
                    {s.nakshatra}
                    {s.pada ? ` Â· Pada ${s.pada}` : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* â”€â”€â”€ Secondary metrics row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {secondary.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm px-4 py-3 space-y-1.5"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="text-base leading-none"
                  style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                >
                  {m.glyph}
                </span>
                <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                  {m.label}
                </p>
              </div>
              <p
                className="text-base font-bold leading-tight text-foreground"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {m.value}
              </p>
              {m.sub && (
                <p className="text-[10px] text-muted-foreground font-mono leading-tight">
                  {m.sub}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
``````

#### `src\features\report\components\ReportOverview.tsx`

```tsx
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from './Hero';
import { Section } from '../primitives/Section';
import { OrnamentalDivider } from '../primitives/OrnamentalDivider';
import { ChartCard } from './ChartCard';
import {
  buildChartHouses,
  buildVargaHouses,
  buildReferenceChartHouses,
} from '@/features/chart/lib/adapters';
import { ThreeAnchorsSection } from '../sections/ThreeAnchorsSection';
import { PlanetaryMapSection } from '../sections/PlanetaryMapSection';
import { HouseMapSection } from '../sections/HouseMapSection';
import { UnfoldingSection } from '../sections/UnfoldingSection';
import { VitalSignsSection } from '../sections/VitalSignsSection';
import { AspectsSection } from '../sections/AspectsSection';
import { DivisionalChartsSection } from '../sections/DivisionalChartsSection';
import type { BirthData } from '@/domain/astrology/birth-data';

interface ReportOverviewProps {
  profile: BirthData;
  kundli: Record<string, any>;
  onReset: () => void;
}

export function ReportOverview({ profile, kundli, onReset }: ReportOverviewProps) {
  const { t } = useTranslation();

  const abbrResolver = useMemo(
    () => (planet: string) => {
      if (planet === 'Ascendant') return t('chart.planetAbbr.ascendant', { defaultValue: 'Asc' });
      return t(`chart.planetAbbr.${planet.toLowerCase()}`, { defaultValue: planet.slice(0, 2) });
    },
    [t]
  );

  const d1Houses = useMemo(
    () => buildChartHouses(kundli, { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );
  const d9Houses = useMemo(
    () => buildVargaHouses(kundli, 'd9', { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );
  const chandraHouses = useMemo(
    () => buildReferenceChartHouses(kundli, 'chandra', { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );
  const suryaHouses = useMemo(
    () => buildReferenceChartHouses(kundli, 'surya', { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );

  const chandraLagna =
    kundli.chandraKundli?.ascendant?.rashiName ??
    kundli.planets?.Moon?.rashiName ??
    'â€”';
  const suryaLagna =
    kundli.suryaKundli?.ascendant?.rashiName ??
    kundli.planets?.Sun?.rashiName ??
    'â€”';

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-4">
      {/* I. Hero */}
      <Hero profile={profile} kundli={kundli} onReset={onReset} />

      {/* II. The Four Charts */}
      <OrnamentalDivider />
      <Section
        eyebrow="The Charts"
        title="Form, Essence, and Reference"
        hint="Four charts form the classical working set. D1 shows the body. D9 shows the soul. Chandra and Surya reveal the mind and vitality from the Moon's and Sun's vantage points."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard
            code="D1"
            name="Rashi"
            subtitle="Body Â· Personality Â· Life path"
            lagna={kundli.ascendant?.rashiName ?? 'â€”'}
            lagnaDegree={
              kundli.ascendant
                ? `${kundli.ascendant.degree ?? 0}Â° ${String(kundli.ascendant.minute ?? 0).padStart(2, '0')}â€²`
                : undefined
            }
            useFor={[
              'Physical body and health',
              'Life direction and identity',
              'Planetary positions',
            ]}
            houses={d1Houses}
            showToggle
            size={300}
          />
          <ChartCard
            code="D9"
            name="Navamsha"
            subtitle="Soul Â· Marriage Â· Inner strength"
            lagna={kundli.vargas?.d9?.ascendant?.rashiName ?? 'â€”'}
            useFor={[
              'Marriage quality',
              'Soul purpose and dharma',
              'Inner strength of planets',
            ]}
            houses={d9Houses}
            size={300}
          />
          <ChartCard
            code="Chandra"
            name="Kundli"
            subtitle="Moon Chart Â· Mind Â· Psychology"
            lagna={chandraLagna}
            lagnaDegree={
              kundli.planets?.Moon
                ? `${kundli.planets.Moon.degree ?? 0}Â° ${String(kundli.planets.Moon.minute ?? 0).padStart(2, '0')}â€²`
                : undefined
            }
            useFor={[
              'Psychological perspective',
              'Mental peace and emotions',
              'Primary chart for transits',
            ]}
            houses={chandraHouses}
            size={300}
          />
          <ChartCard
            code="Surya"
            name="Kundli"
            subtitle="Sun Chart Â· Soul Â· Vitality"
            lagna={suryaLagna}
            lagnaDegree={
              kundli.planets?.Sun
                ? `${kundli.planets.Sun.degree ?? 0}Â° ${String(kundli.planets.Sun.minute ?? 0).padStart(2, '0')}â€²`
                : undefined
            }
            useFor={[
              'Soul vitality and health',
              'Executive authority',
              'Father and government',
            ]}
            houses={suryaHouses}
            size={300}
          />
        </div>
      </Section>

      {/* III. The Three Anchors */}
      <OrnamentalDivider />
      <Section
        eyebrow="Who You Are"
        title="Body, Mind, Soul"
        hint="Three pillars define a person: the body (Lagna), the mind (Chandra), and the soul (Surya)."
      >
        <ThreeAnchorsSection kundli={kundli} />
      </Section>

      {/* IV. The Planetary Map */}
      <OrnamentalDivider />
      <Section
        eyebrow="The Nine Grahas"
        title="The Planetary Map"
        hint="The nine planets as they stood at your birth."
      >
        <PlanetaryMapSection kundli={kundli} />
      </Section>

      {/* V. The House Map */}
      <OrnamentalDivider />
      <Section
        eyebrow="The Twelve Bhavas"
        title="The House Map"
        hint="Where the planets sit. House categories: amber = angles, green = fortune, red = tests."
      >
        <HouseMapSection kundli={kundli} />
      </Section>

      {/* VI. The Unfolding */}
      <OrnamentalDivider />
      <Section
        eyebrow="Vimshottari Dasha"
        title="The Unfolding"
        hint="Your life, as told by the Vimshottari cycle of planetary periods."
      >
        <UnfoldingSection kundli={kundli} />
      </Section>

      {/* VII. The Vital Signs */}
      <OrnamentalDivider />
      <Section
        eyebrow="Chart Strength"
        title="The Vital Signs"
        hint="Where your chart stands firm, where it asks for care, and how the world perceives you."
      >
        <VitalSignsSection kundli={kundli} />
      </Section>

      {/* VIII. The Aspects */}
      <OrnamentalDivider />
      <Section
        eyebrow="Graha Drishti"
        title="Planetary Aspects"
        hint="Every planet casts its glance on other houses. These interactions reveal who is watching whom â€” and shape what actually happens."
      >
        <AspectsSection kundli={kundli} />
      </Section>

      {/* IX. The Divisional Charts */}
      <OrnamentalDivider />
      <Section
        eyebrow="All D Charts"
        title="The Divisional Charts"
        hint="Twenty charts, one for each layer of the Vedic system â€” from the body (D1) to the deepest karma (D60)."
      >
        <DivisionalChartsSection kundli={kundli} />
      </Section>

      {/* Print-only footer */}
      <div className="print-footer hidden">
        KundaliYatra Â· A Vedic Reading
      </div>
    </div>
  );
}
``````

#### `src\features\report\components\SnapshotStrip.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { SnapshotTile } from './SnapshotTile';

function formatDegreeShort(deg?: number, min?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  return `${d}Â°${String(m).padStart(2, '0')}â€²`;
}

interface SnapshotStripProps {
  kundli: Record<string, any>;
}

export function SnapshotStrip({ kundli }: SnapshotStripProps) {
  const { t } = useTranslation();

  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const dasha = kundli.dasha?.currentMahadasha;
  const antar = kundli.dasha?.currentAntar;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <SnapshotTile
        label={t('report.snapshot.lagna', { defaultValue: 'Lagna' })}
        value={asc.rashiName ?? 'â€”'}
        subtitle={`${formatDegreeShort(asc.degree, asc.minute)} â€¢ ${asc.nakshatra ?? ''} ${asc.pada ?? ''}`}
        accent
      />
      <SnapshotTile
        label={t('report.snapshot.chandra', { defaultValue: 'Chandra' })}
        value={moon.rashiName ?? 'â€”'}
        subtitle={`${formatDegreeShort(moon.degree, moon.minute)} â€¢ ${moon.nakshatra ?? ''} ${moon.pada ?? ''}`}
      />
      <SnapshotTile
        label={t('report.snapshot.nakshatra', { defaultValue: 'Nakshatra' })}
        value={asc.nakshatra ?? 'â€”'}
        subtitle={
          asc.nakshatraLord
            ? `Pada ${asc.pada ?? 1} â€¢ Lord: ${asc.nakshatraLord}`
            : undefined
        }
      />
      {dasha ? (
        <SnapshotTile
          label={t('report.snapshot.currentDasha', { defaultValue: 'Current Dasha' })}
          value={String(dasha.planet ?? 'â€”')}
          subtitle={antar ? `Antar: ${antar.planet}` : undefined}
          progress={dasha.progressPercent}
        />
      ) : (
        <SnapshotTile
          label={t('report.snapshot.currentDasha', { defaultValue: 'Current Dasha' })}
          value="â€”"
        />
      )}
    </div>
  );
}
``````

#### `src\features\report\components\SnapshotTile.tsx`

```tsx
export interface SnapshotTileProps {
  label: string;
  value: string;
  subtitle?: string;
  progress?: number;
  accent?: boolean;
  className?: string;
}

export function SnapshotTile({
  label,
  value,
  subtitle,
  progress,
  accent = false,
  className,
}: SnapshotTileProps) {
  return (
    <div
      className={`flex flex-col gap-1 p-3 rounded-lg border bg-card/50 ${className ?? ''}`}
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </p>
      <p
        className={`font-semibold leading-tight ${accent ? 'text-primary' : 'text-foreground'}`}
        style={{ fontSize: '1rem' }}
      >
        {value}
      </p>
      {subtitle && (
        <p className="text-[11px] text-muted-foreground leading-tight">{subtitle}</p>
      )}
      {progress !== undefined && (
        <div className="mt-1 space-y-0.5">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-right font-mono">
            {progress.toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}
``````

#### `src\features\report\lib\aspect-info.ts`

```typescript
/**
 * Knowledge base for Vedic aspects (Graha Drishti).
 * Classical Parashari rules for planetary aspects.
 */

export interface AspectRule {
  planet: string;
  rule: string;
  houses: number[];
  meaning: string;
}

export const ASPECT_RULES: AspectRule[] = [
  {
    planet: 'Sun',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect â€” sees the opposite house',
  },
  {
    planet: 'Moon',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect â€” sees the opposite house',
  },
  {
    planet: 'Mars',
    rule: '4th, 7th, 8th aspect',
    houses: [4, 7, 8],
    meaning: 'Full aspect â€” Mars sees the 4th, 7th, and 8th houses',
  },
  {
    planet: 'Mercury',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect â€” sees the opposite house',
  },
  {
    planet: 'Jupiter',
    rule: '5th, 7th, 9th aspect',
    houses: [5, 7, 9],
    meaning: 'Full aspect â€” Jupiter sees the 5th, 7th, and 9th houses',
  },
  {
    planet: 'Venus',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect â€” sees the opposite house',
  },
  {
    planet: 'Saturn',
    rule: '3rd, 7th, 10th aspect',
    houses: [3, 7, 10],
    meaning: 'Full aspect â€” Saturn sees the 3rd, 7th, and 10th houses',
  },
  {
    planet: 'Rahu',
    rule: '5th, 7th, 9th aspect',
    houses: [5, 7, 9],
    meaning: 'Full aspect â€” Rahu sees the 5th, 7th, and 9th houses',
  },
  {
    planet: 'Ketu',
    rule: '5th, 7th, 9th aspect',
    houses: [5, 7, 9],
    meaning: 'Full aspect â€” Ketu sees the 5th, 7th, and 9th houses',
  },
];

export const ASPECT_TYPE_LABEL: Record<string, string> = {
  '3rd': '3rd house',
  '4th': '4th house',
  '5th': '5th house',
  '7th': '7th house',
  '8th': '8th house',
  '9th': '9th house',
  '10th': '10th house',
};

export const ASPECT_TYPE_MEANING: Record<string, string> = {
  '3rd': 'Effort, courage, siblings',
  '4th': 'Home, mother, heart',
  '5th': 'Intelligence, children, fortune',
  '7th': 'Partnership, marriage, public',
  '8th': 'Transformation, depth, longevity',
  '9th': 'Fortune, dharma, teacher',
  '10th': 'Career, action, status',
};
``````

#### `src\features\report\lib\devanagari.ts`

```typescript
/**
 * Utility functions for traditional Nepali patrika formatting.
 */

const DEVANAGARI_DIGITS = ['à¥¦', 'à¥§', 'à¥¨', 'à¥©', 'à¥ª', 'à¥«', 'à¥¬', 'à¥­', 'à¥®', 'à¥¯'];

/** Convert any number or numeric string to Devanagari numerals. */
export function toDevanagari(input: number | string): string {
  return String(input).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

/** Convert only digits in a mixed string, preserving Latin letters, symbols. */
export function devanagariDigits(input: string): string {
  return input.replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

/** Format a number with Western thousand separators, then convert. */
export function devanagariNumber(n: number): string {
  return toDevanagari(n.toLocaleString('en-IN'));
}

/** Time "08:45" â†’ "à¥¦à¥®:à¥ªà¥«" */
export function devanagariTime(time24: string): string {
  return devanagariDigits(time24);
}

/**
 * Convert a Gregorian date to a formal Nepali date string.
 * Example: 1983-03-26 â†’ "à¥¨à¥¬ à¤®à¤¾à¤°à¥à¤š à¥§à¥¯à¥®à¥©"
 */
export function devanagariDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const monthNames = [
    'à¤œà¤¨à¤µà¤°à¥€', 'à¤«à¥‡à¤¬à¥à¤°à¥à¤…à¤°à¥€', 'à¤®à¤¾à¤°à¥à¤š', 'à¤…à¤ªà¥à¤°à¤¿à¤²', 'à¤®à¥‡', 'à¤œà¥à¤¨',
    'à¤œà¥à¤²à¤¾à¤ˆ', 'à¤…à¤—à¤¸à¥à¤Ÿ', 'à¤¸à¥‡à¤ªà¥à¤Ÿà¥‡à¤®à¥à¤¬à¤°', 'à¤…à¤•à¥à¤Ÿà¥‹à¤¬à¤°', 'à¤¨à¥‹à¤­à¥‡à¤®à¥à¤¬à¤°', 'à¤¡à¤¿à¤¸à¥‡à¤®à¥à¤¬à¤°',
  ];
  return `${toDevanagari(d)} ${monthNames[m - 1]} ${toDevanagari(y)}`;
}

/** Convert B.S. year to Nepali: 2040 â†’ à¥¨à¥¦à¥ªà¥¦ */
export function devanagariYear(year: number): string {
  return toDevanagari(year);
}

/** "08:45" â†’ "à¤ªà¥à¤°à¤¾à¤¤à¤ƒ à¥®:à¥ªà¥«" or "à¤¸à¤¾à¤¯à¤‚ à¥¬:à¥©à¥¦" */
export function devanagariTimeOfDay(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const suffix = h < 12 ? 'à¤ªà¥à¤°à¤¾à¤¤à¤ƒ' : h < 16 ? 'à¤¦à¤¿à¤‰à¤à¤¸à¥‹' : h < 20 ? 'à¤¸à¤¾à¤¯à¤‚' : 'à¤°à¤¾à¤¤à¥à¤°à¤¿';
  const h12 = h % 12 || 12;
  return `${suffix} ${toDevanagari(h12)}:${toDevanagari(String(m ?? 0).padStart(2, '0'))}`;
}
``````

#### `src\features\report\lib\glyphs.ts`

```typescript
import type { PlanetKey } from '../primitives/GlyphBadge';

export const PLANET_GLYPHS: Record<string, string> = {
  Sun: 'â˜‰',
  Moon: 'â˜½',
  Mars: 'â™‚',
  Mercury: 'â˜¿',
  Jupiter: 'â™ƒ',
  Venus: 'â™€',
  Saturn: 'â™„',
  Rahu: 'â˜Š',
  Ketu: 'â˜‹',
  Ascendant: 'à¤²',
};

export const RASHI_GLYPHS: Record<string, string> = {
  Aries: 'â™ˆ',
  Taurus: 'â™‰',
  Gemini: 'â™Š',
  Cancer: 'â™‹',
  Leo: 'â™Œ',
  Virgo: 'â™',
  Libra: 'â™Ž',
  Scorpio: 'â™',
  Sagittarius: 'â™',
  Capricorn: 'â™‘',
  Aquarius: 'â™’',
  Pisces: 'â™“',
};

export const PLANET_TO_KEY: Record<string, PlanetKey> = {
  Sun: 'Sun',
  Moon: 'Moon',
  Mars: 'Mars',
  Mercury: 'Mercury',
  Jupiter: 'Jupiter',
  Venus: 'Venus',
  Saturn: 'Saturn',
  Rahu: 'Rahu',
  Ketu: 'Ketu',
  Ascendant: 'Ascendant',
};

export const RASHI_LORDS: Record<string, string> = {
  Aries: 'Mars',
  Taurus: 'Venus',
  Gemini: 'Mercury',
  Cancer: 'Moon',
  Leo: 'Sun',
  Virgo: 'Mercury',
  Libra: 'Venus',
  Scorpio: 'Mars',
  Sagittarius: 'Jupiter',
  Capricorn: 'Saturn',
  Aquarius: 'Saturn',
  Pisces: 'Jupiter',
};

export const HOUSE_NAMES_EN: Record<number, string> = {
  1: 'Self',
  2: 'Wealth',
  3: 'Siblings',
  4: 'Home',
  5: 'Children',
  6: 'Enemies',
  7: 'Marriage',
  8: 'Death',
  9: 'Fortune',
  10: 'Career',
  11: 'Gains',
  12: 'Loss',
};
``````

#### `src\features\report\lib\interpretations.ts`

```typescript
export const RASHI_INTERPRETATIONS: Record<string, string> = {
  Aries: 'Cardinal fire. The first spark of will â€” bold, pioneering, direct.',
  Taurus: 'Fixed earth. Steady, sensual, patient â€” an unshakeable grounding in the physical.',
  Gemini: 'Dual air. Quick, curious, communicative â€” a mind always in motion.',
  Cancer: 'Cardinal water. Nurturing, protective, deeply tied to home and mother.',
  Leo: 'Fixed fire. The royal lion â€” proud, generous, radiant in self-expression.',
  Virgo: 'Dual earth. Precise, analytical, healing â€” a mind that refines the world.',
  Libra: 'Cardinal air. Balancing, relational, aesthetic â€” the search for harmony.',
  Scorpio: 'Fixed water. Deep, transformative, intense â€” the alchemist of the zodiac.',
  Sagittarius: 'Dual fire. Seeking, philosophical, expansive â€” the archer aiming at truth.',
  Capricorn: 'Cardinal earth. Disciplined, ambitious, enduring â€” the mountain climber.',
  Aquarius: 'Fixed air. Visionary, humanitarian, unconventional â€” the water-bearer.',
  Pisces: 'Dual water. Compassionate, mystical, dissolving â€” the ocean of the soul.',
};

export const NAKSHATRA_INTERPRETATIONS: Record<string, string> = {
  Ashwini: 'The healer-riders. Swift beginnings, healing, pioneering energy.',
  Bharani: 'The bearer. Creativity, transformation, and the weight of care.',
  Krittika: 'The blade. Sharpness, courage, and purifying fire.',
  Rohini: 'The red one. Beauty, growth, and the fertile earth.',
  Mrigashira: 'The deer. Searching, gentle, ever-seeking sweetness.',
  Ardra: 'The moist one. Storms, tears, and raw emotion.',
  Punarvasu: 'Return of the light. Renewal, generosity, second chances.',
  Pushya: 'The nourisher. Deep care, spirituality, sacred support.',
  Ashlesha: 'The serpent. Coiled wisdom, healing, and hidden power.',
  Magha: 'The ancestors. Lineage, royalty, and inherited strength.',
  'Purva Phalguni': 'The front of the fig. Play, pleasure, and creative delight.',
  'Uttara Phalguni': 'The back of the fig. Nobility, partnership, service.',
  Hasta: 'The hand. Skill, craftsmanship, and healing touch.',
  Chitra: 'The bright jewel. Artistry, design, radiant presence.',
  Swati: 'The sword. Independence, diplomacy, and self-reliant grace.',
  Vishakha: 'The forked branch. Ambition, triumph, determined focus.',
  Anuradha: 'Following Radha. Devotion, friendship, deep loyalty.',
  Jyeshtha: 'The elder. Seniority, protection, hidden strength.',
  Mula: 'The root. Deep investigation, breaking free, spiritual roots.',
  'Purva Ashadha': 'The early victory. Invincible spirit, purifying ambition.',
  'Uttara Ashadha': 'The later victory. Universal victory, quiet strength.',
  Shravana: 'The ear. Listening, learning, sacred knowledge.',
  Dhanishta: 'The drum. Rhythm, prosperity, music of the cosmos.',
  Shatabhisha: 'The hundred healers. Healing, mystery, and vast vision.',
  'Purva Bhadrapada': 'The burning pair. Intense spirituality, fiery depths.',
  'Uttara Bhadrapada': 'The serpent of the deep. Wisdom, detachment, mystical insight.',
  Revati: 'The wealthiest. Nourishment, protection, gentle endings.',
};

/**
 * Narrative paragraph for each of the three anchors.
 * 2-3 sentences describing the essence.
 */
export const ANCHOR_NARRATIVES: Record<string, Record<string, string>> = {
  Lagna: {
    Aries: 'You arrive as fire â€” direct, courageous, a pioneer who moves first and thinks later. The body leads.',
    Taurus: 'You arrive as earth â€” steady, patient, grounded. The bull does not hurry, and does not yield.',
    Gemini: 'You arrive as air â€” curious, quick, communicative. The mind leads the body, always in motion.',
    Cancer: 'You arrive as water â€” nurturing, protective, deeply felt. The body remembers what the mind forgets.',
    Leo: 'You arrive as fire â€” regal, generous, radiant. The world is your stage, and you are here to shine.',
    Virgo: 'You arrive as earth â€” precise, analytical, healing. You refine the world through service.',
    Libra: 'You arrive as air â€” balancing, relational, aesthetic. You seek harmony in every exchange.',
    Scorpio: 'You arrive as water â€” deep, intense, transformative. You are here to die and be reborn.',
    Sagittarius: 'You arrive as fire â€” seeking, philosophical, expansive. The horizon is your home.',
    Capricorn: 'You arrive as earth â€” disciplined, ambitious, enduring. You climb the mountain that others fear.',
    Aquarius: 'You arrive as air â€” visionary, humanitarian, unconventional. You are here for the collective.',
    Pisces: 'You arrive as water â€” compassionate, mystical, dissolving. You remember you are not the body.',
  },
  Chandra: {
    Aries: 'Inside, a warrior. The mind is quick to anger and quick to move. Rest is a discipline you must learn.',
    Taurus: 'Inside, a garden. The mind is calm, steady, and deeply sensual. Emotions arrive slowly but stay.',
    Gemini: 'Inside, a library. The mind is always talking â€” to itself, to others, to the air. Silence is medicine.',
    Cancer: 'Inside, a mother. The mind feels everything deeply. Home is not a place but a feeling.',
    Leo: 'Inside, a king. The mind needs to be seen, admired, and respected. Your heart is both generous and proud.',
    Virgo: 'Inside, a healer. The mind is analytical, self-critical, and always improving. Perfection is a trap.',
    Libra: 'Inside, a mirror. The mind seeks balance, partnership, beauty. You feel most yourself with another.',
    Scorpio: 'Inside, an ocean. The mind is deep, private, transformative. You carry what others cannot.',
    Sagittarius: 'Inside, a wanderer. The mind seeks meaning, philosophy, distant horizons. Faith is your home.',
    Capricorn: 'Inside, an elder. The mind is serious, ambitious, and quietly powerful. You grew up early.',
    Aquarius: 'Inside, a visionary. The mind is different, futuristic, humanitarian. You are here to change things.',
    Pisces: 'Inside, a mystic. The mind dissolves into compassion and imagination. You feel the world\'s pain as your own.',
  },
  Surya: {
    Aries: 'At the core, a pioneer. The soul seeks bold, independent action.',
    Taurus: 'At the core, a builder. The soul seeks stability, beauty, and slow growth.',
    Gemini: 'At the core, a messenger. The soul seeks understanding, communication, connection.',
    Cancer: 'At the core, a caretaker. The soul seeks belonging, protection, and emotional truth.',
    Leo: 'At the core, a sovereign. The soul seeks creative self-expression and dignity.',
    Virgo: 'At the core, a craftsman. The soul seeks perfection, purity, and refined service.',
    Libra: 'At the core, a peacemaker. The soul seeks justice, beauty, and inner harmony.',
    Scorpio: 'At the core, an alchemist. The soul seeks truth at any cost, and rebirth through fire.',
    Sagittarius: 'At the core, a philosopher. The soul seeks meaning, dharma, and the highest knowledge.',
    Capricorn: 'At the core, a ruler. The soul seeks mastery, responsibility, and lasting achievement.',
    Aquarius: 'At the core, a reformer. The soul seeks freedom, equality, and the evolution of consciousness.',
    Pisces: 'At the core, a mystic. The soul seeks union, compassion, and dissolution into the divine.',
  },
};
``````

#### `src\features\report\lib\varga-info.ts`

```typescript
/**
 * Knowledge base for all 20 divisional charts (Vargas).
 * Each entry describes what the chart reveals and how it's used.
 */
export interface VargaInfo {
  code: string;
  name: string;
  sanskrit: string;
  division: string;
  purpose: string;
  summary: string;
  useCases: string[];
}

export const VARGA_INFO: Record<string, VargaInfo> = {
  d1: {
    code: 'D1',
    name: 'Rashi',
    sanskrit: 'à¤°à¤¾à¤¶à¤¿',
    division: '1 division',
    purpose: 'The Body',
    summary:
      'The Rashi chart is the foundation of all Vedic astrology. Each sign is one house, showing the soul in physical form â€” the body, personality, and the life you walk in. Every other divisional chart is a lens on top of this base.',
    useCases: [
      'Overall life direction',
      'Physical body and health',
      'Personal identity and mask',
      'Basic planetary strength',
    ],
  },
  d2: {
    code: 'D2',
    name: 'Hora',
    sanskrit: 'à¤¹à¥‹à¤°à¤¾',
    division: '2 divisions of 15Â°',
    purpose: 'Wealth',
    summary:
      'The Hora splits each sign into two halves â€” one ruled by the Sun, one by the Moon. It reveals the source and nature of wealth in a chart: whether it comes through self-effort (Sun) or through inheritance, care, and connection (Moon).',
    useCases: [
      'Source of wealth',
      'Financial patterns',
      'Sustenance and prosperity',
      'Savings and assets',
    ],
  },
  d3: {
    code: 'D3',
    name: 'Drekkana',
    sanskrit: 'à¤¦à¥à¤°à¥‡à¤•à¥à¤•à¤¾à¤£',
    division: '3 divisions of 10Â°',
    purpose: 'Siblings',
    summary:
      'The Drekkana shows siblings, co-borns, and short journeys. It also reveals communication and immediate community â€” the people you grow up alongside.',
    useCases: [
      'Siblings and cousins',
      'Neighborhood and locality',
      'Courage and initiative',
      'Short-distance travel',
    ],
  },
  d4: {
    code: 'D4',
    name: 'Chaturthamsa',
    sanskrit: 'à¤šà¤¤à¥à¤°à¥à¤¥à¤¾à¤‚à¤¶',
    division: '4 divisions of 7Â°30â€²',
    purpose: 'Property',
    summary:
      'The Chaturthamsa reveals landed property, homes, and fixed assets. It shows what you own and where you settle â€” the physical and emotional foundations of life.',
    useCases: [
      'Real estate',
      'Home and land',
      'Vehicles',
      'Domestic happiness',
    ],
  },
  d5: {
    code: 'D5',
    name: 'Panchamsa',
    sanskrit: 'à¤ªà¤žà¥à¤šà¤®à¤¾à¤‚à¤¶',
    division: '5 divisions of 6Â°',
    purpose: 'Fame',
    summary:
      'The Panchamsa reveals fame, authority, and the capacity for influence. It is used in classical Jyotish to determine whether a native attains renown.',
    useCases: [
      'Public reputation',
      'Political or social power',
      'Recognition and honours',
    ],
  },
  d6: {
    code: 'D6',
    name: 'Shashthamsa',
    sanskrit: 'à¤·à¤·à¥à¤ à¤¾à¤‚à¤¶',
    division: '6 divisions of 5Â°',
    purpose: 'Health',
    summary:
      'The Shashthamsa is the health chart. It reveals physical vitality, disease proneness, and the specific areas of the body that need care.',
    useCases: [
      'Physical health',
      'Disease diagnosis',
      'Vitality and recovery',
    ],
  },
  d7: {
    code: 'D7',
    name: 'Saptamsa',
    sanskrit: 'à¤¸à¤ªà¥à¤¤à¤¾à¤‚à¤¶',
    division: '7 divisions of 4Â°17â€²',
    purpose: 'Children',
    summary:
      'The Saptamsa is the primary chart for progeny â€” whether children come, their nature, and the native\'s relationship with them.',
    useCases: [
      'Children and fertility',
      'Lineage and descendants',
      'Creative legacy',
    ],
  },
  d8: {
    code: 'D8',
    name: 'Ashtamsa',
    sanskrit: 'à¤…à¤·à¥à¤Ÿà¤¾à¤‚à¤¶',
    division: '8 divisions of 3Â°45â€²',
    purpose: 'Sudden Events',
    summary:
      'The Ashtamsa reveals sudden events â€” accidents, scandals, litigation, and unexpected changes. A difficult but important chart for timing crises.',
    useCases: [
      'Sudden gains or losses',
      'Accidents and injuries',
      'Litigation and disputes',
    ],
  },
  d9: {
    code: 'D9',
    name: 'Navamsha',
    sanskrit: 'à¤¨à¤µà¤¾à¤‚à¤¶',
    division: '9 divisions of 3Â°20â€²',
    purpose: 'Marriage & Dharma',
    summary:
      'The Navamsha is the most important divisional chart after the D1. It divides each sign into nine parts, revealing the soul\'s deeper purpose, the quality of marriage, and the true inner strength of every planet. A planet in the same sign in D1 and D9 is "Vargottama" â€” exceptionally strong.',
    useCases: [
      'Marriage and partnership',
      'Soul purpose and dharma',
      'Inner strength of planets',
      'Late-life direction',
    ],
  },
  d10: {
    code: 'D10',
    name: 'Dashamsha',
    sanskrit: 'à¤¦à¤¶à¤¾à¤‚à¤¶',
    division: '10 divisions of 3Â°',
    purpose: 'Career',
    summary:
      'The Dashamsha is the career chart. It reveals profession, public role, professional achievements, and how the native is seen in the outer world.',
    useCases: [
      'Career and profession',
      'Public standing',
      'Professional reputation',
      'Nature of work',
    ],
  },
  d11: {
    code: 'D11',
    name: 'Rudramsa',
    sanskrit: 'à¤°à¥à¤¦à¥à¤°à¤¾à¤‚à¤¶',
    division: '11 divisions of 2Â°43â€²',
    purpose: 'Gains',
    summary:
      'The Rudramsa (or Ekadashamsha) reveals gains, income, and the fulfilment of desires. A rarer chart, studied for its insight into what the native truly gains in life.',
    useCases: [
      'Income streams',
      'Fulfilment of desires',
      'Rewards and benefits',
    ],
  },
  d12: {
    code: 'D12',
    name: 'Dwadashamsha',
    sanskrit: 'à¤¦à¥à¤µà¤¾à¤¦à¤¶à¤¾à¤‚à¤¶',
    division: '12 divisions of 2Â°30â€²',
    purpose: 'Parents',
    summary:
      'The Dwadashamsha reveals the native\'s parents â€” their nature, influence, and the karmic inheritance from them.',
    useCases: [
      'Father and mother',
      'Ancestral karma',
      'Family lineage',
    ],
  },
  d16: {
    code: 'D16',
    name: 'Shodashamsha',
    sanskrit: 'à¤·à¥‹à¤¡à¤¶à¤¾à¤‚à¤¶',
    division: '16 divisions of 1Â°52â€²',
    purpose: 'Vehicles',
    summary:
      'The Shodashamsha reveals vehicles, conveyances, and general comforts. It also shows the source of happiness and pleasure in life.',
    useCases: [
      'Vehicles and transport',
      'Comforts and pleasures',
      'Luxury and enjoyment',
    ],
  },
  d20: {
    code: 'D20',
    name: 'Vimshamsha',
    sanskrit: 'à¤µà¤¿à¤‚à¤¶à¤¾à¤‚à¤¶',
    division: '20 divisions of 1Â°30â€²',
    purpose: 'Spirituality',
    summary:
      'The Vimshamsha is the spiritual chart. It reveals the native\'s path of devotion, meditation, and connection to the divine. An essential chart for those on the inner journey.',
    useCases: [
      'Spiritual practice',
      'Devotion and meditation',
      'Relationship to the divine',
      'Moksha (liberation)',
    ],
  },
  d24: {
    code: 'D24',
    name: 'Siddhamsha',
    sanskrit: 'à¤¸à¤¿à¤¦à¥à¤§à¤¾à¤‚à¤¶',
    division: '24 divisions of 1Â°15â€²',
    purpose: 'Education',
    summary:
      'The Siddhamsha (or Chaturvimshamsha) is the education chart. It reveals learning capacity, academic success, and the specific fields of knowledge the native excels in.',
    useCases: [
      'Education and learning',
      'Academic success',
      'Fields of expertise',
      'Intellectual gifts',
    ],
  },
  d27: {
    code: 'D27',
    name: 'Bhamsha',
    sanskrit: 'à¤­à¤¾à¤‚à¤¶',
    division: '27 divisions of 1Â°07â€²',
    purpose: 'Strengths',
    summary:
      'The Bhamsha (or Saptavimshamsha) reveals the native\'s general strengths, weaknesses, and stamina. It is used to check the overall vitality of the chart.',
    useCases: [
      'Strengths and weaknesses',
      'Stamina and endurance',
      'Overall vitality',
    ],
  },
  d30: {
    code: 'D30',
    name: 'Trimshamsha',
    sanskrit: 'à¤¤à¥à¤°à¤¿à¤‚à¤¶à¤¾à¤‚à¤¶',
    division: '30 divisions of 1Â°',
    purpose: 'Misfortunes',
    summary:
      'The Trimshamsha reveals misfortunes, evils, and the specific karmic challenges in life. A challenging but diagnostic chart.',
    useCases: [
      'Challenges and obstacles',
      'Karmic debts',
      'Sources of suffering',
    ],
  },
  d40: {
    code: 'D40',
    name: 'Khavedamsha',
    sanskrit: 'à¤–à¤µà¥‡à¤¦à¤¾à¤‚à¤¶',
    division: '40 divisions of 45â€²',
    purpose: 'Maternal',
    summary:
      'The Khavedamsha reveals the influences of the mother\'s lineage and maternal karma.',
    useCases: [
      'Maternal legacy',
      'Mother\'s influence',
      'Inherited traits',
    ],
  },
  d45: {
    code: 'D45',
    name: 'Akshavedamsha',
    sanskrit: 'à¤…à¤•à¥à¤·à¤µà¥‡à¤¦à¤¾à¤‚à¤¶',
    division: '45 divisions of 40â€²',
    purpose: 'Paternal',
    summary:
      'The Akshavedamsha reveals the influences of the father\'s lineage and paternal karma.',
    useCases: [
      'Paternal legacy',
      'Father\'s influence',
      'Ancestral strengths',
    ],
  },
  d60: {
    code: 'D60',
    name: 'Shashtiamsha',
    sanskrit: 'à¤·à¤·à¥à¤Ÿà¥à¤¯à¤‚à¤¶',
    division: '60 divisions of 30â€²',
    purpose: 'Karma',
    summary:
      'The Shashtiamsha is the most subtle divisional chart. It reveals the finest details of the native\'s karma â€” the specific past-life impressions that shape this life. Considered by many to be the most important chart after D1 and D9.',
    useCases: [
      'Past-life karma',
      'Deepest life tendencies',
      'Subtle destiny patterns',
    ],
  },
};

export const VARGA_ORDER = [
  'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10',
  'd11', 'd12', 'd16', 'd20', 'd24', 'd27', 'd30', 'd40', 'd45', 'd60',
];
``````

#### `src\features\report\primitives\AttributeBadge.tsx`

```tsx
export type BadgeTone = 'neutral' | 'positive' | 'warning' | 'negative' | 'info';

interface AttributeBadgeProps {
  children: string;
  tone?: BadgeTone;
  className?: string;
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'bg-muted/60 text-muted-foreground',
  positive: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  negative: 'bg-red-500/10 text-red-600 dark:text-red-400',
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
};

export function AttributeBadge({
  children,
  tone = 'neutral',
  className,
}: AttributeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium ${TONE_CLASSES[tone]} ${className ?? ''}`}
    >
      {children}
    </span>
  );
}
``````

#### `src\features\report\primitives\GlyphBadge.tsx`

```tsx
import { REPORT_TOKENS } from '../tokens';

export type PlanetKey = keyof typeof REPORT_TOKENS.planetColors;

interface GlyphBadgeProps {
  /** Unicode glyph: â˜‰ â˜½ â™‚ â˜¿ â™ƒ â™€ â™„ â˜Š â˜‹ */
  glyph: string;
  /** Which planet's traditional color to use */
  planet?: PlanetKey;
  /** Size in px */
  size?: number;
  /** Show colored background */
  filled?: boolean;
  /** Highlight with gold ring (for Ascendant, Lagna, etc.) */
  highlight?: boolean;
  className?: string;
  title?: string;
}

/**
 * A circular badge displaying a Unicode astrological glyph
 * in its traditional Jyotish color.
 */
export function GlyphBadge({
  glyph,
  planet = 'Ascendant',
  size = 32,
  filled = false,
  highlight = false,
  className,
  title,
}: GlyphBadgeProps) {
  const color = REPORT_TOKENS.planetColors[planet] ?? '#666';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-full ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        color: filled ? '#fff' : color,
        background: filled ? color : `${color}18`,
        border: highlight ? `1.5px solid ${REPORT_TOKENS.accentGold}` : 'none',
        boxShadow: highlight
          ? `0 0 0 3px ${REPORT_TOKENS.accentGold}22`
          : undefined,
        fontSize: size * 0.55,
        lineHeight: 1,
        fontFamily: 'Noto Sans Symbols 2, system-ui, sans-serif',
      }}
      title={title}
      aria-label={title}
      role={title ? 'img' : undefined}
    >
      {glyph}
    </span>
  );
}
``````

#### `src\features\report\primitives\index.ts`

```typescript
export { Section } from './Section';
export { ReportPage } from './ReportPage';
export { OrnamentalDivider } from './OrnamentalDivider';
export { InfoRow } from './InfoRow';
export { InfoTile } from './InfoTile';
export { GlyphBadge } from './GlyphBadge';
export { AttributeBadge } from './AttributeBadge';
``````

#### `src\features\report\primitives\InfoRow.tsx`

```tsx
interface InfoRowProps {
  label: string;
  value: string;
  accent?: boolean;
  mono?: boolean;
  className?: string;
}

export function InfoRow({
  label,
  value,
  accent = false,
  mono = false,
  className,
}: InfoRowProps) {
  return (
    <p className={`flex justify-between gap-3 ${className ?? ''}`}>
      <span className="text-muted-foreground">{label}</span>
      <strong
        className={`${accent ? 'text-primary' : ''} ${mono ? 'font-mono text-xs' : ''} text-right`}
      >
        {value}
      </strong>
    </p>
  );
}
``````

#### `src\features\report\primitives\InfoTile.tsx`

```tsx
interface InfoTileProps {
  label: string;
  value: string;
  subtitle?: string;
  progress?: number;
  accent?: boolean;
  className?: string;
}

export function InfoTile({
  label,
  value,
  subtitle,
  progress,
  accent = false,
  className,
}: InfoTileProps) {
  return (
    <div
      className={`flex flex-col gap-1 p-4 rounded-lg border bg-card/60 ${className ?? ''}`}
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </p>
      <p
        className={`font-semibold leading-tight ${accent ? 'text-primary' : 'text-foreground'}`}
        style={{ fontSize: '1.05rem' }}
      >
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground leading-snug">{subtitle}</p>
      )}
      {progress !== undefined && (
        <div className="mt-1.5 space-y-1">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-right font-mono">
            {progress.toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}
``````

#### `src\features\report\primitives\OrnamentalDivider.tsx`

```tsx
export function OrnamentalDivider({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 my-10 select-none ${className ?? ''}`}
      aria-hidden="true"
    >
      <span
        className="h-px flex-1 max-w-[200px]"
        style={{
          background: 'linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), transparent)',
        }}
      />
      <span
        className="text-primary/50"
        style={{ fontSize: '11px', lineHeight: 1 }}
      >
        âœ¦
      </span>
      <span
        className="h-px flex-1 max-w-[200px]"
        style={{
          background: 'linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), transparent)',
        }}
      />
    </div>
  );
}
``````

#### `src\features\report\primitives\ReportPage.tsx`

```tsx
import type { ReactNode } from 'react';

export interface ReportPageProps {
  children: ReactNode;
  maxWidth?: string;
}

export function ReportPage({ children, maxWidth = '900px' }: ReportPageProps) {
  return (
    <div className="w-full flex justify-center px-4 md:px-6 py-6">
      <div className="w-full space-y-2" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
``````

#### `src\features\report\primitives\Section.tsx`

```tsx
import type { ReactNode } from 'react';

interface SectionProps {
  eyebrow?: string;
  title: string;
  hint?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({
  eyebrow,
  title,
  hint,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <section className={`space-y-5 ${className ?? ''}`}>
      <header className="space-y-2">
        {eyebrow && (
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-semibold"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {eyebrow}
          </p>
        )}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontFamily: "'Crimson Pro', 'Noto Serif Devanagari', Georgia, serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.15,
            }}
          >
            {title}
          </h2>
          {action}
        </div>
        {hint && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {hint}
          </p>
        )}
      </header>

      <div>{children}</div>
    </section>
  );
}
``````

#### `src\features\report\sections\AdvancedSection.tsx`

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AdvancedSectionProps {
  kundli: Record<string, any>;
}

export function AdvancedSection({ kundli }: AdvancedSectionProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const vargaKeys = Object.keys(kundli.vargas ?? {}).filter((k) => k !== 'd1');
  const kpCusps = kundli.kp?.cusps ?? [];
  const chalitPlanets = kundli.chalit?.planets ?? [];

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/40 transition-colors"
      >
        <span className="text-sm font-semibold">
          {open
            ? t('advanced.hide', { defaultValue: 'Hide advanced analysis' })
            : t('advanced.show', { defaultValue: 'Show advanced analysis' })}
        </span>
        <span className="text-muted-foreground">{open ? 'â–´' : 'â–¾'}</span>
      </button>

      {open && (
        <div className="p-4 space-y-6 border-t">
          {/* Vargas */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
              {t('advanced.vargas', { defaultValue: 'Divisional Charts' })} ({vargaKeys.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {vargaKeys.map((k) => (
                <span
                  key={k}
                  className="inline-flex items-center px-2 py-1 rounded text-[10px] font-mono uppercase bg-muted/60 text-muted-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* KP cusps */}
          {kpCusps.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                {t('advanced.kp', { defaultValue: 'KP House Cusps' })}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-muted-foreground border-b">
                      <th className="text-left py-1.5 font-medium">H</th>
                      <th className="text-left py-1.5 font-medium">Rashi</th>
                      <th className="text-left py-1.5 font-medium">Nakshatra</th>
                      <th className="text-left py-1.5 font-medium">Sub Lord</th>
                      <th className="text-left py-1.5 font-medium">Sub-Sub</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpCusps.map((c: any) => (
                      <tr key={c.houseNumber} className="border-b last:border-none">
                        <td className="py-1.5 font-mono">{c.houseNumber}</td>
                        <td className="py-1.5">{c.rashiName}</td>
                        <td className="py-1.5 text-muted-foreground">{c.nakshatraName}</td>
                        <td className="py-1.5 font-medium">{c.subLord}</td>
                        <td className="py-1.5 text-muted-foreground">{c.subSubLord}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Chalit */}
          {chalitPlanets.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                {t('advanced.chalit', { defaultValue: 'Bhava Chalit' })}
              </p>
              <div className="space-y-1">
                {chalitPlanets.map((p: any) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between text-xs py-1 border-b last:border-none"
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="text-muted-foreground">
                      Rashi H{p.rashiHouse} â†’ Chalit H{p.house}
                      {p.shifted !== 0 && (
                        <span className="ml-2 text-amber-600 dark:text-amber-400">
                          {p.shifted > 0 ? 'shifted forward' : 'shifted back'}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
``````

#### `src\features\report\sections\AspectsSection.tsx`

```tsx
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PLANET_GLYPHS } from '../lib/glyphs';
import {
  ASPECT_RULES,
  ASPECT_TYPE_LABEL,
  ASPECT_TYPE_MEANING,
} from '../lib/aspect-info';

interface AspectsSectionProps {
  kundli: Record<string, any>;
}

const PLANET_ORDER = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter',
  'Venus', 'Saturn', 'Rahu', 'Ketu',
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const HOUSE_NAMES: Record<number, string> = {
  1: 'Self', 2: 'Wealth', 3: 'Siblings', 4: 'Home',
  5: 'Children', 6: 'Enemies', 7: 'Marriage', 8: 'Transform',
  9: 'Fortune', 10: 'Career', 11: 'Gains', 12: 'Loss',
};

export function AspectsSection({ kundli }: AspectsSectionProps) {
  const { t } = useTranslation();
  const dr = kundli.drishti ?? {};
  const planetAspects = dr.planetAspects ?? {};
  const mutual = dr.mutualAspects ?? [];

  // Build a matrix: planet -> set of houses it aspects
  const aspectMatrix = useMemo(() => {
    const matrix: Record<string, Set<number>> = {};
    for (const planet of PLANET_ORDER) {
      const a = planetAspects[planet];
      matrix[planet] = new Set(
        (a?.aspectedHouses ?? []).map((h: any) => h.house)
      );
    }
    return matrix;
  }, [planetAspects]);

  if (Object.keys(planetAspects).length === 0 && mutual.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground text-sm border border-dashed rounded-lg">
        {t('aspects.noData', { defaultValue: 'Aspect data is not available for this chart.' })}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/*  INTRODUCTION                                        */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-4">
        <div>
          <h3
            className="text-xl font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.whatIsTitle', { defaultValue: 'What is Graha Drishti?' })}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-3xl">
            {t('aspects.whatIsBody', {
              defaultValue:
                'In Vedic astrology, every planet casts its glance â€” its drishti â€” on other houses of the chart. This is not mere influence; it is the planet\'s way of reaching out, examining, and modifying whatever it sees. Aspect is one of the most powerful tools for understanding how a chart actually functions. A planet is not only defined by where it sits, but by what it looks at.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.ruleLabel', { defaultValue: 'Rule' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              Every planet has a <strong>7th-house aspect</strong> â€” the full opposite house.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.special', { defaultValue: 'Special' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              <strong>Mars</strong>, <strong>Jupiter</strong>, and <strong>Saturn</strong> have extra aspects. Rahu and Ketu mirror Jupiter.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.strength', { defaultValue: 'Strength' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              <strong>7th</strong> is the strongest. <strong>3rd/10th</strong> are the mildest. Grahas aspect the exact degree of a point.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.why', { defaultValue: 'Why it matters' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              Aspects tell you <strong>who is watching whom</strong> â€” and that interaction shapes what actually happens.
            </p>
          </div>
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/*  THE ASPECT RULES TABLE                              */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.rulesTitle', { defaultValue: 'Classical Aspect Rules' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('aspects.rulesHint', {
              defaultValue: 'Every planet has aspects. Some have special ones.',
            })}
          </p>
        </div>

        <div className="divide-y">
          {ASPECT_RULES.map((rule) => {
            const hasSpecial = rule.houses.length > 1;
            return (
              <div
                key={rule.planet}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3"
              >
                {/* Planet */}
                <div className="flex items-center gap-2 min-w-[110px]">
                  <span
                    className="text-xl leading-none"
                    style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                  >
                    {PLANET_GLYPHS[rule.planet] ?? 'Â·'}
                  </span>
                  <strong className="text-sm">{rule.planet}</strong>
                </div>

                {/* Aspect houses */}
                <div className="flex flex-wrap gap-1.5">
                  {rule.houses.map((h) => (
                    <span
                      key={h}
                      className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded font-mono ${
                        hasSpecial
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted/60 text-muted-foreground'
                      }`}
                    >
                      {h}
                      {h === 1 ? 'st' : h === 2 ? 'nd' : h === 3 ? 'rd' : 'th'}
                    </span>
                  ))}
                </div>

                {/* Meaning */}
                <p className="text-xs text-muted-foreground hidden md:block max-w-[200px] text-right">
                  {rule.meaning}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/*  ASPECT MATRIX â€” visual overview                     */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.matrixTitle', { defaultValue: 'Aspect Matrix' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('aspects.matrixHint', {
              defaultValue:
                'Which planets aspect which houses in this chart. Dots mark active aspects.',
            })}
          </p>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header row â€” houses */}
            <div className="grid" style={{ gridTemplateColumns: '110px repeat(12, minmax(34px, 1fr))' }}>
              <div />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                <div
                  key={h}
                  className="text-center text-[10px] font-mono text-muted-foreground pb-2"
                >
                  H{h}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {PLANET_ORDER.map((planet) => {
              const a = planetAspects[planet];
              if (!a) return null;
              const houses = aspectMatrix[planet];

              return (
                <div
                  key={planet}
                  className="grid items-center"
                  style={{ gridTemplateColumns: '110px repeat(12, minmax(34px, 1fr))' }}
                >
                  {/* Planet label */}
                  <div className="flex items-center gap-2 py-1.5">
                    <span
                      className="text-base leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[planet] ?? 'Â·'}
                    </span>
                    <span className="text-xs font-medium">{planet}</span>
                  </div>

                  {/* Aspect cells */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                    const isAspected = houses.has(h);
                    return (
                      <div
                        key={h}
                        className="flex items-center justify-center py-1.5"
                      >
                        {isAspected ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        ) : (
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/15" />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Legend */}
            <div className="flex items-center gap-4 pt-3 mt-3 border-t text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                Aspect active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                No aspect
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/*  MUTUAL ASPECTS â€” most significant pairs             */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {mutual.length > 0 && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <h3
              className="text-base font-bold leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {t('aspects.mutualTitle', { defaultValue: 'Mutual Aspects' })}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-1">
              {t('aspects.mutualHint', {
                defaultValue:
                  'The most significant connections â€” two planets looking at each other.',
              })}
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mutual.map((m: any, i: number) => (
              <div
                key={i}
                className="rounded-xl border border-primary/30 bg-primary/[0.04] p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[m.planet1] ?? 'Â·'}
                    </span>
                    <strong className="text-sm">{m.planet1}</strong>
                  </div>
                  <span className="text-primary text-lg">â†”</span>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm">{m.planet2}</strong>
                    <span
                      className="text-xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[m.planet2] ?? 'Â·'}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground text-center">
                  {m.planet1AspectOnPlanet2} â†” {m.planet2AspectOnPlanet1}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/*  PER-PLANET DETAIL CARDS                             */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="space-y-4">
        <div>
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.detailTitle', { defaultValue: 'Planet-by-Planet' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('aspects.detailHint', {
              defaultValue: 'What each planet looks at, and what it means.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PLANET_ORDER.map((planet) => {
            const a = planetAspects[planet];
            if (!a) return null;
            const houses = a.aspectedHouses ?? [];
            const planets = a.aspectedPlanets ?? [];
            if (houses.length === 0 && planets.length === 0) return null;

            return (
              <div
                key={planet}
                className="rounded-xl border bg-card p-4 space-y-3"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-2xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[planet] ?? 'Â·'}
                    </span>
                    <div>
                      <p className="text-sm font-bold leading-tight">{planet}</p>
                      <p className="text-[10px] text-muted-foreground">
                        House {a.sourceHouse}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Houses aspected */}
                {houses.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Aspects houses
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {houses.map((h: any, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-1 rounded bg-primary/10 text-primary"
                          title={ASPECT_TYPE_MEANING[h.type]}
                        >
                          H{h.house}
                          <span className="opacity-60 ml-1">({h.type})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Planets aspected */}
                {planets.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Aspects planets
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {planets.map((p: any, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-1 rounded bg-muted/60 text-foreground/85"
                        >
                          {PLANET_GLYPHS[p.planet] ?? ''} {p.planet}
                          <span className="opacity-60 ml-1">({p.type})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
``````

#### `src\features\report\sections\BhavaSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { RASHI_GLYPHS, RASHI_LORDS, PLANET_GLYPHS, HOUSE_NAMES_EN } from '../lib/glyphs';

interface BhavaSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const HOUSE_CATEGORY: Record<number, 'kendra' | 'trikona' | 'dusthana' | 'neutral'> = {
  1: 'kendra', 2: 'neutral', 3: 'neutral', 4: 'kendra',
  5: 'trikona', 6: 'dusthana', 7: 'kendra', 8: 'dusthana',
  9: 'trikona', 10: 'kendra', 11: 'neutral', 12: 'dusthana',
};

const CATEGORY_BG: Record<string, string> = {
  kendra: 'bg-amber-500/[0.04] border-amber-500/20',
  trikona: 'bg-emerald-500/[0.04] border-emerald-500/20',
  dusthana: 'bg-red-500/[0.04] border-red-500/20',
  neutral: 'bg-card',
};

export function BhavaSection({ kundli }: BhavaSectionProps) {
  const { t } = useTranslation();
  const houses = kundli.houses ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {houses.map((h: any) => {
        const rashiName = rashiNameFromNumber(h.rashi);
        const rashiGlyph = RASHI_GLYPHS[rashiName] ?? 'Â·';
        const rashiLord = RASHI_LORDS[rashiName] ?? 'â€”';
        const category = HOUSE_CATEGORY[h.number] ?? 'neutral';

        return (
          <article
            key={h.number}
            className={`rounded-lg border p-4 space-y-2 ${CATEGORY_BG[category]}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="text-lg font-bold leading-none"
                  style={{ fontFamily: 'Crimson Pro, Georgia, serif' }}
                >
                  {ROMAN[h.number - 1]}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  {t(`houseNames.${h.number}`, { defaultValue: HOUSE_NAMES_EN[h.number] })}
                </p>
              </div>
              <span className="text-2xl opacity-60">{rashiGlyph}</span>
            </div>

            <div className="space-y-1 pt-2 border-t border-border/40">
              <p className="text-xs">
                <strong className="text-primary">{rashiName}</strong>
              </p>
              <p className="text-[11px] text-muted-foreground">
                {t('bhava.lord', { defaultValue: 'Lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[rashiLord]} {rashiLord}
                </strong>
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 min-h-[3rem]">
              {h.planets?.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {h.planets.map((p: string) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary"
                    >
                      {PLANET_GLYPHS[p] ?? ''} {p}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-muted-foreground italic">
                  {t('bhava.empty', { defaultValue: 'Empty' })}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

function rashiNameFromNumber(n: number | undefined): string {
  if (!n || n < 1 || n > 12) return 'â€”';
  return RASHI_NAMES[n - 1];
}
``````

#### `src\features\report\sections\CoreIdentitySection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS, RASHI_GLYPHS, RASHI_LORDS } from '../lib/glyphs';
import {
  RASHI_INTERPRETATIONS,
  NAKSHATRA_INTERPRETATIONS,
} from '../lib/interpretations';

interface CoreIdentitySectionProps {
  kundli: Record<string, any>;
}

function formatDegree(deg?: number, min?: number, sec?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  const s = sec ?? 0;
  return `${d}Â° ${String(m).padStart(2, '0')}â€² ${String(s).padStart(2, '0')}â€³`;
}

export function CoreIdentitySection({ kundli }: CoreIdentitySectionProps) {
  const { t } = useTranslation();

  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const sun = kundli.planets?.Sun ?? {};

  const cards = [
    {
      key: 'lagna',
      title: t('coreIdentity.lagna', { defaultValue: 'Lagna' }),
      subtitle: t('coreIdentity.lagnaSub', { defaultValue: 'The mask you wear to the world' }),
      planet: asc,
      planetKey: 'Ascendant',
      showNakshatraLord: true,
    },
    {
      key: 'chandra',
      title: t('coreIdentity.chandra', { defaultValue: 'Chandra (Moon)' }),
      subtitle: t('coreIdentity.chandraSub', { defaultValue: 'The mind and inner world' }),
      planet: moon,
      planetKey: 'Moon',
      showNakshatraLord: true,
    },
    {
      key: 'surya',
      title: t('coreIdentity.surya', { defaultValue: 'Surya (Sun)' }),
      subtitle: t('coreIdentity.suryaSub', { defaultValue: 'The soul and father principle' }),
      planet: sun,
      planetKey: 'Sun',
      showNakshatraLord: true,
    },
  ];

  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const p = card.planet;
        const rashiName = p.rashiName ?? 'â€”';
        const rashiGlyph = RASHI_GLYPHS[rashiName] ?? 'Â·';
        const rashiLord = RASHI_LORDS[rashiName] ?? 'â€”';
        const nakshatra = p.nakshatra ?? 'â€”';
        const nakshatraLord = p.nakshatraLord ?? 'â€”';
        const interpretation =
          RASHI_INTERPRETATIONS[rashiName] ?? '';
        const nakshatraInterp =
          NAKSHATRA_INTERPRETATIONS[nakshatra] ?? '';

        return (
          <article
            key={card.key}
            className="rounded-xl border bg-card p-5 space-y-4"
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  {card.title}
                </p>
                <p className="text-xs text-muted-foreground italic mt-0.5">
                  {card.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <GlyphBadge
                  glyph={rashiGlyph}
                  planet={card.planetKey as any}
                  size={36}
                  highlight={card.key === 'lagna'}
                  title={rashiName}
                />
                <span className="text-base font-semibold">{rashiName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-xs">
              <Field
                label={t('coreIdentity.position', { defaultValue: 'Position' })}
                value={formatDegree(p.degree, p.minute, p.second)}
                mono
              />
              <Field
                label={t('coreIdentity.nakshatra', { defaultValue: 'Nakshatra' })}
                value={`${nakshatra} ${p.pada ?? ''}`}
              />
              <Field
                label={t('coreIdentity.rashiLord', { defaultValue: 'Rashi Lord' })}
                value={rashiLord}
                glyph={PLANET_GLYPHS[rashiLord]}
              />
              {card.showNakshatraLord && (
                <Field
                  label={t('coreIdentity.nakshatraLord', { defaultValue: 'Nakshatra Lord' })}
                  value={nakshatraLord}
                  glyph={PLANET_GLYPHS[nakshatraLord]}
                />
              )}
            </div>

            {interpretation && (
              <div className="pt-3 border-t border-border/50 space-y-2">
                <p className="text-xs leading-relaxed text-foreground/90">
                  <span className="font-semibold text-primary">{rashiName}: </span>
                  {interpretation}
                </p>
                {nakshatraInterp && (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{nakshatra}: </span>
                    {nakshatraInterp}
                  </p>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  glyph,
}: {
  label: string;
  value: string;
  mono?: boolean;
  glyph?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`mt-0.5 flex items-center gap-1.5 ${mono ? 'font-mono' : ''}`}>
        {glyph && <span className="text-sm opacity-70">{glyph}</span>}
        <span className="font-medium">{value}</span>
      </p>
    </div>
  );
}
``````

#### `src\features\report\sections\DashaSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS } from '../lib/glyphs';

interface DashaSectionProps {
  kundli: Record<string, any>;
}

function fmtDate(iso?: string): string {
  if (!iso) return 'â€”';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function DashaSection({ kundli }: DashaSectionProps) {
  const { t } = useTranslation();
  const dasha = kundli.dasha ?? {};
  const mahadashas = dasha.mahadashas ?? [];
  const current = dasha.currentMahadasha;
  const antar = dasha.currentAntar;
  const pratyantar = dasha.currentPratyantar;

  const now = Date.now();
  const lifeStart = mahadashas[0]?.startTime
    ? new Date(mahadashas[0].startTime).getTime()
    : now;
  const lifeEnd = mahadashas[mahadashas.length - 1]?.endTime
    ? new Date(mahadashas[mahadashas.length - 1].endTime).getTime()
    : now + 365 * 24 * 60 * 60 * 1000;
  const lifeSpan = Math.max(1, lifeEnd - lifeStart);

  return (
    <div className="space-y-6">
      {/* Current period */}
      {current && (
        <article className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 space-y-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            {t('dasha.currentlyIn', { defaultValue: 'Currently in' })}
          </p>
          <div className="flex items-center gap-4">
            <GlyphBadge
              glyph={PLANET_GLYPHS[current.planet] ?? 'Â·'}
              planet={current.planet}
              size={48}
              filled
            />
            <div>
              <p className="text-xl font-bold leading-tight">
                {current.planet} {t('dasha.mahadasha', { defaultValue: 'Mahadasha' })}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                {fmtDate(current.startTime)} â†’ {fmtDate(current.endTime)}
              </p>
            </div>
          </div>
          {typeof current.progressPercent === 'number' && (
            <div className="space-y-1">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${Math.min(100, current.progressPercent)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right font-mono">
                {current.progressPercent.toFixed(1)}% {t('dasha.complete', { defaultValue: 'complete' })}
              </p>
            </div>
          )}

          {/* Sub-periods */}
          <div className="pt-3 border-t border-primary/20 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {antar && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t('dasha.antardasha', { defaultValue: 'Antardasha' })}
                </p>
                <p className="font-semibold mt-0.5">
                  {PLANET_GLYPHS[antar.planet]} {antar.planet}
                </p>
                <p className="text-muted-foreground font-mono text-[11px]">
                  {fmtDate(antar.startTime)} â†’ {fmtDate(antar.endTime)}
                </p>
              </div>
            )}
            {pratyantar && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t('dasha.pratyantar', { defaultValue: 'Pratyantar' })}
                </p>
                <p className="font-semibold mt-0.5">
                  {PLANET_GLYPHS[pratyantar.planet]} {pratyantar.planet}
                </p>
                <p className="text-muted-foreground font-mono text-[11px]">
                  {fmtDate(pratyantar.startTime)} â†’ {fmtDate(pratyantar.endTime)}
                </p>
              </div>
            )}
          </div>
        </article>
      )}

      {/* Life timeline */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-3">
          {t('dasha.timeline', { defaultValue: 'Life Timeline' })}
        </p>
        <div className="space-y-1.5">
          {mahadashas.map((md: any) => {
            const start = new Date(md.startTime).getTime();
            const end = new Date(md.endTime).getTime();
            const leftPct = ((start - lifeStart) / lifeSpan) * 100;
            const widthPct = ((end - start) / lifeSpan) * 100;
            const isCurrent = current && md.planet === current.planet && md.startTime === current.startTime;

            return (
              <div key={md.planet + md.startTime} className="flex items-center gap-2 text-xs">
                <div className="w-24 shrink-0 font-medium">
                  {PLANET_GLYPHS[md.planet]} {md.planet}
                </div>
                <div className="flex-1 h-5 bg-muted/40 rounded relative overflow-hidden">
                  <div
                    className={`absolute h-full rounded ${isCurrent ? 'bg-primary' : 'bg-foreground/25'}`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  />
                  {isCurrent && (
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                      NOW
                    </span>
                  )}
                </div>
                <div className="w-28 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                  {new Date(md.startTime).getFullYear()} â†’ {new Date(md.endTime).getFullYear()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
``````

#### `src\features\report\sections\DivisionalChartsSection.tsx`

```tsx
import { useMemo, useState } from 'react';
import { VedicChart } from '@/features/chart/components/VedicChart';
import { buildChartHouses, buildVargaHouses } from '@/features/chart/lib/adapters';
import { VARGA_INFO, VARGA_ORDER } from '../lib/varga-info';
import { cn } from '@/lib/utils';

interface DivisionalChartsSectionProps {
  kundli: Record<string, any>;
}

export function DivisionalChartsSection({ kundli }: DivisionalChartsSectionProps) {
  const [activeVarga, setActiveVarga] = useState<string>('d9');

  const availableVargas = useMemo(() => {
    const present = Object.keys(kundli.vargas ?? {});
    return VARGA_ORDER.filter((v) => v === 'd1' || present.includes(v));
  }, [kundli]);

  const abbrResolver = useMemo(
    () => (planet: string) => {
      if (planet === 'Ascendant') return 'Asc';
      return planet.slice(0, 2);
    },
    []
  );

  const activeHouses = useMemo(() => {
    if (activeVarga === 'd1') {
      return buildChartHouses(kundli, { resolveAbbr: abbrResolver });
    }
    return buildVargaHouses(kundli, activeVarga, { resolveAbbr: abbrResolver });
  }, [activeVarga, kundli, abbrResolver]);

  const info = VARGA_INFO[activeVarga];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
        The Vedic system divides the zodiac into twenty progressively finer charts. Each reveals a different layer of the native â€” from the body (D1) to the deepest karma (D60). Click any chart to explore it.
      </p>

      {/* â”€â”€â”€ Visual grid of all vargas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {availableVargas.map((code) => {
          const v = VARGA_INFO[code];
          if (!v) return null;
          const isActive = activeVarga === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setActiveVarga(code)}
              className={cn(
                'group relative rounded-xl border p-3 text-left transition-all duration-150',
                isActive
                  ? 'border-primary/60 bg-primary/[0.08] shadow-md'
                  : 'border-border/60 bg-card hover:border-primary/40 hover:bg-primary/[0.03]'
              )}
            >
              {/* Code */}
              <div className="flex items-baseline justify-between mb-1">
                <span
                  className={cn(
                    'text-lg font-bold leading-none',
                    isActive ? 'text-primary' : 'text-foreground/80'
                  )}
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {v.code}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>

              {/* Name */}
              <p className="text-xs font-semibold text-foreground leading-tight">
                {v.name}
              </p>

              {/* Purpose */}
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 leading-tight">
                {v.purpose}
              </p>
            </button>
          );
        })}
      </div>

      {/* â”€â”€â”€ Selected varga detail â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {info && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          {/* Header strip */}
          <div className="px-6 py-5 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <h3
                  className="text-2xl font-bold leading-tight"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {info.code} Â· {info.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-primary/70 font-medium mt-1">
                  {info.sanskrit} Â· {info.purpose}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{info.division}</p>
            </div>
          </div>

          {/* Body â€” chart + interpretation side by side */}
          <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-6 p-6">
            {/* Chart */}
            <div className="flex justify-center md:justify-start">
              <VedicChart
                key={activeVarga}
                size={340}
                houses={activeHouses}
                defaultStyle="north"
                hideToggle
              />
            </div>

            {/* Interpretation */}
            <div className="space-y-5 max-w-xl">
              <p className="text-sm leading-relaxed text-foreground/85">
                {info.summary}
              </p>

              <div className="space-y-2 pt-2 border-t">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Use this chart for
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  {info.useCases.map((u) => (
                    <li key={u} className="flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">â€¢</span>
                      <span className="text-foreground/85">{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
``````

#### `src\features\report\sections\GrahaSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { AttributeBadge } from '../primitives/AttributeBadge';
import { PLANET_GLYPHS, RASHI_GLYPHS, RASHI_LORDS } from '../lib/glyphs';

interface GrahaSectionProps {
  kundli: Record<string, any>;
}

const PLANET_ORDER = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter',
  'Venus', 'Saturn', 'Rahu', 'Ketu',
];

const DIGNITY_TONE: Record<string, 'positive' | 'warning' | 'negative' | 'neutral'> = {
  exalted: 'positive',
  moolatrikona: 'positive',
  own: 'positive',
  friendly: 'positive',
  neutral: 'neutral',
  enemy: 'warning',
  debilitated: 'negative',
};

function formatDegree(deg?: number, min?: number, sec?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  const s = sec ?? 0;
  return `${d}Â° ${String(m).padStart(2, '0')}â€² ${String(s).padStart(2, '0')}â€³`;
}

function houseOf(name: string, houses: any[]): number | null {
  for (const h of houses ?? []) {
    if (h.planets?.includes(name)) return h.number;
  }
  return null;
}

export function GrahaSection({ kundli }: GrahaSectionProps) {
  const { t } = useTranslation();
  const planets = kundli.planets ?? {};
  const houses = kundli.houses ?? [];

  return (
    <div className="space-y-3">
      {PLANET_ORDER.map((name) => {
        const p = planets[name];
        if (!p) return null;
        const house = houseOf(name, houses);
        const rashiGlyph = RASHI_GLYPHS[p.rashiName] ?? 'Â·';
        const rashiLord = RASHI_LORDS[p.rashiName] ?? 'â€”';

        return (
          <article
            key={name}
            className="rounded-xl border bg-card p-5 space-y-3"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <GlyphBadge
                  glyph={PLANET_GLYPHS[name] ?? 'Â·'}
                  planet={name as any}
                  size={36}
                  filled
                  title={name}
                />
                <div>
                  <p className="text-base font-bold leading-tight">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('graha.house', { defaultValue: 'House' })} {house ?? 'â€”'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {p.dignity && (
                  <AttributeBadge tone={DIGNITY_TONE[p.dignity] ?? 'neutral'}>
                    {p.dignity}
                  </AttributeBadge>
                )}
                {p.isRetrograde && <AttributeBadge tone="warning">Retrograde</AttributeBadge>}
                {p.isCombust && <AttributeBadge tone="negative">Combust</AttributeBadge>}
                {p.isVargottama && <AttributeBadge tone="positive">Vargottama</AttributeBadge>}
              </div>
            </div>

            {/* Position grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-xs">
              <Field
                label={t('graha.sign', { defaultValue: 'Sign' })}
                value={p.rashiName ?? 'â€”'}
                glyph={rashiGlyph}
                accent
              />
              <Field
                label={t('graha.position', { defaultValue: 'Position' })}
                value={formatDegree(p.degree, p.minute, p.second)}
                mono
              />
              <Field
                label={t('graha.nakshatra', { defaultValue: 'Nakshatra' })}
                value={`${p.nakshatra ?? 'â€”'} ${p.pada ?? ''}`}
              />
              <Field
                label={t('graha.rashiLord', { defaultValue: 'Rashi Lord' })}
                value={rashiLord}
                glyph={PLANET_GLYPHS[rashiLord]}
              />
            </div>

            {/* Secondary row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
              <span>
                {t('graha.nakshatraLord', { defaultValue: 'Nakshatra Lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[p.nakshatraLord] ?? ''} {p.nakshatraLord ?? 'â€”'}
                </strong>
              </span>
              {typeof p.speed === 'number' && (
                <span>
                  {t('graha.speed', { defaultValue: 'Speed' })}:{' '}
                  <strong className="text-foreground font-mono">
                    {p.speed.toFixed(4)}Â°/day
                  </strong>
                </span>
              )}
              {p.longitude !== undefined && (
                <span>
                  {t('graha.longitude', { defaultValue: 'Longitude' })}:{' '}
                  <strong className="text-foreground font-mono">
                    {p.longitude.toFixed(4)}Â°
                  </strong>
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  glyph,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  glyph?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`mt-0.5 flex items-center gap-1.5 ${mono ? 'font-mono' : ''}`}>
        {glyph && <span className="text-sm opacity-70">{glyph}</span>}
        <span className={`font-medium ${accent ? 'text-primary' : ''}`}>{value}</span>
      </p>
    </div>
  );
}
``````

#### `src\features\report\sections\HouseMapSection.tsx`

```tsx
import { RASHI_GLYPHS, RASHI_LORDS, PLANET_GLYPHS } from '../lib/glyphs';
import { HOUSE_NAMES_EN } from '../lib/glyphs';

interface HouseMapSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const CATEGORY_COLOR: Record<string, string> = {
  kendra: 'border-l-amber-500/60',
  trikona: 'border-l-emerald-500/60',
  dusthana: 'border-l-red-500/50',
  neutral: 'border-l-border',
};

const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const HOUSE_CAT: Record<number, string> = {
  1: 'kendra', 2: 'neutral', 3: 'neutral', 4: 'kendra',
  5: 'trikona', 6: 'dusthana', 7: 'kendra', 8: 'dusthana',
  9: 'trikona', 10: 'kendra', 11: 'neutral', 12: 'dusthana',
};

export function HouseMapSection({ kundli }: HouseMapSectionProps) {
  const houses = kundli.houses ?? [];
  const sav = kundli.ashtakavarga?.sav?.houseStrengths ?? [];

  const strongest = sav.length > 0 ? sav.reduce((a: any, b: any) => (a.bindus > b.bindus ? a : b)) : null;
  const weakest = sav.length > 0 ? sav.reduce((a: any, b: any) => (a.bindus < b.bindus ? a : b)) : null;

  return (
    <div className="space-y-5">
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {houses.map((h: any) => {
          const rashi = RASHI_NAMES[(h.rashi ?? 1) - 1];
          const glyph = RASHI_GLYPHS[rashi] ?? 'Â·';
          const lord = RASHI_LORDS[rashi] ?? 'â€”';
          const cat = HOUSE_CAT[h.number] ?? 'neutral';

          return (
            <div
              key={h.number}
              className={`rounded-lg border border-l-2 bg-card p-3 space-y-2 ${CATEGORY_COLOR[cat]}`}
            >
              {/* Header */}
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className="text-base font-bold text-muted-foreground"
                  style={{ fontFamily: 'Crimson Pro, Georgia, serif' }}
                >
                  {ROMAN[h.number - 1]}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  {HOUSE_NAMES_EN[h.number]}
                </span>
              </div>

              {/* Rashi */}
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-base opacity-70">{glyph}</span>
                <span className="font-semibold">{rashi}</span>
              </div>

              {/* Lord */}
              <p className="text-[10px] text-muted-foreground">
                {PLANET_GLYPHS[lord]} {lord}
              </p>

              {/* Planets or empty */}
              {h.planets?.length > 0 ? (
                <div className="flex flex-wrap gap-1 pt-1 border-t border-border/40">
                  {h.planets.map((p: string) => (
                    <span
                      key={p}
                      className="text-[10px] font-medium text-primary"
                      title={p}
                    >
                      {PLANET_GLYPHS[p] ?? p.slice(0, 2)}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="pt-1 border-t border-border/40 text-[10px] text-muted-foreground/60">
                  Â·
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Highlights */}
      {(strongest || weakest) && (
        <div className="rounded-xl border bg-muted/20 p-4 space-y-2 text-sm">
          {strongest && (
            <p>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">â˜… Strongest â€”</span>{' '}
              <strong>House {ROMAN[strongest.house - 1]}</strong> ({HOUSE_NAMES_EN[strongest.house]}) Â·{' '}
              <span className="font-mono">{strongest.bindus}</span> bindus â€” {strongest.strength.toLowerCase()}.
            </p>
          )}
          {weakest && (
            <p>
              <span className="text-red-700 dark:text-red-400 font-semibold">âš  Weakest â€”</span>{' '}
              <strong>House {ROMAN[weakest.house - 1]}</strong> ({HOUSE_NAMES_EN[weakest.house]}) Â·{' '}
              <span className="font-mono">{weakest.bindus}</span> bindus â€” {weakest.strength.toLowerCase()}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
``````

#### `src\features\report\sections\PanchangSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import type { BirthData } from '@/domain/astrology/birth-data';

interface PanchangSectionProps {
  kundli: Record<string, any>;
  profile: BirthData;
}

export function PanchangSection({ kundli, profile }: PanchangSectionProps) {
  const { t } = useTranslation();

  const [y, m, d] = profile.localDate.split('-').map(Number);
  const localDate = new Date(y, m - 1, d, 12, 0, 0);
  const weekday = localDate.toLocaleDateString('en-GB', { weekday: 'long' });

  // Extract from kundli
  const moon = kundli.planets?.Moon ?? {};
  const asc = kundli.ascendant ?? {};

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Tile
        label={t('panchang.vara', { defaultValue: 'Vara (Weekday)' })}
        value={weekday}
        sub={t('panchang.varaSub', { defaultValue: 'The day lord' })}
      />
      <Tile
        label={t('panchang.nakshatra', { defaultValue: 'Nakshatra' })}
        value={`${moon.nakshatra ?? asc.nakshatra ?? 'â€”'}`}
        sub={`Pada ${moon.pada ?? asc.pada ?? 1} â€¢ Lord: ${moon.nakshatraLord ?? asc.nakshatraLord ?? 'â€”'}`}
      />
      <Tile
        label={t('panchang.rashi', { defaultValue: 'Chandra Rashi' })}
        value={moon.rashiName ?? 'â€”'}
        sub={`${moon.degree ?? 0}Â° ${String(moon.minute ?? 0).padStart(2, '0')}â€²`}
      />
      <Tile
        label={t('panchang.lagna', { defaultValue: 'Lagna' })}
        value={asc.rashiName ?? 'â€”'}
        sub={`${asc.degree ?? 0}Â° ${String(asc.minute ?? 0).padStart(2, '0')}â€²`}
      />
    </div>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </p>
      <p className="text-base font-bold mt-1">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}
``````

#### `src\features\report\sections\PlanetaryMapSection.tsx`

```tsx
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS, RASHI_GLYPHS, RASHI_LORDS } from '../lib/glyphs';

interface PlanetaryMapSectionProps {
  kundli: Record<string, any>;
}

const PLANET_ORDER = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

function houseOf(name: string, houses: any[]): number | null {
  for (const h of houses ?? []) {
    if (h.planets?.includes(name)) return h.number;
  }
  return null;
}

const DIGNITY_BORDER: Record<string, string> = {
  exalted: 'border-emerald-500/40',
  moolatrikona: 'border-emerald-500/40',
  own: 'border-emerald-500/40',
  friendly: 'border-emerald-500/30',
  neutral: 'border-border',
  enemy: 'border-amber-500/30',
  debilitated: 'border-red-500/40',
};

export function PlanetaryMapSection({ kundli }: PlanetaryMapSectionProps) {
  const planets = kundli.planets ?? {};
  const houses = kundli.houses ?? [];

  // Highlights
  const highlights: { label: string; value: string; tone: 'positive' | 'negative' | 'neutral' }[] = [];

  const strongest = PLANET_ORDER.find((p) => planets[p]?.dignity === 'exalted');
  if (strongest) {
    highlights.push({ label: 'Strongest', value: `${strongest} (exalted)`, tone: 'positive' });
  }
  const debil = PLANET_ORDER.find((p) => planets[p]?.dignity === 'debilitated');
  if (debil) {
    highlights.push({ label: 'Needs support', value: `${debil} (debilitated)`, tone: 'negative' });
  }
  const vargottama = PLANET_ORDER.filter((p) => planets[p]?.isVargottama);
  if (vargottama.length > 0) {
    highlights.push({ label: 'Vargottama', value: vargottama.join(', '), tone: 'positive' });
  }
  const retrogrades = PLANET_ORDER.filter((p) => planets[p]?.isRetrograde);
  if (retrogrades.length > 0) {
    highlights.push({ label: 'Retrograde', value: retrogrades.join(', '), tone: 'neutral' });
  }

  return (
    <div className="space-y-6">
      {/* 3x3 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {PLANET_ORDER.map((name) => {
          const p = planets[name];
          if (!p) return null;
          const house = houseOf(name, houses);
          const rashiName = p.rashiName ?? 'â€”';
          const borderClass = DIGNITY_BORDER[p.dignity] ?? 'border-border';
          const rashiLord = RASHI_LORDS[rashiName] ?? 'â€”';

          return (
            <article
              key={name}
              className={`rounded-xl border-2 ${borderClass} bg-card p-4 space-y-3`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GlyphBadge
                    glyph={PLANET_GLYPHS[name] ?? 'Â·'}
                    planet={name as any}
                    size={28}
                    filled
                  />
                  <span className="font-bold text-sm">{name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {p.isRetrograde && (
                    <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">Ê³</span>
                  )}
                  <span className="text-[10px] text-muted-foreground font-mono">
                    H{house ?? 'â€”'}
                  </span>
                </div>
              </div>

              {/* Sign + degree */}
              <div className="space-y-0.5">
                <p className="text-lg font-semibold leading-tight">
                  <span className="mr-1.5 text-base">{RASHI_GLYPHS[rashiName]}</span>
                  {rashiName}
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {p.degree ?? 0}Â° {String(p.minute ?? 0).padStart(2, '0')}â€² {String(p.second ?? 0).padStart(2, '0')}â€³
                </p>
              </div>

              {/* Nakshatra */}
              <p className="text-xs text-muted-foreground">
                {p.nakshatra ?? 'â€”'} {p.pada ? `Â· ${p.pada}` : ''}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                {p.dignity && p.dignity !== 'neutral' && (
                  <span
                    className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      p.dignity === 'exalted' || p.dignity === 'moolatrikona' || p.dignity === 'own'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        : p.dignity === 'debilitated'
                          ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                          : 'bg-muted/60 text-muted-foreground'
                    }`}
                  >
                    {p.dignity}
                  </span>
                )}
                {p.isCombust && (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-700 dark:text-orange-400">
                    combust
                  </span>
                )}
                {p.isVargottama && (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-400">
                    vargottama
                  </span>
                )}
              </div>

              {/* Rashi lord */}
              <p className="text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                {PLANET_GLYPHS[rashiLord]} {rashiLord}
              </p>
            </article>
          );
        })}
      </div>

      {/* Highlights strip */}
      {highlights.length > 0 && (
        <div className="rounded-xl border bg-muted/20 p-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {highlights.map((h, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-muted-foreground">{h.label}:</span>
              <strong
                className={
                  h.tone === 'positive'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : h.tone === 'negative'
                      ? 'text-red-700 dark:text-red-400'
                      : 'text-foreground'
                }
              >
                {h.value}
              </strong>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
``````

#### `src\features\report\sections\SpecialPointsSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';

interface SpecialPointsSectionProps {
  kundli: Record<string, any>;
}

export function SpecialPointsSection({ kundli }: SpecialPointsSectionProps) {
  const { t } = useTranslation();
  const sl = kundli.specialLagnas ?? {};
  const ap = kundli.arudhaPadas?.all ?? [];

  const SPECIALS = [
    { key: 'ghatikaLagna', label: 'Ghatika Lagna (GL)', hint: 'Power & Authority' },
    { key: 'horaLagna', label: 'Hora Lagna (HL)', hint: 'Wealth' },
    { key: 'bhavaLagna', label: 'Bhava Lagna (BL)', hint: 'Physical Vitality' },
    { key: 'shreeLagna', label: 'Shree Lagna (SL)', hint: 'Fortune' },
    { key: 'induLagna', label: 'Indu Lagna (IL)', hint: 'Dhana Yoga' },
    { key: 'pranapadaLagna', label: 'Pranapada (PP)', hint: 'Time Rectification' },
  ];

  return (
    <div className="space-y-6">
      {/* Special Lagnas */}
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
          {t('special.specialLagnas', { defaultValue: 'Special Lagnas' })}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SPECIALS.map(({ key, label, hint }) => {
            const s = sl[key];
            if (!s) return null;
            return (
              <div key={key} className="p-3 rounded-lg border bg-card space-y-1">
                <p className="text-xs font-semibold text-primary">{label}</p>
                <p className="text-[10px] text-muted-foreground italic">{hint}</p>
                {s.rashiName && (
                  <p className="text-sm pt-1">
                    <strong>{s.rashiName}</strong>{' '}
                    {s.degree !== undefined && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {s.degree}Â° {String(s.minute ?? 0).padStart(2, '0')}â€²
                      </span>
                    )}
                  </p>
                )}
                {s.nakshatra && (
                  <p className="text-[11px] text-muted-foreground">
                    {s.nakshatra} {s.pada ? `(Pada ${s.pada})` : ''}
                  </p>
                )}
                {s.totalKalas !== undefined && (
                  <p className="text-[11px] text-muted-foreground">
                    {t('special.kalas', { defaultValue: 'Kalas' })}: {s.totalKalas}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Arudha Padas */}
      {ap.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
            {t('special.arudhaPadas', { defaultValue: 'Arudha Padas' })}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ap.map((p: any) => (
              <div
                key={p.code}
                className="flex items-center justify-between gap-3 p-2.5 rounded-lg border bg-card text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary w-8">{p.code}</span>
                  <span className="text-muted-foreground truncate max-w-[16rem]">
                    {p.name?.split(' - ')[0]}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold">{p.rashiName}</p>
                  <p className="text-[10px] text-muted-foreground">
                    H{p.houseNumber} â€¢ {p.lord}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
``````

#### `src\features\report\sections\StrengthSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';

interface StrengthSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const CATEGORY_COLOR: Record<string, string> = {
  beneficial: 'bg-emerald-500',
  neutral: 'bg-amber-500',
  challenging: 'bg-red-500',
};

export function StrengthSection({ kundli }: StrengthSectionProps) {
  const { t } = useTranslation();
  const sav = kundli.ashtakavarga?.sav;
  if (!sav?.houseStrengths?.length) {
    return (
      <div className="p-6 text-center text-muted-foreground text-sm border border-dashed rounded-lg">
        {t('strength.noData', { defaultValue: 'Ashtakavarga data not available.' })}
      </div>
    );
  }

  const maxBindus = Math.max(...sav.houseStrengths.map((h: any) => h.bindus));

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryTile label={t('strength.total', { defaultValue: 'Total Bindus' })} value={sav.totalBindus} />
        <SummaryTile label={t('strength.average', { defaultValue: 'Average' })} value={sav.averageBindus?.toFixed(2) ?? 'â€”'} />
        <SummaryTile label={t('strength.strongest', { defaultValue: 'Strongest' })} value={`House ${ROMAN[sav.strongestHouse - 1]}`} accent />
        <SummaryTile label={t('strength.weakest', { defaultValue: 'Weakest' })} value={`House ${ROMAN[sav.weakestHouse - 1]}`} />
      </div>

      {/* Bar chart */}
      <div className="space-y-1.5">
        {sav.houseStrengths.map((h: any) => {
          const pct = (h.bindus / maxBindus) * 100;
          return (
            <div key={h.house} className="flex items-center gap-3 text-xs">
              <div className="w-10 text-right font-mono text-muted-foreground">
                {ROMAN[h.house - 1]}
              </div>
              <div className="flex-1 h-5 bg-muted/40 rounded overflow-hidden relative">
                <div
                  className={`h-full ${CATEGORY_COLOR[h.category] ?? 'bg-primary'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="w-12 text-right font-mono font-semibold">{h.bindus}</div>
              <div className="w-24 text-[10px] uppercase tracking-wider text-muted-foreground">
                {h.strength}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryTile({ label, value, accent }: { label: string; value: any; accent?: boolean }) {
  return (
    <div className="p-3 rounded-lg border bg-card/50">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold mt-1 ${accent ? 'text-primary' : ''}`}>{value}</p>
    </div>
  );
}
``````

#### `src\features\report\sections\ThreeAnchorsSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS, RASHI_GLYPHS, RASHI_LORDS } from '../lib/glyphs';
import {
  RASHI_INTERPRETATIONS,
  NAKSHATRA_INTERPRETATIONS,
  ANCHOR_NARRATIVES,
} from '../lib/interpretations';

interface ThreeAnchorsSectionProps {
  kundli: Record<string, any>;
}

function formatDegree(deg?: number, min?: number, sec?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  const s = sec ?? 0;
  return `${d}Â° ${String(m).padStart(2, '0')}â€² ${String(s).padStart(2, '0')}â€³`;
}

export function ThreeAnchorsSection({ kundli }: ThreeAnchorsSectionProps) {
  const { t } = useTranslation();

  const anchors = [
    {
      key: 'lagna',
      role: t('anchors.body', { defaultValue: 'The Body' }),
      title: t('anchors.lagna', { defaultValue: 'Lagna (Ascendant)' }),
      data: kundli.ascendant ?? {},
      planetKey: 'Ascendant' as const,
      narrativeKey: 'Lagna',
      borderColor: '#C9A961',
      bg: 'from-[#C9A961]/[0.05]',
    },
    {
      key: 'chandra',
      role: t('anchors.mind', { defaultValue: 'The Mind' }),
      title: t('anchors.chandra', { defaultValue: 'Chandra (Moon)' }),
      data: kundli.planets?.Moon ?? {},
      planetKey: 'Moon' as const,
      narrativeKey: 'Chandra',
      borderColor: '#B8C5D6',
      bg: 'from-[#B8C5D6]/[0.06]',
    },
    {
      key: 'surya',
      role: t('anchors.soul', { defaultValue: 'The Soul' }),
      title: t('anchors.surya', { defaultValue: 'Surya (Sun)' }),
      data: kundli.planets?.Sun ?? {},
      planetKey: 'Sun' as const,
      narrativeKey: 'Surya',
      borderColor: '#E63946',
      bg: 'from-[#E63946]/[0.05]',
    },
  ];

  return (
    <div className="space-y-5">
      {anchors.map((anchor) => {
        const p = anchor.data;
        const rashiName = p.rashiName ?? 'â€”';
        const nakshatra = p.nakshatra ?? 'â€”';
        const rashiLord = RASHI_LORDS[rashiName] ?? 'â€”';
        const narrative = ANCHOR_NARRATIVES[anchor.narrativeKey]?.[rashiName] ?? '';
        const rashiInterp = RASHI_INTERPRETATIONS[rashiName] ?? '';
        const nakshatraInterp = NAKSHATRA_INTERPRETATIONS[nakshatra] ?? '';

        return (
          <article
            key={anchor.key}
            className={`rounded-2xl border bg-gradient-to-br ${anchor.bg} to-transparent p-6 md:p-8 space-y-5`}
            style={{ borderColor: `${anchor.borderColor}40` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.3em] font-semibold"
                  style={{ color: anchor.borderColor }}
                >
                  â—‡ {anchor.role}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{anchor.title}</p>
              </div>
              <GlyphBadge
                glyph={RASHI_GLYPHS[rashiName] ?? 'Â·'}
                planet={anchor.planetKey}
                size={44}
              />
            </div>

            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p
                className="font-bold leading-none"
                style={{
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  fontSize: '2rem',
                }}
              >
                {rashiName}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                {formatDegree(p.degree, p.minute, p.second)}
              </p>
              <p className="text-sm text-muted-foreground">
                Â· {nakshatra} {p.pada ?? ''}
              </p>
            </div>

            {narrative && (
              <p className="text-base md:text-[17px] leading-[1.75] text-foreground/90">
                {narrative}
              </p>
            )}

            {(rashiInterp || nakshatraInterp) && (
              <div className="space-y-2 pt-3 border-t" style={{ borderColor: `${anchor.borderColor}20` }}>
                {rashiInterp && (
                  <p className="text-sm leading-relaxed text-foreground/80">
                    <span className="font-semibold" style={{ color: anchor.borderColor }}>
                      {rashiName}:{' '}
                    </span>
                    {rashiInterp}
                  </p>
                )}
                {nakshatraInterp && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/70">
                      {nakshatra}:{' '}
                    </span>
                    {nakshatraInterp}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-3 border-t text-xs text-muted-foreground" style={{ borderColor: `${anchor.borderColor}20` }}>
              <span>
                {t('anchors.rashiLord', { defaultValue: 'Rashi lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[rashiLord]} {rashiLord}
                </strong>
              </span>
              <span>
                {t('anchors.nakshatraLord', { defaultValue: 'Nakshatra lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[p.nakshatraLord] ?? ''} {p.nakshatraLord ?? 'â€”'}
                </strong>
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
``````

#### `src\features\report\sections\UnfoldingSection.tsx`

```tsx
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS } from '../lib/glyphs';

interface UnfoldingSectionProps {
  kundli: Record<string, any>;
}

function fmtDateShort(iso?: string): string {
  if (!iso) return 'â€”';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function UnfoldingSection({ kundli }: UnfoldingSectionProps) {
  const dasha = kundli.dasha ?? {};
  const mahadashas = dasha.mahadashas ?? [];
  const current = dasha.currentMahadasha;
  const antar = dasha.currentAntar;
  const pratyantar = dasha.currentPratyantar;

  const lifeStart = mahadashas[0]?.startTime ? new Date(mahadashas[0].startTime).getTime() : Date.now();
  const lifeEnd = mahadashas[mahadashas.length - 1]?.endTime
    ? new Date(mahadashas[mahadashas.length - 1].endTime).getTime()
    : Date.now() + 1000;
  const lifeSpan = Math.max(1, lifeEnd - lifeStart);
  const startYear = new Date(lifeStart).getFullYear();
  const endYear = new Date(lifeEnd).getFullYear();

  return (
    <div className="space-y-8">
      {/* Current period hero */}
      {current && (
        <article className="rounded-2xl border-2 border-primary/30 bg-gradient-to-b from-primary/[0.05] to-transparent p-6 md:p-8 space-y-5 text-center">
          <div className="flex justify-center">
            <GlyphBadge
              glyph={PLANET_GLYPHS[current.planet] ?? 'Â·'}
              planet={current.planet}
              size={56}
              filled
            />
          </div>
          <div>
            <p
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: '2rem',
              }}
            >
              {current.planet} {('Mahadasha')}
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {fmtDateShort(current.startTime)} â†’ {fmtDateShort(current.endTime)}
            </p>
          </div>

          {typeof current.progressPercent === 'number' && (
            <div className="max-w-md mx-auto space-y-1.5">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${current.progressPercent}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{current.progressPercent.toFixed(1)}%</strong> complete
              </p>
            </div>
          )}

          <p className="text-base leading-relaxed max-w-xl mx-auto text-foreground/85">
            {current.planet} rules the planet of action, courage, and drive. This chapter is where you forge your will.
          </p>

          {(antar || pratyantar) && (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-4 border-t border-primary/20 text-sm">
              {antar && (
                <span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Antardasha
                  </span>
                  <strong>{PLANET_GLYPHS[antar.planet]} {antar.planet}</strong>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">
                    until {fmtDateShort(antar.endTime)}
                  </span>
                </span>
              )}
              {pratyantar && (
                <span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Pratyantar
                  </span>
                  <strong>{PLANET_GLYPHS[pratyantar.planet]} {pratyantar.planet}</strong>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">
                    until {fmtDateShort(pratyantar.endTime)}
                  </span>
                </span>
              )}
            </div>
          )}
        </article>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
          The Whole Life, at a Glance
        </p>

        {/* Year axis */}
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground px-1">
          <span>{startYear}</span>
          <span className="text-primary font-semibold">NOW</span>
          <span>{endYear}</span>
        </div>

        {/* Bars */}
        <div className="space-y-1.5">
          {mahadashas.map((md: any) => {
            const s = new Date(md.startTime).getTime();
            const e = new Date(md.endTime).getTime();
            const leftPct = ((s - lifeStart) / lifeSpan) * 100;
            const widthPct = ((e - s) / lifeSpan) * 100;
            const isCurrent = current && md.planet === current.planet && md.startTime === current.startTime;

            return (
              <div key={md.planet + md.startTime} className="flex items-center gap-3 text-xs">
                <div className="w-20 shrink-0 flex items-center gap-1.5">
                  <span className="text-base">{PLANET_GLYPHS[md.planet]}</span>
                  <span className="font-medium">{md.planet}</span>
                </div>
                <div className="flex-1 h-6 bg-muted/30 rounded relative overflow-hidden">
                  <div
                    className={`absolute h-full rounded flex items-center justify-center ${
                      isCurrent ? 'bg-primary' : 'bg-foreground/20'
                    }`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  >
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-primary-foreground tracking-wider">
                        â–¶ NOW
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-24 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                  {new Date(md.startTime).getFullYear()}â€“{new Date(md.endTime).getFullYear()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
``````

#### `src\features\report\sections\VitalSignsSection.tsx`

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RASHI_GLYPHS } from '../lib/glyphs';

interface VitalSignsSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const HOUSE_NAMES: Record<number, string> = {
  1: 'Self', 2: 'Wealth', 3: 'Siblings', 4: 'Home',
  5: 'Children', 6: 'Enemies', 7: 'Marriage', 8: 'Transformation',
  9: 'Fortune', 10: 'Career', 11: 'Gains', 12: 'Loss',
};

const CATEGORY_COLOR: Record<string, string> = {
  beneficial: 'bg-emerald-500',
  neutral: 'bg-amber-500',
  challenging: 'bg-red-500',
};

const SPECIAL_LAGNAS = [
  { key: 'ghatikaLagna', code: 'GL', name: 'Ghatika Lagna', purpose: 'Power & Authority' },
  { key: 'horaLagna', code: 'HL', name: 'Hora Lagna', purpose: 'Wealth' },
  { key: 'bhavaLagna', code: 'BL', name: 'Bhava Lagna', purpose: 'Vitality' },
  { key: 'shreeLagna', code: 'SL', name: 'Shree Lagna', purpose: 'Fortune' },
  { key: 'induLagna', code: 'IL', name: 'Indu Lagna', purpose: 'Dhana Yoga' },
  { key: 'pranapadaLagna', code: 'PP', name: 'Pranapada', purpose: 'Rectification' },
];

const PRIMARY_ARUDHAS = ['A1', 'A7', 'A10', 'A12'];

export function VitalSignsSection({ kundli }: VitalSignsSectionProps) {
  const { t } = useTranslation();
  const [showAllArudhas, setShowAllArudhas] = useState(false);

  const sav = kundli.ashtakavarga?.sav;
  const houseStrengths = sav?.houseStrengths ?? [];
  const sl = kundli.specialLagnas ?? {};
  const ap = kundli.arudhaPadas?.all ?? [];

  const strongest = houseStrengths.find((h: any) => h.house === sav?.strongestHouse);
  const weakest = houseStrengths.find((h: any) => h.house === sav?.weakestHouse);
  const maxBindus = houseStrengths.length > 0
    ? Math.max(...houseStrengths.map((h: any) => h.bindus))
    : 40;

  const arudhasToShow = showAllArudhas
    ? ap
    : ap.filter((p: any) => PRIMARY_ARUDHAS.includes(p.code));

  return (
    <div className="space-y-8">
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/*  STRENGTH BY HOUSE                                    */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {houseStrengths.length > 0 && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          {/* Header strip */}
          <div className="px-6 py-5 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <h3
                  className="text-lg font-bold leading-tight"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {t('vital.strengthTitle', { defaultValue: 'Strength by House' })}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">
                  {t('vital.strengthHint', {
                    defaultValue:
                      'Ashtakavarga measures how much benefic support each house receives from the planets. Higher bindus mean stronger flow in that domain.',
                  })}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t('vital.total', { defaultValue: 'Total' })}
                </p>
                <p
                  className="text-2xl font-bold text-primary"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {sav.totalBindus}
                </p>
              </div>
            </div>
          </div>

          {/* Extremes â€” Strongest / Weakest */}
          {(strongest || weakest) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-b">
              {strongest && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.05] p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 font-semibold">
                      â˜… {t('vital.strongest', { defaultValue: 'Strongest' })}
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                      {strongest.bindus} bindus
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-lg font-bold text-emerald-700 dark:text-emerald-400"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                    >
                      House {ROMAN[strongest.house - 1]}
                    </span>
                    <span className="text-sm text-foreground/70">
                      {HOUSE_NAMES[strongest.house]}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {t('vital.strongestDesc', {
                      defaultValue:
                        "Your chart's greatest asset. This house receives exceptional support â€” expect good fortune and ease in this domain of life.",
                    })}
                  </p>
                </div>
              )}

              {weakest && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/[0.05] p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-red-700 dark:text-red-400 font-semibold">
                      âš  {t('vital.weakest', { defaultValue: 'Weakest' })}
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-400 font-mono">
                      {weakest.bindus} bindus
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-lg font-bold text-red-700 dark:text-red-400"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                    >
                      House {ROMAN[weakest.house - 1]}
                    </span>
                    <span className="text-sm text-foreground/70">
                      {HOUSE_NAMES[weakest.house]}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {t('vital.weakestDesc', {
                      defaultValue:
                        'This area needs conscious effort. Not a weakness of fate, but a place to work with awareness and patience.',
                    })}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* All 12 houses bar chart */}
          <div className="p-6 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
              {t('vital.allHouses', { defaultValue: 'All Twelve Houses' })}
            </p>

            <div className="space-y-1.5">
              {houseStrengths.map((h: any) => {
                const pct = (h.bindus / maxBindus) * 100;
                const isStrongest = h.house === sav.strongestHouse;
                const isWeakest = h.house === sav.weakestHouse;

                return (
                  <div key={h.house} className="flex items-center gap-3 text-xs">
                    {/* Roman numeral */}
                    <span className="w-9 text-right font-mono text-[11px] text-muted-foreground shrink-0">
                      {ROMAN[h.house - 1]}
                    </span>

                    {/* House name */}
                    <span className="w-24 text-[11px] text-muted-foreground shrink-0 truncate">
                      {HOUSE_NAMES[h.house]}
                    </span>

                    {/* Bar */}
                    <div className="flex-1 h-5 bg-muted/40 rounded overflow-hidden relative">
                      <div
                        className={`h-full ${CATEGORY_COLOR[h.category] ?? 'bg-primary'} transition-all rounded`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {/* Bindus */}
                    <span
                      className={`w-8 text-right font-mono font-semibold shrink-0 ${
                        isStrongest
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isWeakest
                            ? 'text-red-600 dark:text-red-400'
                            : ''
                      }`}
                    >
                      {h.bindus}
                    </span>

                    {/* Category */}
                    <span className="w-20 text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
                      {h.strength}
                      {isStrongest && ' â˜…'}
                      {isWeakest && ' âš '}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer stats */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 mt-3 border-t text-xs text-muted-foreground">
              <span>
                {t('vital.average', { defaultValue: 'Average' })}:{' '}
                <strong className="text-foreground">{sav.averageBindus?.toFixed(2)}</strong>
              </span>
              <span>
                {t('vital.total', { defaultValue: 'Total' })}:{' '}
                <strong className="text-foreground">{sav.totalBindus}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/*  SPECIAL LAGNAS + ARUDHA PADAS                       */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* â”€â”€â”€ Special Lagnas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {Object.keys(sl).length > 0 && (
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
              <h3
                className="text-base font-bold leading-tight"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {t('vital.specialLagnas', { defaultValue: 'Special Lagnas' })}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                {t('vital.specialLagnasHint', {
                  defaultValue:
                    'Six subtle ascendants reveal where specific areas of life shine.',
                })}
              </p>
            </div>

            <div className="p-4 space-y-2">
              {SPECIAL_LAGNAS.map(({ key, code, name, purpose }) => {
                const s = sl[key];
                if (!s) return null;

                return (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-background/50 hover:bg-muted/40 transition-colors"
                  >
                    {/* Code */}
                    <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 rounded px-2 py-1 shrink-0 w-9 text-center">
                      {code}
                    </span>

                    {/* Name + purpose */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight truncate">
                        {name}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {purpose}
                      </p>
                    </div>

                    {/* Rashi */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="text-xl leading-none"
                        style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                      >
                        {s.rashiName ? RASHI_GLYPHS[s.rashiName] : 'Â·'}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground leading-tight">
                          {s.rashiName ?? 'â€”'}
                        </p>
                        {s.degree !== undefined && (
                          <p className="text-[10px] font-mono text-muted-foreground">
                            {s.degree}Â° {String(s.minute ?? 0).padStart(2, '0')}â€²
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Arudha Padas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {ap.length > 0 && (
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
              <h3
                className="text-base font-bold leading-tight"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {t('vital.arudhas', { defaultValue: 'Arudha Padas' })}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                {t('vital.arudhasHint', {
                  defaultValue: 'How the world sees you â€” the outer image of each house.',
                })}
              </p>
            </div>

            <div className="p-4 space-y-2">
              {arudhasToShow.map((p: any) => (
                <div
                  key={p.code}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-background/50 hover:bg-muted/40 transition-colors"
                >
                  {/* Code */}
                  <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 rounded px-2 py-1 shrink-0 w-10 text-center">
                    {p.code}
                  </span>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight truncate">
                      {p.name?.split(' - ')[0] ?? p.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      House {p.houseNumber}
                    </p>
                  </div>

                  {/* Rashi */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {RASHI_GLYPHS[p.rashiName] ?? 'Â·'}
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {p.rashiName}
                    </p>
                  </div>
                </div>
              ))}

              {/* Expand button */}
              {ap.length > PRIMARY_ARUDHAS.length && (
                <button
                  type="button"
                  onClick={() => setShowAllArudhas((v) => !v)}
                  className="w-full text-center text-[11px] uppercase tracking-wider text-primary/70 hover:text-primary py-2 transition-colors no-print"
                >
                  {showAllArudhas
                    ? t('vital.showLess', { defaultValue: 'â–´ Show less' })
                    : t('vital.showAll', { defaultValue: `â–¾ Show all ${ap.length} arudha padas` })}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
``````

#### `src\features\report\tokens.ts`

```typescript
/**
 * Report design tokens.
 * Centralized so the whole report can be re-themed from one place.
 */

export const REPORT_TOKENS = {
  // Layout
  pageMaxWidth: '900px',
  sectionPadding: 'py-10',
  sectionGap: 'space-y-8',

  // Card
  cardPadding: 'p-6',
  cardRadius: 'rounded-xl',
  cardBg: 'bg-card',
  cardBorder: 'border',
  cardShadow: 'shadow-sm',

  // Colors
  accentGold: '#C9A961',
  accentSaffron: 'hsl(var(--primary))',
  inkMuted: 'hsl(var(--muted-foreground))',
  inkPrimary: 'hsl(var(--foreground))',
  paperCream: 'hsl(var(--card))',

  // Typography
  h1: 'text-3xl md:text-4xl font-bold tracking-tight',
  h2: 'text-2xl font-bold tracking-tight',
  h3: 'text-sm font-semibold uppercase tracking-wider',
  body: 'text-sm leading-relaxed',
  dataLabel: 'text-[10px] uppercase tracking-wider text-muted-foreground',
  dataValue: 'text-sm font-semibold',
  mono: 'font-mono text-xs',

  // Planet colors (traditional)
  planetColors: {
    Sun: '#E63946',
    Moon: '#B8C5D6',
    Mars: '#D62828',
    Mercury: '#2A9D8F',
    Jupiter: '#D4A017',
    Venus: '#E8A87C',
    Saturn: '#264653',
    Rahu: '#6A4C93',
    Ketu: '#8D99AE',
    Ascendant: '#C9A961',
  } as const,

  // House categories
  houseCategories: {
    1: 'kendra',
    2: 'neutral',
    3: 'neutral',
    4: 'kendra',
    5: 'trikona',
    6: 'dusthana',
    7: 'kendra',
    8: 'dusthana',
    9: 'trikona',
    10: 'kendra',
    11: 'neutral',
    12: 'dusthana',
  } as const,
} as const;

export type ReportTokens = typeof REPORT_TOKENS;
``````

### Shared Components

#### `src\components\bs-date-picker.tsx`

```tsx
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  NEPALI_MONTHS,
  NEPALI_MONTHS_EN,
  BS_MIN_YEAR,
  BS_MAX_YEAR,
  daysInBsMonth,
  toDevanagari,
  toGregorianISO,
  type BSDate,
} from '@/infrastructure/calendar/nepali-date';

interface Props {
  value: BSDate | null;
  onChange: (isoGregorian: string) => void;
  /** Show Devanagari numerals + Nepali month names */
  nepaliScript?: boolean;
}

const FALLBACK: BSDate = { year: 2048, month: 2, day: 15 };

export function BSDatePicker({ value, onChange, nepaliScript = true }: Props) {
  const { i18n } = useTranslation();
  const isNepali = nepaliScript || (i18n.resolvedLanguage ?? 'en') === 'ne';

  const current = value ?? FALLBACK;

  const monthNames = isNepali ? NEPALI_MONTHS : NEPALI_MONTHS_EN;

  const maxDay = useMemo(
    () => daysInBsMonth(current.year, current.month),
    [current.year, current.month]
  );

  // Clamp day if month/year changed
  useEffect(() => {
    if (current.day > maxDay) {
      const next = { ...current, day: maxDay };
      const iso = toGregorianISO(next);
      if (iso) onChange(iso);
    }
  }, [maxDay, current, onChange]);

  const emit = (patch: Partial<BSDate>) => {
    const next: BSDate = { ...current, ...patch };
    // Clamp day if month shrinks
    const dim = daysInBsMonth(next.year, next.month);
    if (next.day > dim) next.day = dim;
    const iso = toGregorianISO(next);
    if (iso) onChange(iso);
  };

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = BS_MAX_YEAR; y >= BS_MIN_YEAR; y--) arr.push(y);
    return arr;
  }, []);

  const days = useMemo(() => {
    const arr: number[] = [];
    for (let d = 1; d <= maxDay; d++) arr.push(d);
    return arr;
  }, [maxDay]);

  const fmt = (n: number) => (isNepali ? toDevanagari(n) : String(n));

  return (
    <div className="grid grid-cols-3 gap-2">
      <Select
        value={String(current.year)}
        onValueChange={(v) => emit({ year: Number(v) })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {fmt(y)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={String(current.month)}
        onValueChange={(v) => emit({ month: Number(v) })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {monthNames.map((name, idx) => (
            <SelectItem key={idx} value={String(idx)}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={String(current.day)}
        onValueChange={(v) => emit({ day: Number(v) })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {days.map((d) => (
            <SelectItem key={d} value={String(d)}>
              {fmt(d)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
``````

#### `src\components\change-birth-details-button.tsx`

```tsx
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBirthStore } from '@/features/birth-profile/store';

/**
 * Nav-bar button to reset the active profile and return to the birth form.
 * Only visible when a profile is loaded.
 */
export function ChangeBirthDetailsButton() {
  const { t } = useTranslation();
  const clearAll = useBirthStore((s) => s.clearAll);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={clearAll}
      className="gap-1.5 no-print"
      title={t('hero.change', { defaultValue: 'Change Birth Details' })}
    >
      <RotateCcw size={14} />
      <span className="hidden sm:inline text-xs">
        {t('hero.change', { defaultValue: 'Change' })}
      </span>
    </Button>
  );
}
``````

#### `src\components\icons.ts`

```typescript
export {
  MapPin as IconPin,
  Clock as IconClock,
  Calendar as IconCalendar,
  Search as IconSearch,
  Sun as IconSun,
  Moon as IconMoon,
  Globe as IconGlobe,
  Check as IconCheck,
  ChevronsUpDown as IconChevronsUpDown,
  CircleAlert as IconAlert,
  Sparkles as IconSparkle,
  Palette as IconPalette,
  Languages as IconLanguages,
  ChartBar as IconChart,
  User as IconUser,
  Loader2 as IconLoader,
} from 'lucide-react';
``````

#### `src\components\language-switcher.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconGlobe, IconCheck } from '@/components/icons';
import { SUPPORTED_LANGS, LANG_META, type SupportedLang } from '@/i18n';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? 'en') as SupportedLang;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <IconGlobe size={16} />
          <span className="hidden sm:inline">{LANG_META[current]?.native ?? 'English'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGS.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            className="gap-2"
          >
            <IconCheck size={14} className={current === lng ? 'opacity-100' : 'opacity-0'} />
            <span>{LANG_META[lng].native}</span>
            <span className="ml-auto text-xs text-muted-foreground">{LANG_META[lng].label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
``````

#### `src\components\palette-provider.tsx`

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type PaletteName = 'amber' | 'violet' | 'green' | 'rose' | 'slate';

const STORAGE_KEY = 'kundaliyatra-palette';

interface PaletteContextValue {
  palette: PaletteName;
  setPalette: (p: PaletteName) => void;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteName>(() => {
    if (typeof window === 'undefined') return 'amber';
    return (localStorage.getItem(STORAGE_KEY) as PaletteName) || 'amber';
  });

  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    localStorage.setItem(STORAGE_KEY, palette);
  }, [palette]);

  return (
    <PaletteContext.Provider value={{ palette, setPalette: setPaletteState }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error('usePalette must be used within PaletteProvider');
  return ctx;
}
``````

#### `src\components\palette-switcher.tsx`

```tsx
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconPalette, IconCheck } from '@/components/icons';
import { usePalette, type PaletteName } from './palette-provider';
import { useTranslation } from 'react-i18next';

const PALETTES: { value: PaletteName; swatch: string }[] = [
  { value: 'amber', swatch: 'hsl(32 95% 44%)' },
  { value: 'violet', swatch: 'hsl(262 83% 58%)' },
  { value: 'green', swatch: 'hsl(142 76% 36%)' },
  { value: 'rose', swatch: 'hsl(346 77% 50%)' },
  { value: 'slate', swatch: 'hsl(215 25% 27%)' },
];

export function PaletteSwitcher() {
  const { palette, setPalette } = usePalette();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={t('settings.palette')}>
          <IconPalette size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {PALETTES.map((p) => (
          <DropdownMenuItem
            key={p.value}
            onClick={() => setPalette(p.value)}
            className="gap-2"
          >
            <IconCheck size={14} className={palette === p.value ? 'opacity-100' : 'opacity-0'} />
            <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: p.swatch }} />
            <span className="capitalize">{p.value}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
``````

#### `src\components\print-button.tsx`

```tsx
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Print button. Triggers the browser's native print dialog.
 * Users can then "Save as PDF" or send to a physical printer.
 *
 * Hidden on print itself (via `no-print` class).
 */
export function PrintButton() {
  const { t } = useTranslation();

  const handlePrint = () => {
    // Small delay to allow any state to flush before printing
    setTimeout(() => window.print(), 50);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handlePrint}
      className="gap-1.5 no-print"
      title={t('app.print', { defaultValue: 'Print / Save as PDF' })}
    >
      <Printer size={14} />
      <span className="hidden sm:inline text-xs">
        {t('app.print', { defaultValue: 'Print' })}
      </span>
    </Button>
  );
}
``````

#### `src\components\theme-provider.tsx`

```tsx
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
``````

#### `src\components\theme-toggle.tsx`

```tsx
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconSun, IconMoon, IconCheck } from '@/components/icons';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconSun size={18} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <IconMoon size={18} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(['light', 'dark', 'system'] as const).map((mode) => (
          <DropdownMenuItem key={mode} onClick={() => setTheme(mode)} className="gap-2">
            <IconCheck size={14} className={theme === mode ? 'opacity-100' : 'opacity-0'} />
            <span>{t(`settings.${mode}`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
``````

### UI Primitives (shadcn)

#### `src\components\ui\button.tsx`

```tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
``````

#### `src\components\ui\card.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
``````

#### `src\components\ui\command.tsx`

```tsx
import * as React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0 shadow-lg">
      <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
);

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50',
      className
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />
);
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
``````

#### `src\components\ui\dialog.tsx`

```tsx
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
``````

#### `src\components\ui\dropdown-menu.tsx`

```tsx
import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
``````

#### `src\components\ui\input.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
``````

#### `src\components\ui\label.tsx`

```tsx
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
``````

#### `src\components\ui\popover.tsx`

```tsx
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
``````

#### `src\components\ui\select.tsx`

```tsx
import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out',
        position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
``````

#### `src\components\ui\sonner.tsx`

```tsx
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
``````

### Library/Utils

#### `src\lib\utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
``````

### i18n

#### `src\i18n\index.ts`

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import hi from './locales/hi.json';
import ne from './locales/ne.json';

export const SUPPORTED_LANGS = ['en', 'hi', 'ne'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const LANG_META: Record<SupportedLang, { label: string; native: string }> = {
  en: { label: 'English', native: 'English' },
  hi: { label: 'Hindi', native: 'à¤¹à¤¿à¤¨à¥à¤¦à¥€' },
  ne: { label: 'Nepali', native: 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€' },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ne: { translation: ne },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'kundaliyatra-lang',
    },
  });

export default i18n;
``````

#### `src\i18n\locales\en.json`

```json
{
    "app":  {
                "name":  "KundaliYatra",
                "tagline":  "Your Vedic birth chart, made clear.",
                "print":  "Print"
            },
    "common":  {
                   "change":  "Change",
                   "reset":  "Reset",
                   "loading":  "Loading...",
                   "searching":  "Searching...",
                   "noResults":  "No cities match \"{{query}}\".",
                   "searchFailed":  "Search failed. Please try again."
               },
    "birth":  {
                  "title":  "Birth Details",
                  "subtitle":  "The time is interpreted in the birth city\u0027s timezone.",
                  "name":  "Name",
                  "namePlaceholder":  "e.g. Bikash Moktan",
                  "date":  "Birth Date",
                  "time":  "Birth Time",
                  "city":  "Birth City",
                  "cityPlaceholder":  "Type a city name...",
                  "submit":  "Calculate Kundli",
                  "interpretedAs":  "Interpreted as",
                  "errors":  {
                                 "nameRequired":  "Please enter a name.",
                                 "nameTooLong":  "Name is too long (max 100 characters).",
                                 "dateRequired":  "Please enter a birth date.",
                                 "dateTooEarly":  "Birth year must be 1900 or later.",
                                 "dateFuture":  "Birth date cannot be in the future.",
                                 "timeRequired":  "Please enter a birth time.",
                                 "placeRequired":  "Please select a birth city.",
                                 "invalidDateTime":  "That date/time is not valid in {{timezone}}."
                             },
                  "calendarBS":  "B.S.",
                  "calendarAD":  "A.D.",
                  "approximateAD":  "â‰ˆ {{ad}} (A.D.)",
                  "approximateBS":  "â‰ˆ B.S. {{bs}}"
              },
    "dashboard":  {
                      "title":  "KundaliYatra Dashboard",
                      "changeDetails":  "Change Birth Details",
                      "ascendant":  "Ascendant (Lagna)",
                      "sign":  "Sign",
                      "lord":  "Lord",
                      "degree":  "Degree",
                      "nakshatra":  "Nakshatra",
                      "planets":  "Planetary Positions",
                      "failed":  "Chart calculation failed."
                  },
    "settings":  {
                     "language":  "Language",
                     "palette":  "Color palette",
                     "light":  "Light",
                     "dark":  "Dark",
                     "system":  "System"
                 },
    "chart":  {
                  "title":  "Birth Chart (D1)",
                  "styleNorth":  "North Indian",
                  "styleSouth":  "South Indian",
                  "planetAbbr":  {
                                     "ascendant":  "Asc",
                                     "sun":  "Su",
                                     "moon":  "Mo",
                                     "mars":  "Ma",
                                     "mercury":  "Me",
                                     "jupiter":  "Ju",
                                     "venus":  "Ve",
                                     "saturn":  "Sa",
                                     "rahu":  "Ra",
                                     "ketu":  "Ke"
                                 }
              },
    "sections":  {
                     "dashaHint":  "Your life unfolds in planetary chapters. Here is where you are now, and the shape of the path ahead.",
                     "chartHint":  "Your D1 (Rashi) chart shows the body. Your D9 (Navamsha) chart reveals the soul\u0027s deeper path.",
                     "dasha":  "Vimshottari Dasha",
                     "chart":  "The Birth Chart",
                     "bhava":  "Where Life Happens",
                     "panchangHint":  "The five limbs of the Vedic calendar at the exact moment you were born.",
                     "aspects":  "Planetary Conversations",
                     "strength":  "Where You Stand Firm",
                     "panchang":  "Panchangam at Birth",
                     "coreIdentity":  "Core Identity",
                     "grahaHint":  "Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu â€” the celestial council of your chart.",
                     "advancedHint":  "For the serious student of Jyotish â€” KP, Chalit, and all divisional charts.",
                     "bhavaHint":  "Each house governs a domain of life. Together, they map the terrain of your existence.",
                     "advanced":  "Advanced Study",
                     "special":  "The Mysteries",
                     "aspectsHint":  "Planets look at each other across the chart. These glances shape the story of your life.",
                     "graha":  "Planetary Council",
                     "coreIdentityHint":  "Your Lagna is the mask you wear to the world. Your Chandra is the mind within. Your Surya is the soul.",
                     "strengthHint":  "Not all houses are equal. Some carry the weight of your fortune. Others ask for patience and care.",
                     "specialHint":  "Beyond the base chart, special lagnas and arudha padas reveal hidden dimensions of your life."
                 },
    "coreIdentity":  {
                         "chandraSub":  "The mind and inner world",
                         "nakshatra":  "Nakshatra",
                         "lagnaSub":  "The mask you wear to the world",
                         "surya":  "Surya (Sun)",
                         "lagna":  "Lagna (Ascendant)",
                         "position":  "Position",
                         "chandra":  "Chandra (Moon)",
                         "rashiLord":  "Rashi Lord",
                         "nakshatraLord":  "Nakshatra Lord",
                         "suryaSub":  "The soul and father principle"
                     },
    "report":  {
                   "reading":  "A Vedic Reading",
                   "yourLagna":  "Your Lagna",
                   "yourChapter":  "Your Current Chapter",
                   "mahadasha":  "Mahadasha",
                   "antar":  "Antardasha",
                   "pratyantar":  "Pratyantar",
                   "complete":  "through",
                   "lord":  "Lord",
                   "change":  "Change Birth Details"
               },
    "anchors":  {
                    "body":  "The Body",
                    "mind":  "The Mind",
                    "soul":  "The Soul",
                    "lagna":  "Lagna (Ascendant)",
                    "chandra":  "Chandra (Moon)",
                    "surya":  "Surya (Sun)",
                    "rashiLord":  "Rashi lord",
                    "nakshatraLord":  "Nakshatra lord"
                },
    "cover":  {
                  "birthNakshatra":  "Birth Nakshatra",
                  "currentPeriod":  "Current Period",
                  "dasha":  "Current Dasha",
                  "surya":  "Surya",
                  "chandra":  "Chandra",
                  "lagna":  "Lagna",
                  "strongestHouse":  "Strongest House",
                  "reading":  "A Vedic Reading",
                  "change":  "Change Birth Details"
              },
    "hero":  {
                 "nakshatra":  "Nakshatra",
                 "change":  "Change Birth Details",
                 "surya":  "Surya",
                 "dasha":  "Mahadasha",
                 "chandra":  "Chandra",
                 "lagna":  "Lagna",
                 "reading":  "A Vedic Reading"
             }
}
``````

#### `src\i18n\locales\hi.json`

```json
{
    "app":  {
                "name":  "à¤•à¥à¤‚à¤¡à¤²à¥€à¤¯à¤¾à¤¤à¥à¤°à¤¾",
                "tagline":  "à¤†à¤ªà¤•à¥€ à¤µà¥ˆà¤¦à¤¿à¤• à¤œà¤¨à¥à¤® à¤•à¥à¤‚à¤¡à¤²à¥€, à¤¸à¤°à¤² à¤°à¥‚à¤ª à¤®à¥‡à¤‚à¥¤",
                "print":  "à¤ªà¥à¤°à¤¿à¤‚à¤Ÿ à¤•à¤°à¥‡à¤‚"
            },
    "common":  {
                   "change":  "à¤¬à¤¦à¤²à¥‡à¤‚",
                   "reset":  "à¤°à¥€à¤¸à¥‡à¤Ÿ",
                   "loading":  "à¤²à¥‹à¤¡ à¤¹à¥‹ à¤°à¤¹à¤¾ à¤¹à¥ˆ...",
                   "searching":  "à¤–à¥‹à¤œ à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚...",
                   "noResults":  "\"{{query}}\" à¤¸à¥‡ à¤•à¥‹à¤ˆ à¤¶à¤¹à¤° à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤²à¤¾à¥¤",
                   "searchFailed":  "à¤–à¥‹à¤œ à¤µà¤¿à¤«à¤²à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥à¤¨à¤ƒ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤"
               },
    "birth":  {
                  "title":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£",
                  "subtitle":  "à¤¸à¤®à¤¯ à¤œà¤¨à¥à¤® à¤¶à¤¹à¤° à¤•à¥‡ à¤¸à¤®à¤¯ à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤®à¥‡à¤‚ à¤®à¤¾à¤¨à¤¾ à¤œà¤¾à¤à¤—à¤¾à¥¤",
                  "name":  "à¤¨à¤¾à¤®",
                  "namePlaceholder":  "à¤œà¥ˆà¤¸à¥‡ à¤¬à¤¿à¤•à¤¾à¤¶ à¤®à¥‹à¤•à¥à¤¤à¤¾à¤¨",
                  "date":  "à¤œà¤¨à¥à¤® à¤¤à¤¿à¤¥à¤¿",
                  "time":  "à¤œà¤¨à¥à¤® à¤¸à¤®à¤¯",
                  "city":  "à¤œà¤¨à¥à¤® à¤¶à¤¹à¤°",
                  "cityPlaceholder":  "à¤¶à¤¹à¤° à¤•à¤¾ à¤¨à¤¾à¤® à¤²à¤¿à¤–à¥‡à¤‚...",
                  "submit":  "à¤•à¥à¤‚à¤¡à¤²à¥€ à¤¬à¤¨à¤¾à¤à¤",
                  "interpretedAs":  "à¤‡à¤¸ à¤°à¥‚à¤ª à¤®à¥‡à¤‚ à¤µà¥à¤¯à¤¾à¤–à¥à¤¯à¤¾",
                  "errors":  {
                                 "nameRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¨à¤¾à¤® à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤",
                                 "nameTooLong":  "à¤¨à¤¾à¤® à¤¬à¤¹à¥à¤¤ à¤²à¤‚à¤¬à¤¾ à¤¹à¥ˆ (à¤…à¤§à¤¿à¤•à¤¤à¤® 100 à¤…à¤•à¥à¤·à¤°)à¥¤",
                                 "dateRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤¤à¤¿à¤¥à¤¿ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤",
                                 "dateTooEarly":  "à¤œà¤¨à¥à¤® à¤µà¤°à¥à¤· 1900 à¤¯à¤¾ à¤‰à¤¸à¤•à¥‡ à¤¬à¤¾à¤¦ à¤¹à¥‹à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤à¥¤",
                                 "dateFuture":  "à¤œà¤¨à¥à¤® à¤¤à¤¿à¤¥à¤¿ à¤­à¤µà¤¿à¤·à¥à¤¯ à¤®à¥‡à¤‚ à¤¨à¤¹à¥€à¤‚ à¤¹à¥‹ à¤¸à¤•à¤¤à¥€à¥¤",
                                 "timeRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤¸à¤®à¤¯ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤",
                                 "placeRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤¶à¤¹à¤° à¤šà¥à¤¨à¥‡à¤‚à¥¤",
                                 "invalidDateTime":  "à¤µà¤¹ à¤¤à¤¿à¤¥à¤¿/à¤¸à¤®à¤¯ {{timezone}} à¤®à¥‡à¤‚ à¤®à¤¾à¤¨à¥à¤¯ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤"
                             },
                  "calendarBS":  "à¤µà¤¿.à¤¸à¤‚.",
                  "calendarAD":  "à¤ˆ.à¤¸à¤‚.",
                  "approximateAD":  "â‰ˆ {{ad}} (à¤ˆ.à¤¸à¤‚.)",
                  "approximateBS":  "â‰ˆ à¤µà¤¿.à¤¸à¤‚. {{bs}}"
              },
    "dashboard":  {
                      "title":  "à¤•à¥à¤‚à¤¡à¤²à¥€à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡",
                      "changeDetails":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£ à¤¬à¤¦à¤²à¥‡à¤‚",
                      "ascendant":  "à¤²à¤—à¥à¤¨",
                      "sign":  "à¤°à¤¾à¤¶à¤¿",
                      "lord":  "à¤¸à¥à¤µà¤¾à¤®à¥€",
                      "degree":  "à¤…à¤‚à¤¶",
                      "nakshatra":  "à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                      "planets":  "à¤—à¥à¤°à¤¹ à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¯à¤¾à¤",
                      "failed":  "à¤•à¥à¤‚à¤¡à¤²à¥€ à¤—à¤£à¤¨à¤¾ à¤µà¤¿à¤«à¤²à¥¤"
                  },
    "settings":  {
                     "language":  "à¤­à¤¾à¤·à¤¾",
                     "palette":  "à¤°à¤‚à¤— à¤ªà¥ˆà¤²à¥‡à¤Ÿ",
                     "light":  "à¤¹à¤²à¥à¤•à¤¾",
                     "dark":  "à¤—à¤¹à¤°à¤¾",
                     "system":  "à¤¸à¤¿à¤¸à¥à¤Ÿà¤®"
                 },
    "chart":  {
                  "title":  "à¤œà¤¨à¥à¤® à¤•à¥à¤‚à¤¡à¤²à¥€ (D1)",
                  "styleNorth":  "à¤‰à¤¤à¥à¤¤à¤° à¤­à¤¾à¤°à¤¤à¥€à¤¯",
                  "styleSouth":  "à¤¦à¤•à¥à¤·à¤¿à¤£ à¤­à¤¾à¤°à¤¤à¥€à¤¯",
                  "planetAbbr":  {
                                     "ascendant":  "à¤²",
                                     "sun":  "à¤¸à¥‚",
                                     "moon":  "à¤šà¤‚",
                                     "mars":  "à¤®à¤‚",
                                     "mercury":  "à¤¬à¥",
                                     "jupiter":  "à¤—à¥",
                                     "venus":  "à¤¶à¥",
                                     "saturn":  "à¤¶",
                                     "rahu":  "à¤°à¤¾",
                                     "ketu":  "à¤•à¥‡"
                                 }
              },
    "cover":  {
                  "birthNakshatra":  "à¤œà¤¨à¥à¤® à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                  "currentPeriod":  "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤…à¤µà¤§à¤¿",
                  "dasha":  "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤¦à¤¶à¤¾",
                  "surya":  "à¤¸à¥‚à¤°à¥à¤¯",
                  "chandra":  "à¤šà¤‚à¤¦à¥à¤°",
                  "lagna":  "à¤²à¤—à¥à¤¨",
                  "strongestHouse":  "à¤¸à¤¬à¤¸à¥‡ à¤®à¤œà¤¬à¥‚à¤¤ à¤­à¤¾à¤µ",
                  "reading":  "à¤µà¥ˆà¤¦à¤¿à¤• à¤œà¤¨à¥à¤® à¤•à¥à¤‚à¤¡à¤²à¥€",
                  "change":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£ à¤¬à¤¦à¤²à¥‡à¤‚"
              },
    "hero":  {
                 "nakshatra":  "à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                 "change":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£ à¤¬à¤¦à¤²à¥‡à¤‚",
                 "surya":  "à¤¸à¥‚à¤°à¥à¤¯",
                 "dasha":  "à¤®à¤¹à¤¾à¤¦à¤¶à¤¾",
                 "chandra":  "à¤šà¤‚à¤¦à¥à¤°",
                 "lagna":  "à¤²à¤—à¥à¤¨",
                 "reading":  "à¤µà¥ˆà¤¦à¤¿à¤• à¤œà¤¨à¥à¤® à¤•à¥à¤‚à¤¡à¤²à¥€"
             }
}
``````

#### `src\i18n\locales\ne.json`

```json
{
    "app":  {
                "name":  "à¤•à¥à¤£à¥à¤¡à¤²à¥€à¤¯à¤¾à¤¤à¥à¤°à¤¾",
                "tagline":  "à¤¤à¤ªà¤¾à¤ˆà¤‚à¤•à¥‹ à¤µà¥ˆà¤¦à¤¿à¤• à¤œà¤¨à¥à¤® à¤•à¥à¤£à¥à¤¡à¤²à¥€, à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤°à¥‚à¤ªà¤®à¤¾à¥¤",
                "print":  "à¤ªà¥à¤°à¤¿à¤¨à¥à¤Ÿ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥"
            },
    "common":  {
                   "change":  "à¤ªà¤°à¤¿à¤µà¤°à¥à¤¤à¤¨",
                   "reset":  "à¤°à¤¿à¤¸à¥‡à¤Ÿ",
                   "loading":  "à¤²à¥‹à¤¡ à¤¹à¥à¤à¤¦à¥ˆà¤›...",
                   "searching":  "à¤–à¥‹à¤œà¥à¤¦à¥ˆà¤›...",
                   "noResults":  "\"{{query}}\" à¤¸à¤à¤— à¤®à¤¿à¤²à¥à¤¨à¥‡ à¤¶à¤¹à¤° à¤­à¥‡à¤Ÿà¤¿à¤à¤¨à¥¤",
                   "searchFailed":  "à¤–à¥‹à¤œ à¤…à¤¸à¤«à¤²à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥à¤¨à¤ƒ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤"
               },
    "birth":  {
                  "title":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£",
                  "subtitle":  "à¤¸à¤®à¤¯ à¤œà¤¨à¥à¤® à¤¶à¤¹à¤°à¤•à¥‹ à¤¸à¤®à¤¯ à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¤®à¤¾ à¤²à¤¿à¤‡à¤¨à¥‡à¤›à¥¤",
                  "name":  "à¤¨à¤¾à¤®",
                  "namePlaceholder":  "à¤œà¤¸à¥à¤¤à¥ˆ à¤¬à¤¿à¤•à¤¾à¤¶ à¤®à¥‹à¤•à¥à¤¤à¤¾à¤¨",
                  "date":  "à¤œà¤¨à¥à¤® à¤®à¤¿à¤¤à¤¿",
                  "time":  "à¤œà¤¨à¥à¤® à¤¸à¤®à¤¯",
                  "city":  "à¤œà¤¨à¥à¤® à¤¶à¤¹à¤°",
                  "cityPlaceholder":  "à¤¶à¤¹à¤°à¤•à¥‹ à¤¨à¤¾à¤® à¤²à¥‡à¤–à¥à¤¨à¥à¤¹à¥‹à¤¸à¥...",
                  "submit":  "à¤•à¥à¤£à¥à¤¡à¤²à¥€ à¤¹à¥‡à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥",
                  "interpretedAs":  "à¤¯à¤¸ à¤°à¥‚à¤ªà¤®à¤¾ à¤µà¥à¤¯à¤¾à¤–à¥à¤¯à¤¾",
                  "errors":  {
                                 "nameRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¨à¤¾à¤® à¤²à¥‡à¤–à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤",
                                 "nameTooLong":  "à¤¨à¤¾à¤® à¤§à¥‡à¤°à¥ˆ à¤²à¤¾à¤®à¥‹ à¤› (à¤…à¤§à¤¿à¤•à¤¤à¤® 100 à¤…à¤•à¥à¤·à¤°)à¥¤",
                                 "dateRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤®à¤¿à¤¤à¤¿ à¤²à¥‡à¤–à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤",
                                 "dateTooEarly":  "à¤œà¤¨à¥à¤® à¤µà¤°à¥à¤· 1900 à¤µà¤¾ à¤ªà¤›à¤¿à¤•à¥‹ à¤¹à¥à¤¨à¥à¤ªà¤°à¥à¤›à¥¤",
                                 "dateFuture":  "à¤œà¤¨à¥à¤® à¤®à¤¿à¤¤à¤¿ à¤­à¤µà¤¿à¤·à¥à¤¯à¤®à¤¾ à¤¹à¥à¤¨ à¤¸à¤•à¥à¤¦à¥ˆà¤¨à¥¤",
                                 "timeRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤¸à¤®à¤¯ à¤²à¥‡à¤–à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤",
                                 "placeRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤¶à¤¹à¤° à¤›à¤¾à¤¨à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤",
                                 "invalidDateTime":  "à¤¤à¥à¤¯à¥‹ à¤®à¤¿à¤¤à¤¿/à¤¸à¤®à¤¯ {{timezone}} à¤®à¤¾ à¤®à¤¾à¤¨à¥à¤¯ à¤›à¥ˆà¤¨à¥¤"
                             },
                  "calendarBS":  "à¤µà¤¿.à¤¸à¤‚.",
                  "calendarAD":  "à¤ˆ.à¤¸à¤‚.",
                  "approximateAD":  "â‰ˆ {{ad}} (à¤ˆ.à¤¸à¤‚.)",
                  "approximateBS":  "â‰ˆ à¤µà¤¿.à¤¸à¤‚. {{bs}}"
              },
    "dashboard":  {
                      "title":  "à¤•à¥à¤£à¥à¤¡à¤²à¥€à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¡à¥à¤¯à¤¾à¤¸à¤¬à¥‹à¤°à¥à¤¡",
                      "changeDetails":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£ à¤ªà¤°à¤¿à¤µà¤°à¥à¤¤à¤¨",
                      "ascendant":  "à¤²à¤—à¥à¤¨",
                      "sign":  "à¤°à¤¾à¤¶à¤¿",
                      "lord":  "à¤¸à¥à¤µà¤¾à¤®à¥€",
                      "degree":  "à¤…à¤‚à¤¶",
                      "nakshatra":  "à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                      "planets":  "à¤—à¥à¤°à¤¹ à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¹à¤°à¥‚",
                      "failed":  "à¤•à¥à¤£à¥à¤¡à¤²à¥€ à¤—à¤£à¤¨à¤¾ à¤…à¤¸à¤«à¤²à¥¤"
                  },
    "settings":  {
                     "language":  "à¤­à¤¾à¤·à¤¾",
                     "palette":  "à¤°à¤™ à¤ªà¥à¤¯à¤¾à¤²à¥‡à¤Ÿ",
                     "light":  "à¤‰à¤œà¥à¤¯à¤¾à¤²à¥‹",
                     "dark":  "à¤…à¤à¤§à¥à¤¯à¤¾à¤°à¥‹",
                     "system":  "à¤¸à¤¿à¤¸à¥à¤Ÿà¤®"
                 },
    "chart":  {
                  "title":  "à¤œà¤¨à¥à¤® à¤•à¥à¤£à¥à¤¡à¤²à¥€ (D1)",
                  "styleNorth":  "à¤‰à¤¤à¥à¤¤à¤° à¤­à¤¾à¤°à¤¤à¥€à¤¯",
                  "styleSouth":  "à¤¦à¤•à¥à¤·à¤¿à¤£ à¤­à¤¾à¤°à¤¤à¥€à¤¯",
                  "planetAbbr":  {
                                     "ascendant":  "à¤²",
                                     "sun":  "à¤¸à¥‚",
                                     "moon":  "à¤šà¤‚",
                                     "mars":  "à¤®à¤‚",
                                     "mercury":  "à¤¬à¥",
                                     "jupiter":  "à¤—à¥",
                                     "venus":  "à¤¶à¥",
                                     "saturn":  "à¤¶",
                                     "rahu":  "à¤°à¤¾",
                                     "ketu":  "à¤•à¥‡"
                                 }
              },
    "cover":  {
                  "birthNakshatra":  "à¤œà¤¨à¥à¤® à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                  "currentPeriod":  "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤…à¤µà¤§à¤¿",
                  "dasha":  "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤¦à¤¶à¤¾",
                  "surya":  "à¤¸à¥‚à¤°à¥à¤¯",
                  "chandra":  "à¤šà¤¨à¥à¤¦à¥à¤°",
                  "lagna":  "à¤²à¤—à¥à¤¨",
                  "strongestHouse":  "à¤¸à¤¬à¥ˆà¤­à¤¨à¥à¤¦à¤¾ à¤¬à¤²à¤¿à¤¯à¥‹ à¤­à¤¾à¤µ",
                  "reading":  "à¤µà¥ˆà¤¦à¤¿à¤• à¤œà¤¨à¥à¤® à¤•à¥à¤£à¥à¤¡à¤²à¥€",
                  "change":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£ à¤ªà¤°à¤¿à¤µà¤°à¥à¤¤à¤¨"
              },
    "hero":  {
                 "nakshatra":  "à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                 "change":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£ à¤ªà¤°à¤¿à¤µà¤°à¥à¤¤à¤¨",
                 "surya":  "à¤¸à¥‚à¤°à¥à¤¯",
                 "dasha":  "à¤®à¤¹à¤¾à¤¦à¤¶à¤¾",
                 "chandra":  "à¤šà¤¨à¥à¤¦à¥à¤°",
                 "lagna":  "à¤²à¤—à¥à¤¨",
                 "reading":  "à¤µà¥ˆà¤¦à¤¿à¤• à¤œà¤¨à¥à¤® à¤•à¥à¤£à¥à¤¡à¤²à¥€"
             }
}
``````

### Styles

#### `src\styles\globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 32 95% 44%;
    --primary-foreground: 0 0% 100%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 32 95% 44%;
    --radius: 0.625rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 38 92% 50%;
    --primary-foreground: 240 10% 3.9%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 38 92% 50%;
  }
  [data-palette='violet'] { --primary: 262 83% 58%; --ring: 262 83% 58%; }
  [data-palette='violet'].dark { --primary: 263 70% 50%; --ring: 263 70% 50%; }
  [data-palette='green'] { --primary: 142 76% 36%; --ring: 142 76% 36%; }
  [data-palette='green'].dark { --primary: 142 71% 45%; --ring: 142 71% 45%; }
  [data-palette='rose'] { --primary: 346 77% 50%; --ring: 346 77% 50%; }
  [data-palette='rose'].dark { --primary: 346 77% 50%; --ring: 346 77% 50%; }
  [data-palette='slate'] { --primary: 215 25% 27%; --ring: 215 25% 27%; }
  [data-palette='slate'].dark { --primary: 215 20% 65%; --ring: 215 20% 65%; }
  * { @apply border-border; }
  body { @apply bg-background text-foreground font-sans; font-feature-settings: 'rlig' 1, 'calt' 1; }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PATRIKA â€” Traditional Nepali document styles
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

:root {
  /* Traditional patrika colors */
  --patrika-red: 355 65% 42%;
  --patrika-red-deep: 355 70% 32%;
  --patrika-green: 150 55% 30%;
  --patrika-green-soft: 150 40% 45%;
  --patrika-paper: 42 55% 96%;
  --patrika-paper-warm: 38 60% 93%;
  --patrika-gold: 38 85% 55%;
  --patrika-maroon: 8 60% 28%;
  --patrika-ink: 25 45% 20%;
}

/* â”€â”€â”€ Traditional Devanagari display fonts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.font-dev-display {
  font-family: 'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif;
}

.font-dev-serif {
  font-family: 'Noto Serif Devanagari', 'Crimson Pro', Georgia, serif;
}

.font-dev-sans {
  font-family: 'Noto Sans Devanagari', 'Inter', system-ui, sans-serif;
}

.font-sanskrit {
  font-family: 'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif;
  letter-spacing: 0.01em;
}

/* â”€â”€â”€ Patrika layout primitives â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-paper {
  background-color: hsl(var(--patrika-paper));
  background-image:
    radial-gradient(hsl(38 40% 88% / 0.4) 1px, transparent 1px),
    radial-gradient(hsl(38 40% 88% / 0.25) 1px, transparent 1px);
  background-size: 20px 20px, 40px 40px;
  background-position: 0 0, 10px 10px;
}

.patrika-ledger-row {
  display: grid;
  grid-template-columns: minmax(9rem, 1fr) 2fr;
  gap: 1rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid hsl(var(--patrika-gold) / 0.35);
  align-items: baseline;
}

.patrika-ledger-row:last-child {
  border-bottom: none;
}

.patrika-ledger-label {
  font-family: 'Noto Serif Devanagari', serif;
  font-size: 0.95rem;
  color: hsl(var(--patrika-maroon));
  font-weight: 500;
  letter-spacing: 0.02em;
}

.patrika-ledger-value {
  font-family: 'Noto Serif Devanagari', serif;
  font-size: 0.95rem;
  color: hsl(var(--patrika-ink));
  text-align: right;
  letter-spacing: 0.01em;
}

.patrika-ledger-value.mono {
  font-family: 'Noto Serif Devanagari', ui-monospace, monospace;
  letter-spacing: 0.03em;
}

/* â”€â”€â”€ Ornamental dividers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: hsl(var(--patrika-red));
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  margin: 1.5rem 0;
}

.patrika-ornament::before,
.patrika-ornament::after {
  content: '';
  height: 1px;
  flex: 1;
  max-width: 6rem;
  background: linear-gradient(to right, transparent, hsl(var(--patrika-red) / 0.6), transparent);
}

/* â”€â”€â”€ Traditional double border frame â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-frame {
  border: 3px solid hsl(var(--patrika-red));
  padding: 3px;
  background: hsl(var(--patrika-paper));
  box-shadow:
    0 0 0 1px hsl(var(--patrika-gold)),
    inset 0 0 0 1px hsl(var(--patrika-gold)),
    0 0 0 4px hsl(var(--patrika-paper)),
    0 0 0 5px hsl(var(--patrika-red-deep));
}

.patrika-frame-inner {
  border: 1px solid hsl(var(--patrika-gold));
  padding: 1.5rem;
  background: hsl(var(--patrika-paper));
}

/* â”€â”€â”€ Sanskrit shloka block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-shloka {
  font-family: 'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif;
  font-size: 0.95rem;
  line-height: 1.9;
  color: hsl(var(--patrika-maroon));
  text-align: center;
  letter-spacing: 0.01em;
}

/* â”€â”€â”€ Ganesh arch â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-ganesh-arch {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0.75rem 1.5rem 0;
}

.patrika-ganesh-arch::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50% 50% 0 0;
  border: 2px solid hsl(var(--patrika-red));
  border-bottom: none;
  background: radial-gradient(ellipse at center top, hsl(38 60% 92%) 0%, hsl(var(--patrika-paper)) 70%);
  z-index: 0;
}

/* â”€â”€â”€ Ledger title â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-section-title {
  font-family: 'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif;
  font-size: 1.05rem;
  color: hsl(var(--patrika-red-deep));
  text-align: center;
  letter-spacing: 0.15em;
  margin: 1.25rem 0 0.75rem;
}

/* â”€â”€â”€ Devanagari numerals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.dev-numerals {
  font-family: 'Noto Serif Devanagari', serif;
  letter-spacing: 0.02em;
}
``````

#### `src\styles\print.css`

```css
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PRINT STYLESHEET â€” KundaliYatra
   Turns the report into a beautiful A4 document.
   Every rule is scoped to @media print, so screen is unaffected.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

@media print {
  /* â”€â”€â”€ Page setup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  @page {
    size: A4 portrait;
    margin: 15mm 12mm;
  }

  /* â”€â”€â”€ Force light theme â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  :root {
    --background: 42 55% 97% !important;
    --foreground: 25 55% 15% !important;
    --card: 42 55% 97% !important;
    --card-foreground: 25 55% 15% !important;
    --popover: 42 55% 97% !important;
    --popover-foreground: 25 55% 15% !important;
    --primary: 32 95% 40% !important;
    --primary-foreground: 42 55% 97% !important;
    --secondary: 38 40% 90% !important;
    --secondary-foreground: 25 55% 15% !important;
    --muted: 38 40% 92% !important;
    --muted-foreground: 30 40% 40% !important;
    --accent: 38 70% 88% !important;
    --accent-foreground: 25 55% 15% !important;
    --destructive: 0 60% 45% !important;
    --destructive-foreground: 0 0% 100% !important;
    --border: 38 60% 78% !important;
    --input: 38 60% 78% !important;
    --ring: 32 95% 40% !important;
  }

  /* Remove dark class effect */
  html.dark,
  html.dark * {
    color-scheme: light !important;
  }

  html.dark {
    --background: 42 55% 97% !important;
    --foreground: 25 55% 15% !important;
    --card: 42 55% 97% !important;
    --card-foreground: 25 55% 15% !important;
    --primary: 32 95% 40% !important;
    --primary-foreground: 42 55% 97% !important;
    --muted: 38 40% 92% !important;
    --muted-foreground: 30 40% 40% !important;
    --border: 38 60% 78% !important;
  }

  /* â”€â”€â”€ Document body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  html, body {
    background: hsl(42 55% 97%) !important;
    color: hsl(25 55% 15%) !important;
    font-size: 10pt;
    line-height: 1.5;
  }

  /* â”€â”€â”€ Hide non-printable UI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  .no-print,
  header.sticky,
  button,
  [role="button"],
  [role="combobox"],
  .sonner-toaster,
  [data-sonner-toaster],
  nav {
    display: none !important;
  }

  /* The `no-print` class we set explicitly overrides this */
  .no-print.force-print {
    display: block !important;
  }

  /* â”€â”€â”€ Container sizing â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  .container,
  [class*="max-w-"] {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* â”€â”€â”€ Remove screen-only effects â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  * {
    box-shadow: none !important;
    text-shadow: none !important;
    backdrop-filter: none !important;
    transition: none !important;
    animation: none !important;
  }

  /* â”€â”€â”€ Sections â€” avoid splitting mid-section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  section,
  article,
  .card,
  [class*="rounded-"] {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* â”€â”€â”€ Cards â€” border only, no shadow â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  [class*="rounded-xl"],
  [class*="rounded-2xl"],
  [class*="rounded-lg"] {
    border: 1px solid hsl(38 60% 78%) !important;
    background: white !important;
    padding: 12pt !important;
    margin-bottom: 8pt !important;
  }

  /* â”€â”€â”€ Charts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  svg {
    max-width: 340px !important;
    height: auto !important;
    display: block;
    margin: 0 auto;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* Thinner strokes for print resolution */
  svg path,
  svg line,
  svg circle,
  svg rect,
  svg polygon {
    stroke-width: 1 !important;
  }

  /* Slightly smaller text inside charts */
  svg text {
    font-size: 10pt !important;
  }

  /* â”€â”€â”€ Typography for paper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  h1 {
    font-size: 24pt !important;
    line-height: 1.15 !important;
    margin-bottom: 6pt !important;
    color: hsl(25 55% 15%) !important;
  }

  h2 {
    font-size: 16pt !important;
    line-height: 1.2 !important;
    margin-bottom: 5pt !important;
    color: hsl(25 55% 15%) !important;
  }

  h3 {
    font-size: 12pt !important;
    line-height: 1.3 !important;
    margin-bottom: 4pt !important;
  }

  p, span, div, td, th, li {
    font-size: 10pt !important;
    color: inherit;
  }

  .text-xs { font-size: 8pt !important; }
  .text-sm { font-size: 9pt !important; }
  .text-base { font-size: 10pt !important; }
  .text-lg { font-size: 11pt !important; }
  .text-xl { font-size: 13pt !important; }
  .text-2xl { font-size: 16pt !important; }
  .text-3xl { font-size: 20pt !important; }

  /* â”€â”€â”€ Force colors for emphasis â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  .text-primary {
    color: hsl(32 95% 40%) !important;
  }

  .text-muted-foreground {
    color: hsl(30 40% 40%) !important;
  }

  .text-destructive {
    color: hsl(0 60% 45%) !important;
  }

  /* â”€â”€â”€ Backgrounds â€” remove colored tints â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  [class*="bg-primary"],
  [class*="bg-accent"],
  [class*="bg-muted"],
  [class*="bg-emerald"],
  [class*="bg-amber"],
  [class*="bg-red"],
  [class*="bg-purple"],
  [class*="bg-blue"],
  [class*="bg-orange"],
  [class*="from-"] {
    background: white !important;
    background-image: none !important;
  }

  /* â”€â”€â”€ Borders â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  [class*="border-"] {
    border-color: hsl(38 60% 78%) !important;
  }

  /* â”€â”€â”€ Links â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  a {
    color: hsl(32 95% 40%) !important;
    text-decoration: underline;
  }

  /* â”€â”€â”€ Ornamental dividers stay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  [class*="OrnamentalDivider"],
  .ornamental-divider {
    margin: 12pt 0 !important;
  }

  /* â”€â”€â”€ Page breaks â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  .print-page-break {
    page-break-before: always;
    break-before: page;
  }

  .print-avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* â”€â”€â”€ Print footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  .print-footer {
    display: block !important;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 6mm 12mm 4mm;
    text-align: center;
    font-size: 8pt;
    color: hsl(30 40% 50%);
    border-top: 1px solid hsl(38 60% 78%);
    background: white;
  }

  /* â”€â”€â”€ Sacred header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  .sacred-header,
  header[class*="SacredHeader"] {
    page-break-after: avoid;
  }

  /* â”€â”€â”€ Hide hidden elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  .hidden:not(.print-block) {
    display: none !important;
  }

  /* â”€â”€â”€ Prevent orphaned headings â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  h1, h2, h3, h4, h5, h6 {
    break-after: avoid;
    page-break-after: avoid;
  }

  /* â”€â”€â”€ Prevent awkward breaks in lists â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  ul, ol, li {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* â”€â”€â”€ Tables render cleanly â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  table {
    width: 100% !important;
    border-collapse: collapse !important;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  td, th {
    border: 1px solid hsl(38 60% 78%) !important;
    padding: 4pt 6pt !important;
  }

  th {
    background: hsl(38 40% 92%) !important;
    font-weight: 600 !important;
  }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PRINT PREVIEW MODE (optional, for on-screen preview)
   Activate by adding .print-preview to <body>
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.print-preview {
  background: #e5e5e5;
}

body.print-preview #root {
  max-width: 210mm;
  margin: 20mm auto;
  background: white;
  padding: 15mm 12mm;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

body.print-preview header.sticky,
body.print-preview .no-print {
  display: none !important;
}
``````

### Other

#### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KundaliYatra</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Crimson+Pro:wght@500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Symbols+2&family=Tiro+Devanagari+Sanskrit:ital@0;1&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
``````

#### `package.json`

```json
{
  "name": "kundaliyatra",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "3.10.0",
    "@prisri/jyotish": "1.1.7",
    "@radix-ui/react-dialog": "1.1.6",
    "@radix-ui/react-dropdown-menu": "2.1.6",
    "@radix-ui/react-label": "2.1.2",
    "@radix-ui/react-popover": "1.1.6",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-slot": "1.1.2",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "cmdk": "1.0.4",
    "d3-shape": "3.2.0",
    "i18next": "24.2.2",
    "i18next-browser-languagedetector": "8.0.4",
    "lucide-react": "0.475.0",
    "luxon": "3.6.0",
    "nepali-date-converter": "3.4.0",
    "next-themes": "0.4.4",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-hook-form": "7.54.2",
    "react-i18next": "15.4.0",
    "sonner": "2.0.1",
    "tailwind-merge": "2.6.0",
    "tz-lookup": "6.1.25",
    "zod": "3.24.2",
    "zustand": "5.0.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/d3-shape": "3.1.7",
    "@types/luxon": "3.4.2",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@types/tz-lookup": "6.1.2",
    "@vitejs/plugin-react": "^6.1.1",
    "autoprefixer": "10.4.20",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "postcss": "8.4.49",
    "tailwindcss": "3.4.17",
    "tailwindcss-animate": "1.0.7",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.69.0",
    "vite": "^8.3.0"
  }
}
``````

#### `postcss.config.js`

```javascript
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
``````

#### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        display: ['Crimson Pro', 'Noto Sans Devanagari', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
``````

#### `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
``````

#### `tsconfig.json`

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
``````

#### `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
});
``````

---

## 5. Project Conventions

Follow these rules when writing code for KundaliYatra:

### Imports
- Use the `@/` path alias for absolute imports: `@/components/ui/button`
- Relative imports only within the same folder: `./Hero`, `../lib/glyphs`
- Never use `require()` â€” this is a browser app, always use ES `import`

### Components
- Functional components only (no class components)
- Each major section is a **single component** in `src/features/report/sections/`
- Sub-components that are only used once live in the same file
- Sections take `kundli` (and sometimes `profile`) as props â€” no global state reads
- Return `null` for empty states, never crash

### Styling
- Tailwind utility classes
- No inline `style` unless for dynamic values (colors, sizes from JS)
- Use CSS variables: `hsl(var(--primary))`, `hsl(var(--muted-foreground))`
- Cards use `rounded-2xl border bg-card` pattern

### Time & Dates
- **Always** use Luxon for date/time manipulation
- **Never** `new Date(str)` for birth data
- Wall-clock strings + IANA timezone â†’ Luxon DateTime â†’ JS Date (at adapter boundary only)

### Astrology
- The `@prisri/jyotish` library is behind `JyotishPort`
- **Never** import the library outside `src/infrastructure/astrology/`
- The `Kundli` object is large â€” treat it as `Record<string, any>` when reading

### i18n
- All user-facing text has an i18n key
- Languages: `en`, `hi`, `ne`
- Add keys to all three locale files
- Use 	('key.path', { defaultValue: 'Fallback' })"
Add-Line "
Add-Line 
- Strict mode enabled
- Avoid `any` unless interacting with the astrology library
- Use Record<string, any> for library objects

## 6. How to Add Common Things

### Adding a new report section
1. Create src/features/report/sections/NewSection.tsx"
Add-Line '2. Accept kundli as a prop'
Add-Line '3. Import shared primitives from ../primitives/ (Section, GlyphBadge, AttributeBadge)'
Add-Line 
2. Change the color, size, or stroke value
3. All charts update automatically

## 7. Instructions for the AI Assistant

You have now read the entire KundaliYatra codebase. When the user asks you to build something:

### Do
- Follow the existing file structure and naming conventions
- Use the same import patterns (`@/` for absolute, `./` for relative)
- Reuse existing components (`Section`, `GlyphBadge`, `AttributeBadge`, `ChartCard`, etc.)
- Match the visual language (rounded-2xl, warm palette, serif headings)
- Add i18n keys to all 3 locale files
- Write TypeScript with proper types
- Wrap expensive operations in `useMemo`
- Return full, runnable code â€” no `...existing code...` placeholders

### Do Not
- Do not use `require()` in any file (browser app, ES modules only)
- Do not import `@prisri/jyotish` outside `src/infrastructure/astrology/`
- Do not use `new Date(birthString)` â€” always Luxon with timezone
- Do not add new dependencies without a strong reason
- Do not use `any` except for interacting with the Kundli object
- Do not break the three-layer architecture
- Do not hardcode colors â€” use CSS variables or the chart theme

### When Writing Files
Provide the **complete file** â€” no partial snippets â€” because the user pastes directly into their editor or the scaffold script.

---

*End of context document.*
``````

## 3. Source Files (`src/`)

### `src\App.tsx`

```tsx
import { useState } from 'react';
import { OverviewView } from '@/features/overview/OverviewView';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { PaletteSwitcher } from '@/components/palette-switcher';
import { PrintButton } from '@/components/print-button';
import { ChangeBirthDetailsButton } from '@/components/change-birth-details-button';
import { Toaster } from '@/components/ui/sonner';
import { IconSparkle } from '@/components/icons';
import { useTranslation } from 'react-i18next';
import { useActiveProfile } from '@/features/birth-profile/store';
import {
  AppHeaderTabs,
  type AppView,
} from '@/components/app-header-tabs';

export default function App() {
  const { t } = useTranslation();
  const profile = useActiveProfile();
  const [view, setView] = useState<AppView>('chart');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-display font-semibold text-lg">
              <IconSparkle size={20} className="text-primary" />
              {t('app.name')}
            </div>
            <AppHeaderTabs view={view} onChange={setView} />
          </div>
          <div className="flex items-center gap-1">
            {view === 'chart' && profile && (
              <>
                <ChangeBirthDetailsButton />
                <PrintButton />
                <div className="w-px h-5 bg-border mx-1" />
              </>
            )}
            <LanguageSwitcher />
            <PaletteSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        {view === 'chart' ? (
          <OverviewView />
        ) : (
          <div className="container mx-auto max-w-3xl px-4 py-20 text-center space-y-3">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
              {t('panchang.eyebrow', { defaultValue: 'Vedic Calendar' })}
            </p>
            <h1
              className="font-bold"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              }}
            >
              {t('panchang.title', { defaultValue: 'Daily Panchang' })}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('panchang.comingSoon', { defaultValue: 'Coming in the next stepâ€¦' })}
            </p>
          </div>
        )}
      </main>

      <Toaster richColors position="top-center" />
    </div>
  );
}
``````

### `src\App.tsx.bak-20260921-221415`

_(binary or unsupported file type: .bak-20260921-221415, 1.7 KB)_

### `src\components\app-header-tabs.tsx`

```tsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export type AppView = 'chart' | 'panchang';

interface AppHeaderTabsProps {
  view: AppView;
  onChange: (view: AppView) => void;
}

export function AppHeaderTabs({ view, onChange }: AppHeaderTabsProps) {
  const { t } = useTranslation();

  const tabs: Array<{ key: AppView; label: string }> = [
    { key: 'chart', label: t('nav.chart', { defaultValue: 'Chart' }) },
    { key: 'panchang', label: t('nav.panchang', { defaultValue: 'Panchang' }) },
  ];

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg border bg-muted/40 no-print">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          variant="ghost"
          size="sm"
          onClick={() => onChange(tab.key)}
          className={cn(
            'h-7 px-3 text-xs transition-colors rounded-md',
            view === tab.key
              ? 'bg-background text-foreground shadow-sm hover:bg-background'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
``````

### `src\components\bs-date-picker.tsx`

```tsx
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  NEPALI_MONTHS,
  NEPALI_MONTHS_EN,
  BS_MIN_YEAR,
  BS_MAX_YEAR,
  daysInBsMonth,
  toDevanagari,
  toGregorianISO,
  type BSDate,
} from '@/infrastructure/calendar/nepali-date';

interface Props {
  value: BSDate | null;
  onChange: (isoGregorian: string) => void;
  /** Show Devanagari numerals + Nepali month names */
  nepaliScript?: boolean;
}

const FALLBACK: BSDate = { year: 2048, month: 2, day: 15 };

export function BSDatePicker({ value, onChange, nepaliScript = true }: Props) {
  const { i18n } = useTranslation();
  const isNepali = nepaliScript || (i18n.resolvedLanguage ?? 'en') === 'ne';

  const current = value ?? FALLBACK;

  const monthNames = isNepali ? NEPALI_MONTHS : NEPALI_MONTHS_EN;

  const maxDay = useMemo(
    () => daysInBsMonth(current.year, current.month),
    [current.year, current.month]
  );

  // Clamp day if month/year changed
  useEffect(() => {
    if (current.day > maxDay) {
      const next = { ...current, day: maxDay };
      const iso = toGregorianISO(next);
      if (iso) onChange(iso);
    }
  }, [maxDay, current, onChange]);

  const emit = (patch: Partial<BSDate>) => {
    const next: BSDate = { ...current, ...patch };
    // Clamp day if month shrinks
    const dim = daysInBsMonth(next.year, next.month);
    if (next.day > dim) next.day = dim;
    const iso = toGregorianISO(next);
    if (iso) onChange(iso);
  };

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = BS_MAX_YEAR; y >= BS_MIN_YEAR; y--) arr.push(y);
    return arr;
  }, []);

  const days = useMemo(() => {
    const arr: number[] = [];
    for (let d = 1; d <= maxDay; d++) arr.push(d);
    return arr;
  }, [maxDay]);

  const fmt = (n: number) => (isNepali ? toDevanagari(n) : String(n));

  return (
    <div className="grid grid-cols-3 gap-2">
      <Select
        value={String(current.year)}
        onValueChange={(v) => emit({ year: Number(v) })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {fmt(y)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={String(current.month)}
        onValueChange={(v) => emit({ month: Number(v) })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {monthNames.map((name, idx) => (
            <SelectItem key={idx} value={String(idx)}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={String(current.day)}
        onValueChange={(v) => emit({ day: Number(v) })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {days.map((d) => (
            <SelectItem key={d} value={String(d)}>
              {fmt(d)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
``````

### `src\components\change-birth-details-button.tsx`

```tsx
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBirthStore } from '@/features/birth-profile/store';

/**
 * Nav-bar button to reset the active profile and return to the birth form.
 * Only visible when a profile is loaded.
 */
export function ChangeBirthDetailsButton() {
  const { t } = useTranslation();
  const clearAll = useBirthStore((s) => s.clearAll);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={clearAll}
      className="gap-1.5 no-print"
      title={t('hero.change', { defaultValue: 'Change Birth Details' })}
    >
      <RotateCcw size={14} />
      <span className="hidden sm:inline text-xs">
        {t('hero.change', { defaultValue: 'Change' })}
      </span>
    </Button>
  );
}
``````

### `src\components\icons.ts`

```typescript
export {
  MapPin as IconPin,
  Clock as IconClock,
  Calendar as IconCalendar,
  Search as IconSearch,
  Sun as IconSun,
  Moon as IconMoon,
  Globe as IconGlobe,
  Check as IconCheck,
  ChevronsUpDown as IconChevronsUpDown,
  CircleAlert as IconAlert,
  Sparkles as IconSparkle,
  Palette as IconPalette,
  Languages as IconLanguages,
  ChartBar as IconChart,
  User as IconUser,
  Loader2 as IconLoader,
} from 'lucide-react';
``````

### `src\components\language-switcher.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconGlobe, IconCheck } from '@/components/icons';
import { SUPPORTED_LANGS, LANG_META, type SupportedLang } from '@/i18n';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? 'en') as SupportedLang;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <IconGlobe size={16} />
          <span className="hidden sm:inline">{LANG_META[current]?.native ?? 'English'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGS.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            className="gap-2"
          >
            <IconCheck size={14} className={current === lng ? 'opacity-100' : 'opacity-0'} />
            <span>{LANG_META[lng].native}</span>
            <span className="ml-auto text-xs text-muted-foreground">{LANG_META[lng].label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
``````

### `src\components\palette-provider.tsx`

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type PaletteName = 'amber' | 'violet' | 'green' | 'rose' | 'slate';

const STORAGE_KEY = 'kundaliyatra-palette';

interface PaletteContextValue {
  palette: PaletteName;
  setPalette: (p: PaletteName) => void;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteName>(() => {
    if (typeof window === 'undefined') return 'amber';
    return (localStorage.getItem(STORAGE_KEY) as PaletteName) || 'amber';
  });

  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    localStorage.setItem(STORAGE_KEY, palette);
  }, [palette]);

  return (
    <PaletteContext.Provider value={{ palette, setPalette: setPaletteState }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error('usePalette must be used within PaletteProvider');
  return ctx;
}
``````

### `src\components\palette-switcher.tsx`

```tsx
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconPalette, IconCheck } from '@/components/icons';
import { usePalette, type PaletteName } from './palette-provider';
import { useTranslation } from 'react-i18next';

const PALETTES: { value: PaletteName; swatch: string }[] = [
  { value: 'amber', swatch: 'hsl(32 95% 44%)' },
  { value: 'violet', swatch: 'hsl(262 83% 58%)' },
  { value: 'green', swatch: 'hsl(142 76% 36%)' },
  { value: 'rose', swatch: 'hsl(346 77% 50%)' },
  { value: 'slate', swatch: 'hsl(215 25% 27%)' },
];

export function PaletteSwitcher() {
  const { palette, setPalette } = usePalette();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={t('settings.palette')}>
          <IconPalette size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {PALETTES.map((p) => (
          <DropdownMenuItem
            key={p.value}
            onClick={() => setPalette(p.value)}
            className="gap-2"
          >
            <IconCheck size={14} className={palette === p.value ? 'opacity-100' : 'opacity-0'} />
            <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: p.swatch }} />
            <span className="capitalize">{p.value}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
``````

### `src\components\print-button.tsx`

```tsx
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Print button. Triggers the browser's native print dialog.
 * Users can then "Save as PDF" or send to a physical printer.
 *
 * Hidden on print itself (via `no-print` class).
 */
export function PrintButton() {
  const { t } = useTranslation();

  const handlePrint = () => {
    // Small delay to allow any state to flush before printing
    setTimeout(() => window.print(), 50);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handlePrint}
      className="gap-1.5 no-print"
      title={t('app.print', { defaultValue: 'Print / Save as PDF' })}
    >
      <Printer size={14} />
      <span className="hidden sm:inline text-xs">
        {t('app.print', { defaultValue: 'Print' })}
      </span>
    </Button>
  );
}
``````

### `src\components\theme-provider.tsx`

```tsx
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
``````

### `src\components\theme-toggle.tsx`

```tsx
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconSun, IconMoon, IconCheck } from '@/components/icons';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconSun size={18} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <IconMoon size={18} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(['light', 'dark', 'system'] as const).map((mode) => (
          <DropdownMenuItem key={mode} onClick={() => setTheme(mode)} className="gap-2">
            <IconCheck size={14} className={theme === mode ? 'opacity-100' : 'opacity-0'} />
            <span>{t(`settings.${mode}`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
``````

### `src\components\ui\button.tsx`

```tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
``````

### `src\components\ui\card.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
``````

### `src\components\ui\command.tsx`

```tsx
import * as React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0 shadow-lg">
      <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
);

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50',
      className
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />
);
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
``````

### `src\components\ui\dialog.tsx`

```tsx
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
``````

### `src\components\ui\dropdown-menu.tsx`

```tsx
import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
``````

### `src\components\ui\input.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
``````

### `src\components\ui\label.tsx`

```tsx
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
``````

### `src\components\ui\popover.tsx`

```tsx
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
``````

### `src\components\ui\select.tsx`

```tsx
import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out',
        position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
``````

### `src\components\ui\sonner.tsx`

```tsx
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
``````

### `src\domain\astrology\birth-data.ts`

```typescript
import type { Place } from '../geo/place';

export interface BirthData {
  id: string;
  profileName: string;
  localDate: string;
  localTime: string;
  place: Place;
  createdAt: string;
}
``````

### `src\domain\astrology\port.ts`

```typescript
import type { Kundli, KundliConfig } from '@prisri/jyotish';
import type { BirthData } from './birth-data';

export interface ChalitPlanet {
  name: string;
  longitude: number;
  degree: number;
  minute: number;
  second: number;
  rashi: number;
  rashiName: string;
  rashiHouse: number;
  house: number;
  shifted: number;
  housePosition: number;
  housePositionDegree: number;
  housePositionMinute: number;
  percentage: number;
  isRetrograde: boolean;
  isCombust: boolean;
}

export interface ChalitCusp {
  houseNumber: number;
  startLongitude: number;
  endLongitude: number;
  rashi: number;
  rashiName: string;
}

export interface ChalitChartData {
  system: string;
  planets: ChalitPlanet[];
  housesCusps: ChalitCusp[];
}

// The library's PanchangamDetails shape (from types.d.ts)
export interface PanchangamTime {
  start?: Date | string;
  end?: Date | string;
  name?: string;
}

export interface PanchangamData {
  tithi?: { name: string; number?: number; index?: number };
  paksha?: string;
  vara?: { name: string; number?: number };
  nakshatra?: { name: string; number?: number };
  nakshatraPada?: number;
  yoga?: { name: string; number?: number };
  karana?: { name: string; number?: number };
  sunrise?: Date | string;
  sunset?: Date | string;
  rahuKalam?: PanchangamTime;
  abhijitMuhurta?: PanchangamTime;
  brahmaMuhurta?: PanchangamTime;
  currentHora?: { lord: string };
}

export type ChalitMethod = 'sripati' | 'equal_house';

export interface JyotishPort {
  calculate(data: BirthData, config?: KundliConfig): Kundli;
  getChalit(kundli: Kundli, method: ChalitMethod): ChalitChartData;
  getPanchangam(date: Date, lat: number, lon: number): PanchangamData;
}
``````

### `src\domain\geo\place.ts`

```typescript
export interface Place {
  id: string;
  label: string;
  shortLabel: string;
  lat: number;
  lon: number;
  timezone: string;
  countryCode?: string;
  admin1?: string;
  placeType: 'city' | 'town' | 'village' | 'unknown';
}

export function isValidLatitude(lat: number): boolean {
  return Number.isFinite(lat) && lat >= -90 && lat <= 90;
}

export function isValidLongitude(lon: number): boolean {
  return Number.isFinite(lon) && lon >= -180 && lon <= 180;
}

export function isValidTimezone(tz: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export function isPlaceValid(place: unknown): place is Place {
  if (!place || typeof place !== 'object') return false;
  const p = place as Place;
  return (
    isValidLatitude(p.lat) &&
    isValidLongitude(p.lon) &&
    isValidTimezone(p.timezone) &&
    typeof p.label === 'string' &&
    p.label.trim().length > 0
  );
}
``````

### `src\domain\geo\port.ts`

```typescript
import type { Place } from './place';

export type PlaceSearchResult = Omit<Place, 'timezone'>;

export interface GeocoderPort {
  search(query: string, signal: AbortSignal): Promise<PlaceSearchResult[]>;
}
``````

### `src\features\birth-profile\components\BirthDateField.tsx`

```tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BSDatePicker } from '@/components/bs-date-picker';
import {
  fromGregorianISO,
  toGregorianISO,
  formatADFromISO,
  type BSDate,
} from '@/infrastructure/calendar/nepali-date';

type CalendarMode = 'bs' | 'ad';

interface Props {
  value: string; // Gregorian ISO "YYYY-MM-DD"
  onChange: (iso: string) => void;
  minYear?: number;
  maxYear?: number;
}

export function BirthDateField({ value, onChange, minYear, maxYear }: Props) {
  const { t, i18n } = useTranslation();

  // Default to B.S. if UI language is Nepali, else A.D.
  const initialMode: CalendarMode =
    (i18n.resolvedLanguage ?? 'en') === 'ne' ? 'bs' : 'ad';
  const [mode, setMode] = useState<CalendarMode>(initialMode);

  // Derive B.S. from current Gregorian value
  const [bsValue, setBsValue] = useState<BSDate | null>(() =>
    value ? fromGregorianISO(value) : null
  );

  // Keep B.S. state in sync when user switches to B.S. mode
  useEffect(() => {
    if (mode === 'bs' && value) {
      const converted = fromGregorianISO(value);
      if (converted) setBsValue(converted);
    }
  }, [mode, value]);

  const handleBsChange = (iso: string) => {
    const converted = fromGregorianISO(iso);
    setBsValue(converted);
    onChange(iso);
  };

  const handleAdChange = (iso: string) => {
    onChange(iso);
  };

  return (
    <div className="space-y-2">
      {/* Toggle */}
      <div className="flex items-center gap-1 p-0.5 rounded-md border bg-muted/40 w-fit">
        <Button
          type="button"
          variant={mode === 'bs' ? 'default' : 'ghost'}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setMode('bs')}
        >
          {t('birth.calendarBS')}
        </Button>
        <Button
          type="button"
          variant={mode === 'ad' ? 'default' : 'ghost'}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setMode('ad')}
        >
          {t('birth.calendarAD')}
        </Button>
      </div>

      {/* Picker */}
      {mode === 'bs' ? (
        <BSDatePicker
          value={bsValue}
          onChange={handleBsChange}
          nepaliScript={(i18n.resolvedLanguage ?? 'en') === 'ne'}
        />
      ) : (
        <Input
          type="date"
          value={value}
          min={minYear ? `${minYear}-01-01` : undefined}
          max={maxYear ? `${maxYear}-12-31` : undefined}
          onChange={(e) => handleAdChange(e.target.value)}
        />
      )}

      {/* Approximate A.D. display */}
      {mode === 'bs' && value && (
        <p className="text-xs text-muted-foreground">
          {t('birth.approximateAD', { ad: formatADFromISO(value) })}
        </p>
      )}
      {mode === 'ad' && value && (
        <p className="text-xs text-muted-foreground">
          {t('birth.approximateBS', {
            bs: (() => {
              const converted = fromGregorianISO(value);
              if (!converted) return '—';
              return `${converted.year} ${converted.month + 1} ${converted.day}`;
            })(),
          })}
        </p>
      )}
    </div>
  );
}
``````

### `src\features\birth-profile\components\BirthProfileForm.tsx`

```tsx
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconSparkle } from '@/components/icons';
import { birthFormSchema, type BirthFormValues } from '../schema';
import { useBirthStore } from '../store';
import { PlaceCombobox } from './PlaceCombobox';
import { BirthDateField } from './BirthDateField';
import { PlacePreview } from './PlacePreview';
import type { Place } from '@/domain/geo/place';

const TODAY = new Date().toISOString().slice(0, 10);

export function BirthProfileForm() {
  const { t } = useTranslation();
  const addProfile = useBirthStore((s) => s.addProfile);
  const [showPreview, setShowPreview] = useState(true);

  const form = useForm<BirthFormValues>({
    resolver: zodResolver(birthFormSchema),
    defaultValues: {
      profileName: '',
      localDate: '',
      localTime: '',
      place: null,
    },
    mode: 'onChange',
  });

  const place = form.watch('place');
  const localDate = form.watch('localDate');
  const localTime = form.watch('localTime');

  const onSubmit = (values: BirthFormValues) => {
    if (!values.place) return;
    addProfile({
      profileName: values.profileName,
      localDate: values.localDate,
      localTime: values.localTime,
      place: values.place,
    });
    toast.success(`Chart for ${values.profileName} is ready.`);
  };

  const translateError = (key?: string) =>
    key ? t(`birth.errors.${key}`) : undefined;

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconSparkle size={18} className="text-primary" />
          {t('birth.title')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t('birth.subtitle')}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="profileName">{t('birth.name')}</Label>
            <Input
              id="profileName"
              placeholder={t('birth.namePlaceholder')}
              {...form.register('profileName')}
            />
            {form.formState.errors.profileName && (
              <p className="text-xs text-destructive">
                {translateError(form.formState.errors.profileName.message)}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>{t('birth.date')}</Label>
              <Controller
                control={form.control}
                name="localDate"
                render={({ field }) => (
                  <BirthDateField
                    value={field.value}
                    onChange={field.onChange}
                    minYear={1900}
                    maxYear={new Date().getFullYear()}
                  />
                )}
              />
              {form.formState.errors.localDate && (
                <p className="text-xs text-destructive">
                  {translateError(form.formState.errors.localDate.message)}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="localTime">{t('birth.time')}</Label>
              <Input
                id="localTime"
                type="time"
                step="1"
                {...form.register('localTime')}
              />
              {form.formState.errors.localTime && (
                <p className="text-xs text-destructive">
                  {translateError(form.formState.errors.localTime.message)}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('birth.city')}</Label>
            {!place || !showPreview ? (
              <Controller
                control={form.control}
                name="place"
                render={({ field }) => (
                  <PlaceCombobox
                    value={field.value as Place | null}
                    onChange={(p) => {
                      field.onChange(p);
                      setShowPreview(true);
                    }}
                  />
                )}
              />
            ) : (
              <PlacePreview
                place={place}
                localDate={localDate}
                localTime={localTime}
                onChange={() => setShowPreview(false)}
              />
            )}
            {form.formState.errors.place && (
              <p className="text-xs text-destructive">
                {translateError(form.formState.errors.place.message)}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {t('birth.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
``````

### `src\features\birth-profile\components\PlaceCombobox.tsx`

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { IconCheck, IconChevronsUpDown, IconLoader } from '@/components/icons';
import { cn } from '@/lib/utils';
import { usePlaceSearch } from '../hooks/usePlaceSearch';
import { photonGeocoder } from '@/infrastructure/geo/photon.geocoder';
import { resolveTimezone } from '@/infrastructure/geo/tz.resolver';
import type { Place } from '@/domain/geo/place';
import type { PlaceSearchResult } from '@/domain/geo/port';

interface Props {
  value: Place | null;
  onChange: (place: Place | null) => void;
}

export function PlaceCombobox({ value, onChange }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const search = usePlaceSearch(photonGeocoder, query);

  const handleSelect = (r: PlaceSearchResult) => {
    const { timezone } = resolveTimezone(r.lat, r.lon);
    onChange({ ...r, timezone });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {value ? (
            <span className="truncate">{value.shortLabel}</span>
          ) : (
            <span className="text-muted-foreground">{t('birth.cityPlaceholder')}</span>
          )}
          <IconChevronsUpDown size={16} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t('birth.cityPlaceholder')}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {search.status === 'loading' && (
              <div className="flex items-center gap-2 px-3 py-6 text-sm text-muted-foreground">
                <IconLoader size={14} className="animate-spin" />
                {t('common.searching')}
              </div>
            )}
            {search.status === 'empty' && (
              <CommandEmpty>{t('common.noResults', { query: query.trim() })}</CommandEmpty>
            )}
            {search.status === 'error' && (
              <CommandEmpty>{t('common.searchFailed')}</CommandEmpty>
            )}
            {search.status === 'success' && (
              <CommandGroup heading="Cities">
                {search.results.map((r) => (
                  <CommandItem
                    key={r.id}
                    value={r.id}
                    onSelect={() => handleSelect(r)}
                    className="gap-2"
                  >
                    <IconCheck
                      size={14}
                      className={cn(value?.id === r.id ? 'opacity-100' : 'opacity-0')}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm">{r.shortLabel}</span>
                      <span className="text-xs text-muted-foreground">{r.label}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
``````

### `src\features\birth-profile\components\PlacePreview.tsx`

```tsx
import { DateTime } from 'luxon';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconPin, IconClock } from '@/components/icons';
import { useTranslation } from 'react-i18next';
import type { Place } from '@/domain/geo/place';

interface Props {
  place: Place;
  localDate: string;
  localTime: string;
  onChange: () => void;
}

function fmtLat(lat: number) {
  return `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}`;
}
function fmtLon(lon: number) {
  return `${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? 'E' : 'W'}`;
}

export function PlacePreview({ place, localDate, localTime, onChange }: Props) {
  const { t } = useTranslation();

  let interpreted = '—';
  let utcLine = '';
  let offset = '';

  if (localDate && localTime) {
    const dt = DateTime.fromISO(`${localDate}T${localTime}`, { zone: place.timezone });
    if (dt.isValid) {
      interpreted = dt.toFormat('dd LLL yyyy, hh:mm:ss a');
      utcLine = dt.toUTC().toFormat("dd LLL yyyy, HH:mm:ss 'UTC'");
      offset = dt.toFormat('ZZ');
    } else {
      interpreted = `⚠ ${dt.invalidReason ?? 'Invalid'}`;
    }
  }

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="pt-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <IconPin size={14} />
              {place.label}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {fmtLat(place.lat)}, {fmtLon(place.lon)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <IconClock size={12} />
              {place.timezone} (UTC{offset})
            </div>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onChange}>
            {t('common.change')}
          </Button>
        </div>

        {localDate && localTime && (
          <div className="pt-3 border-t border-primary/20 space-y-0.5">
            <div className="text-xs">
              <span className="text-muted-foreground">
                {t('birth.interpretedAs')}:
              </span>{' '}
              <span className="font-medium">{interpreted}</span>
            </div>
            {utcLine && (
              <div className="text-xs text-muted-foreground font-mono">
                = {utcLine}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
``````

### `src\features\birth-profile\hooks\usePlaceSearch.ts`

```typescript
import { useEffect, useState } from 'react';
import type { GeocoderPort, PlaceSearchResult } from '@/domain/geo/port';

export type PlaceSearchState =
  | { status: 'idle'; results: PlaceSearchResult[] }
  | { status: 'loading'; results: PlaceSearchResult[] }
  | { status: 'success'; results: PlaceSearchResult[] }
  | { status: 'empty'; results: PlaceSearchResult[] }
  | { status: 'error'; results: PlaceSearchResult[]; error: string };

const IDLE: PlaceSearchState = { status: 'idle', results: [] };

export function usePlaceSearch(
  geocoder: GeocoderPort,
  query: string,
  options: { debounceMs?: number; minChars?: number } = {}
): PlaceSearchState {
  const { debounceMs = 300, minChars = 2 } = options;
  const [state, setState] = useState<PlaceSearchState>(IDLE);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < minChars) {
      setState(IDLE);
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setState((s) => ({ status: 'loading', results: s.results }));
      try {
        const results = await geocoder.search(trimmed, ctrl.signal);
        if (ctrl.signal.aborted) return;
        setState({
          status: results.length === 0 ? 'empty' : 'success',
          results,
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setState({
          status: 'error',
          results: [],
          error: (err as Error).message ?? 'Search failed',
        });
      }
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, geocoder, debounceMs, minChars]);

  return state;
}
``````

### `src\features\birth-profile\schema.ts`

```typescript
import { z } from 'zod';
import { DateTime } from 'luxon';
import { isValidLatitude, isValidLongitude, isValidTimezone } from '@/domain/geo/place';

const placeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  shortLabel: z.string().min(1),
  lat: z.number().refine(isValidLatitude, 'Invalid latitude'),
  lon: z.number().refine(isValidLongitude, 'Invalid longitude'),
  timezone: z.string().refine(isValidTimezone, 'Invalid timezone'),
  countryCode: z.string().optional(),
  admin1: z.string().optional(),
  placeType: z.enum(['city', 'town', 'village', 'unknown']),
});

export const birthFormSchema = z
  .object({
    profileName: z.string().trim().min(1, 'nameRequired').max(100, 'nameTooLong'),
    localDate: z.string().min(1, 'dateRequired'),
    localTime: z.string().min(1, 'timeRequired'),
    place: placeSchema.nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.place) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['place'],
        message: 'placeRequired',
      });
      return;
    }

    const dt = DateTime.fromISO(`${data.localDate}T${data.localTime}`, {
      zone: data.place.timezone,
    });

    if (!dt.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['localTime'],
        message: 'invalidDateTime',
      });
      return;
    }

    if (dt.year < 1900) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['localDate'],
        message: 'dateTooEarly',
      });
    }
    if (dt > DateTime.utc()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['localDate'],
        message: 'dateFuture',
      });
    }
  });

export type BirthFormValues = z.infer<typeof birthFormSchema>;
``````

### `src\features\birth-profile\store.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BirthData } from '@/domain/astrology/birth-data';

const STORE_VERSION = 1;

interface BirthStore {
  profiles: Record<string, BirthData>;
  activeProfileId: string | null;
  addProfile: (data: Omit<BirthData, 'id' | 'createdAt'>) => string;
  removeProfile: (id: string) => void;
  setActive: (id: string) => void;
  clearAll: () => void;
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const useBirthStore = create<BirthStore>()(
  persist(
    (set) => ({
      profiles: {},
      activeProfileId: null,

      addProfile: (data) => {
        const id = makeId();
        const full: BirthData = {
          ...data,
          id,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({
          profiles: { ...s.profiles, [id]: full },
          activeProfileId: id,
        }));
        return id;
      },

      removeProfile: (id) =>
        set((s) => {
          const next = { ...s.profiles };
          delete next[id];
          return {
            profiles: next,
            activeProfileId: s.activeProfileId === id ? null : s.activeProfileId,
          };
        }),

      setActive: (id) => set({ activeProfileId: id }),
      clearAll: () => set({ profiles: {}, activeProfileId: null }),
    }),
    { name: 'kundaliyatra-store', version: STORE_VERSION }
  )
);

export const useActiveProfile = (): BirthData | null =>
  useBirthStore((s) =>
    s.activeProfileId ? s.profiles[s.activeProfileId] ?? null : null
  );
``````

### `src\features\chart\ChartPreview.tsx`

```tsx
import { VedicChart } from './components/VedicChart';

export function ChartPreview() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Vedic Chart Preview
        </h1>
        <p className="text-sm text-muted-foreground">
          Session 1 — grid only. Toggle between North Indian and South Indian styles.
          Verify the house layout matches your reference chart.
        </p>
      </div>

      <VedicChart
        size={520}
        defaultStyle="north"
        caption="Empty chart grid — planets coming in Session 2"
      />
    </div>
  );
}
``````

### `src\features\chart\components\BaseChart.tsx`

```tsx
import { useMemo, useId } from 'react';
import {
  getHousePolygon,
  getHouseCentroid,
  getOuterSquarePath,
  getDiamondPath,
  getDiagonalPaths,
  getSouthInnerCells,
  pointsToPath,
  type Point,
} from '../lib/geometry';
import { CHART_THEME } from '../theme';
import type { ChartStyle, ChartHouse, ChartPlanetPlacement } from '../types';

interface BaseChartProps {
  style: ChartStyle;
  size: number;
  houses?: ChartHouse[];
  lang?: 'en' | 'hi' | 'ne';
}

export function BaseChart({ style, size, houses, lang = 'en' }: BaseChartProps) {
  const padding = CHART_THEME.padding;
  const innerSize = size - padding * 2;
  const uid = useId().replace(/:/g, '');

  const outerPath = useMemo(() => getOuterSquarePath(innerSize), [innerSize]);
  const diamondPath = useMemo(
    () => (style === 'north' ? getDiamondPath(innerSize) : null),
    [style, innerSize]
  );
  const diagonals = useMemo(
    () => (style === 'north' ? getDiagonalPaths(innerSize) : []),
    [style, innerSize]
  );

  const houseShapes = useMemo(() => {
    const result: Array<{
      house: number;
      path: string;
      center: Point;
      data: ChartHouse | null;
    }> = [];
    for (let h = 1; h <= 12; h++) {
      const pts = getHousePolygon(h, style);
      if (pts.length === 0) continue;
      const data = houses?.find((hh) => hh.number === h) ?? null;
      result.push({
        house: h,
        path: pointsToPath(pts, innerSize),
        center: getHouseCentroid(h, style),
        data,
      });
    }
    return result;
  }, [style, innerSize, houses]);

  const southInner = useMemo(
    () => (style === 'south' ? getSouthInnerCells(innerSize) : []),
    [style, innerSize]
  );

  const centerX = innerSize / 2;
  const centerY = innerSize / 2;
  const medallionOuter = CHART_THEME.medallionRadius * innerSize;
  const medallionInner = CHART_THEME.medallionInnerRadius * innerSize;
  const imageInset = CHART_THEME.ganeshImageInset * innerSize;
  const imageSize = medallionInner * 2 - imageInset * 2;
  const maskRadius = medallionOuter + 4;

  const houseNumDisplay = (n: number) =>
    lang === 'ne' || lang === 'hi'
      ? String(n).replace(/\d/g, (d) => '०१२३४५६७८९'[Number(d)])
      : String(n);

  const frameGradId = `sacred-frame-${uid}`;
  const ganeshClipId = `ganesh-clip-${uid}`;
  const centerMaskId = `center-mask-${uid}`;
  const innerShadowId = `medallion-inner-shadow-${uid}`;
  const dropShadowFilterId = `medallion-drop-shadow-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={style === 'north' ? 'North Indian chart' : 'South Indian chart'}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      <defs>
        <linearGradient id={frameGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(38 90% 62%)" />
          <stop offset="50%" stopColor="hsl(38 85% 52%)" />
          <stop offset="100%" stopColor="hsl(32 90% 48%)" />
        </linearGradient>

        <clipPath id={ganeshClipId}>
          <circle cx={centerX} cy={centerY} r={medallionInner - 1} />
        </clipPath>

        <mask id={centerMaskId}>
          <rect x={0} y={0} width={innerSize} height={innerSize} fill="white" />
          <circle cx={centerX} cy={centerY} r={maskRadius} fill="black" />
        </mask>

        <radialGradient id={innerShadowId}>
          <stop offset="0%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity="0" />
          <stop offset="70%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity="0" />
          <stop offset="95%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity={CHART_THEME.medallionShadowOpacity} />
          <stop offset="100%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity={CHART_THEME.medallionShadowOpacity + 0.15} />
        </radialGradient>

        {CHART_THEME.medallionDropShadow && (
          <filter id={dropShadowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope={CHART_THEME.medallionDropShadowOpacity} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <rect
        x={padding}
        y={padding}
        width={innerSize}
        height={innerSize}
        rx={CHART_THEME.frameCornerRadius ?? 0}
        ry={CHART_THEME.frameCornerRadius ?? 0}
        fill={CHART_THEME.canvasBg}
        stroke={`url(#${frameGradId})`}
        strokeWidth={CHART_THEME.frameStrokeWidth}
      />
      <rect
        x={padding + 4}
        y={padding + 4}
        width={innerSize - 8}
        height={innerSize - 8}
        rx={Math.max(0, (CHART_THEME.frameCornerRadius ?? 0) - 4)}
        ry={Math.max(0, (CHART_THEME.frameCornerRadius ?? 0) - 4)}
        fill="none"
        stroke={CHART_THEME.frameInnerGlow}
        strokeWidth={1}
      />

      <g transform={`translate(${padding}, ${padding})`}>
        {/* House backgrounds */}
        {houseShapes.map(({ house, path }) => (
          <path key={`bg-${house}`} d={path} fill={CHART_THEME.houseBackground} />
        ))}

        {southInner.map((cell, i) => (
          <rect
            key={`inner-${i}`}
            x={cell.x}
            y={cell.y}
            width={cell.width}
            height={cell.height}
            fill="none"
            stroke={CHART_THEME.innerStroke}
            strokeWidth={CHART_THEME.innerStrokeWidth}
            opacity={0.4}
          />
        ))}

        {/* Medallion */}
        {CHART_THEME.medallionDropShadow && (
          <circle
            cx={centerX}
            cy={centerY}
            r={medallionOuter}
            fill={CHART_THEME.canvasBg}
            filter={`url(#${dropShadowFilterId})`}
          />
        )}
        <circle cx={centerX} cy={centerY} r={medallionInner} fill={CHART_THEME.canvasBg} />
        <circle cx={centerX} cy={centerY} r={medallionInner} fill={`url(#${innerShadowId})`} pointerEvents="none" />
        <g clipPath={`url(#${ganeshClipId})`} opacity={CHART_THEME.ganeshImageOpacity}>
          <image
            href={CHART_THEME.ganeshImagePath}
            x={centerX - imageSize / 2}
            y={centerY - imageSize / 2}
            width={imageSize}
            height={imageSize}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
        <circle
          cx={centerX}
          cy={centerY}
          r={medallionInner - 1}
          fill="none"
          stroke={CHART_THEME.medallionHighlightColor}
          strokeWidth={CHART_THEME.medallionHighlightWidth}
          opacity={0.6}
          pointerEvents="none"
        />
        <circle cx={centerX} cy={centerY} r={medallionOuter} fill="none" stroke={`url(#${frameGradId})`} strokeWidth={1.75} />

        {/* Chart structure (masked) */}
        <g mask={`url(#${centerMaskId})`}>
          <path d={outerPath} fill="none" stroke={CHART_THEME.borderStroke} strokeWidth={CHART_THEME.borderStrokeWidth} />
          {diagonals.map((d, i) => (
            <path key={`diag-${i}`} d={d} fill="none" stroke={CHART_THEME.innerStroke} strokeWidth={CHART_THEME.innerStrokeWidth} />
          ))}
          {diamondPath && (
            <path d={diamondPath} fill="none" stroke={CHART_THEME.innerStroke} strokeWidth={CHART_THEME.innerStrokeWidth} />
          )}
          {style === 'north' &&
            houseShapes.map(({ house, path }) => (
              <path
                key={`outline-${house}`}
                d={path}
                fill="none"
                stroke={CHART_THEME.innerStroke}
                strokeWidth={CHART_THEME.innerStrokeWidth}
              />
            ))}
          {style === 'south' && (
            <>
              {[1, 2, 3].map((i) => (
                <line
                  key={`vline-${i}`}
                  x1={(i * innerSize) / 4}
                  y1={0}
                  x2={(i * innerSize) / 4}
                  y2={innerSize}
                  stroke={CHART_THEME.innerStroke}
                  strokeWidth={CHART_THEME.innerStrokeWidth}
                />
              ))}
              {[1, 2, 3].map((i) => (
                <line
                  key={`hline-${i}`}
                  x1={0}
                  y1={(i * innerSize) / 4}
                  x2={innerSize}
                  y2={(i * innerSize) / 4}
                  stroke={CHART_THEME.innerStroke}
                  strokeWidth={CHART_THEME.innerStrokeWidth}
                />
              ))}
            </>
          )}
        </g>

        {/* Planets + house numbers (masked) */}
        <g mask={`url(#${centerMaskId})`}>
          {houseShapes.map(({ house, center, data }) => (
            <HouseContents
              key={`contents-${house}`}
              house={house}
              center={center}
              size={innerSize}
              planets={data?.planets ?? []}
              numDisplay={houseNumDisplay(house)}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

/**
 * Render house contents — planets stack compactly, adapt to count.
 * Planets group in rows of up to 3, columns adjust.
 */
function HouseContents({
  house,
  center,
  size,
  planets,
  numDisplay,
}: {
  house: number;
  center: Point;
  size: number;
  planets: ChartPlanetPlacement[];
  numDisplay: string;
}) {
  const cx = center.x * size;
  const cy = center.y * size;
  const n = planets.length;

  // Adaptive sizing
  const fontSize = n === 0 ? 0 : n === 1 ? 13 : n === 2 ? 11 : n <= 4 ? 9 : 8;
  const degFontSize = Math.max(7, fontSize - 3);
  const lineHeight = fontSize + 3;
  const colGap = fontSize + 8;

  // Grid layout: max 2 columns, rows as needed
  const cols = n <= 2 ? 1 : n <= 4 ? 2 : 3;
  const rows = Math.ceil(n / cols) || 0;
  const totalWidth = (cols - 1) * colGap;
  const totalHeight = rows * lineHeight;

  const startX = cx - totalWidth / 2;
  const startY = cy - totalHeight / 2 + lineHeight / 2 - (n > 0 ? 4 : 0);

  return (
    <g>
      {/* House number — above the planets */}
      <text
        x={cx}
        y={cy - (n > 0 ? totalHeight / 2 + 10 : 0)}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fontFamily={CHART_THEME.houseNumberFont}
        fontWeight={CHART_THEME.houseNumberWeight}
        fill={CHART_THEME.houseNumberColor}
        opacity={0.55}
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {numDisplay}
      </text>

      {/* Planets grid */}
      {planets.map((p, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * colGap;
        const y = startY + row * lineHeight;

        const color = p.isAscendant ? CHART_THEME.ascendantColor : CHART_THEME.planetColor;
        const weight = p.isAscendant ? 700 : 600;

        return (
          <text
            key={`${p.planet}-${i}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fontFamily={CHART_THEME.planetFont}
            fontWeight={weight}
            fill={color}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          >
            {p.abbr}
            {p.isRetrograde && (
              <tspan fontSize={degFontSize} fill={CHART_THEME.retrogradeColor} dx={0.5} dy={-2}>
                ʳ
              </tspan>
            )}
          </text>
        );
      })}
    </g>
  );
}
``````

### `src\features\chart\components\ChartStyleToggle.tsx`

```tsx
import { Button } from '@/components/ui/button';
import { useChartStyleStore } from '../lib/useChartStyle';
import type { ChartStyle } from '../types';

interface ChartStyleToggleProps {
  value?: ChartStyle;
  onChange?: (style: ChartStyle) => void;
}

export function ChartStyleToggle({ value, onChange }: ChartStyleToggleProps) {
  const { style, setStyle } = useChartStyleStore();
  const current = value ?? style;

  const handleChange = (next: ChartStyle) => {
    if (onChange) onChange(next);
    setStyle(next);
  };

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-md border bg-muted/40 w-fit no-print">
      <Button
        type="button"
        variant={current === 'north' ? 'default' : 'ghost'}
        size="sm"
        className="h-6 px-2 text-[11px]"
        onClick={() => handleChange('north')}
      >
        N
      </Button>
      <Button
        type="button"
        variant={current === 'south' ? 'default' : 'ghost'}
        size="sm"
        className="h-6 px-2 text-[11px]"
        onClick={() => handleChange('south')}
      >
        S
      </Button>
    </div>
  );
}
``````

### `src\features\chart\components\VedicChart.tsx`

```tsx
import { BaseChart } from './BaseChart';
import { ChartStyleToggle } from './ChartStyleToggle';
import { useChartStyleStore } from '../lib/useChartStyle';
import { useTranslation } from 'react-i18next';
import type { ChartStyle, ChartHouse } from '../types';

interface VedicChartProps {
  size?: number;
  defaultStyle?: ChartStyle;
  style?: ChartStyle;       // ← NEW: explicit style (overrides global)
  houses?: ChartHouse[];
  label?: string;
  caption?: string;
  className?: string;
  hideToggle?: boolean;
  lang?: 'en' | 'hi' | 'ne';
}

export function VedicChart({
  size = 320,
  defaultStyle = 'north',
  style: styleProp,
  houses,
  label,
  caption,
  className,
  hideToggle = false,
  lang,
}: VedicChartProps) {
  const { style: globalStyle, setStyle } = useChartStyleStore();
  const { i18n } = useTranslation();

  const resolvedLang = lang ?? ((i18n.resolvedLanguage === 'ne'
    ? 'ne'
    : i18n.resolvedLanguage === 'hi'
      ? 'hi'
      : 'en') as 'en' | 'hi' | 'ne');

  // Priority: explicit prop > global store > default
  const activeStyle = styleProp ?? globalStyle ?? defaultStyle;

  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {label && <p className="text-sm font-semibold">{label}</p>}
        {!hideToggle && (
          <ChartStyleToggle value={activeStyle} onChange={setStyle} />
        )}
      </div>

      <div className="flex justify-center">
        <div className="w-full" style={{ maxWidth: `${size}px` }}>
          <BaseChart
            style={activeStyle}
            size={size}
            houses={houses}
            lang={resolvedLang}
          />
        </div>
      </div>

      {caption && (
        <p className="text-xs text-muted-foreground text-center">{caption}</p>
      )}
    </div>
  );
}
``````

### `src\features\chart\lib\adapters.ts`

```typescript
import type { ChartHouse, ChartPlanetPlacement } from '../types';

const MAIN_PLANETS = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter',
  'Venus', 'Saturn', 'Rahu', 'Ketu',
];

const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

interface RawPlanet {
  rashi?: number;
  rashiName?: string;
  degree?: number;
  minute?: number;
  isRetrograde?: boolean;
  isCombust?: boolean;
}

interface RawVarga {
  ascendant?: { rashi?: number; rashiName?: string };
  planets?: Record<string, RawPlanet>;
  houses?: Array<{
    number: number;
    rashi?: number;
    planets?: string[];
  }>;
}

interface RawKundli {
  ascendant?: { rashiName?: string; degree?: number };
  planets?: Record<string, RawPlanet>;
  houses?: Array<{
    number: number;
    rashi?: number;
    planets?: string[];
  }>;
  vargas?: Record<string, RawVarga>;
}

interface BuildOptions {
  resolveAbbr: (planet: string) => string;
}

function rashiLabel(num: number | undefined, name: string | undefined): string {
  if (name) return name;
  if (num && num >= 1 && num <= 12) return RASHI_NAMES[num - 1];
  return '';
}

/**
 * Convert library houses into our ChartHouse[].
 * Works for both the main chart (from kundli.houses/planets)
 * and any varga (from kundli.vargas.dN.houses/planets).
 */
function buildFromHouses(
  houses: RawVarga['houses'] = [],
  planets: Record<string, RawPlanet> = {},
  ascendant: { rashi?: number; rashiName?: string; degree?: number } | undefined,
  options: BuildOptions
): ChartHouse[] {
  const planetsByHouse: Record<number, string[]> = {};
  for (const h of houses) {
    planetsByHouse[h.number] = h.planets ?? [];
  }

  return houses.map((h) => {
    const housePlanets: ChartPlanetPlacement[] = [];

    // Ascendant marker in House 1
    if (h.number === 1 && ascendant) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: options.resolveAbbr('Ascendant'),
        degree: Math.floor(ascendant.degree ?? 0),
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    // Planets in this house
    for (const planetName of planetsByHouse[h.number] ?? []) {
      if (!MAIN_PLANETS.includes(planetName)) continue;
      const p = planets[planetName];
      if (!p) continue;
      housePlanets.push({
        planet: planetName,
        abbr: options.resolveAbbr(planetName),
        degree: Math.floor(p.degree ?? 0),
        isRetrograde: !!p.isRetrograde,
        isCombust: !!p.isCombust,
        isAscendant: false,
      });
    }

    return {
      number: h.number,
      rashi: rashiLabel(h.rashi, undefined),
      planets: housePlanets,
    };
  });
}

/**
 * Build chart houses for the D1 (main) chart.
 */
export function buildChartHouses(
  kundli: RawKundli,
  options: BuildOptions
): ChartHouse[] {
  return buildFromHouses(
    kundli.houses,
    kundli.planets,
    kundli.ascendant,
    options
  );
}

/**
 * Build chart houses for a specific varga (d9, d10, etc.).
 * Uses the simple { rashi, rashiName } shape from kundli.vargas.dN.
 */
export function buildVargaHouses(
  kundli: RawKundli,
  vargaCode: string,
  options: BuildOptions
): ChartHouse[] {
  const varga = kundli.vargas?.[vargaCode];
  if (!varga) return [];

  // If the varga has full houses[] (like d1), use them directly
  if (varga.houses && varga.houses.length > 0) {
    return buildFromHouses(
      varga.houses,
      varga.planets,
      varga.ascendant,
      options
    );
  }

  // Otherwise, construct houses from the simplified varga
  // (each planet has only rashi/rashiName; we group by rashi to assign houses)
  const ascRashi = varga.ascendant?.rashi ?? 1;

  const planetSigns: Record<string, number> = {};
  for (const [name, p] of Object.entries(varga.planets ?? {})) {
    if (MAIN_PLANETS.includes(name) && p.rashi) {
      planetSigns[name] = p.rashi;
    }
  }

  // Compute house for each planet: house = ((rashi - ascRashi + 12) % 12) + 1
  const planetsByHouse: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) planetsByHouse[h] = [];

  for (const [name, rashi] of Object.entries(planetSigns)) {
    const house = ((rashi - ascRashi + 12) % 12) + 1;
    planetsByHouse[house].push(name);
  }

  // Build houses
  const result: ChartHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseRashi = ((ascRashi + h - 2) % 12) + 1;
    const housePlanets: ChartPlanetPlacement[] = [];

    if (h === 1 && varga.ascendant) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: options.resolveAbbr('Ascendant'),
        degree: 0,
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    for (const planetName of planetsByHouse[h]) {
      const p = varga.planets?.[planetName];
      if (!p) continue;
      housePlanets.push({
        planet: planetName,
        abbr: options.resolveAbbr(planetName),
        degree: Math.floor(p.degree ?? 0),
        isRetrograde: !!p.isRetrograde,
        isCombust: !!p.isCombust,
        isAscendant: false,
      });
    }

    result.push({
      number: h,
      rashi: rashiLabel(houseRashi, undefined),
      planets: housePlanets,
    });
  }

  return result;
}

/**
 * Build chart houses for a reference chart (Chandra Kundli or Surya Kundli).
 * These come from kundli.chandraKundli / kundli.suryaKundli, which have
 * the same shape as varga charts.
 */
export function buildReferenceChartHouses(
  kundli: RawKundli,
  type: 'chandra' | 'surya',
  options: BuildOptions
): ChartHouse[] {
  const ref =
    type === 'chandra'
      ? (kundli as any).chandraKundli
      : (kundli as any).suryaKundli;

  if (!ref) return [];

  // Reference charts use the same shape as vargas: { ascendant, planets, houses }
  if (ref.houses && ref.houses.length > 0) {
    return buildFromHouses(ref.houses, ref.planets, ref.ascendant, options);
  }

  // Fallback: build from planets' rashi values
  const ascRashi = ref.ascendant?.rashi ?? 1;
  const planetSigns: Record<string, number> = {};
  for (const [name, p] of Object.entries(ref.planets ?? {})) {
    if (MAIN_PLANETS.includes(name) && (p as any).rashi) {
      planetSigns[name] = (p as any).rashi;
    }
  }

  const planetsByHouse: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) planetsByHouse[h] = [];
  for (const [name, rashi] of Object.entries(planetSigns)) {
    const house = ((rashi - ascRashi + 12) % 12) + 1;
    planetsByHouse[house].push(name);
  }

  const result: ChartHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseRashi = ((ascRashi + h - 2) % 12) + 1;
    const housePlanets: ChartPlanetPlacement[] = [];

    if (h === 1 && ref.ascendant) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: options.resolveAbbr('Ascendant'),
        degree: 0,
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    for (const planetName of planetsByHouse[h]) {
      const p = ref.planets?.[planetName];
      if (!p) continue;
      housePlanets.push({
        planet: planetName,
        abbr: options.resolveAbbr(planetName),
        degree: Math.floor((p as any).degree ?? 0),
        isRetrograde: !!(p as any).isRetrograde,
        isCombust: !!(p as any).isCombust,
        isAscendant: false,
      });
    }

    result.push({
      number: h,
      rashi: rashiLabel(houseRashi, undefined),
      planets: housePlanets,
    });
  }

  return result;
}

/**
 * Build ChartHouse[] for the Chalit chart.
 * Takes a Chalit result (from JyotishPort.getChalit) and produces
 * houses with planets placed by Chalit house number.
 */
export function buildChalitChartHouses(
  chalit: {
    planets: Array<{
      name: string;
      rashiHouse: number;
      house: number;
      degree: number;
      isRetrograde?: boolean;
      isCombust?: boolean;
    }>;
    housesCusps?: Array<{
      houseNumber: number;
      rashi: number;
      rashiName: string;
    }>;
  },
  resolveAbbr: (planet: string) => string
): ChartHouse[] {
  const RASHI_NAMES = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
  ];

  // Group planets by Chalit house
  const planetsByHouse: Record<number, Array<{
    name: string;
    degree: number;
    isRetrograde: boolean;
    isCombust: boolean;
    isAscendant: boolean;
  }>> = {};

  for (let h = 1; h <= 12; h++) planetsByHouse[h] = [];

  for (const p of chalit.planets ?? []) {
    if (!planetsByHouse[p.house]) planetsByHouse[p.house] = [];
    planetsByHouse[p.house].push({
      name: p.name,
      degree: Math.floor(p.degree ?? 0),
      isRetrograde: !!p.isRetrograde,
      isCombust: !!p.isCombust,
      isAscendant: false,
    });
  }

  // Build houses â€” each house gets the rashi of its cusp (if provided),
  // else derive from the house number assuming whole-sign from Lagna.
  const result: ChartHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const cusp = chalit.housesCusps?.find((c) => c.houseNumber === h);
    const rashiNum = cusp?.rashi ?? h;
    const rashiName = cusp?.rashiName ?? RASHI_NAMES[(rashiNum - 1 + 12) % 12];

    const housePlanets: ChartPlanetPlacement[] = [];

    // Ascendant marker
    if (h === 1) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: resolveAbbr('Ascendant'),
        degree: 0,
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    for (const p of planetsByHouse[h] ?? []) {
      housePlanets.push({
        planet: p.name,
        abbr: resolveAbbr(p.name),
        degree: p.degree,
        isRetrograde: p.isRetrograde,
        isCombust: p.isCombust,
        isAscendant: false,
      });
    }

    result.push({
      number: h,
      rashi: rashiName,
      planets: housePlanets,
    });
  }

  return result;
}
``````

### `src\features\chart\lib\geometry.ts`

```typescript
export interface Point {
  x: number;
  y: number;
}

export type ChartStyle = 'north' | 'south';

// ─── North Indian chart vertices ────────────────────────────
const TL: Point = { x: 0,   y: 0 };
const T:  Point = { x: 0.5, y: 0 };
const TR: Point = { x: 1,   y: 0 };
const R:  Point = { x: 1,   y: 0.5 };
const BR: Point = { x: 1,   y: 1 };
const B:  Point = { x: 0.5, y: 1 };
const BL: Point = { x: 0,   y: 1 };
const L:  Point = { x: 0,   y: 0.5 };
const C:  Point = { x: 0.5, y: 0.5 };

const D1: Point = { x: 0.25, y: 0.25 };
const D2: Point = { x: 0.75, y: 0.25 };
const D3: Point = { x: 0.75, y: 0.75 };
const D4: Point = { x: 0.25, y: 0.75 };

export const NORTH_HOUSE_POLYGONS: Record<number, Point[]> = {
  1:  [T, D2, C, D1],
  2:  [TL, T, D1],
  3:  [TL, D1, L],
  4:  [L, D1, C],
  5:  [L, C, D4],
  6:  [BL, L, D4],
  7:  [BL, D4, B],
  8:  [B, D4, C, D3],
  9:  [B, D3, BR],
  10: [BR, D3, R],
  11: [R, D3, C],
  12: [R, C, D2],
};

export const SOUTH_HOUSE_GRID: Record<number, { row: number; col: number }> = {
  1:  { row: 0, col: 0 },
  2:  { row: 0, col: 1 },
  3:  { row: 0, col: 2 },
  4:  { row: 0, col: 3 },
  5:  { row: 1, col: 3 },
  6:  { row: 2, col: 3 },
  7:  { row: 3, col: 3 },
  8:  { row: 3, col: 2 },
  9:  { row: 3, col: 1 },
  10: { row: 3, col: 0 },
  11: { row: 2, col: 0 },
  12: { row: 1, col: 0 },
};

// ─── Path generation ────────────────────────────────────────
export function pointsToPath(points: Point[], size: number): string {
  if (points.length === 0) return '';
  const cmds = points.map(
    (p, i) => `${i === 0 ? 'M' : 'L'} ${(p.x * size).toFixed(2)} ${(p.y * size).toFixed(2)}`
  );
  return cmds.join(' ') + ' Z';
}

export function centroid(points: Point[]): Point {
  const n = points.length;
  if (n === 0) return { x: 0.5, y: 0.5 };
  const sum = points.reduce(
    (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
    { x: 0, y: 0 }
  );
  return { x: sum.x / n, y: sum.y / n };
}

/** Visual incenter for triangles — better text placement */
export function visualCenter(points: Point[]): Point {
  if (points.length === 3) {
    const [a, b, c] = points;
    const la = Math.hypot(b.x - c.x, b.y - c.y);
    const lb = Math.hypot(a.x - c.x, a.y - c.y);
    const lc = Math.hypot(a.x - b.x, a.y - b.y);
    const sum = la + lb + lc;
    if (sum === 0) return { x: 0.5, y: 0.5 };
    return {
      x: (la * a.x + lb * b.x + lc * c.x) / sum,
      y: (la * a.y + lb * b.y + lc * c.y) / sum,
    };
  }
  return centroid(points);
}

export function getHousePolygon(house: number, style: ChartStyle): Point[] {
  if (style === 'north') {
    return NORTH_HOUSE_POLYGONS[house] ?? [];
  }
  const g = SOUTH_HOUSE_GRID[house];
  if (!g) return [];
  const cell = 1 / 4;
  const x0 = g.col * cell;
  const y0 = g.row * cell;
  return [
    { x: x0,           y: y0 },
    { x: x0 + cell,    y: y0 },
    { x: x0 + cell,    y: y0 + cell },
    { x: x0,           y: y0 + cell },
  ];
}

export function getHouseCentroid(house: number, style: ChartStyle): Point {
  return visualCenter(getHousePolygon(house, style));
}

export function getOuterSquarePath(size: number): string {
  return `M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} Z`;
}

export function getDiamondPath(size: number): string {
  return `M ${size / 2} 0 L ${size} ${size / 2} L ${size / 2} ${size} L 0 ${size / 2} Z`;
}

export function getDiagonalPaths(size: number): string[] {
  return [
    `M 0 0 L ${size} ${size}`,
    `M ${size} 0 L 0 ${size}`,
  ];
}

export function getSouthInnerCells(size: number) {
  const cell = size / 4;
  return [
    { x: cell,     y: cell,     width: cell, height: cell },
    { x: 2 * cell, y: cell,     width: cell, height: cell },
    { x: cell,     y: 2 * cell, width: cell, height: cell },
    { x: 2 * cell, y: 2 * cell, width: cell, height: cell },
  ];
}

/**
 * Generate sunburst rays emanating from the center.
 * Returns an array of {x1, y1, x2, y2} line coordinates.
 */
export function getSunburstRays(
  size: number,
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  rayCount: number
): Array<{ x1: number; y1: number; x2: number; y2: number }> {
  const rays = [];
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * 2 * Math.PI;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    rays.push({
      x1: centerX + cos * innerRadius * size,
      y1: centerY + sin * innerRadius * size,
      x2: centerX + cos * outerRadius * size,
      y2: centerY + sin * outerRadius * size,
    });
  }
  return rays;
}
``````

### `src\features\chart\lib\glyphs.ts`

```typescript
import type { PlanetKey } from '../primitives/GlyphBadge';

// ─── English abbreviations ─────────────────────────────────
export const PLANET_GLYPHS_EN: Record<string, string> = {
  Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me',
  Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa',
  Rahu: 'Ra', Ketu: 'Ke', Ascendant: 'Asc',
};

// ─── Devanagari abbreviations (traditional) ────────────────
export const PLANET_GLYPHS_DEVANAGARI: Record<string, string> = {
  Sun: 'सू',
  Moon: 'चं',
  Mars: 'मं',
  Mercury: 'बु',
  Jupiter: 'बृं',
  Venus: 'शु',
  Saturn: 'श',
  Rahu: 'रा',
  Ketu: 'के',
  Ascendant: 'ल',
};

// Keep the default (English) for backward compatibility
export const PLANET_GLYPHS = PLANET_GLYPHS_EN;

/**
 * Get the correct abbreviation for a planet in a given language.
 */
export function getPlanetAbbr(planet: string, lang: 'en' | 'hi' | 'ne'): string {
  if (lang === 'hi' || lang === 'ne') {
    return PLANET_GLYPHS_DEVANAGARI[planet] ?? PLANET_GLYPHS_EN[planet] ?? planet.slice(0, 2);
  }
  return PLANET_GLYPHS_EN[planet] ?? planet.slice(0, 2);
}

// ─── Rashi glyphs (unchanged) ──────────────────────────────
export const RASHI_GLYPHS: Record<string, string> = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
  Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
  Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
};

// ─── Rashi lords (unchanged) ───────────────────────────────
export const RASHI_LORDS: Record<string, string> = {
  Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon',
  Leo: 'Sun', Virgo: 'Mercury', Libra: 'Venus', Scorpio: 'Mars',
  Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Saturn', Pisces: 'Jupiter',
};

export const HOUSE_NAMES_EN: Record<number, string> = {
  1: 'Self', 2: 'Wealth', 3: 'Siblings', 4: 'Home',
  5: 'Children', 6: 'Enemies', 7: 'Marriage', 8: 'Death',
  9: 'Fortune', 10: 'Career', 11: 'Gains', 12: 'Loss',
};

export const PLANET_TO_KEY: Record<string, PlanetKey> = {
  Sun: 'Sun', Moon: 'Moon', Mars: 'Mars', Mercury: 'Mercury',
  Jupiter: 'Jupiter', Venus: 'Venus', Saturn: 'Saturn',
  Rahu: 'Rahu', Ketu: 'Ketu', Ascendant: 'Ascendant',
};
``````

### `src\features\chart\lib\useChartStyle.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChartStyle } from '../types';

interface ChartStyleState {
  style: ChartStyle;
  setStyle: (s: ChartStyle) => void;
  toggle: () => void;
}

export const useChartStyleStore = create<ChartStyleState>()(
  persist(
    (set, get) => ({
      style: 'north',
      setStyle: (style) => set({ style }),
      toggle: () => set({ style: get().style === 'north' ? 'south' : 'north' }),
    }),
    { name: 'kundaliyatra-chart-style' }
  )
);
``````

### `src\features\chart\theme.ts`

```typescript
export const CHART_THEME = {
  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Frame Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  frameStroke: 'hsl(38 85% 52%)',
  frameStrokeWidth: 5,
  frameCornerRadius: 0,
  frameInnerGlow: 'hsl(38 90% 65% / 0.35)',

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Canvas background Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  canvasBg: 'hsl(42 55% 97%)',
  canvasBgDark: 'hsl(30 25% 14%)',

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Chart lines (deep gold) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  borderStroke: 'hsl(38 75% 42%)',
  borderStrokeWidth: 1.75,
  innerStroke: 'hsl(38 65% 55%)',
  innerStrokeWidth: 1.25,

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ House fills Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  houseBackground: 'hsl(42 55% 97%)',
  houseHoverBackground: 'hsl(38 80% 88%)',
  houseSelectedBackground: 'hsl(32 95% 85%)',

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ House numbers Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  houseNumberColor: 'hsl(30 45% 38%)',
  houseNumberSize: 11,
  houseNumberFont: "'Noto Serif Devanagari', ui-monospace, monospace",
  houseNumberWeight: 500,

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Planet glyphs Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  planetColor: 'hsl(25 55% 22%)',
  planetSize: 13,
  planetFont: "'Noto Serif Devanagari', 'Noto Sans Devanagari', sans-serif",
  planetWeight: 600,

  planetDegreeColor: 'hsl(30 35% 45%)',
  planetDegreeSize: 9,
  planetDegreeFont: 'ui-monospace, monospace',

  retrogradeColor: 'hsl(355 70% 48%)',
  combustColor: 'hsl(28 90% 45%)',

  ascendantColor: 'hsl(32 95% 40%)',
  ascendantWeight: 700,

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Center medallion (Ganesh) Ã¢â‚¬â€ INSET look Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  medallionRadius: 0.14,          // outer ring
  medallionInnerRadius: 0.135,    // inner cream fill
  ganeshImagePath: '/ganesh.png',
  ganeshImageOpacity: 0.85,       // slight fade = printed feel
  ganeshImageInset: 0.06,         // padding between image and medallion edge

  // Inner shadow ring Ã¢â‚¬â€ creates the "pressed into paper" feel
  medallionShadowColor: 'hsl(30 60% 35%)',
  medallionShadowOpacity: 0.35,
  medallionShadowWidth: 3,        // px stroke that fades inward

  // Outer highlight ring
  medallionHighlightColor: 'hsl(45 95% 88%)',
  medallionHighlightWidth: 1.5,

  // Soft drop shadow cast by the medallion
  medallionDropShadow: true,
  medallionDropShadowOpacity: 0.15,

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ No sunburst (removes the "floating" feel) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  sunburstRayCount: 0,
  sunburstColor: 'hsl(38 90% 60%)',
  sunburstOpacity: 0,
  sunburstRadius: 0,
  sunburstRayLength: 0,

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Layout Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  padding: 8,
  houseNumberOffset: { x: 0, y: -6 },
  planetLineHeight: 14,
} as const;

export type ChartTheme = typeof CHART_THEME;
``````

### `src\features\chart\types.ts`

```typescript
export type ChartStyle = 'north' | 'south';

export interface ChartHouse {
  number: number;
  rashi: string;
  planets: ChartPlanetPlacement[];
}

export interface ChartPlanetPlacement {
  planet: string;
  /** Abbreviation to display — resolved by caller based on language */
  abbr: string;
  degree: number;
  isRetrograde: boolean;
  isCombust: boolean;
  isAscendant?: boolean;
}

export interface VedicChartProps {
  style: ChartStyle;
  houses: ChartHouse[];
  size?: number;
  onPlanetClick?: (planet: string, house: number) => void;
  onHouseClick?: (house: number) => void;
  selectedPlanet?: string | null;
  ariaLabel?: string;
  className?: string;
  /** Language code — determines Devanagari vs English abbreviations */
  lang?: 'en' | 'hi' | 'ne';
}
``````

### `src\features\overview\OverviewView.tsx`

```tsx
import { useMemo } from 'react';
import type { Kundli } from '@prisri/jyotish';
import { Button } from '@/components/ui/button';
import {
  prisriJyotish,
  BirthDataError,
} from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { useActiveProfile, useBirthStore } from '../birth-profile/store';
import { BirthProfileForm } from '../birth-profile/components/BirthProfileForm';
import { ReportOverview } from '@/features/report/components/ReportOverview';

export function OverviewView() {
  const profile = useActiveProfile();

  if (!profile) {
    return (
      <div className="p-8">
        <BirthProfileForm />
      </div>
    );
  }
  return <ReportView profile={profile} />;
}

function ReportView({
  profile,
}: {
  profile: NonNullable<ReturnType<typeof useActiveProfile>>;
}) {
  const clearAll = useBirthStore((s) => s.clearAll);

  const { kundli, error } = useMemo(() => {
    try {
      return { kundli: prisriJyotish.calculate(profile), error: null as string | null };
    } catch (e) {
      return {
        kundli: null as Kundli | null,
        error: e instanceof BirthDataError ? e.message : 'Chart calculation failed.',
      };
    }
  }, [profile]);

  if (error || !kundli) {
    return (
      <div className="p-8 max-w-lg mx-auto space-y-4">
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {error ?? 'Chart calculation failed.'}
        </div>
        <Button variant="destructive" onClick={clearAll}>
          Reset
        </Button>
      </div>
    );
  }

  return (
    <ReportOverview
      profile={profile}
      kundli={kundli as unknown as Record<string, any>}
      onReset={clearAll}
    />
  );
}
``````

### `src\features\panchang\components\PanchangStrip.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import type { PanchangData } from '@/infrastructure/astrology/panchang.adapter';

interface PanchangStripProps {
  panchang: PanchangData;
}

export function PanchangStrip({ panchang }: PanchangStripProps) {
  const { t } = useTranslation();

  const items: Array<{ label: string; value: string }> = [
    {
      label: t('panchang.limbs.tithi', { defaultValue: 'Tithi' }),
      value: panchang.tithi.name,
    },
    {
      label: t('panchang.limbs.nakshatra', { defaultValue: 'Nakshatra' }),
      value: panchang.nakshatra.name,
    },
    {
      label: t('panchang.limbs.yoga', { defaultValue: 'Yoga' }),
      value: panchang.yoga.name,
    },
    {
      label: t('panchang.limbs.karana', { defaultValue: 'Karana' }),
      value: panchang.karana.name,
    },
    {
      label: t('panchang.limbs.vara', { defaultValue: 'Vara' }),
      value: panchang.vara.name,
    },
  ];

  return (
    <div className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2 text-xs">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-baseline gap-1.5">
          {i > 0 && (
            <span className="text-primary/30 select-none" aria-hidden="true">
              {'\u00b7'}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            {it.label}
          </span>
          <span className="text-foreground/90 font-medium">{it.value}</span>
        </span>
      ))}
    </div>
  );
}
``````

### `src\features\panchang\DailyPanchangView.tsx`

```tsx
import { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Section } from '@/features/report/primitives/Section';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import { PlaceCombobox } from '@/features/birth-profile/components/PlaceCombobox';
import { useActiveProfile } from '@/features/birth-profile/store';
import {
  calculateNowPanchang,
  PanchangError,
  type PanchangData,
  type PanchangPeriod,
} from '@/infrastructure/astrology/panchang.adapter';
import {
  IconSun,
  IconMoon,
  IconPin,
  IconClock,
} from '@/components/icons';
import type { Place } from '@/domain/geo/place';

// â”€â”€â”€ Fallback place when there's no active profile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_PLACE: Place = {
  id: 'default:kathmandu',
  label: 'Kathmandu, Nepal',
  shortLabel: 'Kathmandu',
  lat: 27.7172,
  lon: 85.324,
  timezone: 'Asia/Kathmandu',
  countryCode: 'np',
  admin1: 'Bagmati',
  placeType: 'city',
};

export function DailyPanchangView() {
  const { t } = useTranslation();
  const profile = useActiveProfile();
  const [override, setOverride] = useState<Place | null>(null);
  const [changing, setChanging] = useState(false);

  const place: Place = override ?? profile?.place ?? DEFAULT_PLACE;

  const { panchang, error } = useMemo(() => {
    try {
      return {
        panchang: calculateNowPanchang(place),
        error: null as string | null,
      };
    } catch (e) {
      return {
        panchang: null as PanchangData | null,
        error:
          e instanceof PanchangError
            ? e.message
            : t('panchang.failed', { defaultValue: 'Panchang calculation failed.' }),
      };
    }
  }, [place, t]);

  if (error || !panchang) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {error ?? t('panchang.failed', { defaultValue: 'Panchang calculation failed.' })}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-4">
      {/* â”€â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="text-center space-y-3 py-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
          {t('panchang.eyebrow', { defaultValue: 'Vedic Calendar' })}
        </p>
        <h1
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            lineHeight: 1.1,
          }}
        >
          {t('panchang.title', { defaultValue: 'Daily Panchang' })}
        </h1>
        <p className="text-sm text-muted-foreground">
          {panchang.instant.toFormat('cccc, dd LLLL yyyy')}
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <IconPin size={11} className="text-primary/70" />
          {place.shortLabel}
          <span className="opacity-40 mx-1">{'\u00b7'}</span>
          <span className="font-mono">{place.timezone}</span>
        </div>
        {!changing && (
          <button
            type="button"
            onClick={() => setChanging(true)}
            className="text-[11px] uppercase tracking-wider text-primary/70 hover:text-primary underline-offset-4 hover:underline no-print"
          >
            {t('common.change', { defaultValue: 'Change location' })}
          </button>
        )}
      </div>

      {changing && (
        <div className="max-w-lg mx-auto space-y-3">
          <PlaceCombobox
            value={null}
            onChange={(p) => {
              if (p) setOverride(p);
              setChanging(false);
            }}
          />
          {override && (
            <button
              type="button"
              onClick={() => {
                setOverride(null);
                setChanging(false);
              }}
              className="text-[11px] text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              {t('panchang.resetToProfile', {
                defaultValue: 'Reset to profile location',
              })}
            </button>
          )}
        </div>
      )}

      {/* â”€â”€â”€ Vedic calendar line â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <CalendarMetadataLine panchang={panchang} />

      {/* â”€â”€â”€ Sun & Moon â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('panchang.sunEyebrow', { defaultValue: 'Sun & Moon' })}
        title={t('panchang.sunTitle', { defaultValue: 'Rise & Set' })}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <TimeTile
            icon={<IconSun size={16} />}
            label={t('panchang.sunrise', { defaultValue: 'Sunrise' })}
            dt={panchang.sunrise}
          />
          <TimeTile
            icon={<IconMoon size={16} />}
            label={t('panchang.sunset', { defaultValue: 'Sunset' })}
            dt={panchang.sunset}
          />
          <TimeTile
            icon={<IconMoon size={16} />}
            label={t('panchang.moonrise', { defaultValue: 'Moonrise' })}
            dt={panchang.moonrise}
          />
          <TimeTile
            icon={<IconMoon size={16} />}
            label={t('panchang.moonset', { defaultValue: 'Moonset' })}
            dt={panchang.moonset}
          />
        </div>
      </Section>

      {/* â”€â”€â”€ Five limbs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('panchang.limbsEyebrow', { defaultValue: 'The Five Limbs' })}
        title={t('panchang.limbsTitle', { defaultValue: 'Panchangam' })}
        hint={t('panchang.limbsHint', {
          defaultValue:
            'Tithi, Nakshatra, Yoga, Karana, and Vara â€” the five limbs of the Vedic day.',
        })}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <LimbTile
            label={t('panchang.limbs.tithi', { defaultValue: 'Tithi' })}
            value={panchang.tithi.name}
            sub={panchang.paksha}
          />
          <LimbTile
            label={t('panchang.limbs.nakshatra', { defaultValue: 'Nakshatra' })}
            value={panchang.nakshatra.name}
            sub={
              panchang.nakshatra.pada
                ? `Pada ${panchang.nakshatra.pada} \u00b7 ${panchang.nakshatra.lord}`
                : panchang.nakshatra.lord
            }
          />
          <LimbTile
            label={t('panchang.limbs.yoga', { defaultValue: 'Yoga' })}
            value={panchang.yoga.name}
          />
          <LimbTile
            label={t('panchang.limbs.karana', { defaultValue: 'Karana' })}
            value={panchang.karana.name}
          />
          <LimbTile
            label={t('panchang.limbs.vara', { defaultValue: 'Vara' })}
            value={panchang.vara.name}
          />
        </div>
      </Section>

      {/* â”€â”€â”€ Auspicious windows â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('panchang.auspiciousEyebrow', { defaultValue: 'Shubha' })}
        title={t('panchang.auspiciousTitle', { defaultValue: 'Auspicious Windows' })}
        hint={t('panchang.auspiciousHint', {
          defaultValue:
            'Brahma Muhurta for pre-dawn practice, Abhijit for midday beginnings, Amrit Kalam for anything sacred.',
        })}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PeriodTile
            tone="positive"
            label={t('panchang.brahmaMuhurta', { defaultValue: 'Brahma Muhurta' })}
            period={panchang.brahmaMuhurta}
            hint={t('panchang.brahmaHint', { defaultValue: 'Pre-dawn \u00b7 practice' })}
          />
          <PeriodTile
            tone="positive"
            label={t('panchang.abhijitMuhurta', { defaultValue: 'Abhijit Muhurta' })}
            period={panchang.abhijitMuhurta}
            hint={t('panchang.abhijitHint', { defaultValue: 'Midday \u00b7 beginnings' })}
          />
          {panchang.amritKalam.length > 0 && (
            <PeriodTile
              tone="positive"
              label={t('panchang.amritKalam', { defaultValue: 'Amrit Kalam' })}
              period={panchang.amritKalam[0]}
              hint={t('panchang.amritHint', { defaultValue: 'Nectar \u00b7 sacred acts' })}
            />
          )}
        </div>
      </Section>

      {/* â”€â”€â”€ Inauspicious windows â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('panchang.inauspiciousEyebrow', { defaultValue: 'Ashubha' })}
        title={t('panchang.inauspiciousTitle', { defaultValue: 'Windows to Avoid' })}
        hint={t('panchang.inauspiciousHint', {
          defaultValue:
            'Rahu Kalam, Yamaganda, and Gulika â€” the three daily inauspicious periods.',
        })}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PeriodTile
            tone="negative"
            label={t('panchang.rahuKalam', { defaultValue: 'Rahu Kalam' })}
            period={panchang.rahuKalam}
            hint={t('panchang.rahuHint', { defaultValue: 'Avoid new ventures' })}
          />
          <PeriodTile
            tone="negative"
            label={t('panchang.yamaganda', { defaultValue: 'Yamaganda' })}
            period={panchang.yamagandaKalam}
            hint={t('panchang.yamagandaHint', { defaultValue: 'Avoid travel' })}
          />
          <PeriodTile
            tone="negative"
            label={t('panchang.gulika', { defaultValue: 'Gulika Kalam' })}
            period={panchang.gulikaKalam}
            hint={t('panchang.gulikaHint', { defaultValue: 'Avoid auspicious acts' })}
          />
        </div>
      </Section>

      {/* â”€â”€â”€ Choghadiya â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {(panchang.choghadiya.day.length > 0 ||
        panchang.choghadiya.night.length > 0) && (
        <>
          <OrnamentalDivider />
          <Section
            eyebrow={t('panchang.choghadiyaEyebrow', { defaultValue: 'Choghadiya' })}
            title={t('panchang.choghadiyaTitle', { defaultValue: 'Day & Night Windows' })}
            hint={t('panchang.choghadiyaHint', {
              defaultValue:
                'Eight segments each of day and night. Green is auspicious, red is to be avoided.',
            })}
          >
            <ChoghadiyaColumns panchang={panchang} />
          </Section>
        </>
      )}

      {/* â”€â”€â”€ Hora â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {panchang.currentHoraLord && (
        <>
          <OrnamentalDivider />
          <Section
            eyebrow={t('panchang.horaEyebrow', { defaultValue: 'Hora' })}
            title={t('panchang.horaTitle', { defaultValue: 'Current Planetary Hour' })}
          >
            <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 text-center space-y-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-semibold">
                {t('panchang.now', { defaultValue: 'Now' })}
              </p>
              <p
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {panchang.currentHoraLord}
              </p>
            </div>
          </Section>
        </>
      )}

      {/* â”€â”€â”€ Festivals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {panchang.festivals.length > 0 && (
        <>
          <OrnamentalDivider />
          <Section
            eyebrow={t('panchang.festivalsEyebrow', { defaultValue: 'Parva' })}
            title={t('panchang.festivalsTitle', { defaultValue: 'Festivals Today' })}
          >
            <ul className="space-y-1.5">
              {panchang.festivals.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="text-primary mt-0.5 shrink-0">{'\u2726'}</span>
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
          </Section>
        </>
      )}
    </div>
  );
}

// â”€â”€â”€ Local components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CalendarMetadataLine({ panchang }: { panchang: PanchangData }) {
  const items: string[] = [];
  if (panchang.masa) items.push(panchang.masa.name);
  items.push(panchang.paksha);
  items.push(panchang.ritu);
  items.push(panchang.ayana.name);

  return (
    <p className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      {items.join(' \u00b7 ')}
    </p>
  );
}

function TimeTile({
  icon,
  label,
  dt,
}: {
  icon: React.ReactNode;
  label: string;
  dt: DateTime | null;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 text-center space-y-1.5">
      <div className="flex items-center justify-center gap-1.5 text-primary">
        {icon}
        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold">
          {label}
        </p>
      </div>
      <p
        className="text-xl font-bold font-mono"
        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
      >
        {dt ? dt.toFormat('HH:mm') : '\u2014'}
      </p>
      <p className="text-[10px] text-muted-foreground font-mono">
        {dt ? dt.toFormat('HH:mm:ss') : ''}
      </p>
    </div>
  );
}

function LimbTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 space-y-1">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
        {label}
      </p>
      <p
        className="text-base font-bold leading-tight"
        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
      >
        {value}
      </p>
      {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function PeriodTile({
  tone,
  label,
  period,
  hint,
}: {
  tone: 'positive' | 'negative';
  label: string;
  period: PanchangPeriod | null;
  hint: string;
}) {
  const border =
    tone === 'positive' ? 'border-emerald-500/30' : 'border-red-500/30';
  const bg =
    tone === 'positive' ? 'bg-emerald-500/[0.04]' : 'bg-red-500/[0.04]';
  const accent =
    tone === 'positive'
      ? 'text-emerald-700 dark:text-emerald-400'
      : 'text-red-700 dark:text-red-400';

  return (
    <div className={`rounded-2xl border ${border} ${bg} p-5 space-y-2`}>
      <p
        className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${accent}`}
      >
        {label}
      </p>
      <p className="text-lg font-bold leading-tight font-mono">
        {period
          ? `${period.start.toFormat('HH:mm')}\u2013${period.end.toFormat('HH:mm')}`
          : '\u2014'}
      </p>
      <p className="text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function ChoghadiyaColumns({ panchang }: { panchang: PanchangData }) {
  const { t } = useTranslation();
  const now = DateTime.now().setZone(panchang.instant.zone);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChoghadiyaColumn
        title={t('panchang.dayChoghadiya', { defaultValue: 'Day Choghadiya' })}
        segments={panchang.choghadiya.day}
        now={now}
      />
      <ChoghadiyaColumn
        title={t('panchang.nightChoghadiya', { defaultValue: 'Night Choghadiya' })}
        segments={panchang.choghadiya.night}
        now={now}
      />
    </div>
  );
}

function ChoghadiyaColumn({
  title,
  segments,
  now,
}: {
  title: string;
  segments: PanchangData['choghadiya']['day'];
  now: DateTime;
}) {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <div className="px-5 py-3 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
        <p
          className="text-sm font-bold"
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          {title}
        </p>
      </div>
      <div className="divide-y">
        {segments.map((s, i) => {
          const isNow = now >= s.start && now < s.end;
          const dotColor =
            s.rating === 'good'
              ? 'bg-emerald-500'
              : s.rating === 'bad'
                ? 'bg-red-500'
                : 'bg-amber-500';
          return (
            <div
              key={i}
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-2 text-xs ${
                isNow ? 'bg-primary/[0.06]' : ''
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
              <p className="font-semibold text-foreground leading-tight">
                {s.name}
                {isNow && (
                  <span className="ml-2 text-[9px] uppercase tracking-wider text-primary">
                    {'\u00b7 now'}
                  </span>
                )}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground shrink-0">
                {s.start.toFormat('HH:mm')}
                {'\u2013'}
                {s.end.toFormat('HH:mm')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
``````

### `src\features\report\components\ChartCard.tsx`

```tsx
import { VedicChart } from '@/features/chart/components/VedicChart';
import { ChartStyleToggle } from '@/features/chart/components/ChartStyleToggle';
import { useChartStyleStore } from '@/features/chart/lib/useChartStyle';
import { useTranslation } from 'react-i18next';
import type { ChartHouse } from '@/features/chart/types';

interface ChartCardProps {
  code: string;
  name: string;
  subtitle: string;
  lagna: string;
  lagnaDegree?: string;
  useFor: string[];
  houses: ChartHouse[];
  showToggle?: boolean;
  size?: number;
}

export function ChartCard({
  code,
  name,
  subtitle,
  lagna,
  lagnaDegree,
  useFor,
  houses,
  showToggle = false,
  size = 320,
}: ChartCardProps) {
  const { i18n } = useTranslation();
  const style = useChartStyleStore((s) => s.style);
  const setStyle = useChartStyleStore((s) => s.setStyle);

  const lang = (i18n.resolvedLanguage === 'ne'
    ? 'ne'
    : i18n.resolvedLanguage === 'hi'
      ? 'hi'
      : 'en') as 'en' | 'hi' | 'ne';

  return (
    <article className="rounded-2xl border bg-card overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div>
            <h3
              className="text-lg font-bold leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {code} · {name}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          </div>
          {showToggle && (
            <div className="shrink-0">
              <ChartStyleToggle value={style} onChange={setStyle} />
            </div>
          )}
        </div>
      </div>

      {/* Chart — pass style explicitly */}
      <div className="flex justify-center py-5 px-4">
        <VedicChart
          size={size}
          houses={houses}
          style={style}
          hideToggle
          lang={lang}
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t space-y-3 mt-auto">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Lagna
          </span>
          <span className="flex items-baseline gap-2">
            <strong
              className="text-sm font-semibold text-primary"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {lagna}
            </strong>
            {lagnaDegree && (
              <span className="text-[10px] font-mono text-muted-foreground">
                {lagnaDegree}
              </span>
            )}
          </span>
        </div>

        <div className="space-y-1.5 pt-3 border-t border-border/50">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Use for
          </p>
          <ul className="space-y-1">
            {useFor.map((u) => (
              <li key={u} className="flex items-start gap-2 text-xs leading-relaxed">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                <span className="text-foreground/85">{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
``````

### `src\features\report\components\Hero.tsx`

```tsx
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IconPin } from '@/components/icons';
import { PLANET_GLYPHS, RASHI_GLYPHS } from '@/features/report/lib/glyphs';
import type { BirthData } from '@/domain/astrology/birth-data';
import {
  calculateBirthPanchang,
  PanchangError,
} from '@/infrastructure/astrology/panchang.adapter';
import { PanchangStrip } from '@/features/panchang/components/PanchangStrip';

interface HeroProps {
  profile: BirthData;
  kundli: Record<string, any>;
  onReset: () => void;
}

function formatLongDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const localDate = new Date(y, m - 1, d, 12, 0, 0);
  return localDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function formatTime12h(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m ?? 0).padStart(2, '0')} ${suffix}`;
}

function formatDegree(deg?: number, min?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  return `${d}Â° ${String(m).padStart(2, '0')}â€²`;
}

export function Hero({ profile, kundli }: HeroProps) {
  const { t } = useTranslation();

  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const sun = kundli.planets?.Sun ?? {};
  const dasha = kundli.dasha?.currentMahadasha;
  const antar = kundli.dasha?.currentAntar;
  const birthNak = kundli.dasha?.birthNakshatra ?? moon.nakshatra;
  const sav = kundli.ashtakavarga?.sav;
  const strongest = sav?.strongestHouse;
  const strongestData = sav?.houseStrengths?.find((h: any) => h.house === strongest);

  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  const identitySigns = [
    {
      key: 'chandra',
      label: t('hero.chandraRashi', { defaultValue: 'Chandra Rashi' }),
      sublabel: t('hero.chandraSub', { defaultValue: 'Moon Sign Â· Mind' }),
      rashi: moon.rashiName ?? 'â€”',
      glyph: RASHI_GLYPHS[moon.rashiName] ?? 'Â·',
      nakshatra: moon.nakshatra,
      pada: moon.pada,
      degree: formatDegree(moon.degree, moon.minute),
      isPrimary: true,
    },
    {
      key: 'surya',
      label: t('hero.suryaRashi', { defaultValue: 'Surya Rashi' }),
      sublabel: t('hero.suryaSub', { defaultValue: 'Sun Sign Â· Soul' }),
      rashi: sun.rashiName ?? 'â€”',
      glyph: RASHI_GLYPHS[sun.rashiName] ?? 'Â·',
      nakshatra: sun.nakshatra,
      pada: sun.pada,
      degree: formatDegree(sun.degree, sun.minute),
    },
    {
      key: 'lagna',
      label: t('hero.lagnaRashi', { defaultValue: 'Lagna' }),
      sublabel: t('hero.lagnaSub', { defaultValue: 'Ascendant Â· Body' }),
      rashi: asc.rashiName ?? 'â€”',
      glyph: RASHI_GLYPHS[asc.rashiName] ?? 'Â·',
      nakshatra: asc.nakshatra,
      pada: asc.pada,
      degree: formatDegree(asc.degree, asc.minute),
    },
  ];

  const secondary = [
    {
      label: t('hero.dasha', { defaultValue: 'Current Mahadasha' }),
      glyph: dasha ? PLANET_GLYPHS[dasha.planet] ?? 'Â·' : 'Â·',
      value: dasha?.planet ?? 'â€”',
      sub: dasha ? `${dasha.progressPercent?.toFixed(1)}% complete` : '',
    },
    {
      label: t('hero.nakshatra', { defaultValue: 'Birth Nakshatra' }),
      glyph: 'âœ¦',
      value: birthNak ?? 'â€”',
      sub: moon.pada ? `Pada ${moon.pada}` : '',
    },
    {
      label: t('hero.strongest', { defaultValue: 'Strongest House' }),
      glyph: 'â˜…',
      value: strongest ? `House ${ROMAN[strongest - 1]}` : 'â€”',
      sub: strongestData ? `${strongestData.bindus} bindus` : '',
    },
    {
      label: t('hero.antar', { defaultValue: 'Current Antar' }),
      glyph: antar ? PLANET_GLYPHS[antar.planet] ?? 'Â·' : 'Â·',
      value: antar?.planet ?? 'â€”',
      sub: antar ? 'Antardasha' : '',
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, hsl(42 60% 98%) 0%, hsl(42 55% 97%) 55%, hsl(38 50% 96%) 100%)',
        }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, hsl(38 90% 60% / 0.12) 0%, transparent 55%)',
        }}
      />

      <div className="relative px-6 pt-12 pb-10 md:pt-14 md:pb-12 space-y-8">
        <div className="flex flex-col items-center gap-5">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: 'clamp(100px, 14vw, 130px)',
              height: 'clamp(100px, 14vw, 130px)',
              border: '2px solid hsl(38 85% 55%)',
              background: 'hsl(42 55% 97%)',
              boxShadow:
                '0 0 0 6px hsl(38 90% 60% / 0.14), 0 0 60px hsl(38 90% 60% / 0.35), 0 8px 24px hsl(30 40% 20% / 0.12)',
            }}
          >
            <img
              src="/ganesh.png"
              alt="Ganesh"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          <p
            className="text-primary text-center"
            style={{
              fontFamily: "'Noto Serif Devanagari', 'Crimson Pro', Georgia, serif",
              fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              lineHeight: 1.3,
            }}
          >
            à¥ à¤¶à¥à¤°à¥€ à¤—à¤£à¥‡à¤¶à¤¾à¤¯ à¤¨à¤®à¤ƒ
          </p>

          <div
            className="h-px"
            style={{
              width: 'clamp(140px, 20vw, 220px)',
              background:
                'linear-gradient(to right, transparent, hsl(32 85% 55% / 0.5), transparent)',
            }}
          />
        </div>

        <div className="text-center space-y-3">
          <h1
            className="text-foreground"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {profile.profileName}
          </h1>
          <p className="text-[11px] uppercase tracking-[0.4em] text-primary font-medium">
            {t('hero.reading', { defaultValue: 'A Vedic Reading' })}
          </p>
        </div>

        <div className="text-center space-y-1.5 text-sm text-muted-foreground">
          <p>
            {formatLongDate(profile.localDate)}
            <span className="mx-2 opacity-40">Â·</span>
            {formatTime12h(profile.localTime)}
          </p>
          <p className="flex items-center justify-center gap-1.5 text-xs">
            <IconPin size={11} className="text-primary/70" />
            {profile.place.shortLabel}
            <span className="opacity-40 mx-1">Â·</span>
            <span className="font-mono">{profile.place.timezone}</span>
          </p>
        </div>

        <div className="max-w-3xl mx-auto pt-4">
          <p className="text-center text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-4">
            {t('hero.yourRashi', { defaultValue: 'Your Rashi' })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {identitySigns.map((s) => (
              <div
                key={s.key}
                className={`rounded-2xl border p-5 text-center space-y-2 transition-shadow ${
                  s.isPrimary
                    ? 'border-primary/50 bg-primary/[0.06] shadow-md'
                    : 'border-border/60 bg-background/70'
                }`}
              >
                <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  {s.label}
                </p>
                <p className="text-[10px] text-muted-foreground italic">{s.sublabel}</p>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span
                    className="text-3xl leading-none"
                    style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                  >
                    {s.glyph}
                  </span>
                  <p
                    className={`text-2xl font-bold leading-tight ${
                      s.isPrimary ? 'text-primary' : 'text-foreground'
                    }`}
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {s.rashi}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground font-mono pt-1">
                  {s.degree}
                </p>
                {s.nakshatra && (
                  <p className="text-[11px] text-muted-foreground">
                    {s.nakshatra}
                    {s.pada ? ` Â· Pada ${s.pada}` : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {secondary.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm px-4 py-3 space-y-1.5"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="text-base leading-none"
                  style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                >
                  {m.glyph}
                </span>
                <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                  {m.label}
                </p>
              </div>
              <p
                className="text-base font-bold leading-tight text-foreground"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {m.value}
              </p>
              {m.sub && (
                <p className="text-[10px] text-muted-foreground font-mono leading-tight">
                  {m.sub}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
``````

### `src\features\report\components\ReportOverview.tsx`

```tsx
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from './Hero';
import { Section } from '../primitives/Section';
import { OrnamentalDivider } from '../primitives/OrnamentalDivider';
import { ChartCard } from './ChartCard';
import {
  buildChartHouses,
  buildVargaHouses,
  buildReferenceChartHouses,
} from '@/features/chart/lib/adapters';
import { ThreeAnchorsSection } from '../sections/ThreeAnchorsSection';
import { PlanetaryMapSection } from '../sections/PlanetaryMapSection';
import { HouseMapSection } from '../sections/HouseMapSection';
import { UnfoldingSection } from '../sections/UnfoldingSection';
import { VitalSignsSection } from '../sections/VitalSignsSection';
import { AspectsSection } from '../sections/AspectsSection';
import { ChalitSection } from '../sections/ChalitSection';
import { DivisionalChartsSection } from '../sections/DivisionalChartsSection';
import type { BirthData } from '@/domain/astrology/birth-data';

interface ReportOverviewProps {
  profile: BirthData;
  kundli: Record<string, any>;
  onReset: () => void;
}

export function ReportOverview({ profile, kundli, onReset }: ReportOverviewProps) {
  const { t } = useTranslation();

  const abbrResolver = useMemo(
    () => (planet: string) => {
      if (planet === 'Ascendant') return t('chart.planetAbbr.ascendant', { defaultValue: 'Asc' });
      return t(`chart.planetAbbr.${planet.toLowerCase()}`, { defaultValue: planet.slice(0, 2) });
    },
    [t]
  );

  const d1Houses = useMemo(
    () => buildChartHouses(kundli, { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );
  const d9Houses = useMemo(
    () => buildVargaHouses(kundli, 'd9', { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );
  const chandraHouses = useMemo(
    () => buildReferenceChartHouses(kundli, 'chandra', { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );
  const suryaHouses = useMemo(
    () => buildReferenceChartHouses(kundli, 'surya', { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );

  const chandraLagna =
    kundli.chandraKundli?.ascendant?.rashiName ??
    kundli.planets?.Moon?.rashiName ??
    '—';
  const suryaLagna =
    kundli.suryaKundli?.ascendant?.rashiName ??
    kundli.planets?.Sun?.rashiName ??
    '—';

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-4">
      {/* I. Hero */}
      <Hero profile={profile} kundli={kundli} onReset={onReset} />

      {/* II. The Four Charts */}
      <OrnamentalDivider />
      <Section
        eyebrow="The Charts"
        title="Form, Essence, and Reference"
        hint="Four charts form the classical working set. D1 shows the body. D9 shows the soul. Chandra and Surya reveal the mind and vitality from the Moon's and Sun's vantage points."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard
            code="D1"
            name="Rashi"
            subtitle="Body · Personality · Life path"
            lagna={kundli.ascendant?.rashiName ?? '—'}
            lagnaDegree={
              kundli.ascendant
                ? `${kundli.ascendant.degree ?? 0}° ${String(kundli.ascendant.minute ?? 0).padStart(2, '0')}′`
                : undefined
            }
            useFor={[
              'Physical body and health',
              'Life direction and identity',
              'Planetary positions',
            ]}
            houses={d1Houses}
            showToggle
            size={300}
          />
          <ChartCard
            code="D9"
            name="Navamsha"
            subtitle="Soul · Marriage · Inner strength"
            lagna={kundli.vargas?.d9?.ascendant?.rashiName ?? '—'}
            useFor={[
              'Marriage quality',
              'Soul purpose and dharma',
              'Inner strength of planets',
            ]}
            houses={d9Houses}
            size={300}
          />
          <ChartCard
            code="Chandra"
            name="Kundli"
            subtitle="Moon Chart · Mind · Psychology"
            lagna={chandraLagna}
            lagnaDegree={
              kundli.planets?.Moon
                ? `${kundli.planets.Moon.degree ?? 0}° ${String(kundli.planets.Moon.minute ?? 0).padStart(2, '0')}′`
                : undefined
            }
            useFor={[
              'Psychological perspective',
              'Mental peace and emotions',
              'Primary chart for transits',
            ]}
            houses={chandraHouses}
            size={300}
          />
          <ChartCard
            code="Surya"
            name="Kundli"
            subtitle="Sun Chart · Soul · Vitality"
            lagna={suryaLagna}
            lagnaDegree={
              kundli.planets?.Sun
                ? `${kundli.planets.Sun.degree ?? 0}° ${String(kundli.planets.Sun.minute ?? 0).padStart(2, '0')}′`
                : undefined
            }
            useFor={[
              'Soul vitality and health',
              'Executive authority',
              'Father and government',
            ]}
            houses={suryaHouses}
            size={300}
          />
        </div>
      </Section>

      {/* III. The Three Anchors */}
      <OrnamentalDivider />
      <Section
        eyebrow="Who You Are"
        title="Body, Mind, Soul"
        hint="Three pillars define a person: the body (Lagna), the mind (Chandra), and the soul (Surya)."
      >
        <ThreeAnchorsSection kundli={kundli} />
      </Section>

      {/* IV. The Planetary Map */}
      <OrnamentalDivider />
      <Section
        eyebrow="The Nine Grahas"
        title="The Planetary Map"
        hint="The nine planets as they stood at your birth."
      >
        <PlanetaryMapSection kundli={kundli} />
      </Section>

      {/* V. The House Map */}
      <OrnamentalDivider />
      <Section
        eyebrow="The Twelve Bhavas"
        title="The House Map"
        hint="Where the planets sit. House categories: amber = angles, green = fortune, red = tests."
      >
        <HouseMapSection kundli={kundli} />
      </Section>

      {/* VI. The Unfolding */}
      <OrnamentalDivider />
      <Section
        eyebrow="Vimshottari Dasha"
        title="The Unfolding"
        hint="Your life, as told by the Vimshottari cycle of planetary periods."
      >
        <UnfoldingSection kundli={kundli} />
      </Section>

      {/* VII. The Vital Signs */}
      <OrnamentalDivider />
      <Section
        eyebrow="Chart Strength"
        title="The Vital Signs"
        hint="Where your chart stands firm, where it asks for care, and how the world perceives you."
      >
        <VitalSignsSection kundli={kundli} />
      </Section>

      {/* VIII. The Aspects */}
      <OrnamentalDivider />
      <Section
        eyebrow="Graha Drishti"
        title="Planetary Aspects"
        hint="Every planet casts its glance on other houses. These interactions reveal who is watching whom — and shape what actually happens."
      >
        <AspectsSection kundli={kundli} />
      </Section>

      {/* IX. Bhava Chalit */}
      <OrnamentalDivider />
      <Section
        eyebrow="Bhava Chalit"
        title="Where Planets Actually Sit"
        hint="The Rashi chart places planets by whole sign. The Chalit chart places them by actual house boundaries — revealing shifts that change the reading."
      >
        <ChalitSection kundli={kundli} />
      </Section>

      {/* X. The Divisional Charts */}
      <OrnamentalDivider />
      <Section
        eyebrow="All D Charts"
        title="The Divisional Charts"
        hint="Twenty charts, one for each layer of the Vedic system — from the body (D1) to the deepest karma (D60)."
      >
        <DivisionalChartsSection kundli={kundli} />
      </Section>

      {/* Print-only footer */}
      <div className="print-footer hidden">
        KundaliYatra · A Vedic Reading
      </div>
    </div>
  );
}
``````

### `src\features\report\components\SnapshotStrip.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { SnapshotTile } from './SnapshotTile';

function formatDegreeShort(deg?: number, min?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  return `${d}°${String(m).padStart(2, '0')}′`;
}

interface SnapshotStripProps {
  kundli: Record<string, any>;
}

export function SnapshotStrip({ kundli }: SnapshotStripProps) {
  const { t } = useTranslation();

  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const dasha = kundli.dasha?.currentMahadasha;
  const antar = kundli.dasha?.currentAntar;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <SnapshotTile
        label={t('report.snapshot.lagna', { defaultValue: 'Lagna' })}
        value={asc.rashiName ?? '—'}
        subtitle={`${formatDegreeShort(asc.degree, asc.minute)} • ${asc.nakshatra ?? ''} ${asc.pada ?? ''}`}
        accent
      />
      <SnapshotTile
        label={t('report.snapshot.chandra', { defaultValue: 'Chandra' })}
        value={moon.rashiName ?? '—'}
        subtitle={`${formatDegreeShort(moon.degree, moon.minute)} • ${moon.nakshatra ?? ''} ${moon.pada ?? ''}`}
      />
      <SnapshotTile
        label={t('report.snapshot.nakshatra', { defaultValue: 'Nakshatra' })}
        value={asc.nakshatra ?? '—'}
        subtitle={
          asc.nakshatraLord
            ? `Pada ${asc.pada ?? 1} • Lord: ${asc.nakshatraLord}`
            : undefined
        }
      />
      {dasha ? (
        <SnapshotTile
          label={t('report.snapshot.currentDasha', { defaultValue: 'Current Dasha' })}
          value={String(dasha.planet ?? '—')}
          subtitle={antar ? `Antar: ${antar.planet}` : undefined}
          progress={dasha.progressPercent}
        />
      ) : (
        <SnapshotTile
          label={t('report.snapshot.currentDasha', { defaultValue: 'Current Dasha' })}
          value="—"
        />
      )}
    </div>
  );
}
``````

### `src\features\report\components\SnapshotTile.tsx`

```tsx
export interface SnapshotTileProps {
  label: string;
  value: string;
  subtitle?: string;
  progress?: number;
  accent?: boolean;
  className?: string;
}

export function SnapshotTile({
  label,
  value,
  subtitle,
  progress,
  accent = false,
  className,
}: SnapshotTileProps) {
  return (
    <div
      className={`flex flex-col gap-1 p-3 rounded-lg border bg-card/50 ${className ?? ''}`}
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </p>
      <p
        className={`font-semibold leading-tight ${accent ? 'text-primary' : 'text-foreground'}`}
        style={{ fontSize: '1rem' }}
      >
        {value}
      </p>
      {subtitle && (
        <p className="text-[11px] text-muted-foreground leading-tight">{subtitle}</p>
      )}
      {progress !== undefined && (
        <div className="mt-1 space-y-0.5">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-right font-mono">
            {progress.toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}
``````

### `src\features\report\lib\aspect-info.ts`

```typescript
/**
 * Knowledge base for Vedic aspects (Graha Drishti).
 * Classical Parashari rules for planetary aspects.
 */

export interface AspectRule {
  planet: string;
  rule: string;
  houses: number[];
  meaning: string;
}

export const ASPECT_RULES: AspectRule[] = [
  {
    planet: 'Sun',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect — sees the opposite house',
  },
  {
    planet: 'Moon',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect — sees the opposite house',
  },
  {
    planet: 'Mars',
    rule: '4th, 7th, 8th aspect',
    houses: [4, 7, 8],
    meaning: 'Full aspect — Mars sees the 4th, 7th, and 8th houses',
  },
  {
    planet: 'Mercury',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect — sees the opposite house',
  },
  {
    planet: 'Jupiter',
    rule: '5th, 7th, 9th aspect',
    houses: [5, 7, 9],
    meaning: 'Full aspect — Jupiter sees the 5th, 7th, and 9th houses',
  },
  {
    planet: 'Venus',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect — sees the opposite house',
  },
  {
    planet: 'Saturn',
    rule: '3rd, 7th, 10th aspect',
    houses: [3, 7, 10],
    meaning: 'Full aspect — Saturn sees the 3rd, 7th, and 10th houses',
  },
  {
    planet: 'Rahu',
    rule: '5th, 7th, 9th aspect',
    houses: [5, 7, 9],
    meaning: 'Full aspect — Rahu sees the 5th, 7th, and 9th houses',
  },
  {
    planet: 'Ketu',
    rule: '5th, 7th, 9th aspect',
    houses: [5, 7, 9],
    meaning: 'Full aspect — Ketu sees the 5th, 7th, and 9th houses',
  },
];

export const ASPECT_TYPE_LABEL: Record<string, string> = {
  '3rd': '3rd house',
  '4th': '4th house',
  '5th': '5th house',
  '7th': '7th house',
  '8th': '8th house',
  '9th': '9th house',
  '10th': '10th house',
};

export const ASPECT_TYPE_MEANING: Record<string, string> = {
  '3rd': 'Effort, courage, siblings',
  '4th': 'Home, mother, heart',
  '5th': 'Intelligence, children, fortune',
  '7th': 'Partnership, marriage, public',
  '8th': 'Transformation, depth, longevity',
  '9th': 'Fortune, dharma, teacher',
  '10th': 'Career, action, status',
};
``````

### `src\features\report\lib\devanagari.ts`

```typescript
/**
 * Utility functions for traditional Nepali patrika formatting.
 */

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

/** Convert any number or numeric string to Devanagari numerals. */
export function toDevanagari(input: number | string): string {
  return String(input).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

/** Convert only digits in a mixed string, preserving Latin letters, symbols. */
export function devanagariDigits(input: string): string {
  return input.replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

/** Format a number with Western thousand separators, then convert. */
export function devanagariNumber(n: number): string {
  return toDevanagari(n.toLocaleString('en-IN'));
}

/** Time "08:45" → "०८:४५" */
export function devanagariTime(time24: string): string {
  return devanagariDigits(time24);
}

/**
 * Convert a Gregorian date to a formal Nepali date string.
 * Example: 1983-03-26 → "२६ मार्च १९८३"
 */
export function devanagariDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const monthNames = [
    'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन',
    'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर',
  ];
  return `${toDevanagari(d)} ${monthNames[m - 1]} ${toDevanagari(y)}`;
}

/** Convert B.S. year to Nepali: 2040 → २०४० */
export function devanagariYear(year: number): string {
  return toDevanagari(year);
}

/** "08:45" → "प्रातः ८:४५" or "सायं ६:३०" */
export function devanagariTimeOfDay(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const suffix = h < 12 ? 'प्रातः' : h < 16 ? 'दिउँसो' : h < 20 ? 'सायं' : 'रात्रि';
  const h12 = h % 12 || 12;
  return `${suffix} ${toDevanagari(h12)}:${toDevanagari(String(m ?? 0).padStart(2, '0'))}`;
}
``````

### `src\features\report\lib\glyphs.ts`

```typescript
import type { PlanetKey } from '../primitives/GlyphBadge';

export const PLANET_GLYPHS: Record<string, string> = {
  Sun: '☉',
  Moon: '☽',
  Mars: '♂',
  Mercury: '☿',
  Jupiter: '♃',
  Venus: '♀',
  Saturn: '♄',
  Rahu: '☊',
  Ketu: '☋',
  Ascendant: 'ल',
};

export const RASHI_GLYPHS: Record<string, string> = {
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓',
};

export const PLANET_TO_KEY: Record<string, PlanetKey> = {
  Sun: 'Sun',
  Moon: 'Moon',
  Mars: 'Mars',
  Mercury: 'Mercury',
  Jupiter: 'Jupiter',
  Venus: 'Venus',
  Saturn: 'Saturn',
  Rahu: 'Rahu',
  Ketu: 'Ketu',
  Ascendant: 'Ascendant',
};

export const RASHI_LORDS: Record<string, string> = {
  Aries: 'Mars',
  Taurus: 'Venus',
  Gemini: 'Mercury',
  Cancer: 'Moon',
  Leo: 'Sun',
  Virgo: 'Mercury',
  Libra: 'Venus',
  Scorpio: 'Mars',
  Sagittarius: 'Jupiter',
  Capricorn: 'Saturn',
  Aquarius: 'Saturn',
  Pisces: 'Jupiter',
};

export const HOUSE_NAMES_EN: Record<number, string> = {
  1: 'Self',
  2: 'Wealth',
  3: 'Siblings',
  4: 'Home',
  5: 'Children',
  6: 'Enemies',
  7: 'Marriage',
  8: 'Death',
  9: 'Fortune',
  10: 'Career',
  11: 'Gains',
  12: 'Loss',
};
``````

### `src\features\report\lib\interpretations.ts`

```typescript
export const RASHI_INTERPRETATIONS: Record<string, string> = {
  Aries: 'Cardinal fire. The first spark of will — bold, pioneering, direct.',
  Taurus: 'Fixed earth. Steady, sensual, patient — an unshakeable grounding in the physical.',
  Gemini: 'Dual air. Quick, curious, communicative — a mind always in motion.',
  Cancer: 'Cardinal water. Nurturing, protective, deeply tied to home and mother.',
  Leo: 'Fixed fire. The royal lion — proud, generous, radiant in self-expression.',
  Virgo: 'Dual earth. Precise, analytical, healing — a mind that refines the world.',
  Libra: 'Cardinal air. Balancing, relational, aesthetic — the search for harmony.',
  Scorpio: 'Fixed water. Deep, transformative, intense — the alchemist of the zodiac.',
  Sagittarius: 'Dual fire. Seeking, philosophical, expansive — the archer aiming at truth.',
  Capricorn: 'Cardinal earth. Disciplined, ambitious, enduring — the mountain climber.',
  Aquarius: 'Fixed air. Visionary, humanitarian, unconventional — the water-bearer.',
  Pisces: 'Dual water. Compassionate, mystical, dissolving — the ocean of the soul.',
};

export const NAKSHATRA_INTERPRETATIONS: Record<string, string> = {
  Ashwini: 'The healer-riders. Swift beginnings, healing, pioneering energy.',
  Bharani: 'The bearer. Creativity, transformation, and the weight of care.',
  Krittika: 'The blade. Sharpness, courage, and purifying fire.',
  Rohini: 'The red one. Beauty, growth, and the fertile earth.',
  Mrigashira: 'The deer. Searching, gentle, ever-seeking sweetness.',
  Ardra: 'The moist one. Storms, tears, and raw emotion.',
  Punarvasu: 'Return of the light. Renewal, generosity, second chances.',
  Pushya: 'The nourisher. Deep care, spirituality, sacred support.',
  Ashlesha: 'The serpent. Coiled wisdom, healing, and hidden power.',
  Magha: 'The ancestors. Lineage, royalty, and inherited strength.',
  'Purva Phalguni': 'The front of the fig. Play, pleasure, and creative delight.',
  'Uttara Phalguni': 'The back of the fig. Nobility, partnership, service.',
  Hasta: 'The hand. Skill, craftsmanship, and healing touch.',
  Chitra: 'The bright jewel. Artistry, design, radiant presence.',
  Swati: 'The sword. Independence, diplomacy, and self-reliant grace.',
  Vishakha: 'The forked branch. Ambition, triumph, determined focus.',
  Anuradha: 'Following Radha. Devotion, friendship, deep loyalty.',
  Jyeshtha: 'The elder. Seniority, protection, hidden strength.',
  Mula: 'The root. Deep investigation, breaking free, spiritual roots.',
  'Purva Ashadha': 'The early victory. Invincible spirit, purifying ambition.',
  'Uttara Ashadha': 'The later victory. Universal victory, quiet strength.',
  Shravana: 'The ear. Listening, learning, sacred knowledge.',
  Dhanishta: 'The drum. Rhythm, prosperity, music of the cosmos.',
  Shatabhisha: 'The hundred healers. Healing, mystery, and vast vision.',
  'Purva Bhadrapada': 'The burning pair. Intense spirituality, fiery depths.',
  'Uttara Bhadrapada': 'The serpent of the deep. Wisdom, detachment, mystical insight.',
  Revati: 'The wealthiest. Nourishment, protection, gentle endings.',
};

/**
 * Narrative paragraph for each of the three anchors.
 * 2-3 sentences describing the essence.
 */
export const ANCHOR_NARRATIVES: Record<string, Record<string, string>> = {
  Lagna: {
    Aries: 'You arrive as fire — direct, courageous, a pioneer who moves first and thinks later. The body leads.',
    Taurus: 'You arrive as earth — steady, patient, grounded. The bull does not hurry, and does not yield.',
    Gemini: 'You arrive as air — curious, quick, communicative. The mind leads the body, always in motion.',
    Cancer: 'You arrive as water — nurturing, protective, deeply felt. The body remembers what the mind forgets.',
    Leo: 'You arrive as fire — regal, generous, radiant. The world is your stage, and you are here to shine.',
    Virgo: 'You arrive as earth — precise, analytical, healing. You refine the world through service.',
    Libra: 'You arrive as air — balancing, relational, aesthetic. You seek harmony in every exchange.',
    Scorpio: 'You arrive as water — deep, intense, transformative. You are here to die and be reborn.',
    Sagittarius: 'You arrive as fire — seeking, philosophical, expansive. The horizon is your home.',
    Capricorn: 'You arrive as earth — disciplined, ambitious, enduring. You climb the mountain that others fear.',
    Aquarius: 'You arrive as air — visionary, humanitarian, unconventional. You are here for the collective.',
    Pisces: 'You arrive as water — compassionate, mystical, dissolving. You remember you are not the body.',
  },
  Chandra: {
    Aries: 'Inside, a warrior. The mind is quick to anger and quick to move. Rest is a discipline you must learn.',
    Taurus: 'Inside, a garden. The mind is calm, steady, and deeply sensual. Emotions arrive slowly but stay.',
    Gemini: 'Inside, a library. The mind is always talking — to itself, to others, to the air. Silence is medicine.',
    Cancer: 'Inside, a mother. The mind feels everything deeply. Home is not a place but a feeling.',
    Leo: 'Inside, a king. The mind needs to be seen, admired, and respected. Your heart is both generous and proud.',
    Virgo: 'Inside, a healer. The mind is analytical, self-critical, and always improving. Perfection is a trap.',
    Libra: 'Inside, a mirror. The mind seeks balance, partnership, beauty. You feel most yourself with another.',
    Scorpio: 'Inside, an ocean. The mind is deep, private, transformative. You carry what others cannot.',
    Sagittarius: 'Inside, a wanderer. The mind seeks meaning, philosophy, distant horizons. Faith is your home.',
    Capricorn: 'Inside, an elder. The mind is serious, ambitious, and quietly powerful. You grew up early.',
    Aquarius: 'Inside, a visionary. The mind is different, futuristic, humanitarian. You are here to change things.',
    Pisces: 'Inside, a mystic. The mind dissolves into compassion and imagination. You feel the world\'s pain as your own.',
  },
  Surya: {
    Aries: 'At the core, a pioneer. The soul seeks bold, independent action.',
    Taurus: 'At the core, a builder. The soul seeks stability, beauty, and slow growth.',
    Gemini: 'At the core, a messenger. The soul seeks understanding, communication, connection.',
    Cancer: 'At the core, a caretaker. The soul seeks belonging, protection, and emotional truth.',
    Leo: 'At the core, a sovereign. The soul seeks creative self-expression and dignity.',
    Virgo: 'At the core, a craftsman. The soul seeks perfection, purity, and refined service.',
    Libra: 'At the core, a peacemaker. The soul seeks justice, beauty, and inner harmony.',
    Scorpio: 'At the core, an alchemist. The soul seeks truth at any cost, and rebirth through fire.',
    Sagittarius: 'At the core, a philosopher. The soul seeks meaning, dharma, and the highest knowledge.',
    Capricorn: 'At the core, a ruler. The soul seeks mastery, responsibility, and lasting achievement.',
    Aquarius: 'At the core, a reformer. The soul seeks freedom, equality, and the evolution of consciousness.',
    Pisces: 'At the core, a mystic. The soul seeks union, compassion, and dissolution into the divine.',
  },
};
``````

### `src\features\report\lib\varga-info.ts`

```typescript
/**
 * Knowledge base for all 20 divisional charts (Vargas).
 * Each entry describes what the chart reveals and how it's used.
 */
export interface VargaInfo {
  code: string;
  name: string;
  sanskrit: string;
  division: string;
  purpose: string;
  summary: string;
  useCases: string[];
}

export const VARGA_INFO: Record<string, VargaInfo> = {
  d1: {
    code: 'D1',
    name: 'Rashi',
    sanskrit: 'राशि',
    division: '1 division',
    purpose: 'The Body',
    summary:
      'The Rashi chart is the foundation of all Vedic astrology. Each sign is one house, showing the soul in physical form — the body, personality, and the life you walk in. Every other divisional chart is a lens on top of this base.',
    useCases: [
      'Overall life direction',
      'Physical body and health',
      'Personal identity and mask',
      'Basic planetary strength',
    ],
  },
  d2: {
    code: 'D2',
    name: 'Hora',
    sanskrit: 'होरा',
    division: '2 divisions of 15°',
    purpose: 'Wealth',
    summary:
      'The Hora splits each sign into two halves — one ruled by the Sun, one by the Moon. It reveals the source and nature of wealth in a chart: whether it comes through self-effort (Sun) or through inheritance, care, and connection (Moon).',
    useCases: [
      'Source of wealth',
      'Financial patterns',
      'Sustenance and prosperity',
      'Savings and assets',
    ],
  },
  d3: {
    code: 'D3',
    name: 'Drekkana',
    sanskrit: 'द्रेक्काण',
    division: '3 divisions of 10°',
    purpose: 'Siblings',
    summary:
      'The Drekkana shows siblings, co-borns, and short journeys. It also reveals communication and immediate community — the people you grow up alongside.',
    useCases: [
      'Siblings and cousins',
      'Neighborhood and locality',
      'Courage and initiative',
      'Short-distance travel',
    ],
  },
  d4: {
    code: 'D4',
    name: 'Chaturthamsa',
    sanskrit: 'चतुर्थांश',
    division: '4 divisions of 7°30′',
    purpose: 'Property',
    summary:
      'The Chaturthamsa reveals landed property, homes, and fixed assets. It shows what you own and where you settle — the physical and emotional foundations of life.',
    useCases: [
      'Real estate',
      'Home and land',
      'Vehicles',
      'Domestic happiness',
    ],
  },
  d5: {
    code: 'D5',
    name: 'Panchamsa',
    sanskrit: 'पञ्चमांश',
    division: '5 divisions of 6°',
    purpose: 'Fame',
    summary:
      'The Panchamsa reveals fame, authority, and the capacity for influence. It is used in classical Jyotish to determine whether a native attains renown.',
    useCases: [
      'Public reputation',
      'Political or social power',
      'Recognition and honours',
    ],
  },
  d6: {
    code: 'D6',
    name: 'Shashthamsa',
    sanskrit: 'षष्ठांश',
    division: '6 divisions of 5°',
    purpose: 'Health',
    summary:
      'The Shashthamsa is the health chart. It reveals physical vitality, disease proneness, and the specific areas of the body that need care.',
    useCases: [
      'Physical health',
      'Disease diagnosis',
      'Vitality and recovery',
    ],
  },
  d7: {
    code: 'D7',
    name: 'Saptamsa',
    sanskrit: 'सप्तांश',
    division: '7 divisions of 4°17′',
    purpose: 'Children',
    summary:
      'The Saptamsa is the primary chart for progeny — whether children come, their nature, and the native\'s relationship with them.',
    useCases: [
      'Children and fertility',
      'Lineage and descendants',
      'Creative legacy',
    ],
  },
  d8: {
    code: 'D8',
    name: 'Ashtamsa',
    sanskrit: 'अष्टांश',
    division: '8 divisions of 3°45′',
    purpose: 'Sudden Events',
    summary:
      'The Ashtamsa reveals sudden events — accidents, scandals, litigation, and unexpected changes. A difficult but important chart for timing crises.',
    useCases: [
      'Sudden gains or losses',
      'Accidents and injuries',
      'Litigation and disputes',
    ],
  },
  d9: {
    code: 'D9',
    name: 'Navamsha',
    sanskrit: 'नवांश',
    division: '9 divisions of 3°20′',
    purpose: 'Marriage & Dharma',
    summary:
      'The Navamsha is the most important divisional chart after the D1. It divides each sign into nine parts, revealing the soul\'s deeper purpose, the quality of marriage, and the true inner strength of every planet. A planet in the same sign in D1 and D9 is "Vargottama" — exceptionally strong.',
    useCases: [
      'Marriage and partnership',
      'Soul purpose and dharma',
      'Inner strength of planets',
      'Late-life direction',
    ],
  },
  d10: {
    code: 'D10',
    name: 'Dashamsha',
    sanskrit: 'दशांश',
    division: '10 divisions of 3°',
    purpose: 'Career',
    summary:
      'The Dashamsha is the career chart. It reveals profession, public role, professional achievements, and how the native is seen in the outer world.',
    useCases: [
      'Career and profession',
      'Public standing',
      'Professional reputation',
      'Nature of work',
    ],
  },
  d11: {
    code: 'D11',
    name: 'Rudramsa',
    sanskrit: 'रुद्रांश',
    division: '11 divisions of 2°43′',
    purpose: 'Gains',
    summary:
      'The Rudramsa (or Ekadashamsha) reveals gains, income, and the fulfilment of desires. A rarer chart, studied for its insight into what the native truly gains in life.',
    useCases: [
      'Income streams',
      'Fulfilment of desires',
      'Rewards and benefits',
    ],
  },
  d12: {
    code: 'D12',
    name: 'Dwadashamsha',
    sanskrit: 'द्वादशांश',
    division: '12 divisions of 2°30′',
    purpose: 'Parents',
    summary:
      'The Dwadashamsha reveals the native\'s parents — their nature, influence, and the karmic inheritance from them.',
    useCases: [
      'Father and mother',
      'Ancestral karma',
      'Family lineage',
    ],
  },
  d16: {
    code: 'D16',
    name: 'Shodashamsha',
    sanskrit: 'षोडशांश',
    division: '16 divisions of 1°52′',
    purpose: 'Vehicles',
    summary:
      'The Shodashamsha reveals vehicles, conveyances, and general comforts. It also shows the source of happiness and pleasure in life.',
    useCases: [
      'Vehicles and transport',
      'Comforts and pleasures',
      'Luxury and enjoyment',
    ],
  },
  d20: {
    code: 'D20',
    name: 'Vimshamsha',
    sanskrit: 'विंशांश',
    division: '20 divisions of 1°30′',
    purpose: 'Spirituality',
    summary:
      'The Vimshamsha is the spiritual chart. It reveals the native\'s path of devotion, meditation, and connection to the divine. An essential chart for those on the inner journey.',
    useCases: [
      'Spiritual practice',
      'Devotion and meditation',
      'Relationship to the divine',
      'Moksha (liberation)',
    ],
  },
  d24: {
    code: 'D24',
    name: 'Siddhamsha',
    sanskrit: 'सिद्धांश',
    division: '24 divisions of 1°15′',
    purpose: 'Education',
    summary:
      'The Siddhamsha (or Chaturvimshamsha) is the education chart. It reveals learning capacity, academic success, and the specific fields of knowledge the native excels in.',
    useCases: [
      'Education and learning',
      'Academic success',
      'Fields of expertise',
      'Intellectual gifts',
    ],
  },
  d27: {
    code: 'D27',
    name: 'Bhamsha',
    sanskrit: 'भांश',
    division: '27 divisions of 1°07′',
    purpose: 'Strengths',
    summary:
      'The Bhamsha (or Saptavimshamsha) reveals the native\'s general strengths, weaknesses, and stamina. It is used to check the overall vitality of the chart.',
    useCases: [
      'Strengths and weaknesses',
      'Stamina and endurance',
      'Overall vitality',
    ],
  },
  d30: {
    code: 'D30',
    name: 'Trimshamsha',
    sanskrit: 'त्रिंशांश',
    division: '30 divisions of 1°',
    purpose: 'Misfortunes',
    summary:
      'The Trimshamsha reveals misfortunes, evils, and the specific karmic challenges in life. A challenging but diagnostic chart.',
    useCases: [
      'Challenges and obstacles',
      'Karmic debts',
      'Sources of suffering',
    ],
  },
  d40: {
    code: 'D40',
    name: 'Khavedamsha',
    sanskrit: 'खवेदांश',
    division: '40 divisions of 45′',
    purpose: 'Maternal',
    summary:
      'The Khavedamsha reveals the influences of the mother\'s lineage and maternal karma.',
    useCases: [
      'Maternal legacy',
      'Mother\'s influence',
      'Inherited traits',
    ],
  },
  d45: {
    code: 'D45',
    name: 'Akshavedamsha',
    sanskrit: 'अक्षवेदांश',
    division: '45 divisions of 40′',
    purpose: 'Paternal',
    summary:
      'The Akshavedamsha reveals the influences of the father\'s lineage and paternal karma.',
    useCases: [
      'Paternal legacy',
      'Father\'s influence',
      'Ancestral strengths',
    ],
  },
  d60: {
    code: 'D60',
    name: 'Shashtiamsha',
    sanskrit: 'षष्ट्यंश',
    division: '60 divisions of 30′',
    purpose: 'Karma',
    summary:
      'The Shashtiamsha is the most subtle divisional chart. It reveals the finest details of the native\'s karma — the specific past-life impressions that shape this life. Considered by many to be the most important chart after D1 and D9.',
    useCases: [
      'Past-life karma',
      'Deepest life tendencies',
      'Subtle destiny patterns',
    ],
  },
};

export const VARGA_ORDER = [
  'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10',
  'd11', 'd12', 'd16', 'd20', 'd24', 'd27', 'd30', 'd40', 'd45', 'd60',
];
``````

### `src\features\report\primitives\AttributeBadge.tsx`

```tsx
export type BadgeTone = 'neutral' | 'positive' | 'warning' | 'negative' | 'info';

interface AttributeBadgeProps {
  children: string;
  tone?: BadgeTone;
  className?: string;
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'bg-muted/60 text-muted-foreground',
  positive: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  negative: 'bg-red-500/10 text-red-600 dark:text-red-400',
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
};

export function AttributeBadge({
  children,
  tone = 'neutral',
  className,
}: AttributeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium ${TONE_CLASSES[tone]} ${className ?? ''}`}
    >
      {children}
    </span>
  );
}
``````

### `src\features\report\primitives\GlyphBadge.tsx`

```tsx
import { REPORT_TOKENS } from '../tokens';

export type PlanetKey = keyof typeof REPORT_TOKENS.planetColors;

interface GlyphBadgeProps {
  /** Unicode glyph: ☉ ☽ ♂ ☿ ♃ ♀ ♄ ☊ ☋ */
  glyph: string;
  /** Which planet's traditional color to use */
  planet?: PlanetKey;
  /** Size in px */
  size?: number;
  /** Show colored background */
  filled?: boolean;
  /** Highlight with gold ring (for Ascendant, Lagna, etc.) */
  highlight?: boolean;
  className?: string;
  title?: string;
}

/**
 * A circular badge displaying a Unicode astrological glyph
 * in its traditional Jyotish color.
 */
export function GlyphBadge({
  glyph,
  planet = 'Ascendant',
  size = 32,
  filled = false,
  highlight = false,
  className,
  title,
}: GlyphBadgeProps) {
  const color = REPORT_TOKENS.planetColors[planet] ?? '#666';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-full ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        color: filled ? '#fff' : color,
        background: filled ? color : `${color}18`,
        border: highlight ? `1.5px solid ${REPORT_TOKENS.accentGold}` : 'none',
        boxShadow: highlight
          ? `0 0 0 3px ${REPORT_TOKENS.accentGold}22`
          : undefined,
        fontSize: size * 0.55,
        lineHeight: 1,
        fontFamily: 'Noto Sans Symbols 2, system-ui, sans-serif',
      }}
      title={title}
      aria-label={title}
      role={title ? 'img' : undefined}
    >
      {glyph}
    </span>
  );
}
``````

### `src\features\report\primitives\index.ts`

```typescript
export { Section } from './Section';
export { ReportPage } from './ReportPage';
export { OrnamentalDivider } from './OrnamentalDivider';
export { InfoRow } from './InfoRow';
export { InfoTile } from './InfoTile';
export { GlyphBadge } from './GlyphBadge';
export { AttributeBadge } from './AttributeBadge';
``````

### `src\features\report\primitives\InfoRow.tsx`

```tsx
interface InfoRowProps {
  label: string;
  value: string;
  accent?: boolean;
  mono?: boolean;
  className?: string;
}

export function InfoRow({
  label,
  value,
  accent = false,
  mono = false,
  className,
}: InfoRowProps) {
  return (
    <p className={`flex justify-between gap-3 ${className ?? ''}`}>
      <span className="text-muted-foreground">{label}</span>
      <strong
        className={`${accent ? 'text-primary' : ''} ${mono ? 'font-mono text-xs' : ''} text-right`}
      >
        {value}
      </strong>
    </p>
  );
}
``````

### `src\features\report\primitives\InfoTile.tsx`

```tsx
interface InfoTileProps {
  label: string;
  value: string;
  subtitle?: string;
  progress?: number;
  accent?: boolean;
  className?: string;
}

export function InfoTile({
  label,
  value,
  subtitle,
  progress,
  accent = false,
  className,
}: InfoTileProps) {
  return (
    <div
      className={`flex flex-col gap-1 p-4 rounded-lg border bg-card/60 ${className ?? ''}`}
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </p>
      <p
        className={`font-semibold leading-tight ${accent ? 'text-primary' : 'text-foreground'}`}
        style={{ fontSize: '1.05rem' }}
      >
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground leading-snug">{subtitle}</p>
      )}
      {progress !== undefined && (
        <div className="mt-1.5 space-y-1">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-right font-mono">
            {progress.toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}
``````

### `src\features\report\primitives\OrnamentalDivider.tsx`

```tsx
export function OrnamentalDivider({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 my-10 select-none ${className ?? ''}`}
      aria-hidden="true"
    >
      <span
        className="h-px flex-1 max-w-[200px]"
        style={{
          background: 'linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), transparent)',
        }}
      />
      <span
        className="text-primary/50"
        style={{ fontSize: '11px', lineHeight: 1 }}
      >
        ✦
      </span>
      <span
        className="h-px flex-1 max-w-[200px]"
        style={{
          background: 'linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), transparent)',
        }}
      />
    </div>
  );
}
``````

### `src\features\report\primitives\ReportPage.tsx`

```tsx
import type { ReactNode } from 'react';

export interface ReportPageProps {
  children: ReactNode;
  maxWidth?: string;
}

export function ReportPage({ children, maxWidth = '900px' }: ReportPageProps) {
  return (
    <div className="w-full flex justify-center px-4 md:px-6 py-6">
      <div className="w-full space-y-2" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
``````

### `src\features\report\primitives\Section.tsx`

```tsx
import type { ReactNode } from 'react';

interface SectionProps {
  eyebrow?: string;
  title: string;
  hint?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({
  eyebrow,
  title,
  hint,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <section className={`space-y-5 ${className ?? ''}`}>
      <header className="space-y-2">
        {eyebrow && (
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-semibold"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {eyebrow}
          </p>
        )}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontFamily: "'Crimson Pro', 'Noto Serif Devanagari', Georgia, serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.15,
            }}
          >
            {title}
          </h2>
          {action}
        </div>
        {hint && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {hint}
          </p>
        )}
      </header>

      <div>{children}</div>
    </section>
  );
}
``````

### `src\features\report\sections\AdvancedSection.tsx`

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AdvancedSectionProps {
  kundli: Record<string, any>;
}

export function AdvancedSection({ kundli }: AdvancedSectionProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const vargaKeys = Object.keys(kundli.vargas ?? {}).filter((k) => k !== 'd1');
  const kpCusps = kundli.kp?.cusps ?? [];
  const chalitPlanets = kundli.chalit?.planets ?? [];

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/40 transition-colors"
      >
        <span className="text-sm font-semibold">
          {open
            ? t('advanced.hide', { defaultValue: 'Hide advanced analysis' })
            : t('advanced.show', { defaultValue: 'Show advanced analysis' })}
        </span>
        <span className="text-muted-foreground">{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className="p-4 space-y-6 border-t">
          {/* Vargas */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
              {t('advanced.vargas', { defaultValue: 'Divisional Charts' })} ({vargaKeys.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {vargaKeys.map((k) => (
                <span
                  key={k}
                  className="inline-flex items-center px-2 py-1 rounded text-[10px] font-mono uppercase bg-muted/60 text-muted-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* KP cusps */}
          {kpCusps.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                {t('advanced.kp', { defaultValue: 'KP House Cusps' })}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-muted-foreground border-b">
                      <th className="text-left py-1.5 font-medium">H</th>
                      <th className="text-left py-1.5 font-medium">Rashi</th>
                      <th className="text-left py-1.5 font-medium">Nakshatra</th>
                      <th className="text-left py-1.5 font-medium">Sub Lord</th>
                      <th className="text-left py-1.5 font-medium">Sub-Sub</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpCusps.map((c: any) => (
                      <tr key={c.houseNumber} className="border-b last:border-none">
                        <td className="py-1.5 font-mono">{c.houseNumber}</td>
                        <td className="py-1.5">{c.rashiName}</td>
                        <td className="py-1.5 text-muted-foreground">{c.nakshatraName}</td>
                        <td className="py-1.5 font-medium">{c.subLord}</td>
                        <td className="py-1.5 text-muted-foreground">{c.subSubLord}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Chalit */}
          {chalitPlanets.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                {t('advanced.chalit', { defaultValue: 'Bhava Chalit' })}
              </p>
              <div className="space-y-1">
                {chalitPlanets.map((p: any) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between text-xs py-1 border-b last:border-none"
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="text-muted-foreground">
                      Rashi H{p.rashiHouse} → Chalit H{p.house}
                      {p.shifted !== 0 && (
                        <span className="ml-2 text-amber-600 dark:text-amber-400">
                          {p.shifted > 0 ? 'shifted forward' : 'shifted back'}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
``````

### `src\features\report\sections\AspectsSection.tsx`

```tsx
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PLANET_GLYPHS } from '../lib/glyphs';
import {
  ASPECT_RULES,
  ASPECT_TYPE_LABEL,
  ASPECT_TYPE_MEANING,
} from '../lib/aspect-info';

interface AspectsSectionProps {
  kundli: Record<string, any>;
}

const PLANET_ORDER = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter',
  'Venus', 'Saturn', 'Rahu', 'Ketu',
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const HOUSE_NAMES: Record<number, string> = {
  1: 'Self', 2: 'Wealth', 3: 'Siblings', 4: 'Home',
  5: 'Children', 6: 'Enemies', 7: 'Marriage', 8: 'Transform',
  9: 'Fortune', 10: 'Career', 11: 'Gains', 12: 'Loss',
};

export function AspectsSection({ kundli }: AspectsSectionProps) {
  const { t } = useTranslation();
  const dr = kundli.drishti ?? {};
  const planetAspects = dr.planetAspects ?? {};
  const mutual = dr.mutualAspects ?? [];

  // Build a matrix: planet -> set of houses it aspects
  const aspectMatrix = useMemo(() => {
    const matrix: Record<string, Set<number>> = {};
    for (const planet of PLANET_ORDER) {
      const a = planetAspects[planet];
      matrix[planet] = new Set(
        (a?.aspectedHouses ?? []).map((h: any) => h.house)
      );
    }
    return matrix;
  }, [planetAspects]);

  if (Object.keys(planetAspects).length === 0 && mutual.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground text-sm border border-dashed rounded-lg">
        {t('aspects.noData', { defaultValue: 'Aspect data is not available for this chart.' })}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ══════════════════════════════════════════════════════ */}
      {/*  INTRODUCTION                                        */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-4">
        <div>
          <h3
            className="text-xl font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.whatIsTitle', { defaultValue: 'What is Graha Drishti?' })}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-3xl">
            {t('aspects.whatIsBody', {
              defaultValue:
                'In Vedic astrology, every planet casts its glance — its drishti — on other houses of the chart. This is not mere influence; it is the planet\'s way of reaching out, examining, and modifying whatever it sees. Aspect is one of the most powerful tools for understanding how a chart actually functions. A planet is not only defined by where it sits, but by what it looks at.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.ruleLabel', { defaultValue: 'Rule' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              Every planet has a <strong>7th-house aspect</strong> — the full opposite house.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.special', { defaultValue: 'Special' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              <strong>Mars</strong>, <strong>Jupiter</strong>, and <strong>Saturn</strong> have extra aspects. Rahu and Ketu mirror Jupiter.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.strength', { defaultValue: 'Strength' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              <strong>7th</strong> is the strongest. <strong>3rd/10th</strong> are the mildest. Grahas aspect the exact degree of a point.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.why', { defaultValue: 'Why it matters' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              Aspects tell you <strong>who is watching whom</strong> — and that interaction shapes what actually happens.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  THE ASPECT RULES TABLE                              */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.rulesTitle', { defaultValue: 'Classical Aspect Rules' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('aspects.rulesHint', {
              defaultValue: 'Every planet has aspects. Some have special ones.',
            })}
          </p>
        </div>

        <div className="divide-y">
          {ASPECT_RULES.map((rule) => {
            const hasSpecial = rule.houses.length > 1;
            return (
              <div
                key={rule.planet}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3"
              >
                {/* Planet */}
                <div className="flex items-center gap-2 min-w-[110px]">
                  <span
                    className="text-xl leading-none"
                    style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                  >
                    {PLANET_GLYPHS[rule.planet] ?? '·'}
                  </span>
                  <strong className="text-sm">{rule.planet}</strong>
                </div>

                {/* Aspect houses */}
                <div className="flex flex-wrap gap-1.5">
                  {rule.houses.map((h) => (
                    <span
                      key={h}
                      className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded font-mono ${
                        hasSpecial
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted/60 text-muted-foreground'
                      }`}
                    >
                      {h}
                      {h === 1 ? 'st' : h === 2 ? 'nd' : h === 3 ? 'rd' : 'th'}
                    </span>
                  ))}
                </div>

                {/* Meaning */}
                <p className="text-xs text-muted-foreground hidden md:block max-w-[200px] text-right">
                  {rule.meaning}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  ASPECT MATRIX — visual overview                     */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.matrixTitle', { defaultValue: 'Aspect Matrix' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('aspects.matrixHint', {
              defaultValue:
                'Which planets aspect which houses in this chart. Dots mark active aspects.',
            })}
          </p>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header row — houses */}
            <div className="grid" style={{ gridTemplateColumns: '110px repeat(12, minmax(34px, 1fr))' }}>
              <div />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                <div
                  key={h}
                  className="text-center text-[10px] font-mono text-muted-foreground pb-2"
                >
                  H{h}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {PLANET_ORDER.map((planet) => {
              const a = planetAspects[planet];
              if (!a) return null;
              const houses = aspectMatrix[planet];

              return (
                <div
                  key={planet}
                  className="grid items-center"
                  style={{ gridTemplateColumns: '110px repeat(12, minmax(34px, 1fr))' }}
                >
                  {/* Planet label */}
                  <div className="flex items-center gap-2 py-1.5">
                    <span
                      className="text-base leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[planet] ?? '·'}
                    </span>
                    <span className="text-xs font-medium">{planet}</span>
                  </div>

                  {/* Aspect cells */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                    const isAspected = houses.has(h);
                    return (
                      <div
                        key={h}
                        className="flex items-center justify-center py-1.5"
                      >
                        {isAspected ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        ) : (
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/15" />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Legend */}
            <div className="flex items-center gap-4 pt-3 mt-3 border-t text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                Aspect active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                No aspect
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  MUTUAL ASPECTS — most significant pairs             */}
      {/* ══════════════════════════════════════════════════════ */}
      {mutual.length > 0 && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <h3
              className="text-base font-bold leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {t('aspects.mutualTitle', { defaultValue: 'Mutual Aspects' })}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-1">
              {t('aspects.mutualHint', {
                defaultValue:
                  'The most significant connections — two planets looking at each other.',
              })}
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mutual.map((m: any, i: number) => (
              <div
                key={i}
                className="rounded-xl border border-primary/30 bg-primary/[0.04] p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[m.planet1] ?? '·'}
                    </span>
                    <strong className="text-sm">{m.planet1}</strong>
                  </div>
                  <span className="text-primary text-lg">↔</span>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm">{m.planet2}</strong>
                    <span
                      className="text-xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[m.planet2] ?? '·'}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground text-center">
                  {m.planet1AspectOnPlanet2} ↔ {m.planet2AspectOnPlanet1}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════ */}
      {/*  PER-PLANET DETAIL CARDS                             */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div>
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.detailTitle', { defaultValue: 'Planet-by-Planet' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('aspects.detailHint', {
              defaultValue: 'What each planet looks at, and what it means.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PLANET_ORDER.map((planet) => {
            const a = planetAspects[planet];
            if (!a) return null;
            const houses = a.aspectedHouses ?? [];
            const planets = a.aspectedPlanets ?? [];
            if (houses.length === 0 && planets.length === 0) return null;

            return (
              <div
                key={planet}
                className="rounded-xl border bg-card p-4 space-y-3"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-2xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[planet] ?? '·'}
                    </span>
                    <div>
                      <p className="text-sm font-bold leading-tight">{planet}</p>
                      <p className="text-[10px] text-muted-foreground">
                        House {a.sourceHouse}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Houses aspected */}
                {houses.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Aspects houses
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {houses.map((h: any, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-1 rounded bg-primary/10 text-primary"
                          title={ASPECT_TYPE_MEANING[h.type]}
                        >
                          H{h.house}
                          <span className="opacity-60 ml-1">({h.type})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Planets aspected */}
                {planets.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Aspects planets
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {planets.map((p: any, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-1 rounded bg-muted/60 text-foreground/85"
                        >
                          {PLANET_GLYPHS[p.planet] ?? ''} {p.planet}
                          <span className="opacity-60 ml-1">({p.type})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
``````

### `src\features\report\sections\BhavaSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { RASHI_GLYPHS, RASHI_LORDS, PLANET_GLYPHS, HOUSE_NAMES_EN } from '../lib/glyphs';

interface BhavaSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const HOUSE_CATEGORY: Record<number, 'kendra' | 'trikona' | 'dusthana' | 'neutral'> = {
  1: 'kendra', 2: 'neutral', 3: 'neutral', 4: 'kendra',
  5: 'trikona', 6: 'dusthana', 7: 'kendra', 8: 'dusthana',
  9: 'trikona', 10: 'kendra', 11: 'neutral', 12: 'dusthana',
};

const CATEGORY_BG: Record<string, string> = {
  kendra: 'bg-amber-500/[0.04] border-amber-500/20',
  trikona: 'bg-emerald-500/[0.04] border-emerald-500/20',
  dusthana: 'bg-red-500/[0.04] border-red-500/20',
  neutral: 'bg-card',
};

export function BhavaSection({ kundli }: BhavaSectionProps) {
  const { t } = useTranslation();
  const houses = kundli.houses ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {houses.map((h: any) => {
        const rashiName = rashiNameFromNumber(h.rashi);
        const rashiGlyph = RASHI_GLYPHS[rashiName] ?? '·';
        const rashiLord = RASHI_LORDS[rashiName] ?? '—';
        const category = HOUSE_CATEGORY[h.number] ?? 'neutral';

        return (
          <article
            key={h.number}
            className={`rounded-lg border p-4 space-y-2 ${CATEGORY_BG[category]}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="text-lg font-bold leading-none"
                  style={{ fontFamily: 'Crimson Pro, Georgia, serif' }}
                >
                  {ROMAN[h.number - 1]}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  {t(`houseNames.${h.number}`, { defaultValue: HOUSE_NAMES_EN[h.number] })}
                </p>
              </div>
              <span className="text-2xl opacity-60">{rashiGlyph}</span>
            </div>

            <div className="space-y-1 pt-2 border-t border-border/40">
              <p className="text-xs">
                <strong className="text-primary">{rashiName}</strong>
              </p>
              <p className="text-[11px] text-muted-foreground">
                {t('bhava.lord', { defaultValue: 'Lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[rashiLord]} {rashiLord}
                </strong>
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 min-h-[3rem]">
              {h.planets?.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {h.planets.map((p: string) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary"
                    >
                      {PLANET_GLYPHS[p] ?? ''} {p}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-muted-foreground italic">
                  {t('bhava.empty', { defaultValue: 'Empty' })}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

function rashiNameFromNumber(n: number | undefined): string {
  if (!n || n < 1 || n > 12) return '—';
  return RASHI_NAMES[n - 1];
}
``````

### `src\features\report\sections\ChalitSection.tsx`

```tsx
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VedicChart } from '@/features/chart/components/VedicChart';
import { buildChalitChartHouses } from '@/features/chart/lib/adapters';
import { prisriJyotish } from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { PLANET_GLYPHS, RASHI_GLYPHS } from '../lib/glyphs';
import { cn } from '@/lib/utils';
import type { ChalitChartData } from '@/domain/astrology/port';

interface ChalitSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const HOUSE_NAMES: Record<number, string> = {
  1: 'Self', 2: 'Wealth', 3: 'Siblings', 4: 'Home',
  5: 'Children', 6: 'Enemies', 7: 'Marriage', 8: 'Transformation',
  9: 'Fortune', 10: 'Career', 11: 'Gains', 12: 'Loss',
};

export function ChalitSection({ kundli }: ChalitSectionProps) {
  const { t } = useTranslation();
  const [showCusps, setShowCusps] = useState(false);

  const chalit: ChalitChartData | null = useMemo(() => {
    try {
      return prisriJyotish.getChalit(kundli as any, 'sripati');
    } catch {
      return (kundli.chalit as ChalitChartData) ?? null;
    }
  }, [kundli]);

  const abbrResolver = useMemo(
    () => (planet: string) => {
      if (planet === 'Ascendant') return 'Asc';
      return planet.slice(0, 2);
    },
    []
  );

  const chalitHouses = useMemo(() => {
    if (!chalit) return [];
    return buildChalitChartHouses(chalit, abbrResolver);
  }, [chalit, abbrResolver]);

  if (!chalit || !chalit.planets) {
    return (
      <div className="p-6 text-center text-muted-foreground text-sm border border-dashed rounded-lg">
        {t('chalit.noData', { defaultValue: 'Chalit data is not available for this chart.' })}
      </div>
    );
  }

  const planets = chalit.planets ?? [];
  const cusps = chalit.housesCusps ?? [];
  const shiftedPlanets = planets.filter((p: any) => p.shifted !== 0);

  return (
    <div className="space-y-8">
      {/* ══════════════════════════════════════════════════════ */}
      {/*  INTRODUCTION                                        */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-3">
        <h3
          className="text-xl font-bold leading-tight"
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          {t('chalit.whatIsTitle', { defaultValue: 'What is Bhava Chalit?' })}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {t('chalit.whatIsBody', {
            defaultValue:
              'The Rashi (D1) chart places planets by whole sign — every planet in Pisces sits in the Pisces house, regardless of degree. The Chalit chart refines this: it divides the zodiac into actual Bhava boundaries based on the Ascendant\'s exact degree, and re-places every planet in the house it truly occupies. When a planet shifts from its Rashi house to a different Chalit house, its influence moves with it. This is why two Jyotishis can read the same chart and reach different conclusions — one is reading D1, the other Chalit.',
          })}
        </p>
        <p className="text-xs text-muted-foreground italic">
          {t('chalit.methodNote', {
            defaultValue:
              'This chart uses the Sripati method — the classical Parashari system used across North India and Nepal.',
          })}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  CHART + SHIFTS side by side                         */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* ─── The Chalit chart ────────────────────────────── */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <h3
              className="text-base font-bold leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {t('chalit.chartTitle', { defaultValue: 'Chalit Chart' })}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-1">
              {t('chalit.chartHint', {
                defaultValue: 'Planets in their actual Bhava boundaries (Sripati method).',
              })}
            </p>
          </div>

          <div className="p-6 flex justify-center">
            <VedicChart
              key="chalit-sripati"
              size={380}
              houses={chalitHouses}
              defaultStyle="north"
              hideToggle
            />
          </div>
        </div>

        {/* ─── House Shifts ────────────────────────────────── */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <h3
              className="text-base font-bold leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {t('chalit.shiftsTitle', { defaultValue: 'House Shifts' })}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-1">
              {t('chalit.shiftsHint', {
                defaultValue: 'Planets whose Chalit house differs from their Rashi house.',
              })}
            </p>
          </div>

          <div className="p-4 space-y-3">
            {shiftedPlanets.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                {t('chalit.noShifts', {
                  defaultValue:
                    'No planets shift between Rashi and Chalit. Every planet sits in its expected house.',
                })}
              </p>
            ) : (
              shiftedPlanets.map((p: any) => {
                const direction = p.shifted > 0 ? 'forward' : 'backward';
                return (
                  <div
                    key={p.name}
                    className="rounded-xl border border-amber-500/30 bg-amber-500/[0.05] p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-2xl leading-none"
                          style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                        >
                          {PLANET_GLYPHS[p.name] ?? '·'}
                        </span>
                        <div>
                          <p className="text-sm font-bold leading-tight">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground">{p.rashiName}</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                        {direction}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-2 border-t border-amber-500/20">
                      <div className="flex-1 text-center">
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                          D1
                        </p>
                        <p className="text-lg font-bold">{ROMAN[p.rashiHouse - 1]}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {HOUSE_NAMES[p.rashiHouse]}
                        </p>
                      </div>
                      <span className="text-xl text-amber-600 dark:text-amber-400">→</span>
                      <div className="flex-1 text-center">
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                          Chalit
                        </p>
                        <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                          {ROMAN[p.house - 1]}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {HOUSE_NAMES[p.house]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  PLANETARY PLACEMENT TABLE                          */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('chalit.tableTitle', { defaultValue: 'Planetary Placement' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('chalit.tableHint', {
              defaultValue:
                'Every planet, its Rashi house, its Chalit house, and how far into the Chalit house it sits.',
            })}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-left px-6 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colPlanet', { defaultValue: 'Planet' })}
                </th>
                <th className="text-left px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colSign', { defaultValue: 'Sign' })}
                </th>
                <th className="text-center px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colRashiHouse', { defaultValue: 'Rashi House' })}
                </th>
                <th className="text-center px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colChalitHouse', { defaultValue: 'Chalit House' })}
                </th>
                <th className="text-center px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colPosition', { defaultValue: 'Position' })}
                </th>
                <th className="text-right px-6 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colStatus', { defaultValue: 'Status' })}
                </th>
              </tr>
            </thead>
            <tbody>
              {planets.map((p: any) => {
                const shifted = p.shifted !== 0;
                return (
                  <tr
                    key={p.name}
                    className="border-b last:border-none hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-lg leading-none"
                          style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                        >
                          {PLANET_GLYPHS[p.name] ?? '·'}
                        </span>
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-base leading-none"
                          style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                        >
                          {RASHI_GLYPHS[p.rashiName] ?? '·'}
                        </span>
                        <span>{p.rashiName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-mono">{ROMAN[p.rashiHouse - 1]}</td>
                    <td
                      className={cn(
                        'px-4 py-3 text-center font-mono font-semibold',
                        shifted && 'text-amber-700 dark:text-amber-400'
                      )}
                    >
                      {ROMAN[p.house - 1]}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-xs text-muted-foreground">
                      {p.housePositionDegree}° {String(p.housePositionMinute ?? 0).padStart(2, '0')}′
                    </td>
                    <td className="px-6 py-3 text-right">
                      {shifted ? (
                        <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                          {p.shifted > 0 ? 'Forward' : 'Backward'}
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  HOUSE CUSPS — collapsible                           */}
      {/* ══════════════════════════════════════════════════════ */}
      {cusps.length > 0 && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <button
            type="button"
            onClick={() => setShowCusps((v) => !v)}
            className="w-full px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent flex items-center justify-between gap-3 hover:bg-primary/[0.06] transition-colors text-left"
          >
            <div>
              <h3
                className="text-base font-bold leading-tight"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {t('chalit.cuspsTitle', { defaultValue: 'House Cusps' })}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1">
                {t('chalit.cuspsHint', {
                  defaultValue:
                    'The exact start and end degrees of each Bhava boundary. Useful when a planet sits near a cusp.',
                })}
              </p>
            </div>
            <span className="text-muted-foreground text-sm shrink-0">
              {showCusps ? '▴' : '▾'}
            </span>
          </button>

          {showCusps && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left px-6 py-3 font-medium text-[10px] uppercase tracking-wider">
                      {t('chalit.cuspHouse', { defaultValue: 'House' })}
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                      {t('chalit.cuspSign', { defaultValue: 'Sign' })}
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                      {t('chalit.cuspStart', { defaultValue: 'Start' })}
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                      {t('chalit.cuspEnd', { defaultValue: 'End' })}
                    </th>
                    <th className="text-right px-6 py-3 font-medium text-[10px] uppercase tracking-wider">
                      {t('chalit.cuspSpan', { defaultValue: 'Span' })}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cusps.map((c: any, idx: number) => {
                    const houseNum = c.houseNumber ?? idx + 1;
                    const span =
                      ((c.endLongitude ?? 0) - (c.startLongitude ?? 0) + 360) % 360;
                    return (
                      <tr
                        key={houseNum}
                        className="border-b last:border-none hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-3">
                          <span className="font-mono text-sm">{ROMAN[houseNum - 1]}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {HOUSE_NAMES[houseNum]}
                          </span>
                        </td>
                        <td className="px-4 py-3">{c.rashiName ?? '—'}</td>
                        <td className="px-4 py-3 text-right font-mono text-xs">
                          {(c.startLongitude ?? 0).toFixed(2)}°
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-xs">
                          {(c.endLongitude ?? 0).toFixed(2)}°
                        </td>
                        <td className="px-6 py-3 text-right font-mono text-xs">
                          {span.toFixed(2)}°
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
``````

### `src\features\report\sections\CoreIdentitySection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS, RASHI_GLYPHS, RASHI_LORDS } from '../lib/glyphs';
import {
  RASHI_INTERPRETATIONS,
  NAKSHATRA_INTERPRETATIONS,
} from '../lib/interpretations';

interface CoreIdentitySectionProps {
  kundli: Record<string, any>;
}

function formatDegree(deg?: number, min?: number, sec?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  const s = sec ?? 0;
  return `${d}° ${String(m).padStart(2, '0')}′ ${String(s).padStart(2, '0')}″`;
}

export function CoreIdentitySection({ kundli }: CoreIdentitySectionProps) {
  const { t } = useTranslation();

  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const sun = kundli.planets?.Sun ?? {};

  const cards = [
    {
      key: 'lagna',
      title: t('coreIdentity.lagna', { defaultValue: 'Lagna' }),
      subtitle: t('coreIdentity.lagnaSub', { defaultValue: 'The mask you wear to the world' }),
      planet: asc,
      planetKey: 'Ascendant',
      showNakshatraLord: true,
    },
    {
      key: 'chandra',
      title: t('coreIdentity.chandra', { defaultValue: 'Chandra (Moon)' }),
      subtitle: t('coreIdentity.chandraSub', { defaultValue: 'The mind and inner world' }),
      planet: moon,
      planetKey: 'Moon',
      showNakshatraLord: true,
    },
    {
      key: 'surya',
      title: t('coreIdentity.surya', { defaultValue: 'Surya (Sun)' }),
      subtitle: t('coreIdentity.suryaSub', { defaultValue: 'The soul and father principle' }),
      planet: sun,
      planetKey: 'Sun',
      showNakshatraLord: true,
    },
  ];

  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const p = card.planet;
        const rashiName = p.rashiName ?? '—';
        const rashiGlyph = RASHI_GLYPHS[rashiName] ?? '·';
        const rashiLord = RASHI_LORDS[rashiName] ?? '—';
        const nakshatra = p.nakshatra ?? '—';
        const nakshatraLord = p.nakshatraLord ?? '—';
        const interpretation =
          RASHI_INTERPRETATIONS[rashiName] ?? '';
        const nakshatraInterp =
          NAKSHATRA_INTERPRETATIONS[nakshatra] ?? '';

        return (
          <article
            key={card.key}
            className="rounded-xl border bg-card p-5 space-y-4"
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  {card.title}
                </p>
                <p className="text-xs text-muted-foreground italic mt-0.5">
                  {card.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <GlyphBadge
                  glyph={rashiGlyph}
                  planet={card.planetKey as any}
                  size={36}
                  highlight={card.key === 'lagna'}
                  title={rashiName}
                />
                <span className="text-base font-semibold">{rashiName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-xs">
              <Field
                label={t('coreIdentity.position', { defaultValue: 'Position' })}
                value={formatDegree(p.degree, p.minute, p.second)}
                mono
              />
              <Field
                label={t('coreIdentity.nakshatra', { defaultValue: 'Nakshatra' })}
                value={`${nakshatra} ${p.pada ?? ''}`}
              />
              <Field
                label={t('coreIdentity.rashiLord', { defaultValue: 'Rashi Lord' })}
                value={rashiLord}
                glyph={PLANET_GLYPHS[rashiLord]}
              />
              {card.showNakshatraLord && (
                <Field
                  label={t('coreIdentity.nakshatraLord', { defaultValue: 'Nakshatra Lord' })}
                  value={nakshatraLord}
                  glyph={PLANET_GLYPHS[nakshatraLord]}
                />
              )}
            </div>

            {interpretation && (
              <div className="pt-3 border-t border-border/50 space-y-2">
                <p className="text-xs leading-relaxed text-foreground/90">
                  <span className="font-semibold text-primary">{rashiName}: </span>
                  {interpretation}
                </p>
                {nakshatraInterp && (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{nakshatra}: </span>
                    {nakshatraInterp}
                  </p>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  glyph,
}: {
  label: string;
  value: string;
  mono?: boolean;
  glyph?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`mt-0.5 flex items-center gap-1.5 ${mono ? 'font-mono' : ''}`}>
        {glyph && <span className="text-sm opacity-70">{glyph}</span>}
        <span className="font-medium">{value}</span>
      </p>
    </div>
  );
}
``````

### `src\features\report\sections\DashaSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS } from '../lib/glyphs';

interface DashaSectionProps {
  kundli: Record<string, any>;
}

function fmtDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function DashaSection({ kundli }: DashaSectionProps) {
  const { t } = useTranslation();
  const dasha = kundli.dasha ?? {};
  const mahadashas = dasha.mahadashas ?? [];
  const current = dasha.currentMahadasha;
  const antar = dasha.currentAntar;
  const pratyantar = dasha.currentPratyantar;

  const now = Date.now();
  const lifeStart = mahadashas[0]?.startTime
    ? new Date(mahadashas[0].startTime).getTime()
    : now;
  const lifeEnd = mahadashas[mahadashas.length - 1]?.endTime
    ? new Date(mahadashas[mahadashas.length - 1].endTime).getTime()
    : now + 365 * 24 * 60 * 60 * 1000;
  const lifeSpan = Math.max(1, lifeEnd - lifeStart);

  return (
    <div className="space-y-6">
      {/* Current period */}
      {current && (
        <article className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 space-y-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            {t('dasha.currentlyIn', { defaultValue: 'Currently in' })}
          </p>
          <div className="flex items-center gap-4">
            <GlyphBadge
              glyph={PLANET_GLYPHS[current.planet] ?? '·'}
              planet={current.planet}
              size={48}
              filled
            />
            <div>
              <p className="text-xl font-bold leading-tight">
                {current.planet} {t('dasha.mahadasha', { defaultValue: 'Mahadasha' })}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                {fmtDate(current.startTime)} → {fmtDate(current.endTime)}
              </p>
            </div>
          </div>
          {typeof current.progressPercent === 'number' && (
            <div className="space-y-1">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${Math.min(100, current.progressPercent)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right font-mono">
                {current.progressPercent.toFixed(1)}% {t('dasha.complete', { defaultValue: 'complete' })}
              </p>
            </div>
          )}

          {/* Sub-periods */}
          <div className="pt-3 border-t border-primary/20 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {antar && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t('dasha.antardasha', { defaultValue: 'Antardasha' })}
                </p>
                <p className="font-semibold mt-0.5">
                  {PLANET_GLYPHS[antar.planet]} {antar.planet}
                </p>
                <p className="text-muted-foreground font-mono text-[11px]">
                  {fmtDate(antar.startTime)} → {fmtDate(antar.endTime)}
                </p>
              </div>
            )}
            {pratyantar && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t('dasha.pratyantar', { defaultValue: 'Pratyantar' })}
                </p>
                <p className="font-semibold mt-0.5">
                  {PLANET_GLYPHS[pratyantar.planet]} {pratyantar.planet}
                </p>
                <p className="text-muted-foreground font-mono text-[11px]">
                  {fmtDate(pratyantar.startTime)} → {fmtDate(pratyantar.endTime)}
                </p>
              </div>
            )}
          </div>
        </article>
      )}

      {/* Life timeline */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-3">
          {t('dasha.timeline', { defaultValue: 'Life Timeline' })}
        </p>
        <div className="space-y-1.5">
          {mahadashas.map((md: any) => {
            const start = new Date(md.startTime).getTime();
            const end = new Date(md.endTime).getTime();
            const leftPct = ((start - lifeStart) / lifeSpan) * 100;
            const widthPct = ((end - start) / lifeSpan) * 100;
            const isCurrent = current && md.planet === current.planet && md.startTime === current.startTime;

            return (
              <div key={md.planet + md.startTime} className="flex items-center gap-2 text-xs">
                <div className="w-24 shrink-0 font-medium">
                  {PLANET_GLYPHS[md.planet]} {md.planet}
                </div>
                <div className="flex-1 h-5 bg-muted/40 rounded relative overflow-hidden">
                  <div
                    className={`absolute h-full rounded ${isCurrent ? 'bg-primary' : 'bg-foreground/25'}`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  />
                  {isCurrent && (
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                      NOW
                    </span>
                  )}
                </div>
                <div className="w-28 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                  {new Date(md.startTime).getFullYear()} → {new Date(md.endTime).getFullYear()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
``````

### `src\features\report\sections\DivisionalChartsSection.tsx`

```tsx
import { useMemo, useState } from 'react';
import { VedicChart } from '@/features/chart/components/VedicChart';
import { buildChartHouses, buildVargaHouses } from '@/features/chart/lib/adapters';
import { VARGA_INFO, VARGA_ORDER } from '../lib/varga-info';
import { cn } from '@/lib/utils';

interface DivisionalChartsSectionProps {
  kundli: Record<string, any>;
}

export function DivisionalChartsSection({ kundli }: DivisionalChartsSectionProps) {
  const [activeVarga, setActiveVarga] = useState<string>('d9');

  const availableVargas = useMemo(() => {
    const present = Object.keys(kundli.vargas ?? {});
    return VARGA_ORDER.filter((v) => v === 'd1' || present.includes(v));
  }, [kundli]);

  const abbrResolver = useMemo(
    () => (planet: string) => {
      if (planet === 'Ascendant') return 'Asc';
      return planet.slice(0, 2);
    },
    []
  );

  const activeHouses = useMemo(() => {
    if (activeVarga === 'd1') {
      return buildChartHouses(kundli, { resolveAbbr: abbrResolver });
    }
    return buildVargaHouses(kundli, activeVarga, { resolveAbbr: abbrResolver });
  }, [activeVarga, kundli, abbrResolver]);

  const info = VARGA_INFO[activeVarga];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
        The Vedic system divides the zodiac into twenty progressively finer charts. Each reveals a different layer of the native — from the body (D1) to the deepest karma (D60). Click any chart to explore it.
      </p>

      {/* ─── Visual grid of all vargas ─────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {availableVargas.map((code) => {
          const v = VARGA_INFO[code];
          if (!v) return null;
          const isActive = activeVarga === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setActiveVarga(code)}
              className={cn(
                'group relative rounded-xl border p-3 text-left transition-all duration-150',
                isActive
                  ? 'border-primary/60 bg-primary/[0.08] shadow-md'
                  : 'border-border/60 bg-card hover:border-primary/40 hover:bg-primary/[0.03]'
              )}
            >
              {/* Code */}
              <div className="flex items-baseline justify-between mb-1">
                <span
                  className={cn(
                    'text-lg font-bold leading-none',
                    isActive ? 'text-primary' : 'text-foreground/80'
                  )}
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {v.code}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>

              {/* Name */}
              <p className="text-xs font-semibold text-foreground leading-tight">
                {v.name}
              </p>

              {/* Purpose */}
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 leading-tight">
                {v.purpose}
              </p>
            </button>
          );
        })}
      </div>

      {/* ─── Selected varga detail ─────────────────────────── */}
      {info && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          {/* Header strip */}
          <div className="px-6 py-5 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <h3
                  className="text-2xl font-bold leading-tight"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {info.code} · {info.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-primary/70 font-medium mt-1">
                  {info.sanskrit} · {info.purpose}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{info.division}</p>
            </div>
          </div>

          {/* Body — chart + interpretation side by side */}
          <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-6 p-6">
            {/* Chart */}
            <div className="flex justify-center md:justify-start">
              <VedicChart
                key={activeVarga}
                size={340}
                houses={activeHouses}
                defaultStyle="north"
                hideToggle
              />
            </div>

            {/* Interpretation */}
            <div className="space-y-5 max-w-xl">
              <p className="text-sm leading-relaxed text-foreground/85">
                {info.summary}
              </p>

              <div className="space-y-2 pt-2 border-t">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Use this chart for
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  {info.useCases.map((u) => (
                    <li key={u} className="flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      <span className="text-foreground/85">{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
``````

### `src\features\report\sections\GrahaSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { AttributeBadge } from '../primitives/AttributeBadge';
import { PLANET_GLYPHS, RASHI_GLYPHS, RASHI_LORDS } from '../lib/glyphs';

interface GrahaSectionProps {
  kundli: Record<string, any>;
}

const PLANET_ORDER = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter',
  'Venus', 'Saturn', 'Rahu', 'Ketu',
];

const DIGNITY_TONE: Record<string, 'positive' | 'warning' | 'negative' | 'neutral'> = {
  exalted: 'positive',
  moolatrikona: 'positive',
  own: 'positive',
  friendly: 'positive',
  neutral: 'neutral',
  enemy: 'warning',
  debilitated: 'negative',
};

function formatDegree(deg?: number, min?: number, sec?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  const s = sec ?? 0;
  return `${d}° ${String(m).padStart(2, '0')}′ ${String(s).padStart(2, '0')}″`;
}

function houseOf(name: string, houses: any[]): number | null {
  for (const h of houses ?? []) {
    if (h.planets?.includes(name)) return h.number;
  }
  return null;
}

export function GrahaSection({ kundli }: GrahaSectionProps) {
  const { t } = useTranslation();
  const planets = kundli.planets ?? {};
  const houses = kundli.houses ?? [];

  return (
    <div className="space-y-3">
      {PLANET_ORDER.map((name) => {
        const p = planets[name];
        if (!p) return null;
        const house = houseOf(name, houses);
        const rashiGlyph = RASHI_GLYPHS[p.rashiName] ?? '·';
        const rashiLord = RASHI_LORDS[p.rashiName] ?? '—';

        return (
          <article
            key={name}
            className="rounded-xl border bg-card p-5 space-y-3"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <GlyphBadge
                  glyph={PLANET_GLYPHS[name] ?? '·'}
                  planet={name as any}
                  size={36}
                  filled
                  title={name}
                />
                <div>
                  <p className="text-base font-bold leading-tight">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('graha.house', { defaultValue: 'House' })} {house ?? '—'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {p.dignity && (
                  <AttributeBadge tone={DIGNITY_TONE[p.dignity] ?? 'neutral'}>
                    {p.dignity}
                  </AttributeBadge>
                )}
                {p.isRetrograde && <AttributeBadge tone="warning">Retrograde</AttributeBadge>}
                {p.isCombust && <AttributeBadge tone="negative">Combust</AttributeBadge>}
                {p.isVargottama && <AttributeBadge tone="positive">Vargottama</AttributeBadge>}
              </div>
            </div>

            {/* Position grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-xs">
              <Field
                label={t('graha.sign', { defaultValue: 'Sign' })}
                value={p.rashiName ?? '—'}
                glyph={rashiGlyph}
                accent
              />
              <Field
                label={t('graha.position', { defaultValue: 'Position' })}
                value={formatDegree(p.degree, p.minute, p.second)}
                mono
              />
              <Field
                label={t('graha.nakshatra', { defaultValue: 'Nakshatra' })}
                value={`${p.nakshatra ?? '—'} ${p.pada ?? ''}`}
              />
              <Field
                label={t('graha.rashiLord', { defaultValue: 'Rashi Lord' })}
                value={rashiLord}
                glyph={PLANET_GLYPHS[rashiLord]}
              />
            </div>

            {/* Secondary row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
              <span>
                {t('graha.nakshatraLord', { defaultValue: 'Nakshatra Lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[p.nakshatraLord] ?? ''} {p.nakshatraLord ?? '—'}
                </strong>
              </span>
              {typeof p.speed === 'number' && (
                <span>
                  {t('graha.speed', { defaultValue: 'Speed' })}:{' '}
                  <strong className="text-foreground font-mono">
                    {p.speed.toFixed(4)}°/day
                  </strong>
                </span>
              )}
              {p.longitude !== undefined && (
                <span>
                  {t('graha.longitude', { defaultValue: 'Longitude' })}:{' '}
                  <strong className="text-foreground font-mono">
                    {p.longitude.toFixed(4)}°
                  </strong>
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  glyph,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  glyph?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`mt-0.5 flex items-center gap-1.5 ${mono ? 'font-mono' : ''}`}>
        {glyph && <span className="text-sm opacity-70">{glyph}</span>}
        <span className={`font-medium ${accent ? 'text-primary' : ''}`}>{value}</span>
      </p>
    </div>
  );
}
``````

### `src\features\report\sections\HouseMapSection.tsx`

```tsx
import { RASHI_GLYPHS, RASHI_LORDS, PLANET_GLYPHS } from '../lib/glyphs';
import { HOUSE_NAMES_EN } from '../lib/glyphs';

interface HouseMapSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const CATEGORY_COLOR: Record<string, string> = {
  kendra: 'border-l-amber-500/60',
  trikona: 'border-l-emerald-500/60',
  dusthana: 'border-l-red-500/50',
  neutral: 'border-l-border',
};

const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const HOUSE_CAT: Record<number, string> = {
  1: 'kendra', 2: 'neutral', 3: 'neutral', 4: 'kendra',
  5: 'trikona', 6: 'dusthana', 7: 'kendra', 8: 'dusthana',
  9: 'trikona', 10: 'kendra', 11: 'neutral', 12: 'dusthana',
};

export function HouseMapSection({ kundli }: HouseMapSectionProps) {
  const houses = kundli.houses ?? [];
  const sav = kundli.ashtakavarga?.sav?.houseStrengths ?? [];

  const strongest = sav.length > 0 ? sav.reduce((a: any, b: any) => (a.bindus > b.bindus ? a : b)) : null;
  const weakest = sav.length > 0 ? sav.reduce((a: any, b: any) => (a.bindus < b.bindus ? a : b)) : null;

  return (
    <div className="space-y-5">
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {houses.map((h: any) => {
          const rashi = RASHI_NAMES[(h.rashi ?? 1) - 1];
          const glyph = RASHI_GLYPHS[rashi] ?? '·';
          const lord = RASHI_LORDS[rashi] ?? '—';
          const cat = HOUSE_CAT[h.number] ?? 'neutral';

          return (
            <div
              key={h.number}
              className={`rounded-lg border border-l-2 bg-card p-3 space-y-2 ${CATEGORY_COLOR[cat]}`}
            >
              {/* Header */}
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className="text-base font-bold text-muted-foreground"
                  style={{ fontFamily: 'Crimson Pro, Georgia, serif' }}
                >
                  {ROMAN[h.number - 1]}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  {HOUSE_NAMES_EN[h.number]}
                </span>
              </div>

              {/* Rashi */}
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-base opacity-70">{glyph}</span>
                <span className="font-semibold">{rashi}</span>
              </div>

              {/* Lord */}
              <p className="text-[10px] text-muted-foreground">
                {PLANET_GLYPHS[lord]} {lord}
              </p>

              {/* Planets or empty */}
              {h.planets?.length > 0 ? (
                <div className="flex flex-wrap gap-1 pt-1 border-t border-border/40">
                  {h.planets.map((p: string) => (
                    <span
                      key={p}
                      className="text-[10px] font-medium text-primary"
                      title={p}
                    >
                      {PLANET_GLYPHS[p] ?? p.slice(0, 2)}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="pt-1 border-t border-border/40 text-[10px] text-muted-foreground/60">
                  ·
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Highlights */}
      {(strongest || weakest) && (
        <div className="rounded-xl border bg-muted/20 p-4 space-y-2 text-sm">
          {strongest && (
            <p>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">★ Strongest —</span>{' '}
              <strong>House {ROMAN[strongest.house - 1]}</strong> ({HOUSE_NAMES_EN[strongest.house]}) ·{' '}
              <span className="font-mono">{strongest.bindus}</span> bindus — {strongest.strength.toLowerCase()}.
            </p>
          )}
          {weakest && (
            <p>
              <span className="text-red-700 dark:text-red-400 font-semibold">⚠ Weakest —</span>{' '}
              <strong>House {ROMAN[weakest.house - 1]}</strong> ({HOUSE_NAMES_EN[weakest.house]}) ·{' '}
              <span className="font-mono">{weakest.bindus}</span> bindus — {weakest.strength.toLowerCase()}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
``````

### `src\features\report\sections\PanchangSection.tsx`

```tsx
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { BirthData } from '@/domain/astrology/birth-data';
import {
  calculateBirthPanchang,
  PanchangError,
  type PanchangData,
  type PanchangPeriod,
} from '@/infrastructure/astrology/panchang.adapter';

interface PanchangSectionProps {
  profile: BirthData;
}

export function PanchangSection({ profile }: PanchangSectionProps) {
  const { t } = useTranslation();

  const { panchang, error } = useMemo(() => {
    try {
      return {
        panchang: calculateBirthPanchang(profile),
        error: null as string | null,
      };
    } catch (e) {
      return {
        panchang: null as PanchangData | null,
        error:
          e instanceof PanchangError
            ? e.message
            : t('panchang.failed', { defaultValue: 'Panchang calculation failed.' }),
      };
    }
  }, [profile, t]);

  if (error || !panchang) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
        {error ?? t('panchang.failed', { defaultValue: 'Panchang calculation failed.' })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* â”€â”€â”€ Vedic calendar line â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <CalendarMetadataLine panchang={panchang} />

      {/* â”€â”€â”€ Five limbs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <LimbTile
          label={t('panchang.limbs.tithi', { defaultValue: 'Tithi' })}
          value={panchang.tithi.name}
          sub={panchang.paksha}
        />
        <LimbTile
          label={t('panchang.limbs.nakshatra', { defaultValue: 'Nakshatra' })}
          value={panchang.nakshatra.name}
          sub={
            panchang.nakshatra.pada
              ? `Pada ${panchang.nakshatra.pada} \u00b7 ${panchang.nakshatra.lord}`
              : panchang.nakshatra.lord
          }
        />
        <LimbTile
          label={t('panchang.limbs.yoga', { defaultValue: 'Yoga' })}
          value={panchang.yoga.name}
        />
        <LimbTile
          label={t('panchang.limbs.karana', { defaultValue: 'Karana' })}
          value={panchang.karana.name}
        />
        <LimbTile
          label={t('panchang.limbs.vara', { defaultValue: 'Vara' })}
          value={panchang.vara.name}
        />
      </div>

      {/* â”€â”€â”€ Sun â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {(panchang.sunrise || panchang.sunset) && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <p
              className="text-sm font-bold"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {t('panchang.sunTitle', { defaultValue: 'Rise & Set' })}
            </p>
          </div>
          <div className="grid grid-cols-2 divide-x">
            <SunCell
              label={t('panchang.sunrise', { defaultValue: 'Sunrise' })}
              value={panchang.sunrise?.toFormat('HH:mm') ?? '\u2014'}
              sub={panchang.sunrise?.toFormat('HH:mm:ss') ?? ''}
            />
            <SunCell
              label={t('panchang.sunset', { defaultValue: 'Sunset' })}
              value={panchang.sunset?.toFormat('HH:mm') ?? '\u2014'}
              sub={panchang.sunset?.toFormat('HH:mm:ss') ?? ''}
            />
          </div>
        </div>
      )}

      {/* â”€â”€â”€ Muhurtas at birth â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <PeriodTile
          tone="positive"
          label={t('panchang.brahmaMuhurta', { defaultValue: 'Brahma Muhurta' })}
          period={panchang.brahmaMuhurta}
        />
        <PeriodTile
          tone="positive"
          label={t('panchang.abhijitMuhurta', { defaultValue: 'Abhijit Muhurta' })}
          period={panchang.abhijitMuhurta}
        />
        <PeriodTile
          tone="negative"
          label={t('panchang.rahuKalam', { defaultValue: 'Rahu Kalam' })}
          period={panchang.rahuKalam}
        />
      </div>

      {/* â”€â”€â”€ Festivals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {panchang.festivals.length > 0 && (
        <div className="rounded-2xl border bg-card p-5 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            {t('panchang.festivalsTitle', { defaultValue: 'Festivals' })}
          </p>
          <ul className="space-y-1">
            {panchang.festivals.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5 shrink-0">{'\u2726'}</span>
                <span className="text-foreground/85">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ Local components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CalendarMetadataLine({ panchang }: { panchang: PanchangData }) {
  const items: string[] = [];
  if (panchang.masa) items.push(panchang.masa.name);
  items.push(panchang.paksha);
  items.push(panchang.ritu);
  items.push(panchang.ayana.name);

  return (
    <p className="text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
      {items.join(' \u00b7 ')}
    </p>
  );
}

function LimbTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 space-y-1">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
        {label}
      </p>
      <p
        className="text-base font-bold leading-tight"
        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
      >
        {value}
      </p>
      {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function SunCell({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="p-5 text-center space-y-1">
      <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">
        {label}
      </p>
      <p
        className="text-2xl font-bold font-mono"
        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
      >
        {value}
      </p>
      <p className="text-[10px] text-muted-foreground font-mono">{sub}</p>
    </div>
  );
}

function PeriodTile({
  tone,
  label,
  period,
}: {
  tone: 'positive' | 'negative';
  label: string;
  period: PanchangPeriod | null;
}) {
  const border =
    tone === 'positive' ? 'border-emerald-500/30' : 'border-red-500/30';
  const bg =
    tone === 'positive' ? 'bg-emerald-500/[0.04]' : 'bg-red-500/[0.04]';
  const accent =
    tone === 'positive'
      ? 'text-emerald-700 dark:text-emerald-400'
      : 'text-red-700 dark:text-red-400';

  return (
    <div className={`rounded-2xl border ${border} ${bg} p-4 space-y-1.5`}>
      <p
        className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${accent}`}
      >
        {label}
      </p>
      <p className="text-base font-bold font-mono">
        {period
          ? `${period.start.toFormat('HH:mm')}\u2013${period.end.toFormat('HH:mm')}`
          : '\u2014'}
      </p>
    </div>
  );
}
``````

### `src\features\report\sections\PanchangSection.tsx.bak-20260921-221638`

_(binary or unsupported file type: .bak-20260921-221638, 2 KB)_

### `src\features\report\sections\PlanetaryMapSection.tsx`

```tsx
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS, RASHI_GLYPHS, RASHI_LORDS } from '../lib/glyphs';

interface PlanetaryMapSectionProps {
  kundli: Record<string, any>;
}

const PLANET_ORDER = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

function houseOf(name: string, houses: any[]): number | null {
  for (const h of houses ?? []) {
    if (h.planets?.includes(name)) return h.number;
  }
  return null;
}

const DIGNITY_BORDER: Record<string, string> = {
  exalted: 'border-emerald-500/40',
  moolatrikona: 'border-emerald-500/40',
  own: 'border-emerald-500/40',
  friendly: 'border-emerald-500/30',
  neutral: 'border-border',
  enemy: 'border-amber-500/30',
  debilitated: 'border-red-500/40',
};

export function PlanetaryMapSection({ kundli }: PlanetaryMapSectionProps) {
  const planets = kundli.planets ?? {};
  const houses = kundli.houses ?? [];

  // Highlights
  const highlights: { label: string; value: string; tone: 'positive' | 'negative' | 'neutral' }[] = [];

  const strongest = PLANET_ORDER.find((p) => planets[p]?.dignity === 'exalted');
  if (strongest) {
    highlights.push({ label: 'Strongest', value: `${strongest} (exalted)`, tone: 'positive' });
  }
  const debil = PLANET_ORDER.find((p) => planets[p]?.dignity === 'debilitated');
  if (debil) {
    highlights.push({ label: 'Needs support', value: `${debil} (debilitated)`, tone: 'negative' });
  }
  const vargottama = PLANET_ORDER.filter((p) => planets[p]?.isVargottama);
  if (vargottama.length > 0) {
    highlights.push({ label: 'Vargottama', value: vargottama.join(', '), tone: 'positive' });
  }
  const retrogrades = PLANET_ORDER.filter((p) => planets[p]?.isRetrograde);
  if (retrogrades.length > 0) {
    highlights.push({ label: 'Retrograde', value: retrogrades.join(', '), tone: 'neutral' });
  }

  return (
    <div className="space-y-6">
      {/* 3x3 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {PLANET_ORDER.map((name) => {
          const p = planets[name];
          if (!p) return null;
          const house = houseOf(name, houses);
          const rashiName = p.rashiName ?? '—';
          const borderClass = DIGNITY_BORDER[p.dignity] ?? 'border-border';
          const rashiLord = RASHI_LORDS[rashiName] ?? '—';

          return (
            <article
              key={name}
              className={`rounded-xl border-2 ${borderClass} bg-card p-4 space-y-3`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GlyphBadge
                    glyph={PLANET_GLYPHS[name] ?? '·'}
                    planet={name as any}
                    size={28}
                    filled
                  />
                  <span className="font-bold text-sm">{name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {p.isRetrograde && (
                    <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">ʳ</span>
                  )}
                  <span className="text-[10px] text-muted-foreground font-mono">
                    H{house ?? '—'}
                  </span>
                </div>
              </div>

              {/* Sign + degree */}
              <div className="space-y-0.5">
                <p className="text-lg font-semibold leading-tight">
                  <span className="mr-1.5 text-base">{RASHI_GLYPHS[rashiName]}</span>
                  {rashiName}
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {p.degree ?? 0}° {String(p.minute ?? 0).padStart(2, '0')}′ {String(p.second ?? 0).padStart(2, '0')}″
                </p>
              </div>

              {/* Nakshatra */}
              <p className="text-xs text-muted-foreground">
                {p.nakshatra ?? '—'} {p.pada ? `· ${p.pada}` : ''}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                {p.dignity && p.dignity !== 'neutral' && (
                  <span
                    className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      p.dignity === 'exalted' || p.dignity === 'moolatrikona' || p.dignity === 'own'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        : p.dignity === 'debilitated'
                          ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                          : 'bg-muted/60 text-muted-foreground'
                    }`}
                  >
                    {p.dignity}
                  </span>
                )}
                {p.isCombust && (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-700 dark:text-orange-400">
                    combust
                  </span>
                )}
                {p.isVargottama && (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-400">
                    vargottama
                  </span>
                )}
              </div>

              {/* Rashi lord */}
              <p className="text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                {PLANET_GLYPHS[rashiLord]} {rashiLord}
              </p>
            </article>
          );
        })}
      </div>

      {/* Highlights strip */}
      {highlights.length > 0 && (
        <div className="rounded-xl border bg-muted/20 p-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {highlights.map((h, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-muted-foreground">{h.label}:</span>
              <strong
                className={
                  h.tone === 'positive'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : h.tone === 'negative'
                      ? 'text-red-700 dark:text-red-400'
                      : 'text-foreground'
                }
              >
                {h.value}
              </strong>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
``````

### `src\features\report\sections\SpecialPointsSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';

interface SpecialPointsSectionProps {
  kundli: Record<string, any>;
}

export function SpecialPointsSection({ kundli }: SpecialPointsSectionProps) {
  const { t } = useTranslation();
  const sl = kundli.specialLagnas ?? {};
  const ap = kundli.arudhaPadas?.all ?? [];

  const SPECIALS = [
    { key: 'ghatikaLagna', label: 'Ghatika Lagna (GL)', hint: 'Power & Authority' },
    { key: 'horaLagna', label: 'Hora Lagna (HL)', hint: 'Wealth' },
    { key: 'bhavaLagna', label: 'Bhava Lagna (BL)', hint: 'Physical Vitality' },
    { key: 'shreeLagna', label: 'Shree Lagna (SL)', hint: 'Fortune' },
    { key: 'induLagna', label: 'Indu Lagna (IL)', hint: 'Dhana Yoga' },
    { key: 'pranapadaLagna', label: 'Pranapada (PP)', hint: 'Time Rectification' },
  ];

  return (
    <div className="space-y-6">
      {/* Special Lagnas */}
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
          {t('special.specialLagnas', { defaultValue: 'Special Lagnas' })}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SPECIALS.map(({ key, label, hint }) => {
            const s = sl[key];
            if (!s) return null;
            return (
              <div key={key} className="p-3 rounded-lg border bg-card space-y-1">
                <p className="text-xs font-semibold text-primary">{label}</p>
                <p className="text-[10px] text-muted-foreground italic">{hint}</p>
                {s.rashiName && (
                  <p className="text-sm pt-1">
                    <strong>{s.rashiName}</strong>{' '}
                    {s.degree !== undefined && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {s.degree}° {String(s.minute ?? 0).padStart(2, '0')}′
                      </span>
                    )}
                  </p>
                )}
                {s.nakshatra && (
                  <p className="text-[11px] text-muted-foreground">
                    {s.nakshatra} {s.pada ? `(Pada ${s.pada})` : ''}
                  </p>
                )}
                {s.totalKalas !== undefined && (
                  <p className="text-[11px] text-muted-foreground">
                    {t('special.kalas', { defaultValue: 'Kalas' })}: {s.totalKalas}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Arudha Padas */}
      {ap.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
            {t('special.arudhaPadas', { defaultValue: 'Arudha Padas' })}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ap.map((p: any) => (
              <div
                key={p.code}
                className="flex items-center justify-between gap-3 p-2.5 rounded-lg border bg-card text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary w-8">{p.code}</span>
                  <span className="text-muted-foreground truncate max-w-[16rem]">
                    {p.name?.split(' - ')[0]}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold">{p.rashiName}</p>
                  <p className="text-[10px] text-muted-foreground">
                    H{p.houseNumber} • {p.lord}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
``````

### `src\features\report\sections\StrengthSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';

interface StrengthSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const CATEGORY_COLOR: Record<string, string> = {
  beneficial: 'bg-emerald-500',
  neutral: 'bg-amber-500',
  challenging: 'bg-red-500',
};

export function StrengthSection({ kundli }: StrengthSectionProps) {
  const { t } = useTranslation();
  const sav = kundli.ashtakavarga?.sav;
  if (!sav?.houseStrengths?.length) {
    return (
      <div className="p-6 text-center text-muted-foreground text-sm border border-dashed rounded-lg">
        {t('strength.noData', { defaultValue: 'Ashtakavarga data not available.' })}
      </div>
    );
  }

  const maxBindus = Math.max(...sav.houseStrengths.map((h: any) => h.bindus));

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryTile label={t('strength.total', { defaultValue: 'Total Bindus' })} value={sav.totalBindus} />
        <SummaryTile label={t('strength.average', { defaultValue: 'Average' })} value={sav.averageBindus?.toFixed(2) ?? '—'} />
        <SummaryTile label={t('strength.strongest', { defaultValue: 'Strongest' })} value={`House ${ROMAN[sav.strongestHouse - 1]}`} accent />
        <SummaryTile label={t('strength.weakest', { defaultValue: 'Weakest' })} value={`House ${ROMAN[sav.weakestHouse - 1]}`} />
      </div>

      {/* Bar chart */}
      <div className="space-y-1.5">
        {sav.houseStrengths.map((h: any) => {
          const pct = (h.bindus / maxBindus) * 100;
          return (
            <div key={h.house} className="flex items-center gap-3 text-xs">
              <div className="w-10 text-right font-mono text-muted-foreground">
                {ROMAN[h.house - 1]}
              </div>
              <div className="flex-1 h-5 bg-muted/40 rounded overflow-hidden relative">
                <div
                  className={`h-full ${CATEGORY_COLOR[h.category] ?? 'bg-primary'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="w-12 text-right font-mono font-semibold">{h.bindus}</div>
              <div className="w-24 text-[10px] uppercase tracking-wider text-muted-foreground">
                {h.strength}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryTile({ label, value, accent }: { label: string; value: any; accent?: boolean }) {
  return (
    <div className="p-3 rounded-lg border bg-card/50">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold mt-1 ${accent ? 'text-primary' : ''}`}>{value}</p>
    </div>
  );
}
``````

### `src\features\report\sections\ThreeAnchorsSection.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS, RASHI_GLYPHS, RASHI_LORDS } from '../lib/glyphs';
import {
  RASHI_INTERPRETATIONS,
  NAKSHATRA_INTERPRETATIONS,
  ANCHOR_NARRATIVES,
} from '../lib/interpretations';

interface ThreeAnchorsSectionProps {
  kundli: Record<string, any>;
}

function formatDegree(deg?: number, min?: number, sec?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  const s = sec ?? 0;
  return `${d}Â° ${String(m).padStart(2, '0')}â€² ${String(s).padStart(2, '0')}â€³`;
}

export function ThreeAnchorsSection({ kundli }: ThreeAnchorsSectionProps) {
  const { t } = useTranslation();

  const anchors = [
    {
      key: 'lagna',
      role: t('anchors.body', { defaultValue: 'The Body' }),
      title: t('anchors.lagna', { defaultValue: 'Lagna (Ascendant)' }),
      data: kundli.ascendant ?? {},
      planetKey: 'Ascendant' as const,
      narrativeKey: 'Lagna',
      borderColor: '#C9A961',
      bg: 'from-[#C9A961]/[0.05]',
    },
    {
      key: 'chandra',
      role: t('anchors.mind', { defaultValue: 'The Mind' }),
      title: t('anchors.chandra', { defaultValue: 'Chandra (Moon)' }),
      data: kundli.planets?.Moon ?? {},
      planetKey: 'Moon' as const,
      narrativeKey: 'Chandra',
      borderColor: '#B8C5D6',
      bg: 'from-[#B8C5D6]/[0.06]',
    },
    {
      key: 'surya',
      role: t('anchors.soul', { defaultValue: 'The Soul' }),
      title: t('anchors.surya', { defaultValue: 'Surya (Sun)' }),
      data: kundli.planets?.Sun ?? {},
      planetKey: 'Sun' as const,
      narrativeKey: 'Surya',
      borderColor: '#E63946',
      bg: 'from-[#E63946]/[0.05]',
    },
  ];

  return (
    <div className="space-y-5">
      {anchors.map((anchor) => {
        const p = anchor.data;
        const rashiName = p.rashiName ?? 'â€”';
        const nakshatra = p.nakshatra ?? 'â€”';
        const rashiLord = RASHI_LORDS[rashiName] ?? 'â€”';
        const narrative = ANCHOR_NARRATIVES[anchor.narrativeKey]?.[rashiName] ?? '';
        const rashiInterp = RASHI_INTERPRETATIONS[rashiName] ?? '';
        const nakshatraInterp = NAKSHATRA_INTERPRETATIONS[nakshatra] ?? '';

        return (
          <article
            key={anchor.key}
            className={`rounded-2xl border bg-gradient-to-br ${anchor.bg} to-transparent p-6 md:p-8 space-y-5`}
            style={{ borderColor: `${anchor.borderColor}40` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.3em] font-semibold"
                  style={{ color: anchor.borderColor }}
                >
                  â—‡ {anchor.role}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{anchor.title}</p>
              </div>
              <GlyphBadge
                glyph={RASHI_GLYPHS[rashiName] ?? 'Â·'}
                planet={anchor.planetKey}
                size={44}
              />
            </div>

            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p
                className="font-bold leading-none"
                style={{
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  fontSize: '2rem',
                }}
              >
                {rashiName}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                {formatDegree(p.degree, p.minute, p.second)}
              </p>
              <p className="text-sm text-muted-foreground">
                Â· {nakshatra} {p.pada ?? ''}
              </p>
            </div>

            {narrative && (
              <p className="text-base md:text-[17px] leading-[1.75] text-foreground/90">
                {narrative}
              </p>
            )}

            {(rashiInterp || nakshatraInterp) && (
              <div className="space-y-2 pt-3 border-t" style={{ borderColor: `${anchor.borderColor}20` }}>
                {rashiInterp && (
                  <p className="text-sm leading-relaxed text-foreground/80">
                    <span className="font-semibold" style={{ color: anchor.borderColor }}>
                      {rashiName}:{' '}
                    </span>
                    {rashiInterp}
                  </p>
                )}
                {nakshatraInterp && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/70">
                      {nakshatra}:{' '}
                    </span>
                    {nakshatraInterp}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-3 border-t text-xs text-muted-foreground" style={{ borderColor: `${anchor.borderColor}20` }}>
              <span>
                {t('anchors.rashiLord', { defaultValue: 'Rashi lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[rashiLord]} {rashiLord}
                </strong>
              </span>
              <span>
                {t('anchors.nakshatraLord', { defaultValue: 'Nakshatra lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[p.nakshatraLord] ?? ''} {p.nakshatraLord ?? 'â€”'}
                </strong>
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
``````

### `src\features\report\sections\UnfoldingSection.tsx`

```tsx
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS } from '../lib/glyphs';

interface UnfoldingSectionProps {
  kundli: Record<string, any>;
}

function fmtDateShort(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function UnfoldingSection({ kundli }: UnfoldingSectionProps) {
  const dasha = kundli.dasha ?? {};
  const mahadashas = dasha.mahadashas ?? [];
  const current = dasha.currentMahadasha;
  const antar = dasha.currentAntar;
  const pratyantar = dasha.currentPratyantar;

  const lifeStart = mahadashas[0]?.startTime ? new Date(mahadashas[0].startTime).getTime() : Date.now();
  const lifeEnd = mahadashas[mahadashas.length - 1]?.endTime
    ? new Date(mahadashas[mahadashas.length - 1].endTime).getTime()
    : Date.now() + 1000;
  const lifeSpan = Math.max(1, lifeEnd - lifeStart);
  const startYear = new Date(lifeStart).getFullYear();
  const endYear = new Date(lifeEnd).getFullYear();

  return (
    <div className="space-y-8">
      {/* Current period hero */}
      {current && (
        <article className="rounded-2xl border-2 border-primary/30 bg-gradient-to-b from-primary/[0.05] to-transparent p-6 md:p-8 space-y-5 text-center">
          <div className="flex justify-center">
            <GlyphBadge
              glyph={PLANET_GLYPHS[current.planet] ?? '·'}
              planet={current.planet}
              size={56}
              filled
            />
          </div>
          <div>
            <p
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: '2rem',
              }}
            >
              {current.planet} {('Mahadasha')}
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {fmtDateShort(current.startTime)} → {fmtDateShort(current.endTime)}
            </p>
          </div>

          {typeof current.progressPercent === 'number' && (
            <div className="max-w-md mx-auto space-y-1.5">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${current.progressPercent}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{current.progressPercent.toFixed(1)}%</strong> complete
              </p>
            </div>
          )}

          <p className="text-base leading-relaxed max-w-xl mx-auto text-foreground/85">
            {current.planet} rules the planet of action, courage, and drive. This chapter is where you forge your will.
          </p>

          {(antar || pratyantar) && (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-4 border-t border-primary/20 text-sm">
              {antar && (
                <span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Antardasha
                  </span>
                  <strong>{PLANET_GLYPHS[antar.planet]} {antar.planet}</strong>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">
                    until {fmtDateShort(antar.endTime)}
                  </span>
                </span>
              )}
              {pratyantar && (
                <span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Pratyantar
                  </span>
                  <strong>{PLANET_GLYPHS[pratyantar.planet]} {pratyantar.planet}</strong>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">
                    until {fmtDateShort(pratyantar.endTime)}
                  </span>
                </span>
              )}
            </div>
          )}
        </article>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
          The Whole Life, at a Glance
        </p>

        {/* Year axis */}
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground px-1">
          <span>{startYear}</span>
          <span className="text-primary font-semibold">NOW</span>
          <span>{endYear}</span>
        </div>

        {/* Bars */}
        <div className="space-y-1.5">
          {mahadashas.map((md: any) => {
            const s = new Date(md.startTime).getTime();
            const e = new Date(md.endTime).getTime();
            const leftPct = ((s - lifeStart) / lifeSpan) * 100;
            const widthPct = ((e - s) / lifeSpan) * 100;
            const isCurrent = current && md.planet === current.planet && md.startTime === current.startTime;

            return (
              <div key={md.planet + md.startTime} className="flex items-center gap-3 text-xs">
                <div className="w-20 shrink-0 flex items-center gap-1.5">
                  <span className="text-base">{PLANET_GLYPHS[md.planet]}</span>
                  <span className="font-medium">{md.planet}</span>
                </div>
                <div className="flex-1 h-6 bg-muted/30 rounded relative overflow-hidden">
                  <div
                    className={`absolute h-full rounded flex items-center justify-center ${
                      isCurrent ? 'bg-primary' : 'bg-foreground/20'
                    }`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  >
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-primary-foreground tracking-wider">
                        ▶ NOW
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-24 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                  {new Date(md.startTime).getFullYear()}–{new Date(md.endTime).getFullYear()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
``````

### `src\features\report\sections\VitalSignsSection.tsx`

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RASHI_GLYPHS } from '../lib/glyphs';

interface VitalSignsSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const HOUSE_NAMES: Record<number, string> = {
  1: 'Self', 2: 'Wealth', 3: 'Siblings', 4: 'Home',
  5: 'Children', 6: 'Enemies', 7: 'Marriage', 8: 'Transformation',
  9: 'Fortune', 10: 'Career', 11: 'Gains', 12: 'Loss',
};

const CATEGORY_COLOR: Record<string, string> = {
  beneficial: 'bg-emerald-500',
  neutral: 'bg-amber-500',
  challenging: 'bg-red-500',
};

const SPECIAL_LAGNAS = [
  { key: 'ghatikaLagna', code: 'GL', name: 'Ghatika Lagna', purpose: 'Power & Authority' },
  { key: 'horaLagna', code: 'HL', name: 'Hora Lagna', purpose: 'Wealth' },
  { key: 'bhavaLagna', code: 'BL', name: 'Bhava Lagna', purpose: 'Vitality' },
  { key: 'shreeLagna', code: 'SL', name: 'Shree Lagna', purpose: 'Fortune' },
  { key: 'induLagna', code: 'IL', name: 'Indu Lagna', purpose: 'Dhana Yoga' },
  { key: 'pranapadaLagna', code: 'PP', name: 'Pranapada', purpose: 'Rectification' },
];

const PRIMARY_ARUDHAS = ['A1', 'A7', 'A10', 'A12'];

export function VitalSignsSection({ kundli }: VitalSignsSectionProps) {
  const { t } = useTranslation();
  const [showAllArudhas, setShowAllArudhas] = useState(false);

  const sav = kundli.ashtakavarga?.sav;
  const houseStrengths = sav?.houseStrengths ?? [];
  const sl = kundli.specialLagnas ?? {};
  const ap = kundli.arudhaPadas?.all ?? [];

  const strongest = houseStrengths.find((h: any) => h.house === sav?.strongestHouse);
  const weakest = houseStrengths.find((h: any) => h.house === sav?.weakestHouse);
  const maxBindus = houseStrengths.length > 0
    ? Math.max(...houseStrengths.map((h: any) => h.bindus))
    : 40;

  const arudhasToShow = showAllArudhas
    ? ap
    : ap.filter((p: any) => PRIMARY_ARUDHAS.includes(p.code));

  return (
    <div className="space-y-8">
      {/* ══════════════════════════════════════════════════════ */}
      {/*  STRENGTH BY HOUSE                                    */}
      {/* ══════════════════════════════════════════════════════ */}
      {houseStrengths.length > 0 && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          {/* Header strip */}
          <div className="px-6 py-5 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <h3
                  className="text-lg font-bold leading-tight"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {t('vital.strengthTitle', { defaultValue: 'Strength by House' })}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">
                  {t('vital.strengthHint', {
                    defaultValue:
                      'Ashtakavarga measures how much benefic support each house receives from the planets. Higher bindus mean stronger flow in that domain.',
                  })}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t('vital.total', { defaultValue: 'Total' })}
                </p>
                <p
                  className="text-2xl font-bold text-primary"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {sav.totalBindus}
                </p>
              </div>
            </div>
          </div>

          {/* Extremes — Strongest / Weakest */}
          {(strongest || weakest) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-b">
              {strongest && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.05] p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 font-semibold">
                      ★ {t('vital.strongest', { defaultValue: 'Strongest' })}
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                      {strongest.bindus} bindus
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-lg font-bold text-emerald-700 dark:text-emerald-400"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                    >
                      House {ROMAN[strongest.house - 1]}
                    </span>
                    <span className="text-sm text-foreground/70">
                      {HOUSE_NAMES[strongest.house]}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {t('vital.strongestDesc', {
                      defaultValue:
                        "Your chart's greatest asset. This house receives exceptional support — expect good fortune and ease in this domain of life.",
                    })}
                  </p>
                </div>
              )}

              {weakest && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/[0.05] p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-red-700 dark:text-red-400 font-semibold">
                      ⚠ {t('vital.weakest', { defaultValue: 'Weakest' })}
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-400 font-mono">
                      {weakest.bindus} bindus
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-lg font-bold text-red-700 dark:text-red-400"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                    >
                      House {ROMAN[weakest.house - 1]}
                    </span>
                    <span className="text-sm text-foreground/70">
                      {HOUSE_NAMES[weakest.house]}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {t('vital.weakestDesc', {
                      defaultValue:
                        'This area needs conscious effort. Not a weakness of fate, but a place to work with awareness and patience.',
                    })}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* All 12 houses bar chart */}
          <div className="p-6 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
              {t('vital.allHouses', { defaultValue: 'All Twelve Houses' })}
            </p>

            <div className="space-y-1.5">
              {houseStrengths.map((h: any) => {
                const pct = (h.bindus / maxBindus) * 100;
                const isStrongest = h.house === sav.strongestHouse;
                const isWeakest = h.house === sav.weakestHouse;

                return (
                  <div key={h.house} className="flex items-center gap-3 text-xs">
                    {/* Roman numeral */}
                    <span className="w-9 text-right font-mono text-[11px] text-muted-foreground shrink-0">
                      {ROMAN[h.house - 1]}
                    </span>

                    {/* House name */}
                    <span className="w-24 text-[11px] text-muted-foreground shrink-0 truncate">
                      {HOUSE_NAMES[h.house]}
                    </span>

                    {/* Bar */}
                    <div className="flex-1 h-5 bg-muted/40 rounded overflow-hidden relative">
                      <div
                        className={`h-full ${CATEGORY_COLOR[h.category] ?? 'bg-primary'} transition-all rounded`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {/* Bindus */}
                    <span
                      className={`w-8 text-right font-mono font-semibold shrink-0 ${
                        isStrongest
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isWeakest
                            ? 'text-red-600 dark:text-red-400'
                            : ''
                      }`}
                    >
                      {h.bindus}
                    </span>

                    {/* Category */}
                    <span className="w-20 text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
                      {h.strength}
                      {isStrongest && ' ★'}
                      {isWeakest && ' ⚠'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer stats */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 mt-3 border-t text-xs text-muted-foreground">
              <span>
                {t('vital.average', { defaultValue: 'Average' })}:{' '}
                <strong className="text-foreground">{sav.averageBindus?.toFixed(2)}</strong>
              </span>
              <span>
                {t('vital.total', { defaultValue: 'Total' })}:{' '}
                <strong className="text-foreground">{sav.totalBindus}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SPECIAL LAGNAS + ARUDHA PADAS                       */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ─── Special Lagnas ──────────────────────────────── */}
        {Object.keys(sl).length > 0 && (
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
              <h3
                className="text-base font-bold leading-tight"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {t('vital.specialLagnas', { defaultValue: 'Special Lagnas' })}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                {t('vital.specialLagnasHint', {
                  defaultValue:
                    'Six subtle ascendants reveal where specific areas of life shine.',
                })}
              </p>
            </div>

            <div className="p-4 space-y-2">
              {SPECIAL_LAGNAS.map(({ key, code, name, purpose }) => {
                const s = sl[key];
                if (!s) return null;

                return (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-background/50 hover:bg-muted/40 transition-colors"
                  >
                    {/* Code */}
                    <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 rounded px-2 py-1 shrink-0 w-9 text-center">
                      {code}
                    </span>

                    {/* Name + purpose */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight truncate">
                        {name}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {purpose}
                      </p>
                    </div>

                    {/* Rashi */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="text-xl leading-none"
                        style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                      >
                        {s.rashiName ? RASHI_GLYPHS[s.rashiName] : '·'}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground leading-tight">
                          {s.rashiName ?? '—'}
                        </p>
                        {s.degree !== undefined && (
                          <p className="text-[10px] font-mono text-muted-foreground">
                            {s.degree}° {String(s.minute ?? 0).padStart(2, '0')}′
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Arudha Padas ────────────────────────────────── */}
        {ap.length > 0 && (
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
              <h3
                className="text-base font-bold leading-tight"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {t('vital.arudhas', { defaultValue: 'Arudha Padas' })}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                {t('vital.arudhasHint', {
                  defaultValue: 'How the world sees you — the outer image of each house.',
                })}
              </p>
            </div>

            <div className="p-4 space-y-2">
              {arudhasToShow.map((p: any) => (
                <div
                  key={p.code}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-background/50 hover:bg-muted/40 transition-colors"
                >
                  {/* Code */}
                  <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 rounded px-2 py-1 shrink-0 w-10 text-center">
                    {p.code}
                  </span>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight truncate">
                      {p.name?.split(' - ')[0] ?? p.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      House {p.houseNumber}
                    </p>
                  </div>

                  {/* Rashi */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {RASHI_GLYPHS[p.rashiName] ?? '·'}
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {p.rashiName}
                    </p>
                  </div>
                </div>
              ))}

              {/* Expand button */}
              {ap.length > PRIMARY_ARUDHAS.length && (
                <button
                  type="button"
                  onClick={() => setShowAllArudhas((v) => !v)}
                  className="w-full text-center text-[11px] uppercase tracking-wider text-primary/70 hover:text-primary py-2 transition-colors no-print"
                >
                  {showAllArudhas
                    ? t('vital.showLess', { defaultValue: '▴ Show less' })
                    : t('vital.showAll', { defaultValue: `▾ Show all ${ap.length} arudha padas` })}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
``````

### `src\features\report\tokens.ts`

```typescript
/**
 * Report design tokens.
 * Centralized so the whole report can be re-themed from one place.
 */

export const REPORT_TOKENS = {
  // Layout
  pageMaxWidth: '900px',
  sectionPadding: 'py-10',
  sectionGap: 'space-y-8',

  // Card
  cardPadding: 'p-6',
  cardRadius: 'rounded-xl',
  cardBg: 'bg-card',
  cardBorder: 'border',
  cardShadow: 'shadow-sm',

  // Colors
  accentGold: '#C9A961',
  accentSaffron: 'hsl(var(--primary))',
  inkMuted: 'hsl(var(--muted-foreground))',
  inkPrimary: 'hsl(var(--foreground))',
  paperCream: 'hsl(var(--card))',

  // Typography
  h1: 'text-3xl md:text-4xl font-bold tracking-tight',
  h2: 'text-2xl font-bold tracking-tight',
  h3: 'text-sm font-semibold uppercase tracking-wider',
  body: 'text-sm leading-relaxed',
  dataLabel: 'text-[10px] uppercase tracking-wider text-muted-foreground',
  dataValue: 'text-sm font-semibold',
  mono: 'font-mono text-xs',

  // Planet colors (traditional)
  planetColors: {
    Sun: '#E63946',
    Moon: '#B8C5D6',
    Mars: '#D62828',
    Mercury: '#2A9D8F',
    Jupiter: '#D4A017',
    Venus: '#E8A87C',
    Saturn: '#264653',
    Rahu: '#6A4C93',
    Ketu: '#8D99AE',
    Ascendant: '#C9A961',
  } as const,

  // House categories
  houseCategories: {
    1: 'kendra',
    2: 'neutral',
    3: 'neutral',
    4: 'kendra',
    5: 'trikona',
    6: 'dusthana',
    7: 'kendra',
    8: 'dusthana',
    9: 'trikona',
    10: 'kendra',
    11: 'neutral',
    12: 'dusthana',
  } as const,
} as const;

export type ReportTokens = typeof REPORT_TOKENS;
``````

### `src\i18n\index.ts`

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import hi from './locales/hi.json';
import ne from './locales/ne.json';

export const SUPPORTED_LANGS = ['en', 'hi', 'ne'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const LANG_META: Record<SupportedLang, { label: string; native: string }> = {
  en: { label: 'English', native: 'English' },
  hi: { label: 'Hindi', native: 'हिन्दी' },
  ne: { label: 'Nepali', native: 'नेपाली' },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ne: { translation: ne },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'kundaliyatra-lang',
    },
  });

export default i18n;
``````

### `src\i18n\locales\en.json`

```json
{
    "app":  {
                "name":  "KundaliYatra",
                "tagline":  "Your Vedic birth chart, made clear.",
                "print":  "Print"
            },
    "common":  {
                   "change":  "Change",
                   "reset":  "Reset",
                   "loading":  "Loading...",
                   "searching":  "Searching...",
                   "noResults":  "No cities match \"{{query}}\".",
                   "searchFailed":  "Search failed. Please try again."
               },
    "birth":  {
                  "title":  "Birth Details",
                  "subtitle":  "The time is interpreted in the birth city\u0027s timezone.",
                  "name":  "Name",
                  "namePlaceholder":  "e.g. Bikash Moktan",
                  "date":  "Birth Date",
                  "time":  "Birth Time",
                  "city":  "Birth City",
                  "cityPlaceholder":  "Type a city name...",
                  "submit":  "Calculate Kundli",
                  "interpretedAs":  "Interpreted as",
                  "errors":  {
                                 "nameRequired":  "Please enter a name.",
                                 "nameTooLong":  "Name is too long (max 100 characters).",
                                 "dateRequired":  "Please enter a birth date.",
                                 "dateTooEarly":  "Birth year must be 1900 or later.",
                                 "dateFuture":  "Birth date cannot be in the future.",
                                 "timeRequired":  "Please enter a birth time.",
                                 "placeRequired":  "Please select a birth city.",
                                 "invalidDateTime":  "That date/time is not valid in {{timezone}}."
                             },
                  "calendarBS":  "B.S.",
                  "calendarAD":  "A.D.",
                  "approximateAD":  "â‰ˆ {{ad}} (A.D.)",
                  "approximateBS":  "â‰ˆ B.S. {{bs}}"
              },
    "dashboard":  {
                      "title":  "KundaliYatra Dashboard",
                      "changeDetails":  "Change Birth Details",
                      "ascendant":  "Ascendant (Lagna)",
                      "sign":  "Sign",
                      "lord":  "Lord",
                      "degree":  "Degree",
                      "nakshatra":  "Nakshatra",
                      "planets":  "Planetary Positions",
                      "failed":  "Chart calculation failed."
                  },
    "settings":  {
                     "language":  "Language",
                     "palette":  "Color palette",
                     "light":  "Light",
                     "dark":  "Dark",
                     "system":  "System"
                 },
    "chart":  {
                  "title":  "Birth Chart (D1)",
                  "styleNorth":  "North Indian",
                  "styleSouth":  "South Indian",
                  "planetAbbr":  {
                                     "ascendant":  "Asc",
                                     "sun":  "Su",
                                     "moon":  "Mo",
                                     "mars":  "Ma",
                                     "mercury":  "Me",
                                     "jupiter":  "Ju",
                                     "venus":  "Ve",
                                     "saturn":  "Sa",
                                     "rahu":  "Ra",
                                     "ketu":  "Ke"
                                 }
              },
    "sections":  {
                     "dashaHint":  "Your life unfolds in planetary chapters. Here is where you are now, and the shape of the path ahead.",
                     "chartHint":  "Your D1 (Rashi) chart shows the body. Your D9 (Navamsha) chart reveals the soul\u0027s deeper path.",
                     "dasha":  "Vimshottari Dasha",
                     "chart":  "The Birth Chart",
                     "bhava":  "Where Life Happens",
                     "panchangHint":  "The five limbs of the Vedic calendar at the exact moment you were born.",
                     "aspects":  "Planetary Conversations",
                     "strength":  "Where You Stand Firm",
                     "panchang":  "Panchangam at Birth",
                     "coreIdentity":  "Core Identity",
                     "grahaHint":  "Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu â€” the celestial council of your chart.",
                     "advancedHint":  "For the serious student of Jyotish â€” KP, Chalit, and all divisional charts.",
                     "bhavaHint":  "Each house governs a domain of life. Together, they map the terrain of your existence.",
                     "advanced":  "Advanced Study",
                     "special":  "The Mysteries",
                     "aspectsHint":  "Planets look at each other across the chart. These glances shape the story of your life.",
                     "graha":  "Planetary Council",
                     "coreIdentityHint":  "Your Lagna is the mask you wear to the world. Your Chandra is the mind within. Your Surya is the soul.",
                     "strengthHint":  "Not all houses are equal. Some carry the weight of your fortune. Others ask for patience and care.",
                     "specialHint":  "Beyond the base chart, special lagnas and arudha padas reveal hidden dimensions of your life."
                 },
    "coreIdentity":  {
                         "chandraSub":  "The mind and inner world",
                         "nakshatra":  "Nakshatra",
                         "lagnaSub":  "The mask you wear to the world",
                         "surya":  "Surya (Sun)",
                         "lagna":  "Lagna (Ascendant)",
                         "position":  "Position",
                         "chandra":  "Chandra (Moon)",
                         "rashiLord":  "Rashi Lord",
                         "nakshatraLord":  "Nakshatra Lord",
                         "suryaSub":  "The soul and father principle"
                     },
    "report":  {
                   "reading":  "A Vedic Reading",
                   "yourLagna":  "Your Lagna",
                   "yourChapter":  "Your Current Chapter",
                   "mahadasha":  "Mahadasha",
                   "antar":  "Antardasha",
                   "pratyantar":  "Pratyantar",
                   "complete":  "through",
                   "lord":  "Lord",
                   "change":  "Change Birth Details"
               },
    "anchors":  {
                    "body":  "The Body",
                    "mind":  "The Mind",
                    "soul":  "The Soul",
                    "lagna":  "Lagna (Ascendant)",
                    "chandra":  "Chandra (Moon)",
                    "surya":  "Surya (Sun)",
                    "rashiLord":  "Rashi lord",
                    "nakshatraLord":  "Nakshatra lord"
                },
    "cover":  {
                  "birthNakshatra":  "Birth Nakshatra",
                  "currentPeriod":  "Current Period",
                  "dasha":  "Current Dasha",
                  "surya":  "Surya",
                  "chandra":  "Chandra",
                  "lagna":  "Lagna",
                  "strongestHouse":  "Strongest House",
                  "reading":  "A Vedic Reading",
                  "change":  "Change Birth Details"
              },
    "hero":  {
                 "yourRashi":  "Your Rashi",
                 "reading":  "A Vedic Reading",
                 "panchangTitle":  "Panchangam at Birth",
                 "tithi":  "Tithi",
                 "chandraRashi":  "Chandra Rashi",
                 "lagnaRashi":  "Lagna",
                 "change":  "Change Birth Details",
                 "chandraSub":  "Moon Sign Â· Mind",
                 "lagnaSub":  "Ascendant Â· Body",
                 "suryaRashi":  "Surya Rashi",
                 "dasha":  "Current Mahadasha",
                 "vara":  "Vara",
                 "suryaSub":  "Sun Sign Â· Soul",
                 "nakshatra":  "Birth Nakshatra"
             },
    "nav":  {
                "chart":  "Chart",
                "panchang":  "Panchang"
            },
    "panchang":  {
                     "title":  "Daily Panchang",
                     "eyebrow":  "Vedic Calendar",
                     "failed":  "Panchang calculation failed.",
                     "resetToProfile":  "Reset to profile location",
                     "now":  "Now",
                     "sunEyebrow":  "The Sun",
                     "sunTitle":  "Sunrise \u0026 Sunset",
                     "sunrise":  "Sunrise",
                     "sunset":  "Sunset",
                     "limbsEyebrow":  "The Five Limbs",
                     "limbsTitle":  "Panchangam",
                     "limbsHint":  "Tithi, Nakshatra, Yoga, Karana, and Vara â€” the five limbs of the Vedic day.",
                     "limbs":  {
                                   "tithi":  "Tithi",
                                   "nakshatra":  "Nakshatra",
                                   "yoga":  "Yoga",
                                   "karana":  "Karana",
                                   "vara":  "Vara"
                               },
                     "muhurtaEyebrow":  "Muhurta",
                     "muhurtaTitle":  "Sacred Time Windows",
                     "muhurtaHint":  "Brahma Muhurta and Abhijit for auspicious beginnings; Rahu Kalam to avoid.",
                     "brahmaMuhurta":  "Brahma Muhurta",
                     "abhijitMuhurta":  "Abhijit Muhurta",
                     "rahuKalam":  "Rahu Kalam",
                     "brahmaHint":  "Auspicious Â· pre-dawn",
                     "abhijitHint":  "Auspicious Â· midday",
                     "rahuHint":  "Avoid Â· inauspicious",
                     "choghadiyaEyebrow":  "Choghadiya",
                     "choghadiyaTitle":  "Day \u0026 Night Windows",
                     "choghadiyaHint":  "Eight equal segments of day and night. Green is auspicious, red is to be avoided.",
                     "dayChoghadiya":  "Day Choghadiya",
                     "nightChoghadiya":  "Night Choghadiya",
                     "noChoghadiya":  "Choghadiya data unavailable.",
                     "horaEyebrow":  "Hora",
                     "horaTitleSection":  "Planetary Hours",
                     "horaTitle":  "Hora (Day)",
                     "horaHint":  "Twelve planetary hours from sunrise to sunset.",
                     "noHora":  "Hora data unavailable."
                 }
}
``````

### `src\i18n\locales\hi.json`

```json
{
    "app":  {
                "name":  "à¤•à¥à¤‚à¤¡à¤²à¥€à¤¯à¤¾à¤¤à¥à¤°à¤¾",
                "tagline":  "à¤†à¤ªà¤•à¥€ à¤µà¥ˆà¤¦à¤¿à¤• à¤œà¤¨à¥à¤® à¤•à¥à¤‚à¤¡à¤²à¥€, à¤¸à¤°à¤² à¤°à¥‚à¤ª à¤®à¥‡à¤‚à¥¤",
                "print":  "à¤ªà¥à¤°à¤¿à¤‚à¤Ÿ à¤•à¤°à¥‡à¤‚"
            },
    "common":  {
                   "change":  "à¤¬à¤¦à¤²à¥‡à¤‚",
                   "reset":  "à¤°à¥€à¤¸à¥‡à¤Ÿ",
                   "loading":  "à¤²à¥‹à¤¡ à¤¹à¥‹ à¤°à¤¹à¤¾ à¤¹à¥ˆ...",
                   "searching":  "à¤–à¥‹à¤œ à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚...",
                   "noResults":  "\"{{query}}\" à¤¸à¥‡ à¤•à¥‹à¤ˆ à¤¶à¤¹à¤° à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤²à¤¾à¥¤",
                   "searchFailed":  "à¤–à¥‹à¤œ à¤µà¤¿à¤«à¤²à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥à¤¨à¤ƒ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤"
               },
    "birth":  {
                  "title":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£",
                  "subtitle":  "à¤¸à¤®à¤¯ à¤œà¤¨à¥à¤® à¤¶à¤¹à¤° à¤•à¥‡ à¤¸à¤®à¤¯ à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤®à¥‡à¤‚ à¤®à¤¾à¤¨à¤¾ à¤œà¤¾à¤à¤—à¤¾à¥¤",
                  "name":  "à¤¨à¤¾à¤®",
                  "namePlaceholder":  "à¤œà¥ˆà¤¸à¥‡ à¤¬à¤¿à¤•à¤¾à¤¶ à¤®à¥‹à¤•à¥à¤¤à¤¾à¤¨",
                  "date":  "à¤œà¤¨à¥à¤® à¤¤à¤¿à¤¥à¤¿",
                  "time":  "à¤œà¤¨à¥à¤® à¤¸à¤®à¤¯",
                  "city":  "à¤œà¤¨à¥à¤® à¤¶à¤¹à¤°",
                  "cityPlaceholder":  "à¤¶à¤¹à¤° à¤•à¤¾ à¤¨à¤¾à¤® à¤²à¤¿à¤–à¥‡à¤‚...",
                  "submit":  "à¤•à¥à¤‚à¤¡à¤²à¥€ à¤¬à¤¨à¤¾à¤à¤",
                  "interpretedAs":  "à¤‡à¤¸ à¤°à¥‚à¤ª à¤®à¥‡à¤‚ à¤µà¥à¤¯à¤¾à¤–à¥à¤¯à¤¾",
                  "errors":  {
                                 "nameRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¨à¤¾à¤® à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤",
                                 "nameTooLong":  "à¤¨à¤¾à¤® à¤¬à¤¹à¥à¤¤ à¤²à¤‚à¤¬à¤¾ à¤¹à¥ˆ (à¤…à¤§à¤¿à¤•à¤¤à¤® 100 à¤…à¤•à¥à¤·à¤°)à¥¤",
                                 "dateRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤¤à¤¿à¤¥à¤¿ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤",
                                 "dateTooEarly":  "à¤œà¤¨à¥à¤® à¤µà¤°à¥à¤· 1900 à¤¯à¤¾ à¤‰à¤¸à¤•à¥‡ à¤¬à¤¾à¤¦ à¤¹à¥‹à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤à¥¤",
                                 "dateFuture":  "à¤œà¤¨à¥à¤® à¤¤à¤¿à¤¥à¤¿ à¤­à¤µà¤¿à¤·à¥à¤¯ à¤®à¥‡à¤‚ à¤¨à¤¹à¥€à¤‚ à¤¹à¥‹ à¤¸à¤•à¤¤à¥€à¥¤",
                                 "timeRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤¸à¤®à¤¯ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤",
                                 "placeRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤¶à¤¹à¤° à¤šà¥à¤¨à¥‡à¤‚à¥¤",
                                 "invalidDateTime":  "à¤µà¤¹ à¤¤à¤¿à¤¥à¤¿/à¤¸à¤®à¤¯ {{timezone}} à¤®à¥‡à¤‚ à¤®à¤¾à¤¨à¥à¤¯ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤"
                             },
                  "calendarBS":  "à¤µà¤¿.à¤¸à¤‚.",
                  "calendarAD":  "à¤ˆ.à¤¸à¤‚.",
                  "approximateAD":  "â‰ˆ {{ad}} (à¤ˆ.à¤¸à¤‚.)",
                  "approximateBS":  "â‰ˆ à¤µà¤¿.à¤¸à¤‚. {{bs}}"
              },
    "dashboard":  {
                      "title":  "à¤•à¥à¤‚à¤¡à¤²à¥€à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡",
                      "changeDetails":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£ à¤¬à¤¦à¤²à¥‡à¤‚",
                      "ascendant":  "à¤²à¤—à¥à¤¨",
                      "sign":  "à¤°à¤¾à¤¶à¤¿",
                      "lord":  "à¤¸à¥à¤µà¤¾à¤®à¥€",
                      "degree":  "à¤…à¤‚à¤¶",
                      "nakshatra":  "à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                      "planets":  "à¤—à¥à¤°à¤¹ à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¯à¤¾à¤",
                      "failed":  "à¤•à¥à¤‚à¤¡à¤²à¥€ à¤—à¤£à¤¨à¤¾ à¤µà¤¿à¤«à¤²à¥¤"
                  },
    "settings":  {
                     "language":  "à¤­à¤¾à¤·à¤¾",
                     "palette":  "à¤°à¤‚à¤— à¤ªà¥ˆà¤²à¥‡à¤Ÿ",
                     "light":  "à¤¹à¤²à¥à¤•à¤¾",
                     "dark":  "à¤—à¤¹à¤°à¤¾",
                     "system":  "à¤¸à¤¿à¤¸à¥à¤Ÿà¤®"
                 },
    "chart":  {
                  "title":  "à¤œà¤¨à¥à¤® à¤•à¥à¤‚à¤¡à¤²à¥€ (D1)",
                  "styleNorth":  "à¤‰à¤¤à¥à¤¤à¤° à¤­à¤¾à¤°à¤¤à¥€à¤¯",
                  "styleSouth":  "à¤¦à¤•à¥à¤·à¤¿à¤£ à¤­à¤¾à¤°à¤¤à¥€à¤¯",
                  "planetAbbr":  {
                                     "ascendant":  "à¤²",
                                     "sun":  "à¤¸à¥‚",
                                     "moon":  "à¤šà¤‚",
                                     "mars":  "à¤®à¤‚",
                                     "mercury":  "à¤¬à¥",
                                     "jupiter":  "à¤—à¥",
                                     "venus":  "à¤¶à¥",
                                     "saturn":  "à¤¶",
                                     "rahu":  "à¤°à¤¾",
                                     "ketu":  "à¤•à¥‡"
                                 }
              },
    "cover":  {
                  "birthNakshatra":  "à¤œà¤¨à¥à¤® à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                  "currentPeriod":  "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤…à¤µà¤§à¤¿",
                  "dasha":  "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤¦à¤¶à¤¾",
                  "surya":  "à¤¸à¥‚à¤°à¥à¤¯",
                  "chandra":  "à¤šà¤‚à¤¦à¥à¤°",
                  "lagna":  "à¤²à¤—à¥à¤¨",
                  "strongestHouse":  "à¤¸à¤¬à¤¸à¥‡ à¤®à¤œà¤¬à¥‚à¤¤ à¤­à¤¾à¤µ",
                  "reading":  "à¤µà¥ˆà¤¦à¤¿à¤• à¤œà¤¨à¥à¤® à¤•à¥à¤‚à¤¡à¤²à¥€",
                  "change":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£ à¤¬à¤¦à¤²à¥‡à¤‚"
              },
    "hero":  {
                 "yourRashi":  "Your Rashi",
                 "reading":  "A Vedic Reading",
                 "panchangTitle":  "Panchangam at Birth",
                 "tithi":  "Tithi",
                 "chandraRashi":  "Chandra Rashi",
                 "lagnaRashi":  "Lagna",
                 "change":  "Change Birth Details",
                 "chandraSub":  "Moon Sign Â· Mind",
                 "lagnaSub":  "Ascendant Â· Body",
                 "suryaRashi":  "Surya Rashi",
                 "dasha":  "Current Mahadasha",
                 "vara":  "Vara",
                 "suryaSub":  "Sun Sign Â· Soul",
                 "nakshatra":  "Birth Nakshatra"
             },
    "nav":  {
                "chart":  "à¤•à¥à¤‚à¤¡à¤²à¥€",
                "panchang":  "à¤ªà¤‚à¤šà¤¾à¤‚à¤—"
            },
    "panchang":  {
                     "title":  "à¤¦à¥ˆà¤¨à¤¿à¤• à¤ªà¤‚à¤šà¤¾à¤‚à¤—",
                     "eyebrow":  "à¤µà¥ˆà¤¦à¤¿à¤• à¤ªà¤‚à¤šà¤¾à¤‚à¤—",
                     "failed":  "à¤ªà¤‚à¤šà¤¾à¤‚à¤— à¤—à¤£à¤¨à¤¾ à¤µà¤¿à¤«à¤²à¥¤",
                     "resetToProfile":  "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¸à¥à¤¥à¤¾à¤¨ à¤ªà¤° à¤²à¥Œà¤Ÿà¥‡à¤‚",
                     "now":  "à¤…à¤­à¥€",
                     "sunEyebrow":  "à¤¸à¥‚à¤°à¥à¤¯",
                     "sunTitle":  "à¤¸à¥‚à¤°à¥à¤¯à¥‹à¤¦à¤¯ à¤”à¤° à¤¸à¥‚à¤°à¥à¤¯à¤¾à¤¸à¥à¤¤",
                     "sunrise":  "à¤¸à¥‚à¤°à¥à¤¯à¥‹à¤¦à¤¯",
                     "sunset":  "à¤¸à¥‚à¤°à¥à¤¯à¤¾à¤¸à¥à¤¤",
                     "limbsEyebrow":  "à¤ªà¤¾à¤à¤š à¤…à¤‚à¤—",
                     "limbsTitle":  "à¤ªà¤‚à¤šà¤¾à¤‚à¤—",
                     "limbsHint":  "à¤¤à¤¿à¤¥à¤¿, à¤¨à¤•à¥à¤·à¤¤à¥à¤°, à¤¯à¥‹à¤—, à¤•à¤°à¤£ à¤”à¤° à¤µà¤¾à¤° â€” à¤µà¥ˆà¤¦à¤¿à¤• à¤¦à¤¿à¤¨ à¤•à¥‡ à¤ªà¤¾à¤à¤š à¤…à¤‚à¤—à¥¤",
                     "limbs":  {
                                   "tithi":  "à¤¤à¤¿à¤¥à¤¿",
                                   "nakshatra":  "à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                                   "yoga":  "à¤¯à¥‹à¤—",
                                   "karana":  "à¤•à¤°à¤£",
                                   "vara":  "à¤µà¤¾à¤°"
                               },
                     "muhurtaEyebrow":  "à¤®à¥à¤¹à¥‚à¤°à¥à¤¤",
                     "muhurtaTitle":  "à¤¶à¥à¤­ à¤¸à¤®à¤¯",
                     "muhurtaHint":  "à¤¬à¥à¤°à¤¹à¥à¤® à¤®à¥à¤¹à¥‚à¤°à¥à¤¤ à¤”à¤° à¤…à¤­à¤¿à¤œà¤¿à¤¤ à¤¶à¥à¤­ à¤•à¤¾à¤°à¥à¤¯à¥‹à¤‚ à¤¹à¥‡à¤¤à¥; à¤°à¤¾à¤¹à¥ à¤•à¤¾à¤² à¤¸à¥‡ à¤¬à¤šà¥‡à¤‚à¥¤",
                     "brahmaMuhurta":  "à¤¬à¥à¤°à¤¹à¥à¤® à¤®à¥à¤¹à¥‚à¤°à¥à¤¤",
                     "abhijitMuhurta":  "à¤…à¤­à¤¿à¤œà¤¿à¤¤ à¤®à¥à¤¹à¥‚à¤°à¥à¤¤",
                     "rahuKalam":  "à¤°à¤¾à¤¹à¥ à¤•à¤¾à¤²",
                     "brahmaHint":  "à¤¶à¥à¤­ Â· à¤ªà¥à¤°à¤¾à¤¤à¤ƒà¤•à¤¾à¤²",
                     "abhijitHint":  "à¤¶à¥à¤­ Â· à¤®à¤§à¥à¤¯à¤¾à¤¹à¥à¤¨",
                     "rahuHint":  "à¤…à¤¶à¥à¤­ Â· à¤Ÿà¤¾à¤²à¥‡à¤‚",
                     "choghadiyaEyebrow":  "à¤šà¥Œà¤˜à¤¡à¤¼à¤¿à¤¯à¤¾",
                     "choghadiyaTitle":  "à¤¦à¤¿à¤¨ à¤”à¤° à¤°à¤¾à¤¤ à¤•à¥‡ à¤–à¤‚à¤¡",
                     "choghadiyaHint":  "à¤¦à¤¿à¤¨ à¤”à¤° à¤°à¤¾à¤¤ à¤•à¥‡ à¤†à¤  à¤¸à¤®à¤¾à¤¨ à¤–à¤‚à¤¡à¥¤ à¤¹à¤°à¤¾ à¤¶à¥à¤­, à¤²à¤¾à¤² à¤…à¤¶à¥à¤­à¥¤",
                     "dayChoghadiya":  "à¤¦à¤¿à¤¨ à¤šà¥Œà¤˜à¤¡à¤¼à¤¿à¤¯à¤¾",
                     "nightChoghadiya":  "à¤°à¤¾à¤¤ à¤šà¥Œà¤˜à¤¡à¤¼à¤¿à¤¯à¤¾",
                     "noChoghadiya":  "à¤šà¥Œà¤˜à¤¡à¤¼à¤¿à¤¯à¤¾ à¤¡à¥‡à¤Ÿà¤¾ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚à¥¤",
                     "horaEyebrow":  "à¤¹à¥‹à¤°à¤¾",
                     "horaTitleSection":  "à¤—à¥à¤°à¤¹ à¤¹à¥‹à¤°à¤¾",
                     "horaTitle":  "à¤¹à¥‹à¤°à¤¾ (à¤¦à¤¿à¤¨)",
                     "horaHint":  "à¤¸à¥‚à¤°à¥à¤¯à¥‹à¤¦à¤¯ à¤¸à¥‡ à¤¸à¥‚à¤°à¥à¤¯à¤¾à¤¸à¥à¤¤ à¤¤à¤• à¤¬à¤¾à¤°à¤¹ à¤—à¥à¤°à¤¹-à¤¹à¥‹à¤°à¤¾à¤à¤à¥¤",
                     "noHora":  "à¤¹à¥‹à¤°à¤¾ à¤¡à¥‡à¤Ÿà¤¾ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚à¥¤"
                 }
}
``````

### `src\i18n\locales\ne.json`

```json
{
    "app":  {
                "name":  "à¤•à¥à¤£à¥à¤¡à¤²à¥€à¤¯à¤¾à¤¤à¥à¤°à¤¾",
                "tagline":  "à¤¤à¤ªà¤¾à¤ˆà¤‚à¤•à¥‹ à¤µà¥ˆà¤¦à¤¿à¤• à¤œà¤¨à¥à¤® à¤•à¥à¤£à¥à¤¡à¤²à¥€, à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤°à¥‚à¤ªà¤®à¤¾à¥¤",
                "print":  "à¤ªà¥à¤°à¤¿à¤¨à¥à¤Ÿ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥"
            },
    "common":  {
                   "change":  "à¤ªà¤°à¤¿à¤µà¤°à¥à¤¤à¤¨",
                   "reset":  "à¤°à¤¿à¤¸à¥‡à¤Ÿ",
                   "loading":  "à¤²à¥‹à¤¡ à¤¹à¥à¤à¤¦à¥ˆà¤›...",
                   "searching":  "à¤–à¥‹à¤œà¥à¤¦à¥ˆà¤›...",
                   "noResults":  "\"{{query}}\" à¤¸à¤à¤— à¤®à¤¿à¤²à¥à¤¨à¥‡ à¤¶à¤¹à¤° à¤­à¥‡à¤Ÿà¤¿à¤à¤¨à¥¤",
                   "searchFailed":  "à¤–à¥‹à¤œ à¤…à¤¸à¤«à¤²à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥à¤¨à¤ƒ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤"
               },
    "birth":  {
                  "title":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£",
                  "subtitle":  "à¤¸à¤®à¤¯ à¤œà¤¨à¥à¤® à¤¶à¤¹à¤°à¤•à¥‹ à¤¸à¤®à¤¯ à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¤®à¤¾ à¤²à¤¿à¤‡à¤¨à¥‡à¤›à¥¤",
                  "name":  "à¤¨à¤¾à¤®",
                  "namePlaceholder":  "à¤œà¤¸à¥à¤¤à¥ˆ à¤¬à¤¿à¤•à¤¾à¤¶ à¤®à¥‹à¤•à¥à¤¤à¤¾à¤¨",
                  "date":  "à¤œà¤¨à¥à¤® à¤®à¤¿à¤¤à¤¿",
                  "time":  "à¤œà¤¨à¥à¤® à¤¸à¤®à¤¯",
                  "city":  "à¤œà¤¨à¥à¤® à¤¶à¤¹à¤°",
                  "cityPlaceholder":  "à¤¶à¤¹à¤°à¤•à¥‹ à¤¨à¤¾à¤® à¤²à¥‡à¤–à¥à¤¨à¥à¤¹à¥‹à¤¸à¥...",
                  "submit":  "à¤•à¥à¤£à¥à¤¡à¤²à¥€ à¤¹à¥‡à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥",
                  "interpretedAs":  "à¤¯à¤¸ à¤°à¥‚à¤ªà¤®à¤¾ à¤µà¥à¤¯à¤¾à¤–à¥à¤¯à¤¾",
                  "errors":  {
                                 "nameRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¨à¤¾à¤® à¤²à¥‡à¤–à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤",
                                 "nameTooLong":  "à¤¨à¤¾à¤® à¤§à¥‡à¤°à¥ˆ à¤²à¤¾à¤®à¥‹ à¤› (à¤…à¤§à¤¿à¤•à¤¤à¤® 100 à¤…à¤•à¥à¤·à¤°)à¥¤",
                                 "dateRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤®à¤¿à¤¤à¤¿ à¤²à¥‡à¤–à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤",
                                 "dateTooEarly":  "à¤œà¤¨à¥à¤® à¤µà¤°à¥à¤· 1900 à¤µà¤¾ à¤ªà¤›à¤¿à¤•à¥‹ à¤¹à¥à¤¨à¥à¤ªà¤°à¥à¤›à¥¤",
                                 "dateFuture":  "à¤œà¤¨à¥à¤® à¤®à¤¿à¤¤à¤¿ à¤­à¤µà¤¿à¤·à¥à¤¯à¤®à¤¾ à¤¹à¥à¤¨ à¤¸à¤•à¥à¤¦à¥ˆà¤¨à¥¤",
                                 "timeRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤¸à¤®à¤¯ à¤²à¥‡à¤–à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤",
                                 "placeRequired":  "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¨à¥à¤® à¤¶à¤¹à¤° à¤›à¤¾à¤¨à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤",
                                 "invalidDateTime":  "à¤¤à¥à¤¯à¥‹ à¤®à¤¿à¤¤à¤¿/à¤¸à¤®à¤¯ {{timezone}} à¤®à¤¾ à¤®à¤¾à¤¨à¥à¤¯ à¤›à¥ˆà¤¨à¥¤"
                             },
                  "calendarBS":  "à¤µà¤¿.à¤¸à¤‚.",
                  "calendarAD":  "à¤ˆ.à¤¸à¤‚.",
                  "approximateAD":  "â‰ˆ {{ad}} (à¤ˆ.à¤¸à¤‚.)",
                  "approximateBS":  "â‰ˆ à¤µà¤¿.à¤¸à¤‚. {{bs}}"
              },
    "dashboard":  {
                      "title":  "à¤•à¥à¤£à¥à¤¡à¤²à¥€à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¡à¥à¤¯à¤¾à¤¸à¤¬à¥‹à¤°à¥à¤¡",
                      "changeDetails":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£ à¤ªà¤°à¤¿à¤µà¤°à¥à¤¤à¤¨",
                      "ascendant":  "à¤²à¤—à¥à¤¨",
                      "sign":  "à¤°à¤¾à¤¶à¤¿",
                      "lord":  "à¤¸à¥à¤µà¤¾à¤®à¥€",
                      "degree":  "à¤…à¤‚à¤¶",
                      "nakshatra":  "à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                      "planets":  "à¤—à¥à¤°à¤¹ à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¹à¤°à¥‚",
                      "failed":  "à¤•à¥à¤£à¥à¤¡à¤²à¥€ à¤—à¤£à¤¨à¤¾ à¤…à¤¸à¤«à¤²à¥¤"
                  },
    "settings":  {
                     "language":  "à¤­à¤¾à¤·à¤¾",
                     "palette":  "à¤°à¤™ à¤ªà¥à¤¯à¤¾à¤²à¥‡à¤Ÿ",
                     "light":  "à¤‰à¤œà¥à¤¯à¤¾à¤²à¥‹",
                     "dark":  "à¤…à¤à¤§à¥à¤¯à¤¾à¤°à¥‹",
                     "system":  "à¤¸à¤¿à¤¸à¥à¤Ÿà¤®"
                 },
    "chart":  {
                  "title":  "à¤œà¤¨à¥à¤® à¤•à¥à¤£à¥à¤¡à¤²à¥€ (D1)",
                  "styleNorth":  "à¤‰à¤¤à¥à¤¤à¤° à¤­à¤¾à¤°à¤¤à¥€à¤¯",
                  "styleSouth":  "à¤¦à¤•à¥à¤·à¤¿à¤£ à¤­à¤¾à¤°à¤¤à¥€à¤¯",
                  "planetAbbr":  {
                                     "ascendant":  "à¤²",
                                     "sun":  "à¤¸à¥‚",
                                     "moon":  "à¤šà¤‚",
                                     "mars":  "à¤®à¤‚",
                                     "mercury":  "à¤¬à¥",
                                     "jupiter":  "à¤—à¥",
                                     "venus":  "à¤¶à¥",
                                     "saturn":  "à¤¶",
                                     "rahu":  "à¤°à¤¾",
                                     "ketu":  "à¤•à¥‡"
                                 }
              },
    "cover":  {
                  "birthNakshatra":  "à¤œà¤¨à¥à¤® à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                  "currentPeriod":  "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤…à¤µà¤§à¤¿",
                  "dasha":  "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤¦à¤¶à¤¾",
                  "surya":  "à¤¸à¥‚à¤°à¥à¤¯",
                  "chandra":  "à¤šà¤¨à¥à¤¦à¥à¤°",
                  "lagna":  "à¤²à¤—à¥à¤¨",
                  "strongestHouse":  "à¤¸à¤¬à¥ˆà¤­à¤¨à¥à¤¦à¤¾ à¤¬à¤²à¤¿à¤¯à¥‹ à¤­à¤¾à¤µ",
                  "reading":  "à¤µà¥ˆà¤¦à¤¿à¤• à¤œà¤¨à¥à¤® à¤•à¥à¤£à¥à¤¡à¤²à¥€",
                  "change":  "à¤œà¤¨à¥à¤® à¤µà¤¿à¤µà¤°à¤£ à¤ªà¤°à¤¿à¤µà¤°à¥à¤¤à¤¨"
              },
    "hero":  {
                 "yourRashi":  "Your Rashi",
                 "reading":  "A Vedic Reading",
                 "panchangTitle":  "Panchangam at Birth",
                 "tithi":  "Tithi",
                 "chandraRashi":  "Chandra Rashi",
                 "lagnaRashi":  "Lagna",
                 "change":  "Change Birth Details",
                 "chandraSub":  "Moon Sign Â· Mind",
                 "lagnaSub":  "Ascendant Â· Body",
                 "suryaRashi":  "Surya Rashi",
                 "dasha":  "Current Mahadasha",
                 "vara":  "Vara",
                 "suryaSub":  "Sun Sign Â· Soul",
                 "nakshatra":  "Birth Nakshatra"
             },
    "nav":  {
                "chart":  "à¤•à¥à¤£à¥à¤¡à¤²à¥€",
                "panchang":  "à¤ªà¤žà¥à¤šà¤¾à¤™à¥à¤—"
            },
    "panchang":  {
                     "title":  "à¤¦à¥ˆà¤¨à¤¿à¤• à¤ªà¤žà¥à¤šà¤¾à¤™à¥à¤—",
                     "eyebrow":  "à¤µà¥ˆà¤¦à¤¿à¤• à¤ªà¤žà¥à¤šà¤¾à¤™à¥à¤—",
                     "failed":  "à¤ªà¤žà¥à¤šà¤¾à¤™à¥à¤— à¤—à¤£à¤¨à¤¾ à¤…à¤¸à¤«à¤²à¥¤",
                     "resetToProfile":  "à¤ªà¥à¤°à¥‹à¤«à¤¾à¤‡à¤² à¤¸à¥à¤¥à¤¾à¤¨à¤®à¤¾ à¤«à¤°à¥à¤•à¤¨à¥à¤¹à¥‹à¤¸à¥",
                     "now":  "à¤…à¤¹à¤¿à¤²à¥‡",
                     "sunEyebrow":  "à¤¸à¥‚à¤°à¥à¤¯",
                     "sunTitle":  "à¤¸à¥‚à¤°à¥à¤¯à¥‹à¤¦à¤¯ à¤° à¤¸à¥‚à¤°à¥à¤¯à¤¾à¤¸à¥à¤¤",
                     "sunrise":  "à¤¸à¥‚à¤°à¥à¤¯à¥‹à¤¦à¤¯",
                     "sunset":  "à¤¸à¥‚à¤°à¥à¤¯à¤¾à¤¸à¥à¤¤",
                     "limbsEyebrow":  "à¤ªà¤¾à¤à¤š à¤…à¤™à¥à¤—",
                     "limbsTitle":  "à¤ªà¤žà¥à¤šà¤¾à¤™à¥à¤—",
                     "limbsHint":  "à¤¤à¤¿à¤¥à¤¿, à¤¨à¤•à¥à¤·à¤¤à¥à¤°, à¤¯à¥‹à¤—, à¤•à¤°à¤£ à¤° à¤µà¤¾à¤° â€” à¤µà¥ˆà¤¦à¤¿à¤• à¤¦à¤¿à¤¨à¤•à¤¾ à¤ªà¤¾à¤à¤š à¤…à¤™à¥à¤—à¥¤",
                     "limbs":  {
                                   "tithi":  "à¤¤à¤¿à¤¥à¤¿",
                                   "nakshatra":  "à¤¨à¤•à¥à¤·à¤¤à¥à¤°",
                                   "yoga":  "à¤¯à¥‹à¤—",
                                   "karana":  "à¤•à¤°à¤£",
                                   "vara":  "à¤µà¤¾à¤°"
                               },
                     "muhurtaEyebrow":  "à¤®à¥à¤¹à¥‚à¤°à¥à¤¤",
                     "muhurtaTitle":  "à¤¶à¥à¤­ à¤¸à¤®à¤¯",
                     "muhurtaHint":  "à¤¬à¥à¤°à¤¹à¥à¤® à¤®à¥à¤¹à¥‚à¤°à¥à¤¤ à¤° à¤…à¤­à¤¿à¤œà¤¿à¤¤ à¤¶à¥à¤­ à¤•à¤¾à¤°à¥à¤¯à¤•à¤¾ à¤²à¤¾à¤—à¤¿; à¤°à¤¾à¤¹à¥ à¤•à¤¾à¤²à¤¬à¤¾à¤Ÿ à¤¬à¤šà¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤",
                     "brahmaMuhurta":  "à¤¬à¥à¤°à¤¹à¥à¤® à¤®à¥à¤¹à¥‚à¤°à¥à¤¤",
                     "abhijitMuhurta":  "à¤…à¤­à¤¿à¤œà¤¿à¤¤ à¤®à¥à¤¹à¥‚à¤°à¥à¤¤",
                     "rahuKalam":  "à¤°à¤¾à¤¹à¥ à¤•à¤¾à¤²",
                     "brahmaHint":  "à¤¶à¥à¤­ Â· à¤ªà¥à¤°à¤¾à¤¤à¤ƒà¤•à¤¾à¤²",
                     "abhijitHint":  "à¤¶à¥à¤­ Â· à¤®à¤§à¥à¤¯à¤¾à¤¹à¥à¤¨",
                     "rahuHint":  "à¤…à¤¶à¥à¤­ Â· à¤Ÿà¤¾à¤¢à¤¾ à¤°à¤¹à¤¨à¥à¤¹à¥‹à¤¸à¥",
                     "choghadiyaEyebrow":  "à¤šà¥Œà¤˜à¤¡à¤¿à¤¯à¤¾",
                     "choghadiyaTitle":  "à¤¦à¤¿à¤¨ à¤° à¤°à¤¾à¤¤à¤•à¤¾ à¤–à¤£à¥à¤¡à¤¹à¤°à¥‚",
                     "choghadiyaHint":  "à¤¦à¤¿à¤¨ à¤° à¤°à¤¾à¤¤à¤•à¤¾ à¤†à¤  à¤¸à¤®à¤¾à¤¨ à¤–à¤£à¥à¤¡à¤¹à¤°à¥‚à¥¤ à¤¹à¤°à¤¿à¤¯à¥‹ à¤¶à¥à¤­, à¤°à¤¾à¤¤à¥‹ à¤…à¤¶à¥à¤­à¥¤",
                     "dayChoghadiya":  "à¤¦à¤¿à¤¨ à¤šà¥Œà¤˜à¤¡à¤¿à¤¯à¤¾",
                     "nightChoghadiya":  "à¤°à¤¾à¤¤ à¤šà¥Œà¤˜à¤¡à¤¿à¤¯à¤¾",
                     "noChoghadiya":  "à¤šà¥Œà¤˜à¤¡à¤¿à¤¯à¤¾ à¤¡à¥‡à¤Ÿà¤¾ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤›à¥ˆà¤¨à¥¤",
                     "horaEyebrow":  "à¤¹à¥‹à¤°à¤¾",
                     "horaTitleSection":  "à¤—à¥à¤°à¤¹ à¤¹à¥‹à¤°à¤¾",
                     "horaTitle":  "à¤¹à¥‹à¤°à¤¾ (à¤¦à¤¿à¤¨)",
                     "horaHint":  "à¤¸à¥‚à¤°à¥à¤¯à¥‹à¤¦à¤¯à¤¦à¥‡à¤–à¤¿ à¤¸à¥‚à¤°à¥à¤¯à¤¾à¤¸à¥à¤¤à¤¸à¤®à¥à¤® à¤¬à¤¾à¤¹à¥à¤° à¤—à¥à¤°à¤¹-à¤¹à¥‹à¤°à¤¾à¥¤",
                     "noHora":  "à¤¹à¥‹à¤°à¤¾ à¤¡à¥‡à¤Ÿà¤¾ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤›à¥ˆà¤¨à¥¤"
                 }
}
``````

### `src\infrastructure\astrology\panchang.adapter.ts`

```typescript
import { DateTime } from 'luxon';
import { Observer, getPanchangamDetails } from '@prisri/jyotish';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { Place } from '@/domain/geo/place';

// â”€â”€â”€ Public types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface PanchangPeriod {
  start: DateTime;
  end: DateTime;
}

export interface PanchangLimb {
  /** 1-based index in the classical sequence. */
  index?: number;
  name: string;
}

export interface PanchangNakshatra extends PanchangLimb {
  lord: string;
  pada: number | null;
}

export interface ChoghadiyaSegment {
  name: string;
  start: DateTime;
  end: DateTime;
  /** 'good' | 'neutral' | 'bad' â€” as classified by the library. */
  rating: 'good' | 'neutral' | 'bad';
}

export interface ChoghadiyaTable {
  day: ChoghadiyaSegment[];
  night: ChoghadiyaSegment[];
}

export interface GowriSegment {
  name: string;
  start: DateTime;
  end: DateTime;
  rating: 'good' | 'neutral' | 'bad';
}

export interface GowriTable {
  day: GowriSegment[];
  night: GowriSegment[];
}

export interface RashiRef {
  index: number;
  name: string;
}

export interface SamvatInfo {
  vikram: number;
  shaka: number;
  samvatsara: string;
}

export interface PanchangData {
  // â”€â”€â”€ The instant â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  /** The moment this Panchang describes, in the observer's tz. */
  instant: DateTime;

  // â”€â”€â”€ Five limbs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  tithi: PanchangLimb;
  paksha: string;
  nakshatra: PanchangNakshatra;
  yoga: PanchangLimb;
  karana: PanchangLimb;
  vara: PanchangLimb;

  // â”€â”€â”€ Solar & lunar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  sunrise: DateTime | null;
  sunset: DateTime | null;
  moonrise: DateTime | null;
  moonset: DateTime | null;

  // â”€â”€â”€ Auspicious windows â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  abhijitMuhurta: PanchangPeriod | null;
  brahmaMuhurta: PanchangPeriod | null;
  govardhanMuhurta: PanchangPeriod | null;
  amritKalam: PanchangPeriod[];

  // â”€â”€â”€ Inauspicious windows â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  rahuKalam: PanchangPeriod | null;
  yamagandaKalam: PanchangPeriod | null;
  gulikaKalam: PanchangPeriod | null;
  durMuhurta: PanchangPeriod[];
  varjyam: PanchangPeriod[];

  // â”€â”€â”€ Time tables â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  choghadiya: ChoghadiyaTable;
  gowri: GowriTable;
  currentHoraLord: string | null;

  // â”€â”€â”€ Vedic calendar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  masa: { index: number; name: string; isAdhika: boolean } | null;
  ritu: string;
  ayana: { index: number; name: string };
  samvat: SamvatInfo | null;

  // â”€â”€â”€ Rashi â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  moonRashi: RashiRef | null;
  sunRashi: RashiRef | null;

  // â”€â”€â”€ Festivals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  festivals: string[];
}

export class PanchangError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PanchangError';
  }
}

// â”€â”€â”€ Internal helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * The library returns timestamps as ISO strings (UTC, with Z suffix)
 * OR occasionally as Date objects, depending on the field.
 * Normalize both to a Luxon DateTime in the observer's IANA zone.
 */
function toZoned(v: unknown, zone: string): DateTime | null {
  if (v === null || v === undefined) return null;
  let dt: DateTime | null = null;
  if (typeof v === 'string') {
    dt = DateTime.fromISO(v, { zone: 'utc' });
  } else if (v instanceof Date) {
    dt = DateTime.fromJSDate(v, { zone: 'utc' });
  }
  if (!dt || !dt.isValid) return null;
  return dt.setZone(zone);
}

/**
 * Many of the library's muhurta/kalam fields are returned as
 * { start, end } with ISO strings â€” but a few use flat
 * <name>Start/<name>End fields. This handles both.
 */
function toPeriod(
  raw: { start?: unknown; end?: unknown } | null | undefined,
  zone: string
): PanchangPeriod | null {
  if (!raw) return null;
  const start = toZoned(raw.start, zone);
  const end = toZoned(raw.end, zone);
  if (!start || !end) return null;
  return { start, end };
}

function toPeriodFromFlat(
  start: unknown,
  end: unknown,
  zone: string
): PanchangPeriod | null {
  const s = toZoned(start, zone);
  const e = toZoned(end, zone);
  if (!s || !e) return null;
  return { start: s, end: e };
}

function toPeriodArray(raw: unknown, zone: string): PanchangPeriod[] {
  if (!Array.isArray(raw)) return [];
  const out: PanchangPeriod[] = [];
  for (const item of raw) {
    const p = toPeriod(item as { start?: unknown; end?: unknown }, zone);
    if (p) out.push(p);
  }
  return out;
}

function toChoghadiya(raw: any, zone: string): ChoghadiyaTable {
  const map = (arr: any[]): ChoghadiyaSegment[] =>
    (arr ?? []).flatMap((s) => {
      const start = toZoned(s?.startTime, zone);
      const end = toZoned(s?.endTime, zone);
      if (!start || !end) return [];
      const rating: ChoghadiyaSegment['rating'] =
        s?.rating === 'good' || s?.rating === 'bad' ? s.rating : 'neutral';
      return [{ name: String(s?.name ?? '\u2014'), start, end, rating }];
    });
  return { day: map(raw?.day ?? []), night: map(raw?.night ?? []) };
}

function toGowri(raw: any, zone: string): GowriTable {
  const map = (arr: any[]): GowriSegment[] =>
    (arr ?? []).flatMap((s) => {
      const start = toZoned(s?.startTime, zone);
      const end = toZoned(s?.endTime, zone);
      if (!start || !end) return [];
      const rating: GowriSegment['rating'] =
        s?.rating === 'good' || s?.rating === 'bad' ? s.rating : 'neutral';
      return [{ name: String(s?.name ?? '\u2014'), start, end, rating }];
    });
  return { day: map(raw?.day ?? []), night: map(raw?.night ?? []) };
}

function toRashiRef(raw: any): RashiRef | null {
  if (!raw || typeof raw !== 'object') return null;
  return {
    index: Number(raw.index ?? 0),
    name: String(raw.name ?? '\u2014'),
  };
}

function toFestivals(raw: any): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((f) => {
    if (typeof f === 'string') return f;
    return String(f?.name ?? f?.title ?? '\u2014');
  });
}

// â”€â”€â”€ Core calculation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function calculatePanchang(
  instant: DateTime,
  place: Pick<Place, 'lat' | 'lon' | 'timezone'>
): PanchangData {
  if (!instant.isValid) {
    throw new PanchangError(
      `Invalid instant: ${instant.invalidReason ?? 'unknown'}`
    );
  }

  const observer = new Observer(place.lat, place.lon, 0);
  const raw = getPanchangamDetails(instant.toJSDate(), observer) as any;
  const zone = place.timezone;

  if (!raw) {
    throw new PanchangError('Panchang calculation returned no data.');
  }

  return {
    instant: instant.setZone(zone),

    // Five limbs
    tithi: { index: raw.tithi, name: raw.tithiName ?? '\u2014' },
    paksha: raw.paksha ?? '\u2014',
    nakshatra: {
      index: raw.nakshatra,
      name: raw.nakshatraName ?? '\u2014',
      lord: raw.nakshatraLord ?? '\u2014',
      pada: typeof raw.nakshatraPada === 'number' ? raw.nakshatraPada : null,
    },
    yoga: { index: raw.yoga, name: raw.yogaName ?? '\u2014' },
    karana: { name: raw.karana ?? '\u2014' },
    vara: { index: raw.vara, name: raw.varaName ?? '\u2014' },

    // Solar & lunar
    sunrise: toZoned(raw.sunrise, zone),
    sunset: toZoned(raw.sunset, zone),
    moonrise: toZoned(raw.moonrise, zone),
    moonset: toZoned(raw.moonset, zone),

    // Auspicious
    abhijitMuhurta: toPeriod(raw.abhijitMuhurta, zone),
    brahmaMuhurta: toPeriod(raw.brahmaMuhurta, zone),
    govardhanMuhurta: toPeriod(raw.govardhanMuhurta, zone),
    amritKalam: toPeriodArray(raw.amritKalam, zone),

    // Inauspicious
    rahuKalam: toPeriodFromFlat(raw.rahuKalamStart, raw.rahuKalamEnd, zone),
    yamagandaKalam: toPeriod(raw.yamagandaKalam, zone),
    gulikaKalam: toPeriod(raw.gulikaKalam, zone),
    durMuhurta: toPeriodArray(raw.durMuhurta, zone),
    varjyam: toPeriodArray(raw.varjyam, zone),

    // Time tables
    choghadiya: toChoghadiya(raw.choghadiya, zone),
    gowri: toGowri(raw.gowri, zone),
    currentHoraLord:
      typeof raw.currentHora === 'string' ? raw.currentHora : null,

    // Vedic calendar
    masa: raw.masa
      ? {
          index: Number(raw.masa.index ?? 0),
          name: String(raw.masa.name ?? '\u2014'),
          isAdhika: Boolean(raw.masa.isAdhika),
        }
      : null,
    ritu: raw.ritu ?? '\u2014',
    ayana: {
      index: Number(raw.ayana ?? 0),
      name: raw.ayanaName ?? '\u2014',
    },
    samvat: raw.samvat
      ? {
          vikram: Number(raw.samvat.vikram ?? 0),
          shaka: Number(raw.samvat.shaka ?? 0),
          samvatsara: String(raw.samvat.samvatsara ?? '\u2014'),
        }
      : null,

    // Rashi
    moonRashi: toRashiRef(raw.moonRashi),
    sunRashi: toRashiRef(raw.sunRashi),

    // Festivals
    festivals: toFestivals(raw.festivals),
  };
}

// â”€â”€â”€ Public wrappers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * Panchang at the exact moment of birth.
 * Uses Luxon + the birth place's IANA zone â€” never `new Date(str)`.
 */
export function calculateBirthPanchang(profile: BirthData): PanchangData {
  const dt = DateTime.fromISO(
    `${profile.localDate}T${profile.localTime}`,
    { zone: profile.place.timezone }
  );
  if (!dt.isValid) {
    throw new PanchangError(
      `Invalid birth datetime: ${dt.invalidReason ?? 'unknown'}`
    );
  }
  return calculatePanchang(dt, profile.place);
}

/**
 * Today's Panchang at a given place.
 */
export function calculateNowPanchang(
  place: Pick<Place, 'lat' | 'lon' | 'timezone'>
): PanchangData {
  return calculatePanchang(DateTime.now().setZone(place.timezone), place);
}
``````

### `src\infrastructure\astrology\panchang.adapter.ts.bak-20260921-221309`

_(binary or unsupported file type: .bak-20260921-221309, 4.8 KB)_

### `src\infrastructure\astrology\prisri-jyotish.adapter.ts`

```typescript
import { DateTime } from 'luxon';
import { getKundli, Observer, getChalitChart, getPanchangamDetails } from '@prisri/jyotish';
import type { Kundli, KundliConfig } from '@prisri/jyotish';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { JyotishPort } from '@/domain/astrology/port';

const DEFAULT_CONFIG: KundliConfig = {
  ayanamsa: 'lahiri',
  houseSystem: 'whole_sign',
  includeChalit: true,
  includeKp: true,
  includeSpecialLagnas: true,
  includeArudhas: true,
  includeReferenceCharts: true,
};

export class BirthDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BirthDataError';
  }
}

export const prisriJyotish: JyotishPort = {
  calculate(data, config = DEFAULT_CONFIG): Kundli {
    // Build the exact instant the library expects.
    // Example: localDate="1995-05-15", localTime="14:30", tz="Asia/Kolkata"
    //   ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ dt.toJSDate() = new Date('1995-05-15T14:30:00+05:30')
    const dt = DateTime.fromISO(`${data.localDate}T${data.localTime}`, {
      zone: data.place.timezone,
    });

    if (!dt.isValid) {
      throw new BirthDataError(`Invalid birth datetime: ${dt.invalidReason ?? 'unknown'}`);
    }

    const observer = new Observer(data.place.lat, data.place.lon, 0);
    return getKundli(dt.toJSDate(), observer, config);
  },
};

export function previewBirthInstant(data: BirthData): {
  iso: string;
  utc: string;
  offset: string;
} {
  const dt = DateTime.fromISO(`${data.localDate}T${data.localTime}`, {
    zone: data.place.timezone,
  });
  if (!dt.isValid) throw new BirthDataError(`Invalid: ${dt.invalidReason}`);
  return {
    iso: dt.toISO() ?? '',
    utc: dt.toUTC().toISO() ?? '',
    offset: dt.toFormat('ZZ'),
  };
}
``````

### `src\infrastructure\calendar\nepali-date.ts`

```typescript
import NepaliDate from 'nepali-date-converter';

export const NEPALI_MONTHS = [
  'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
  'कात्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत',
] as const;

export const NEPALI_MONTHS_EN = [
  'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra',
] as const;

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toDevanagari(num: number | string): string {
  return String(num).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

export function toArabicNumerals(str: string): string {
  return str.replace(/[०-९]/g, (d) => String(DEVANAGARI_DIGITS.indexOf(d)));
}

export const BS_MIN_YEAR = 1975;
export const BS_MAX_YEAR = 2090;

export interface BSDate {
  year: number;
  month: number; // 0-indexed (0 = Baishakh)
  day: number;
}

export function toGregorianISO(bs: BSDate): string | null {
  try {
    const d = new NepaliDate(bs.year, bs.month, bs.day);
    const js = d.toJsDate();
    // Use local getters, not toISOString(), to avoid UTC shifts
    const yyyy = js.getFullYear();
    const mm = String(js.getMonth() + 1).padStart(2, '0');
    const dd = String(js.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return null;
  }
}

export function fromGregorianISO(iso: string): BSDate | null {
  try {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return null;
    // Construct in local time to avoid UTC offsets
    const localDate = new Date(y, m - 1, d);
    const nep = new NepaliDate(localDate);
    return {
      year: nep.getYear(),
      month: nep.getMonth(),
      day: nep.getDate(),
    };
  } catch {
    return null;
  }
}

export function daysInBsMonth(year: number, month: number): number {
  try {
    // Try days 32 down to 29 until valid
    for (let d = 32; d >= 29; d--) {
      try {
        new NepaliDate(year, month, d);
        return d;
      } catch {
        // keep trying
      }
    }
    return 30;
  } catch {
    return 30;
  }
}

export function formatBS(bs: BSDate, options: { devanagari?: boolean; monthNames?: readonly string[] } = {}): string {
  const { devanagari = true, monthNames = NEPALI_MONTHS } = options;
  const yStr = devanagari ? toDevanagari(bs.year) : String(bs.year);
  const dStr = devanagari ? toDevanagari(bs.day) : String(bs.day);
  return `${yStr} ${monthNames[bs.month]} ${dStr}`;
}

export function formatADFromISO(iso: string): string {
  try {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    const localDate = new Date(y, m - 1, d);
    return localDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}
``````

### `src\infrastructure\geo\photon.geocoder.ts`

```typescript
import type { GeocoderPort, PlaceSearchResult } from '@/domain/geo/port';

interface PhotonFeature {
  properties: {
    osm_id: number;
    osm_type?: string;
    name?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    countrycode?: string;
    type?: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

const ALLOWED = new Set(['city', 'town', 'village', 'municipality', 'district']);

function buildLabel(p: PhotonFeature['properties']): string {
  return [p.name ?? p.city, p.state, p.country].filter(Boolean).join(', ');
}

function buildShortLabel(p: PhotonFeature['properties']): string {
  const primary = p.name ?? p.city ?? p.district ?? 'Unknown';
  return p.state ? `${primary}, ${p.state}` : primary;
}

export const photonGeocoder: GeocoderPort = {
  async search(query, signal) {
    const url =
      'https://photon.komoot.io/api/?' +
      new URLSearchParams({ q: query, limit: '8', lang: 'en' }).toString();

    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Geocoder failed: ${res.status}`);

    const data: { features: PhotonFeature[] } = await res.json();

    return data.features
      .filter((f) => ALLOWED.has(f.properties.type ?? ''))
      .map<PlaceSearchResult>((f) => ({
        id: `osm:${(f.properties.osm_type ?? 'N')[0]}${f.properties.osm_id}`,
        label: buildLabel(f.properties),
        shortLabel: buildShortLabel(f.properties),
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
        countryCode: f.properties.countrycode,
        admin1: f.properties.state,
        placeType:
          f.properties.type === 'city' ||
          f.properties.type === 'town' ||
          f.properties.type === 'village'
            ? (f.properties.type as 'city' | 'town' | 'village')
            : 'unknown',
      }));
  },
};
``````

### `src\infrastructure\geo\tz.resolver.ts`

```typescript
import tzlookup from 'tz-lookup';
import { isValidTimezone } from '@/domain/geo/place';

export interface TzResolution {
  timezone: string;
  fallbackUsed: boolean;
}

export function resolveTimezone(lat: number, lon: number): TzResolution {
  try {
    const tz = tzlookup(lat, lon);
    if (isValidTimezone(tz)) return { timezone: tz, fallbackUsed: false };
  } catch {
    // fall through
  }
  return { timezone: 'UTC', fallbackUsed: true };
}
``````

### `src\lib\utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
``````

### `src\main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { PaletteProvider } from '@/components/palette-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <PaletteProvider>
        <App />
      </PaletteProvider>
    </ThemeProvider>
  </React.StrictMode>
);
``````

### `src\styles\globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 32 95% 44%;
    --primary-foreground: 0 0% 100%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 32 95% 44%;
    --radius: 0.625rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 38 92% 50%;
    --primary-foreground: 240 10% 3.9%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 38 92% 50%;
  }
  [data-palette='violet'] { --primary: 262 83% 58%; --ring: 262 83% 58%; }
  [data-palette='violet'].dark { --primary: 263 70% 50%; --ring: 263 70% 50%; }
  [data-palette='green'] { --primary: 142 76% 36%; --ring: 142 76% 36%; }
  [data-palette='green'].dark { --primary: 142 71% 45%; --ring: 142 71% 45%; }
  [data-palette='rose'] { --primary: 346 77% 50%; --ring: 346 77% 50%; }
  [data-palette='rose'].dark { --primary: 346 77% 50%; --ring: 346 77% 50%; }
  [data-palette='slate'] { --primary: 215 25% 27%; --ring: 215 25% 27%; }
  [data-palette='slate'].dark { --primary: 215 20% 65%; --ring: 215 20% 65%; }
  * { @apply border-border; }
  body { @apply bg-background text-foreground font-sans; font-feature-settings: 'rlig' 1, 'calt' 1; }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PATRIKA â€” Traditional Nepali document styles
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

:root {
  /* Traditional patrika colors */
  --patrika-red: 355 65% 42%;
  --patrika-red-deep: 355 70% 32%;
  --patrika-green: 150 55% 30%;
  --patrika-green-soft: 150 40% 45%;
  --patrika-paper: 42 55% 96%;
  --patrika-paper-warm: 38 60% 93%;
  --patrika-gold: 38 85% 55%;
  --patrika-maroon: 8 60% 28%;
  --patrika-ink: 25 45% 20%;
}

/* â”€â”€â”€ Traditional Devanagari display fonts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.font-dev-display {
  font-family: 'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif;
}

.font-dev-serif {
  font-family: 'Noto Serif Devanagari', 'Crimson Pro', Georgia, serif;
}

.font-dev-sans {
  font-family: 'Noto Sans Devanagari', 'Inter', system-ui, sans-serif;
}

.font-sanskrit {
  font-family: 'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif;
  letter-spacing: 0.01em;
}

/* â”€â”€â”€ Patrika layout primitives â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-paper {
  background-color: hsl(var(--patrika-paper));
  background-image:
    radial-gradient(hsl(38 40% 88% / 0.4) 1px, transparent 1px),
    radial-gradient(hsl(38 40% 88% / 0.25) 1px, transparent 1px);
  background-size: 20px 20px, 40px 40px;
  background-position: 0 0, 10px 10px;
}

.patrika-ledger-row {
  display: grid;
  grid-template-columns: minmax(9rem, 1fr) 2fr;
  gap: 1rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid hsl(var(--patrika-gold) / 0.35);
  align-items: baseline;
}

.patrika-ledger-row:last-child {
  border-bottom: none;
}

.patrika-ledger-label {
  font-family: 'Noto Serif Devanagari', serif;
  font-size: 0.95rem;
  color: hsl(var(--patrika-maroon));
  font-weight: 500;
  letter-spacing: 0.02em;
}

.patrika-ledger-value {
  font-family: 'Noto Serif Devanagari', serif;
  font-size: 0.95rem;
  color: hsl(var(--patrika-ink));
  text-align: right;
  letter-spacing: 0.01em;
}

.patrika-ledger-value.mono {
  font-family: 'Noto Serif Devanagari', ui-monospace, monospace;
  letter-spacing: 0.03em;
}

/* â”€â”€â”€ Ornamental dividers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: hsl(var(--patrika-red));
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  margin: 1.5rem 0;
}

.patrika-ornament::before,
.patrika-ornament::after {
  content: '';
  height: 1px;
  flex: 1;
  max-width: 6rem;
  background: linear-gradient(to right, transparent, hsl(var(--patrika-red) / 0.6), transparent);
}

/* â”€â”€â”€ Traditional double border frame â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-frame {
  border: 3px solid hsl(var(--patrika-red));
  padding: 3px;
  background: hsl(var(--patrika-paper));
  box-shadow:
    0 0 0 1px hsl(var(--patrika-gold)),
    inset 0 0 0 1px hsl(var(--patrika-gold)),
    0 0 0 4px hsl(var(--patrika-paper)),
    0 0 0 5px hsl(var(--patrika-red-deep));
}

.patrika-frame-inner {
  border: 1px solid hsl(var(--patrika-gold));
  padding: 1.5rem;
  background: hsl(var(--patrika-paper));
}

/* â”€â”€â”€ Sanskrit shloka block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-shloka {
  font-family: 'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif;
  font-size: 0.95rem;
  line-height: 1.9;
  color: hsl(var(--patrika-maroon));
  text-align: center;
  letter-spacing: 0.01em;
}

/* â”€â”€â”€ Ganesh arch â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-ganesh-arch {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0.75rem 1.5rem 0;
}

.patrika-ganesh-arch::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50% 50% 0 0;
  border: 2px solid hsl(var(--patrika-red));
  border-bottom: none;
  background: radial-gradient(ellipse at center top, hsl(38 60% 92%) 0%, hsl(var(--patrika-paper)) 70%);
  z-index: 0;
}

/* â”€â”€â”€ Ledger title â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.patrika-section-title {
  font-family: 'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif;
  font-size: 1.05rem;
  color: hsl(var(--patrika-red-deep));
  text-align: center;
  letter-spacing: 0.15em;
  margin: 1.25rem 0 0.75rem;
}

/* â”€â”€â”€ Devanagari numerals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.dev-numerals {
  font-family: 'Noto Serif Devanagari', serif;
  letter-spacing: 0.02em;
}
``````

### `src\styles\print.css`

```css
/* ═══════════════════════════════════════════════════════════════
   PRINT STYLESHEET — KundaliYatra
   Turns the report into a beautiful A4 document.
   Every rule is scoped to @media print, so screen is unaffected.
   ═══════════════════════════════════════════════════════════════ */

@media print {
  /* ─── Page setup ─────────────────────────────────────────── */
  @page {
    size: A4 portrait;
    margin: 15mm 12mm;
  }

  /* ─── Force light theme ──────────────────────────────────── */
  :root {
    --background: 42 55% 97% !important;
    --foreground: 25 55% 15% !important;
    --card: 42 55% 97% !important;
    --card-foreground: 25 55% 15% !important;
    --popover: 42 55% 97% !important;
    --popover-foreground: 25 55% 15% !important;
    --primary: 32 95% 40% !important;
    --primary-foreground: 42 55% 97% !important;
    --secondary: 38 40% 90% !important;
    --secondary-foreground: 25 55% 15% !important;
    --muted: 38 40% 92% !important;
    --muted-foreground: 30 40% 40% !important;
    --accent: 38 70% 88% !important;
    --accent-foreground: 25 55% 15% !important;
    --destructive: 0 60% 45% !important;
    --destructive-foreground: 0 0% 100% !important;
    --border: 38 60% 78% !important;
    --input: 38 60% 78% !important;
    --ring: 32 95% 40% !important;
  }

  /* Remove dark class effect */
  html.dark,
  html.dark * {
    color-scheme: light !important;
  }

  html.dark {
    --background: 42 55% 97% !important;
    --foreground: 25 55% 15% !important;
    --card: 42 55% 97% !important;
    --card-foreground: 25 55% 15% !important;
    --primary: 32 95% 40% !important;
    --primary-foreground: 42 55% 97% !important;
    --muted: 38 40% 92% !important;
    --muted-foreground: 30 40% 40% !important;
    --border: 38 60% 78% !important;
  }

  /* ─── Document body ──────────────────────────────────────── */
  html, body {
    background: hsl(42 55% 97%) !important;
    color: hsl(25 55% 15%) !important;
    font-size: 10pt;
    line-height: 1.5;
  }

  /* ─── Hide non-printable UI ──────────────────────────────── */
  .no-print,
  header.sticky,
  button,
  [role="button"],
  [role="combobox"],
  .sonner-toaster,
  [data-sonner-toaster],
  nav {
    display: none !important;
  }

  /* The `no-print` class we set explicitly overrides this */
  .no-print.force-print {
    display: block !important;
  }

  /* ─── Container sizing ───────────────────────────────────── */
  .container,
  [class*="max-w-"] {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* ─── Remove screen-only effects ─────────────────────────── */
  * {
    box-shadow: none !important;
    text-shadow: none !important;
    backdrop-filter: none !important;
    transition: none !important;
    animation: none !important;
  }

  /* ─── Sections — avoid splitting mid-section ─────────────── */
  section,
  article,
  .card,
  [class*="rounded-"] {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* ─── Cards — border only, no shadow ────────────────────── */
  [class*="rounded-xl"],
  [class*="rounded-2xl"],
  [class*="rounded-lg"] {
    border: 1px solid hsl(38 60% 78%) !important;
    background: white !important;
    padding: 12pt !important;
    margin-bottom: 8pt !important;
  }

  /* ─── Charts ─────────────────────────────────────────────── */
  svg {
    max-width: 340px !important;
    height: auto !important;
    display: block;
    margin: 0 auto;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* Thinner strokes for print resolution */
  svg path,
  svg line,
  svg circle,
  svg rect,
  svg polygon {
    stroke-width: 1 !important;
  }

  /* Slightly smaller text inside charts */
  svg text {
    font-size: 10pt !important;
  }

  /* ─── Typography for paper ──────────────────────────────── */
  h1 {
    font-size: 24pt !important;
    line-height: 1.15 !important;
    margin-bottom: 6pt !important;
    color: hsl(25 55% 15%) !important;
  }

  h2 {
    font-size: 16pt !important;
    line-height: 1.2 !important;
    margin-bottom: 5pt !important;
    color: hsl(25 55% 15%) !important;
  }

  h3 {
    font-size: 12pt !important;
    line-height: 1.3 !important;
    margin-bottom: 4pt !important;
  }

  p, span, div, td, th, li {
    font-size: 10pt !important;
    color: inherit;
  }

  .text-xs { font-size: 8pt !important; }
  .text-sm { font-size: 9pt !important; }
  .text-base { font-size: 10pt !important; }
  .text-lg { font-size: 11pt !important; }
  .text-xl { font-size: 13pt !important; }
  .text-2xl { font-size: 16pt !important; }
  .text-3xl { font-size: 20pt !important; }

  /* ─── Force colors for emphasis ─────────────────────────── */
  .text-primary {
    color: hsl(32 95% 40%) !important;
  }

  .text-muted-foreground {
    color: hsl(30 40% 40%) !important;
  }

  .text-destructive {
    color: hsl(0 60% 45%) !important;
  }

  /* ─── Backgrounds — remove colored tints ────────────────── */
  [class*="bg-primary"],
  [class*="bg-accent"],
  [class*="bg-muted"],
  [class*="bg-emerald"],
  [class*="bg-amber"],
  [class*="bg-red"],
  [class*="bg-purple"],
  [class*="bg-blue"],
  [class*="bg-orange"],
  [class*="from-"] {
    background: white !important;
    background-image: none !important;
  }

  /* ─── Borders ────────────────────────────────────────────── */
  [class*="border-"] {
    border-color: hsl(38 60% 78%) !important;
  }

  /* ─── Links ──────────────────────────────────────────────── */
  a {
    color: hsl(32 95% 40%) !important;
    text-decoration: underline;
  }

  /* ─── Ornamental dividers stay ──────────────────────────── */
  [class*="OrnamentalDivider"],
  .ornamental-divider {
    margin: 12pt 0 !important;
  }

  /* ─── Page breaks ───────────────────────────────────────── */
  .print-page-break {
    page-break-before: always;
    break-before: page;
  }

  .print-avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* ─── Print footer ───────────────────────────────────────── */
  .print-footer {
    display: block !important;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 6mm 12mm 4mm;
    text-align: center;
    font-size: 8pt;
    color: hsl(30 40% 50%);
    border-top: 1px solid hsl(38 60% 78%);
    background: white;
  }

  /* ─── Sacred header ─────────────────────────────────────── */
  .sacred-header,
  header[class*="SacredHeader"] {
    page-break-after: avoid;
  }

  /* ─── Hide hidden elements ──────────────────────────────── */
  .hidden:not(.print-block) {
    display: none !important;
  }

  /* ─── Prevent orphaned headings ────────────────────────── */
  h1, h2, h3, h4, h5, h6 {
    break-after: avoid;
    page-break-after: avoid;
  }

  /* ─── Prevent awkward breaks in lists ───────────────────── */
  ul, ol, li {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* ─── Tables render cleanly ─────────────────────────────── */
  table {
    width: 100% !important;
    border-collapse: collapse !important;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  td, th {
    border: 1px solid hsl(38 60% 78%) !important;
    padding: 4pt 6pt !important;
  }

  th {
    background: hsl(38 40% 92%) !important;
    font-weight: 600 !important;
  }
}

/* ═══════════════════════════════════════════════════════════════
   PRINT PREVIEW MODE (optional, for on-screen preview)
   Activate by adding .print-preview to <body>
   ═══════════════════════════════════════════════════════════════ */
body.print-preview {
  background: #e5e5e5;
}

body.print-preview #root {
  max-width: 210mm;
  margin: 20mm auto;
  background: white;
  padding: 15mm 12mm;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

body.print-preview header.sticky,
body.print-preview .no-print {
  display: none !important;
}
``````

---

## 4. How to Use This Document

Paste the whole thing into an AI and ask:

- *"Find any TypeScript errors or unused imports across these files."*
- *"Where would I add a new section component, and what should it import?"*
- *"Which files import `@prisri/jyotish`? Are any outside `src/infrastructure/`?"*
- *"Show me every file that renders a `<Section>` â€” I want to see the pattern."*
- *"Is there any leftover Panchang-related code that is not wired in?"*

The AI will have the complete current state â€” no guessing.

