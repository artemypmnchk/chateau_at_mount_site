import type { Metadata } from "next";
import type { Locale } from "@/lib/content";
import { pageMetadata } from "@/lib/i18n";
import ContactsPage from "@/components/ContactsPage";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ro" }];
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Metadata {
  return pageMetadata("contacts", params.lang, "/contacts");
}

export default function Page() {
  return <ContactsPage />;
}
