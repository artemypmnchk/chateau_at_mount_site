"use client";

import { t, links } from "@/lib/content";
import { site } from "@/lib/site";
import { useLocale } from "./locale";
import { useReveal } from "./useReveal";
import BookingForm from "./BookingForm";

export default function ContactsPage() {
  useReveal();
  const { L, locale } = useLocale();
  const c = t.contactsPage;

  return (
    <main className="contacts">
      {/* ---------- Intro ----------
          Контакты на первом экране: почта и телефон текстовыми ссылками
          жестом «линия-штрих», без залитых кнопок (правило 1 DESIGN.md). */}
      <section className="contacts-hero section-dark">
        <div className="container">
          <span className="eyebrow" data-reveal>
            {L(c.eyebrow)}
          </span>
          <h1
            data-reveal
            style={{ "--reveal-delay": "0.06s" } as React.CSSProperties}
          >
            {L(c.title)}
          </h1>
          <p
            className="lead"
            data-reveal
            style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
          >
            {L(c.intro)}
          </p>
          <div
            className="contacts-hero-links"
            data-reveal
            style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}
          >
            <a className="hero-link" href={`mailto:${site.contacts.email}`}>
              {site.contacts.email}
            </a>
            <a className="hero-link" href={site.contacts.phoneHref}>
              {site.contacts.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Сотрудничество: редакторские блоки ----------
          Заголовок слева, строки-хейрлайны справа. Без галочек и чипов —
          та же тихая «таблица», что на странице дегустаций (.exp-list). */}
      <section className="coop">
        <div className="container">
          <div
            className="coop-block"
            data-reveal
            style={{ "--reveal-delay": "0.06s" } as React.CSSProperties}
          >
            <h2>{L(c.offerTitle)}</h2>
            <ul className="coop-rows">
              {c.offer[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div
            className="coop-block"
            data-reveal
            style={{ "--reveal-delay": "0.06s" } as React.CSSProperties}
          >
            <h2>{L(c.togetherTitle)}</h2>
            <ul className="coop-rows">
              {c.together[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Form + contacts ---------- */}
      <section className="section-dark form-section">
        <div className="container">
          <div className="form-grid">
            {/* Form */}
            <div className="form-card" data-reveal>
              <h2>{L(c.formTitle)}</h2>
              <p className="form-note">{L(c.formNote)}</p>
              <BookingForm />
            </div>

            {/* Contact details */}
            <div
              className="contacts-info"
              data-reveal
              style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
            >
              <h2>{L(c.contactsTitle)}</h2>
              <a className="info-row" href={`mailto:${site.contacts.email}`}>
                <span className="info-label">{L(c.emailLabel)}</span>
                <span className="info-value">{site.contacts.email}</span>
              </a>
              <a className="info-row" href={site.contacts.phoneHref}>
                <span className="info-label">{L(c.phoneLabel)}</span>
                <span className="info-value">{site.contacts.phone}</span>
              </a>
              <div className="info-row">
                <span className="info-label">{L(c.addressLabel)}</span>
                <span className="info-value">
                  {L(site.contacts.addressLine)}
                </span>
                <a
                  className="map-link"
                  href={site.contacts.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {L(c.showOnMap)} →
                </a>
              </div>
              <div className="info-socials">
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href={links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
                <a
                  href={links.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
