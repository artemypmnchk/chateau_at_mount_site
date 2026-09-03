import { site } from "@/lib/site";
import { t } from "@/lib/content";

/**
 * JSON-LD структурированные данные: Winery (LocalBusiness) + WebSite.
 * Помогают Google и Яндексу показывать карточку организации, адрес, часы,
 * соцсети и связывать написания бренда в одну сущность.
 */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Другие написания бренда: домен atmountwinery.com, соцсети at_mount_chateau,
// русская транскрипция. Связывают имена в одну сущность — по запросу
// «at mount winery» / «шато эт маунт» поиск должен находить нас.
const alternateNames = [
  "At Mount Winery",
  "At Mount Chateau",
  "AtMount Winery",
  "Шато Эт Маунт",
];

export function WinerySchema() {
  const winery = {
    "@context": "https://schema.org",
    "@type": "Winery",
    // Стабильный идентификатор сущности — на него ссылаются Product-разметки
    // страниц вин и смогут ссылаться внешние источники (Knowledge Graph).
    "@id": `${site.url}/#winery`,
    name: site.name,
    alternateName: alternateNames,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    // Несколько кадров разных пропорций — Google берёт подходящий под карточку.
    image: [
      `${site.url}${site.ogImage}`,
      `${site.url}/images/hero-building.jpg`,
      `${site.url}/images/about-vineyards.jpg`,
    ],
    logo: `${site.url}/images/logo.png`,
    foundingDate: site.foundingDate,
    founder: { "@type": "Person", name: site.founder },
    telephone: site.contacts.phone,
    email: site.contacts.email,
    hasMap: site.contacts.mapUrl,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.plusCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    // Часы — от владельца (2026-09-03); визиты по предварительной записи.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.contacts.phone,
      email: site.contacts.email,
      availableLanguage: ["ru", "en", "ro"],
    },
    areaServed: { "@type": "Country", name: "Moldova" },
    sameAs: site.social,
    // Дегустации с ценами — те же форматы и цены, что на /visit.
    makesOffer: t.visitPage.packages.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: `Дегустация «${p.name.ru}»` },
      price: p.price,
      priceCurrency: "MDL",
      url: `${site.url}/visit`,
    })),
  };

  // Имя сайта в выдаче Google берётся прежде всего из WebSite-разметки.
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    alternateName: alternateNames,
    inLanguage: ["ru", "en", "ro"],
    publisher: { "@id": `${site.url}/#winery` },
  };

  return (
    <>
      <JsonLd data={winery} />
      <JsonLd data={website} />
    </>
  );
}
