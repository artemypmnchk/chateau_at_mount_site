import type { Metadata } from "next";
import type { Locale } from "@/lib/content";
import { pageMetadata } from "@/lib/i18n";
import VisitPage from "@/components/VisitPage";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ro" }];
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Metadata {
  return pageMetadata("visit", params.lang, "/visit");
}

export default function Page() {
  return <VisitPage />;
}
