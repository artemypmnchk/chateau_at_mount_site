import type { Metadata } from "next";
import { pageMetadata } from "@/lib/i18n";
import ContactsPage from "@/components/ContactsPage";

export const metadata: Metadata = pageMetadata("contacts", "ru", "/contacts");

export default function Page() {
  return <ContactsPage />;
}
