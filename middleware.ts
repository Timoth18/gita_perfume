import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, isLang, langFromAcceptLanguage } from "@/lib/i18n";

// Every page lives under /id or /en. A request without a language prefix ("/", or an old link such as
// "/catalog") is redirected to the visitor's language: the language they picked with the switch (cookie),
// else their browser / device language (Accept-Language), else Indonesian.
// Search engine crawlers send no Accept-Language, so they land on Indonesian and find English via hreflang.
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLang(first)) return NextResponse.next();

  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  const lang = isLang(saved) ? saved : langFromAcceptLanguage(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Vary", "Accept-Language, Cookie");
  return res;
}

export const config = {
  // Skip Next internals, metadata routes (robots, sitemap, icons, OG image) and any file with an extension
  // (photos, the Search Console verification file).
  matcher: ["/((?!_next/|api/|opengraph-image|icon|apple-icon|.*\\..*).*)"],
};
