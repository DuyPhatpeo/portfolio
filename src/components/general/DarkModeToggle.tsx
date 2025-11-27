import React from "react";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { useTheme } from "../../hooks/ThemeProvider";

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        fixed bottom-20 right-5 z-50 p-3 rounded-full shadow-lg
        flex items-center justify-center
        transition-colors duration-300
        ${
          darkMode ? "bg-gray-900 text-yellow-400" : "bg-gray-100 text-gray-800"
        }
      `}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <RiSunLine size={24} /> : <RiMoonLine size={24} />}
    </button>
  );
};

export default DarkModeToggle;
