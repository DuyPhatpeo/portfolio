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
    <div className="flex flex-col w-full mt-8">
      {/* 1. Resume - Primary Action */}
      <a
        href={profileData.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full py-3 sm:py-4 font-bold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-background bg-primary cyber-chamfer cyber-glow uppercase tracking-[0.2em] overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        <IoIosDocument className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">{t("hero.buttons.resume")}</span>
      </a>
    </div>
  );
};

export default HeroButtons;
