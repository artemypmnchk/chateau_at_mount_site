"use client";

import Image from "next/image";
import { t, wines, type Wine } from "@/lib/content";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";
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

export default function WinePage({ wine }: { wine: Wine }) {
  const { L, locale } = useLocale();
  const { openBooking } = useBookingModal();
  const w = t.winePage;
  const others = wines.filter((x) => x.slug !== wine.slug);

  return (
    <main
      className="wine-page"
      /* Акцент всей страницы — из палитры этикетки этого вина;
         band — согласованное полотно сорта, как в ленте на главной */
      style={
        {
          "--accent": wine.accent,
          "--accent-dark": wine.accentDark,
          "--band": wine.band,
        } as React.CSSProperties
      }
    >
      {/* ---------- Hero: бутылка + характеристики ---------- */}
      <section className="wine-hero">
        <div className="container wine-hero-grid">
          <div className="wine-bottle">
            <Image
              src={wine.image}
              alt={wine.name}
              fill
              priority
              sizes="(max-width: 900px) 70vw, 420px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="wine-hero-body">
            <span className="eyebrow">
              {L(t.winesSection.eyebrow)} · {L(wine.type)}
            </span>
            <h1>{wine.name}</h1>
            <p className="lead">{L(wine.desc)}</p>
            <dl className="wine-facts">
              <div>
                <dt>{L(w.facts.vintage)}</dt>
                <dd>{wine.vintage}</dd>
              </div>
              <div>
                <dt>{L(w.facts.alcohol)}</dt>
                <dd>{L(wine.alcohol)}</dd>
              </div>
              <div>
                <dt>{L(w.facts.serving)}</dt>
                <dd>{wine.servingTemp}</dd>
              </div>
            </dl>
            {wine.awards && wine.awards.length > 0 && (
              <>
                <ul className="wine-awards">
                  {wine.awards.map((a) => (
                    <li key={a.text.ru} className={`medal-${a.level}`}>
                      <span className="award-line">
                        {L(a.text)}
                        {a.proofUrl && (
                          <a
                            className="award-proof"
                            href={a.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {L(w.awardProof)} ↗
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* Официальная графика медалей конкурсов (DWM разрешает
                    призёрам промо-использование, перерисовка запрещена) */}
                {wine.awards.some((a) => a.art) && (
                  <div className="wine-medal-art">
                    {wine.awards
                      .filter((a) => a.art)
                      .map((a) => (
                        <Image
                          key={a.art}
                          src={a.art!}
                          alt={L(a.text)}
                          width={134}
                          height={64}
                        />
                      ))}
                  </div>
                )}
              </>
            )}
            <div className="hero-actions">
              <a href="/visit" className="btn btn-accent">
                {L(t.visitPage.bookCta)}
              </a>
              <a href="/wines" className="btn btn-outline">
                {L(w.allWines)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- История сорта (редакционно) + гастропары сбоку ---------- */}
      <section className="wine-story-section">
        <div className="container story-grid">
          <div className="story-main">
            <span className="eyebrow">{L(w.storyTitle)}</span>
            <p className="wine-story">{L(wine.story)}</p>
          </div>
          <aside className="story-aside">
            <h3>{L(w.pairingsTitle)}</h3>
            <ul className="coop-list">
              {wine.pairings[locale].map((item) => (
                <li key={item}>
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ---------- Другие вина ---------- */}
      <section className="section-dark">
        <div className="container">
          <h2 className="visit-h2">{L(w.otherTitle)}</h2>
          <div className="slider">
            {others.map((o, i) => (
              <a className="wine-card" href={`/wines/${o.slug}`} key={o.slug}>
                <span className="wine-no">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="wine-img">
                  <Image
                    src={o.image}
                    alt={o.name}
                    fill
                    sizes="(max-width: 540px) 60vw, 244px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3>{o.name}</h3>
                <p>{L(o.desc)}</p>
                <span className="wine-more">{L(t.winesSection.more)} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="section-dark visit-final" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2>{L(w.tasteTitle)}</h2>
          <p>{L(w.tasteText)}</p>
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
