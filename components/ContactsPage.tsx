"use client";

import { t, links } from "@/lib/content";
import { site } from "@/lib/site";
import { useLocale } from "./locale";
import BookingForm from "./BookingForm";

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
              <BookingForm />
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
