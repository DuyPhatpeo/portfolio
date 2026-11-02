"use client";

import React, { lazy } from "react";
import SeoHead from "@components/general/SeoHead";
import HeroSection from "@features/hero/HeroSetion";
const AboutSection = lazy(() => import("@features/about/AboutSection"));
const ProjectsSection = lazy(() => import("@features/project/ProjectSecion"));
const FeaturedSkills = lazy(() => import("@features/skills/FeaturedSkills"));
import ContactCTA from "@features/contact/ContactCTA";
import DeferredSection from "@components/general/DeferredSection";

export default function HomePage() {
  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground transition-colors duration-300">
      <SeoHead page="home" path="/" />

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
    </div>
  );
}
