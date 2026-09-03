import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";
import { site } from "@/lib/site";
import { WinerySchema } from "@/components/WinerySchema";
import { LocaleProvider } from "@/components/locale";
import { BookingModalProvider } from "@/components/BookingModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import Metrika from "@/components/Metrika";

// Шрифты — локальные @font-face в app/fonts.css (Inter, Oranienbaum,
// Piazzolla italic); CSS-переменные --font-* задаются там же.

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
  // twitter:* сознательно не задаём: платформы берут og:*, а глобальный
  // twitter из layout перекрывал бы заголовки внутренних страниц (Next
  // заменяет вложенные объекты metadata целиком, не сливает).
  icons: {
    icon: [
      // .ico первым — основной источник для Google (он идёт за /favicon.ico)
      { url: "/favicon.ico", sizes: "any" },
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
    // suppressHydrationWarning: инлайн-скрипт ниже меняет lang на en/ro до
    // гидрации, React не должен ругаться на расхождение атрибута.
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Шрифты первого экрана: H1 «Chateau At Mount» — Oranienbaum latin,
            меню и CTA — Inter cyrillic (ru) / latin. Без preload заголовок
            (LCP-элемент) сначала рисуется fallback-шрифтом и подменяется. */}
        <link
          rel="preload"
          href="/fonts/oranienbaum-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Единственный <html> живёт в корневом layout, а он не знает пути —
            поэтому для /en и /ro атрибут lang правим до гидрации. Серверный
            HTML остаётся lang="ru", языковые сигналы поисковикам несёт
            hreflang (см. alternatesFor в lib/i18n.ts). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var m=location.pathname.match(/^\\/(en|ro)(\\/|$)/);if(m)document.documentElement.lang=m[1];})()",
          }}
        />
        <LocaleProvider>
          <BookingModalProvider>
            <Header />
            {children}
            <Footer />
            <AgeGate />
          </BookingModalProvider>
        </LocaleProvider>
        <WinerySchema />
        <Metrika />
      </body>
    </html>
  );
}
