"use client";

import Image from "next/image";
import { t, wines } from "@/lib/content";
import { useLocale } from "./locale";
import { useReveal } from "./useReveal";
import { HighlightOnScroll } from "./HighlightOnScroll";
import Medal from "./Medal";

export default function AboutPage() {
  const { L } = useLocale();
  const a = t.aboutPage;
  useReveal();

  // Стаггер мерцания лучей солнца
  const ray = (i: number): React.CSSProperties => ({
    animationDelay: `${(i % 6) * 0.18}s`,
  });

  // Лучи солнца (сборка вращается медленно) — центр (160,175)
  const sunRays: [number, number, number, number][] = [
    [200, 175, 224, 175],
    [195, 195, 215, 207],
    [180, 210, 192, 231],
    [160, 216, 160, 240],
    [140, 210, 128, 231],
    [125, 195, 105, 207],
    [120, 175, 96, 175],
    [125, 155, 105, 143],
    [140, 140, 128, 119],
    [160, 134, 160, 110],
    [180, 140, 192, 119],
    [195, 155, 215, 143],
  ];

  // Гроздь винограда — перекрывающиеся ягоды, сужается книзу
  const grapeOffsets: [number, number][] = [
    [-24, 0],
    [-8, 0],
    [8, 0],
    [24, 0],
    [-16, 15],
    [0, 15],
    [16, 15],
    [-9, 30],
    [7, 30],
    [-1, 44],
  ];
  const bunches = [
    { x: 214, y: 470, d: 0.9 },
    { x: 402, y: 512, d: 1.2 },
  ];

  return (
    <main className="about">
      {/* ---------- Хиро — только иллюстрация (без текста): солнце в левом
           углу (вращение лучей + пульсация), дальние холмы, здание
           винодельни, виноградные ряды и крупная гроздь с листом. */}
      <section className="about-hero">
        <div className="about-hero-art" aria-hidden>
          <svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMax slice">
            {/* Солнце в верхнем левом углу */}
            <g className="sun-rise">
              <g className="sun-rays">
                {sunRays.map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    className="sun-ray"
                    style={ray(i)}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                  />
                ))}
              </g>
              <circle className="sun-disc" cx="160" cy="175" r="30" />
            </g>

            {/* Дальний план — ролинг-холмы */}
            <path
              className="ln ln-far"
              d="M0 372 C 200 350 380 358 560 344 C 740 330 900 348 1200 332"
            />
            <path
              className="ln ln-far"
              d="M0 398 C 240 384 430 374 640 374 C 840 374 1000 388 1200 374"
            />

            {/* Земля — возвышенность под винодельней */}
            <path
              className="ln ln-ground"
              d="M0 486 C 200 480 360 478 480 472 C 600 466 660 440 780 432 C 900 424 980 426 1060 434 C 1130 441 1170 447 1200 451"
            />

            {/* Здание винодельни — по мотивам фото: корпус с большими окнами,
                двускатная крыша, беседка-навес на столбах, стеклянная башня */}
            <g className="ln-build-g">
              {/* Двускатная крыша + корпус */}
              <path className="ln ln-build" d="M604 432 L604 372" />
              <path className="ln ln-build" d="M590 372 L672 338 L812 360" />
              <path className="ln ln-build" d="M594 379 L672 345 L810 366" />
              {/* Большие окна корпуса */}
              <path className="ln ln-win" d="M618 384 L618 430 M656 384 L656 430 M618 384 L656 384 M618 408 L656 408" />
              <path className="ln ln-win" d="M668 384 L668 430 M706 384 L706 430 M668 384 L706 384 M668 408 L706 408" />
              <path className="ln ln-win" d="M718 384 L718 430 M756 384 L756 430 M718 384 L756 384 M718 408 L756 408" />
              <path className="ln ln-win" d="M768 384 L768 430 M806 384 L806 430 M768 384 L806 384 M768 408 L806 408" />
              {/* Стеклянная башня справа */}
              <path className="ln ln-build" d="M812 432 L812 344 L878 344 L878 432" />
              <path className="ln ln-win" d="M845 350 L845 426 M816 372 L874 372 M816 400 L874 400" />
              {/* Беседка-навес на четырёх столбах */}
              <path className="ln ln-build" d="M692 338 L692 300" />
              <path className="ln ln-build" d="M728 336 L728 298" />
              <path className="ln ln-build" d="M764 336 L764 298" />
              <path className="ln ln-build" d="M800 338 L800 300" />
              <path className="ln ln-build" d="M674 300 L702 284 L790 284 L818 300 Z" />
              <path className="ln ln-build" d="M702 284 L790 284" />
            </g>

            {/* Виноградные ряды — на заднем плане, для контекста */}
            <g className="ln-rows-g">
              <path className="ln ln-row" d="M60 470 C 240 464 430 466 620 456" />
              <path className="ln ln-row" d="M50 496 C 240 490 450 492 648 480" />
              <path className="ln ln-row" d="M40 524 C 240 518 470 520 674 506" />
              <path className="ln ln-post" d="M170 458 L170 528" />
              <path className="ln ln-post" d="M340 460 L340 520" />
            </g>

            {/* Передний план — виноградная лоза: побег, лист, усик, гроздья */}
            <path
              className="ln ln-vine"
              d="M96 578 C 150 558 200 542 226 500 C 236 484 244 474 258 458"
            />
            <path
              className="ln ln-vine"
              d="M356 566 C 380 546 396 532 402 502"
            />
            {/* Усик */}
            <path
              className="ln ln-tendril"
              d="M262 456 C 274 452 278 462 270 466 C 263 470 260 462 266 460"
            />
            {/* Лист винограда */}
            <g transform="translate(300,442) scale(1.5)">
              <path
                className="ln ln-leaf"
                d="M0 0 C -4 4 -10 6 -15 5 C -11 10 -11 16 -15 20 C -8 18 -2 22 0 30 C 2 22 8 18 15 20 C 11 16 11 10 15 5 C 10 6 4 4 0 0 Z"
              />
              <path className="ln ln-leaf" d="M0 4 L0 27" />
              <path className="ln ln-leaf" d="M0 13 L-9 11 M0 13 L9 11" />
            </g>

            {/* Гроздья — перекрывающиеся ягоды, вырастают и покачиваются */}
            {bunches.map((b, i) => (
              <g key={i} transform={`translate(${b.x},${b.y})`}>
                <g className="sway" style={{ animationDelay: `${b.d}s` }}>
                  <g
                    className="grape-cluster"
                    style={{ animationDelay: `${b.d}s` }}
                  >
                    {grapeOffsets.map(([dx, dy], k) => (
                      <circle
                        key={k}
                        className="grape-dot"
                        cx={dx}
                        cy={dy}
                        r={i === 0 ? 10 : 7}
                      />
                    ))}
                  </g>
                </g>
              </g>
            ))}
          </svg>
        </div>
      </section>

      {/* ---------- Заголовок страницы — компактный блок под сценой ---------- */}
      <section className="about-lede">
        <div className="container" data-reveal>
          <span className="eyebrow">{L(a.hero.eyebrow)}</span>
          <h1>{L(a.hero.title)}</h1>
          <p className="about-hero-sub">{L(a.hero.subtitle)}</p>
        </div>
      </section>

      {/* ---------- Имя бренда — кинетическая аннотация «Mount» ---------- */}
      <section className="about-origin">
        <div className="container">
          <p className="about-origin-name" data-reveal>
            Chateau At{" "}
            <span className="mount">
              Mount
              <svg
                className="mount-line"
                viewBox="0 0 200 16"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M4 11 Q 100 3 196 11" />
              </svg>
            </span>
          </p>
          <p
            className="about-origin-text"
            data-reveal
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            {L(a.name.text)}
          </p>
        </div>
      </section>

      {/* ---------- Манифест — пословное проявление по скроллу ---------- */}
      <section className="manifesto section-dark">
        <div className="container">
          <HighlightOnScroll text={L(a.manifesto)} />
        </div>
      </section>

      {/* ---------- 01 · Холм и солнце ---------- */}
      <section>
        <div className="container">
          <div className="split">
            <div className="split-media">
              <div className="about-ph" role="img" aria-label={L(a.place.title)} />
            </div>
            <div className="split-body" data-reveal>
              <h2>{L(a.place.title)}</h2>
              <p>{L(a.place.text)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 02 · От первой лозы до бутылки ---------- */}
      <section className="section-dark">
        <div className="container">
          <div className="split reverse">
            <div className="split-media">
              <div
                className="about-ph"
                role="img"
                aria-label={L(a.process.title)}
              />
            </div>
            <div className="split-body" data-reveal>
              <h2>{L(a.process.title)}</h2>
              <p>{L(a.process.text)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 03 · С заботой о природе ---------- */}
      <section>
        <div className="container">
          <div className="split">
            <div className="split-media">
              <div
                className="about-ph"
                role="img"
                aria-label={L(a.sustain.title)}
              />
            </div>
            <div className="split-body" data-reveal>
              <h2>{L(a.sustain.title)}</h2>
              <p>{L(a.sustain.text)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Вина + награды — единый блок: бутылки, сорта, медали
           у тех, что отмечены жюри ---------- */}
      <section className="section-dark about-wines">
        <div className="container">
          <div className="about-wines-head" data-reveal>
            <span className="eyebrow">{L(t.winesSection.eyebrow)}</span>
            <h2>{L(a.varieties.title)}</h2>
            <p>{L(a.varieties.text)}</p>
          </div>
          <ul className="about-wine-grid">
            {wines.map((w, i) => (
              <li
                className="about-wine"
                key={w.slug}
                data-reveal
                style={
                  { "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties
                }
              >
                <a href={`/wines/${w.slug}`}>
                  <div className="about-wine-bottle">
                    <Image
                      src={w.image}
                      alt={w.name}
                      fill
                      sizes="(max-width: 540px) 40vw, (max-width: 900px) 22vw, 200px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <span className="about-wine-no">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(wines.length).padStart(2, "0")}
                  </span>
                  <h3>{w.name}</h3>
                  <span className="about-wine-type">{L(w.type)}</span>
                  {w.awards && w.awards.length > 0 && (
                    <ul className="about-wine-medals">
                      {w.awards.map((aw, j) => (
                        <li className={`medal-${aw.level}`} key={j}>
                          <Medal size={15} />
                          <span>{L(aw.text)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <a href="/wines" className="manifesto-link about-wines-all">
            {L(t.winesSection.all)} →
          </a>
        </div>
      </section>

      {/* ---------- Финал — двойной CTA ---------- */}
      <section className="section-dark about-cta">
        <div className="container" data-reveal>
          <h2>{L(a.cta.title)}</h2>
          <div className="contact-actions">
            <a href="/visit" className="btn btn-accent">
              {L(a.cta.visit)}
            </a>
            <a href="/wines" className="btn btn-outline">
              {L(a.cta.wines)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
