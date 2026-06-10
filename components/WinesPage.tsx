"use client";

import Image from "next/image";
import { t, wines } from "@/lib/content";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";

export default function WinesPage() {
  const { L } = useLocale();
  const { openBooking } = useBookingModal();

  return (
    <main className="wines-page">
      {/* ---------- Hero — текстовый, как на /visit ---------- */}
      <section className="visit-hero">
        <div className="container">
          <span className="hero-eyebrow">{L(t.winesSection.eyebrow)}</span>
          <h1>{L(t.winesSection.title)}</h1>
          <p className="lead">{L(t.winesPage.intro)}</p>
        </div>
      </section>

      {/* ---------- Сетка всех вин ---------- */}
      <section className="section-dark">
        <div className="container">
          <div className="wines-grid">
            {wines.map((w, i) => (
              <a className="wine-card" href={`/wines/${w.slug}`} key={w.slug}>
                <span className="wine-no">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="wine-img">
                  <Image
                    src={w.image}
                    alt={w.name}
                    fill
                    sizes="(max-width: 540px) 80vw, (max-width: 900px) 45vw, 30vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3>{w.name}</h3>
                <span className="wine-meta">
                  {L(w.type)} · {L(w.alcohol)}
                </span>
                <p>{L(w.desc)}</p>
                <span className="wine-more">{L(t.winesSection.more)} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="section-dark visit-final" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2>{L(t.finalCta.title)}</h2>
          <div className="contact-actions">
            <a href="/visit" className="btn btn-accent">
              {L(t.visitPage.bookCta)}
            </a>
            <button onClick={openBooking} className="btn btn-outline">
              {L(t.visitPage.formLink)}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
