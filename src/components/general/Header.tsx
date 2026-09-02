import { profileData } from "../../constants/profileData";
import React, { useState, useMemo, useEffect } from "react";
import {
  RiMoonLine,
  RiSunLine,
} from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";
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
  const [isDesktop, setIsDesktop] = useState(false);

  // Mobile menu slides in from the right; desktop drops down from the top (half height).
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const navItems = useMemo(
    () => [
      { name: t("nav.home"), href: "home" },
      { name: t("nav.about"), href: "about" },
      { name: t("nav.skills"), href: "skills" },
      { name: t("nav.experience"), href: "experience" },
      { name: t("nav.projects"), href: "projects" },
      { name: t("nav.contact"), href: "contact" },
    ],
    [t],
  );

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const upperEl = document.getElementById("upper-content");

      if (upperEl && window.scrollY >= upperEl.offsetHeight - 120) {
        setActiveSection("contact");
        return;
      }

      const sections = navItems.map((item) => item.href);
      for (const section of sections) {
        if (section === "contact") continue;
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);
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


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 50, rotate: 2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  } as const;

  // Target language = ngôn ngữ sẽ chuyển sang khi click
  const targetLang = i18n.language === "vi" ? "en" : "vi";
  const targetFlag = targetLang === "vi"
    ? "https://flagcdn.com/vn.svg"
    : "https://flagcdn.com/us.svg";
  const targetCode = targetLang === "vi" ? "VI" : "EN";

  const handleToggleLang = () => {
    i18n.changeLanguage(targetLang);
    localStorage.setItem("language", targetLang);
  };

  const handleSetLang = (lang: "vi" | "en") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
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
    <header className="fixed top-0 left-0 right-0 z-100 transition-all duration-300">
      <div className="w-full px-6 md:px-12 h-20 md:h-24 flex justify-between items-center bg-transparent">
        {/* Logo */}
        <button
          onClick={() => handleNavigate("home")}
          aria-label="Homepage"
          className="relative z-110 group cursor-pointer"
        >
          <span className="text-xl md:text-2xl font-sans font-black uppercase tracking-[0.3em] text-foreground drop-shadow-[0_0_10px_rgba(var(--primary),0.3)] group-hover:text-primary transition-colors duration-300">
            {profileData.logo}
          </span>
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-4 relative z-110">
          {/* Language and Theme Selector */}
          <div className="hidden sm:flex items-center gap-2 sm:mr-2">
            <button
              onClick={handleToggleLang}
              aria-label={`Switch language to ${targetCode}`}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-foreground/5 hover:bg-foreground border border-foreground/10 hover:border-foreground transition-all duration-300 group/lang"
            >
              <span className="w-5 h-3.5 overflow-hidden rounded-sm flex items-center justify-center border border-foreground/10 group-hover/lang:border-background/20 transition-colors">
                <img
                  src={targetFlag}
                  alt={targetCode}
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="text-xs font-mono font-bold tracking-widest text-foreground group-hover/lang:text-background transition-colors">
                {targetCode}
              </span>
            </button>
            <button
              onClick={handleToggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="relative w-10 h-10 text-foreground hover:bg-foreground hover:text-background transition-colors rounded-full flex items-center justify-center bg-foreground/5 border border-foreground/10 hover:border-foreground overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={darkMode ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {darkMode ? <RiSunLine className="w-5 h-5" /> : <RiMoonLine className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Unified Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/5 hover:bg-foreground border border-foreground/10 hover:border-foreground transition-all duration-300 group/menu"
          >
            <span className="hidden md:inline text-xs font-mono font-bold tracking-[0.3em] text-foreground group-hover/menu:text-background transition-colors uppercase">
              {isOpen ? t("nav.close", "CLOSE") : t("nav.menu", "MENU")}
            </span>
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`w-5 h-0.5 bg-foreground group-hover/menu:bg-background transition-all duration-300 ${isOpen ? "rotate-45 translate-y-px" : "-translate-y-1"}`}
              />
              <span
                className={`w-5 h-0.5 bg-foreground group-hover/menu:bg-background transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-px" : "translate-y-1"}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Partial-Screen Menu Overlay (2/3 Height) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay for closing on click outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-104"
            />

            <motion.div
              initial={isDesktop ? { y: "-100%" } : { x: "100%" }}
              animate={isDesktop ? { y: 0 } : { x: 0 }}
              exit={isDesktop ? { y: "-100%" } : { x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 w-[80%] max-w-[340px] md:left-0 md:right-0 md:w-full md:max-w-none h-dvh pb-8 bg-background/95 md:bg-background/90 backdrop-blur-3xl z-105 flex flex-col overflow-y-auto overflow-x-hidden border-l md:border-l-0 border-primary/10 shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            >
              {/* Dot pattern backdrop (mobile only) */}
              <div className="md:hidden absolute inset-0 cyber-dots opacity-[0.06] pointer-events-none" />

              <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
                {/* LEFT: Nav list */}
                <motion.nav
                  variants={containerVariants}
                  className="relative flex-1 flex flex-col items-start justify-start md:justify-center px-6 md:px-16 lg:px-24 pt-20 pb-8 md:py-24 overflow-hidden"
                >
                  {/* Background Decorative Text */}
                  <div className="hidden md:flex absolute inset-0 items-center justify-start pl-16 opacity-[0.03] select-none pointer-events-none overflow-hidden">
                    <span className="text-[22vw] font-black leading-none text-foreground/10 uppercase">MENU</span>
                  </div>

                  <div className="relative flex flex-col gap-1 md:gap-2 w-full max-w-[95vw]">
                    {navItems.map((item, index) => {
                      const isActive = activeSection === item.href;
                      return (
                        <motion.button
                          key={item.href}
                          variants={linkVariants}
                          onClick={() => handleNavigate(item.href)}
                          className="group relative w-full py-2.5 md:py-3 flex items-center gap-4 md:gap-6 cursor-pointer"
                        >
                          {/* Index number */}
                          <span
                            className={`w-8 md:w-12 shrink-0 text-right font-mono text-[11px] md:text-sm tracking-widest transition-colors duration-500 ${isActive ? "text-primary" : "text-foreground/30 group-hover:text-primary/70"}`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          {/* Vertical mark revealed on hover/active */}
                          <span
                            className={`h-6 md:h-8 w-0.5 shrink-0 bg-primary transition-all duration-300 origin-left ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"}`}
                          />

                          <span className={`relative z-10 text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-black uppercase leading-[1.1] tracking-tight transition-colors duration-500 block whitespace-nowrap text-left ${isActive ? "text-primary" : "text-foreground/40 group-hover:text-primary"}`}>
                            <span className="relative inline-block">
                              {item.name}
                              {/* Underline effect */}
                              <div className={`absolute -bottom-1 md:-bottom-2 left-0 h-0.5 md:h-[3px] bg-primary transition-all duration-500 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                            </span>
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Mobile Controls (Language & Theme) */}
                  <motion.div
                    variants={linkVariants}
                    className="flex items-center justify-between w-full mt-auto pt-5 border-t border-primary/10 sm:hidden"
                  >
                    <div className="flex items-center rounded-full bg-foreground/5 border border-foreground/10 p-1 font-mono text-[11px] font-bold tracking-[0.15em]">
                      <button
                        onClick={() => handleSetLang("vi")}
                        className={`px-3 py-1.5 rounded-full transition-colors ${i18n.language === "vi" ? "bg-primary text-background" : "text-foreground/40"}`}
                      >
                        VN
                      </button>
                      <button
                        onClick={() => handleSetLang("en")}
                        className={`px-3 py-1.5 rounded-full transition-colors ${i18n.language === "en" ? "bg-primary text-background" : "text-foreground/40"}`}
                      >
                        EN
                      </button>
                    </div>

                    <button
                      onClick={handleToggleDarkMode}
                      aria-label="Toggle theme"
                      className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                    >
                      {darkMode ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
                    </button>
                  </motion.div>
                </motion.nav>

                {/* RIGHT: Info panel */}
                <motion.div
                  variants={linkVariants}
                  className="flex w-full lg:h-full lg:w-[340px] xl:w-[400px] shrink-0 flex-col justify-start gap-6 lg:justify-between border-t lg:border-t-0 lg:border-l border-primary/10 bg-foreground/2 px-6 md:px-12 py-6 lg:py-24"
                >
                  <div>
                    {/* Mobile: icon-only row */}
                    <div className="flex lg:hidden items-center gap-4">
                      {profileData.socialLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.name}
                          className="w-9 h-9 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary/30 transition-colors"
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>

                    {/* Desktop: full list with name + arrow */}
                    <div className="hidden lg:flex flex-col gap-1">
                      {profileData.socialLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between py-2.5 border-b border-primary/5 font-mono text-sm text-foreground/60 hover:text-primary transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-primary/70 group-hover:text-primary transition-colors">
                              {link.icon}
                            </span>
                            {link.name}
                          </span>
                          <FiArrowUpRight className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <a
                    href="mailto:phattranduy00@gmail.com"
                    className="block font-mono text-sm text-foreground hover:text-primary transition-colors break-all"
                  >
                    phattranduy00@gmail.com
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
