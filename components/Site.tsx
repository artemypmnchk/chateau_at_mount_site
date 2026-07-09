"use client";

import Image from "next/image";
import { t, wines, links, reviews } from "@/lib/content";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";
import { useReveal } from "./useReveal";
import Medal from "./Medal";

// Все награды вин одной лентой: золото раньше серебра, порядок вин сохраняем.
const allAwards = wines
  .flatMap((w) => (w.awards ?? []).map((award) => ({ wine: w, award })))
  .sort((a, b) =>
    a.award.level === b.award.level ? 0 : a.award.level === "gold" ? -1 : 1
  );

// Статические импорты больших фото → next/image сам генерирует размеры
// и blur-заглушку, отдаёт AVIF/WebP и ленивую загрузку.
import heroImg from "@/public/images/hero-building.jpg";
import vineyardImg from "@/public/images/feature-vineyards.jpg";
import basketImg from "@/public/images/basket.jpeg";
import vatsImg from "@/public/images/cellar-vats-2.jpg";
import familyImg from "@/public/images/family.jpeg";
import gallery1 from "@/public/images/gallery-1.jpg";
import gallery2 from "@/public/images/gallery-2.jpg";
import gallery3 from "@/public/images/gallery-3.jpg";
import gallery4 from "@/public/images/gallery-4.jpg";
import gallery5 from "@/public/images/gallery-5.jpg";
import gallery6 from "@/public/images/gallery-6.jpg";

const galleryShots = [
  { img: gallery1, alt: "Виноград нового урожая на закате" },
  { img: gallery2, alt: "Сбор винограда на виноградниках" },
  { img: gallery3, alt: "Закуски к дегустации" },
  { img: gallery4, alt: "Гостья с бокалом вина" },
  { img: gallery5, alt: "Ужин в виноградниках" },
  { img: gallery6, alt: "Вечер на винодельне" },
];

export default function Site() {
  const { L } = useLocale();
  const { openBooking } = useBookingModal();
  useReveal();

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

      {/* ---------- About ---------- */}
      <section id="about" className="about">
        <div className="container">
          <span className="eyebrow">{L(t.nav.about)}</span>
          <h2>{L(t.about.line1)}</h2>
          <p>{L(t.about.line2)}</p>
          <div className="stats">
            {t.stats.map((s) => (
              <div className="stat" key={s.value}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{L(s.label)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Awards ---------- */}
      {allAwards.length > 0 && (
        <section className="awards" style={{ paddingTop: 0 }}>
          <div className="container">
            <span className="eyebrow">{L(t.awardsSection.eyebrow)}</span>
            <h2>{L(t.awardsSection.title)}</h2>
            <div className="awards-strip">
              {allAwards.map(({ wine: w, award }) => (
                <a
                  className={`award-chip medal-${award.level}`}
                  href={`/wines/${w.slug}`}
                  key={award.text.ru}
                >
                  <Medal size={22} />
                  <span className="award-body">
                    <span className="award-wine">{w.name}</span>
                    <span className="award-text">{L(award.text)}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* ---------- Wines — глиняное полотно с лежащими бутылками ---------- */}
      <section id="wines" className="wines-band">
        <div className="container">
          <div className="wines-head" data-reveal>
            <div>
              <span className="eyebrow">{L(t.winesSection.eyebrow)}</span>
              <h2>{L(t.winesSection.title)}</h2>
            </div>
          </div>
          <div className="band-list">
            {wines.map((w, i) => (
              <a
                className="band-row"
                href={`/wines/${w.slug}`}
                key={w.slug}
                data-reveal
              >
                <div className="band-meta">
                  <span className="wine-no">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{w.name}</h3>
                  <p>{L(w.desc)}</p>
                  <span className="wine-more">{L(t.winesSection.more)} →</span>
                </div>
                <div className="band-bottle">
                  <div className="band-rot">
                    <Image
                      src={w.image}
                      alt={w.name}
                      fill
                      sizes="(max-width: 900px) 78vw, 620px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="wines-all">
            <a href="/wines" className="btn btn-outline">
              {L(t.winesSection.all)}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Control (process) ---------- */}
      <section>
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

      {/* ---------- Gallery ---------- */}
      <section className="gallery" aria-label={L(t.gallery.title)}>
        <div className="container">
          <div className="gallery-head">
            <span className="eyebrow">{L(t.gallery.eyebrow)}</span>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-link"
            >
              {L(t.gallery.instagram)} →
            </a>
          </div>
          <div className="gallery-strip">
            {galleryShots.map((s) => (
              <div className="gallery-item" key={s.img.src}>
                <Image
                  src={s.img}
                  alt={s.alt}
                  placeholder="blur"
                  style={{ height: "100%", width: "auto" }}
                />
              </div>
            ))}
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
