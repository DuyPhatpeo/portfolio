import React, { useState, useMemo } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/ThemeProvider";

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
  React.useEffect(() => {
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
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

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
          {/* Logo with gradient */}
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

          {/* Desktop nav with animated underline */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    setActiveSection(item.href);
                  }}
                  className={`relative px-4 py-2 text-sm font-bold tracking-wide transition-all duration-300 group ${
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

          {/* Right side with enhanced theme toggle */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle with glow effect */}
            <button
              onClick={toggleDarkMode}
              className={`relative p-3 rounded-xl transition-all duration-300 group border ${
                darkMode
                  ? "hover:bg-white/10 border-white/20"
                  : "hover:bg-slate-900/5 border-slate-300/50"
              }`}
            >
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md ${
                  darkMode ? "bg-primary/50" : "bg-primary-deep/50"
                }`}
              />
              <div className="relative">
                {darkMode ? (
                  <Sun
                    size={20}
                    className="text-warning group-hover:rotate-180 transition-transform duration-500"
                  />
                ) : (
                  <Moon
                    size={20}
                    className="text-primary-deep group-hover:rotate-12 transition-transform duration-300"
                  />
                )}
              </div>
            </button>

            {/* Mobile menu toggle with glassmorphism */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border ${
                darkMode
                  ? "text-white hover:bg-white/10 border-white/20"
                  : "text-slate-900 hover:bg-slate-900/5 border-slate-300/50"
              }`}
            >
              <span>{isOpen ? "CLOSE" : "MENU"}</span>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Mobile Menu - Full Width */}
      <div
        className={`md:hidden fixed left-0 right-0 top-20 overflow-hidden transition-all duration-500 ease-out backdrop-blur-3xl border-b ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${
          darkMode
            ? "bg-slate-900/95 border-white/10 shadow-2xl shadow-black/50"
            : "bg-white/95 border-slate-200/50 shadow-2xl shadow-slate-300/50"
        }`}
        style={{
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full opacity-20 blur-3xl pointer-events-none ${
            darkMode ? "bg-primary/70" : "bg-primary-deep/70"
          }`}
        />

        {/* Menu items with staggered animation - Aligned Right */}
        <nav className="relative flex flex-col items-end p-6 pr-8">
          {navItems.map((item, i) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.name}
                onClick={() => {
                  scrollToSection(item.href);
                  setActiveSection(item.href);
                  setIsOpen(false);
                }}
                className={`group relative text-right px-6 py-3 text-xl font-bold transition-all duration-300 rounded-xl backdrop-blur-sm ${
                  isActive
                    ? darkMode
                      ? "text-primary"
                      : "text-primary-deep"
                    : darkMode
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={{
                  transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                  transform: isOpen ? "translateY(0)" : "translateY(-20px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div
                  className={`absolute inset-0 rounded-xl transition-transform duration-300 ${
                    isActive ? "scale-100" : "scale-0 group-hover:scale-100"
                  } ${darkMode ? "bg-white/10" : "bg-white/10"}`}
                />
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all duration-300 ${
                    isActive ? "h-3/4" : "h-0 group-hover:h-3/4"
                  } ${darkMode ? "bg-primary" : "bg-primary-deep"}`}
                />
                <span className="relative z-10">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
