import type { Metadata } from "next";
import { pageMetadata } from "@/lib/i18n";
import VisitPage from "@/components/VisitPage";
import { FaqSchema } from "@/components/FaqSchema";

export const metadata: Metadata = pageMetadata("visit", "ru", "/visit");

export default function Page() {
  return (
    <>
      <VisitPage />
      <FaqSchema locale="ru" />
    </>
  );
}
