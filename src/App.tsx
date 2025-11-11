// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Particles from "./components/theme/Particles";
import DarkModeToggle from "./components/DarkModeToggle";
import AppRoutes from "./routes/AppRoutes";
import "./GlobalStyle.css";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        {/* Nền particles full màn hình */}
        <div className="w-screen h-screen relative overflow-hidden">
          <Particles quantity={120} />

          {/* Nút toggle */}
          <div className="absolute top-5 right-5 z-20">
            <DarkModeToggle />
          </div>

          {/* Nội dung router */}
          <div className="absolute inset-0 z-10">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
