import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { wines, type Wine } from "@/lib/content";
import { site } from "@/lib/site";
import WinePage from "@/components/WinePage";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return wines.map((w) => ({ slug: w.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const wine = wines.find((w) => w.slug === params.slug);
  if (!wine) return {};
  return {
    title: wine.seo.title,
    description: wine.seo.description,
    alternates: { canonical: `/wines/${wine.slug}` },
    openGraph: {
      title: `${wine.name} | Chateau At Mount`,
      description: wine.seo.description,
      url: `/wines/${wine.slug}`,
      images: [{ url: wine.image, alt: wine.name }],
    },
  };
}

/**
 * JSON-LD BreadcrumbList — «хлебные крошки» в выдаче:
 * Главная → Вина → Название сорта (вместо голого URL).
 */
function WineBreadcrumbSchema({ wine }: { wine: Wine }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Вина",
        item: `${site.url}/wines`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: wine.name,
        item: `${site.url}/wines/${wine.slug}`,
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
 * JSON-LD Product (schema.org) — карточка вина для поисковиков:
 * сорт, награды, производитель. Без offers — на сайте нет цен.
 */
function WineProductSchema({ wine }: { wine: Wine }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${wine.name} — ${wine.type.ru.toLowerCase()} вино`,
    image: `${site.url}${wine.image}`,
    description: wine.seo.description,
    brand: { "@type": "Brand", name: site.name },
    manufacturer: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    category: "Вино",
    countryOfOrigin: { "@type": "Country", name: "Молдова" },
    ...(wine.awards?.length
      ? { award: wine.awards.map((a) => a.text.ru) }
      : {}),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Крепость",
        value: wine.alcohol.ru,
      },
      {
        "@type": "PropertyValue",
        name: "Температура подачи",
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

export default function Page({ params }: Props) {
  const wine = wines.find((w) => w.slug === params.slug);
  if (!wine) notFound();

  return (
    <>
      <WinePage wine={wine} />
      <WineBreadcrumbSchema wine={wine} />
      <WineProductSchema wine={wine} />
    </>
  );
}
