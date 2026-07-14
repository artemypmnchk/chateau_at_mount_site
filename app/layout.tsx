import type { Metadata, Viewport } from "next";
import { Inter, Piazzolla, Oranienbaum } from "next/font/google";
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

// Заголовочная антиква — узкий акцидентный дидон с сильным авторским
// характером и родной кириллицей. Одно начертание (400); вес 500 в стилях
// не синтезируем (font-synthesis-weight: none), чтобы держать чистый рисунок.
const oranienbaum = Oranienbaum({
  subsets: ["latin", "cyrillic", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--font-serif",
});

// Piazzolla оставлена только курсивом — «голос семьи»: тэглайны, цитаты
// отзывов, декоративные номера. У Oranienbaum курсива нет, поэтому наклон
// несёт настоящий италик Piazzolla, а не фейковый.
const piazzolla = Piazzolla({
  subsets: ["latin", "cyrillic", "latin-ext"],
  style: ["italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-serif-italic",
});

// viewport-fit=cover: без него Chrome на Android 15+ рисует под жестовой
// панелью непрозрачную плашку цвета фона страницы — кремовый обрубок под
// тёмным хиро. С cover контент уходит под панель (edge-to-edge), а отступы
// добираем через env(safe-area-inset-*) в globals.css
export const viewport: Viewport = {
  themeColor: "#1e1518",
  viewportFit: "cover",
};

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
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  // Коды подтверждения владения сайтом. Значения — из Google Search Console
  // и Яндекс.Вебмастера, задаются env-переменными на Vercel. Если пусто —
  // Next просто не выводит мета-теги (не ломается).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${oranienbaum.variable} ${piazzolla.variable}`}
    >
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
