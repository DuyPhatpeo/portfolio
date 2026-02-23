import React from "react";
import { heroInfo } from "../../data/heroData";

const HeroAvatar: React.FC = () => {
  const { hero, name } = heroInfo;

  return (
    <div className="flex justify-center md:justify-start mt-20 md:mt-0">
      <div className="relative w-80 sm:w-96 md:w-[450px] lg:w-[550px] h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px]">
        {/* Glow behind image */}
        <div className="absolute inset-4 bg-tech-teal opacity-20 blur-2xl rounded-full"></div>
        {/* Geometric container */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden border-2 border-tech-teal shadow-[0_0_30px_rgba(68,187,164,0.3)] bg-tech-bg/50 backdrop-blur-sm"
          style={{
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          }}
        >
          <img
            src={hero}
            alt={name}
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            style={{
              objectPosition: "center 20%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroAvatar;
