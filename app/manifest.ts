import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Web App Manifest — иконка на домашнем экране телефона, имя и цвета.
 * Отдаётся Next на /manifest.webmanifest, подключён в metadata (layout).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#1e1518",
    theme_color: "#1e1518",
    lang: "ru",
    icons: [
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
