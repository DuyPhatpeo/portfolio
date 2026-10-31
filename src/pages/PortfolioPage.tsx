import React, { lazy, useCallback, useEffect } from "react";
import Header from "@components/general/Header";
import Footer from "@components/general/Footer";
import SeoHead from "@components/general/SeoHead";
import HeroSection from "@features/hero/HeroSetion";
const AboutSection = lazy(() => import("@features/about/AboutSection"));
const ProjectsSection = lazy(() => import("@features/project/ProjectSecion"));
const FeaturedSkills = lazy(() => import("@features/skills/FeaturedSkills"));
import ContactCTA from "@features/contact/ContactCTA";
import DeferredSection from "@components/general/DeferredSection";

import { useLocation, useNavigate } from "react-router-dom";

const PortfolioPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Smooth scroll to section or navigate to dedicated route
  const scrollToSection = useCallback(
    (id: string) => {
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
    },
    [navigate]
  );

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }, [location, scrollToSection]);

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground transition-colors duration-300">
      <SeoHead page="home" path="/" />
      <Header scrollToSection={scrollToSection} />

      <main id="upper-content" className="relative z-10 flex-1">
        <div className="relative z-10">
          <HeroSection />
          <DeferredSection minHeight={720}>
            <AboutSection scrollToSection={scrollToSection} />
          </DeferredSection>
          <DeferredSection id="skills" minHeight={360}>
            <FeaturedSkills />
          </DeferredSection>
          <DeferredSection minHeight={1400}>
            <ProjectsSection mode="featured-only" />
          </DeferredSection>
        </div>
      </main>

      <ContactCTA />

      <Footer />
    </div>
  );
};

export default PortfolioPage;
