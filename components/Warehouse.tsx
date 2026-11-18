import Image from "next/image";
import Link from "next/link";
import { captionFromFile, facilityPhotos } from "@/lib/images";
import { site, waLink } from "@/lib/site";

// Descriptive alt text for the known photos (falls back to the file name for new ones).
const ALT: Record<string, string> = {
  "ready-stock-warehouse": "Stacked cartons of ready-stock perfume bottles",
  "cartons-of-perfume-bottles": "Cartons of 50 ml perfume spray bottles in stock",
  "bottle-stock-aisle": "Aisle of boxed perfume bottles ready to ship",
};
const altFor = (src: string) => {
  const key = src.split("/").pop()!.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "");
  return `${ALT[key] ?? captionFromFile(src)} at the ${site.name} warehouse in ${site.address.city}`;
};

const askStock = "Hello Gita, I'd like to check stock for a bottle model.";

/**
 * Warehouse / ready-stock photos from /public/images/facility.
 * "home": a split teaser, mirrored from the showroom one (copy left, photos right on desktop).
 * "about": a captioned photo gallery. Renders nothing when the folder is empty.
 */
export default function Warehouse({ variant }: { variant: "home" | "about" }) {
  const photos = facilityPhotos();
  if (photos.length === 0) return null;

  if (variant === "home") {
    const [main, , inset = photos[1]] = photos;
    return (
      <section className="section" aria-labelledby="stock-h">
        <div className="container showroom-split flip">
          <div className={`showroom-stack${inset ? "" : " single"}`}>
            <div className="showroom-main"><Image src={main} alt={altFor(main)} fill sizes="(max-width: 860px) 70vw, 420px" /></div>
            {inset && (
              <div className="showroom-inset"><Image src={inset} alt={altFor(inset)} fill sizes="(max-width: 860px) 40vw, 240px" /></div>
            )}
          </div>
          <div>
            <p className="eyebrow">Ready stock</p>
            <h2 id="stock-h">Thousands of bottles, <em>ready to ship</em></h2>
            <p className="lead">
              Our {site.address.city} warehouse keeps popular bottles, sprayers and caps boxed and on the shelf, so most
              orders are packed within 1–3 working days. Order a single piece or full cartons.
            </p>
            <div className="cta-row">
              <Link href="/catalog" className="btn">Browse the catalog</Link>
              <a href={waLink(askStock)} className="btn btn-ghost" target="_blank" rel="noopener">Check stock</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="warehouse" className="section" aria-labelledby="stock-h">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Our warehouse</p>
            <h2 id="stock-h">Large ready stock in {site.address.city}</h2>
          </div>
          <a href={waLink(askStock)} className="link-arrow" target="_blank" rel="noopener">Check stock</a>
        </div>
        <p className="lead">
          Thousands of cartons of perfume bottles, sprayers and caps are stored in our own warehouse, ready to pack and
          ship anywhere in Indonesia, or to pick up in person.
        </p>
        <div className="showroom-gallery warehouse-gallery">
          {photos.map((src) => (
            <figure key={src} className="showroom-figure">
              <div className="showroom-img"><Image src={src} alt={altFor(src)} fill sizes="(max-width: 640px) 100vw, (max-width: 1180px) 33vw, 380px" /></div>
              <figcaption>{captionFromFile(src)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
