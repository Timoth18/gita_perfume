import Image from "next/image";
import { captionFromFile, shippingPhotos } from "@/lib/images";
import { site, waLink } from "@/lib/site";

// Descriptive alt text for the known photos (falls back to the file name for new ones).
const ALT: Record<string, string> = {
  "container-arrives": "Shipping container of perfume bottles arriving at the Gita Perfume Bottle warehouse at night",
  "unloading-into-the-warehouse": "Cartons of perfume bottles being unloaded from a container into the warehouse",
  "orders-packed-and-wrapped": "Customer orders of perfume bottles wrapped in bubble wrap and fragile tape, ready to ship",
  "loaded-for-delivery": "Boxed perfume bottles being loaded onto a truck for delivery",
};
const key = (src: string) => src.split("/").pop()!.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "");
const altFor = (src: string) => `${ALT[key(src)] ?? captionFromFile(src)}, ${site.address.city}`;

/**
 * "From container to your door": shipping / logistics photos from /public/images/shipping,
 * shown as numbered steps in natural colour. Renders nothing when the folder is empty.
 */
export default function Shipping() {
  const photos = shippingPhotos().slice(0, 4);
  if (photos.length === 0) return null;
  return (
    <section className="section ship-section" aria-labelledby="ship-h">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Shipping</p>
            <h2 id="ship-h">From container <em>to your door</em></h2>
          </div>
          <a href={waLink("Hello Gita, I'd like to ask about shipping to my city.")} className="link-arrow" target="_blank" rel="noopener">Ask about shipping</a>
        </div>
        <p className="lead">
          New stock arrives by the container load. Every order is wrapped in bubble wrap and fragile tape, then
          sent anywhere in Indonesia by truck, cargo or courier, or picked up from our warehouse.
        </p>
        <ol className="ship-steps">
          {photos.map((src, i) => (
            <li key={src} className="ship-step">
              <div className="ship-img"><Image src={src} alt={altFor(src)} fill sizes="(max-width: 640px) 72vw, (max-width: 1024px) 45vw, 280px" /></div>
              <p className="ship-cap"><span className="usp-num">0{i + 1}</span> {captionFromFile(src)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
