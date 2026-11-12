/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export keeps the mockup host-anywhere. Remove for Phase 2 (dynamic catalog / CMS).
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,
  images: { unoptimized: true },
  trailingSlash: false,
};
export default nextConfig;
