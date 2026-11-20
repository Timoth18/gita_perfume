import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogView from "@/components/CatalogView";
import { getDict } from "@/lib/dictionaries";
import { alternates, href, isLang, locales, type Lang } from "@/lib/i18n";
import { categories, getCategory, productsIn } from "@/lib/products";

type Params = { params: Promise<{ lang: string; category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => categories.map((c) => ({ lang, category: c.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, category } = await params;
  if (!isLang(lang)) return {};
  const c = getCategory(category, lang);
  if (!c) return {};
  const description = getDict(lang).meta.categoryDesc(c.blurb, c.name);
  return {
    title: c.name,
    description,
    alternates: alternates(lang, `/catalog/${c.slug}`),
    openGraph: { url: href(lang, `/catalog/${c.slug}`), title: c.name, description },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { lang, category } = (await params) as { lang: Lang; category: string };
  const c = getCategory(category, lang);
  if (!c) notFound();
  return <CatalogView lang={lang} title={c.name} intro={c.blurb} items={productsIn(c.slug, lang)} active={c.slug} />;
}
