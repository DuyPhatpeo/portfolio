// src/components/general/Header.tsx
import { profileData } from "@constants/profileData";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { FiX, FiArrowUpRight } from "react-icons/fi";
import { useThemeStore } from "@stores/themeStore";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  // Scroll behavior: Show at top, hide when scrolling down, show when scrolling up
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 40);

      if (currentScrollY <= 40) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = useMemo(
    () => [
      { name: t("nav.home"), href: "home", path: "/" },
      { name: t("nav.about"), href: "about", path: "/about" },
      { name: t("nav.projects"), href: "projects", path: "/projects" },
      { name: t("nav.contact"), href: "contact", path: "/contact" },
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
      if (id === "home") {
        if (location.pathname !== "/") {
          navigate("/");
          window.scrollTo(0, 0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else if (id === "projects") {
        navigate("/projects");
        window.scrollTo(0, 0);
      } else if (id === "contact") {
        navigate("/contact");
        window.scrollTo(0, 0);
      } else if (id === "about") {
        navigate("/about");
        window.scrollTo(0, 0);
      } else {
        if (location.pathname !== "/") {
          navigate(`/#${id}`);
        } else {
          scrollToSection(id);
        }
      }
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 transform ${
        showHeader || isOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isScrolled && !isOpen
          ? "bg-background/70 backdrop-blur-md border-b border-border/80"
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

        {/* Right Side Controls (44px accessible touch targets) */}
        <div className="flex items-center gap-2.5 relative z-10">
          {/* Language Selector */}
          <button
            onClick={handleToggleLang}
            aria-label={`Switch language to ${targetCode}`}
            className={`h-11 px-4 flex items-center justify-center gap-2 rounded-lg border transition-colors font-mono text-sm font-medium cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isOpen
                ? "border-white/15 bg-white/5 text-neutral-200 hover:text-primary hover:border-primary/50"
                : "border-border bg-card/70 text-foreground hover:text-primary hover:border-primary/50"
            }`}
          >
            <span className="w-4 h-3 overflow-hidden rounded-[2px] flex items-center justify-center">
              <img
                src={targetFlag}
                alt=""
                width={16}
                height={12}
                className="w-full h-full object-cover"
              />
            </span>
            <span>{targetCode}</span>
          </button>

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
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={darkMode ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center"
              >
                {darkMode ? (
                  <RiSunLine className="w-5 h-5" />
                ) : (
                  <RiMoonLine className="w-5 h-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className={`w-11 h-11 rounded-lg border transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isOpen
                ? "border-white/15 bg-white/5 hover:bg-white/10 hover:border-primary/60 text-neutral-200 hover:text-primary"
                : "border-border bg-card/70 hover:border-primary/50 text-foreground hover:text-primary"
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

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 44px) 40px)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(160% at calc(100% - 44px) 40px)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 44px) 40px)",
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-10 w-screen h-dvh bg-[#050507]/94 backdrop-blur-md text-neutral-100 flex flex-col justify-between overflow-hidden select-none"
          >
            {/* Header Spacer */}
            <div className="w-full h-20 shrink-0" />

            {/* Navigation Items */}
            <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 pt-6 sm:pt-10 flex-1 flex flex-col justify-center items-start overflow-y-auto z-10">
              <nav className="flex flex-col items-start gap-2 sm:gap-3 w-full">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavigate(item.href)}
                      className="group flex items-baseline gap-4 sm:gap-6 text-left py-1.5 cursor-pointer select-none"
                    >
                      <span className="font-mono text-xs sm:text-sm text-neutral-500 group-hover:text-primary transition-colors">
                        0{index + 1}
                      </span>
                      <span
                        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tight leading-[1.08] transition-all duration-200 group-hover:translate-x-2 ${
                          isActive
                            ? "text-primary"
                            : "text-neutral-100 group-hover:text-primary"
                        }`}
                      >
                        {toTitleCase(item.name)}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 py-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400 shrink-0 z-10">
              <div>
                © {new Date().getFullYear()} {profileData.name}. {t("footer.rights")}
              </div>

              <a
                href="mailto:phattranduy00@gmail.com"
                className="font-mono hover:text-primary transition-colors text-neutral-300"
              >
                phattranduy00@gmail.com
              </a>

              <div className="flex items-center gap-5 text-neutral-300">
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
