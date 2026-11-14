import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { productPhotos } from "@/lib/images";
import { notFound } from "next/navigation";
import BottleArt from "@/components/BottleArt";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import { getCategory, getProduct, products, productsIn } from "@/lib/products";
import { site, waLink } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.summary} Sizes: ${p.sizes.join(", ")}. MOQ ${p.moq}.`,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { url: `/products/${p.slug}`, title: p.name },
  };
}

export default async function ProductPage({ params }: Params) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const photos = productPhotos(p.slug);
  const related = productsIn(p.category).filter((x) => x.slug !== p.slug).concat(products.filter((x) => x.featured && x.category !== p.category)).slice(0, 4);
  const specs: [string, string][] = [
    ["Catalog name", p.code],
    ...(p.badge === "Pre-order" ? [["Availability", "Pre-order"] as [string, string]] : []),
    ["Available sizes", p.sizes.join(", ")],
    ["Material", p.material],
    ["Neck / closure", p.neck],
    ["Finishes", p.finishes.join(", ")],
    ["Minimum order", p.moq],
    ["Customisation", "Screen print, hot-stamp, frosting, colour spray"],
  ];
  return (
    <>
      <section className="section section-tight">
        <div className="container">
          <Breadcrumbs items={[{ href: "/catalog", label: "Catalog" }, { href: `/catalog/${cat.slug}`, label: cat.name }, { href: `/products/${p.slug}`, label: p.name }]} />
          <div className="pdp">
            <div className="pdp-gallery">
              {photos.length > 0 ? (
                <>
                  <div className="pdp-main has-photo">
                    <Image src={photos[0]} alt={p.name} fill priority sizes="(max-width: 860px) 100vw, 560px" />
                  </div>
                  {photos.length > 1 && (
                    <div className="pdp-thumbs">
                      {photos.slice(1).map((src, i) => (
                        <a key={src} href={src} target="_blank" rel="noopener" className="pdp-thumb has-photo">
                          <Image src={src} alt={`${p.name}, photo ${i + 2}`} fill sizes="140px" />
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="pdp-main"><BottleArt shape={p.shape} glass={p.glass} cap={p.cap} title={p.name} /></div>
                  <div className="pdp-thumbs" aria-hidden="true">
                    {p.finishes.slice(0, 4).map((f, i) => (
                      <div key={f} className="pdp-thumb">
                        <BottleArt shape={p.shape} glass={["#e9dfd0", "#dde3e6", "#f2d9d0", "#d9d2e6"][i]} cap={p.cap} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="pdp-info">
              <p className="eyebrow">{cat.name}{p.badge === "New" && <> · <strong>New</strong></>}</p>
              <h1>{p.name}</h1>
              <p className="lead">{p.summary}</p>
              <div className="option-group">
                <p className="option-label">Sizes</p>
                <ul className="pills">{p.sizes.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div className="option-group">
                <p className="option-label">Finishes</p>
                <ul className="pills">{p.finishes.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div className="cta-row">
                <a className="btn" href={waLink(`Hello Gita, I'd like a quote for ${p.name} (${p.code}).`)} target="_blank" rel="noopener">Request a quote</a>
                <Link className="btn btn-ghost" href="/contact">Ask a question</Link>
              </div>
              <p className="muted small">Prices depend on quantity and customisation. We usually reply within one working day.</p>
              <table className="spec-table">
                <caption>Specifications</caption>
                <tbody>
                  {specs.map(([k, v]) => (
                    <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-tint" aria-labelledby="rel-h">
        <div className="container">
          <h2 id="rel-h">You may also need</h2>
          <div className="product-grid">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.summary,
          category: cat.name,
          material: p.material,
          brand: { "@type": "Brand", name: site.name },
          url: `${site.url}/products/${p.slug}`,
          ...(photos.length ? { image: photos.map((s) => `${site.url}${s}`) } : {}),
          // Phase 2: add image, offers (price / availability) once real data exists.
        }}
      />
    </>
  );
}
