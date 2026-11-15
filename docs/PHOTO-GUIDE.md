# Photo guide for Gita Perfume Bottle

The website picks up photos automatically by **file name**. Put a photo in the right folder with
the right name, push, and Vercel rebuilds the site. Anything without a photo keeps the drawn placeholder.

All photos get the same soft, warm colour grade on the site so they match the cream-and-gold design.
Product photos on a **white background** blend into the cream cards, so the white disappears.

## What to send

| What | How many | Shape | Folder & file name |
|---|---|---|---|
| Each product | 1 main + up to 5 extra angles | Portrait 4:5 (e.g. 1600×2000) | `public/images/products/<product>.jpg`, `<product>-2.jpg` … `<product>-6.jpg` |
| Each category (optional) | 1 | Portrait 4:5 | `public/images/categories/<category>.jpg` |
| Home page hero | 1 | Portrait 4:5, min 1200×1500 | `public/images/hero.jpg` |
| About page (team or shop front) | 1 | Portrait 4:5 | `public/images/about.jpg` |
| Warehouse / workshop gallery | 4 (or 8) | Landscape 4:3 (e.g. 1600×1200) | `public/images/facility/01-warehouse.jpg`, `02-screen-printing.jpg` … |
| Client brand logos ("Trusted by" strip) | up to 12 | Any; PNG with transparent or plain background | `public/images/clients/01-Brand-Name.png` … |
| Logo (optional) | 1 | Transparent PNG or SVG | `public/images/logo.png` or `logo.svg` |

`<product>` is the product's web name, e.g. `casa-warna`. The full list is in `lib/products.ts`
(the `slug` field) and in each product page's address. Gallery captions come from the file name:
`02-screen-printing.jpg` shows as "Screen printing"; the number only sets the order.

Formats: JPG, PNG or WebP. Keep each file under ~2 MB; the site resizes them for phones.

## Client brand logos
Every logo in the "Trusted by" strip is shown in **its brand's original colours**, exactly as in the file.
What matters is a clean cutout:
- Best: PNG or SVG with a **transparent background**. A plain white or single-colour background also works
  if it is cleaned first (see below); a photo or busy background does not.
- Crop out taglines or partial text you don't want shown.
- The file name sets the order and the alt text: `03-Geamoore.png` shows third, labelled "Geamoore".
- New logos should be cleaned and sized like the existing ones (transparent, 600×200, equal visual weight).
  Send them to the developer, or run them through the same clean-up.
- Get each brand's permission before showing its logo.

## How to shoot so the site looks consistent

**Product photos (most important)**
- Plain **white or very light cream** background (a sheet of white paper or a light box is enough).
- Bottle **centred**, standing upright, the **same distance and height** for every product.
- Leave some empty space around the bottle; don't crop the cap or base.
- Soft daylight from a window or two lamps; avoid hard flash and coloured light.
- Same angle for every main photo (straight on). Use the extra photos for caps, details, colours.
- No props, hands, price tags or watermarks in the main photo.

**Warehouse, workshop and team photos**
- Shoot in **landscape**, in daylight if possible, with tidy shelves and good light.
- Warm light looks best. Strong blue or green fluorescent light still looks a bit cold even after the site's colour grade.
- Avoid faces of staff who haven't agreed to be on the website.
- Same-ish brightness across the set so the gallery looks even.

**Hero photo**
- A styled shot of a few best-selling bottles on a warm neutral surface (cream, beige, wood, marble).
- Portrait, with the bottles in the centre; the top corners are rounded off on the site.

## Fine-tuning the look (developer)
The colour grade lives in `app/globals.css`:
`--photo-grade` (filter), `--photo-wash` (cream wash colour) and `--photo-wash-strength`.
Set the strength to `0` and the grade to `none` to show photos untouched.
