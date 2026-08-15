import type { Metadata } from "next";
import { pageMetadata } from "@/lib/i18n";
import EventsPage from "@/components/EventsPage";

// Через pageMetadata, а не вручную: так у русской версии появляются hreflang
// на /en/events и /ro/events — без них поисковик не связывает три адреса.
export const metadata: Metadata = pageMetadata("events", "ru", "/events");

export default function Page() {
  return <EventsPage />;
}
