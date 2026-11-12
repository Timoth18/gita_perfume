import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { aboutPhoto, captionFromFile, facilityPhotos } from "@/lib/images";
import BottleArt from "@/components/BottleArt";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `The story of ${site.name}: a perfume bottle and packaging supplier helping fragrance brands across Indonesia launch and grow since ${site.founded}.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const timeline = [
  { y: "2015", t: "Started as a small bottle reseller serving local refill shops." },
  { y: "2018", t: "Opened our own warehouse and began in-house screen printing." },
  { y: "2021", t: "Added packaging boxes and caps for one-stop ordering." },
  { y: "2024", t: "Passed 1,500 brands served across Indonesia." },
];

const values = [
  { t: "Quality first", d: "Every batch is checked for chips, leaks and print accuracy before it leaves us." },
  { t: "Honest pricing", d: "Clear quotes with no hidden costs, and fair prices for small brands." },
  { t: "Fast response", d: "Real people on WhatsApp who know the products and answer quickly." },
];

export default function AboutPage() {
  const story = aboutPhoto();
  const facility = facilityPhotos();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ href: "/about", label: "About" }]} />
          <h1>About {site.name}</h1>
          <p className="lead">We help fragrance makers turn a scent into a product people want to hold.</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Our story</p>
            <h2>From a small reseller to a one-stop bottle partner</h2>
            <p>
              {site.name} began in {site.founded} supplying bottles to neighbourhood perfume refill shops.
              As our customers grew into brands, we grew with them, adding custom printing, premium caps
              and packaging so they could source everything from one trusted partner.
            </p>
            <p>
              Today we serve independent perfumers, home-fragrance labels, refill shops and marketplace
              sellers across Indonesia, from first sample to repeat production.
            </p>
            <p className="muted small"><em>Placeholder copy. Replace with the client’s real story.</em></p>
          </div>
          {story ? (
            <div className="about-photo"><Image src={story} alt={`The ${site.name} team`} fill sizes="(max-width: 860px) 100vw, 480px" /></div>
          ) : (
            <div className="about-art" aria-hidden="true">
              <BottleArt shape="flask" glass="#e7e0c9" cap="#6b4f2a" />
              <BottleArt shape="rollon" glass="#e8d6b8" cap="#b08a4a" />
            </div>
          )}
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="val-h">
        <div className="container">
          <p className="eyebrow">What we stand for</p>
          <h2 id="val-h">Our values</h2>
          <ul className="usp-grid usp-3">
            {values.map((v, i) => (
              <li key={v.t}><span className="usp-num">0{i + 1}</span><h3>{v.t}</h3><p className="muted">{v.d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="tl-h">
        <div className="container">
          <p className="eyebrow">Milestones</p>
          <h2 id="tl-h">Our journey</h2>
          <ol className="timeline">
            {timeline.map((m) => (
              <li key={m.y}><span className="tl-year">{m.y}</span><p>{m.t}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="fac-h">
        <div className="container">
          <p className="eyebrow">Facility</p>
          <h2 id="fac-h">Warehouse &amp; printing workshop</h2>
          <div className="gallery">
            {facility.length > 0
              ? facility.map((src) => (
                  <figure key={src} className="ph-img has-photo">
                    <Image src={src} alt={captionFromFile(src)} fill sizes="(max-width: 860px) 50vw, 280px" />
                    <figcaption>{captionFromFile(src)}</figcaption>
                  </figure>
                ))
              : ["Warehouse", "Screen printing", "Quality control", "Packing"].map((t) => (
                  <figure key={t} className="ph-img"><span>{t}</span><figcaption className="sr-only">{t} photo placeholder</figcaption></figure>
                ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div><h2>Let’s build your next bottle together</h2><p>Talk to our team about sizes, finishes and quantities.</p></div>
          <div className="cta-row"><Link href="/contact" className="btn btn-light">Contact us</Link></div>
        </div>
      </section>
    </>
  );
}
