// Central business info. Everything marked PLACEHOLDER must be confirmed by the client.
export const site = {
  name: "Gita Perfume Bottle",
  shortName: "Gita",
  tagline: "Perfume bottles & packaging, made to order",
  description:
    "Gita Perfume Bottle supplies glass perfume bottles, spray atomizers, roll-on bottles, caps and custom packaging for perfume brands, refill shops and resellers. Low MOQ, custom logo printing, nationwide shipping.",
  // Real domain goes in NEXT_PUBLIC_SITE_URL at launch. Until then, use the Vercel URL
  // so canonical links, sitemap and social previews point at a page that exists.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://gitaperfume.vercel.app"),
  // Search engines may index the PRODUCTION deployment only. Vercel preview builds (one per PR)
  // and local dev stay noindex so duplicates never reach Google.
  // Set NEXT_PUBLIC_ALLOW_INDEXING=0 in Vercel to hide production too.
  allowIndexing: process.env.VERCEL_ENV === "production" && process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "0",
  locale: "en_US",
  phone: "+62 812-0000-0000", // PLACEHOLDER
  whatsapp: "6281200000000", // PLACEHOLDER (digits only, for wa.me links)
  email: "hello@gitaperfumebottle.com", // PLACEHOLDER
  address: {
    street: "Jl. Contoh Raya No. 123", // PLACEHOLDER
    city: "Jakarta",
    region: "DKI Jakarta",
    postalCode: "10110",
    country: "ID",
  },
  hours: "Mon–Sat, 08:00–17:00 WIB", // PLACEHOLDER
  founded: "2015", // PLACEHOLDER
  socials: {
    instagram: "https://instagram.com/", // PLACEHOLDER
    tiktok: "https://tiktok.com/", // PLACEHOLDER
    shopee: "https://shopee.co.id/", // PLACEHOLDER
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function waLink(text?: string) {
  const msg = text ?? `Hello ${site.name}, I'd like to ask about your products.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
}
