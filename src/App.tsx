import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, useTheme } from "./hooks/ThemeProvider";
import Particles from "./components/theme/Particles";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./GlobalStyle.css";

const AppContent: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Particles nền */}
      <Particles quantity={50} />

      {/* Nút toggle dark mode */}
      {/* <DarkModeToggle /> */}

      {/* Nội dung router */}
      <div className="relative z-10">
        <AppRoutes />
      </div>

      {/* Toast */}
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
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
