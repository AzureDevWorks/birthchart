/**
 * Resolve a path inside /public to an absolute URL that respects
 * Vite's `base`. Works in dev and in the GitHub Pages build.
 *
 *   asset('ganesh.png')  ->  '/birthchart/ganesh.png'   (prod)
 *                        ->  '/ganesh.png'              (dev, base='/')
 */
export const asset = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
};