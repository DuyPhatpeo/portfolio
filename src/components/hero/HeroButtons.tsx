import React from "react";
import { RiArrowRightLine, RiSendPlane2Line } from "react-icons/ri";
import { IoIosDocument } from "react-icons/io";

interface HeroButtonsProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ scrollToSection }) => {
  return (
    <div className=" flex flex-row flex-nowrap gap-4 justify-center md:justify-start mt-4 md:mt-6 overflow-x-auto md:overflow-visible ">
      {/* 1. View Projects (Primary CTA) */}
      <button
        onClick={() => scrollToSection("projects")}
        className=" shrink-0 group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-white flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-primary-deep shadow-lg hover:shadow-primary/50 overflow-hidden "
      >
        <span className="relative z-10 text-sm sm:text-base">
          View Projects
        </span>
        <RiArrowRightLine className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
      </button>

      {/* 2. Resume */}
      <a
        href="/Tran-Duy-Phat-CV-English.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className=" shrink-0 group px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 border-2 border-primary/40 hover:border-primary text-primary hover:text-white hover:bg-primary/90 backdrop-blur-xl "
      >
        <IoIosDocument className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Resume</span>
      </a>

      {/* 3. Contact (Secondary CTA – NEW STYLE) */}
      <button
        onClick={() => scrollToSection("contact")}
        className=" shrink-0 group px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold flex items-center gap-2 sm:gap-3 transition-all duration-300 border border-primary/40 text-primary bg-transparent hover:bg-primary/10 hover:border-primary hover:text-primary-deep dark:text-primary backdrop-blur-xl "
      >
        <RiSendPlane2Line className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Contact</span>
      </button>
    </div>
  );
};

export default HeroButtons;
