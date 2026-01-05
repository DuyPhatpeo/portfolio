import React from "react";
import { heroInfo } from "../../data/heroData";

const HeroAvatar: React.FC = () => {
  const { hero, name } = heroInfo;

  return (
    <div className="flex justify-center md:justify-start">
      <div className="relative w-80 sm:w-96 md:w-[450px] lg:w-[550px] h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px]">
        {/* Image container with oval shape */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{
            borderRadius: "50%",
          }}
        >
          <img
            src={hero}
            alt={name}
            className="
              w-full h-full
              object-cover
              cursor-pointer
              transition-all duration-300 ease-in-out
              hover:scale-105
            "
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
