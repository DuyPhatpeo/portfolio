import React from 'react';
import { motion } from "framer-motion";
import "@features/hero/hero-banner.css";

interface PageHeroProps {
  title1: string;
  title2?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title1, title2 }) => {
  const fullTitle = `${title1} ${title2 || ''}`.trim();
  
  return (
    <div className="relative w-full pt-8 pb-0 md:pt-12 md:pb-0 mt-8 flex flex-col justify-center items-center bg-transparent">
      {/* Main Text */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-6xl md:text-8xl lg:text-[100px] font-black uppercase tracking-tighter text-foreground bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/30 leading-tight py-4"
      >
        {fullTitle}
      </motion.h1>
      
      {/* Reflection Water Effect */}
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="relative z-0 text-6xl md:text-8xl lg:text-[100px] font-black uppercase tracking-tighter text-primary leading-tight py-4 -scale-y-100 blur-[2px] select-none -mt-10 md:-mt-16"
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent 10%, black 90%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, black 90%)' 
        }}
        aria-hidden="true"
      >
        {fullTitle}
      </motion.h1>
    </div>
  );
};

export default PageHero;
