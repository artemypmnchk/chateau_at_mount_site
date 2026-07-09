"use client";

import Image from "next/image";
import { t, links } from "@/lib/content";
import { site } from "@/lib/site";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";

import heroImg from "@/public/images/hero-dinner.jpg";
import gastronomyImg from "@/public/images/visit-gastronomy.jpg";
import tableImg from "@/public/images/visit-table.jpg";

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
      {/* ---------- Hero — полноэкранное фото, как на главной ---------- */}
      <section className="hero visit-hero-photo">
        <div className="hero-bg">
          <Image
            src={heroImg}
            alt="Дегустация в виноградниках Chateau At Mount"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            /* Стол — на левой трети кадра: держим его в кадре и на мобилке */
            style={{ objectFit: "cover", objectPosition: "38% 62%" }}
          />
        </div>
        <div className="container hero-content">
          <span className="hero-eyebrow">{L(v.eyebrow)}</span>
          <h1>{L(v.title)}</h1>
          <p className="lead">{L(v.intro)}</p>
          <div className="hero-actions">
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              {L(v.bookCta)}
            </a>
            <button onClick={openBooking} className="hero-link">
              {L(v.formLink)}
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Что вас ждёт: стол и кухня, сплитами как на главной ---------- */}
      <section>
        <div className="container">
          <div className="split">
            <div className="split-media">
              <Image
                src={tableImg}
                alt={L(v.tableSplit.title)}
                fill
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="split-body">
              <h2>{L(v.tableSplit.title)}</h2>
              <p>{L(v.tableSplit.text)}</p>
            </div>
          </div>
          <div className="split reverse">
            <div className="split-media">
              <Image
                src={gastronomyImg}
                alt={L(v.gastroSplit.title)}
                fill
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="split-body">
              <h2>{L(v.gastroSplit.title)}</h2>
              <p>{L(v.gastroSplit.text)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Tasting packages ---------- */}
      <section className="section-dark">
        <div className="container">
          <h2 className="visit-h2">{L(v.packagesTitle)}</h2>
          <p className="pkg-intro">{L(v.packagesIntro)}</p>
          <div className="pkg-grid">
            {v.packages.map((p) => (
              <article
                className={`pkg-card${p.popular ? " popular" : ""}`}
                key={p.name.ru}
              >
                {p.popular && (
                  <span className="pkg-tag">{L(v.popularTag)}</span>
                )}
                <div className="pkg-price">
                  <span className="num">{p.price}</span>
                  <span className="word">{L(v.priceUnit)}</span>
                </div>
                <div className="pkg-head">
                  <div>
                    <h3>{L(p.name)}</h3>
                    <p className="pkg-meta">{L(p.meta)}</p>
                  </div>
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
