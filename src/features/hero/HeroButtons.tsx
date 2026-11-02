import React from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import SpecularButton from "@components/ui/SpecularButton";

interface HeroButtonsProps {
  scrollToSection?: (sectionId: string) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ scrollToSection }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-4 mt-8">
      {/* Primary Action Button: View My Work */}
      <SpecularButton
        variant="primary"
        size="md"
        onClick={() => (scrollToSection ? scrollToSection("projects") : null)}
        aria-label={t("hero.banner.work", "View My Work")}
        className="group tracking-wide"
      >
        <span>{t("hero.banner.work", "View My Work")}</span>
        <FiArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </SpecularButton>

      {/* Secondary Action Button: About Me */}
      <SpecularButton
        variant="secondary"
        size="md"
        onClick={() => (scrollToSection ? scrollToSection("about") : null)}
        aria-label={t("nav.about", "About Me")}
        className="group tracking-wide"
      >
        <span>{t("nav.about", "About Me")}</span>
        <FiArrowUpRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </SpecularButton>
    </div>
  );
};

export default HeroButtons;
