import Image from "next/image";
import { captionFromFile, facilityPhotos } from "@/lib/images";
import { getDict } from "@/lib/dictionaries";
import type { Lang } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";

// Descriptive alt text and captions per language live in lib/dictionaries.ts (keyed by file name);
// new photos fall back to their file name.
const key = (src: string) => src.split("/").pop()!.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "");

/**
 * Warehouse / ready-stock photos from /public/images/facility, shown in natural colour
 * (the files are colour-corrected; no cream wash). Renders nothing when the folder is empty.
 * "band":  full-width photo strip with a short heading (own section, home page).
 * "strip": just a row of photos, to drop inside another section (e.g. Why Gita).
 * "about": captioned gallery on the About page.
 * tone="bronze" gives a warm monochrome look instead of natural colour.
 */
export default function Warehouse({ variant, lang, tone = "natural" }: { variant: "band" | "strip" | "about"; lang: Lang; tone?: "natural" | "bronze" }) {
  const t = getDict(lang);
  const w = t.warehouse;
  const askStock = t.wa.stock;
  const caption = (src: string) => w.captions[key(src)] ?? captionFromFile(src);
  const altFor = (src: string) => w.alt(w.altText[key(src)] ?? caption(src), site.name, site.address.city);
  const photos = facilityPhotos();
  if (photos.length === 0) return null;
  const toneCls = tone === "bronze" ? " wh-bronze" : "";

  if (variant === "strip") {
    return (
      <div className={`wh-strip${toneCls}`}>
        {photos.slice(0, 3).map((src) => (
          <div key={src} className="wh-img"><Image src={src} alt={altFor(src)} fill sizes="(max-width: 640px) 50vw, 380px" /></div>
        ))}
      </div>
    );
  }

  if (variant === "band") {
    return (
      <section className={`wh-band-section${toneCls}`} aria-labelledby="stock-h">
        <div className="container wh-band-head">
          <div>
            <p className="eyebrow">{w.readyEyebrow}</p>
            <h2 id="stock-h">{w.bandH(site.address.city)}</h2>
          </div>
          <a href={waLink(askStock)} className="link-arrow" target="_blank" rel="noopener">{w.check}</a>
        </div>
        <div className="wh-band">
          {photos.slice(0, 3).map((src) => (
            <div key={src} className="wh-img"><Image src={src} alt={altFor(src)} fill sizes="(max-width: 640px) 100vw, 34vw" /></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="warehouse" className={`section${toneCls}`} aria-labelledby="stock-h">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{w.eyebrow}</p>
            <h2 id="stock-h">{w.aboutH(site.address.city)}</h2>
          </div>
          <a href={waLink(askStock)} className="link-arrow" target="_blank" rel="noopener">{w.check}</a>
        </div>
        <p className="lead">{w.aboutLead}</p>
        <div className="wh-gallery">
          {photos.map((src) => (
            <figure key={src} className="wh-figure">
              <div className="wh-img"><Image src={src} alt={altFor(src)} fill sizes="(max-width: 640px) 100vw, (max-width: 1180px) 33vw, 380px" /></div>
              <figcaption>{caption(src)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
