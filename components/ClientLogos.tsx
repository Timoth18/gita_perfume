import { captionFromFile, clientLogos } from "@/lib/images";

// Shown until real logos are dropped into /public/images/clients. Fictional names, mockup only.
const SAMPLE = [
  { name: "Maison Lumière", style: "serif-italic" },
  { name: "OUDH & CO", style: "caps" },
  { name: "Senja Parfum", style: "serif" },
  { name: "NOIR ATELIER", style: "caps-wide" },
  { name: "Kirana", style: "script" },
  { name: "Aroma Nusa", style: "sans" },
];

export default function ClientLogos() {
  const logos = clientLogos();
  return (
    <section className="clients" aria-labelledby="clients-h">
      <div className="container">
        <h2 id="clients-h" className="clients-h">Trusted by perfume brands across Indonesia</h2>
        <ul className="clients-grid">
          {logos.length > 0
            ? logos.map((src) => {
                const name = captionFromFile(src);
                return (
                  <li key={src} className="client-logo" title={name}>
                    {/* The logo file is used as a mask and filled with one palette colour, so every brand matches the site */}
                    <span
                      className="logo-mask"
                      role="img"
                      aria-label={name}
                      style={{ WebkitMaskImage: `url("${src}")`, maskImage: `url("${src}")` }}
                    />
                  </li>
                );
              })
            : SAMPLE.map((s) => (
                <li key={s.name} className={`client-logo client-word ${s.style}`}>{s.name}</li>
              ))}
        </ul>
        {logos.length === 0 && <p className="clients-note">Sample logos. Real client logos go here.</p>}
      </div>
    </section>
  );
}
