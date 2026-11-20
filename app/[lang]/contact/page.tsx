import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ShopeeIcon from "@/components/ShopeeIcon";
import WaForm from "@/components/WaForm";
import { buildingPhoto } from "@/lib/images";
import { getDict } from "@/lib/dictionaries";
import { alternates, href, isLang, type Lang } from "@/lib/i18n";
import { getCategories } from "@/lib/products";
import { site, waLink, mapsEmbed, mapsLink } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang).meta;
  const description = t.contactDesc(site.name, site.phone, site.email);
  return {
    title: t.contactTitle,
    description,
    alternates: alternates(lang, "/contact"),
    openGraph: { url: href(lang, "/contact"), title: t.contactTitle, description },
  };
}

export default async function ContactPage({ params }: Props) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const c = t.contact;
  const faqs = c.faqs;
  const categories = getCategories(lang);
  const building = buildingPhoto();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs lang={lang} items={[{ href: href(lang, "/contact"), label: t.common.contact }]} />
          <h1>{c.h1}</h1>
          <p className="lead">{c.lead}</p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container contact-grid">
          <div className="contact-cards">
            <a className="contact-card contact-wa" href={waLink(t.wa.default)} target="_blank" rel="noopener">
              <span className="eyebrow">{c.fastest}</span>
              <strong>WhatsApp</strong>
              <span>{site.phone}</span>
            </a>
            <a className="contact-card contact-shop" href={site.shopee.url} target="_blank" rel="noopener">
              <span className="contact-shop-icon"><ShopeeIcon size={24} /></span>
              <span className="eyebrow">{c.orderOnline}</span>
              <strong>{c.shopee}</strong>
              <span>shopee.co.id/{site.shopee.handle}</span>
            </a>
            <a className="contact-card" href={`mailto:${site.email}`}>
              <span className="eyebrow">{c.email}</span>
              <strong>{site.email}</strong>
            </a>
            <div className="contact-card">
              <span className="eyebrow">{c.showroom}</span>
              <strong>{site.address.street}</strong>
              <span>{site.address.city} {site.address.postalCode}, Indonesia</span>
              <span className="muted small">{t.hours}</span>
            </div>
            <div className="map-embed">
              <iframe
                src={mapsEmbed}
                title={c.mapTitle(site.name, site.address.street, site.address.city)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a className="small" href={mapsLink} target="_blank" rel="noopener">{c.openMaps}</a>
            </div>
            {building && (
              <figure className="building">
                <div className="building-img">
                  <Image src={building} alt={c.buildingAlt(site.name, site.address.street, site.address.city)} fill sizes="(max-width: 860px) 100vw, 520px" />
                </div>
                <figcaption><strong>{c.buildingH}</strong><span className="muted small">{c.buildingP}</span></figcaption>
              </figure>
            )}
          </div>

          <WaForm className="form" aria-labelledby="form-h" number={site.whatsapp} greeting={t.wa.default}
            labels={{ name: c.name, company: c.company, phone: c.phone, email: c.emailLabel, category: lang === "id" ? "Produk" : "Product", qty: lang === "id" ? "Jumlah" : "Quantity", message: c.message }}>
            <h2 id="form-h">{c.formH}</h2>
            <div className="form-row">
              <label>{c.name}<input name="name" autoComplete="name" required /></label>
              <label>{c.company}<input name="company" autoComplete="organization" /></label>
            </div>
            <div className="form-row">
              <label>{c.phone}<input name="phone" type="tel" autoComplete="tel" required /></label>
              <label>{c.emailLabel}<input name="email" type="email" autoComplete="email" /></label>
            </div>
            <div className="form-row">
              <label>{c.interest}
                <select name="category" defaultValue="">
                  <option value="" disabled>{c.chooseCat}</option>
                  {categories.map((c) => <option key={c.slug}>{c.name}</option>)}
                </select>
              </label>
              <label>{c.qty}
                <select name="qty" defaultValue="">
                  <option value="" disabled>{c.chooseRange}</option>
                  {(lang === "id" ? ["1–100 pcs", "100–500 pcs", "500–2.000 pcs", "2.000+ pcs"] : ["1–100 pcs", "100–500 pcs", "500–2,000 pcs", "2,000+ pcs"]).map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <label>{c.message}<textarea name="message" rows={5} placeholder={c.messagePh} /></label>
            <button type="submit" className="btn">{c.send}</button>
            <p className="muted small">{c.formNote}</p>
          </WaForm>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="faq-h">
        <div className="container narrow">
          <h2 id="faq-h">{c.faqH}</h2>
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
          sameAs: Object.values(site.socials),
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
          inLanguage: lang,
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
