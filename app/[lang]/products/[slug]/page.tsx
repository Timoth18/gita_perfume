import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { productPhotos } from "@/lib/images";
import { notFound } from "next/navigation";
import BottleArt from "@/components/BottleArt";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import { getDict } from "@/lib/dictionaries";
import { alternates, href, isLang, locales, type Lang } from "@/lib/i18n";
import { getCategory, getProduct, getProducts, kindOf, productAlt, products, productsIn, productTitle } from "@/lib/products";
import { site, waLink } from "@/lib/site";

type Params = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const p = getProduct(slug, lang);
  if (!p) return {};
  const description = getDict(lang).meta.productDesc(p.summary, p.sizes.join(", "), p.moq);
  const title = productTitle(p, lang);
  return {
    title,
    description,
    alternates: alternates(lang, `/products/${p.slug}`),
    openGraph: { url: href(lang, `/products/${p.slug}`), title, description },
  };
}

export default async function ProductPage({ params }: Params) {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const t = getDict(lang);
  const tp = t.product;
  const p = getProduct(slug, lang);
  if (!p) notFound();
  const cat = getCategory(p.category, lang)!;
  const photos = productPhotos(p.slug);
  const related = productsIn(p.category, lang).filter((x) => x.slug !== p.slug).concat(getProducts(lang).filter((x) => x.featured && x.category !== p.category)).slice(0, 4);
  const specs: [string, string][] = [
    [tp.catalogName, p.code],
    ...(p.badge === "Pre-order" ? [[tp.availability, tp.preorder] as [string, string]] : []),
    [tp.sizesAvail, p.sizes.join(", ")],
    [tp.material, p.material],
    [tp.neck, p.neck],
    [tp.finishes, p.finishes.join(", ")],
    [tp.moq, p.moq],
    [tp.custom, tp.customVal],
  ];
  return (
    <>
      <section className="section section-tight">
        <div className="container">
          <Breadcrumbs lang={lang} items={[{ href: href(lang, "/catalog"), label: t.common.catalog }, { href: href(lang, `/catalog/${cat.slug}`), label: cat.name }, { href: href(lang, `/products/${p.slug}`), label: p.name }]} />
          <div className="pdp">
            <div className="pdp-gallery">
              {photos.length > 0 ? (
                <>
                  <div className="pdp-main has-photo">
                    <Image src={photos[0]} alt={productAlt(p, lang)} fill priority sizes="(max-width: 860px) 100vw, 560px" />
                  </div>
                  {photos.length > 1 && (
                    <div className="pdp-thumbs">
                      {photos.slice(1).map((src, i) => (
                        <a key={src} href={src} target="_blank" rel="noopener" className="pdp-thumb has-photo">
                          <Image src={src} alt={tp.photoN(productAlt(p, lang), i + 2)} fill sizes="140px" />
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
              <p className="eyebrow">{cat.name}{p.badge === "New" && <> · <strong>{tp.newBadge}</strong></>}</p>
              <h1>{p.name}</h1>
              <p className="pdp-kind">{kindOf(p, lang)} {p.sizes.join(", ")}</p>
              <p className="lead">{p.summary}</p>
              <div className="option-group">
                <p className="option-label">{tp.sizes}</p>
                <ul className="pills">{p.sizes.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div className="option-group">
                <p className="option-label">{tp.finishes}</p>
                <ul className="pills">{p.finishes.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div className="cta-row">
                <a className="btn" href={waLink(t.wa.product(p.name, p.code))} target="_blank" rel="noopener">{tp.quote}</a>
                <Link className="btn btn-ghost" href={href(lang, "/contact")}>{tp.ask}</Link>
              </div>
              <p className="muted small">{tp.priceNote}</p>
              <table className="spec-table">
                <caption>{tp.specs}</caption>
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
          <h2 id="rel-h">{tp.related}</h2>
          <div className="product-grid">{related.map((r) => <ProductCard key={r.slug} p={r} lang={lang} />)}</div>
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: productTitle(p, lang),
          sku: p.code,
          description: p.summary,
          category: cat.name,
          material: p.material,
          brand: { "@type": "Brand", name: site.name },
          url: `${site.url}${href(lang, `/products/${p.slug}`)}`,
          inLanguage: lang,
          ...(photos.length ? { image: photos.map((s) => `${site.url}${s}`) } : {}),
          // Phase 2: add image, offers (price / availability) once real data exists.
        }}
      />
    </>
  );
}
