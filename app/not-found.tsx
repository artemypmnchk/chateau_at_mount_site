"use client";

import { useLocale } from "@/components/locale";

/**
 * Кастомная 404 в духе visit-hero: тихая типографика на тёмном, мягкий
 * возврат на главную или к винам. Клиентский компонент — язык берём из
 * префикса пути через LocaleProvider, как и весь остальной контент.
 */
const text = {
  title: {
    ru: "Такой страницы нет",
    en: "This page does not exist",
    ro: "Această pagină nu există",
  },
  lead: {
    ru: "Возможно, ссылка устарела. Зато вина — на месте.",
    en: "The link may be out of date. The wines, however, are right here.",
    ro: "Linkul poate fi învechit. Vinurile, însă, sunt la locul lor.",
  },
  home: { ru: "На главную", en: "Home", ro: "Acasă" },
  wines: { ru: "Наши вина", en: "Our wines", ro: "Vinurile noastre" },
};

export default function NotFound() {
  const { L, lp } = useLocale();

  return (
    <main>
      <section
        className="visit-hero"
        data-header-theme="dark"
        style={{ minHeight: "72svh" }}
      >
        <div className="container">
          <h1>{L(text.title)}</h1>
          <p className="lead">{L(text.lead)}</p>
          {/* Страница центрирована — центрируем и ряд ссылок (в hero на
              главной hero-actions прижаты влево, здесь это выглядит оторванно) */}
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a href={lp("/")} className="hero-link">
              {L(text.home)}
            </a>
            <a href={lp("/wines")} className="hero-link hero-link-secondary">
              {L(text.wines)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
