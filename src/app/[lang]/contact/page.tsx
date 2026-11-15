import type { Metadata } from "next";
import { isValidLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { getSeoMetadata } from "@/lib/seo";
import ContactClient from "./ContactClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang: Locale = isValidLocale(resolvedParams.lang)
    ? (resolvedParams.lang as Locale)
    : DEFAULT_LOCALE;

  return getSeoMetadata("contact", lang, "/contact");
}

export default function ContactPage() {
  return <ContactClient />;
}
