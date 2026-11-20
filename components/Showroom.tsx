import Image from "next/image";
import Link from "next/link";
import { captionFromFile, showroomPhotos } from "@/lib/images";
import { getDict } from "@/lib/dictionaries";
import { href, type Lang } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";

const key = (src: string) => src.split("/").pop()!.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "");

/**
 * Showroom photos from /public/images/showroom.
 * "home": a split teaser (two overlapping photos + copy). "about": a captioned photo gallery.
 * Renders nothing when the folder is empty.
 */
export default function Showroom({ variant, lang }: { variant: "home" | "about"; lang: Lang }) {
  const t = getDict(lang);
  const s = t.showroom;
  const caption = (src: string) => s.captions[key(src)] ?? captionFromFile(src);
  const altFor = (src: string) => s.alt(caption(src), site.name, site.address.city);
  const photos = showroomPhotos();
  if (photos.length === 0) return null;

  if (variant === "home") {
    const [main, inset] = photos;
    return (
      <section className="section section-tint" aria-labelledby="showroom-h">
        <div className="container showroom-split">
          <div className={`showroom-stack${inset ? "" : " single"}`}>
            <div className="showroom-main"><Image src={main} alt={altFor(main)} fill sizes="(max-width: 860px) 70vw, 420px" /></div>
            {inset && (
              <div className="showroom-inset"><Image src={inset} alt={altFor(inset)} fill sizes="(max-width: 860px) 40vw, 240px" /></div>
            )}
          </div>
          <div>
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 id="showroom-h">{s.homeH1}<em>{s.homeHem}</em></h2>
            <p className="lead">{s.homeLead(site.address.city)}</p>
            <div className="cta-row">
              <Link href={`${href(lang, "/about")}#showroom`} className="btn">{s.tour}</Link>
              <a href={waLink(t.wa.visit)} className="btn btn-ghost" target="_blank" rel="noopener">
                {s.book}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="showroom" className="section section-tint" aria-labelledby="showroom-h">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 id="showroom-h">{s.aboutH}</h2>
          </div>
          <a href={waLink(t.wa.visit)} className="link-arrow" target="_blank" rel="noopener">{s.book}</a>
        </div>
        <p className="lead">{s.aboutLead(site.address.city, t.hours)}</p>
        <div className="showroom-gallery">
          {photos.map((src) => (
            <figure key={src} className="showroom-figure">
              <div className="showroom-img"><Image src={src} alt={altFor(src)} fill sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 560px" /></div>
              <figcaption>{caption(src)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
