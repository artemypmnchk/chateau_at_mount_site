"use client";

import { useEffect, useState } from "react";
import { t, locales } from "@/lib/content";
import { useLocale } from "./locale";

const navItems = [
  { href: "/#about", label: t.nav.about },
  { href: "/wines", label: t.nav.wines },
  { href: "/visit", label: t.nav.visit },
  { href: "/#events", label: t.nav.events },
  { href: "/contacts", label: t.nav.contacts },
];

function LangToggle({ style }: { style?: React.CSSProperties }) {
  const { locale, setLocale } = useLocale();
  return (
    <div className="lang" role="group" aria-label="Language" style={style}>
      {locales.map((l) => (
        <button
          key={l}
          className={locale === l ? "active" : ""}
          onClick={() => setLocale(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { L } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="/" className="brand" aria-label="Chateau At Mount">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Chateau At Mount" />
            <span className="brand-name">Chateau At Mount</span>
          </a>

          <nav className="nav">
            <div className="nav-links">
              {navItems.map((n, i) => (
                <a key={n.href} href={n.href}>
                  <span className="nav-num">{String(i + 1).padStart(2, "0")}</span>
                  {L(n.label)}
                </a>
              ))}
            </div>
            <LangToggle />
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

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {navItems.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
            {L(n.label)}
          </a>
        ))}
        <LangToggle style={{ marginTop: 12 }} />
      </div>
    </>
  );
}
