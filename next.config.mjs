/** @type {import('next').NextConfig} */

// Content-Security-Policy. 'unsafe-eval' нужен только для dev (HMR Next.js);
// 'unsafe-inline' — для инлайн-стилей/скриптов Next и JSON-LD.
// mc.yandex.ru / mc.yandex.com — Яндекс.Метрика (tag.js, пиксель, отправка хитов).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://mc.yandex.ru",
  "font-src 'self' data:",
  // wss://mc.yandex.ru — вебсокет Метрики (solid.ws): без него в консоли
  // CSP-ошибка и деградирует сбор данных (вебвизор/часть хитов)
  "connect-src 'self' https://mc.yandex.ru https://mc.yandex.com wss://mc.yandex.ru",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  // standalone-режим нужен только для Docker/self-hosting; на Vercel он ломает
  // роутинг (404), поэтому включаем его лишь вне окружения Vercel.
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Кеш оптимизированных картинок 30 дней (по умолчанию 60 с): AVIF
    // кодируется медленно, и холодный кеш = ожидание для первого посетителя.
    // При замене картинки менять имя файла.
    minimumCacheTTL: 2592000,
  },
  // www → apex: канонический хост один — atmountwinery.com. Без этого
  // www-вариант отдаёт 200 и плодит дубли в индексе.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.atmountwinery.com" }],
        destination: "https://atmountwinery.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // Статика из /public по умолчанию отдаётся с max-age=0 — каждый визит
      // перепроверяет 12 файлов шрифтов. Шрифты неизменяемы (при замене —
      // новое имя), картинки — сутки + неделя stale-while-revalidate.
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/(.*).avif",
        headers: [{ key: "Content-Type", value: "image/avif" }],
      },
      {
        source: "/(.*).webp",
        headers: [{ key: "Content-Type", value: "image/webp" }],
      },
      {
        source: "/(.*).svg",
        headers: [{ key: "Content-Type", value: "image/svg+xml" }],
      },
      {
        source: "/(.*).png",
        headers: [{ key: "Content-Type", value: "image/png" }],
      },
      {
        source: "/(.*).jpg",
        headers: [{ key: "Content-Type", value: "image/jpeg" }],
      },
      {
        source: "/(.*).jpeg",
        headers: [{ key: "Content-Type", value: "image/jpeg" }],
      },
    ];
  },
};

export default nextConfig;
