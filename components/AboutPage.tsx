"use client";

import Image, { type StaticImageData } from "next/image";
import { t } from "@/lib/content";
import { useLocale } from "./locale";
import { useReveal } from "./useReveal";
import { HighlightOnScroll } from "./HighlightOnScroll";
import { VineSpine } from "./VineSpine";
import { HillScene } from "./HillScene";
import { PourScene } from "./PourScene";
import { useBookingModal } from "./BookingModal";

import founderImg from "@/public/images/about-founder.jpg";
import vineyardsImg from "@/public/images/about-vineyards.jpg";
import terroirImg from "@/public/images/about-terroir.jpg";
import cellarImg from "@/public/images/about-cellar.jpg";

const a = t.aboutPage;

// Серая однотонная заглушка вместо фото (фотоматериала пока мало).
function Ph({ label }: { label: string }) {
  return <div className="ab-ph" role="img" aria-label={label} />;
}

/**
 * Блок рассказа: фото (или заглушка, пока кадра нет) и текст рядом. Микролейбл
 * держит тонкая линейка до края колонки — она и обозначает начало нового блока.
 * `image` — статический импорт, next/image сам считает размеры и blur.
 * `caption` — подпись под кадром, если на нём есть кого назвать.
 */
function Chapter({
  eyebrow,
  title,
  media,
  image,
  imagePosition,
  caption,
  reverse,
  children,
}: {
  eyebrow: string;
  /** Необязателен: у главы «История» заголовка нет, блок открывается
   *  микролейблом и сразу текстом. Пустой <h2> в таком случае не выводим —
   *  он ломал бы структуру заголовков страницы. */
  title?: string;
  media: string;
  image?: StaticImageData;
  imagePosition?: string;
  caption?: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`ab-row${reverse ? " reverse" : ""}`} data-reveal>
      <figure className="ab-row-media-col">
        <div className="ab-row-media">
          {image ? (
            <Image
              src={image}
              alt={media}
              fill
              placeholder="blur"
              /* см. EventsPage: 65 вместо 75, на размере показа неотличимо.
                 Четыре кадра страницы: 239 → 172 КБ. */
              quality={65}
              /* Замерено по вёрстке: до 480px кадр занимает ~78vw (колонка
                 минус поле под лозу), до 900px доходит до 87vw, выше — около
                 42vw половины сетки, а с 1441px гэп упирается в максимум и
                 кадр застывает на 540px. Прежние «100vw / 50vw» просили
                 ступень srcset крупнее той, что реально показывается. */
              sizes="(max-width: 480px) 80vw, (max-width: 900px) 88vw, (max-width: 1440px) 43vw, 540px"
              style={{
                objectFit: "cover",
                objectPosition: imagePosition ?? "center",
              }}
            />
          ) : (
            <Ph label={media} />
          )}
        </div>
        {caption && (
          <figcaption className="ab-row-caption">{caption}</figcaption>
        )}
      </figure>
      <div className="ab-row-body">
        <div className="ab-row-head">
          <span className="eyebrow">{eyebrow}</span>
          <span className="ab-row-rule" />
        </div>
        {title && <h2>{title}</h2>}
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
              <span className="l1">Chateau</span>{" "}
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
            media={L(ch.story.media)}
            image={founderImg}
            caption={L(ch.story.caption)}
          >
            <p>{L(ch.story.p1)}</p>
            <p>{L(ch.story.p2)}</p>
          </Chapter>

          <Chapter
            eyebrow={L(ch.vineyards.eyebrow)}
            title={L(ch.vineyards.title)}
            media={L(ch.vineyards.media)}
            image={vineyardsImg}
            /* Кадр вертикальный, рамка 4:3 — держим бутылки и грозди целиком */
            imagePosition="center 65%"
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
            image={terroirImg}
          >
            <p>{L(ch.terroir.p1)}</p>
            <p>{L(ch.terroir.p2)}</p>
          </Chapter>

          <Chapter
            eyebrow={L(ch.making.eyebrow)}
            title={L(ch.making.title)}
            media={L(ch.making.media)}
            image={cellarImg}
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
