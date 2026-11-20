"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Search box for the catalog. Filters the product cards already on the page (each card carries a
 * data-search string with its name, catalog code, sizes, category and finishes in both languages),
 * so it needs no server and the full list still shows without JavaScript.
 * Every word typed must match; "30ml" and "30 ml" both work.
 */
export default function CatalogSearch({ label, placeholder, countLabel, noResults }: {
  label: string;
  placeholder: string;
  countLabel: { one: string; many: string };
  noResults: string;
}) {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = ref.current?.closest("section") ?? document;
    const cards = Array.from(scope.querySelectorAll<HTMLElement>("[data-search]"));
    const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let n = 0;
    for (const card of cards) {
      const hay = card.dataset.search!.toLowerCase();
      const squashed = hay.replace(/\s+/g, "");
      const hit = words.every((w) => hay.includes(w) || squashed.includes(w));
      card.hidden = !hit;
      if (hit) n++;
    }
    setShown(words.length ? n : null);
    const count = scope.querySelector<HTMLElement>(".result-count");
    if (count) count.textContent = (n === 1 ? countLabel.one : countLabel.many).replace("{n}", String(n));
  }, [q, countLabel]);

  return (
    <div className="catalog-search" ref={ref}>
      <label className="sr-only" htmlFor="catalog-q">{label}</label>
      <input
        id="catalog-q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
      />
      {shown === 0 && <p className="muted catalog-empty" role="status">{noResults}</p>}
    </div>
  );
}
