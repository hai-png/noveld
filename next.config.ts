import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages — the dashboard is a client-side SPA
  // that calls the verifier-api on Render. No server-side rendering needed.
  output: "export",
  images: {
    unoptimized: true, // required for static export
  },
  // Generate a trailing slash on all routes (Cloudflare Pages needs this)
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
