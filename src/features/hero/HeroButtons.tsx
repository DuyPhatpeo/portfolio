import React from "react";
import { RiSendPlane2Line } from "react-icons/ri";
import { IoIosDocument } from "react-icons/io";

interface HeroButtonsProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ scrollToSection }) => {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start mt-8">
      {/* 1. Resume - Primary Action */}
      <a
        href="/Tran-Duy-Phat-CV-English.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative px-6 py-3 sm:px-8 sm:py-4 font-bold flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-tech-bg bg-tech-teal border border-tech-light shadow-[0_0_15px_rgba(68,187,164,0.5)] hover:shadow-[0_0_25px_rgba(68,187,164,0.8)] uppercase tracking-widest overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        {/* Angular cut corners effect via pseudo elements or clip-path (clip path is cleaner) */}
        <div
          className="absolute inset-0 z-[-1] bg-tech-teal"
          style={{
            clipPath:
              "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
          }}
        ></div>
        <IoIosDocument className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Resume</span>
      </a>

      {/* 2. Contact - Secondary Action */}
      <button
        onClick={() => scrollToSection("contact")}
        className="group relative px-6 py-3 sm:px-8 sm:py-4 font-semibold flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-tech-teal border border-tech-teal hover:bg-tech-teal/10 shadow-[inset_0_0_10px_rgba(68,187,164,0.1)] hover:shadow-[0_0_15px_rgba(68,187,164,0.4)] uppercase tracking-widest"
      >
        <RiSendPlane2Line className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
        <span className="text-sm sm:text-base">System Link</span>
      </button>
    </div>
  );
};

export default HeroButtons;
