import Link from "next/link";
import { getDict } from "@/lib/dictionaries";
import { defaultLocale } from "@/lib/i18n";

// Not-found pages get no route params, so this one is in Indonesian (the default language)
// with the English line underneath.
export default function NotFound() {
  const t = getDict(defaultLocale).notFound;
  const en = getDict("en").notFound;
  return (
    <section className="section">
      <div className="container narrow" style={{ textAlign: "center" }}>
        <h1>{t.h}</h1>
        <p className="lead">{t.p}<br /><span className="muted" lang="en">{en.p}</span></p>
        <Link href={`/${defaultLocale}/catalog`} className="btn">{t.btn}</Link>
      </div>
    </section>
  );
}
