import Image from "next/image";
import Link from "next/link";
import { captionFromFile, showroomPhotos } from "@/lib/images";
import { site, waLink } from "@/lib/site";

const altFor = (src: string) => `${captionFromFile(src)} at the ${site.name} showroom in ${site.address.city}`;

/**
 * Showroom photos from /public/images/showroom.
 * "home": a split teaser (two overlapping photos + copy). "about": a captioned photo gallery.
 * Renders nothing when the folder is empty.
 */
export default function Showroom({ variant }: { variant: "home" | "about" }) {
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
            <p className="eyebrow">Our showroom</p>
            <h2 id="showroom-h">See every bottle <em>in person</em></h2>
            <p className="lead">
              Walk through hundreds of bottles, caps and closures on display in {site.address.city}. Hold the glass,
              compare finishes and match caps before you order.
            </p>
            <div className="cta-row">
              <Link href="/about#showroom" className="btn">Tour the showroom</Link>
              <a href={waLink("Hello Gita, I'd like to visit your showroom.")} className="btn btn-ghost" target="_blank" rel="noopener">
                Book a visit
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
            <p className="eyebrow">Our showroom</p>
            <h2 id="showroom-h">Come and see the collection</h2>
          </div>
          <a href={waLink("Hello Gita, I'd like to visit your showroom.")} className="link-arrow" target="_blank" rel="noopener">Book a visit</a>
        </div>
        <p className="lead">
          Our showroom in {site.address.city} displays hundreds of bottle models, caps and closures side by side,
          so you can compare glass, weight and finish before choosing. Visits are welcome {site.hours}.
        </p>
        <div className="showroom-gallery">
          {photos.map((src) => (
            <figure key={src} className="showroom-figure">
              <div className="showroom-img"><Image src={src} alt={altFor(src)} fill sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 560px" /></div>
              <figcaption>{captionFromFile(src)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
