import type { Metadata } from "next";
import { pageMetadata } from "@/lib/i18n";
import Site from "@/components/Site";

export const metadata: Metadata = pageMetadata("home", "ru", "/");

export default function Home() {
  return <Site />;
}
