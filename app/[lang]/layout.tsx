import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import JsonLd from "@/components/JsonLd";
import { getDict } from "@/lib/dictionaries";
import { alternates, isLang, locales, ogLocale, type Lang } from "@/lib/i18n";
import { heroPhoto, logoFile } from "@/lib/images";
import { businessId, businessLd, site } from "@/lib/site";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang).meta;
  return {
    metadataBase: new URL(site.url),
    title: { default: t.homeTitle, template: `%s | ${site.name}` },
    description: t.description,
    applicationName: site.name,
    keywords: t.keywords,
    alternates: alternates(lang, "/"),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      url: `/${lang}`,
      title: t.homeTitle,
      description: t.description,
    },
    twitter: { card: "summary_large_image", title: t.homeTitle, description: t.description },
    robots: site.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f2ea",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang as Lang);
  const orgLd = businessLd(lang, t.meta.description, { image: heroPhoto(), logo: logoFile() });
  const webLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/${lang}`,
    inLanguage: lang,
    publisher: { "@id": businessId },
  };
  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">{t.common.skip}</a>
        <Header lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <WhatsAppFab lang={lang} />
        <JsonLd data={orgLd} />
        <JsonLd data={webLd} />
      </body>
    </html>
  );
}
