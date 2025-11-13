// src/pages/HomePage.tsx
import React, { useEffect } from "react";
import Header from "../components/general/Header";
import AboutSection from "../components/section/AboutSection";
import HeroSection from "../components/section/HeroSetion";
import SkillsSection from "../components/section/SkillsSection";
import ProjectsSection from "../components/section/ProjectSecion";

const PortfolioPage: React.FC = () => {
  useEffect(() => {
    document.title = "Dino Péo - Portfolio";
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Scroll mượt tới section (bù trừ header sticky)
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -64; // header height ~ 4rem
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Header */}
      <Header scrollToSection={scrollToSection} />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Home Section */}
        <HeroSection scrollToSection={scrollToSection} />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-white/10 relative z-10 backdrop-blur-sm bg-transparent">
        © {new Date().getFullYear()} Dino Péo. Crafted with 🧠 & ⚙️
      </footer>
    </div>
  );
};

export default PortfolioPage;
