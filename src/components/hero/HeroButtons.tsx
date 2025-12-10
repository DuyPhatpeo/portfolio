import React from "react";
import { RiArrowRightLine, RiSendPlane2Line } from "react-icons/ri";

interface HeroButtonsProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ scrollToSection }) => (
  <div className="flex flex-row gap-4 justify-center md:justify-start mt-4 md:mt-6">
    {/* View Projects */}
    <button
      onClick={() => scrollToSection("projects")}
      className="w-auto group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-white
                 transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 justify-center overflow-hidden
                 bg-gradient-to-r from-primary to-primary-deep shadow-lg hover:shadow-primary/50"
    >
      <span className="relative z-10 text-sm sm:text-base">View Projects</span>
      <RiArrowRightLine className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
    </button>

    {/* Contact */}
    <button
      onClick={() => scrollToSection("contact")}
      className="
    w-auto group px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold
    flex items-center gap-2 sm:gap-3 justify-center
    transition-all duration-300 hover:scale-105 hover:border-primary

    bg-white/10 dark:bg-neutral-900/10
    backdrop-blur-xl
    border border-white/20 dark:border-neutral-700/20
    shadow-md shadow-black/10 dark:shadow-white/5

    text-gray-900 dark:text-gray-100
  "
    >
      <RiSendPlane2Line className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-sm sm:text-base">Contact</span>
    </button>
  </div>
);

export default HeroButtons;
