import Image from "next/image";
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
 * Warehouse / ready-stock photos from /public/images/facility, shown in natural colour
 * (the files are colour-corrected; no cream wash). Renders nothing when the folder is empty.
 * "band":  full-width photo strip with a short heading (own section, home page).
 * "strip": just a row of photos, to drop inside another section (e.g. Why Gita).
 * "about": captioned gallery on the About page.
 * tone="bronze" gives a warm monochrome look instead of natural colour.
 */
export default function Warehouse({ variant, tone = "natural" }: { variant: "band" | "strip" | "about"; tone?: "natural" | "bronze" }) {
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
            <p className="eyebrow">Ready stock</p>
            <h2 id="stock-h">Thousands of bottles in our {site.address.city} warehouse</h2>
          </div>
          <a href={waLink(askStock)} className="link-arrow" target="_blank" rel="noopener">Check stock</a>
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
            <p className="eyebrow">Our warehouse</p>
            <h2 id="stock-h">Large ready stock in {site.address.city}</h2>
          </div>
          <a href={waLink(askStock)} className="link-arrow" target="_blank" rel="noopener">Check stock</a>
        </div>
        <p className="lead">
          Thousands of cartons of perfume bottles, sprayers and caps are stored in our own warehouse, ready to pack and
          ship anywhere in Indonesia, or to pick up in person.
        </p>
        <div className="wh-gallery">
          {photos.map((src) => (
            <figure key={src} className="wh-figure">
              <div className="wh-img"><Image src={src} alt={altFor(src)} fill sizes="(max-width: 640px) 100vw, (max-width: 1180px) 33vw, 380px" /></div>
              <figcaption>{captionFromFile(src)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
