# Dev Artifacts

This folder holds development-time scripts, probe outputs, and snapshots.
None of it is used by the app at runtime. It exists so the project root
stays clean.

## Folders

### `probes/`
Node.js scripts (`.mjs`) that dump the shape of library APIs during
development. Used to verify return values before writing adapters.

- `ashtakavarga-probe.mjs` — dumps SAV/BAV shapes
- `festivals-explore.mjs` — dumps festival API surface
- `gochar-explore.mjs` — dumps transit analysis shape
- `matching-probe.mjs` — dumps Guna Milan result
- `predictions-explore.mjs` — dumps Career/Wealth/Marriage/etc.

### `outputs/`
Saved console output from the probes above. Useful for reference when
writing or debugging an adapter.

### `backups/`
Snapshot folders created by fix/cleanup scripts before making bulk
changes. Ignored by git.

### `scripts/`
Utility PowerShell scripts used during development.

- `fix-kundaliyatra.ps1` — bulk cleanup + repair script
- `scan-src.ps1` — scans source for color patterns and issues

### `snapshots/`
Full source scans (AI-CONTEXT-SCAN.md etc.) taken at points in time.

## Usage

These are not part of the build. Safe to delete any of them at any time.