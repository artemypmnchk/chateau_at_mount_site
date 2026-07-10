"use client";

import Image, { getImageProps } from "next/image";
import { useRef } from "react";
import { t, wines, links, reviews } from "@/lib/content";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";
import { useReveal } from "./useReveal";
import { useHorizontalScroll } from "./useHorizontalScroll";
import { HighlightOnScroll } from "./HighlightOnScroll";
import Medal from "./Medal";

// Статические импорты больших фото → next/image сам генерирует размеры
// и blur-заглушку, отдаёт AVIF/WebP и ленивую загрузку.
import heroImg from "@/public/images/hero-building.jpg";
import heroMobileImg from "@/public/images/hero-building-mobile.jpg";
import vineyardImg from "@/public/images/feature-vineyards.jpg";

// Hero — арт-дирекшн через <picture>: панорама не влезает в портретный
// экран, телефоны получают отдельный вертикальный кадр. getImageProps
// даёт оптимизированные srcSet обоих, грузится только подходящий.
const { props: heroDesktopProps } = getImageProps({
  src: heroImg,
  alt: "Винодельня Chateau At Mount",
  fill: true,
  priority: true,
  sizes: "100vw",
});
const { props: heroMobileProps } = getImageProps({
  src: heroMobileImg,
  alt: "",
  fill: true,
  priority: true,
  sizes: "100vw",
});
const heroMobileSrcSet = heroMobileProps.srcSet;
import basketImg from "@/public/images/basket.jpeg";
import vatsImg from "@/public/images/cellar-vats-2.jpg";
import familyImg from "@/public/images/family.jpeg";

export default function Site() {
  const { L } = useLocale();
  const { openBooking } = useBookingModal();
  const bandWrapRef = useRef<HTMLDivElement>(null);
  const bandTrackRef = useRef<HTMLDivElement>(null);
  const bandBgRef = useRef<HTMLDivElement>(null);
  useReveal();
  useHorizontalScroll(bandWrapRef, bandTrackRef, {
    bgRef: bandBgRef,
    colors: wines.map((w) => w.band),
  });

  return (
    <main id="top">
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero-bg">
          {/* Арт-дирекшн по соотношению сторон: в портретные и почти
              квадратные окна (телефон, планшет, пол-экрана на десктопе)
              панорама не влезает — им вертикальный кадр */}
          <picture>
            <source
              media="(max-aspect-ratio: 6/5)"
              srcSet={heroMobileSrcSet}
            />
            <img
              {...heroDesktopProps}
              alt="Винодельня Chateau At Mount"
              style={{ ...heroDesktopProps.style, objectFit: "cover" }}
            />
          </picture>
        </div>
        <div className="container hero-content">
          <h1>{t.hero.brand}</h1>
          <div className="hero-actions">
            <button onClick={openBooking} className="hero-link">
              {L(t.cta.request)}
            </button>
            <a href="/wines" className="hero-link">
              {L(t.cta.wines)}
            </a>
          </div>
        </div>
        <span className="hero-scroll" aria-hidden />
      </section>

      {/* ---------- About — тёмный типографический манифест
           (спека: docs/spec-manifesto-block.md) ---------- */}
      <section id="about" className="manifesto section-dark">
        <div className="container">
          <span className="eyebrow" data-reveal>
            {L(t.nav.about)}
          </span>
          {/* Фраза — только пословное проявление, без data-reveal:
              два языка движения в одном элементе не смешиваем */}
          <HighlightOnScroll text={L(t.about.manifesto)} />
          <div
            className="manifesto-foot"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <a href="/visit" className="manifesto-link">
              {L(t.about.cta)} →
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="features">
            <article className="feature-card">
              <Image
                src={vineyardImg}
                alt={L(t.features.vineyard.title)}
                fill
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div className="body">
                <h3>{L(t.features.vineyard.title)}</h3>
                <p>{L(t.features.vineyard.text)}</p>
              </div>
            </article>
            <article className="feature-card">
              <Image
                src={basketImg}
                alt={L(t.features.taste.title)}
                fill
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div className="body">
                <h3>{L(t.features.taste.title)}</h3>
                <p>{L(t.features.taste.text)}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- Wines — глиняное полотно, горизонтальный проезд ---------- */}
      <section id="wines" className="wines-band">
        <div
          className="band-pinwrap"
          ref={bandWrapRef}
          style={{ "--slides": wines.length } as React.CSSProperties}
        >
          <div className="band-sticky">
            <div className="band-bg" ref={bandBgRef} aria-hidden />
            <div className="container band-head" data-reveal>
              <div>
                <span className="eyebrow">{L(t.winesSection.eyebrow)}</span>
                <h2>{L(t.winesSection.title)}</h2>
                <span className="band-medals">
                  <Medal size={15} /> {L(t.winesSection.medals)}
                </span>
              </div>
              <a href="/wines" className="band-all">
                {L(t.winesSection.all)} →
              </a>
            </div>
            <div className="band-track" ref={bandTrackRef}>
              {wines.map((w, i) => (
                <a className="band-slide" href={`/wines/${w.slug}`} key={w.slug}>
                  <div className="band-bottle-v">
                    <Image
                      src={w.image}
                      alt={w.name}
                      fill
                      sizes="(max-width: 900px) 60vw, 300px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="band-meta">
                    <span className="wine-no">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(wines.length).padStart(2, "0")}
                    </span>
                    <h3>{w.name}</h3>
                    {w.awards && w.awards.length > 0 && (
                      <ul className="band-awards">
                        {w.awards.map((a) => (
                          <li key={a.text.ru} className={`medal-${a.level}`}>
                            <Medal size={14} />
                            <span>{L(a.text)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="band-more">
                      {L(t.winesSection.more)} →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Control (process) ---------- */}
      <section className="section-dark">
        <div className="container">
          <div className="split">
            <div className="split-media">
              <Image
                src={vatsImg}
                alt={L(t.control.title)}
                fill
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="split-body">
              <h2>{L(t.control.title)}</h2>
              <p>{L(t.control.text)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Memories / events ---------- */}
      <section id="events">
        <div className="container">
          <div className="split reverse">
            <div className="split-media">
              <Image
                src={familyImg}
                alt={L(t.memories.title)}
                fill
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="split-body">
              <span className="eyebrow">{L(t.nav.events)}</span>
              <h2>{L(t.memories.title)}</h2>
              <p>{L(t.memories.text)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contacts" className="section-dark contact">
        <div className="container">
          <h2>{L(t.contact.title)}</h2>
          <p>{L(t.contact.text)}</p>
          {reviews.length > 0 && (
            <div className="reviews-row">
              {reviews.map((r) => (
                <blockquote className="review-card" key={r.name}>
                  <p>«{L(r.text)}»</p>
                  <footer>
                    <span className="review-name">{r.name}</span>
                    <span className="review-source">{L(t.reviews.source)}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
          <div className="contact-cards">
            {t.contact.cards.map((c, i) => (
              <div className="contact-card" key={i}>
                <div className="label">{L(c.label)}</div>
                <div className="value">{L(c.value)}</div>
              </div>
            ))}
          </div>
          <div className="contact-actions">
            <button onClick={openBooking} className="btn btn-accent">
              {L(t.contactsPage.formTitle)}
            </button>
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Telegram
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="final-cta">
        <div className="container">
          <h2>{L(t.finalCta.title)}</h2>
          <div className="hero-actions">
            <button onClick={openBooking} className="btn btn-primary">
              {L(t.visitPage.bookCta)}
            </button>
            <a href="/wines" className="btn btn-ghost-dark">
              {L(t.winesSection.all)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
