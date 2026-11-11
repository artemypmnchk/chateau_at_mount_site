import { site } from "@/lib/site";

/**
 * robots.txt вручную, а не через app/robots.ts: MetadataRoute.Robots не умеет
 * строку Content-Signal. ИИ-боты названы отдельными группами — видно, что
 * решение о них принято; YandexAdditional — роботы ответов Алисы.
 * Content-Signal (contentsignals.org): search — поиск, ai-input — ответы
 * ИИ со ссылкой на сайт, ai-train — обучение моделей.
 */
const signal = "Content-Signal: search=yes, ai-input=yes, ai-train=yes";

const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
];

const body = [
  "User-agent: *",
  signal,
  "Allow: /",
  "",
  "User-agent: YandexAdditional",
  "User-agent: YandexAdditionalBot",
  signal,
  "Allow: /",
  "",
  ...aiBots.map((b) => `User-agent: ${b}`),
  signal,
  "Allow: /",
  "",
  `Host: ${site.url}`,
  `Sitemap: ${site.url}/sitemap.xml`,
  "",
].join("\n");

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
