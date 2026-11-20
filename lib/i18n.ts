// Languages of the site. Every page lives under /id/... (Indonesian) and /en/... (English).
// Visitors who open "/" or an old unprefixed link are sent to their browser's language by middleware.ts
// (Indonesian when the browser asks for neither). Keep this file free of Node APIs: middleware imports it.

export const locales = ["id", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLocale: Lang = "id";

/** Cookie that remembers a language picked with the switch, so it wins over the browser language. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isLang = (v: string | undefined): v is Lang => !!v && (locales as readonly string[]).includes(v);

/** Open Graph locale codes. */
export const ogLocale: Record<Lang, string> = { id: "id_ID", en: "en_US" };

/** Label shown in the switch, and the language's own name. */
export const langLabel: Record<Lang, { short: string; name: string }> = {
  id: { short: "ID", name: "Bahasa Indonesia" },
  en: { short: "EN", name: "English" },
};

/** "/catalog" -> "/id/catalog"; "/" -> "/id". */
export function href(lang: Lang, path: string) {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/**
 * Canonical + hreflang alternates for a page, for Next's `metadata.alternates`.
 * `path` is the language-neutral path ("/", "/catalog", "/products/x").
 * x-default points to "/" for the home page (which picks the visitor's language) and to the
 * Indonesian page elsewhere.
 */
export function alternates(lang: Lang, path: string) {
  return {
    canonical: href(lang, path),
    languages: {
      id: href("id", path),
      en: href("en", path),
      "x-default": path === "/" ? "/" : href(defaultLocale, path),
    },
  };
}

/**
 * Picks a language from an Accept-Language header ("en-US,en;q=0.9,id;q=0.8").
 * Highest-q tag that is English or Indonesian wins; Malay counts as Indonesian. Fallback: Indonesian.
 */
export function langFromAcceptLanguage(header: string | null | undefined): Lang {
  if (!header) return defaultLocale;
  const tags = header
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { base: tag.split("-")[0], q: q ? Number(q.slice(2)) || 0 : 1, i };
    })
    .filter((t) => t.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const t of tags) {
    if (t.base === "en") return "en";
    if (t.base === "id" || t.base === "in" || t.base === "ms") return "id";
  }
  return defaultLocale;
}
