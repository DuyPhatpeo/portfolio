import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TECH, TECH_ICONS } from "@constants/technologies";
import { FadeUp } from "@components/ui/FadeUp";
import { useTranslation } from "react-i18next";

const MAIN_SKILLS = [
  TECH.REACT,
  TECH.TS,
  TECH.NEXT_JS,
  TECH.TAILWIND,
  TECH.NODE_JS,
  TECH.LARAVEL,
];

// Triple the array for seamless infinite scrolling
const SCROLLING_SKILLS = [...MAIN_SKILLS, ...MAIN_SKILLS, ...MAIN_SKILLS];

const SKILL_COLORS: Record<string, string> = {
  [TECH.REACT]: "hover:text-[#61DAFB]",
  [TECH.TS]: "hover:text-[#3178C6]",
  [TECH.NEXT_JS]: "hover:text-foreground",
  [TECH.TAILWIND]: "hover:text-[#06B6D4]",
  [TECH.NODE_JS]: "hover:text-[#339933]",
  [TECH.LARAVEL]: "hover:text-[#FF2D20]",
};

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
        className="relative w-full overflow-hidden flex items-center py-8 bg-card/50 border-y border-border"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max gap-12 md:gap-20 items-center"
          initial={{ x: "0%" }}
          animate={{ x: inView && !reduceMotion ? "-33.333333%" : "0%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
        >
          {SCROLLING_SKILLS.map((skill, index) => {
            const Icon = TECH_ICONS[skill];
            const hoverColorClass =
              SKILL_COLORS[skill] || "hover:text-primary";

            return (
              <div
                key={`${skill}-${index}`}
                className={`flex items-center gap-3.5 text-muted-foreground transition-colors duration-300 cursor-default ${hoverColorClass}`}
              >
                {Icon && (
                  <Icon
                    aria-hidden="true"
                    focusable="false"
                    className="w-8 h-8 md:w-11 md:h-11"
                  />
                )}
                <span className="font-sans text-xl md:text-3xl font-semibold tracking-tight">
                  {skill}
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
