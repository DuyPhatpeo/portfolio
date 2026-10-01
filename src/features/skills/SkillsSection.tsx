import React from "react";
import SkillsGrid from "./SkillsGrid";
import { useTranslation } from "react-i18next";
import { FadeUp } from "@components/ui/FadeUp";

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-12 md:py-16 relative overflow-hidden bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-8 md:mb-12">
        <FadeUp>
          {/* Centered split-line header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 sm:gap-6 w-full mb-4 sm:mb-6">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none whitespace-nowrap">
                {t("skills.title")}
              </h2>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
            </div>
          </div>
        </FadeUp>
      </div>
      <SkillsGrid />
    </section>
  );
};

export default SkillsSection;
