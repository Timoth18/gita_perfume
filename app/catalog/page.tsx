import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Product Catalog — Perfume Bottles, Atomizers & Packaging",
  description:
    "Browse glass perfume bottles, spray atomizers, roll-on bottles, reed diffuser bottles, caps, pumps and packaging boxes. Low MOQ and custom logo printing available.",
  alternates: { canonical: "/catalog" },
  openGraph: { url: "/catalog" },
};

export default function CatalogPage() {
  return (
    <CatalogView
      title="Product catalog"
      intro="Bottles, closures and packaging for perfume, attar and home fragrance. All items can be customised with your logo."
      items={products}
    />
  );
}
