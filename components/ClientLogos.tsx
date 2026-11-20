import { captionFromFile, clientLogos } from "@/lib/images";
import { getDict } from "@/lib/dictionaries";
import type { Lang } from "@/lib/i18n";

// Shown until real logos are dropped into /public/images/clients. Fictional names, mockup only.
const SAMPLE = [
  { name: "Maison Lumière", style: "serif-italic" },
  { name: "OUDH & CO", style: "caps" },
  { name: "Senja Parfum", style: "serif" },
  { name: "NOIR ATELIER", style: "caps-wide" },
  { name: "Kirana", style: "script" },
  { name: "Aroma Nusa", style: "sans" },
];

export default function ClientLogos({ lang }: { lang: Lang }) {
  const t = getDict(lang).clients;
  const logos = clientLogos();
  return (
    <section className="clients" aria-labelledby="clients-h">
      <div className="container">
        <h2 id="clients-h" className="clients-h">{t.h}</h2>
        <ul className="clients-grid">
          {logos.length > 0
            ? logos.map((src) => {
                const name = captionFromFile(src);
                return (
                  <li key={src} className="client-logo" title={name}>
                    {/* Shown in each brand's original colours */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={name} className="logo-img" loading="lazy" width={600} height={200} />
                  </li>
                );
              })
            : SAMPLE.map((s) => (
                <li key={s.name} className={`client-logo client-word ${s.style}`}>{s.name}</li>
              ))}
        </ul>
        {logos.length === 0 && <p className="clients-note">{t.note}</p>}
      </div>
    </section>
  );
}
