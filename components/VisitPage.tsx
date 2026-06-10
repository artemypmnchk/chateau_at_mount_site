"use client";

import Image from "next/image";
import { t, links } from "@/lib/content";
import { site } from "@/lib/site";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";

import vineyardImg from "@/public/images/vineyard.png";
import basketImg from "@/public/images/basket.jpeg";
import familyImg from "@/public/images/family.jpeg";

function Check() {
  return (
    <svg
      className="check"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VisitPage() {
  const { L, locale } = useLocale();
  const { openBooking } = useBookingModal();
  const v = t.visitPage;

  return (
    <main className="visit">
      {/* ---------- Hero — текстовый, без фото ---------- */}
      <section className="visit-hero">
        <div className="container">
          <span className="hero-eyebrow">{L(v.eyebrow)}</span>
          <h1>{L(v.title)}</h1>
          <p className="lead">{L(v.intro)}</p>
          <div className="hero-actions">
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              {L(v.bookCta)}
            </a>
            <button onClick={openBooking} className="btn btn-outline">
              {L(v.formLink)}
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Tasting packages ---------- */}
      <section className="section-dark">
        <div className="container">
          <h2 className="visit-h2">{L(v.packagesTitle)}</h2>
          <div className="pkg-grid">
            {v.packages.map((p) => (
              <article
                className={`pkg-card${p.popular ? " popular" : ""}`}
                key={p.name.ru}
              >
                {p.popular && (
                  <span className="pkg-tag">{L(v.popularTag)}</span>
                )}
                <div className="pkg-wines">
                  <span className="num">{p.winesNum}</span>
                  <span className="word">{L(p.winesWord)}</span>
                </div>
                <div className="pkg-head">
                  <h3>{L(p.name)}</h3>
                  <span className="pkg-duration">{L(p.duration)}</span>
                </div>
                <ul className="pkg-list">
                  {p.includes[locale].map((item) => (
                    <li key={item}>
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="pkg-note">{L(v.priceNote)}</p>
        </div>
      </section>

      {/* ---------- How a visit works: 3 steps ---------- */}
      <section>
        <div className="container">
          <h2 className="visit-h2">{L(v.howTitle)}</h2>
          <div className="steps">
            {v.steps.map((s, i) => (
              <div className="step" key={i}>
                <span className="step-num">0{i + 1}</span>
                <h3>{L(s.title)}</h3>
                <p>{L(s.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Photo strip ---------- */}
      <section className="visit-gallery-section">
        <div className="container">
          <div className="visit-gallery">
            <div className="g-item">
              <Image
                src={basketImg}
                alt="Chateau At Mount"
                fill
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="g-item">
              <Image
                src={familyImg}
                alt="Chateau At Mount"
                fill
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="g-item">
              <Image
                src={vineyardImg}
                alt="Chateau At Mount"
                fill
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="section-dark visit-final">
        <div className="container">
          <span className="eyebrow">{L(v.gettingTitle)}</span>
          <h2>{L(v.finalTitle)}</h2>
          <p>{L(v.gettingText)}</p>
          <div className="contact-actions">
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              {L(v.bookCta)}
            </a>
            <a href={site.contacts.phoneHref} className="btn btn-outline">
              {site.contacts.phone}
            </a>
            <a
              href={site.contacts.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              {L(v.showOnMap)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
