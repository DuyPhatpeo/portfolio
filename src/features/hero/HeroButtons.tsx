import React from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";

interface HeroButtonsProps {
  scrollToSection?: (sectionId: string) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ scrollToSection }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-4 mt-8">
      {/* Primary Action Button: View My Work */}
      <button
        onClick={() => scrollToSection ? scrollToSection("projects") : null}
        className="hero-btn-primary group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        aria-label={t("hero.banner.work", "View My Work")}
      >
        <span>{t("hero.banner.work", "View My Work")}</span>
        <FiArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      {/* Secondary Action Button: About Me */}
      <button
        onClick={() => scrollToSection ? scrollToSection("about") : null}
        className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-card/60 backdrop-blur-sm border border-primary/40 hover:border-primary text-foreground font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 cursor-pointer"
        aria-label={t("nav.about", "About Me")}
      >
        <span>{t("nav.about", "About Me")}</span>
        <FiArrowUpRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};

export default HeroButtons;
