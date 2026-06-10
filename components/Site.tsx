"use client";

import { useRef } from "react";
import Image from "next/image";
import { t, wines, links } from "@/lib/content";
import { useLocale } from "./locale";

// Статические импорты больших фото → next/image сам генерирует размеры
// и blur-заглушку, отдаёт AVIF/WebP и ленивую загрузку.
import heroImg from "@/public/images/hero-winery.png";
import vineyardImg from "@/public/images/vineyard.png";
import basketImg from "@/public/images/basket.jpeg";
import tanksImg from "@/public/images/tanks.jpg";
import familyImg from "@/public/images/family.jpeg";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d={
          dir === "left"
            ? "M22.5 12.5 15 20l7.5 7.5"
            : "M17.5 12.5 25 20l-7.5 7.5"
        }
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Site() {
  const { L } = useLocale();
  const sliderRef = useRef<HTMLDivElement>(null);

  const slide = (dir: 1 | -1) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 322, behavior: "smooth" });
  };

  return (
    <main id="top">
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src={heroImg}
            alt="Винодельня Chateau At Mount"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="container hero-content">
          <h1>{t.hero.brand}</h1>
          <p className="tagline">{L(t.hero.tagline)}</p>
          <div className="hero-actions">
            <a href="#wines" className="btn btn-accent">
              {L(t.cta.learn)}
            </a>
            <a href="/contacts" className="btn btn-outline">
              {L(t.cta.book)}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="about">
        <div className="container">
          <h2>{L(t.about.line1)}</h2>
          <p>{L(t.about.line2)}</p>
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

      {/* ---------- Wines ---------- */}
      <section id="wines" className="section-dark">
        <div className="container">
          <div className="wines-head">
            <div>
              <span className="eyebrow">{L(t.winesSection.eyebrow)}</span>
              <h2>{L(t.winesSection.title)}</h2>
            </div>
            <div className="slider-controls">
              <button
                className="slider-btn"
                aria-label="Previous"
                onClick={() => slide(-1)}
              >
                <Chevron dir="left" />
              </button>
              <button
                className="slider-btn"
                aria-label="Next"
                onClick={() => slide(1)}
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>
          <div className="slider" ref={sliderRef}>
            {wines.map((w) => (
              <article className="wine-card" key={w.name}>
                <div className="wine-img">
                  <Image
                    src={w.image}
                    alt={w.name}
                    fill
                    sizes="(max-width: 540px) 60vw, 244px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3>{w.name}</h3>
                <p>{L(w.desc)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Control (process) ---------- */}
      <section>
        <div className="container">
          <div className="split">
            <div className="split-media">
              <Image
                src={tanksImg}
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
      <section id="events" className="section-dark">
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
      <section
        id="contacts"
        className="section-dark contact"
        style={{ paddingTop: 0 }}
      >
        <div className="container">
          <h2>{L(t.contact.title)}</h2>
          <p>{L(t.contact.text)}</p>
          <div className="contact-cards">
            {t.contact.cards.map((c, i) => (
              <div className="contact-card" key={i}>
                <div className="label">{L(c.label)}</div>
                <div className="value">{L(c.value)}</div>
              </div>
            ))}
          </div>
          <div className="contact-actions">
            <a href="/contacts" className="btn btn-accent">
              {L(t.contactsPage.formTitle)}
            </a>
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
            <a href="#wines" className="btn btn-primary">
              {L(t.cta.learn)}
            </a>
            <a href="/contacts" className="btn btn-ghost-dark">
              {L(t.cta.book)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
