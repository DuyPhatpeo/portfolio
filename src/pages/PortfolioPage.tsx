// src/pages/HomePage.tsx
import React, { useEffect } from "react";
import Header from "@components/general/Header";
import Footer from "@components/general/Footer";
import HeroSection from "@features/hero/HeroSetion";
import AboutSection from "@features/about/AboutSection";
import ProjectsSection from "@features/project/ProjectSecion";
import GithubSection from "@features/github/GithubSection";
import Particles from "@components/theme/Particles";

import { useLocation, useNavigate } from "react-router-dom";

const PortfolioPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Portfolio - Dino Péo (Trần Duy Phát)";
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }, [location]);

  // Scroll mượt tới section với offset bù trừ chính xác
  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (id === "about") {
      navigate("/about");
      return;
    }

    if (id === "projects") {
      navigate("/projects");
      return;
    }

    if (id === "contact") {
      navigate("/contact");
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground transition-colors duration-500">
      {/* Header */}
      <Header scrollToSection={scrollToSection} />

      {/* Upper Sections (Layer Z-20 - Scrolls off to reveal Contact beneath) */}
      <div id="upper-content" className="relative z-20 bg-background shadow-2xl">
        {/* Starfield Particles on top of background, behind section items */}
        <Particles quantity={120} zIndex={1} />

        {/* Section items on top of stars */}
        <div className="relative z-10">
          <HeroSection />
          <AboutSection scrollToSection={scrollToSection} />
          <ProjectsSection mode="featured-only" />
          <GithubSection />
        </div>
      </div>

      {/* Contact Section Removed for Separate Page */}
      <div className="sticky bottom-0 z-10 w-full flex flex-col justify-center overflow-hidden bg-background">
        <Particles quantity={60} zIndex={1} />
      </div>

      {/* Footer (Layer Z-20 - Slides up over Contact section like a curtain) */}
      <div className="relative z-20 bg-background border-t border-primary/10 shadow-[0_-25px_60px_rgba(0,0,0,0.6)]">
        <Footer />
      </div>
    </div>
  );
};

export default PortfolioPage;
