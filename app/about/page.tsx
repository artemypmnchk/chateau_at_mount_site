import type { Metadata } from "next";
import { pageMetadata } from "@/lib/i18n";
import AboutPage from "@/components/AboutPage";

// Через pageMetadata, а не вручную: так у русской версии появляются hreflang
// на /en/about и /ro/about — без них поисковик не связывает три адреса.
export const metadata: Metadata = pageMetadata("about", "ru", "/about");

export default function Page() {
  return <AboutPage />;
}
