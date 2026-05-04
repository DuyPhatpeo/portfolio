import React from "react";
import SkillsGrid from "./SkillsGrid";
import { useTranslation } from "react-i18next";

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      {/* Refined Cyber Mist Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Base Gradient - Soft Green Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--primary)_0%,transparent_80%)] opacity-[0.05]" />

        {/* Cloudy Volumetric Layers */}
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/15 blur-[120px] rounded-full mix-blend-screen opacity-40 animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full mix-blend-screen opacity-30" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full mix-blend-screen opacity-20" />

        {/* Technological Texture */}
        <div className="absolute inset-0 cyber-lines opacity-[0.03]" />
        <div className="absolute inset-0 cyber-noise opacity-[0.04] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
          {t("skills.subtitle")}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none mb-6">
          {t("skills.title")}
        </h2>
        <p className="max-w-2xl text-foreground/90 text-base md:text-lg font-mono">
          {t("skills.description")}
        </p>
      </div>
      <SkillsGrid />
    </section>
  );
};

export default SkillsSection;
