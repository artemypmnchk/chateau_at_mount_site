"use client";

import Image from "next/image";
import { t, wines, type WineLine } from "@/lib/content";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";
import { useReveal } from "./useReveal";

/** Порядок глав: классика открывает страницу, Rare (тёмные бутылки на светлом
 *  полотне) в середине, эксперимент закрывает. Порядок вин внутри главы —
 *  порядок массива wines (по цвету, Viorica первой). */
const LINES: WineLine[] = ["classic", "rare", "experimental"];

export default function WinesPage() {
  const { L, lp } = useLocale();
  const { openBooking } = useBookingModal();
  useReveal();

  return (
    <main className="wines-page">
      {/* ---------- Hero: заголовок + текстовые переходы к главам ---------- */}
      {/* data-header-theme="dark": шапка-хамелеон над тёмными полотнами, как на
          главной. Светлая глава Rare без метки — над ней обычная шапка. */}
      <section className="visit-hero" data-header-theme="dark">
        <div className="container">
          <h1 data-reveal>{L(t.winesSection.eyebrow)}</h1>
          <nav
            className="wines-idx"
            data-reveal
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
          >
            {LINES.map((line) => (
              <a key={line} href={`#${line}`}>
                {t.winesPage.chapters[line].title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ---------- Главы: линейка = глава, полотно Rare светлое ---------- */}
      {LINES.map((line) => {
        const chapter = t.winesPage.chapters[line];
        const list = wines.filter((w) => w.line === line);
        return (
          <section
            key={line}
            id={line}
            className={`wines-ch ${
              line === "rare" ? "wines-ch-light" : "section-dark"
            }`}
            data-header-theme={line === "rare" ? undefined : "dark"}
          >
            <div className="container">
              <header className="wines-chap" data-reveal>
                <h2>{chapter.title}</h2>
              </header>
              <div className="wines-list">
                {list.map((w, i) => (
                  <a
                    className="wine-c"
                    href={lp(`/wines/${w.slug}`)}
                    key={w.slug}
                    data-reveal
                    style={
                      {
                        "--v": w.accent,
                        "--reveal-delay": `${(i % 2) * 0.12}s`,
                      } as React.CSSProperties
                    }
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
                      <span className="wine-c-meta">{L(w.type)}</span>
                      {w.blend && (
                        <span className="wine-c-sub">{w.blend}</span>
                      )}
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
        );
      })}

      {/* ---------- Final CTA — оптовая заявка первична ---------- */}
      <section
        className="section-dark visit-final"
        style={{ paddingTop: 0 }}
        data-header-theme="dark"
      >
        <div className="container">
          <h2 data-reveal>{L(t.finalCta.title)}</h2>
          <p data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
            {L(t.finalCta.subtitle)}
          </p>
          <div
            className="contact-actions"
            data-reveal
            style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
          >
            <button
              onClick={() => openBooking("Опт · страница вин")}
              className="btn btn-accent"
            >
              <span>{L(t.winesPage.wholesaleCta)}</span>
            </button>
            <a href={lp("/visit")} className="btn btn-outline">
              {L(t.visitPage.bookCta)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
