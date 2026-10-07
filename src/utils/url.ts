/**
 * Build an absolute URL for a site path, honoring the subpath contained in
 * `site` (e.g. GitHub Pages project sites served under `/repo/`).
 *
 * @param path - Site path, e.g. `/scolarite/`.
 * @param site - The site's base URL (`Astro.site`).
 * @returns The absolute URL.
 */
export function absoluteUrl(path: string, site: URL): string {
  const base = site.pathname.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return new URL(base + suffix, site.origin).href;
}
