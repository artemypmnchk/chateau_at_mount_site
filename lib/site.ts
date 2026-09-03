import { links } from "./content";

/**
 * Единый источник правды о сайте: используется в metadata (layout),
 * sitemap.ts, robots.ts и JSON-LD (WinerySchema).
 */
export const site = {
  // Домен сменён 2026-07-18 (было chateauatmount.com — тот удалён у
  // регистратора и в DNS не существует, 301 с него поставить нельзя).
  url: "https://atmountwinery.com",
  name: "Chateau At Mount",
  shortName: "Chateau At Mount",
  description:
    "Семейная винодельня Chateau At Mount в Гагаузии, Молдова. Винные традиции юга Молдовы: 15 га виноградников, 7 сортов винограда, авторские вина с характером.",
  locale: "ru_RU",
  ogImage: "/og-card.jpg", // 1200×630 — превью для соцсетей и мессенджеров. Новое имя
  // при замене: Telegram/FB кешируют картинку по URL, старый og.jpg не сбросить
  // Номер счётчика Яндекс.Метрики. 0 — аналитика выключена. Создать счётчик:
  // metrika.yandex.ru → «Добавить счётчик» → скопировать номер.
  metrikaId: 110771681,
  foundingDate: "2019",
  address: {
    // Улицы у винодельни нет — Google для таких мест использует plus-код
    // (дан владельцем 2026-07-18). Он же уходит в streetAddress схемы.
    plusCode: "3QPW+HR",
    locality: "Чадыр-Лунга", // Ceadîr-Lunga
    region: "Гагаузия", // Gagauzia
    country: "MD",
  },
  // Точные координаты — из plus-кода 3QPW+HR (8GRC3QPW+HR): холм на
  // северо-западном въезде в город.
  geo: {
    latitude: 46.08644,
    longitude: 28.79706,
  },
  social: [links.instagram, links.telegram, links.tiktok],
  // Контактные данные (из оригинальной страницы /contacts).
  contacts: {
    email: "chateauatmount@gmail.com",
    phone: "+373 76 007 737",
    phoneHref: "tel:+37376007737",
    // Строка адреса для показа людям (подвал и страница контактов) — по
    // языкам: в EN/RO город и регион пишутся латиницей, как в title и
    // description этих версий. В JSON-LD и метаданных уходит не она, а
    // site.address.* — там намеренно оставлена кириллица родного написания.
    addressLine: {
      ru: "3QPW+HR, Чадыр-Лунга, Гагаузия, Молдова",
      en: "3QPW+HR, Ceadîr-Lunga, Gagauzia, Moldova",
      ro: "3QPW+HR, Ceadîr-Lunga, Găgăuzia, Moldova",
    },
    // Точка по plus-коду — точнее текстового поиска, пока нет карточки
    // в Google Business Profile.
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=3QPW%2BHR+Ceadir-Lunga",
  },
} as const;
