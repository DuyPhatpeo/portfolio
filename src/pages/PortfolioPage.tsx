// src/pages/HomePage.tsx
import React, { lazy, useEffect } from "react";
import Header from "@components/general/Header";
import Footer from "@components/general/Footer";
import HeroSection from "@features/hero/HeroSetion";
const AboutSection = lazy(() => import("@features/about/AboutSection"));
const ProjectsSection = lazy(() => import("@features/project/ProjectSecion"));
const FeaturedSkills = lazy(() => import("@features/skills/FeaturedSkills"));
import ContactCTA from "@features/contact/ContactCTA";
import Particles from "@components/theme/Particles";
import DeferredSection from "@components/general/DeferredSection";

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
      <main id="upper-content" className="relative z-20 bg-background shadow-2xl">
        {/* Starfield Particles on top of background, behind section items */}
        <Particles quantity={120} zIndex={1} />

        {/* Section items on top of stars */}
        <div className="relative z-10">
          <HeroSection />
          <DeferredSection minHeight={800}><AboutSection scrollToSection={scrollToSection} /></DeferredSection>
          {/* You can toggle between these different skill section styles: */}
          <DeferredSection id="skills" minHeight={400}><FeaturedSkills /></DeferredSection>
          <DeferredSection minHeight={1800}><ProjectsSection mode="featured-only" /></DeferredSection>
          </div>
      </main>

      <ContactCTA />

      {/* Footer (Layer Z-20 - Slides up over Contact section like a curtain) */}
      <div className="relative z-20 bg-background border-t border-primary/10 shadow-[0_-25px_60px_rgba(0,0,0,0.6)]">
        <Footer />
      </div>
    </div>
  );
};

export default PortfolioPage;






