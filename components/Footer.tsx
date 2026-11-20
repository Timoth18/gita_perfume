import Link from "next/link";
import { getDict } from "@/lib/dictionaries";
import { href, type Lang } from "@/lib/i18n";
import { getCategories } from "@/lib/products";
import { navFor, site, waLink } from "@/lib/site";
import ShopeeIcon from "./ShopeeIcon";

export default function Footer({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const t = d.footer;
  const categories = getCategories(lang);
  const nav = navFor(lang);
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="brand-text footer-brand">Gita <em>Perfume Bottle</em></p>
          <p className="muted">{t.blurb(d.meta.tagline)}</p>
        </div>
        <div>
          <h2 className="footer-h">{t.products}</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}><Link href={href(lang, `/catalog/${c.slug}`)}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-h">{t.company}</h2>
          <ul>
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <address>
          <h2 className="footer-h">{t.contact}</h2>
          <p>{site.address.street}<br />{site.address.city} {site.address.postalCode}, Indonesia</p>
          <p><a href={waLink(d.wa.default)} target="_blank" rel="noopener">WhatsApp {site.phone}</a><br />
          <a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p><a className="footer-shop" href={site.shopee.url} target="_blank" rel="noopener"><ShopeeIcon size={16} /> {t.shopee}</a></p>
          <p className="muted">{d.hours}</p>
        </address>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {t.rights(site.name)}</span>
      </div>
    </footer>
  );
}
