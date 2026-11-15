import type { Metadata } from "next";
import "@styles/tokens/variables.css";
import "@styles/main.css";
import "@styles/base/reset.css";
import { getSeoMetadata, getStructuredData } from "@/lib/seo";

export const metadata: Metadata = getSeoMetadata("home", "vi");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getStructuredData("vi");

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
