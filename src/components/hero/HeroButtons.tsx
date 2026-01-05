import React from "react";
import { RiSendPlane2Line } from "react-icons/ri";
import { IoIosDocument } from "react-icons/io";

interface HeroButtonsProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ scrollToSection }) => {
  return (
    <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start mt-6">
      {/* 1. Resume - Primary Action */}
      <a
        href="/Tran-Duy-Phat-CV-English.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-primary/30 hover:border-primary text-primary hover:text-white hover:bg-primary bg-white/50 dark:bg-gray-800/50 dark:border-primary/40 dark:hover:bg-primary dark:text-primary-light backdrop-blur-sm shadow-sm hover:shadow-lg"
      >
        <IoIosDocument className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Resume</span>
      </a>

      {/* 2. Contact - Secondary Action */}
      <button
        onClick={() => scrollToSection("contact")}
        className="group px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-semibold flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-300 hover:border-primary text-gray-700 hover:text-primary bg-white/70 hover:bg-primary/5 dark:bg-gray-800/70 dark:border-gray-600 dark:hover:border-primary dark:text-gray-300 dark:hover:text-primary-light dark:hover:bg-primary/10 backdrop-blur-sm shadow-sm"
      >
        <RiSendPlane2Line className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Contact</span>
      </button>
    </div>
  );
};

export default HeroButtons;
