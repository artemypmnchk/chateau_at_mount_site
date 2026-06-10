import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { WinerySchema } from "@/components/WinerySchema";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Chateau At Mount — Винодельня в Гагаузии, Молдова",
    template: "%s | Chateau At Mount",
  },
  description: site.description,
  keywords: [
    "винодельня",
    "вино Молдова",
    "вино Гагаузия",
    "Chateau At Mount",
    "Чадыр-Лунга",
    "молдавское вино",
    "купить вино",
    "винные туры",
    "мероприятия на винодельне",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "Chateau At Mount — Винные традиции юга Молдовы",
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Винодельня Chateau At Mount",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chateau At Mount — Винные традиции юга Молдовы",
    description: site.description,
    images: [site.ogImage],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        {children}
        <WinerySchema />
      </body>
    </html>
  );
}
