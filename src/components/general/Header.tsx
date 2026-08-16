import { profileData } from "../../constants/profileData";
import React, { useState, useMemo, useEffect } from "react";
import {
  RiMoonLine,
  RiSunLine,
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
  const [isDesktop, setIsDesktop] = useState(false);

  // Mobile menu slides in from the right; desktop drops down from the top.
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

  return (
    <header className="fixed top-0 left-0 right-0 z-100 transition-all duration-300">
      <div className="w-full px-6 md:px-12 h-20 md:h-24 flex justify-between items-center bg-transparent">
        {/* Logo */}
        <button
          onClick={() => {
            scrollToSection("home");
            setIsOpen(false);
          }}
          className="relative z-110 group"
        >
          <span className="text-xl md:text-2xl font-sans font-black uppercase tracking-[0.3em] text-foreground drop-shadow-[0_0_10px_rgba(var(--primary),0.3)] group-hover:text-primary transition-colors duration-300">
            {profileData.logo}
          </span>
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-3 sm:gap-6 relative z-110">
          {/* Language and Theme Selector */}
          <div className="hidden sm:flex items-center gap-4 sm:mr-2">
            <button
              onClick={handleToggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-all duration-300 group/lang"
            >
              <span className="w-5 h-3.5 overflow-hidden rounded-sm flex items-center justify-center border border-foreground/10">
                <img
                  src={targetFlag}
                  alt={targetCode}
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="text-xs font-mono font-bold tracking-widest text-foreground group-hover/lang:text-primary transition-colors">
                {targetCode}
              </span>
            </button>
            <button
              onClick={handleToggleDarkMode}
              className="relative p-2 w-9 h-9 text-foreground hover:text-primary transition-colors rounded-2xl flex items-center justify-center bg-transparent overflow-hidden"
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
            className="flex items-center gap-3 group"
          >
            <span className="hidden md:inline text-xs font-mono font-bold tracking-[0.3em] text-foreground group-hover:text-primary transition-colors uppercase">
              {isOpen ? t("nav.close", "CLOSE") : t("nav.menu", "MENU")}
            </span>
            <div className="relative w-8 h-8 flex flex-col justify-center items-center">
              <span
                className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? "rotate-45 translate-y-px" : "-translate-y-1"}`}
              />
              <span
                className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-px" : "translate-y-1"}`}
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
              className="fixed top-0 right-0 w-[62%] max-w-[280px] md:left-0 md:w-auto md:max-w-none h-dvh md:h-auto md:min-h-[58vh] md:max-h-[100dvh] pb-8 md:pb-24 bg-background/95 md:bg-background/70 backdrop-blur-3xl z-105 flex flex-col overflow-y-auto overflow-x-hidden border-l md:border-l-0 border-b border-primary/10 shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            >
              {/* Background Decorative Text (desktop only) */}
              <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
                <span className="text-[25vw] font-black leading-none text-foreground/10 uppercase">DINO PÉO</span>
              </div>

              {/* Dot pattern backdrop (mobile only) */}
              <div className="md:hidden absolute inset-0 cyber-dots opacity-[0.06] pointer-events-none" />

              <motion.nav
                variants={containerVariants}
                className="relative z-10 w-full h-full px-4 md:px-32 flex flex-col items-start justify-center md:justify-start my-auto pt-16 pb-20 md:pt-24 md:pb-0"
              >
                <div className="flex flex-col md:flex-row md:flex-wrap gap-y-3 md:gap-y-4 gap-x-8 md:gap-x-16 w-full md:w-2/3 items-start justify-center md:justify-start max-w-[95vw]">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href;
                    return (
                      <motion.button
                        key={item.href}
                        variants={linkVariants}
                        onClick={() => {
                          scrollToSection(item.href);
                          setIsOpen(false);
                        }}
                        className="group relative w-full md:w-auto py-2.5 md:py-2 flex items-center justify-start gap-2 md:gap-0"
                      >
                        {/* Vertical mark revealed on hover/active */}
                        <span
                          className={`md:hidden h-6 w-0.5 bg-primary transition-all duration-300 origin-left ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"}`}
                        />
                        <span
                          className={`md:hidden font-mono text-xs tracking-widest transition-colors duration-500 ${isActive ? "text-primary" : "text-foreground/30"}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={`relative z-10 text-xl xs:text-2xl sm:text-2xl md:text-5xl lg:text-6xl xl:text-[5rem] font-sans font-black uppercase leading-[1.1] tracking-tighter transition-all duration-500 italic block whitespace-nowrap md:pr-8 text-left ml-2 md:ml-0 ${isActive ? "text-primary" : "text-foreground group-hover:text-primary md:opacity-30"}`}>
                          <span className="relative inline-block">
                            {item.name}
                            {/* Underline effect */}
                            <div className={`absolute -bottom-1 md:-bottom-2 left-0 h-[2px] md:h-[4px] bg-primary transition-all duration-500 ease-out ${isActive ? "w-full" : "w-0"}`} />
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile Controls (Language & Theme) - Only visible when menu is open on small screens */}
                <motion.div
                  variants={linkVariants}
                  className="flex items-center gap-6 mt-8 pt-5 border-t border-primary/10 sm:hidden"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em]">
                    <button
                      onClick={() => handleSetLang("vi")}
                      className={i18n.language === "vi" ? "text-primary" : "text-foreground/40"}
                    >
                      VN
                    </button>
                    <span className="text-foreground/20">/</span>
                    <button
                      onClick={() => handleSetLang("en")}
                      className={i18n.language === "en" ? "text-primary" : "text-foreground/40"}
                    >
                      EN
                    </button>
                  </div>

                  <button
                    onClick={handleToggleDarkMode}
                    aria-label="Toggle theme"
                    className="relative w-12 h-7 rounded-full bg-foreground/10 flex items-center px-1"
                  >
                    <RiSunLine className="absolute left-1.5 w-3.5 h-3.5 text-foreground/30" />
                    <RiMoonLine className="absolute right-1.5 w-3.5 h-3.5 text-foreground/30" />
                    <motion.span
                      className="relative w-5 h-5 rounded-full bg-primary flex items-center justify-center text-background z-10"
                      animate={{ x: darkMode ? 20 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {darkMode ? <RiMoonLine size={12} /> : <RiSunLine size={12} />}
                    </motion.span>
                  </button>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
