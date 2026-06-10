import type { Metadata } from "next";
import VisitPage from "@/components/VisitPage";

export const metadata: Metadata = {
  title: "Дегустации и визиты на винодельню",
  description:
    "Дегустации вин на винодельне Chateau At Mount в Чадыр-Лунге, Гагаузия: экскурсия по винодельне и виноградникам, 3–7 вин, закуски и закаты. Визиты по предварительной записи.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Дегустации и визиты | Chateau At Mount",
    description:
      "Экскурсия по винодельне, прогулка по виноградникам и дегустация вин на самой высокой точке Чадыр-Лунги.",
    url: "/visit",
  },
};

export default function Page() {
  return <VisitPage />;
}
