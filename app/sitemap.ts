import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { wines, type Locale } from "@/lib/content";
import { i18nLocales, localizePath } from "@/lib/i18n";

/**
 * Sitemap на трёх языках: каждая страница отдаётся по всем локалям, у каждой
 * записи — hreflang-альтернативы на другие языки (ru на корне, en/ro с префиксом).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Дата последнего содержательного обновления контента — поднимать вручную
  // при заметных правках текстов/страниц. new Date() здесь нельзя: каждый
  // деплой помечал бы все страницы «обновлёнными», обесценивая сигнал.
  const lastModified = new Date("2026-09-02");

  // Приоритеты «голых» ru-путей; языковые версии наследуют.
  const paths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/visit", priority: 0.9 },
    { path: "/wines", priority: 0.9 },
    { path: "/contacts", priority: 0.8 },
    ...wines.map((w) => ({ path: `/wines/${w.slug}`, priority: 0.8 })),
  ];

  const abs = (locale: Locale, path: string) =>
    `${site.url}${localizePath(locale, path)}`;

  return paths.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(
      i18nLocales.map((l) => [l, abs(l, path)])
    );
    return i18nLocales.map((locale) => ({
      url: abs(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
