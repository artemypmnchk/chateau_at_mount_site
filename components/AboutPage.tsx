"use client";

import { useReveal } from "./useReveal";
import { HighlightOnScroll } from "./HighlightOnScroll";
import { VineSpine } from "./VineSpine";
import { HillScene } from "./HillScene";
import { PourScene } from "./PourScene";
import { useBookingModal } from "./BookingModal";

// Серая однотонная заглушка вместо фото (фотоматериала пока мало).
function Ph({ label }: { label: string }) {
  return <div className="ab-ph" role="img" aria-label={label} />;
}

export default function AboutPage() {
  const { openBooking } = useBookingModal();
  useReveal();

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
              <span>Семейная гагаузская винодельня</span>
            </p>
          </div>
          <HillScene />
        </div>
      </section>

      {/* ======= 03 · Рассказ о винодельне ======= */}
      <section className="ab-statement">
        <div className="container" data-reveal>
          <p>
            Наша винодельня находится на юге Молдовы, у въезда в солнечную{" "}
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
              <span className="eyebrow">История</span>
              <h2>Зов предков</h2>
              <p>
                Мы — семейный проект, выросший из «зова предков». Chateau At
                Mount — детище гагаузской семьи, и её традиции слышны в характере
                и вкусе вина.
              </p>
              <p>
                Вино здесь делали задолго до нас — по-домашнему, для себя и для
                гостей. Основатель вырос на этом вкусе и, повзрослев, вернулся на
                землю родителей: из уважения к тем, кто был до него, и ради тех,
                кто будет после. Вкус из детства он повторил в своих винах — и
                рад разделить его с каждым гостем.
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
                Shiraz и другие сорта. В будущем — расширение ещё на 3–5 га и
                выпуск до 150 000 бутылок в год.
              </p>
            </div>
          </div>
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
              <h2>Солнце, ветер и виноград</h2>
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

      {/* ======= 04 · Манифест + переход к винам ======= */}
      <section
        className="manifesto ab-manifesto section-dark"
        data-header-theme="dark"
      >
        <div className="container">
          <HighlightOnScroll text="Мы работаем, чтобы дать вам ощутить *многолетнюю историю* и традиции нашего народа — в каждом *бокале* нашего вина" />
          <div
            className="ab-manifesto-foot"
            data-reveal
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            <a href="/wines" className="btn btn-accent ab-wines-cta">
              <span>Наши вина</span>
            </a>
          </div>
        </div>
      </section>

      {/* ======= 05 · Приглашение — кольцевая рифма: страница начинается
           именем, а заканчивается налитым бокалом ======= */}
      <section className="ab-invite">
        <div className="container">
          <div className="ab-invite-head" data-reveal>
            <h2>Рады вам в любой день</h2>
            <p className="ab-invite-lead">
              Купите вино прямо у шато, приезжайте на дегустацию или отметьте у
              нас событие — с видом на Чадыр-Лунгу, за столом прямо у лоз.
            </p>
          </div>

          <div className="ab-finale" data-reveal>
            <PourScene />
            <div className="ab-finale-body">
              {/* Фраза не закончена намеренно — её договаривает кнопка */}
              <p className="ab-finale-line">Бокал уже налит, осталось только…</p>
              <button
                onClick={() => openBooking("О нас · приглашение")}
                className="btn btn-accent ab-cta-btn"
              >
                <span>Приехать в гости</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
