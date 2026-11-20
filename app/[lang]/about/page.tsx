import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { aboutPhoto } from "@/lib/images";
import BottleArt from "@/components/BottleArt";
import Breadcrumbs from "@/components/Breadcrumbs";
import Showroom from "@/components/Showroom";
import Warehouse from "@/components/Warehouse";
import { getDict } from "@/lib/dictionaries";
import { alternates, href, isLang, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang).meta;
  const description = t.aboutDesc(site.name, site.founded);
  return {
    title: t.aboutTitle,
    description,
    alternates: alternates(lang, "/about"),
    openGraph: { url: href(lang, "/about"), title: t.aboutTitle, description },
  };
}

export default async function AboutPage({ params }: Props) {
  const lang = (await params).lang as Lang;
  const t = getDict(lang);
  const a = t.about;
  const story = aboutPhoto();
  return (
    <>
      <section className="page-hero">
        <div className="container about-hero">
          <div>
            <Breadcrumbs lang={lang} items={[{ href: href(lang, "/about"), label: t.common.about }]} />
            <h1>{a.h1(site.name)}</h1>
            <p className="lead">{a.lead}</p>
            <dl className="stats">
              {t.home.stats.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>
          <div className="about-hero-photo">
            <Image src="/images/about-header.jpg" alt={a.headerAlt(site.name)} fill priority sizes="(max-width: 860px) 100vw, 420px" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">{a.storyEyebrow}</p>
            <h2>{a.storyH}</h2>
            <p>{a.story1(site.name, site.founded)}</p>
            <p>{a.story2}</p>
          </div>
          {story ? (
            <div className="about-photo"><Image src={story} alt={a.photoAlt(site.name)} fill sizes="(max-width: 860px) 100vw, 480px" /></div>
          ) : (
            <div className="about-art" aria-hidden="true">
              <BottleArt shape="flask" glass="#e7e0c9" cap="#6b4f2a" />
              <BottleArt shape="rollon" glass="#e8d6b8" cap="#b08a4a" />
            </div>
          )}
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="val-h">
        <div className="container">
          <p className="eyebrow">{a.valuesEyebrow}</p>
          <h2 id="val-h">{a.valuesH}</h2>
          <ul className="usp-grid usp-3">
            {a.values.map((v, i) => (
              <li key={v.t}><span className="usp-num">0{i + 1}</span><h3>{v.t}</h3><p className="muted">{v.d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="tl-h">
        <div className="container">
          <p className="eyebrow">{a.tlEyebrow}</p>
          <h2 id="tl-h">{a.tlH}</h2>
          <ol className="timeline">
            {a.timeline.map((m) => (
              <li key={m.y}><span className="tl-year">{m.y}</span><p>{m.t}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <Showroom variant="about" lang={lang} />

      <Warehouse variant="about" lang={lang} />

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div><h2>{a.ctaH}</h2><p>{a.ctaP}</p></div>
          <div className="cta-row"><Link href={href(lang, "/contact")} className="btn btn-light">{a.ctaBtn}</Link></div>
        </div>
      </section>
    </>
  );
}
