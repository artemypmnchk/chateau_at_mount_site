import type { Metadata } from "next";
import type { Locale, Wine } from "./content";
import { site } from "./site";

/**
 * i18n для SEO: русский живёт на корне (без префикса), английский и румынский —
 * под /en и /ro. Локаль определяется первым сегментом URL (см. locale.tsx),
 * поэтому content-строки уже приходят на нужном языке через L(). Здесь —
 * помощники по путям и построение локализованных метаданных + hreflang.
 */

export const defaultLocale: Locale = "ru";
export const i18nLocales: Locale[] = ["ru", "en", "ro"];

/** og:locale по языку. */
const ogLocale: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  ro: "ro_RO",
};

/**
 * og:image для всех страниц. Next заменяет объект openGraph целиком (не
 * сливает с layout), поэтому картинку надо задавать в каждом page-level
 * openGraph явно — иначе превью в соцсетях/мессенджерах пропадает.
 */
const ogImages = [
  { url: site.ogImage, width: 1200, height: 630, alt: site.name },
];

/** Добавляет языковой префикс к «голому» ru-пути. ru → путь как есть. */
export function localizePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  const [p, hash] = path.split("#");
  const clean = p === "/" ? "" : p.replace(/\/$/, "");
  const base = `/${locale}${clean}`;
  return hash ? `${base}#${hash}` : base;
}

/** Снимает языковой префикс, возвращая «голый» ru-путь (для канонизации/свитча). */
export function stripLocale(pathname: string): {
  locale: Locale;
  path: string;
} {
  const m = pathname.match(/^\/(en|ro)(\/.*|$)/);
  if (m) {
    const locale = m[1] as Locale;
    const path = m[2] === "" ? "/" : m[2];
    return { locale, path };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}

/** URL той же страницы на другом языке — для переключателя в шапке. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const { path } = stripLocale(pathname);
  return localizePath(target, path);
}

/**
 * alternates для metadata: canonical текущей локали + hreflang на все языки
 * и x-default (на русскую версию). Пути относительные — резолвятся против
 * metadataBase (site.url) автоматически.
 */
export function alternatesFor(
  locale: Locale,
  path: string
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {
    "x-default": localizePath("ru", path),
  };
  for (const l of i18nLocales) languages[l] = localizePath(l, path);
  return { canonical: localizePath(locale, path), languages };
}

/** Локализованные подписи «хлебных крошек» для JSON-LD BreadcrumbList. */
export const breadcrumbLabels: Record<Locale, { home: string; wines: string }> =
  {
    ru: { home: "Главная", wines: "Вина" },
    en: { home: "Home", wines: "Wines" },
    ro: { home: "Acasă", wines: "Vinuri" },
  };

type PageKey = "home" | "about" | "wines" | "visit" | "events" | "contacts";

/**
 * SEO title/description по страницам на трёх языках.
 * ⚠️ en/ro — черновики, ждут вычитки переводов вместе с телом сайта.
 */
const pageMeta: Record<
  PageKey,
  Record<Locale, { title: string; description: string }>
> = {
  home: {
    ru: {
      title: "Chateau At Mount — Винодельня в Гагаузии, Молдова",
      description: site.description,
    },
    en: {
      title: "Chateau At Mount — Family Winery in Gagauzia, Moldova",
      description:
        "Chateau At Mount, a family winery in Gagauzia, southern Moldova: 15 ha of vineyards, 7 grape varieties and characterful wines from our own estate.",
    },
    ro: {
      title: "Chateau At Mount — Cramă de familie în Găgăuzia, Moldova",
      description:
        "Chateau At Mount, cramă de familie în Găgăuzia, sudul Moldovei: 15 ha de viță de vie, 7 soiuri de struguri și vinuri de autor din viile proprii.",
    },
  },
  about: {
    ru: {
      title: "О винодельне Chateau At Mount — Чадыр-Лунга, Гагаузия",
      description:
        "Семейная гагаузская винодельня Chateau At Mount на самой высокой точке холма в Чадыр-Лунге: 15 га своих виноградников, 7 сортов, солнечная энергия, выдержка в дубовых барриках и международные награды.",
    },
    en: {
      title: "About the Winery — Ceadîr-Lunga, Gagauzia",
      description:
        "Chateau At Mount, a Gagauz family winery on the highest point of the hill in Ceadîr-Lunga: 15 hectares of our own vineyards, 7 varieties, solar power, ageing in oak barriques and international awards.",
    },
    ro: {
      title: "Despre cramă — Ceadîr-Lunga, Găgăuzia",
      description:
        "Chateau At Mount, cramă de familie găgăuză pe cel mai înalt punct al dealului din Ceadîr-Lunga: 15 ha de vii proprii, 7 soiuri, energie solară, maturare în baricuri de stejar și premii internaționale.",
    },
  },
  wines: {
    ru: {
      title: "Наши вина — Classic, Rare и Experimental",
      description:
        "Вина семейной винодельни Chateau At Mount (Гагаузия, Молдова): семь классических сортов, линейка Rare малым тиражом, игристое экстра брют, оранж и купажи PONI. Сухие вина с собственных виноградников.",
    },
    en: {
      title: "Our Wines — Classic, Rare and Experimental",
      description:
        "Wines from the Chateau At Mount family winery (Gagauzia, Moldova): seven classic varieties, the small-batch Rare line, extra brut sparkling, orange wine and the PONI blends. Dry wines from our own vineyards.",
    },
    ro: {
      title: "Vinurile noastre — Classic, Rare și Experimental",
      description:
        "Vinuri de la crama de familie Chateau At Mount (Găgăuzia, Moldova): șapte soiuri clasice, linia Rare în serii mici, spumant extra brut, vin oranj și cupajele PONI. Vinuri seci din viile proprii.",
    },
  },
  events: {
    ru: {
      title: "Мероприятия на винодельне — пикники, свидания, аренда",
      description:
        "Мероприятия на винодельне Chateau At Mount в Чадыр-Лунге, Гагаузия: пикники среди лоз, мастер-классы, кино под открытым небом, романтические вечера, девичники и аренда территории.",
    },
    en: {
      title: "Events at the Winery — Picnics, Dates, Estate Hire",
      description:
        "Events at Chateau At Mount in Ceadîr-Lunga, Gagauzia: picnics among the vines, creative workshops, open-air cinema, romantic evenings, hen parties and hire of the estate.",
    },
    ro: {
      title: "Evenimente la cramă — picnicuri, întâlniri, închiriere",
      description:
        "Evenimente la Chateau At Mount în Ceadîr-Lunga, Găgăuzia: picnicuri printre vii, ateliere creative, cinema sub cerul liber, seri romantice, petreceri ale burlăcițelor și închirierea domeniului.",
    },
  },
  visit: {
    ru: {
      title: "Дегустации и визиты на винодельню",
      description:
        "Дегустации вин на винодельне Chateau At Mount в Чадыр-Лунге, Гагаузия: экскурсия по винодельне и виноградникам, 3–7 вин, закуски и закаты. Визиты по предварительной записи.",
    },
    en: {
      title: "Tastings and Winery Visits",
      description:
        "Wine tastings at Chateau At Mount in Ceadîr-Lunga, Gagauzia: a tour of the winery and vineyards, 3–7 wines, snacks and sunsets. Visits by prior appointment.",
    },
    ro: {
      title: "Degustări și vizite la cramă",
      description:
        "Degustări de vinuri la Chateau At Mount în Ceadîr-Lunga, Găgăuzia: tur al cramei și al viilor, 3–7 vinuri, gustări și apusuri. Vizite pe bază de programare.",
    },
  },
  contacts: {
    ru: {
      title: "Контакты и сотрудничество",
      description:
        "Сотрудничество с винодельней Chateau At Mount: поставки вина для магазинов, баров и ресторанов, дегустации и мероприятия. Оставьте заявку — свяжемся в течение 30 минут.",
    },
    en: {
      title: "Contacts and Partnership",
      description:
        "Partner with Chateau At Mount: wine supply for shops, bars and restaurants, tastings and events. Leave a request — we reply within 30 minutes.",
    },
    ro: {
      title: "Contacte și colaborare",
      description:
        "Colaborați cu Chateau At Mount: livrări de vin pentru magazine, baruri și restaurante, degustări și evenimente. Lăsați o cerere — răspundem în 30 de minute.",
    },
  },
};

/** Полные локализованные метаданные страницы: title/description + hreflang. */
export function pageMetadata(
  key: PageKey,
  locale: Locale,
  path: string
): Metadata {
  const m = pageMeta[key][locale];
  const alternates = alternatesFor(locale, path);
  return {
    // home — absolute, чтобы не задваивать бренд из шаблона layout
    title: key === "home" ? { absolute: m.title } : m.title,
    description: m.description,
    alternates,
    openGraph: {
      title: m.title,
      description: m.description,
      url: alternates.canonical as string,
      locale: ogLocale[locale],
      images: ogImages,
    },
  };
}

/**
 * Метаданные страницы вина. ru берёт выверенные wine.seo; en/ro выводятся из
 * уже переведённых полей (type + about/desc) — черновик до вычитки переводов.
 */
export function wineMetadata(wine: Wine, locale: Locale): Metadata {
  const path = `/wines/${wine.slug}`;
  const alternates = alternatesFor(locale, path);
  const title =
    locale === "ru"
      ? wine.seo.title
      : `${wine.name} — ${wine.type[locale]} · Chateau At Mount`;
  const description =
    locale === "ru"
      ? wine.seo.description
      : trim(wine.about?.[locale] ?? wine.desc[locale], 160);
  return {
    title: locale === "ru" ? title : { absolute: title },
    description,
    alternates,
    openGraph: {
      title: `${wine.name} | Chateau At Mount`,
      description,
      url: alternates.canonical as string,
      locale: ogLocale[locale],
      // Общая og-карточка 1200×630: вертикальный PNG бутылки на прозрачном
      // фоне в превью Telegram/WhatsApp выглядел случайно обрезанным.
      images: ogImages,
    },
  };
}

function trim(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, s.lastIndexOf(" ", max)).trimEnd() + "…";
}
