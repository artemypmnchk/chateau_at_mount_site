"use client";

import { useState } from "react";
import { t, links } from "@/lib/content";
import { site } from "@/lib/site";
import { useLocale } from "./locale";

function Check() {
  return (
    <svg
      className="check"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactsPage() {
  const { L, locale } = useLocale();
  const c = t.contactsPage;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    topic: "",
    contact: "",
    phone: "",
  });

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Заявка с сайта Chateau At Mount");
    const body = encodeURIComponent(
      [
        `Имя: ${form.name}`,
        `Вопрос: ${form.topic}`,
        `Telegram / почта: ${form.contact}`,
        `Телефон: ${form.phone}`,
      ].join("\n")
    );
    window.location.href = `mailto:${site.contacts.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main className="contacts">
      {/* ---------- Intro ---------- */}
      <section className="contacts-hero section-dark">
        <div className="container">
          <span className="eyebrow">{L(c.eyebrow)}</span>
          <h1>{L(c.title)}</h1>
          <p className="lead">{L(c.intro)}</p>
        </div>
      </section>

      {/* ---------- Offer + Together ---------- */}
      <section>
        <div className="container">
          <div className="coop-grid">
            <div className="coop-card">
              <h2>{L(c.offerTitle)}</h2>
              <ul className="coop-list">
                {c.offer[locale].map((item) => (
                  <li key={item}>
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="coop-card">
              <h2>{L(c.togetherTitle)}</h2>
              <ul className="coop-list">
                {c.together[locale].map((item) => (
                  <li key={item}>
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Form + contacts ---------- */}
      <section className="section-dark form-section">
        <div className="container">
          <div className="form-grid">
            {/* Form */}
            <div className="form-card">
              <h2>{L(c.formTitle)}</h2>
              <p className="form-note">{L(c.formNote)}</p>

              {sent ? (
                <div className="form-success">{L(c.success)}</div>
              ) : (
                <form onSubmit={onSubmit} className="contact-form">
                  <input
                    type="text"
                    placeholder={L(c.fields.name)}
                    value={form.name}
                    onChange={set("name")}
                    required
                  />
                  <input
                    type="text"
                    placeholder={L(c.fields.topic)}
                    value={form.topic}
                    onChange={set("topic")}
                  />
                  <input
                    type="text"
                    placeholder={L(c.fields.contact)}
                    value={form.contact}
                    onChange={set("contact")}
                    required
                  />
                  <input
                    type="tel"
                    placeholder={L(c.fields.phone)}
                    value={form.phone}
                    onChange={set("phone")}
                  />
                  <button type="submit" className="btn btn-accent">
                    {L(c.submit)}
                  </button>
                  <a
                    className="tg-link"
                    href={links.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {L(c.orTelegram)}
                  </a>
                </form>
              )}
            </div>

            {/* Contact details */}
            <div className="contacts-info">
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
                <span className="info-value">{site.contacts.addressLine}</span>
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
