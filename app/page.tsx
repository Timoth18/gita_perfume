import Link from "next/link";
import Image from "next/image";
import { categoryPhoto, heroPhoto } from "@/lib/images";
import BottleArt from "@/components/BottleArt";
import ClientLogos from "@/components/ClientLogos";
import ProductCard from "@/components/ProductCard";
import Showroom from "@/components/Showroom";
import Shipping from "@/components/Shipping";
import Warehouse from "@/components/Warehouse";
import { categories, products } from "@/lib/products";
import { site, waLink } from "@/lib/site";

const steps = [
  { t: "Choose", d: "Pick a bottle, cap and box from the catalog, or send us a reference." },
  { t: "Customise", d: "Screen print, hot-stamp, frosting or colour spray. We send a digital proof." },
  { t: "Sample", d: "Approve a physical sample before mass production." },
  { t: "Deliver", d: "Packed safely and shipped anywhere in Indonesia, or picked up from our warehouse." },
];

const usps = [
  { t: "No Minimum Order", d: "No minimum order as long as stock is available." },
  { t: "Custom logo", d: "Printing, hot-stamping and engraving done in-house." },
  { t: "Ready stock", d: "Popular sizes ship within 1–3 working days." },
  { t: "Quality checked", d: "Every batch is leak-tested and inspected before packing." },
];

// Hidden until the client has real customer quotes. To bring the section back,
// replace these placeholders with real testimonials and set SHOW_TESTIMONIALS to true.
const SHOW_TESTIMONIALS = false;

const testimonials = [
  { q: "The square 50 ml bottles made our launch look premium at a price we could afford. Samples arrived in three days.", n: "Founder, local niche perfume brand" },
  { q: "Consistent quality across reorders, and the team answers WhatsApp quickly. Our refill shop relies on them.", n: "Owner, perfume refill shop" },
  { q: "They helped us match caps, pumps and boxes in one order, which saved us weeks.", n: "Brand manager, home-fragrance label" },
];

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const hero = heroPhoto();
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Perfume bottle manufacturer &amp; supplier</p>
            <h1>Bottles that make your fragrance <em>unforgettable</em></h1>
            <p className="lead">
              {site.name} supplies glass perfume bottles, atomizers, roll-ons, caps and custom packaging
              for perfume brands, refill shops and resellers. No minimum order, custom logo, fast delivery.
            </p>
            <div className="cta-row">
              <Link href="/catalog" className="btn">Browse the catalog</Link>
              <a href={waLink("Hello Gita, I'd like a quote for perfume bottles.")} className="btn btn-ghost" target="_blank" rel="noopener">
                Get a quote on WhatsApp
              </a>
            </div>
            <dl className="stats">
              <div><dt>Bottle models</dt><dd>200+</dd></div>
              <div><dt>Brands served</dt><dd>1,500+</dd></div>
              <div><dt>Minimum order</dt><dd>1 pc</dd></div>
            </dl>
          </div>
          {hero ? (
            <div className="hero-photo">
              <Image src={hero} alt={`Glass perfume bottles with gold, rose-gold and black caps on display at ${site.name}`} fill priority sizes="(max-width: 860px) 100vw, 520px" />
            </div>
          ) : (
            <div className="hero-art" aria-hidden="true">
              <div className="hero-bottle b1"><BottleArt shape="tall" glass="#dde3e6" cap="#1f1b16" /></div>
              <div className="hero-bottle b2"><BottleArt shape="square" glass="#e9dfd0" cap="#b08a4a" /></div>
              <div className="hero-bottle b3"><BottleArt shape="round" glass="#f2d9d0" cap="#b08a4a" /></div>
            </div>
          )}
        </div>
      </section>

      <ClientLogos />

      <section className="section" aria-labelledby="cat-h">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">What we make</p>
              <h2 id="cat-h">Product categories</h2>
            </div>
            <Link href="/catalog" className="link-arrow">View full catalog</Link>
          </div>
          <div className="cat-grid">
            {categories.map((c) => {
              const photo = categoryPhoto(c.slug);
              return (
              <Link key={c.slug} href={`/catalog/${c.slug}`} className="cat-tile">
                {photo ? (
                  <span className="cat-photo"><Image src={photo} alt={c.name} fill sizes="96px" /></span>
                ) : (
                  <BottleArt shape={c.shape} title={c.name} glass={c.shape === "box" ? "#2d2a26" : "#e9dfd0"} cap="#b08a4a" />
                )}
                <h3>{c.name}</h3>
                <p className="muted small">{c.blurb}</p>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="why-h">
        <div className="container">
          <p className="eyebrow">Why {site.shortName}</p>
          <h2 id="why-h">Everything your fragrance needs, from one supplier</h2>
          <ul className="usp-grid">
            {usps.map((u, i) => (
              <li key={u.t}>
                <span className="usp-num">0{i + 1}</span>
                <h3>{u.t}</h3>
                <p className="muted">{u.d}</p>
              </li>
            ))}
          </ul>
          <Warehouse variant="strip" />
        </div>
      </section>

      <section className="section" aria-labelledby="feat-h">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Best sellers</p>
              <h2 id="feat-h">Featured products</h2>
            </div>
            <Link href="/catalog" className="link-arrow">All products</Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <Showroom variant="home" />

      <section className="section section-dark" aria-labelledby="how-h">
        <div className="container">
          <p className="eyebrow">How to order</p>
          <h2 id="how-h">From idea to shelf in four steps</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.t}>
                <span className="step-num">{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Shipping />

      {SHOW_TESTIMONIALS && (
      <section className="section" aria-labelledby="test-h">
        <div className="container">
          <p className="eyebrow">Testimonials</p>
          <h2 id="test-h">Trusted by growing fragrance brands</h2>
          <div className="quote-grid">
            {testimonials.map((t) => (
              <figure key={t.n} className="quote">
                <blockquote>“{t.q}”</blockquote>
                <figcaption className="muted small">— {t.n}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      )}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Ready to bottle your next scent?</h2>
            <p>Tell us the size, quantity and finish you need. We reply within one working day.</p>
          </div>
          <div className="cta-row">
            <a href={waLink()} className="btn btn-light" target="_blank" rel="noopener">Chat on WhatsApp</a>
            <Link href="/contact" className="btn btn-outline-light">Contact form</Link>
          </div>
        </div>
      </section>
    </>
  );
}
