import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  RiMenu3Line,
  RiCloseLine,
  RiMoonLine,
  RiSunLine,
} from "react-icons/ri";
import { useThemeStore } from "../../stores/themeStore";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const { darkMode, toggleDarkMode } = useThemeStore();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const navItems = useMemo(
    () => [
      { name: "HOME", href: "home" },
      { name: "ABOUT", href: "about" },
      { name: "SKILLS", href: "skills" },
      { name: "PROJECTS", href: "projects" },
      { name: "CONTACT", href: "contact" },
    ],
    []
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-2xl border-b ${
        darkMode
          ? "bg-white/5 border-white/10 shadow-lg shadow-black/5"
          : "bg-white/80 border-white/40 shadow-lg shadow-slate-200/50"
      }`}
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
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
              className={`absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg ${
                darkMode ? "bg-primary/50" : "bg-primary-deep/50"
              }`}
            />
            <span
              className={`relative text-3xl font-black tracking-tight transition-transform duration-300 group-hover:scale-105 ${
                darkMode ? "text-primary" : "text-primary-deep"
              }`}
            >
              Dino Péo
            </span>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    setActiveSection(item.href);
                  }}
                  className={`relative px-6 py-3 text-sm font-bold tracking-wide transition-all duration-300 group ${
                    isActive
                      ? darkMode
                        ? "text-primary"
                        : "text-primary-deep"
                      : darkMode
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div
                    className={`absolute inset-0 rounded-lg transition-transform duration-300 ${
                      isActive ? "scale-100" : "scale-0 group-hover:scale-100"
                    } ${darkMode ? "bg-white/10" : "bg-slate-900/5"}`}
                  />
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                      isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                    } ${darkMode ? "bg-primary" : "bg-primary-deep"}`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className={`relative p-3 rounded-xl transition-all duration-300 group ${
                darkMode ? "hover:bg-white/10 " : "hover:bg-slate-900/5 "
              }`}
            >
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md ${
                  darkMode ? "bg-primary/50" : "bg-primary-deep/50"
                }`}
              />
              <div className="relative">
                {darkMode ? (
                  <RiSunLine
                    size={20}
                    className="text-yellow-400 group-hover:rotate-180 transition-transform duration-500"
                  />
                ) : (
                  <RiMoonLine
                    size={20}
                    className="text-primary-deep group-hover:rotate-12 transition-transform duration-300"
                  />
                )}
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button
              ref={toggleRef}
              onClick={() => setIsOpen((prev) => !prev)}
              className={`md:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                darkMode
                  ? "text-white hover:bg-white/10"
                  : "text-slate-900 hover:bg-slate-900/5"
              }`}
            >
              {/* <span>{isOpen ? "CLOSE" : "MENU"}</span> */}
              {isOpen ? <RiCloseLine size={20} /> : <RiMenu3Line size={20} />}
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
                    key={item.name}
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
