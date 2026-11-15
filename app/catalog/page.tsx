import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Product Catalog — Perfume Spray Bottles, Roll-ons & Travel Sprays",
  description:
    "Browse 200+ glass perfume bottles: screw-neck, easy-pump and crimp sprays, mini travel sprays, roll-ons, frosted bottles and the GP pre-order series. No minimum order and custom logo printing available.",
  alternates: { canonical: "/catalog" },
  openGraph: { url: "/catalog" },
};

export default function CatalogPage() {
  return (
    <CatalogView
      title="Product catalog"
      intro="Glass perfume bottles from 3 ml to 150 ml, from our October 2026 catalog. Order from 1 pc; all items can be customised with your logo."
      items={products}
    />
  );
}
