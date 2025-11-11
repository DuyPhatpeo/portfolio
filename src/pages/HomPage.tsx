import React, { useEffect } from "react";
import Header from "../components/Header";
import { useTheme } from "../hooks/useTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ColorPalette from "../components/ColorPalette";
import ToastDemo from "../components/ToastDemo";

const HomePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.title = "Theme Colors | Dino UI Playground";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral dark:bg-neutral text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* ✅ Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme={theme === "dark" ? "dark" : "light"}
      />

      <Header />

      <main className="flex flex-col items-center px-6 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center">
          🎨 Dino UI Theme Colors
        </h1>

        {/* Bảng màu */}
        <ColorPalette />

        {/* Các nút thao tác Toast */}
        <ToastDemo theme={theme} toggleTheme={toggleTheme} />
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} Dino UI Playground. Crafted with 🧠 & ⚙️
      </footer>
    </div>
  );
};

export default HomePage;
