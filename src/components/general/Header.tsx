import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  RiMenu3Line,
  RiCloseLine,
  RiMoonLine,
  RiSunLine,
  RiGlobalLine,
} from "react-icons/ri";
import { useThemeStore } from "../../stores/themeStore";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const navItems = useMemo(
    () => [
      { name: t("nav.home"), href: "home" },
      { name: t("nav.about"), href: "about" },
      { name: t("nav.skills"), href: "skills" },
      { name: t("nav.projects"), href: "projects" },
      { name: t("nav.contact"), href: "contact" },
    ],
    [t],
  );

  const toggleLanguage = () => {
    const newLang = i18n.language === "vi" ? "en" : "vi";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // framer-motion variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, when: "beforeChildren" },
    },
    exit: { opacity: 0, y: -20, transition: { when: "afterChildren" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-tech-teal/20 bg-tech-bg/80 shadow-[0_4px_30px_rgba(68,187,164,0.1)]`}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="group flex items-center space-x-3 relative"
          >
            <div
              className={`absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg bg-tech-teal/40`}
            />
            <span
              className={`relative text-2xl md:text-3xl font-black uppercase tracking-widest transition-transform duration-300 group-hover:scale-105 text-tech-light drop-shadow-[0_0_8px_rgba(68,187,164,0.8)]`}
            >
              DINO PÉO
            </span>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => {
                    scrollToSection(item.href);
                    setActiveSection(item.href);
                  }}
                  className={`relative px-4 py-2 mx-1 text-sm font-bold tracking-widest transition-all duration-300 group uppercase ${
                    isActive
                      ? "text-tech-teal drop-shadow-[0_0_5px_rgba(68,187,164,0.8)]"
                      : "text-tech-light/60 hover:text-tech-light"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Hover background block */}
                  <div
                    className={`absolute inset-0 border border-tech-teal/0 group-hover:border-tech-teal/50 transition-all duration-300 bg-tech-teal/5 scale-y-0 group-hover:scale-y-100 origin-bottom`}
                    style={{
                      clipPath:
                        "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                    }}
                  />
                  {/* Active bottom line */}
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-tech-teal transition-all duration-300 ${
                      isActive
                        ? "w-full shadow-[0_0_10px_rgba(68,187,164,1)]"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className={`relative p-2 md:p-3 transition-all duration-300 group overflow-hidden border border-tech-teal/30 hover:border-tech-teal bg-tech-bg/50 shadow-[0_0_10px_rgba(68,187,164,0.1)] hover:shadow-[0_0_15px_rgba(68,187,164,0.4)] flex items-center justify-center gap-1 min-w-[64px]`}
              style={{
                clipPath:
                  "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
              }}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-tech-teal/20`}
              />
              <div className="relative text-tech-teal flex items-center gap-1">
                <RiGlobalLine
                  size={18}
                  className="group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_5px_rgba(68,187,164,0.8)]"
                />
                <span className="text-sm font-bold tracking-widest">
                  {i18n.language.toUpperCase()}
                </span>
              </div>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className={`relative p-2 md:p-3 transition-all duration-300 group overflow-hidden border border-tech-teal/30 hover:border-tech-teal bg-tech-bg/50 shadow-[0_0_10px_rgba(68,187,164,0.1)] hover:shadow-[0_0_15px_rgba(68,187,164,0.4)] hidden md:block`}
              style={{
                clipPath:
                  "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
              }}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-tech-teal/20`}
              />
              <div className="relative text-tech-teal">
                {darkMode ? (
                  <RiMoonLine
                    size={20}
                    className="group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_5px_rgba(68,187,164,0.8)]"
                  />
                ) : (
                  <RiSunLine
                    size={20}
                    className="text-tech-light group-hover:rotate-180 transition-transform duration-500"
                  />
                )}
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button
              ref={toggleRef}
              onClick={() => setIsOpen((prev) => !prev)}
              className={`md:hidden flex items-center gap-2 px-3 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 border border-tech-teal/50 hover:bg-tech-teal/10 text-tech-light shadow-[inset_0_0_10px_rgba(68,187,164,0.1)]`}
              style={{
                clipPath:
                  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
              }}
            >
              {isOpen ? (
                <RiCloseLine
                  size={24}
                  className="text-tech-teal drop-shadow-[0_0_5px_rgba(68,187,164,0.8)]"
                />
              ) : (
                <RiMenu3Line
                  size={24}
                  className="text-tech-teal drop-shadow-[0_0_5px_rgba(68,187,164,0.8)]"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className={`md:hidden absolute left-0 right-0 top-20 overflow-hidden rounded-b-xl backdrop-blur-2xl border-b ${
              darkMode
                ? "bg-white/5 border-white/10 shadow-lg shadow-black/5"
                : "bg-white/80 border-white/40 shadow-lg shadow-slate-200/50"
            }`}
          >
            {/* Background glow */}
            <div
              className={`absolute top-0 right-0 w-1/2 h-full opacity-20 blur-3xl pointer-events-none ${
                darkMode ? "bg-primary/70" : "bg-primary-deep/70"
              }`}
            />

            <nav className="relative flex flex-col items-end p-6 pr-8 space-y-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.button
                    key={item.href}
                    variants={itemVariants}
                    onClick={() => {
                      scrollToSection(item.href);
                      setActiveSection(item.href);
                      setIsOpen(false);
                    }}
                    className={`group relative text-right px-8 py-4 text-xl font-bold transition-all duration-300 rounded-xl ${
                      isActive
                        ? darkMode
                          ? "text-primary"
                          : "text-primary-deep"
                        : darkMode
                          ? "text-slate-300 hover:text-white"
                          : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 rounded-xl transition-transform duration-300 ${
                        isActive ? "scale-100" : "scale-0 group-hover:scale-100"
                      } ${darkMode ? "bg-white/10" : "bg-slate-900/5"}`}
                    />
                    <div
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all duration-300 ${
                        isActive ? "h-3/4" : "h-0 group-hover:h-3/4"
                      } ${darkMode ? "bg-primary" : "bg-primary-deep"}`}
                    />
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                );
              })}

              {/* Theme Toggle inside Mobile Menu */}
              <motion.button
                variants={itemVariants}
                onClick={() => {
                  toggleDarkMode();
                  setIsOpen(false);
                }}
                className={`group relative text-right px-8 py-4 text-xl font-bold flex items-center justify-end gap-3 transition-all duration-300 rounded-xl ${
                  darkMode
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-xl transition-transform duration-300 scale-0 group-hover:scale-100 ${darkMode ? "bg-white/10" : "bg-slate-900/5"}`}
                />
                <span className="relative z-10">
                  {darkMode ? "LIGHT MODE" : "DARK MODE"}
                </span>
                {darkMode ? (
                  <RiSunLine size={24} className="relative z-10" />
                ) : (
                  <RiMoonLine size={24} className="relative z-10" />
                )}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
