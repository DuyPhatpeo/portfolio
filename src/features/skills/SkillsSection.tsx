import React from "react";
import SkillsGrid from "./SkillsGrid";
import SectionHeader from "../../components/ui/SectionHeader";
import { useTranslation } from "react-i18next";

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background border-y border-primary/10">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("skills.title")} />
        <SkillsGrid />
      </div>
    </section>
  );
};

export default SkillsSection;
