/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export keeps the mockup host-anywhere. Remove for Phase 2 (dynamic catalog / CMS).
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,
  // Vercel optimises photos automatically; the static export cannot.
  images: { unoptimized: process.env.STATIC_EXPORT === "1" },
  trailingSlash: false,
};
export default nextConfig;
