"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { t, locales } from "@/lib/content";
import { useLocale } from "./locale";
import { useBookingModal } from "./BookingModal";

const navItems = [
  { href: "/about", label: t.nav.about },
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
  const { openBooking } = useBookingModal();
  const pathname = usePathname();
  // Страницы со светлым хиро: текст шапки тёмный поверх известняка
  const onLight = pathname === "/about";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // «Хамелеон»: пока под шапкой тёмное помеченное полотно (хиро → манифест →
  // лента вин), шапка растворяется — прозрачная, светлый текст. Как только
  // полотно уходит из-под шапки (светлые блоки ниже вин или страницы без
  // разметки), хамелеон гаснет и шапка возвращается к обычному виду.
  const [chameleon, setChameleon] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Линия, по которой «читаем» полотно — примерно на уровне навигации
    const HEADER_LINE = 38;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme]")
    );

    const update = () => {
      setScrolled(window.scrollY > 40);
      let active: "dark" | "light" | null = null;
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= HEADER_LINE && r.bottom > HEADER_LINE) {
          active = el.dataset.headerTheme as "dark" | "light";
          break;
        }
      }
      setChameleon(active !== null);
      if (active) setTheme(active);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <>
      <header
        className={`header${scrolled ? " scrolled" : ""}${
          chameleon ? " chameleon" : ""
        }${onLight ? " on-light" : ""}`}
        data-theme={chameleon ? theme : undefined}
      >
        <div className="container header-inner">
          <a href="/" className="brand" aria-label="Chateau At Mount">
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <LangToggle />
            {/* Бургер из трёх линий-спанов: в открытом меню CSS складывает
                их в крест — иконка честно показывает, что тап закроет меню */}
            <button
              className={`burger${menuOpen ? " open" : ""}`}
              aria-label={menuOpen ? "Закрыть меню" : "Меню"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
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
        {/* Заявка — тихой текстовой строкой, не пунктом навигации:
            конверсионное действие доступно из меню, но не кричит */}
        <button
          className="menu-cta"
          onClick={() => {
            setMenuOpen(false);
            openBooking();
          }}
        >
          {L(t.cta.request)} →
        </button>
        <LangToggle style={{ marginTop: 4 }} />
      </div>
    </>
  );
}
