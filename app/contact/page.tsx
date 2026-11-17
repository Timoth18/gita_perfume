import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { categories } from "@/lib/products";
import { site, waLink, mapsEmbed, mapsLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name} for perfume bottle quotes, samples and custom packaging. WhatsApp ${site.phone}, email ${site.email}.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const faqs = [
  { q: "What is your minimum order quantity?", a: "There is no minimum order: you can buy from 1 pc as long as the item is in stock. Custom printing and custom moulds may need a larger run; ask us for details." },
  { q: "Can you print my logo on the bottle?", a: "Yes. We offer screen printing, hot-stamping, frosting and colour spray. A digital proof is sent before production." },
  { q: "How long does production take?", a: "Ready-stock items ship in 1–3 working days. Custom orders usually take 2–4 weeks after sample approval." },
  { q: "Do you ship outside Jakarta?", a: "Yes, we ship to all of Indonesia via cargo and courier partners." },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ href: "/contact", label: "Contact" }]} />
          <h1>Contact us</h1>
          <p className="lead">Request a quote, order samples or ask about custom packaging. We reply within one working day.</p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container contact-grid">
          <div className="contact-cards">
            <a className="contact-card contact-wa" href={waLink()} target="_blank" rel="noopener">
              <span className="eyebrow">Fastest</span>
              <strong>WhatsApp</strong>
              <span>{site.phone}</span>
            </a>
            <a className="contact-card" href={`mailto:${site.email}`}>
              <span className="eyebrow">Email</span>
              <strong>{site.email}</strong>
            </a>
            <div className="contact-card">
              <span className="eyebrow">Warehouse &amp; showroom</span>
              <strong>{site.address.street}</strong>
              <span>{site.address.city} {site.address.postalCode}, Indonesia</span>
              <span className="muted small">{site.hours}</span>
            </div>
            <div className="map-embed">
              <iframe
                src={mapsEmbed}
                title={`Map: ${site.name} showroom, ${site.address.street}, ${site.address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a className="small" href={mapsLink} target="_blank" rel="noopener">Open in Google Maps</a>
            </div>
          </div>

          <form className="form" action="#" aria-labelledby="form-h">
            <h2 id="form-h">Send an enquiry</h2>
            <div className="form-row">
              <label>Name<input name="name" autoComplete="name" required /></label>
              <label>Company / brand<input name="company" autoComplete="organization" /></label>
            </div>
            <div className="form-row">
              <label>WhatsApp number<input name="phone" type="tel" autoComplete="tel" required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" /></label>
            </div>
            <div className="form-row">
              <label>Product interest
                <select name="category" defaultValue="">
                  <option value="" disabled>Choose a category</option>
                  {categories.map((c) => <option key={c.slug}>{c.name}</option>)}
                </select>
              </label>
              <label>Estimated quantity
                <select name="qty" defaultValue="">
                  <option value="" disabled>Choose a range</option>
                  <option>1–100 pcs</option><option>100–500 pcs</option><option>500–2,000 pcs</option><option>2,000+ pcs</option>
                </select>
              </label>
            </div>
            <label>Message<textarea name="message" rows={5} placeholder="Size, finish, logo printing, deadline…" /></label>
            <button type="submit" className="btn">Send enquiry</button>
            <p className="muted small">Mockup: the form will be connected to email / WhatsApp at deployment.</p>
          </form>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="faq-h">
        <div className="container narrow">
          <h2 id="faq-h">Frequently asked questions</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.name,
          url: site.url,
          telephone: site.phone,
          email: site.email,
          openingHours: "Mo-Sa 08:00-17:00",
          hasMap: mapsLink,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
