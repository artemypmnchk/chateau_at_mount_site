/** @type {import('next').NextConfig} */

// Content-Security-Policy. 'unsafe-eval' нужен только для dev (HMR Next.js);
// 'unsafe-inline' — для инлайн-стилей/скриптов Next и JSON-LD.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
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
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
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
