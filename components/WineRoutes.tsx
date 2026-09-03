import { notFound } from "next/navigation";
import { wines, type Wine, type Locale } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbLabels, localizePath } from "@/lib/i18n";
import WinesPage from "./WinesPage";
import WinePage from "./WinePage";

/**
 * Общие серверные рендеры страниц вин с JSON-LD — переиспользуются корнем (ru)
 * и /[lang] (en/ro). Вынесены из page.tsx, т.к. роут-файлам Next запрещает
 * произвольные именованные экспорты.
 */

/** JSON-LD ItemList — список вин со ссылками (на языке страницы). */
function WineListSchema({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Вина Chateau At Mount",
    itemListElement: wines.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: w.name,
      url: `${site.url}${localizePath(locale, `/wines/${w.slug}`)}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * JSON-LD BreadcrumbList: Главная → Вина → сорт. Подписи и URL — на языке
 * страницы.
 */
function WineBreadcrumbSchema({
  wine,
  locale,
}: {
  wine: Wine;
  locale: Locale;
}) {
  const abs = (path: string) => `${site.url}${localizePath(locale, path)}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: breadcrumbLabels[locale].home,
        item: abs("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbLabels[locale].wines,
        item: abs("/wines"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: wine.name,
        item: abs(`/wines/${wine.slug}`),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * JSON-LD Product без offers: цен на сайте нет, поэтому rich-карточки товара
 * не будет, а в отчёте Search Console «Товары» возможна пометка «нет
 * offers/review/aggregateRating» — она не влияет на ранжирование. Цель
 * разметки — связать вино с сущностью винодельни (brand/manufacturer → @id)
 * и отдать награды полем award. Добавить offers, когда появятся цены.
 */
function WineProductSchema({ wine, locale }: { wine: Wine; locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${site.url}/wines/${wine.slug}#product`,
    name: wine.name,
    image: `${site.url}${wine.image}`,
    description:
      locale === "ru"
        ? wine.seo.description
        : (wine.about?.[locale] ?? wine.desc[locale]),
    category: wine.type[locale],
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": `${site.url}/#winery` },
    url: `${site.url}${localizePath(locale, `/wines/${wine.slug}`)}`,
    ...(wine.awards?.length
      ? { award: wine.awards.map((a) => a.text[locale]) }
      : {}),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "alcohol",
        value: wine.alcohol[locale],
      },
      {
        "@type": "PropertyValue",
        name: "servingTemperature",
        value: wine.servingTemp,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Список вин + ItemList. */
export function WinesRoute({ locale }: { locale: Locale }) {
  return (
    <>
      <WinesPage />
      <WineListSchema locale={locale} />
    </>
  );
}

/** Страница одного вина + breadcrumbs. */
export function WineRoute({ slug, locale }: { slug: string; locale: Locale }) {
  const wine = wines.find((w) => w.slug === slug);
  if (!wine) notFound();
  return (
    <>
      <WinePage wine={wine} />
      <WineBreadcrumbSchema wine={wine} locale={locale} />
      <WineProductSchema wine={wine} locale={locale} />
    </>
  );
}
