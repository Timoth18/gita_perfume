import Image from "next/image";
import { captionFromFile, shippingPhotos } from "@/lib/images";
import { getDict } from "@/lib/dictionaries";
import type { Lang } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";

// Descriptive alt text and captions per language live in lib/dictionaries.ts (keyed by file name);
// new photos fall back to their file name.
const key = (src: string) => src.split("/").pop()!.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "");

/**
 * "From container to your door": shipping / logistics photos from /public/images/shipping,
 * shown as numbered steps in natural colour. Renders nothing when the folder is empty.
 */
export default function Shipping({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const s = t.shipping;
  const caption = (src: string) => s.captions[key(src)] ?? captionFromFile(src);
  const altFor = (src: string) => `${s.altText[key(src)] ?? caption(src)}, ${site.address.city}`;
  const photos = shippingPhotos().slice(0, 4);
  if (photos.length === 0) return null;
  return (
    <section className="section ship-section" aria-labelledby="ship-h">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 id="ship-h">{s.h1}<em>{s.hem}</em></h2>
          </div>
          <a href={waLink(t.wa.shipping)} className="link-arrow" target="_blank" rel="noopener">{s.ask}</a>
        </div>
        <p className="lead">{s.lead}</p>
        <ol className="ship-steps">
          {photos.map((src, i) => (
            <li key={src} className="ship-step">
              <div className="ship-img"><Image src={src} alt={altFor(src)} fill sizes="(max-width: 640px) 72vw, (max-width: 1024px) 45vw, 280px" /></div>
              <p className="ship-cap"><span className="usp-num">0{i + 1}</span> {caption(src)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
