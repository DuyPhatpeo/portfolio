"use client";

import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/stores/themeStore";
import DarkModeAnimation from "@/components/theme/DarkModeAnimation";
import Particles from "@/components/theme/Particles";
import ScrollToTop from "@/components/general/ScrollToTop";
import ClickSpark from "@/components/general/ClickSpark";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { darkMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Persistent Cosmic Starfield Layer */}
      {mounted && <Particles quantity={195} zIndex={1} />}

      {/* Dark Mode Circular Transition Wipe */}
      {mounted && <DarkModeAnimation isDark={darkMode} />}

      {/* Click Spark Wrapper */}
      <ClickSpark
        sparkColor={darkMode ? "#ffffff" : "#18181b"}
        sparkSize={9}
        sparkRadius={15}
        sparkCount={8}
        duration={380}
      >
        <div id="app-content-root" className="relative z-10 flex flex-col min-h-screen">
          {children}
          <ScrollToTop />
        </div>
      </ClickSpark>
    </div>
  );
}
