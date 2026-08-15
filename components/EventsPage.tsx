"use client";

import { t, links } from "@/lib/content";
import { useLocale } from "./locale";
import { useReveal } from "./useReveal";
import { useBookingModal } from "./BookingModal";

const e = t.eventsPage;

/**
 * Страница «Мероприятия».
 *
 * Страницу организует свет: сверху известняковый день, к середине фон уводится
 * в золотой час, внизу — тёмный вечер, где живёт единственное действие. Дуга
 * сделана длинным градиентом на секции предложений, а не скролл-анимацией:
 * визуально результат тот же (свет привязан к месту на странице), но без
 * зависимости от поддержки браузером и без оговорок про reduced-motion.
 *
 * Порядок предложений в lib/content.ts идёт от дневных к ночным и совпадает с
 * дугой — от дегустации при свете дня до ночёвки. Это же порядок владельца.
 *
 * Фото пока нет: вместо них тёплые заглушки (как было на «О винодельне»).
 */
function Ph({ label }: { label: string }) {
  return <div className="ev-ph" role="img" aria-label={label} />;
}

export default function EventsPage() {
  const { L, lp } = useLocale();
  const { openBooking } = useBookingModal();
  useReveal();

  return (
    <main className="events">
      {/* ======= Хиро — светлый край дуги, набран как пригласительный:
           симметрия, короткие волосяные линейки, много воздуха. Страница про
           приглашение сделана в форме приглашения — отсюда и центр, который
           на остальных страницах сайта не используется. Изображения нет
           намеренно: на открытке его и не бывает. ======= */}
      <section className="ev-hero">
        <div className="container">
          <div className="ev-invite" data-reveal>
            <span className="ev-rule" aria-hidden="true" />
            {/* Тире вынесено в разметку и «висит» за краем строки: если
                считать его шириной, первая строка перевешивает и композиция
                по оси перестаёт быть симметричной. Классическая висячая
                пунктуация — центрируем по словам, а не по коробкам. */}
            <h1 className="ev-hero-title">
              <span className="ev-t-line">
                {L(e.titleA)}
                <span className="ev-t-dash">&nbsp;—</span>
              </span>{" "}
              <span className="ev-t-line">{L(e.titleB)}</span>
            </h1>
            <span className="ev-rule" aria-hidden="true" />
            <p className="ev-hero-lead">{L(e.intro)}</p>
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              <span>{L(e.heroCta)}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ======= Предложения — тело дуги: свет теплеет к низу ======= */}
      <section className="ev-offers">
        <div className="container">
          <div className="ev-offers-head" data-reveal>
            <span className="eyebrow">{L(e.offersEyebrow)}</span>
            <h2>{L(e.offersTitle)}</h2>
          </div>

          <div className="ev-list">
            {e.offers.map((o, i) => {
              // Ссылка есть только у дегустаций — у остальных ключа нет вовсе,
              // поэтому сужаем союз через `in`, а не приводим тип
              const href = "href" in o ? o.href : undefined;
              return (
              <article
                key={o.name.ru}
                className={`ev-row${i % 2 ? " reverse" : ""}`}
                data-reveal
              >
                <div className="ev-row-media">
                  <Ph label={L(o.media)} />
                </div>
                <div className="ev-row-body">
                  {/* Номер — не украшение: предложения идут по ходу дня,
                      от дегустации при свете до ночёвки */}
                  <span className="ev-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{L(o.name)}</h3>
                  {"blurb" in o && <p>{L(o.blurb)}</p>}
                  {"items" in o && (
                    <ul className="ev-sublist">
                      {o.items.map((it) => (
                        <li key={it.ru}>{L(it)}</li>
                      ))}
                    </ul>
                  )}
                  {href && (
                    <a href={lp(href)} className="split-link">
                      {L(e.offerMore)} →
                    </a>
                  )}
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======= Финал — тёмный край дуги. Метка темы обязательна: без неё
           шапка-хамелеон светлеет поверх тёмного фона ======= */}
      <section
        className="section-dark ev-final"
        data-header-theme="dark"
      >
        <div className="container">
          <h2 data-reveal>{L(e.finalTitle)}</h2>
          <div
            className="contact-actions"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              <span>{L(e.finalTg)}</span>
            </a>
            <button
              onClick={() => openBooking("Мероприятия · финал")}
              className="btn btn-outline"
            >
              {L(e.finalForm)}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
