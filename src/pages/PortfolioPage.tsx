// src/pages/HomePage.tsx
import React, { useEffect } from "react";
import Header from "../components/general/Header";

import Footer from "../components/general/Footer";
import HeroSection from "../components/hero/HeroSetion";
import AboutSection from "../components/about/AboutSection";
import SkillsSection from "../components/skills/SkillsSection";
import ProjectsSection from "../components/project/ProjectSecion";

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
        <HeroSection scrollToSection={scrollToSection} />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PortfolioPage;
