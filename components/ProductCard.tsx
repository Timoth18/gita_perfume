import Link from "next/link";
import Image from "next/image";
import { productPhotos } from "@/lib/images";
import BottleArt from "./BottleArt";
import { getDict } from "@/lib/dictionaries";
import { href, type Lang } from "@/lib/i18n";
import { getCategory, getProduct, type Product } from "@/lib/products";

export default function ProductCard({ p, lang }: { p: Product; lang: Lang }) {
  const photo = productPhotos(p.slug)[0];
  // Words the catalog search matches on, in both languages.
  const search = [
    p.name, p.code, p.sizes.join(" "),
    ...(["id", "en"] as const).flatMap((l) => [getCategory(p.category, l)?.name, getProduct(p.slug, l)?.neck, ...(getProduct(p.slug, l)?.finishes ?? [])]),
    p.badge === "Pre-order" ? "pre-order preorder po" : p.badge === "New" ? "new baru" : "",
  ].filter(Boolean).join(" ");
  return (
    <article className="card product-card" data-search={search}>
      <Link href={href(lang, `/products/${p.slug}`)} className="card-link">
        <div className={photo ? "card-media has-photo" : "card-media"}>
          {photo ? (
            <Image src={photo} alt={p.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px" />
          ) : (
            <BottleArt shape={p.shape} glass={p.glass} cap={p.cap} title={p.name} />
          )}
        </div>
        <div className="card-body">
          <p className="eyebrow">{getCategory(p.category, lang)?.name}{p.badge === "New" && <> · <strong>{getDict(lang).product.newBadge}</strong></>}</p>
          <h3>{p.name}</h3>
          <p className="muted small">{p.sizes.join(" · ")} — {lang === "id" ? "Min." : "MOQ"} {p.moq}</p>
        </div>
      </Link>
    </article>
  );
}
