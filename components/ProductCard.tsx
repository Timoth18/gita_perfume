import Link from "next/link";
import BottleArt from "./BottleArt";
import { getCategory, type Product } from "@/lib/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card product-card">
      <Link href={`/products/${p.slug}`} className="card-link">
        <div className="card-media">
          <BottleArt shape={p.shape} glass={p.glass} cap={p.cap} title={p.name} />
        </div>
        <div className="card-body">
          <p className="eyebrow">{getCategory(p.category)?.name}</p>
          <h3>{p.name}</h3>
          <p className="muted small">{p.sizes.join(" · ")} — MOQ {p.moq}</p>
        </div>
      </Link>
    </article>
  );
}
