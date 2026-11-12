import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogView from "@/components/CatalogView";
import { categories, getCategory, productsIn } from "@/lib/products";

type Params = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  return {
    title: c.name,
    description: `${c.blurb} Wholesale ${c.name.toLowerCase()} with low MOQ and custom logo from Gita Perfume Bottle.`,
    alternates: { canonical: `/catalog/${c.slug}` },
    openGraph: { url: `/catalog/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: Params) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  return <CatalogView title={c.name} intro={c.blurb} items={productsIn(c.slug)} active={c.slug} />;
}
