"use client";

import React from "react";
import SkillsGrid from "./SkillsGrid";
import { useTranslation } from "react-i18next";
import { FadeUp } from "@components/ui/FadeUp";

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="py-20 md:py-28 relative overflow-hidden bg-transparent border-t border-border/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-10 sm:mb-14">
        <FadeUp className="flex flex-col items-start gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>{t("skills.eyebrow", "TECH ARSENAL")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
            {t("skills.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mt-1">
            {t("skills.description")}
          </p>
        </FadeUp>
      </div>
      <SkillsGrid />
    </section>
  );
};

export default SkillsSection;
