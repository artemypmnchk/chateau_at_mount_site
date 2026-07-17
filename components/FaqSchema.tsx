import { t, type Locale } from "@/lib/content";

/**
 * JSON-LD FAQPage для /visit. Рендерится сервером (app/visit/page.tsx и
 * [lang]-вариант). Тексты — те же строки lib/content.ts, что видны на
 * странице: Google требует совпадения разметки и контента 1:1.
 */
export function FaqSchema({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.visitPage.faq.map((item) => ({
      "@type": "Question",
      name: item.q[locale],
      acceptedAnswer: { "@type": "Answer", text: item.a[locale] },
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
