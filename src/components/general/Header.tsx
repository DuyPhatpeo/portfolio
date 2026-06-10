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
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-all duration-300 group/lang"
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
              className="p-2 text-foreground hover:text-primary transition-colors rounded-full flex items-center justify-center bg-transparent"
            >
              {darkMode ? <RiSunLine className="w-5 h-5" /> : <RiMoonLine className="w-5 h-5" />}
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
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 right-0 h-auto min-h-[58vh] max-h-[100dvh] pb-12 md:pb-24 bg-background/70 backdrop-blur-3xl z-105 flex flex-col overflow-y-auto overflow-x-hidden border-b border-primary/10 shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            >
              {/* Background Decorative Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
                <span className="text-[25vw] font-black leading-none text-foreground/10 uppercase">DINO PÉO</span>
              </div>

              <motion.nav
                variants={containerVariants}
                className="relative z-10 w-full px-6 md:px-32 flex flex-col items-end md:items-start my-auto pt-28 md:pt-24"
              >
                <div className="flex flex-col md:flex-row md:flex-wrap gap-x-8 md:gap-x-16 gap-y-2 md:gap-y-4 w-full md:w-2/3 items-end md:items-start justify-end md:justify-start max-w-[95vw]">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href;
                    return (
                      <motion.button
                        key={item.href}
                        variants={linkVariants}
                        onClick={() => {
                          scrollToSection(item.href);
                          setIsOpen(false);
                        }}
                        className="group relative py-1.5 md:py-2 flex flex-col items-end md:items-start"
                      >
                        <span className={`relative z-10 text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[5rem] font-sans font-black uppercase leading-[1.1] tracking-tighter transition-all duration-500 italic block whitespace-nowrap pl-6 md:pl-0 md:pr-8 text-right md:text-left ${isActive ? "text-primary" : "text-foreground group-hover:text-primary opacity-30"}`}>
                          <span className="relative inline-block">
                            {item.name}
                            {/* Underline effect */}
                            <div className={`absolute -bottom-1 md:-bottom-2 right-0 md:left-0 md:right-auto h-[2px] md:h-[4px] bg-primary transition-all duration-500 ease-out ${isActive ? "w-full" : "w-0"}`} />
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile Controls (Language & Theme) - Only visible when menu is open on small screens */}
                <motion.div
                  variants={linkVariants}
                  className="flex sm:hidden flex-col items-end gap-6 mt-12 border-t border-primary/10 pt-8 w-full"
                >
                  <button
                    onClick={handleToggleLang}
                    className="flex items-center gap-3 group/lang"
                  >
                    <span className="text-sm font-mono font-bold tracking-[0.2em] text-foreground group-hover/lang:text-primary transition-colors">
                      {targetCode}
                    </span>
                    <span className="w-6 h-4 overflow-hidden rounded-sm flex items-center justify-center border border-foreground/10">
                      <img
                        src={targetFlag}
                        alt={targetCode}
                        className="w-full h-full object-cover"
                      />
                    </span>
                  </button>

                  <button
                    onClick={handleToggleDarkMode}
                    className="flex items-center gap-3 group/theme"
                  >
                    <span className="text-sm font-mono font-bold tracking-[0.2em] text-foreground group-hover/theme:text-primary transition-colors uppercase">
                      {darkMode ? t("nav.theme.light", "LIGHT") : t("nav.theme.dark", "DARK")}
                    </span>
                    <div className="text-foreground group-hover/theme:text-primary transition-colors">
                      {darkMode ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
                    </div>
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
