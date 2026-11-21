import type { MetadataRoute } from "next";
import { href, locales } from "@/lib/i18n";
import { categories, products, sizePages } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamic = "force-static";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

// Every page appears once per language (/id/..., /en/...), each listing its other-language versions
// as hreflang alternates so Google pairs them.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (p: string) => `${site.url}${p}`;
  const pages: [string, Freq, number][] = [
    ["/", "weekly", 1],
    ["/catalog", "weekly", 0.9],
    ["/about", "monthly", 0.6],
    ["/contact", "monthly", 0.7],
    ...categories.map((c) => [`/catalog/${c.slug}`, "weekly", 0.8] as [string, Freq, number]),
    ...sizePages.map((s) => [`/catalog/${s.slug}`, "weekly", 0.8] as [string, Freq, number]),
    ...products.map((p) => [`/products/${p.slug}`, "monthly", 0.7] as [string, Freq, number]),
  ];
  return pages.flatMap(([path, changeFrequency, priority]) =>
    locales.map((lang) => ({
      url: u(href(lang, path)),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: { ...Object.fromEntries(locales.map((l) => [l, u(href(l, path))])), "x-default": u(path === "/" ? "/" : href("id", path)) } },
    }))
  );
}
