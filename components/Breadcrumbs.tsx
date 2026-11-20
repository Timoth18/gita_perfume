import Link from "next/link";
import JsonLd from "./JsonLd";
import { getDict } from "@/lib/dictionaries";
import { href, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

type Crumb = { href: string; label: string };

export default function Breadcrumbs({ items, lang }: { items: Crumb[]; lang: Lang }) {
  const c = getDict(lang).common;
  const all = [{ href: href(lang, "/"), label: c.home }, ...items];
  return (
    <>
      <nav aria-label={c.breadcrumb} className="breadcrumbs">
        <ol>
          {all.map((c, i) => (
            <li key={c.href}>
              {i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: new URL(c.href, site.url).toString(),
          })),
        }}
      />
    </>
  );
}
