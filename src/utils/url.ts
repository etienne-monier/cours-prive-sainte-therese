/**
 * Prefix a site path with the configured `base` (import.meta.env.BASE_URL),
 * so links keep working under a subpath deployment (GitHub Pages project
 * site) and stay correct at a domain root (`base` unset → `BASE_URL = "/"`).
 *
 * @param path - Site path, e.g. `/scolarite/`.
 * @returns The path prefixed with the base, e.g. `/repo/scolarite/`.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Strip the configured `base` prefix from a pathname, so route comparisons
 * (active menu state, breadcrumbs) work whether or not `Astro.url.pathname`
 * includes it.
 *
 * @param pathname - The pathname to normalize.
 * @returns The pathname without the base prefix.
 */
export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (base === "") return pathname;
  if (pathname === base) return "/";
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length);
  return pathname;
}

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
