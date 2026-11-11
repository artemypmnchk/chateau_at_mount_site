import { markdownFor } from "@/lib/markdown";
import { site } from "@/lib/site";

/**
 * Markdown-версии страниц. Снаружи сюда не ходят: middleware.ts переписывает
 * /wines.md, /index.md и запросы с «Accept: text/markdown» на /md/<путь>.
 */
export function GET(
  _req: Request,
  { params }: { params: { path?: string[] } }
) {
  const pathname = "/" + (params.path ?? []).join("/");
  const md = markdownFor(pathname);
  if (md === null) {
    return new Response("Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  const htmlPath = pathname.replace(/\/index$/, "") || "/";
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      // Каноническая — HTML-версия: в индекс должна попадать она
      Link: `<${site.url}${htmlPath === "/" ? "" : htmlPath}>; rel="canonical"`,
      "X-Robots-Tag": "noindex",
    },
  });
}
