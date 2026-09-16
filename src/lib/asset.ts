/**
 * Base path the site is served under.
 *
 * Empty for a custom domain or a user page (`basma94.github.io`); `/my-portfolio`
 * for a GitHub Pages project page. Set by the deploy workflow at build time —
 * see `.github/workflows/deploy.yml`.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a file in `public/` with the base path.
 *
 * `next/link` and the router apply `basePath` themselves, but a raw `<img src>`
 * is left alone, so anything pointing at `public/` has to go through here or it
 * 404s when the site is served from a subdirectory.
 */
export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://basma94.github.io/my-portfolio";

/**
 * Absolute URL for a file in `public/`, for contexts that need a fully
 * qualified link (e.g. a server-side fetch that can't resolve a relative
 * path) rather than a browser-resolved one. `SITE_URL` already carries the
 * base path for a project page, so only its origin is combined with `asset()`
 * to avoid doubling that path.
 */
export function absoluteAsset(path: string): string {
  return `${new URL(SITE_URL).origin}${asset(path)}`;
}
