import React from "react";
import { motion } from "framer-motion";
import { profileData } from "../../constants/profileData";

const HeroAvatar: React.FC = () => {
  const { heroImage, name } = profileData;

  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative w-full max-w-[160px] xs:max-w-[200px] sm:max-w-[280px] md:max-w-[500px] lg:max-w-[600px] group">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <img
            src={heroImage}
            alt={name}
            className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroAvatar;
