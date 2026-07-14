"use client";

import Image from "next/image";
import { t, wines, type Wine } from "@/lib/content";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";
/** Светлый band (розе, светлые белые) даёт слишком яркое полотно на всю
 *  высоту хиро — помечаем такие вина, чтобы затемнить только их хиро.
 *  Порог по воспринимаемой яркости: rose/albă попадают, тёмные — нет. */
function isLightBand(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 88;
}

export default function WinePage({ wine }: { wine: Wine }) {
  const { L, lp } = useLocale();
  const { openBooking } = useBookingModal();
  const w = t.winePage;
  const others = wines.filter((x) => x.slug !== wine.slug);

  return (
    <main
      className="wine-page"
      data-light-band={isLightBand(wine.band) ? "" : undefined}
      data-hero-tone={wine.heroTone ? "" : undefined}
      /* Акцент всей страницы — из палитры этикетки этого вина;
         band — согласованное полотно сорта, как в ленте на главной */
      style={
        {
          "--accent": wine.accent,
          "--accent-dark": wine.accentDark,
          "--band": wine.band,
          "--hero-tone": wine.heroTone,
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
            {wine.awards && wine.awards.length > 0 && (
              /* Почётный ряд: официальная графика медали (DWM разрешает
                 призёрам промо-использование) живёт в строке своей награды —
                 паспорт вина, а не плавающий стикер */
              <ul className="wine-awards">
                {wine.awards.map((a) => (
                  <li
                    key={a.text.ru}
                    className={`medal-${a.level}${a.art ? " has-art" : ""}`}
                  >
                    {a.art && (
                      <Image
                        className="award-art"
                        src={a.art}
                        alt=""
                        width={92}
                        height={44}
                      />
                    )}
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
            )}
            <div className="hero-actions">
              <a href={lp("/visit")} className="btn btn-accent">
                <span>{L(t.visitPage.bookCta)}</span>
              </a>
              <a href={lp("/wines")} className="btn btn-outline">
                {L(w.allWines)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- История сорта (редакционно) + гастропары сбоку ---------- */}
      <section className="wine-story-section">
        <div className="container">
          <div className="story-main">
            <span className="eyebrow">
              {L(wine.about ? w.aboutTitle : w.storyTitle)}
            </span>
            {/* Есть верифицированное описание по этикетке — показываем только его;
                иначе нейтральная история сорта. */}
            <p className="wine-story">{L(wine.about ?? wine.story)}</p>
          </div>
        </div>
      </section>

      {/* ---------- Другие вина ---------- */}
      <section className="section-dark">
        <div className="container">
          <h2 className="visit-h2">{L(w.otherTitle)}</h2>
          {/* Карточки без data-reveal: секция целиком под фолдом — в
              статическом рендере (печать, превью) reveal оставлял чёрную яму */}
          <div className="wines-list">
            {others.map((o) => (
              <a
                className="wine-c"
                href={lp(`/wines/${o.slug}`)}
                key={o.slug}
                style={{ "--v": o.accent } as React.CSSProperties}
              >
                <div className="wine-c-media">
                  <Image
                    src={o.image}
                    alt={o.name}
                    fill
                    sizes="(max-width: 720px) 116px, 184px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="wine-c-body">
                  <span className="wine-c-meta">
                    {L(o.type)}
                  </span>
                  <h3>{o.name}</h3>
                  <p className="wine-c-desc">{L(o.desc)}</p>
                  {o.awards && o.awards.length > 0 && (
                    <ul className="wine-c-honors">
                      {o.awards.map((a) => (
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

      {/* ---------- Final CTA ---------- */}
      <section className="section-dark visit-final" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2>{L(w.tasteTitle)}</h2>
          <p>{L(w.tasteText)}</p>
          <div className="contact-actions">
            <a href={lp("/visit")} className="btn btn-accent">
              <span>{L(t.visitPage.bookCta)}</span>
            </a>
            <button onClick={() => openBooking()} className="btn btn-outline">
              {L(t.visitPage.formLink)}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
