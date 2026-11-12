import Link from "next/link";
import { categories } from "@/lib/products";
import { nav, site, waLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="brand-text footer-brand">Gita <em>Perfume Bottle</em></p>
          <p className="muted">{site.tagline}. Serving perfume brands, refill shops and resellers across Indonesia.</p>
        </div>
        <div>
          <h2 className="footer-h">Products</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/catalog/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-h">Company</h2>
          <ul>
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <address>
          <h2 className="footer-h">Contact</h2>
          <p>{site.address.street}<br />{site.address.city} {site.address.postalCode}, Indonesia</p>
          <p><a href={waLink()} target="_blank" rel="noopener">WhatsApp {site.phone}</a><br />
          <a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p className="muted">{site.hours}</p>
        </address>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span className="muted">Mockup — placeholder content &amp; images</span>
      </div>
    </footer>
  );
}
