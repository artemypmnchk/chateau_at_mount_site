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

// Product-разметка (@type Product) намеренно НЕ используется: Google требует
// у неё offers/review/aggregateRating, а на сайте нет ни цен, ни отзывов —
// такая разметка даёт критическую ошибку в Search Console и всё равно не даёт
// rich-карточку. Вернуть вместе с offers, если начнём публиковать цены.

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
    </>
  );
}
