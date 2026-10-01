import React from "react";
import { motion } from "framer-motion";
import { TECH, TECH_ICONS } from "@constants/technologies";
import { FadeUp } from "@components/ui/FadeUp";
import { useTranslation } from "react-i18next";

const MAIN_SKILLS = [
  TECH.REACT,
  TECH.TS,
  TECH.NEXT_JS,
  TECH.TAILWIND,
  TECH.NODE_JS,
  TECH.REACT_NATIVE,
  TECH.LARAVEL,
  TECH.FIGMA,
];

// Double the array for seamless infinite scrolling
const SCROLLING_SKILLS = [...MAIN_SKILLS, ...MAIN_SKILLS, ...MAIN_SKILLS];

const FeaturedSkills: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-12 md:mb-20 text-center">
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none">
            {t("nav.skills", "MAIN SKILLS")}
          </h2>
        </FadeUp>
      </div>

      <div className="relative w-full overflow-hidden flex items-center py-10 bg-card/10 border-y border-white/5 backdrop-blur-sm" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        {/* Left/Right Gradient Fades */}

        <motion.div
          className="flex w-max gap-12 md:gap-24 items-center"
          initial={{ x: "0%" }}
          animate={{ x: "-33.333333%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {SCROLLING_SKILLS.map((skill, index) => {
            const Icon = TECH_ICONS[skill];
            return (
              <div
                key={`${skill}-${index}`}
                className="flex items-center gap-4 text-foreground/40 hover:text-primary transition-colors duration-500 cursor-default grayscale hover:grayscale-0"
              >
                {Icon && <Icon className="w-10 h-10 md:w-16 md:h-16" />}
                <span className="font-mono text-2xl md:text-4xl font-bold uppercase tracking-widest">
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

