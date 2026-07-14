import type { Metadata } from "next";
import { wines } from "@/lib/content";
import { wineMetadata } from "@/lib/i18n";
import { WineRoute } from "@/components/WineRoutes";

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
  return wineMetadata(wine, "ru");
}

export default function Page({ params }: Props) {
  return <WineRoute slug={params.slug} locale="ru" />;
}
