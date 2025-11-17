import React from "react";
import { ArrowRight, Send } from "lucide-react";

interface HeroButtonsProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ scrollToSection }) => (
  <div className="flex flex-row gap-4 justify-center md:justify-start mt-4 md:mt-6">
    <button
      onClick={() => scrollToSection("projects")}
      className="w-auto group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-white
                 transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 justify-center overflow-hidden
                 bg-gradient-to-r from-primary to-primary-deep shadow-lg hover:shadow-primary/50"
    >
      <span className="relative z-10 text-sm sm:text-base">View Projects</span>
      <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
    </button>

    <button
      onClick={() => scrollToSection("contact")}
      className="w-auto group px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold backdrop-blur-sm border
                 transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 justify-center
                 text-gray-700 dark:text-gray-200 bg-white/10 border-gray-200/20 dark:bg-gray-800/30 dark:border-white/10
                 hover:bg-white/20 dark:hover:bg-gray-700/30 hover:border-primary/30"
    >
      <Send className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
      <span className="text-sm sm:text-base">Contact</span>
    </button>
  </div>
);

export default HeroButtons;
