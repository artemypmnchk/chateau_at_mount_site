"use client";

import Image from "next/image";
import { t, wines } from "@/lib/content";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";

/** Вес наград: золото = 2, серебро = 1. Сумма — приоритет вина в ленте. */
function awardScore(w: (typeof wines)[number]) {
  return (w.awards ?? []).reduce(
    (sum, a) => sum + (a.level === "gold" ? 2 : 1),
    0,
  );
}

// Наградные вина первыми (Viorica с тремя медалями — в голову ленты).
// sort стабилен — вина с равным весом сохраняют исходный порядок.
const orderedWines = [...wines].sort((a, b) => awardScore(b) - awardScore(a));

export default function WinesPage() {
  const { L } = useLocale();
  const { openBooking } = useBookingModal();

  return (
    <main className="wines-page">
      {/* ---------- Hero — киккер + заголовок, без подписи ---------- */}
      <section className="visit-hero">
        <div className="container">
          <span className="hero-eyebrow">{L(t.winesSection.eyebrow)}</span>
          <h1>{L(t.winesSection.title)}</h1>
        </div>
      </section>

      {/* ---------- Лента всех вин — наградные первыми ---------- */}
      <section className="section-dark">
        <div className="container">
          <div className="wines-list">
            {orderedWines.map((w) => (
              <a
                className="wine-c"
                href={`/wines/${w.slug}`}
                key={w.slug}
                style={{ "--v": w.accent } as React.CSSProperties}
              >
                <div className="wine-c-media">
                  <Image
                    src={w.image}
                    alt={w.name}
                    fill
                    sizes="(max-width: 720px) 116px, 184px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="wine-c-body">
                  <span className="wine-c-meta">
                    {L(w.type)} · {L(w.alcohol)}
                  </span>
                  <h3>{w.name}</h3>
                  <p className="wine-c-desc">{L(w.desc)}</p>
                  {w.awards && w.awards.length > 0 && (
                    <ul className="wine-c-honors">
                      {w.awards.map((a) => (
                        <li key={a.text.ru} className={`medal-${a.level}`}>
                          <span className="dot" />
                          {a.competition}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="wine-c-more">
                    {L(t.winesSection.more)} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA — оптовая заявка первична ---------- */}
      <section className="section-dark visit-final" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2>{L(t.finalCta.title)}</h2>
          <p>{L(t.finalCta.subtitle)}</p>
          <div className="contact-actions">
            <button
              onClick={() => openBooking("Опт · страница вин")}
              className="btn btn-accent"
            >
              {L(t.winesPage.wholesaleCta)}
            </button>
            <a href="/visit" className="btn btn-outline">
              {L(t.visitPage.bookCta)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
