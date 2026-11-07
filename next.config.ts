import type { NextConfig } from 'next';

// GitHub Pages builds (the Pages workflow sets GITHUB_PAGES) export plain static files to out/, served under the
// repo's base path (/portofolio, or none for a <user>.github.io repo). Vercel builds keep the normal Next.js output.
const pages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = pages
  ? {
      output: 'export',
      basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
      trailingSlash: true,
      images: { unoptimized: true }, // Pages has no image optimizer
    }
  : {};

export default nextConfig;
