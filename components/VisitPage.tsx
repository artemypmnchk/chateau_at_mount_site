"use client";

import { useState } from "react";
import Image from "next/image";
import { t, wines, links } from "@/lib/content";
import { site } from "@/lib/site";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";
import { useReveal } from "./useReveal";

import heroImg from "@/public/images/hero-dinner.jpg";
import gastronomyImg from "@/public/images/visit-gastronomy.jpg";
import basketImg from "@/public/images/basket.jpeg";
import harvestImg from "@/public/images/harvest.jpg";

/* Заглушки-фото под форматы (владелец заменит финальными кадрами):
   Знакомство — сбор в виноградниках · Классика — вино в корзине (было
   visit-table.jpg — портрет девушки, не вино; правка по фидбеку) ·
   Гагаузский стол (флагман, тёмное полотно) — кухня, кандидат ищем. */
const lightFormatImages = [harvestImg, basketImg];

/** Вес наград: золото = 2, серебро = 1 — тот же порядок, что в ленте главной. */
function awardScore(w: (typeof wines)[number]) {
  return (w.awards ?? []).reduce(
    (sum, a) => sum + (a.level === "gold" ? 2 : 1),
    0,
  );
}
const shelfWines = [...wines].sort((a, b) => awardScore(b) - awardScore(a));

export default function VisitPage() {
  useReveal();
  const { L, locale, lp } = useLocale();
  const { openBooking } = useBookingModal();
  const v = t.visitPage;

  // Аккордеон FAQ: открыт максимум один ответ (клик по другому вопросу
  // закрывает предыдущий). Первый (цены) открыт по умолчанию —
  // иллюстрирует паттерн и держит цены на виду.
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (i: number) =>
    setOpenFaq((prev) => (prev === i ? null : i));

  const lightPackages = v.packages.slice(0, 2);
  const flagship = v.packages[2];

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
            {/* Второе действие тише первого — иначе два равных CTA спорят за палец */}
            <button
              onClick={() => openBooking()}
              className="hero-link hero-link-secondary"
            >
              {L(v.formLink)}
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Форматы: два младших на известняке (по мотивам Pasqua/Epoch).
           Крупное фото, имя, тихая метастрока курсивом, цена своей строкой,
           состав — текстом без галочек, переход — ссылка-штрих. ---------- */}
      <section className="experiences">
        <div className="container">
          <header className="exp-head" data-reveal>
            <h2>{L(v.packagesTitle)}</h2>
            <p>{L(v.packagesIntro)}</p>
          </header>
          {lightPackages.map((p, i) => (
            <article
              className={`exp${i % 2 === 1 ? " reverse" : ""}`}
              key={p.name.ru}
            >
              <div className="exp-media" data-reveal>
                <Image
                  src={lightFormatImages[i]}
                  alt={L(p.name)}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 55vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="exp-body"
                data-reveal
                style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
              >
                <h3>{L(p.name)}</h3>
                <p className="exp-meta">{L(p.meta)}</p>
                <p className="exp-price">
                  {p.price} {L(v.priceUnit)}
                </p>
                <p className="exp-text">{L(p.blurb)}</p>
                <ul className="exp-list">
                  {p.includes[locale].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button
                  onClick={() => openBooking(p.name.ru)}
                  className="hero-link exp-cta"
                >
                  {L(v.bookCta)}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Флагман «Гагаузский стол» на тёмном полотне: фото в обрез
           левого края, полка вин и условия — там же. Тональная пауза посреди
           страницы; сцену делает темнота, без бейджей. ---------- */}
      <section
        className="experiences-flagship section-dark"
        data-header-theme="dark"
      >
        <div className="flagship" data-reveal>
          <div className="flagship-media">
            <Image
              src={gastronomyImg}
              alt={L(flagship.name)}
              fill
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flagship-body">
            <h3>{L(flagship.name)}</h3>
            <p className="exp-meta">{L(flagship.meta)}</p>
            <p className="exp-price">
              {flagship.price} {L(v.priceUnit)}
            </p>
            <p className="exp-text">{L(flagship.blurb)}</p>
            <ul className="exp-list">
              {flagship.includes[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button
              onClick={() => openBooking(flagship.name.ru)}
              className="hero-link"
            >
              {L(v.bookCta)}
            </button>
          </div>
        </div>

        {/* Полка вин — страница дегустаций наконец показывает само вино */}
        <div className="container wine-shelf" data-reveal>
          <h3 className="shelf-title">{L(v.shelfTitle)}</h3>
          <div className="shelf-row">
            {shelfWines.map((w) => (
              <a className="shelf-item" href={lp(`/wines/${w.slug}`)} key={w.slug}>
                <span className="shelf-bottle">
                  <Image
                    src={w.image}
                    alt={w.name}
                    fill
                    sizes="(max-width: 720px) 92px, 120px"
                    style={{ objectFit: "contain" }}
                  />
                </span>
                <span className="shelf-name">{w.name}</span>
              </a>
            ))}
          </div>
          <a href={lp("/wines")} className="split-link shelf-all">
            {L(v.allWines)} →
          </a>
        </div>
      </section>

      {/* ---------- FAQ — типографский аккордеон на известняке ----------
           Тональная пауза между двумя тёмными полотнами. Строка-вопрос
           серифом с голым «+» (без кружков), ответ раскрывается под ней
           (grid-rows 0fr→1fr). Тексты всегда в DOM — FAQPage JSON-LD
           (app/visit/page.tsx) ничего не теряет. */}
      <section className="visit-faq" id="faq">
        <div className="container">
          <h2 data-reveal>{L(v.faqTitle)}</h2>
          <dl className="faq-list">
            {v.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  /* Открытость — через data-open, НЕ через className: reveal-хук
                     вешает .is-in прямо на DOM, и перезапись className из React
                     при тоггле стирала его — элемент «гас» после клика. */
                  className="faq-item"
                  data-open={isOpen || undefined}
                  key={item.q.ru}
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 3) * 0.1}s` } as React.CSSProperties}
                >
                  <dt>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleFaq(i)}
                    >
                      <span>{L(item.q)}</span>
                      <span className="faq-x" aria-hidden="true">
                        +
                      </span>
                    </button>
                  </dt>
                  <dd>
                    <div className="faq-a">
                      <p>{L(item.a)}</p>
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      {/* data-header-theme="dark" — без метки шапка-хамелеон гасла между флагманом
          и футером (оба помечены) и на миг светлела поверх тёмного фона.
          paddingTop у секции снова штатный: между флагманом и финалом теперь
          светлый FAQ, тёмного стыка нет. */}
      <section className="section-dark visit-final" data-header-theme="dark">
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
              <span>{L(v.bookCta)}</span>
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
          {/* Логистика (пикник/группы), а не продажа — сюда, поближе к контактам,
              а не в тёмное полотно флагмана (перегружало три задачи в одном блоке) */}
          <p className="exp-note" data-reveal>
            {L(v.priceNote)}{" "}
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="tg-link exp-note-cta"
            >
              {L(v.noteCta)} →
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
