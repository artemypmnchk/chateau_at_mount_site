"use client";

import Image, { getImageProps } from "next/image";
import { useRef } from "react";
import { t, wines, links } from "@/lib/content";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";
import { useReveal } from "./useReveal";
import { useHorizontalScroll } from "./useHorizontalScroll";
import { HighlightOnScroll } from "./HighlightOnScroll";

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
import harvestImg from "@/public/images/harvest.jpg";
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
      <section className="hero" data-header-theme="dark">
        <div className="hero-bg">
          {/* Арт-дирекшн по соотношению сторон: в портретные и почти
              квадратные окна (телефон, планшет, пол-экрана на десктопе)
              панорама не влезает — им вертикальный кадр */}
          <picture>
            <source media="(max-aspect-ratio: 6/5)" srcSet={heroMobileSrcSet} />
            <img
              {...heroDesktopProps}
              alt="Винодельня Chateau At Mount"
              style={{ ...heroDesktopProps.style, objectFit: "cover" }}
            />
          </picture>
        </div>
        <div className="container hero-content">
          {/* Кто и где — до имени: H1 дублирует словомарку шапки, и без
              этой строки хиро не говорил, что это за сайт (аудит, F-07) */}
          <span className="hero-eyebrow">{L(t.hero.location)}</span>
          <h1>{t.hero.brand}</h1>
          <div className="hero-actions">
            <button onClick={openBooking} className="hero-link">
              {L(t.cta.request)}
            </button>
            {/* Второе действие тише: два одинаковых CTA спорили за палец */}
            <a href="/wines" className="hero-link hero-link-secondary">
              {L(t.cta.wines)}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- About — тёмный типографический манифест
           (спека: docs/spec-manifesto-block.md) ---------- */}
      <section
        id="about"
        className="manifesto section-dark"
        data-header-theme="dark"
      >
        <span className="manifesto-glow" aria-hidden />
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

      {/* ---------- Wines — глиняное полотно, горизонтальный проезд ---------- */}
      <section id="wines" className="wines-band" data-header-theme="dark">
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
                <span className="band-medals">{L(t.winesSection.medals)}</span>
              </div>
              <a href="/wines" className="band-all">
                {L(t.winesSection.all)} →
              </a>
            </div>
            <div className="band-track" ref={bandTrackRef}>
              {wines.map((w, i) => (
                <a
                  className="band-slide"
                  href={`/wines/${w.slug}`}
                  key={w.slug}
                >
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
                    {/* Награды — сдержанная строка-кредит (конкурсы через
                        точку), высота слота фиксирована, чтобы бутылки во всех
                        карточках оставались одного размера. Полный текст медалей
                        с годами — на странице вина. */}
                    <p className="band-award-line">
                      {w.awards
                        ?.map((a) => a.competition)
                        .filter(Boolean)
                        .join("  ·  ")}
                    </p>
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

      {/* ---------- Proof — светлая глава-доказательство: развеска двух
           кадров + цифры (спека: docs/spec-features-block.md) ---------- */}
      <section className="proof">
        <div className="container">
          <h2 className="proof-title">{L(t.proof.kicker)}</h2>
          <div className="proof-figures">
            {t.proof.figures.map((f) => (
              <div className="proof-figure" key={f.label.en}>
                <span className="proof-figure-value">
                  {"prefix" in f && (
                    <span className="proof-figure-prefix">{L(f.prefix)} </span>
                  )}
                  {L(f.value)}
                </span>
                <span className="proof-figure-label">{L(f.label)}</span>
              </div>
            ))}
          </div>
          <div className="proof-gallery">
            <figure className="proof-frame proof-frame-a">
              <div className="proof-photo">
                <Image
                  src={harvestImg}
                  alt={L(t.proof.alts.harvest)}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 60vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="proof-caption">
                <span className="proof-caption-label">
                  {L(t.proof.captions.harvest.label)}
                </span>
                {L(t.proof.captions.harvest.text)}
              </figcaption>
            </figure>
            <figure className="proof-frame proof-frame-b">
              <div className="proof-photo">
                <Image
                  src={vineyardImg}
                  alt={L(t.proof.alts.taste)}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 36vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="proof-caption">
                <span className="proof-caption-label">
                  {L(t.proof.captions.taste.label)}
                </span>
                {L(t.proof.captions.taste.text)}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- Control (process) ---------- */}
      <section className="section-dark" data-header-theme="dark">
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
              {/* Секция рассказывала и обрывалась — до финального CTA
                  далеко, даём путь сразу (аудит, F-08) */}
              <a href="/visit" className="split-link">
                {L(t.memories.cta)} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA — единственный контактный блок главной:
              бывший «Мы рядом» слит сюда, чтобы не дублировать работу секции ---------- */}
      <section className="final-cta">
        <div className="container">
          <h2>{L(t.finalCta.title)}</h2>
          <p className="final-cta-sub">{L(t.finalCta.subtitle)}</p>
          <div className="hero-actions">
            <button onClick={openBooking} className="btn btn-accent">
              {L(t.visitPage.formLink)}
            </button>
            <a href="/wines" className="btn btn-ghost-dark">
              {L(t.winesSection.all)}
            </a>
          </div>
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-telegram"
          >
            Telegram →
          </a>
        </div>
      </section>
    </main>
  );
}
