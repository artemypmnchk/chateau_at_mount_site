import type { Metadata } from "next";
import { pageMetadata } from "@/lib/i18n";
import { WinesRoute } from "@/components/WineRoutes";

export const metadata: Metadata = pageMetadata("wines", "ru", "/wines");

export default function Page() {
  return <WinesRoute locale="ru" />;
}
