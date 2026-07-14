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

// Product-разметка (@type Product) намеренно НЕ используется: Google требует
// у неё offers/review/aggregateRating, а на сайте нет ни цен, ни отзывов —
// такая разметка даёт критическую ошибку в Search Console и всё равно не даёт
// rich-карточку. Вернуть вместе с offers, если начнём публиковать цены.

export default function Page({ params }: Props) {
  const wine = wines.find((w) => w.slug === params.slug);
  if (!wine) notFound();

  return (
    <>
      <WinePage wine={wine} />
      <WineBreadcrumbSchema wine={wine} />
    </>
  );
}
