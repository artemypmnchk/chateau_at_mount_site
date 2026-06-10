"use client";

import { useEffect, useRef, useState } from "react";
import { t, wines, links, type Locale } from "@/lib/content";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M22.5 12.5 15 20l7.5 7.5" : "M17.5 12.5 25 20l-7.5 7.5"}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Site() {
  const [locale, setLocale] = useState<Locale>("ru");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const L = (s: Record<Locale, string>) => s[locale];

  const slide = (dir: 1 | -1) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 322, behavior: "smooth" });
  };

  const navItems = [
    { href: "#about", label: t.nav.about },
    { href: "#wines", label: t.nav.wines },
    { href: "#events", label: t.nav.events },
    { href: "#contacts", label: t.nav.contacts },
  ];

  return (
    <>
      {/* ---------- Header ---------- */}
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Chateau At Mount">
            <img src="/images/logo.png" alt="Chateau At Mount" />
            <span className="brand-name">Chateau At Mount</span>
          </a>

          <nav className="nav">
            <div className="nav-links">
              {navItems.map((n) => (
                <a key={n.href} href={n.href}>
                  {L(n.label)}
                </a>
              ))}
            </div>
            <div className="lang" role="group" aria-label="Language">
              <button
                className={locale === "ru" ? "active" : ""}
                onClick={() => setLocale("ru")}
              >
                RU
              </button>
              <button
                className={locale === "en" ? "active" : ""}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
            </div>
            <button
              className="burger"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M3 7h20M3 13h20M3 19h20"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* ---------- Mobile menu ---------- */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {navItems.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
            {L(n.label)}
          </a>
        ))}
        <div className="lang" style={{ marginTop: 12 }}>
          <button
            className={locale === "ru" ? "active" : ""}
            onClick={() => setLocale("ru")}
          >
            RU
          </button>
          <button
            className={locale === "en" ? "active" : ""}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
        </div>
      </div>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="hero">
          <div className="hero-bg">
            <img src="/images/hero-winery.png" alt="Винодельня Chateau At Mount" />
          </div>
          <div className="container hero-content">
            <h1>{t.hero.brand}</h1>
            <p className="tagline">{L(t.hero.tagline)}</p>
            <div className="hero-actions">
              <a href="#wines" className="btn btn-accent">
                {L(t.cta.learn)}
              </a>
              <a href="#contacts" className="btn btn-outline">
                {L(t.cta.book)}
              </a>
            </div>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="about">
          <div className="container">
            <h2>{L(t.about.line1)}</h2>
            <p>{L(t.about.line2)}</p>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="features">
              <article className="feature-card">
                <img src="/images/vineyard.png" alt={L(t.features.vineyard.title)} />
                <div className="body">
                  <h3>{L(t.features.vineyard.title)}</h3>
                  <p>{L(t.features.vineyard.text)}</p>
                </div>
              </article>
              <article className="feature-card">
                <img src="/images/basket.jpeg" alt={L(t.features.taste.title)} />
                <div className="body">
                  <h3>{L(t.features.taste.title)}</h3>
                  <p>{L(t.features.taste.text)}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- Wines ---------- */}
        <section id="wines" className="section-dark">
          <div className="container">
            <div className="wines-head">
              <div>
                <span className="eyebrow">{L(t.winesSection.eyebrow)}</span>
                <h2>{L(t.winesSection.title)}</h2>
              </div>
              <div className="slider-controls">
                <button
                  className="slider-btn"
                  aria-label="Previous"
                  onClick={() => slide(-1)}
                >
                  <Chevron dir="left" />
                </button>
                <button
                  className="slider-btn"
                  aria-label="Next"
                  onClick={() => slide(1)}
                >
                  <Chevron dir="right" />
                </button>
              </div>
            </div>
            <div className="slider" ref={sliderRef}>
              {wines.map((w) => (
                <article className="wine-card" key={w.name}>
                  <div className="wine-img">
                    <img src={w.image} alt={w.name} />
                  </div>
                  <h3>{w.name}</h3>
                  <p>{L(w.desc)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Control (process) ---------- */}
        <section>
          <div className="container">
            <div className="split">
              <div className="split-media">
                <img src="/images/tanks.jpg" alt={L(t.control.title)} />
              </div>
              <div className="split-body">
                <h2>{L(t.control.title)}</h2>
                <p>{L(t.control.text)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Memories / events ---------- */}
        <section id="events" className="section-dark">
          <div className="container">
            <div className="split reverse">
              <div className="split-media">
                <img src="/images/family.jpeg" alt={L(t.memories.title)} />
              </div>
              <div className="split-body">
                <span className="eyebrow">{L(t.nav.events)}</span>
                <h2>{L(t.memories.title)}</h2>
                <p>{L(t.memories.text)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contacts" className="section-dark contact" style={{ paddingTop: 0 }}>
          <div className="container">
            <h2>{L(t.contact.title)}</h2>
            <p>{L(t.contact.text)}</p>
            <div className="contact-cards">
              {t.contact.cards.map((c, i) => (
                <div className="contact-card" key={i}>
                  <div className="label">{L(c.label)}</div>
                  <div className="value">{L(c.value)}</div>
                </div>
              ))}
            </div>
            <div className="contact-actions">
              <a
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                Telegram
              </a>
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Final CTA ---------- */}
        <section className="final-cta">
          <div className="container">
            <h2>{L(t.finalCta.title)}</h2>
            <div className="hero-actions">
              <a href="#wines" className="btn btn-primary">
                {L(t.cta.learn)}
              </a>
              <a href="#contacts" className="btn btn-ghost-dark">
                {L(t.cta.book)}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="brand">
                <img src="/images/logo.png" alt="Chateau At Mount" />
                <span className="brand-name" style={{ color: "#fff" }}>
                  Chateau At Mount
                </span>
              </div>
              <p>{L(t.about.line1)}</p>
            </div>
            <div className="footer-col">
              <h4>{L(t.footer.brandCol)}</h4>
              <a href="#about">{L(t.nav.about)}</a>
              <a href="#wines">{L(t.nav.wines)}</a>
              <a href="#events">{L(t.nav.events)}</a>
            </div>
            <div className="footer-col">
              <h4>{L(t.footer.socialCol)}</h4>
              <a href={links.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href={links.telegram} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
              <a href={links.tiktok} target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </div>
            <div className="footer-col">
              <h4>{L(t.footer.extraCol)}</h4>
              <a href="#contacts">{L(t.nav.contacts)}</a>
            </div>
          </div>
          <div className="footer-bottom">{L(t.footer.rights)}</div>
        </div>
      </footer>
    </>
  );
}
