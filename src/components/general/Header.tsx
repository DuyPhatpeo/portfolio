// src/components/general/Header.tsx
import { profileData } from "@constants/profileData";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { FiX, FiArrowUpRight } from "react-icons/fi";
import { useThemeStore } from "@stores/themeStore";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

// Convert string to clean Title Case
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Scroll behavior: Show at top, hide when scrolling down, show when scrolling up
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show header near top of page (first 50px)
      if (currentScrollY <= 50) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling down: hide header to give space for content
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling up: reveal header for quick navigation
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = useMemo(
    () => [
      { name: t("nav.home"), href: "home" },
      { name: t("nav.about"), href: "about" },
      { name: t("nav.skills"), href: "skills" },
      { name: t("nav.experience"), href: "experience" },
      { name: t("nav.projects"), href: "projects" },
      { name: t("nav.activity"), href: "activity" },
      { name: t("nav.contact"), href: "contact" },
    ],
    [t]
  );

  // Lock body scroll and handle Escape key when menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
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

  // Target language switch
  const targetLang = i18n.language === "vi" ? "en" : "vi";
  const targetFlag =
    targetLang === "vi"
      ? "https://flagcdn.com/vn.svg"
      : "https://flagcdn.com/us.svg";
  const targetCode = targetLang === "vi" ? "VI" : "EN";

  const handleToggleLang = () => {
    i18n.changeLanguage(targetLang);
    localStorage.setItem("language", targetLang);
  };

  const handleToggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const clickEvent = new CustomEvent("darkModeToggle", {
      detail: { x, y },
    });
    window.dispatchEvent(clickEvent);

    toggleDarkMode();
  };

  const handleNavigate = (id: string) => {
    document.body.style.overflow = "";
    setIsOpen(false);
    requestAnimationFrame(() => {
      scrollToSection(id);
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[200]">
      {/* ================= TOP NAVBAR =================
          Hides when scrolling down, reveals when scrolling up.
          Stays permanently visible and stable when menu is open.
      =============================================================== */}
      <div
        className={`relative z-20 w-full px-5 sm:px-12 md:px-16 lg:px-24 h-20 md:h-24 flex justify-between items-center transition-all duration-300 transform ${
          showHeader || isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isOpen
            ? "border-b border-white/10"
            : ""
        }`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => handleNavigate("home")}
          aria-label="Homepage"
          className="relative z-10 group cursor-pointer"
        >
          <span
            className={`text-xl md:text-2xl font-sans font-black uppercase tracking-[0.3em] transition-colors duration-300 ${
              isOpen
                ? "text-neutral-100 group-hover:text-primary"
                : "text-foreground group-hover:text-primary"
            }`}
          >
            {profileData.logo}
          </span>
        </button>

        {/* Right side controls: Language + Theme + Square Hamburger / Close Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 relative z-10">
          {/* Language Selector */}
          <button
            onClick={handleToggleLang}
            aria-label={`Switch language to ${targetCode}`}
            className={`h-9 sm:h-10 px-3 flex items-center justify-center gap-1.5 rounded-lg border transition-colors font-mono text-xs font-bold cursor-pointer shrink-0 ${
              isOpen
                ? "border-white/15 bg-white/5 text-neutral-200 hover:text-primary hover:border-primary/50"
                : "border-foreground/15 dark:border-white/15 bg-foreground/5 dark:bg-white/5 text-foreground hover:text-primary hover:border-primary/50"
            }`}
          >
            <span className="w-4 h-3 overflow-hidden rounded-xs flex items-center justify-center">
              <img
                src={targetFlag}
                alt={targetCode}
                className="w-full h-full object-cover"
              />
            </span>
            <span>{targetCode}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleToggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${
              isOpen
                ? "border-white/15 bg-white/5 text-neutral-200 hover:text-primary hover:border-primary/50"
                : "border-foreground/15 dark:border-white/15 bg-foreground/5 dark:bg-white/5 text-foreground hover:text-primary hover:border-primary/50"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={darkMode ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center"
              >
                {darkMode ? <RiSunLine className="w-4 h-4" /> : <RiMoonLine className="w-4 h-4" />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Square Toggle Button: [ = ] when closed, [ ✕ ] when open */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
              isOpen
                ? "border-white/15 bg-white/5 hover:bg-white/10 hover:border-primary/60 text-neutral-200 hover:text-primary"
                : "border-foreground/15 dark:border-white/15 bg-foreground/5 dark:bg-white/5 hover:border-primary/50 text-foreground hover:text-primary"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center"
                >
                  <FiX className="w-5 h-5 pointer-events-none" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center gap-1.5"
                >
                  <span className="w-4 h-0.5 bg-current rounded-full transition-colors" />
                  <span className="w-4 h-0.5 bg-current rounded-full transition-colors" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ========================================================
          FULLSCREEN MENU OVERLAY (LINEWISE STYLE)
          Expands/shrinks background from the top-right button
          while Header remains static and functional on top
      ======================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
              clipPath: "circle(0% at calc(100% - 44px) 44px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              clipPath: "circle(160% at calc(100% - 44px) 44px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              clipPath: "circle(0% at calc(100% - 44px) 44px)",
            }}
            style={{ transformOrigin: "calc(100% - 44px) 44px" }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-10 w-screen h-dvh bg-[#151619] dark:bg-[#131417] text-white flex flex-col justify-between overflow-hidden select-none"
          >
            {/* Ambient subtle glow at top using 1 signature primary color (#21f1a8) */}
            <div
              className="absolute top-0 left-0 right-0 h-48 pointer-events-none transition-all duration-500 opacity-20 blur-[100px]"
              style={{
                background: hoveredIndex !== null ? "#21f1a8" : "transparent",
              }}
            />

            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 cyber-dots opacity-[0.03] pointer-events-none" />

            {/* Header Spacer (preserves space for static top navbar) */}
            <div className="w-full h-20 md:h-24 shrink-0" />

            {/* ================= NAV ITEMS (TOP-LEFT ORIENTED) ================= */}
            <div className="w-full px-5 sm:px-12 md:px-16 lg:px-24 pt-3 sm:pt-8 md:pt-10 flex-1 flex flex-col justify-start items-start overflow-y-auto z-10">
              <nav className="flex flex-col items-start gap-0.5 sm:gap-1 py-2 w-full">
                {navItems.map((item, index) => {
                  const isHovered = hoveredIndex === index;

                  return (
                    <button
                      key={item.href}
                      onMouseEnter={(e) => {
                        setHoveredIndex(index);
                        const rect = e.currentTarget.getBoundingClientRect();
                        setMousePos({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        });
                      }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setMousePos({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        });
                      }}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => handleNavigate(item.href)}
                      className="group text-left py-0.5 sm:py-1 cursor-pointer w-max select-none block"
                    >
                      {/* Typography matching video: Large, font-normal, tight leading, title case
                          Using single signature primary color (#21f1a8) for spotlight hover */}
                      <span
                        style={
                          isHovered
                            ? {
                                backgroundImage: `radial-gradient(circle 260px at ${mousePos.x}px ${mousePos.y}px, #21f1a8 0%, rgba(33, 241, 168, 0.4) 40%, #ffffff 75%)`,
                              }
                            : undefined
                        }
                        className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] font-sans font-normal tracking-tight leading-[1.05] block select-none transition-colors duration-150 ${
                          isHovered
                            ? "bg-clip-text text-transparent"
                            : "text-white hover:text-white"
                        }`}
                      >
                        {toTitleCase(item.name)}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* ================= MODAL FOOTER ================= */}
            <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 py-5 sm:py-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-xs font-sans text-neutral-400 shrink-0 z-10">
              {/* Left: Copyright */}
              <div>
                © {new Date().getFullYear()} {profileData.name || "Dino Péo"}. All rights reserved.
              </div>

              {/* Center: Email */}
              <div className="flex flex-col sm:items-center">
                <a
                  href="mailto:phattranduy00@gmail.com"
                  className="hover:text-primary transition-colors font-medium text-neutral-300"
                >
                  phattranduy00@gmail.com
                </a>
              </div>

              {/* Right: Social Links */}
              <div className="flex items-center gap-4 text-neutral-300">
                {profileData.socialLinks.slice(0, 3).map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span>{link.name}</span>
                    <FiArrowUpRight className="text-xs" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
