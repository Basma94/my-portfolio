import type { NextConfig } from "next";

/**
 * The site is served as static files from GitHub Pages, so it exports rather
 * than runs. There is no server, no API route and no revalidation.
 *
 * `NEXT_PUBLIC_BASE_PATH` is empty for a custom domain or a user page, and
 * `/my-portfolio` for a project page. The deploy workflow sets it.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath,
  // Emit `toolkit/index.html` rather than `toolkit.html`, which is what a plain
  // static host resolves reliably for `/toolkit`.
  trailingSlash: true,
  // No image optimiser exists in an export.
  images: { unoptimized: true },
};

export default nextConfig;
