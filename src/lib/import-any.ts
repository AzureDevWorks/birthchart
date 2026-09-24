/**
 * Sniffs a KundaliYatra backup file and dispatches it to the correct
 * importer.
 *
 * Two formats are supported:
 *   - '_app' === 'kundaliyatra-backup'  -> whole-app backup (importBackup)
 *   - '_app' === 'kundaliyatra-profile' -> single-profile snapshot
 *                                          (importProfileBundle)
 *
 * The goal is that a user never has to know which button matches which
 * file. Any import button in the app accepts either.
 */
import { importBackup, type ImportStats } from './backup';
import { importProfileBundle, type ProfileImportStats } from './profile-backup';

export type AnyImportResult =
  | { kind: 'app'; stats: ImportStats }
  | { kind: 'profile'; stats: ProfileImportStats };

export async function importAnyBackup(file: File): Promise<AnyImportResult> {
  const text = await file.text();

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }

  const marker = (parsed as { _app?: string } | null)?._app;

  if (marker === 'kundaliyatra-profile') {
    const stats = await importProfileBundle(file);
    return { kind: 'profile', stats };
  }

  if (marker === 'kundaliyatra-backup') {
    const stats = await importBackup(file);
    return { kind: 'app', stats };
  }

  throw new Error(
    'Unrecognized file. Expected a KundaliYatra backup or profile snapshot.'
  );
}

/** Human-readable summary of what an import actually did. */
export function summarizeImport(result: AnyImportResult): string {
  if (result.kind === 'profile') {
    const s = result.stats;
    const parts: string[] = [];
    if (s.profile === 'added') parts.push('profile added');
    if (s.profile === 'merged') parts.push('profile updated');
    const readings = s.readings.added + s.readings.merged;
    if (readings > 0) {
      parts.push(
        readings +
          ' reading(s) (' +
          s.readings.added +
          ' new, ' +
          s.readings.merged +
          ' updated)'
      );
    }
    const daily = s.dailyRashi.added + s.dailyRashi.merged;
    if (daily > 0) parts.push(daily + ' daily rashi record(s)');
    if (parts.length === 0) parts.push('nothing new - everything already present');
    return parts.join(' \u00b7 ');
  }

  const s = result.stats;
  const profiles = s.profiles.added + s.profiles.merged;
  const readings = s.readings.added + s.readings.merged;
  return (
    'Imported ' +
    profiles +
    ' profile(s) and ' +
    readings +
    ' reading(s).'
  );
}