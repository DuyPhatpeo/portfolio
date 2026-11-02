"use client";

import React, { useMemo } from "react";
import { TECH } from "@constants/technologies";
import { FadeUp } from "@components/ui/FadeUp";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useLanguage } from "@components/providers/LanguageProvider";
import LogoLoop, { type LogoItem } from "@components/ui/LogoLoop";
import TechIcon from "@components/ui/TechIcon";

// Core prominent technologies showcased on the Home page
const CORE_SKILLS = [
  TECH.REACT,
  TECH.NEXT_JS,
  TECH.TS,
  TECH.TAILWIND,
  TECH.NODE_JS,
  TECH.LARAVEL,
];

const FeaturedSkills: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const logos: LogoItem[] = useMemo(() => {
    return CORE_SKILLS.map((name) => ({
      node: (
        <TechIcon
          name={name}
          className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain shrink-0"
        />
      ),
      title: name,
      ariaLabel: name,
      hoverColor: "#d9ff3a",
    }));
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-transparent border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-8 md:px-12 mb-6 sm:mb-8 md:mb-12">
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-2.5 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>{t("skills.core_stack", "Core Stack")}</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-tight">
              {t("skills.title", "Technologies I Work With")}
            </h2>
          </div>

          <Link
            href={`/${lang}/about#skills`}
            className="group self-start sm:self-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <span>{t("skills.view_all", "View all technologies")}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </FadeUp>
      </div>

      {/* Official React Bits Infinite Logo Loop - Clean logo & text with zero borders, backgrounds, or shadows */}
      <div className="w-full py-4 sm:py-6">
        <LogoLoop
          logos={logos}
          speed={32}
          direction="left"
          logoHeight={56}
          gap={56}
          labels="inline"
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutWidth={0.12}
        />
      </div>
    </section>
  );
};

export default FeaturedSkills;
