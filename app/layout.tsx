import type { Metadata } from "next";
import { Inter, Piazzolla } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { WinerySchema } from "@/components/WinerySchema";
import { LocaleProvider } from "@/components/locale";
import { BookingModalProvider } from "@/components/BookingModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

// Антиквенный шрифт для заголовков — задаёт «винодельческий» характер,
// поддерживает кириллицу и румынскую диакритику. Переменный, с осью
// оптического размера: в крупных кеглях контраст штрихов выше.
const piazzolla = Piazzolla({
  subsets: ["latin", "cyrillic", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-serif",
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
    <html lang="ru" className={`${inter.variable} ${piazzolla.variable}`}>
      <body>
        <LocaleProvider>
          <BookingModalProvider>
            <Header />
            {children}
            <Footer />
            <AgeGate />
          </BookingModalProvider>
        </LocaleProvider>
        <WinerySchema />
      </body>
    </html>
  );
}
