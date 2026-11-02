"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TECH } from "@constants/technologies";
import { skills } from "@constants/skillsData";
import { FadeUp } from "@components/ui/FadeUp";
import { useTranslation } from "react-i18next";

const MAIN_SKILLS = [
  TECH.REACT,
  TECH.TS,
  TECH.NEXT_JS,
  TECH.ASTRO,
  TECH.TAILWIND,
  TECH.NODE_JS,
  TECH.DOTNET,
  TECH.LARAVEL,
  TECH.POSTGRESQL,
  TECH.FIREBASE,
  TECH.VITE,
];

// Triple the array for seamless infinite scrolling
const SCROLLING_SKILLS = [...MAIN_SKILLS, ...MAIN_SKILLS, ...MAIN_SKILLS];

const FeaturedSkills: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden bg-transparent border-t border-border/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-10 md:mb-14">
        <FadeUp className="flex items-baseline justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-none">
            {t("skills.title", "Technologies I Work With")}
          </h2>
          <span className="hidden sm:inline-block font-mono text-base text-muted-foreground">
            {t("skills.core_stack", "Core Stack")}
          </span>
        </FadeUp>
      </div>

      <div
        className="relative w-full overflow-hidden flex items-center py-6 sm:py-8 bg-transparent"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max gap-12 md:gap-16 items-center"
          initial={{ x: "0%" }}
          animate={{ x: inView && !reduceMotion ? "-33.333333%" : "0%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {SCROLLING_SKILLS.map((skillName, index) => {
            const skillItem = skills.find((s) => s.name === skillName);

            return (
              <div
                key={`${skillName}-${index}`}
                className="group flex items-center gap-3.5 text-foreground/85 hover:text-foreground transition-colors duration-300 cursor-default"
              >
                <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0">
                  {skillItem?.logo ? (
                    <img
                      src={skillItem.logo}
                      alt={skillName}
                      loading="lazy"
                      className={`w-full h-full object-contain ${
                        skillItem.invertDark ? "dark:invert" : ""
                      }`}
                    />
                  ) : (
                    skillItem?.icon?.({
                      className: "w-full h-full text-foreground",
                    })
                  )}
                </span>
                <span className="font-sans text-xl md:text-3xl font-semibold tracking-tight">
                  {skillName}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSkills;
