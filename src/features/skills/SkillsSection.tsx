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
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-border/50">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-primary tracking-widest uppercase">
              // TECH STACK & TOOLKIT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
              {t("skills.title")}
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
            {t("skills.description")}
          </p>
        </FadeUp>
      </div>
      <SkillsGrid />
    </section>
  );
};

export default SkillsSection;
