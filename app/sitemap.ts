import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (p: string) => `${site.url}${p}`;
  return [
    { url: u("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: u("/catalog"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: u("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: u("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...categories.map((c) => ({ url: u(`/catalog/${c.slug}`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: u(`/products/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
