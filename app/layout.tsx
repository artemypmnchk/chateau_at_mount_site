import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chateau At Mount — Гагаузия, Молдова",
  description:
    "Винодельня Chateau At Mount в Гагаузии, Молдова — философия, линейки продукции, форма для связи.",
  openGraph: {
    title: "Chateau At Mount — Гагаузия, Молдова",
    description: "Винные традиции юга Молдовы. Семейная винодельня в Чадыр‑Лунге.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
