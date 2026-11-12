import Link from "next/link";
import ProductCard from "./ProductCard";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { categories, type Product } from "@/lib/products";
import { site } from "@/lib/site";

type Props = { title: string; intro: string; items: Product[]; active?: string };

export default function CatalogView({ title, intro, items, active }: Props) {
  const crumbs = [{ href: "/catalog", label: "Catalog" }];
  if (active) crumbs.push({ href: `/catalog/${active}`, label: title });
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <h1>{title}</h1>
          <p className="lead">{intro}</p>
        </div>
      </section>
      <section className="section section-tight">
        <div className="container">
          <nav aria-label="Product categories" className="chips">
            <Link href="/catalog" className={!active ? "chip active" : "chip"} aria-current={!active ? "page" : undefined}>All</Link>
            {categories.map((c) => (
              <Link key={c.slug} href={`/catalog/${c.slug}`} className={active === c.slug ? "chip active" : "chip"} aria-current={active === c.slug ? "page" : undefined}>
                {c.name}
              </Link>
            ))}
          </nav>
          <p className="muted small result-count">{items.length} products</p>
          <div className="product-grid">
            {items.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
          <aside className="note-box">
            <h2>Can’t find the right bottle?</h2>
            <p>We stock over 200 models and can source custom moulds. Send us a photo or reference and we’ll find a match.</p>
            <Link href="/contact" className="btn btn-sm">Ask our team</Link>
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
            url: `${site.url}/products/${p.slug}`,
            name: p.name,
          })),
        }}
      />
    </>
  );
}
