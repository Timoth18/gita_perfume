import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { getDict } from "@/lib/dictionaries";
import { alternates, href, isLang, type Lang } from "@/lib/i18n";
import { getProducts } from "@/lib/products";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang).meta;
  return {
    title: t.catalogTitle,
    description: t.catalogDesc,
    alternates: alternates(lang, "/catalog"),
    openGraph: { url: href(lang, "/catalog"), title: t.catalogTitle, description: t.catalogDesc },
  };
}

export default async function CatalogPage({ params }: Props) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang).catalog;
  return <CatalogView lang={lang} title={t.h1} intro={t.intro} items={getProducts(lang)} />;
}
