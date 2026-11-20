import Link from "next/link";
import { logoFile } from "@/lib/images";
import { getDict } from "@/lib/dictionaries";
import { href, type Lang } from "@/lib/i18n";
import { navFor, site, waLink } from "@/lib/site";
import LangSwitch from "./LangSwitch";

export default function Header({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const c = t.common;
  const nav = navFor(lang);
  const logo = logoFile();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={href(lang, "/")} className="brand" aria-label={c.homeAria(site.name)}>
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
        <div className="header-right">
          <nav aria-label={c.mainNav} className="nav-desktop">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
            <a className="btn btn-sm" href={waLink(t.wa.quote)} target="_blank" rel="noopener">{c.getQuote}</a>
          </nav>
          <LangSwitch lang={lang} label={c.language} />
          {/* No-JS mobile menu */}
          <details className="nav-mobile">
            <summary aria-label={c.openMenu}>
              <span /><span /><span />
            </summary>
            <nav aria-label={c.mobileNav}>
              {nav.map((n) => (
                <Link key={n.href} href={n.href}>{n.label}</Link>
              ))}
              <a className="btn" href={waLink(t.wa.quote)} target="_blank" rel="noopener">{c.getQuoteWa}</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
