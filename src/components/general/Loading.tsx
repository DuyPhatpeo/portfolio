import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaDocker, FaGitAlt, FaFigma 
} from "react-icons/fa";
import { 
  SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiFirebase, SiVite
} from "react-icons/si";

interface LoadingProps {
  progress: number;
}

const ROW_1 = [FaReact, SiJavascript, SiTailwindcss, FaNodeJs, FaHtml5, SiNextdotjs, SiMongodb, FaDocker];
const ROW_2 = [SiTypescript, FaCss3Alt, FaPython, FaGitAlt, FaFigma, SiPostgresql, SiFirebase, SiVite];

// Double the arrays for seamless loop
const MARQUEE_1 = [...ROW_1, ...ROW_1, ...ROW_1];
const MARQUEE_2 = [...ROW_2, ...ROW_2, ...ROW_2];

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`fixed inset-0 z-[9999] bg-background text-foreground flex flex-col items-center justify-center transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
      
      {/* Background Marquees */}
      <div className="absolute inset-0 flex flex-col justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none -rotate-12 scale-150">
        
        {/* Row 1: Moves Left */}
        <div className="flex w-[300vw] mb-12">
          <motion.div 
            className="flex gap-16 md:gap-32"
            animate={{ x: [0, "-33.33%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {MARQUEE_1.map((Icon, idx) => (
              <Icon key={`r1-${idx}`} size={120} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex w-[300vw]">
          <motion.div 
            className="flex gap-16 md:gap-32"
            animate={{ x: ["-33.33%", 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {MARQUEE_2.map((Icon, idx) => (
              <Icon key={`r2-${idx}`} size={120} />
            ))}
          </motion.div>
        </div>

      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h2 className="text-xl md:text-2xl font-bold tracking-[0.5em] uppercase text-primary/80 mb-4 font-sans">
          DINO PÉO
        </h2>
        
        <div className="relative flex items-start">
          <motion.h1 
            className="text-[8rem] md:text-[12rem] lg:text-[15rem] font-sans font-black leading-none tracking-tighter drop-shadow-[0_0_30px_var(--foreground-glow)] dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {Math.round(progress)}
          </motion.h1>
          <span className="text-4xl md:text-6xl lg:text-7xl font-bold opacity-50 mt-6 md:mt-10 lg:mt-12 ml-2">
            %
          </span>
        </div>

        <div className="w-64 md:w-96 h-[2px] bg-foreground/20 mt-8 overflow-hidden rounded-full">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_15px_var(--primary)]"
            style={{ width: `${progress}%` }}
            layout
          />
        </div>
        
        <div className="mt-4 text-xs md:text-sm tracking-[0.4em] font-medium uppercase text-foreground/60">
          {t("loading.title", "LOADING...")}
        </div>
      </div>

    </div>
  );
};

export default Loading;
