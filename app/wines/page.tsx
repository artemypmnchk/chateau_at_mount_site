import type { Metadata } from "next";
import { wines } from "@/lib/content";
import { site } from "@/lib/site";
import WinesPage from "@/components/WinesPage";

export const metadata: Metadata = {
  title: "Наши вина — 7 сортов из Гагаузии",
  description:
    "Вина семейной винодельни Chateau At Mount (Гагаузия, Молдова): Merlot, Cabernet Sauvignon, Shiraz, Cabernet Rose, Viorica, Fetească Albă и Fetească Neagră. Сухие вина с выразительной кислотностью с собственных виноградников.",
  alternates: { canonical: "/wines" },
  openGraph: {
    title: "Наши вина | Chateau At Mount",
    description:
      "7 сортов с характером: от древней фетяски нягрэ до редкой ароматной виорики. Сухие вина с собственных виноградников в Гагаузии.",
    url: "/wines",
  },
};

/** JSON-LD ItemList — список вин со ссылками на их страницы. */
function WineListSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Вина Chateau At Mount",
    itemListElement: wines.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: w.name,
      url: `${site.url}/wines/${w.slug}`,
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

export default function Page() {
  return (
    <>
      <WinesPage />
      <WineListSchema />
    </>
  );
}
