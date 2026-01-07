import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useThemeStore } from "./stores/themeStore"; // <-- dùng zustand
import Particles from "./components/theme/Particles";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./GlobalStyle.css";
import ScrollToTop from "./components/general/ScrollToTop";

const AppContent: React.FC = () => {
  const { darkMode } = useThemeStore();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="relative min-h-screen bg-transparent">
      <Particles quantity={50} />

      <div className="relative z-10">
        <AppRoutes />
      </div>

      {/* Scroll To Top */}
      <ScrollToTop />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
