import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";

// Any unknown path under /id or /en shows the site's own 404 page (inside the normal header and footer).
// The one listed param only exists so the static export (STATIC_EXPORT=1) has something to build.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang, rest: ["404"] }));
}

export default function CatchAll() {
  notFound();
}
