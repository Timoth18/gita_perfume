import Link from "next/link";
import Image from "next/image";
import { productPhotos } from "@/lib/images";
import BottleArt from "./BottleArt";
import { getDict } from "@/lib/dictionaries";
import { href, type Lang } from "@/lib/i18n";
import { getCategory, type Product } from "@/lib/products";

export default function ProductCard({ p, lang }: { p: Product; lang: Lang }) {
  const photo = productPhotos(p.slug)[0];
  return (
    <article className="card product-card">
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
