import en from './en.json';
import hi from './hi.json';
import ne from './ne.json';

/**
 * Compile-time guarantee that every locale matches the English shape.
 *
 * Because `tsconfig.app.json` sets `resolveJsonModule: true`, `typeof en`
 * is the exact literal shape of `en.json`. Assigning `hi` and `ne` to
 * that shape makes TypeScript fail the build if any locale is missing a
 * key that English has.
 *
 * The values are exported so `tsc` does not flag them as unused locals
 * (this project has `noUnusedLocals: true`). They are never imported
 * anywhere — the file is only ever loaded via a side-effect import in
 * `src/i18n/index.ts`, so the bundler tree-shakes these exports out.
 *
 * Do not import these names. Do not delete this file.
 */

type LocaleShape = typeof en;

export const _checkHi: LocaleShape = hi;
export const _checkNe: LocaleShape = ne;
