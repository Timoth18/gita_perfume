"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, langLabel, locales, type Lang } from "@/lib/i18n";

/**
 * ID | EN switch. Each option is a plain link to the same page in the other language (crawlable),
 * and clicking it remembers the choice in a cookie so "/" opens in that language next time.
 */
export default function LangSwitch({ lang, label }: { lang: Lang; label: string }) {
  const pathname = usePathname() || `/${lang}`;
  const rest = pathname.replace(/^\/(id|en)(?=\/|$)/, "");
  const remember = (l: Lang) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  };
  return (
    <nav className="lang-switch" aria-label={label}>
      {locales.map((l) =>
        l === lang ? (
          <span key={l} className="lang-opt active" aria-current="true" title={langLabel[l].name}>
            {langLabel[l].short}
          </span>
        ) : (
          <Link
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            className="lang-opt"
            title={langLabel[l].name}
            aria-label={langLabel[l].name}
            onClick={() => remember(l)}
          >
            {langLabel[l].short}
          </Link>
        )
      )}
    </nav>
  );
}
