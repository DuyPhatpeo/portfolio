import React from "react";
import { RiSendPlane2Line } from "react-icons/ri";
import { IoIosDocument } from "react-icons/io";
import { useTranslation } from "react-i18next";

import { profileData } from "../../constants/profileData";

interface HeroButtonsProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ scrollToSection }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start mt-8">
      {/* 1. Resume - Primary Action */}
      <a
        href={profileData.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative px-6 py-3 sm:px-8 sm:py-4 font-bold flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-background bg-primary cyber-chamfer cyber-glow uppercase tracking-[0.2em] overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        <IoIosDocument className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">{t("hero.buttons.resume")}</span>
      </a>

      {/* 2. Contact - Secondary Action */}
      <button
        onClick={() => scrollToSection("contact")}
        className="group relative px-6 py-3 sm:px-8 sm:py-4 font-semibold flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-primary border border-primary hover:bg-primary/10 cyber-chamfer hover:cyber-glow uppercase tracking-[0.2em]"
      >
        <RiSendPlane2Line className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
        <span className="text-sm sm:text-base">{t("hero.buttons.connect")}</span>
      </button>
    </div>
  );
};

export default HeroButtons;
