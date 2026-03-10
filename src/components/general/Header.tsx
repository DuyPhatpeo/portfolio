import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  RiMenu3Line,
  RiCloseLine,
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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langToggleRef = useRef<HTMLButtonElement>(null);

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

      if (
        langMenuRef.current &&
        langToggleRef.current &&
        !langMenuRef.current.contains(event.target as Node) &&
        !langToggleRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };

    if (isOpen || isLangOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isLangOpen]);

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
      className={`fixed top-3 left-4 right-4 z-50 transition-all duration-300`}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Cyberpunk Background with Chamfer */}
        <div
          className="absolute inset-0 border border-primary/20 bg-card/85 shadow-[0_8px_32px_rgba(0,0,0,0.5)] cyber-chamfer -z-10"
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        />
        <div className="flex justify-between items-center h-16 px-5 sm:px-6">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="group flex items-center space-x-3 relative"
          >
            {/* Pulsing background glow */}
            <div
              className={`absolute -inset-2 opacity-70 transition-opacity duration-300 blur-lg bg-primary/30 animate-pulse`}
            />
            <span
              className={`relative text-2xl md:text-3xl font-sans font-black uppercase tracking-widest transition-transform duration-300 scale-105 text-foreground drop-shadow-[0_0_12px_rgba(0,255,136,0.9)]`}
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
                  className={`relative px-4 py-2 mx-1 text-sm font-mono font-bold tracking-widest transition-all duration-300 group uppercase ${isActive
                    ? "text-primary drop-shadow-[0_0_5px_rgba(0,255,136,0.8)]"
                    : "text-foreground/60 hover:text-foreground"
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Hover background block */}
                  <div
                    className={`absolute inset-0 border border-primary/0 group-hover:border-primary/50 transition-all duration-300 bg-primary/5 scale-y-0 group-hover:scale-y-100 origin-bottom cyber-chamfer`}
                  />
                  {/* Active bottom line */}
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${isActive
                      ? "w-full shadow-[0_0_10px_rgba(0,255,136,1)]"
                      : "w-0 group-hover:w-full"
                      }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Language Dropdown */}
            <div className="relative group">
              <button
                ref={langToggleRef}
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`relative p-2 md:p-3 transition-all duration-300 overflow-hidden border border-primary/30 hover:border-primary ${isLangOpen ? "border-primary cyber-glow" : ""} bg-card/50 shadow-[0_0_10px_rgba(0,255,136,0.1)] flex items-center justify-center gap-2 min-w-[70px] cyber-chamfer`}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${isLangOpen ? "opacity-100" : ""} transition-opacity duration-300 blur-md bg-primary/20`}
                />
                <div className="relative text-primary flex items-center gap-2">
                  <img
                    src={
                      i18n.language === "vi"
                        ? "https://flagcdn.com/vn.svg"
                        : "https://flagcdn.com/gb.svg"
                    }
                    alt={i18n.language}
                    className="w-5 h-auto object-cover rounded-none"
                  />
                  <span className="text-sm font-mono font-bold tracking-widest pointer-events-none">
                    {i18n.language.toUpperCase()}
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    ref={langMenuRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[110%] right-0 mt-2 w-28 bg-card/95 backdrop-blur-xl border border-primary/30 shadow-[0_0_20px_rgba(0,255,136,0.3)] z-50 flex flex-col cyber-chamfer"
                  >
                    <button
                      onClick={() => {
                        i18n.changeLanguage("vi");
                        localStorage.setItem("language", "vi");
                        setIsLangOpen(false);
                      }}
                      className={`px-4 py-3 flex items-center gap-3 text-left hover:bg-primary/20 text-sm font-mono font-bold tracking-widest transition-colors ${i18n.language === "vi"
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary"
                        }`}
                    >
                      <img
                        src="https://flagcdn.com/vn.svg"
                        alt="VI"
                        className="w-5 h-auto object-cover rounded-none"
                      />{" "}
                      VI
                    </button>
                    <div className="w-full h-px bg-primary/20" />
                    <button
                      onClick={() => {
                        i18n.changeLanguage("en");
                        localStorage.setItem("language", "en");
                        setIsLangOpen(false);
                      }}
                      className={`px-4 py-3 flex items-center gap-3 text-left hover:bg-primary/20 text-sm font-mono font-bold tracking-widest transition-colors ${i18n.language === "en"
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary"
                        }`}
                    >
                      <img
                        src="https://flagcdn.com/gb.svg"
                        alt="EN"
                        className="w-5 h-auto object-cover rounded-none"
                      />{" "}
                      EN
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className={`relative p-2 md:p-3 transition-all duration-300 group overflow-hidden border border-primary/30 hover:border-primary bg-card/50 shadow-[0_0_10px_rgba(0,255,136,0.1)] hover:cyber-glow hidden md:block cyber-chamfer`}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-primary/20`}
              />
              <div className="relative text-primary">
                {darkMode ? (
                  <RiMoonLine
                    size={20}
                    className="group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_5px_rgba(0,255,136,0.8)]"
                  />
                ) : (
                  <RiSunLine
                    size={20}
                    className="text-foreground group-hover:rotate-180 transition-transform duration-500"
                  />
                )}
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button
              ref={toggleRef}
              onClick={() => setIsOpen((prev) => !prev)}
              className={`md:hidden flex items-center gap-2 px-3 py-2 text-sm font-mono font-bold uppercase tracking-widest transition-all duration-300 border border-primary/50 hover:bg-primary/10 text-foreground shadow-[inset_0_0_10px_rgba(0,255,136,0.1)] cyber-chamfer`}
            >
              {isOpen ? (
                <RiCloseLine
                  size={24}
                  className="text-primary drop-shadow-[0_0_5px_rgba(0,255,136,0.8)]"
                />
              ) : (
                <RiMenu3Line
                  size={24}
                  className="text-primary drop-shadow-[0_0_5px_rgba(0,255,136,0.8)]"
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
            className={`md:hidden absolute left-0 right-0 top-18 bg-card/95 backdrop-blur-xl border border-primary/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-40 overflow-hidden cyber-chamfer`}
          >
            {/* Background glow */}
            <div
              className={`absolute top-0 right-0 w-1/2 h-full opacity-10 blur-3xl pointer-events-none bg-primary`}
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
                    className={`group relative text-right px-8 py-4 text-xl font-mono font-bold uppercase tracking-widest transition-all duration-300 ${isActive
                      ? "text-primary drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]"
                      : "text-foreground/70 hover:text-foreground"
                      }`}
                  >
                    <div
                      className={`absolute inset-0 transition-transform duration-300 bg-primary/5 ${isActive ? "scale-100" : "scale-0 group-hover:scale-100"
                        } cyber-chamfer`}
                    />
                    <div
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-[3px] transition-all duration-300 bg-primary shadow-[0_0_8px_rgba(0,255,136,0.8)] ${isActive ? "h-3/4" : "h-0 group-hover:h-3/4"
                        }`}
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
                className={`group relative text-right px-8 py-4 text-xl font-mono font-bold uppercase tracking-widest flex items-center justify-end gap-3 transition-all duration-300 text-foreground/70 hover:text-foreground`}
              >
                <div
                  className={`absolute inset-0 transition-transform duration-300 bg-primary/5 scale-0 group-hover:scale-100 cyber-chamfer`}
                />
                <span className="relative z-10">
                  {darkMode ? "LIGHT MODE" : "DARK MODE"}
                </span>
                <div className="relative z-10 text-primary drop-shadow-[0_0_5px_rgba(0,255,136,0.8)]">
                  {darkMode ? (
                    <RiSunLine size={24} />
                  ) : (
                    <RiMoonLine size={24} />
                  )}
                </div>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
