import type { Metadata } from "next";
import { pageMetadata } from "@/lib/i18n";
import VisitPage from "@/components/VisitPage";

export const metadata: Metadata = pageMetadata("visit", "ru", "/visit");

export default function Page() {
  return <VisitPage />;
}
