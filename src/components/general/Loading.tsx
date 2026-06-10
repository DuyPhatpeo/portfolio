import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`fixed inset-0 z-[9999] bg-background text-foreground flex flex-col items-center justify-center transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
      
      {/* Decorative corners (Awwwards aesthetic) */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 text-[10px] md:text-xs font-mono tracking-widest opacity-40">
        DINO PÉO © {new Date().getFullYear()}
      </div>
      <div className="absolute top-6 right-6 md:top-10 md:right-10 text-[10px] md:text-xs font-mono tracking-widest opacity-40">
        PORTFOLIO
      </div>
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-[10px] md:text-xs font-mono tracking-widest opacity-40">
        SYSTEM LOADING
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-[10px] md:text-xs font-mono tracking-widest opacity-40">
        V 1.0.0
      </div>

      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Huge Percentage Number */}
        <div className="relative flex items-start">
          <motion.h1 
            className="text-[6rem] md:text-[12rem] lg:text-[16rem] font-sans font-black leading-none tracking-tighter"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {Math.round(progress)}
          </motion.h1>
          <motion.span 
            className="text-2xl md:text-5xl lg:text-7xl font-bold opacity-50 mt-4 md:mt-8 ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            %
          </motion.span>
        </div>

        {/* Loading Bar and Text */}
        <motion.div 
          className="mt-8 md:mt-12 flex flex-col items-center w-64 md:w-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="w-full flex justify-between text-xs md:text-sm tracking-[0.3em] font-medium uppercase text-foreground/60 mb-3">
            <span>{t("loading.title", "LOADING...")}</span>
            <span className="font-mono">[{Math.round(progress)}/100]</span>
          </div>
          <div className="h-[2px] bg-foreground/20 w-full overflow-hidden">
            <motion.div 
              className="h-full bg-foreground"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </motion.div>
      </div>

      {/* Background large text outline watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 select-none">
        <h2 className="text-[25vw] font-black whitespace-nowrap text-transparent" style={{ WebkitTextStroke: "2px var(--foreground)" }}>
          DINO PÉO
        </h2>
      </div>

    </div>
  );
};

export default Loading;
