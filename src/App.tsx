import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useThemeStore } from "@stores/themeStore";
import DarkModeAnimation from "@components/theme/DarkModeAnimation";
import Particles from "@components/theme/Particles";

import AppRoutes from "@routes/AppRoutes";
import "@styles/tokens/variables.css";
import "@styles/main.css";
import "@styles/base/reset.css";
import ScrollToTop from "@components/general/ScrollToTop";
import ClickSpark from "@components/general/ClickSpark";

const AppContent: React.FC = () => {
  const { darkMode } = useThemeStore();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Persistent Cosmic Starfield Layer */}
      <Particles quantity={195} zIndex={1} />

      {/* Dark Mode Circular Transition Wipe */}
      <DarkModeAnimation isDark={darkMode} />

      {/* Click Spark Wrapper */}
      <ClickSpark
        sparkColor={darkMode ? "#ffffff" : "#18181b"}
        sparkSize={9}
        sparkRadius={15}
        sparkCount={8}
        duration={380}
      >
        <div id="app-content-root" className="relative z-10">
          <AppRoutes />
          <ScrollToTop />
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
