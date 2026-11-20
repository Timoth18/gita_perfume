// Central business info. Everything marked PLACEHOLDER must be confirmed by the client.
const shopeeUrl = "https://shopee.co.id/gifanbotolgrosir";

export const site = {
  name: "Gita Perfume Bottle",
  shortName: "Gita",
  tagline: "Perfume bottles & packaging, made to order",
  description:
    "Gita Perfume Bottle supplies glass perfume bottles, spray atomizers, roll-on bottles, caps and custom packaging for perfume brands, refill shops and resellers. No minimum order, custom logo printing, nationwide shipping.",
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
  phone: "+62 813-6666-5402",
  whatsapp: "6281366665402", // digits only, for wa.me links
  email: "gitaperfume@gmail.com",
  address: {
    street: "Jl. KH. Hasyim Ashari No. 137",
    city: "Jakarta Pusat",
    region: "DKI Jakarta",
    postalCode: "10140",
    country: "ID",
  },
  hours: "Mon–Sat, 08:00–17:00 WIB", // PLACEHOLDER
  founded: "2015", // PLACEHOLDER
  shopee: {
    url: shopeeUrl,
    handle: "gifanbotolgrosir",
  },
  // Official profiles, used for JSON-LD sameAs. Add Instagram / TikTok here once the client shares them.
  socials: {
    shopee: shopeeUrl,
  } as Record<string, string>,
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Google Maps search link for the showroom address (no API key needed). */
export const mapsQuery = `${site.address.street}, ${site.address.city} ${site.address.postalCode}, Indonesia`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;

export function waLink(text?: string) {
  const msg = text ?? `Hello ${site.name}, I'd like to ask about your products.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
}
