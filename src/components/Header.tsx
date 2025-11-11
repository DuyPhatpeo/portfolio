import React, { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { name: "Trang chủ", href: "#" },
      { name: "Sản phẩm", href: "#" },
      { name: "Dịch vụ", href: "#" },
      { name: "Liên hệ", href: "#" },
    ],
    []
  );

  return (
    <header
      className="
        bg-neutral dark:bg-neutral
        shadow-md dark:shadow-gray-800/50
        sticky top-0 z-50
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* === Logo === */}
          <a href="#" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-deep dark:text-primary">
              Dino App
            </span>
          </a>

          {/* === Desktop Menu === */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="
                  text-gray-600 dark:text-gray-300 
                  hover:text-primary-deep dark:hover:text-primary 
                  font-medium text-base 
                  transition-colors duration-200
                "
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* === Mobile Menu Toggle === */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="
              md:hidden p-2 rounded-full
              text-gray-600 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors duration-200
            "
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* === Mobile Menu === */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
          ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
          bg-neutral dark:bg-gray-900 border-t dark:border-gray-700
        `}
      >
        <div className="px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="
                block px-3 py-2 rounded-md text-base font-medium
                text-gray-700 dark:text-gray-200
                hover:bg-primary-subtle dark:hover:bg-gray-800
                hover:text-primary-deep dark:hover:text-primary
                transition-colors duration-200
              "
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
