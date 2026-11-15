import type { Metadata } from "next";
import { isValidLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { getSeoMetadata } from "@/lib/seo";
import HomeClient from "./HomeClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang: Locale = isValidLocale(resolvedParams.lang)
    ? (resolvedParams.lang as Locale)
    : DEFAULT_LOCALE;

  return getSeoMetadata("home", lang);
}

export default function HomePage() {
  return <HomeClient />;
}
