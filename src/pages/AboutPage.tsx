import React, { useEffect } from "react";
import Header from "@components/general/Header";
import Footer from "@components/general/Footer";
import AboutSection from "@features/about/AboutSection";
import WhatIDoSection from "@features/about/WhatIDoSection";
import SkillsSection from "@features/skills/SkillsSection";
import ExperienceSection from "@features/experience/ExperienceSection";

import Particles from "@components/theme/Particles";
import { useNavigate } from "react-router-dom";

import PageHero from "@components/general/PageHero";
import { useTranslation } from "react-i18next";

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Giới thiệu - Dino Péo";
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "about") return;
    if (id === "projects") {
      navigate("/projects");
      return;
    }
    if (id === "contact") {
      navigate("/contact");
      return;
    }
    navigate(`/#${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground transition-colors duration-500">
      <Header scrollToSection={scrollToSection} />
      
      <div className="relative z-20 bg-background shadow-2xl min-h-screen">
        <Particles quantity={120} zIndex={1} />
        <div className="relative z-10">
          <PageHero title1={t("pageHero.about_1", "ABOUT")} title2={t("pageHero.about_2", "ME")} />
          <AboutSection scrollToSection={scrollToSection} />
          <WhatIDoSection />
          <SkillsSection />
          <ExperienceSection />
        </div>
      </div>
      
      <div className="relative z-20 bg-background border-t border-primary/10 shadow-[0_-25px_60px_rgba(0,0,0,0.6)]">
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
