"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { profileData } from "@/constants/profileData";
import { useThemeStore } from "@stores/themeStore";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@components/providers/LanguageProvider";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { FiX } from "react-icons/fi";

interface HeaderProps {
  scrollToSection?: (id: string) => void;
}

const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const { t, i18n } = useTranslation();
  const { lang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname() || `/${lang}`;

  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    let lastDirection = "none";

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 40);

        if (currentScrollY <= 40) {
          setShowHeader(true);
          lastScrollY.current = currentScrollY;
        } else {
          const diff = currentScrollY - lastScrollY.current;
          const currentDirection = diff > 0 ? "down" : diff < 0 ? "up" : lastDirection;

          if (currentDirection !== lastDirection) {
            lastScrollY.current = currentScrollY;
            lastDirection = currentDirection;
          } else if (diff > 8) {
            setShowHeader(false);
            lastScrollY.current = currentScrollY;
          } else if (diff < -6) {
            setShowHeader(true);
            lastScrollY.current = currentScrollY;
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = useMemo(
    () => [
      { name: t("nav.home"), href: "home", path: `/${lang}` },
      { name: t("nav.about"), href: "about", path: `/${lang}/about` },
      { name: t("nav.projects"), href: "projects", path: `/${lang}/projects` },
      { name: t("nav.contact"), href: "contact", path: `/${lang}/contact` },
    ],
    [t, lang]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    window.dispatchEvent(
      new CustomEvent("darkModeToggle", {
        detail: { x, y },
      })
    );

    toggleDarkMode();
  };

  const handleNavigate = (id: string) => {
    document.body.style.overflow = "";
    setIsOpen(false);

    const targetPath = id === "home" ? `/${lang}` : `/${lang}/${id}`;

    if (pathname === targetPath) {
      // Already on target page -> smooth scroll to top of this page
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Switching to a different page -> navigate directly without scrolling the old page
      router.push(targetPath);
    }
  };

  const handleOpenMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-[transform,opacity,background-color,border-color] duration-300 ${
        showHeader || isOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isScrolled && !isOpen
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Top Navbar */}
      <div
        className={`relative z-20 w-full px-4 sm:px-6 md:px-8 h-20 flex justify-between items-center ${
          isOpen ? "border-b border-white/10" : ""
        }`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => handleNavigate("home")}
          aria-label="Homepage"
          className="relative z-10 group cursor-pointer py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <span
            className={`text-xl md:text-2xl font-sans font-bold uppercase tracking-[0.2em] transition-colors duration-200 ${
              isOpen
                ? "text-neutral-100 group-hover:text-primary"
                : "text-foreground group-hover:text-primary"
            }`}
          >
            {profileData.logo}
          </span>
        </button>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2.5 relative z-10">
          {/* Theme Toggle */}
          <button
            onClick={handleToggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`w-11 h-11 rounded-lg border transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isOpen
                ? "border-white/15 bg-white/5 text-neutral-200 hover:text-primary hover:border-primary/50"
                : "border-border bg-card/70 text-foreground hover:text-primary hover:border-primary/50"
            }`}
          >
            <span className="flex items-center justify-center transition-transform duration-200">
              {darkMode ? (
                <RiSunLine className="w-5 h-5" />
              ) : (
                <RiMoonLine className="w-5 h-5" />
              )}
            </span>
          </button>

          {/* Menu Toggle Button */}
          <button
            onClick={handleOpenMenu}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            className={`w-11 h-11 rounded-lg border transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isOpen
                ? "border-white/15 bg-white/5 hover:bg-white/10 hover:border-primary/60 text-neutral-200 hover:text-primary"
                : "border-border bg-card/70 hover:border-primary/50 text-foreground hover:text-primary"
            }`}
          >
            {isOpen ? (
              <FiX className="w-5 h-5 pointer-events-none" />
            ) : (
              <span className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                <span className="w-4 h-0.5 bg-current rounded-full" />
                <span className="w-4 h-0.5 bg-current rounded-full" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Fullscreen Menu Overlay */}
      <div
        aria-hidden={!isOpen}
        style={{
          clipPath: isOpen
            ? "circle(160% at calc(100% - 44px) 40px)"
            : "circle(0% at calc(100% - 44px) 40px)",
        }}
        className={`fixed inset-0 z-10 w-screen h-dvh bg-[#171717]/96 backdrop-blur-md text-neutral-100 flex flex-col justify-between overflow-hidden select-none transition-[clip-path,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full h-20 shrink-0" />

        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 pt-4 sm:pt-8 md:pt-10 flex-1 flex flex-col justify-start md:justify-center items-end overflow-y-auto z-10">
          <nav className="flex flex-col items-end gap-2 sm:gap-3 w-full">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.href}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => handleNavigate(item.href)}
                  className="group flex items-baseline justify-end gap-4 sm:gap-6 text-right py-1.5 cursor-pointer select-none"
                >
                  <span
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tight leading-[1.08] transition-[color,transform] duration-200 group-hover:-translate-x-2 ${
                      isActive
                        ? "text-primary"
                        : "text-neutral-100 group-hover:text-primary"
                    }`}
                  >
                    {toTitleCase(item.name)}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-neutral-500 group-hover:text-primary transition-colors">
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 py-5 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 shrink-0 z-10">
          <span className="font-mono text-neutral-400">
            © {new Date().getFullYear()} Dino Péo
          </span>

          <a
            tabIndex={isOpen ? 0 : -1}
            href="mailto:phattranduy00@gmail.com"
            className="font-mono hover:text-primary transition-colors text-neutral-300"
          >
            phattranduy00@gmail.com
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
