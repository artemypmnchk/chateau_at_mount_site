"use client";

import Image from "next/image";
import { wines, links } from "@/lib/content";
import { useReveal } from "./useReveal";
import { HighlightOnScroll } from "./HighlightOnScroll";
import { VineSpine } from "./VineSpine";
import { CtaWreath } from "./CtaWreath";

// Витрина вин страницы «О нас»: короткое знакомство, не паспорт сорта.
// Картинка бутылки и акцент-цвет берутся из lib/content.ts по слагу, чтобы
// визуал совпадал со страницей вина; тексты — кураторские, под этот блок.
const bySlug = Object.fromEntries(wines.map((w) => [w.slug, w] as const));

type Showcase = {
  slug: string;
  name: string;
  type: string;
  notes: string;
  desc: string;
  award?: string;
};

const showcase: Showcase[] = [
  {
    slug: "merlot",
    name: "Merlot",
    type: "Сухое красное",
    notes: "вишня · ежевика · дуб",
    desc: "Округлое, щедрое, с ароматом спелой вишни — вино, с которого легко начать разговор.",
    award: "Золото · Asia Wine Trophy 2023",
  },
  {
    slug: "cabernet-rose",
    name: "Cabernet Rosé",
    type: "Сухое розовое",
    notes: "клубника · малина · черника",
    desc: "Летнее розе с ягодным ароматом и чистой кислотностью. Бокал заката.",
  },
  {
    slug: "viorica",
    name: "Viorica",
    type: "Сухое белое",
    notes: "полевые цветы · базилик · цитрус",
    desc: "Наш редкий автохтон и самый титулованный: цветы, травы и цитрус в одном бокале.",
    award: "Три золота · Berliner · Asia Wine Trophy · Mundus Vini",
  },
  {
    slug: "feteasca-neagra",
    name: "Fetească Neagră",
    type: "Сухое красное",
    notes: "лесные ягоды · малина · инжир",
    desc: "Древний сорт этих земель — тёмный, ягодный, с бархатной глубиной.",
  },
  {
    slug: "cabernet-sauvignon",
    name: "Cabernet Sauvignon",
    type: "Сухое красное",
    notes: "чёрная вишня · слива · специи",
    desc: "Плотное, структурное, для долгих ужинов.",
    award: "Berliner Wine Trophy",
  },
  {
    slug: "feteasca-alba",
    name: "Fetească Albă",
    type: "Сухое белое",
    notes: "полевые цветы · зелёное яблоко · цитрус",
    desc: "Свежее и цветочное — местная классика в лёгком прочтении.",
  },
  {
    slug: "shiraz",
    name: "Shiraz",
    type: "Сухое красное",
    notes: "чёрная вишня · слива · гранат",
    desc: "Пряное, тёплое, южное — характер юга в бутылке.",
    award: "Asia Wine Trophy",
  },
];

// Серая однотонная заглушка вместо фото (фотоматериала пока мало).
function Ph({ label }: { label: string }) {
  return <div className="ab-ph" role="img" aria-label={label} />;
}

export default function AboutPage() {
  useReveal();

  return (
    <main className="about-v2">
      <VineSpine />

      {/* ======= 02 · Название + анимация розлива ======= */}
      <section className="ab-hero">
        <div className="container ab-hero-inner">
          <h1 className="ab-hero-name" aria-label="Chateau At Mount">
            <span className="l1">Chateau</span>
            <span className="l2">
              At <span className="ab-ink">Mount</span>
            </span>
          </h1>
          <p className="ab-hero-tag">
            <span>Семейная гагаузская винодельня</span>
            {/* Анимация: невидимая рука берёт бутылку, наливает в бокал,
                бутылка возвращается на место. Чистый CSS/SVG, играет на
                загрузке; при reduced-motion — сразу финальный кадр. */}
            <span className="ab-pour" aria-hidden>
              <svg viewBox="0 0 120 96" className="ab-pour-svg">
                <defs>
                  <clipPath id="ab-glass-clip">
                    <path d="M72 30 L100 30 Q99 52 86 56 Q73 52 72 30 Z" />
                  </clipPath>
                </defs>
                <g className="ab-pour-glass">
                  <path className="ab-ln" d="M72 30 L100 30" />
                  <path className="ab-ln" d="M72 30 Q73 52 86 56 Q99 52 100 30" />
                  <path className="ab-ln" d="M86 56 L86 74" />
                  <path className="ab-ln" d="M76 74 L96 74" />
                  <rect
                    className="ab-pour-wine"
                    clipPath="url(#ab-glass-clip)"
                    x="70"
                    y="28"
                    width="32"
                    height="30"
                  />
                </g>
                <path className="ab-pour-stream" d="M74 17 L85 30" />
                <g className="ab-pour-bottle">
                  <path
                    className="ab-ln"
                    d="M16 86 L16 46 C16 42 20 40 24 39 L24 22 L36 22 L36 39 C40 40 44 42 44 46 L44 86 Z"
                  />
                  <path className="ab-ln ab-bottle-label" d="M20 60 L40 60" />
                </g>
              </svg>
            </span>
          </p>
        </div>
      </section>

      {/* ======= 03 · Рассказ о винодельне ======= */}
      <section className="ab-statement">
        <div className="container" data-reveal>
          <p>
            Наша винодельня — на юге Молдовы, у въезда в солнечную{" "}
            <span className="ab-ink">Чадыр-Лунгу</span>, на самой высокой точке
            холма.
          </p>
        </div>
      </section>

      <section className="ab-story">
        <div className="container">
          {/* Семья и зов предков */}
          <div className="ab-row" data-reveal>
            <div className="ab-row-media">
              <Ph label="Семья винодельни" />
            </div>
            <div className="ab-row-body">
              <span className="eyebrow">Семья и зов предков</span>
              <h2>Детище гагаузской семьи</h2>
              <p>
                Мы — семейный проект, воплощённый благодаря «зову предков».
                Винодельня стала детищем гагаузской семьи, наследников традиций,
                что отражаются в исключительном качестве и вкусе вина.
              </p>
              <p>
                Её основатель вырос на историях о своих предках, которые делали
                вино задолго до него. По зову души он вернулся на родину
                родителей — чтобы отдать дань уважения, сохранить традиции и
                продолжить дело, передав его следующим поколениям. В своих винах
                он повторил тот натуральный вкус, что помнил с детства, — и рад
                поделиться им с каждым гостем.
              </p>
            </div>
          </div>

          {/* Виноградники */}
          <div className="ab-row reverse" data-reveal>
            <div className="ab-row-media">
              <Ph label="Виноградники винодельни" />
            </div>
            <div className="ab-row-body">
              <span className="eyebrow">Виноградники</span>
              <h2>От первой лозы до бутылки</h2>
              <p>
                Первые лозы посадили в 2019-м, а уже в 2020-м собрали первый
                урожай. Сегодня семья развивает 8 га виноградников — Cabernet
                Sauvignon, Merlot, Fetească Neagră, Fetească Albă, Viorica,
                Shiraz и другие сорта. В будущем — расширение ещё на 3–5 га и до
                150 000 бутылок в год.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Цифры-факты */}
      <section className="ab-facts">
        <div className="container ab-facts-grid" data-reveal>
          {[
            { n: "2019", l: "первые лозы" },
            { n: "2020", l: "первый урожай" },
            { n: "8 га", l: "виноградников" },
            { n: "100 м", l: "от лоз до шато" },
            { n: "150 000", l: "бутылок в год" },
          ].map((f, i) => (
            <div className="ab-fact" key={f.l}>
              <span
                className="ab-fact-n"
                data-num={f.n}
                style={{ "--fill-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                {f.n}
              </span>
              <span className="ab-fact-l">{f.l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ab-story">
        <div className="container">
          {/* Терруар и свежесть */}
          <div className="ab-row" data-reveal>
            <div className="ab-row-media">
              <Ph label="Терруар и климат" />
            </div>
            <div className="ab-row-body">
              <span className="eyebrow">Терруар</span>
              <h2>Солнце, ветер и сто метров</h2>
              <p>
                Участок — в 100 метрах от шато: виноград доставляется максимально
                свежим, а контролируемая ферментация и минимум сульфитов
                сохраняют натуральный вкус и кислотность.
              </p>
              <p>
                Континентальный климат юга — жаркие сухие лета, много солнца и
                заметные перепады дневных и ночных температур к концу сезона —
                даёт ягоде и сахар, и живую кислотность.
              </p>
            </div>
          </div>

          {/* Философия виноделия */}
          <div className="ab-row reverse" data-reveal>
            <div className="ab-row-media">
              <Ph label="Погреб и дубовые баррики" />
            </div>
            <div className="ab-row-body">
              <span className="eyebrow">Виноделие</span>
              <h2>Три дуба, три характера</h2>
              <p>
                За вином стоит простая философия: как можно меньше вмешательства.
                Виноград приходит свежим, ферментация под контролем, сульфитов —
                минимум.
              </p>
              <p>
                Дальше выдержка: где-то в нержавеющей стали, чтобы сберечь фрукт,
                где-то в барриках из молдавского, карпатского и французского
                дуба, чтобы добавить глубины. Три дуба, три характера — бочку
                подбираем под каждое вино.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= 04 · Манифест + витрина вин ======= */}
      <section
        className="manifesto ab-manifesto section-dark"
        data-header-theme="dark"
      >
        <div className="container">
          <HighlightOnScroll text="Работаем, чтобы дать вам ощутить *многолетнюю историю* и традиции нашего народа — в каждом *бокале* нашего вина" />
        </div>
      </section>

      <section className="ab-wines section-dark" data-header-theme="dark">
        <div className="container">
          <div className="ab-wines-head" data-reveal>
            <span className="eyebrow">Наши вина</span>
            <h2>
              <span className="ab-quote">«At Mount»</span> — на высоте
            </h2>
            <p className="ab-wines-sub">И в географии, и в бокале.</p>
          </div>

          <ul className="ab-wine-grid">
            {showcase.map((s, i) => {
              const w = bySlug[s.slug];
              return (
                <li
                  className="ab-wine"
                  key={s.slug}
                  data-reveal
                  style={
                    {
                      "--v": w?.accent ?? "#d0a09b",
                      "--reveal-delay": `${(i % 4) * 70}ms`,
                    } as React.CSSProperties
                  }
                >
                  <div className="ab-wine-bottle">
                    {w && (
                      <Image
                        src={w.image}
                        alt={s.name}
                        fill
                        sizes="(max-width: 560px) 42vw, (max-width: 900px) 24vw, 200px"
                        style={{ objectFit: "contain" }}
                      />
                    )}
                  </div>
                  <div className="ab-wine-body">
                    {s.award && (
                      <span className="ab-wine-medal medal-gold">
                        <span className="dot" />
                        {s.award}
                      </span>
                    )}
                    <h3>{s.name}</h3>
                    <span className="ab-wine-meta">
                      {s.type} · <i>{s.notes}</i>
                    </span>
                    <p className="ab-wine-desc">{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ======= 05 · Приглашение — единственный призыв в венке лозы ======= */}
      <section className="ab-invite">
        <div className="container">
          <div className="ab-invite-head" data-reveal>
            <span className="eyebrow">Визит</span>
            <h2>Приезжайте к нам в гости</h2>
            <p className="ab-invite-lead">
              Купите вино прямо у шато, приезжайте на дегустацию или отметьте у
              нас событие — с видом на Чадыр-Лунгу, за столом прямо у лоз.
            </p>
          </div>

          <CtaWreath />

          <p className="ab-invite-b2b" data-reveal>
            Опт, экспорт и коллаборации —{" "}
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="tg-link"
            >
              напишите нам в Telegram
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
