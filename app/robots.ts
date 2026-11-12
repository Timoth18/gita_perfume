import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Production stays crawlable even while hidden (NEXT_PUBLIC_ALLOW_INDEXING=0): Google must be able
  // to fetch a page to see its "noindex" tag and drop it. Blocking crawling would leave already-indexed
  // URLs in search. Preview deployments and local dev are blocked outright.
  const isProduction = process.env.VERCEL_ENV === "production";
  return {
    rules: isProduction ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    ...(site.allowIndexing ? { sitemap: `${site.url}/sitemap.xml` } : {}),
    host: site.url,
  };
}
