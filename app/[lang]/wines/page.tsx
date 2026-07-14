import type { Metadata } from "next";
import type { Locale } from "@/lib/content";
import { pageMetadata } from "@/lib/i18n";
import { WinesRoute } from "@/components/WineRoutes";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ro" }];
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Metadata {
  return pageMetadata("wines", params.lang, "/wines");
}

export default function Page({ params }: { params: { lang: Locale } }) {
  return <WinesRoute locale={params.lang} />;
}
