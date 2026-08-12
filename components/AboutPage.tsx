"use client";

import { t } from "@/lib/content";
import { useLocale } from "./locale";
import { useReveal } from "./useReveal";
import { HighlightOnScroll } from "./HighlightOnScroll";
import { VineSpine } from "./VineSpine";
import { HillScene } from "./HillScene";
import { PourScene } from "./PourScene";
import { useBookingModal } from "./BookingModal";

const a = t.aboutPage;

// Серая однотонная заглушка вместо фото (фотоматериала пока мало).
function Ph({ label }: { label: string }) {
  return <div className="ab-ph" role="img" aria-label={label} />;
}

/**
 * Блок рассказа: заглушка фото и текст рядом. Микролейбл держит тонкая
 * линейка до края колонки — она и обозначает начало нового блока.
 */
function Chapter({
  eyebrow,
  title,
  media,
  reverse,
  children,
}: {
  eyebrow: string;
  title: string;
  media: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`ab-row${reverse ? " reverse" : ""}`} data-reveal>
      <div className="ab-row-media">
        <Ph label={media} />
      </div>
      <div className="ab-row-body">
        <div className="ab-row-head">
          <span className="eyebrow">{eyebrow}</span>
          <span className="ab-row-rule" />
        </div>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { openBooking } = useBookingModal();
  const { L, lp } = useLocale();
  useReveal();
  const ch = a.chapters;

  return (
    <main className="about-v2">
      <VineSpine />

      {/* ======= 02 · Название + гравюрный пейзаж ======= */}
      <section className="ab-hero">
        <div className="container ab-hero-inner">
          <div className="ab-hero-id">
            <h1 className="ab-hero-name" aria-label="Chateau At Mount">
              <span className="l1">Chateau</span>
              <span className="l2">
                At <span className="ab-ink">Mount</span>
              </span>
            </h1>
            <p className="ab-hero-tag">
              <span>{L(a.tagline)}</span>
            </p>
          </div>
          <HillScene />
        </div>
      </section>

      {/* ======= 03 · Рассказ о винодельне ======= */}
      <section className="ab-statement">
        <div className="container" data-reveal>
          <p>
            {L(a.statement.before)}
            <span className="ab-ink">{L(a.statement.ink)}</span>
            {L(a.statement.after)}
          </p>
        </div>
      </section>

      <section className="ab-story">
        <div className="container">
          <Chapter
            eyebrow={L(ch.story.eyebrow)}
            title={L(ch.story.title)}
            media={L(ch.story.media)}
          >
            <p>{L(ch.story.p1)}</p>
            <p>{L(ch.story.p2)}</p>
          </Chapter>

          <Chapter
            eyebrow={L(ch.vineyards.eyebrow)}
            title={L(ch.vineyards.title)}
            media={L(ch.vineyards.media)}
            reverse
          >
            <p>{L(ch.vineyards.p1)}</p>
          </Chapter>
        </div>
      </section>

      <section className="ab-story">
        <div className="container">
          <Chapter
            eyebrow={L(ch.terroir.eyebrow)}
            title={L(ch.terroir.title)}
            media={L(ch.terroir.media)}
          >
            <p>{L(ch.terroir.p1)}</p>
            <p>{L(ch.terroir.p2)}</p>
          </Chapter>

          <Chapter
            eyebrow={L(ch.making.eyebrow)}
            title={L(ch.making.title)}
            media={L(ch.making.media)}
            reverse
          >
            <p>{L(ch.making.p1)}</p>
            <p>{L(ch.making.p2)}</p>
          </Chapter>
        </div>
      </section>

      {/* ======= 04 · Манифест + переход к винам ======= */}
      <section
        className="manifesto ab-manifesto section-dark"
        data-header-theme="dark"
      >
        <div className="container">
          <HighlightOnScroll text={L(a.manifesto)} />
          <div
            className="ab-manifesto-foot"
            data-reveal
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            <a href={lp("/wines")} className="btn btn-accent ab-wines-cta">
              <span>{L(a.winesCta)}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ======= 05 · Приглашение — кольцевая рифма: страница начинается
           именем, а заканчивается налитым бокалом ======= */}
      <section className="ab-invite">
        <div className="container">
          <div className="ab-invite-head" data-reveal>
            <h2>{L(a.invite.title)}</h2>
            <p className="ab-invite-lead">{L(a.invite.lead)}</p>
          </div>

          <div className="ab-finale" data-reveal>
            <PourScene />
            <div className="ab-finale-body">
              {/* Фраза не закончена намеренно — её договаривает кнопка */}
              <p className="ab-finale-line">{L(a.invite.finale)}</p>
              {/* Метка источника заявки остаётся русской — её читает владелец */}
              <button
                onClick={() => openBooking("О нас · приглашение")}
                className="btn btn-accent ab-cta-btn"
              >
                <span>{L(t.about.cta)}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
