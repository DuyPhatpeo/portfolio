import { LanguageProvider } from "@/components/providers/LanguageProvider";
import AppShell from "@/components/providers/AppShell";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import NotFoundContent from "@/components/general/NotFoundContent";

export default function RootNotFound() {
  return (
    <LanguageProvider lang="vi">
      <AppShell>
        <Header />
        <div className="flex-1 flex flex-col justify-center min-h-screen min-h-[100dvh]">
          <NotFoundContent />
        </div>
        <Footer />
      </AppShell>
    </LanguageProvider>
  );
}
