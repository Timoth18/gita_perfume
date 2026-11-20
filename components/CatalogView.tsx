import Link from "next/link";
import ProductCard from "./ProductCard";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { getDict } from "@/lib/dictionaries";
import { href, type Lang } from "@/lib/i18n";
import { getCategories, type Product } from "@/lib/products";
import { site } from "@/lib/site";

type Props = { lang: Lang; title: string; intro: string; items: Product[]; active?: string };

export default function CatalogView({ lang, title, intro, items, active }: Props) {
  const d = getDict(lang);
  const t = d.catalog;
  const categories = getCategories(lang);
  const crumbs = [{ href: href(lang, "/catalog"), label: d.common.catalog }];
  if (active) crumbs.push({ href: href(lang, `/catalog/${active}`), label: title });
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs lang={lang} items={crumbs} />
          <h1>{title}</h1>
          <p className="lead">{intro}</p>
        </div>
      </section>
      <section className="section section-tight">
        <div className="container">
          <nav aria-label={t.catsAria} className="chips">
            <Link href={href(lang, "/catalog")} className={!active ? "chip active" : "chip"} aria-current={!active ? "page" : undefined}>{t.all}</Link>
            {categories.map((c) => (
              <Link key={c.slug} href={href(lang, `/catalog/${c.slug}`)} className={active === c.slug ? "chip active" : "chip"} aria-current={active === c.slug ? "page" : undefined}>
                {c.name}
              </Link>
            ))}
          </nav>
          <p className="muted small result-count">{t.count(items.length)}</p>
          <div className="product-grid">
            {items.map((p) => <ProductCard key={p.slug} p={p} lang={lang} />)}
          </div>
          <aside className="note-box">
            <h2>{t.noteH}</h2>
            <p>{t.noteP}</p>
            <Link href={href(lang, "/contact")} className="btn btn-sm">{t.noteBtn}</Link>
          </aside>
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: title,
          itemListElement: items.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}${href(lang, `/products/${p.slug}`)}`,
            name: p.name,
          })),
        }}
      />
    </>
  );
}
