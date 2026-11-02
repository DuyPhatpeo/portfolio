import type { Metadata } from "next";
import "@styles/tokens/variables.css";
import "@styles/main.css";
import "@styles/base/reset.css";

export const metadata: Metadata = {
  title: "Tran Duy Phat | Fullstack Developer Portfolio",
  description:
    "Personal developer portfolio of Tran Duy Phat presenting technical skills, projects, and engineering experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
