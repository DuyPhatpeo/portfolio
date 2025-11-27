import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useThemeStore } from "./stores/themeStore"; // <-- dùng zustand
import Particles from "./components/theme/Particles";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./GlobalStyle.css";

const AppContent: React.FC = () => {
  const { darkMode } = useThemeStore();

  // Đồng bộ theme khi load trang (nếu dùng persist)
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
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
