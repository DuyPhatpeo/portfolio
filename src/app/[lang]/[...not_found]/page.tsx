import { notFound } from "next/navigation";
import { LOCALES } from "@/lib/i18n";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang, not_found: ["404"] }));
}

export default function CatchAllNotFound() {
  notFound();
}
