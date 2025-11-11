import React from "react";
import { useTheme } from "./ThemeProvider";

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        px-4 py-2 rounded-lg font-bold shadow-md
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
      `}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
