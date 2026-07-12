import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "О винодельне Chateau At Mount — Чадыр-Лунга, Гагаузия",
  description:
    "Семейная гагаузская винодельня Chateau At Mount на самой высокой точке холма в Чадыр-Лунге: 15 га своих виноградников, 7 сортов, солнечная энергия, выдержка в дубовых барриках и международные награды.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "О винодельне | Chateau At Mount",
    description:
      "Гагаузская семейная винодельня на вершине холма над Чадыр-Лунгой: терруар, устойчивое производство и вина, отмеченные международным жюри.",
    url: "/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
