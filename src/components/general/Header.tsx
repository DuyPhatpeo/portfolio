import React, { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "../../hooks/ThemeProvider";

const Header: React.FC = () => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Projects", href: "#projects" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2">
            <span
              className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? "text-cyan-400" : "text-blue-600"
              }`}
            >
              My Portfolio
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-200 hover:text-cyan-400"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className={`md:hidden p-2 rounded-full transition-colors duration-200 ${
              darkMode
                ? "text-gray-200 hover:bg-gray-800/30"
                : "text-gray-800 hover:bg-gray-100/50"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-800/30 hover:text-cyan-400"
                  : "text-gray-800 hover:bg-gray-100/50 hover:text-blue-600"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
