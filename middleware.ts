import { NextResponse, type NextRequest } from "next/server";
import { markdownPath, stripLocale } from "@/lib/i18n";

/**
 * Markdown для ИИ-агентов (lib/markdown.ts):
 * - /about.md, /index.md, /en/wines/merlot.md → Markdown-версия страницы;
 * - тот же адрес без .md с «Accept: text/markdown» → тоже Markdown;
 * - остальным — HTML как раньше, плюс Vary: Accept и заголовок Link
 *   на Markdown-версию и llms.txt, чтобы агент нашёл их сам.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith(".md")) {
    const url = req.nextUrl.clone();
    url.pathname = "/md" + pathname.slice(0, -3);
    return NextResponse.rewrite(url);
  }

  const accept = req.headers.get("accept") ?? "";
  if (/text\/markdown/i.test(accept) && !/text\/html/i.test(accept)) {
    const url = req.nextUrl.clone();
    url.pathname = "/md" + (pathname === "/" ? "" : pathname);
    return NextResponse.rewrite(url);
  }

  const res = NextResponse.next();
  const { locale, path } = stripLocale(pathname);
  res.headers.set("Vary", "Accept");
  res.headers.set(
    "Link",
    [
      `<${markdownPath(locale, path)}>; rel="alternate"; type="text/markdown"`,
      `</llms.txt>; rel="describedby"; type="text/markdown"`,
    ].join(", ")
  );
  return res;
}

export const config = {
  // Страницы и .md; без статики, API, служебных файлов Next и /md
  matcher: [
    "/((?!_next/|api/|md/|images/|fonts/|.*\\.(?:txt|xml|ico|png|jpe?g|webp|avif|svg|webmanifest|woff2?)$).*)",
  ],
};
