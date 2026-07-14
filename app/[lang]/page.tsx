import type { Metadata } from "next";
import type { Locale } from "@/lib/content";
import { pageMetadata } from "@/lib/i18n";
import Site from "@/components/Site";

// Русская версия живёт на корне; здесь — только англ. (/en) и рум. (/ro).
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ro" }];
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Metadata {
  return pageMetadata("home", params.lang, "/");
}

export default function Page() {
  // Контент рендерится на языке из URL: LocaleProvider берёт локаль по префиксу
  // пути (usePathname), поэтому серверный HTML сразу на нужном языке.
  return <Site />;
}
