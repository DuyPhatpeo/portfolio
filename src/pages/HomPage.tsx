import React, { useEffect } from "react";
import Header from "../components/Header";
import { useTheme } from "../hooks/useTheme";
import ColorPalette from "../components/ColorPalette";
import ToastDemo from "../components/ToastDemo";

const HomePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.title = "Theme Colors | Dino UI Playground";
  }, []);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 bg-transparent text-gray-900 dark:text-gray-100">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex flex-col items-center px-6 py-16 space-y-10 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
          🎨 Dino UI Theme Colors
        </h1>

        {/* Color palette */}
        <ColorPalette />

        {/* Toast buttons */}
        <ToastDemo theme={theme} toggleTheme={toggleTheme} />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 relative z-10">
        © {new Date().getFullYear()} Dino UI Playground. Crafted with 🧠 & ⚙️
      </footer>
    </div>
  );
};

export default HomePage;
