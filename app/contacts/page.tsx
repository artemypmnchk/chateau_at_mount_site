import type { Metadata } from "next";
import ContactsPage from "@/components/ContactsPage";

export const metadata: Metadata = {
  title: "Контакты и сотрудничество",
  description:
    "Сотрудничество с винодельней Chateau At Mount: поставки вина для магазинов, баров и ресторанов, дегустации и мероприятия. Оставьте заявку — свяжемся в течение 30 минут.",
  alternates: { canonical: "/contacts" },
  openGraph: {
    title: "Контакты и сотрудничество | Chateau At Mount",
    description:
      "Сотрудничество с винодельней Chateau At Mount: поставки вина, дегустации и мероприятия.",
    url: "/contacts",
  },
};

export default function Page() {
  return <ContactsPage />;
}
