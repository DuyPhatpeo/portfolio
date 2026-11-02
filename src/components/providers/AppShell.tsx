"use client";

import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/stores/themeStore";
import DarkModeAnimation from "@/components/theme/DarkModeAnimation";
import Particles from "@/components/theme/Particles";
import ScrollToTop from "@/components/general/ScrollToTop";
import ClickSpark from "@/components/general/ClickSpark";
import Loading from "@/components/general/Loading";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { darkMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  // Initial page entry / F5 preloader sweep (~360ms with guaranteed safety fallback)
  useEffect(() => {
    let isDone = false;
    const durationMs = 360;
    const startTime = performance.now();
    let rafId = 0;
    let exitTimer = 0;
    let unmountTimer = 0;

    const finish = () => {
      if (isDone) return;
      isDone = true;
      cancelAnimationFrame(rafId);
      setProgress(100);
      setIsExiting(true);
      unmountTimer = window.setTimeout(() => {
        setIsLoading(false);
      }, 150);
    };

    const tick = (now: number) => {
      if (isDone) return;
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        exitTimer = window.setTimeout(finish, 40);
      }
    };

    rafId = requestAnimationFrame(tick);

    // Hard fallback timeout: guarantees loading screen unmounts even if tab is in background or RAF stalls
    const hardTimeout = window.setTimeout(finish, 480);

    return () => {
      isDone = true;
      cancelAnimationFrame(rafId);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
      clearTimeout(hardTimeout);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Page Loading Preloader */}
      {isLoading && <Loading progress={progress} exiting={isExiting} />}

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
