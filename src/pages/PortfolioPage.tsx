// src/pages/HomePage.tsx
import React, { useEffect } from "react";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import HeroSection from "../features/hero/HeroSetion";
import AboutSection from "../features/about/AboutSection";
import SkillsSection from "../features/skills/SkillsSection";
import ProjectsSection from "../features/project/ProjectSecion";
import ExperienceSection from "../features/experience/ExperienceSection";
import ContactSection from "../features/contact/ContactSection";
import ScrollProgressBar from "../components/ui/ScrollProgressBar";

const PortfolioPage: React.FC = () => {
  useEffect(() => {
    document.title = "Dino Péo (Trần Duy Phát) - Frontend Developer Portfolio";
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Scroll mượt tới section với offset bù trừ chính xác
  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (id === "contact") {
      const upperEl = document.getElementById("upper-content");
      if (upperEl) {
        window.scrollTo({
          top: upperEl.offsetHeight,
          behavior: "smooth",
        });
      } else {
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
        }
      }
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const navbarOffset = 70;
      const y = el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground transition-colors duration-500">
      {/* Real-time Cyber Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Header */}
      <Header scrollToSection={scrollToSection} />

      {/* Upper Sections (Layer Z-20 - Scrolls off to reveal Contact beneath) */}
      <div id="upper-content" className="relative z-20 bg-background shadow-2xl">
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
      </div>

      {/* Contact Section (Layer Z-10 - Sticky behind upper content and footer) */}
      <div className="sticky bottom-0 z-10 w-full min-h-screen flex flex-col justify-center overflow-hidden">
        <ContactSection />
      </div>

      {/* Footer (Layer Z-20 - Slides up over Contact section like a curtain) */}
      <div className="relative z-20 bg-background border-t border-primary/10 shadow-[0_-25px_60px_rgba(0,0,0,0.6)]">
        <Footer />
      </div>
    </div>
  );
};

export default PortfolioPage;
