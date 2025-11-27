import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";

interface ScrollIndicatorProps {
  scrollToSection: (sectionId: string) => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  scrollToSection,
}) => (
  <div
    className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group z-[60]"
    onClick={() => scrollToSection("about")}
  >
    <div className="flex flex-col items-center gap-1.5 md:gap-2 animate-bounce">
      <span
        className="text-[9px] sm:text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400
                       group-hover:text-primary transition-colors"
      >
        Scroll
      </span>
      <div
        className="p-2 rounded-full backdrop-blur-sm border bg-white/10 border-gray-200/20
                      dark:bg-gray-800/30 dark:border-white/10 group-hover:border-primary/30"
      >
        <RiArrowDownSLine
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500
                               group-hover:text-primary transition-colors"
        />
      </div>
    </div>
  </div>
);

export default ScrollIndicator;
