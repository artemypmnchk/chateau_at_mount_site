import { llmsTxt } from "@/lib/markdown";

// Указатель для языковых моделей (llmstxt.org): собирается при сборке.
export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
