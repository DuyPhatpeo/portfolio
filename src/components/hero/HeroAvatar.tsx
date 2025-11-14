import React from "react";
import { heroInfo } from "../../data/heroData";

const HeroAvatar: React.FC = () => {
  const { avatar, name } = heroInfo;
  return (
    <div className="flex justify-center md:justify-end mt-5 md:mt-0 order-1 md:order-2">
      <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform duration-500">
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 hover:opacity-60 transition-opacity duration-500" />
      </div>
    </div>
  );
};

export default HeroAvatar;
