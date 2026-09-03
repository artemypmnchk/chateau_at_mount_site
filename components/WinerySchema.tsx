import { site } from "@/lib/site";

/**
 * JSON-LD структурированные данные (schema.org Winery / LocalBusiness).
 * Помогают Google и Яндексу показывать карточку организации, адрес и соцсети.
 */
export function WinerySchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Winery",
    // Стабильный идентификатор сущности — на него смогут ссылаться будущие
    // Product/Review-разметки и внешние источники (Knowledge Graph).
    "@id": `${site.url}/#winery`,
    name: site.name,
    // Другие написания бренда: домен atmountwinery.com, соцсети
    // at_mount_chateau, русская транскрипция. Связывают имена в одну
    // сущность — по запросу «at mount winery» поиск должен находить нас.
    alternateName: [
      "At Mount Winery",
      "At Mount Chateau",
      "AtMount Winery",
      "Шато Эт Маунт",
    ],
    description: site.description,
    url: site.url,
    image: `${site.url}${site.ogImage}`,
    logo: `${site.url}/images/logo.png`,
    foundingDate: site.foundingDate,
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.contacts.phone,
      email: site.contacts.email,
      availableLanguage: ["ru", "en", "ro"],
    },
    areaServed: { "@type": "Country", name: "Moldova" },
    sameAs: site.social,
    servesCuisine: "Wine",
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
