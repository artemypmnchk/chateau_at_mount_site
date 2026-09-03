import type { Metadata } from "next";
import type { Locale } from "@/lib/content";
import { pageMetadata } from "@/lib/i18n";
import EventsPage from "@/components/EventsPage";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ro" }];
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Metadata {
  return pageMetadata("events", params.lang, "/events");
}

export default function Page() {
  return <EventsPage />;
}
