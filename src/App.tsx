import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useThemeStore } from "./stores/themeStore";
import Particles from "./components/theme/Particles";

import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/tokens/variables.css";
import "./styles/main.css";
import "./styles/base/reset.css";
import ScrollToTop from "./components/general/ScrollToTop";
import ClickSpark from "./components/general/ClickSpark";

const AppContent: React.FC = () => {
  const { darkMode } = useThemeStore();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="relative min-h-screen bg-transparent">


      {/* Background */}
      <Particles quantity={50} />

      {/* Click Spark wrapper */}
      <ClickSpark
        sparkColor={darkMode ? "#fff" : "#000"}
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className="relative z-10">
          <AppRoutes />

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
      </ClickSpark>
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
