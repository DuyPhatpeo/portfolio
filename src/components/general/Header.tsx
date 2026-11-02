"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { profileData } from "@/constants/profileData";
import { useThemeStore } from "@stores/themeStore";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@components/providers/LanguageProvider";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";

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
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname() || `/${lang}`;

  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // Header scroll detection (auto-hide on scroll down, show on scroll up)
  useEffect(() => {
    let ticking = false;
    let lastDirection = "none";

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 30);

        if (currentScrollY <= 30) {
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
      { name: t("nav.home", "Home"), href: "home", path: `/${lang}`, rotation: -3 },
      { name: t("nav.about", "About"), href: "about", path: `/${lang}/about`, rotation: 2.5 },
      { name: t("nav.projects", "Projects"), href: "projects", path: `/${lang}/projects`, rotation: -2 },
      { name: t("nav.contact", "Contact"), href: "contact", path: `/${lang}/contact`, rotation: 3 },
    ],
    [t, lang]
  );

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return next;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Keyboard navigation (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Dark mode toggle with radial wipe
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
    closeMenu();
    const targetPath = id === "home" ? `/${lang}` : `/${lang}/${id}`;

    if (pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(targetPath);
    }
  };

  return (
    <>
      <style>{`
        .bubble-pill-item {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
          will-change: transform, box-shadow;
        }
        @media (min-width: 900px) {
          .bubble-pill-item {
            transform: rotate(var(--pill-rot, 0deg));
          }
          .bubble-pill-item:hover {
            transform: rotate(calc(var(--pill-rot, 0deg) * 0.35)) translateY(-3px) scale(1.035) !important;
            background: #d9ff3a !important;
            color: #11121c !important;
            border-color: #d9ff3a !important;
            box-shadow: 0 14px 35px -5px rgba(217, 255, 58, 0.4), 0 0 20px rgba(217, 255, 58, 0.25) !important;
          }
          .bubble-pill-item:active {
            transform: rotate(var(--pill-rot, 0deg)) translateY(1px) scale(0.98) !important;
            transition-duration: 0.12s !important;
          }
        }
        @media (max-width: 899px) {
          .bubble-pill-item:hover {
            transform: translateY(-2px) scale(1.02) !important;
            background: #d9ff3a !important;
            color: #11121c !important;
            border-color: #d9ff3a !important;
            box-shadow: 0 10px 25px -4px rgba(217, 255, 58, 0.35) !important;
          }
          .bubble-pill-item:active {
            transform: translateY(1px) scale(0.98) !important;
            transition-duration: 0.12s !important;
          }
        }
        .header-social-item {
          transition: opacity 0.25s ease, color 0.25s ease;
        }
        .header-social-list:hover .header-social-item:not(:hover) {
          opacity: 0.35;
        }
      `}</style>

      {/* Full-Width Header Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[200] transition-[transform,opacity,background-color,border-color] duration-300 pointer-events-none ${
          showHeader || isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } ${
          isScrolled && !isOpen
            ? darkMode
              ? "bg-[#11121c]/80 backdrop-blur-md border-b border-primary/10 shadow-sm"
              : "bg-white/80 backdrop-blur-md border-b border-[#11121c]/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          {/* Left Brand: Clean text only, no capsule background, no logo image */}
          <div className="pointer-events-auto">
            <button
              onClick={() => handleNavigate("home")}
              aria-label="Homepage"
              className="group inline-flex items-center py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg select-none"
            >
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                Dino Péo
              </span>
            </button>
          </div>

          {/* Right Bubble: Controls Capsule (Theme Toggle + Staggered Menu Button) */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={handleToggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card/85 backdrop-blur-xl border border-primary/25 shadow-[0_4px_20px_rgba(0,0,0,0.35)] flex items-center justify-center text-foreground hover:text-primary transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_16px_rgba(217,255,58,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex items-center justify-center transition-transform duration-200">
                {darkMode ? (
                  <RiSunLine className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <RiMoonLine className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </span>
            </button>

            {/* Staggered Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="inline-flex items-center gap-2.5 h-10 sm:h-11 px-4 sm:px-5 rounded-full bg-card/85 backdrop-blur-xl border border-primary/25 shadow-[0_4px_20px_rgba(0,0,0,0.35)] text-foreground hover:text-primary transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(217,255,58,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Rolling Text (StaggeredMenu style) */}
              <span className="relative inline-block h-[1.1em] overflow-hidden whitespace-nowrap text-xs font-mono font-semibold uppercase tracking-wider text-current">
                <span
                  className={`flex flex-col leading-none transition-transform duration-300 ease-out ${
                    isOpen ? "-translate-y-1/2" : "translate-y-0"
                  }`}
                >
                  <span className="block h-[1.1em] leading-none">MENU</span>
                  <span className="block h-[1.1em] leading-none">
                    {lang === "vi" ? "ĐÓNG" : "CLOSE"}
                  </span>
                </span>
              </span>

              {/* Animated Plus-Cross Icon (StaggeredMenu style) */}
              <span
                className={`relative w-3.5 h-3.5 shrink-0 inline-flex items-center justify-center transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                } text-current`}
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-full -translate-x-1/2 -translate-y-1/2" />
                <span
                  className={`absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
                    isOpen ? "rotate-0" : "rotate-90"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Staggered Multi-Layer Curtain Prelayers (Staggered Menu Concept) */}
      <div
        className={`fixed inset-0 pointer-events-none z-[250] overflow-hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      >
        <div
          className={`absolute top-0 right-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            darkMode ? "bg-[#1a2300]" : "bg-[#d9ff3a]"
          } ${isOpen ? "translate-x-0 delay-0" : "translate-x-full delay-[100ms]"}`}
        />
        <div
          className={`absolute top-0 right-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            darkMode ? "bg-[#2c3d00]" : "bg-[#11121c]"
          } ${isOpen ? "translate-x-0 delay-[60ms]" : "translate-x-full delay-[50ms]"}`}
        />
        <div
          className={`absolute top-0 right-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            darkMode ? "bg-[#161826]" : "bg-[#ffffff]"
          } ${isOpen ? "translate-x-0 delay-[120ms]" : "translate-x-full delay-0"}`}
        />
      </div>

      {/* Main Staggered + Bubble Menu Overlay Panel */}
      <div
        id="bubble-staggered-panel"
        className={`fixed inset-0 z-[260] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto select-none border-l transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          darkMode
            ? "bg-[#11121c]/96 text-neutral-100 border-primary/20"
            : "bg-[#f0f2f5]/98 text-[#11121c] border-[#11121c]/15"
        } ${
          isOpen
            ? "translate-x-0 pointer-events-auto delay-[180ms]"
            : "translate-x-full pointer-events-none delay-0"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Top Bar inside panel */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between shrink-0">
          <button
            onClick={() => handleNavigate("home")}
            aria-label="Homepage"
            className="group inline-flex items-center py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg select-none"
          >
            <span
              className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                darkMode
                  ? "text-neutral-100 group-hover:text-primary"
                  : "text-[#11121c] group-hover:text-primary"
              }`}
            >
              Dino Péo
            </span>
          </button>

          <button
            onClick={closeMenu}
            aria-label="Close navigation"
            className={`inline-flex items-center gap-2.5 h-10 sm:h-11 px-4 sm:px-5 rounded-full backdrop-blur-md font-mono text-xs uppercase font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
              darkMode
                ? "bg-white/5 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary"
                : "bg-[#11121c] text-[#d9ff3a] border border-[#11121c] hover:bg-[#202334]"
            }`}
          >
            <span>{lang === "vi" ? "ĐÓNG" : "CLOSE"}</span>
            <span className="relative w-3.5 h-3.5 inline-flex items-center justify-center">
              <span className="absolute w-full h-[2px] bg-current rounded-full rotate-45" />
              <span className="absolute w-full h-[2px] bg-current rounded-full -rotate-45" />
            </span>
          </button>
        </div>

        {/* Center: Bubble Menu Pills Grid (Bubble Menu Concept) */}
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 flex-1 flex flex-col justify-center items-center">
          <p
            className={`font-mono text-xs sm:text-sm tracking-[0.25em] uppercase mb-6 sm:mb-8 text-center font-semibold ${
              darkMode ? "text-primary opacity-80" : "text-[#11121c]/70"
            }`}
          >
            {lang === "vi" ? "ĐIỀU HƯỚNG TRANG" : "NAVIGATION"}
          </p>

          <nav className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5 max-w-3xl">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              const delays = [
                "delay-[240ms]",
                "delay-[300ms]",
                "delay-[360ms]",
                "delay-[420ms]",
              ];
              return (
                <div
                  key={item.href}
                  className={`w-full transition-all duration-500 ease-out ${delays[index]} ${
                    isOpen
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-6 scale-90 pointer-events-none"
                  }`}
                >
                  <button
                    onClick={() => handleNavigate(item.href)}
                    style={
                      {
                        "--pill-rot": `${item.rotation}deg`,
                      } as React.CSSProperties
                    }
                    className={`bubble-pill-item group w-full rounded-full border px-6 sm:px-8 py-4 sm:py-5 flex items-center backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] cursor-pointer will-change-transform ${
                      isActive
                        ? darkMode
                          ? "bg-primary/20 border-primary text-primary shadow-[0_0_24px_rgba(217,255,58,0.3)]"
                          : "bg-[#d9ff3a] border-2 border-[#11121c] text-[#11121c] shadow-[0_4px_16px_rgba(217,255,58,0.4)]"
                        : darkMode
                          ? "bg-[#181926]/85 border-primary/20 text-neutral-100"
                          : "bg-white border-2 border-[#11121c]/15 text-[#11121c] shadow-sm"
                    }`}
                  >
                    <span className="inline-flex items-center gap-3 sm:gap-4 will-change-transform transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                      {/* Active Route Indicator Dot */}
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out ${
                          isActive
                            ? darkMode
                              ? "bg-primary opacity-100 scale-100 shadow-[0_0_10px_rgba(217,255,58,1)]"
                              : "bg-[#11121c] opacity-100 scale-100"
                            : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-[#11121c]"
                        }`}
                      />
                      <span className="text-xl sm:text-2xl md:text-3xl font-sans font-bold uppercase tracking-tight">
                        {toTitleCase(item.name)}
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Staggered Socials & Contact Bar (Staggered Menu Concept) */}
        <div
          className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-8 pt-4 shrink-0 border-t ${
            darkMode ? "border-white/10" : "border-[#11121c]/10"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Socials List with Hover Isolation */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span
                className={`text-xs font-mono uppercase tracking-wider font-semibold mr-1 ${
                  darkMode ? "text-primary" : "text-[#11121c]"
                }`}
              >
                Socials:
              </span>
              <ul className="header-social-list list-none m-0 p-0 flex items-center gap-2 sm:gap-3 flex-wrap">
                {profileData.socialLinks.map((social, idx) => (
                  <li key={idx} className="header-social-item">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                        darkMode
                          ? "bg-white/5 border border-white/10 hover:border-primary/50 text-neutral-300 hover:text-primary"
                          : "bg-white border border-[#11121c]/15 text-[#11121c] hover:bg-[#11121c] hover:text-[#d9ff3a] shadow-sm"
                      }`}
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Email Contact link */}
            <div
              className={`flex items-center gap-4 text-xs font-mono ${
                darkMode ? "text-neutral-400" : "text-[#11121c]/70"
              }`}
            >
              <a
                href="mailto:phattranduy00@gmail.com"
                className={`inline-flex items-center gap-1.5 transition-colors ${
                  darkMode
                    ? "text-neutral-300 hover:text-primary"
                    : "text-[#11121c] hover:text-[#11121c] font-semibold"
                }`}
              >
                <FiMail className="w-3.5 h-3.5 text-primary" />
                <span>phattranduy00@gmail.com</span>
              </a>
              <span className="hidden md:inline text-neutral-500">•</span>
              <span className="hidden md:inline">© {new Date().getFullYear()} Dino Péo</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
