import type { Metadata } from "next";
import { wines, type Locale } from "@/lib/content";
import { wineMetadata } from "@/lib/i18n";
import { WineRoute } from "@/components/WineRoutes";

const langs: Locale[] = ["en", "ro"];

export function generateStaticParams() {
  return langs.flatMap((lang) => wines.map((w) => ({ lang, slug: w.slug })));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { lang: Locale; slug: string };
}): Metadata {
  const wine = wines.find((w) => w.slug === params.slug);
  if (!wine) return {};
  return wineMetadata(wine, params.lang);
}

export default function Page({
  params,
}: {
  params: { lang: Locale; slug: string };
}) {
  return <WineRoute slug={params.slug} locale={params.lang} />;
}
