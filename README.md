# Gita Perfume Bottle — website (Phase 1 mockup)

Next.js 15 (App Router) + TypeScript, plain CSS. No client-side JS needed for the mockup.

## Run
    npm install
    npm run dev            # http://localhost:3000

## Static build / preview
    STATIC_EXPORT=1 npm run build     # -> out/
    node scripts/make-preview.mjs     # -> preview/ (JS-free, relative links, opens from disk)

## Where things live
- `lib/site.ts` — company name, phone, WhatsApp, email, address, domain (remaining PLACEHOLDER values marked)
- `lib/products.ts` — categories and products (moves to a CMS/DB in Phase 2)
- `components/BottleArt.tsx` — SVG placeholder bottle illustrations; replace with real photos
- `app/` — pages: `/`, `/catalog`, `/catalog/[category]`, `/products/[slug]`, `/about`, `/contact`

## SEO included
Per-page title/description/canonical, Open Graph + Twitter cards, generated OG image,
`sitemap.xml`, `robots.txt`, JSON-LD (Organization, LocalBusiness, BreadcrumbList,
ItemList, Product, FAQPage), semantic HTML, mobile-first responsive layout.

## Environment variables
- `NEXT_PUBLIC_SITE_URL` — the live domain, e.g. `https://www.gitaperfumebottle.com` (defaults to the Vercel URL)
- Indexing: the production deployment is indexable by default; previews and local dev are always `noindex`. Set `NEXT_PUBLIC_ALLOW_INDEXING=0` to hide production too.

## Photos
Photos are picked up by file name from `public/images/` (products, categories, hero, about,
facility gallery, logo) and fall back to the drawn placeholders. Every photo gets a warm grade
to match the palette. See [docs/PHOTO-GUIDE.md](docs/PHOTO-GUIDE.md).

## Before launch
- Replace placeholder contact info, domain and copy; add real photos (see Photos)
- Hook the contact form to email/WhatsApp; add Google Search Console + Analytics
