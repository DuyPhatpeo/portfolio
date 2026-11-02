"use client";

import React, { useEffect } from "react";
import SeoHead from "@components/general/SeoHead";
import AboutSection from "@features/about/AboutSection";
import WhatIDoSection from "@features/about/WhatIDoSection";
import SkillsSection from "@features/skills/SkillsSection";
import ExperienceSection from "@features/experience/ExperienceSection";
import ContactCTA from "@features/contact/ContactCTA";
import PageHero from "@components/general/PageHero";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground transition-colors duration-300">
      <SeoHead page="about" path="/about" />

      <main className="relative z-10 flex-1 min-h-screen">
        <div className="relative z-10">
          <PageHero
            title1={t("pageHero.about_1", "About")}
            title2={t("pageHero.about_2", "Me")}
            indexLabel="01"
          />
          <AboutSection scrollToSection={scrollToSection} />
          <WhatIDoSection />
          <SkillsSection />
          <ExperienceSection />
        </div>
      </main>

      <ContactCTA />
    </div>
  );
}
