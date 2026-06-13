import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Particles from "../theme/Particles";
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaDocker, FaGitAlt, FaFigma 
} from "react-icons/fa";
import { 
  SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiFirebase, SiVite
} from "react-icons/si";

interface LoadingProps {
  progress: number;
}

const ROW_1 = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: SiJavascript, color: "#F7DF1E" },
  { Icon: SiTailwindcss, color: "#06B6D4" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: FaHtml5, color: "#E34F26" },
  { Icon: SiNextdotjs, color: "var(--foreground)" },
  { Icon: SiMongodb, color: "#47A248" },
  { Icon: FaDocker, color: "#2496ED" }
];

const ROW_2 = [
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaCss3Alt, color: "#1572B6" },
  { Icon: FaPython, color: "#3776AB" },
  { Icon: FaGitAlt, color: "#F05032" },
  { Icon: FaFigma, color: "#F24E1E" },
  { Icon: SiPostgresql, color: "#4169E1" },
  { Icon: SiFirebase, color: "#FFCA28" },
  { Icon: SiVite, color: "#646CFF" }
];

// Double the arrays for seamless loop
const MARQUEE_1 = [...ROW_1, ...ROW_1, ...ROW_1];
const MARQUEE_2 = [...ROW_2, ...ROW_2, ...ROW_2];

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`fixed inset-0 z-[9999] text-foreground flex flex-col items-center justify-center transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
      
      {/* Base Solid Background */}
      <div className="absolute inset-0 bg-background" style={{ zIndex: -2 }} />

      {/* Particles Background (it has inline zIndex: -1, so it sits above the base background) */}
      <Particles quantity={100} />
      
      {/* Background Marquees (Logo background, sits above Particles) */}
      <div className="absolute inset-0 flex flex-col justify-center opacity-10 dark:opacity-20 pointer-events-none -rotate-12 scale-150" style={{ zIndex: 0 }}>
        
        {/* Row 1: Moves Left */}
        <div className="flex w-[300vw] mb-12">
          <motion.div 
            className="flex gap-16 md:gap-32"
            animate={{ x: [0, "-33.33%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {MARQUEE_1.map((item, idx) => (
              <item.Icon key={`r1-${idx}`} size={120} color={item.color} />
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
            {MARQUEE_2.map((item, idx) => (
              <item.Icon key={`r2-${idx}`} size={120} color={item.color} />
            ))}
          </motion.div>
        </div>

      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-8xl font-sans font-black tracking-[0.4em] uppercase drop-shadow-[0_0_20px_var(--foreground-glow)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] text-foreground ml-[0.4em]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          DINO PÉO
        </motion.h1>
      </div>

      {/* Bottom Right: Minimal Percentage */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex items-baseline">
        <span className="text-4xl md:text-6xl lg:text-7xl font-mono font-light tracking-tighter text-foreground drop-shadow-[0_0_10px_var(--foreground-glow)]">
          {Math.round(progress).toString().padStart(2, '0')}
        </span>
        <span className="text-lg md:text-2xl font-mono text-primary ml-1 opacity-70 drop-shadow-[0_0_5px_var(--primary)]">%</span>
      </div>

    </div>
  );
};

export default Loading;
