import { LOCALES, type Locale, isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import AppShell from "@/components/providers/AppShell";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const lang: Locale = isValidLocale(resolvedParams.lang)
    ? (resolvedParams.lang as Locale)
    : DEFAULT_LOCALE;

  return (
    <LanguageProvider lang={lang}>
      <AppShell>
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </AppShell>
    </LanguageProvider>
  );
}
