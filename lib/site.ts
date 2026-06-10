import { links } from "./content";

/**
 * Единый источник правды о сайте: используется в metadata (layout),
 * sitemap.ts, robots.ts и JSON-LD (WinerySchema).
 *
 * ⚠️ Перед публикацией укажите реальный домен, точный адрес и координаты
 * винодельни (сейчас заполнены ориентировочно по городу Чадыр-Лунга).
 */
export const site = {
  url: "https://chateauatmount.md", // TODO: заменить на реальный домен
  name: "Chateau At Mount",
  shortName: "Chateau At Mount",
  description:
    "Семейная винодельня Chateau At Mount в Гагаузии, Молдова. Винные традиции юга Молдовы: 15 Га виноградников, 7 сортов винограда, авторские вина с характером.",
  locale: "ru_RU",
  ogImage: "/images/hero-winery.png",
  foundingDate: "2019",
  address: {
    locality: "Чадыр-Лунга", // Ceadîr-Lunga
    region: "Гагаузия", // Gagauzia
    country: "MD",
  },
  // Ориентировочные координаты Чадыр-Лунги — уточните при необходимости.
  geo: {
    latitude: 46.0561,
    longitude: 28.8316,
  },
  social: [links.instagram, links.telegram, links.tiktok],
} as const;
