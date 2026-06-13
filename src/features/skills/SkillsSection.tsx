import React from "react";
import SkillsGrid from "./SkillsGrid";
import { useTranslation } from "react-i18next";

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-16">
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
