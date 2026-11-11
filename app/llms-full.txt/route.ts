import { llmsFullTxt } from "@/lib/markdown";

// Весь русский текст сайта одним Markdown-файлом — агент читает за один запрос.
export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
