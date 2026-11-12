import Link from "next/link";
import { logoFile } from "@/lib/images";
import { nav, site, waLink } from "@/lib/site";

export default function Header() {
  const logo = logoFile();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="brand-logo" height={40} />
          ) : (
            <span className="brand-mark" aria-hidden="true">G</span>
          )}
          <span className="brand-text">
            Gita <em>Perfume Bottle</em>
          </span>
        </Link>
        <nav aria-label="Main" className="nav-desktop">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
          <a className="btn btn-sm" href={waLink()} target="_blank" rel="noopener">Get a quote</a>
        </nav>
        {/* No-JS mobile menu */}
        <details className="nav-mobile">
          <summary aria-label="Open menu">
            <span /><span /><span />
          </summary>
          <nav aria-label="Mobile">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
            <a className="btn" href={waLink()} target="_blank" rel="noopener">Get a quote on WhatsApp</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
