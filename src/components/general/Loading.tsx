import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Particles from "../theme/Particles";

interface LoadingProps {
  progress: number;
}

const TECH_LOGOS = [
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TailwindCSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "NextJS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "NodeJS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Vite", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
  { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "Laravel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Firebase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
];

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate deterministic falling tech logo particles
  const fallingParticles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const tech = TECH_LOGOS[i % TECH_LOGOS.length];
      const left = 4 + ((i * 5.4 + (i % 3) * 2.3) % 92);
      const size = 32 + (i % 4) * 6; // 32px to 50px
      const duration = 4.5 + (i % 5) * 1.2; // 4.5s to 9.3s
      const delay = (i * 0.35) % 3.5;
      const initialRotate = -25 + (i % 7) * 8;
      const targetRotate = initialRotate + (i % 2 === 0 ? 120 : -120);
      const opacity = 0.25 + (i % 4) * 0.1; // 0.25 to 0.55

      return {
        id: i,
        ...tech,
        left,
        size,
        duration,
        delay,
        initialRotate,
        targetRotate,
        opacity,
      };
    });
  }, []);

  // Calculate liquid fill level (from bottom 240 to top 20 in SVG coordinates)
  // Fill starts rising after 15% progress and finishes by 92%
  const fillPercent = Math.min(100, Math.max(0, ((progress - 15) / 77) * 100));
  const waveY = 230 - (fillPercent / 100) * 200;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background text-foreground flex flex-col items-center justify-center transition-opacity duration-700 ${
        isMounted ? "opacity-100" : "opacity-0"
      } overflow-hidden select-none`}
    >
      {/* 1. Theme Starfield Particles Background */}
      <Particles quantity={70} />

      {/* 2. Falling Tech Logos Stream (Border-free, pure floating icons) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fallingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute select-none flex items-center justify-center pointer-events-none"
            style={{
              left: `${particle.left}%`,
              top: -80,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: ["0vh", "118vh"],
              rotate: [particle.initialRotate, particle.targetRotate],
              opacity: [0, particle.opacity, particle.opacity, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          >
            <img
              src={particle.src}
              alt={particle.name}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
              loading="eager"
            />
          </motion.div>
        ))}
      </div>

      {/* 3. Main Vector Typographic Canvas (Undulating Liquid Wave) */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center justify-center"
      >
        <svg
          viewBox="0 0 1000 240"
          className="w-full h-auto max-h-[50vh] overflow-visible"
        >
          <defs>
            {/* 1. Base Liquid Wave Clip-Path */}
            <clipPath id="liquid-wave-mask">
              <path
                d={`M -200 ${waveY} 
                   C 50 ${waveY - 24}, 220 ${waveY + 24}, 420 ${waveY} 
                   C 620 ${waveY - 24}, 820 ${waveY + 24}, 1020 ${waveY} 
                   C 1220 ${waveY - 24}, 1420 ${waveY + 24}, 1600 ${waveY} 
                   L 1600 320 
                   L -200 320 Z`}
              >
                <animate
                  attributeName="d"
                  dur="2.4s"
                  repeatCount="indefinite"
                  values={`
                    M -200 ${waveY} C 50 ${waveY - 26}, 220 ${waveY + 26}, 420 ${waveY} C 620 ${waveY - 26}, 820 ${waveY + 26}, 1020 ${waveY} C 1220 ${waveY - 26}, 1420 ${waveY + 26}, 1600 ${waveY} L 1600 320 L -200 320 Z;
                    M -200 ${waveY} C 80 ${waveY + 26}, 280 ${waveY - 26}, 480 ${waveY + 12} C 680 ${waveY + 26}, 880 ${waveY - 26}, 1080 ${waveY + 12} C 1280 ${waveY + 26}, 1480 ${waveY - 26}, 1600 ${waveY} L 1600 320 L -200 320 Z;
                    M -200 ${waveY} C 50 ${waveY - 26}, 220 ${waveY + 26}, 420 ${waveY} C 620 ${waveY - 26}, 820 ${waveY + 26}, 1020 ${waveY} C 1220 ${waveY - 26}, 1420 ${waveY + 26}, 1600 ${waveY} L 1600 320 L -200 320 Z
                  `}
                />
              </path>
            </clipPath>

            {/* 2. Surging Top Wave Crest Clip-Path */}
            <clipPath id="primary-crest-mask">
              <path
                d={`M -200 ${waveY - 18} 
                   C 80 ${waveY - 42}, 260 ${waveY + 14}, 520 ${waveY - 18} 
                   C 780 ${waveY - 42}, 980 ${waveY + 14}, 1220 ${waveY - 18} 
                   C 1420 ${waveY - 42}, 1520 ${waveY + 14}, 1600 ${waveY - 18} 
                   L 1600 320 
                   L -200 320 Z`}
              >
                <animate
                  attributeName="d"
                  dur="1.9s"
                  repeatCount="indefinite"
                  values={`
                    M -200 ${waveY - 18} C 80 ${waveY - 44}, 260 ${waveY + 14}, 520 ${waveY - 18} C 780 ${waveY - 44}, 980 ${waveY + 14}, 1220 ${waveY - 18} C 1420 ${waveY - 44}, 1520 ${waveY + 14}, 1600 ${waveY - 18} L 1600 320 L -200 320 Z;
                    M -200 ${waveY - 18} C 110 ${waveY + 16}, 330 ${waveY - 44}, 580 ${waveY - 10} C 830 ${waveY + 16}, 1040 ${waveY - 44}, 1290 ${waveY - 10} C 1490 ${waveY + 16}, 1580 ${waveY - 44}, 1600 ${waveY - 18} L 1600 320 L -200 320 Z;
                    M -200 ${waveY - 18} C 80 ${waveY - 44}, 260 ${waveY + 14}, 520 ${waveY - 18} C 780 ${waveY - 44}, 980 ${waveY + 14}, 1220 ${waveY - 18} C 1420 ${waveY - 44}, 1520 ${waveY + 14}, 1600 ${waveY - 18} L 1600 320 L -200 320 Z
                  `}
                />
              </path>
            </clipPath>
          </defs>

          {/* 1. Clean Vector Wireframe Outline */}
          <text
            x="500"
            y="180"
            textAnchor="middle"
            className="font-sans font-black uppercase tracking-tight"
            style={{
              fontSize: "148px",
              fill: "none",
              stroke: "rgba(var(--primary-rgb), 0.35)",
              strokeWidth: "1.5px",
              letterSpacing: "0.04em",
            }}
          >
            DINO PÉO
          </text>

          {/* 2. Top Wave: Foreground Highlight Fill */}
          <text
            x="500"
            y="180"
            textAnchor="middle"
            clipPath="url(#primary-crest-mask)"
            className="font-sans font-black uppercase tracking-tight"
            style={{
              fontSize: "148px",
              fill: "var(--foreground)",
              letterSpacing: "0.04em",
            }}
          >
            DINO PÉO
          </text>

          {/* 3. Base Wave: Primary Theme Fill */}
          <text
            x="500"
            y="180"
            textAnchor="middle"
            clipPath="url(#liquid-wave-mask)"
            className="font-sans font-black uppercase tracking-tight"
            style={{
              fontSize: "148px",
              fill: "var(--primary)",
              letterSpacing: "0.04em",
            }}
          >
            DINO PÉO
          </text>
        </svg>
      </motion.div>

      {/* 4. Bottom Right: Monospace Percentage Counter */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex items-baseline">
        <span className="text-4xl md:text-6xl font-mono font-light tracking-tighter text-foreground">
          {Math.round(progress).toString().padStart(2, "0")}
        </span>
        <span className="text-base md:text-xl font-mono text-primary ml-1 font-bold">
          %
        </span>
      </div>

      {/* 5. Top Left: Agency / Studio Subtitle */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/50">
          INITIALIZING PORTFOLIO
        </span>
      </div>
    </div>
  );
};

export default Loading;
