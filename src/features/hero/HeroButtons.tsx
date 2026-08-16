import React from "react";
import { IoIosDocument } from "react-icons/io";
import { useTranslation } from "react-i18next";

import { profileData } from "../../constants/profileData";

interface HeroButtonsProps { }

const HeroButtons: React.FC<HeroButtonsProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full mt-8">
      {/* 1. Resume - Primary Action */}
      <a
        href={profileData.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full py-3 sm:py-4 font-bold flex items-center justify-center gap-2 sm:gap-3 bg-primary text-background uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:bg-primary/90 rounded-md"
      >
        <IoIosDocument className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">{t("hero.buttons.resume")}</span>
      </a>
    </div>
  );
};

export default HeroButtons;
