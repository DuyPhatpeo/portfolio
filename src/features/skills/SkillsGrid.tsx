import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../../constants/skillsData.tsx";
import { TECH } from "../../constants/technologies.ts";
import SkillNode from "./SkillNode.tsx";
import type { Skill } from "../../types/data";

const CATEGORIES = {
  frontend: [TECH.HTML, TECH.CSS, TECH.JS, TECH.TS, TECH.REACT, TECH.NEXT_JS, TECH.TAILWIND, TECH.SASS, TECH.BOOTSTRAP, TECH.FRAMER_MOTION, TECH.ZUSTAND],
  backend: [TECH.NODE_JS, TECH.LARAVEL, TECH.NESTJS, TECH.MYSQL, TECH.MONGODB, TECH.FIREBASE, TECH.DISCORD_JS],
  tools: [TECH.VSCODE, TECH.VITE, TECH.NPM, TECH.GIT, TECH.GITHUB, TECH.FIGMA, TECH.VERCEL]
};

// Helper to filter skills
const getSkills = (names: string[]) => 
  names.map(name => skills.find(s => s.name === name)).filter(Boolean) as Skill[];

export default function SkillsGrid() {
  const allSkills = [...getSkills(CATEGORIES.frontend), ...getSkills(CATEGORIES.backend), ...getSkills(CATEGORIES.tools)];
  
  // Split skills into two rows
  const midPoint = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, midPoint);
  const row2 = allSkills.slice(midPoint);

  const MarqueeRow = ({ items, direction = "forward", speed = 40 }: { items: Skill[], direction?: "forward" | "reverse", speed?: number }) => {
    return (
      <div className="relative flex items-center overflow-hidden py-4 sm:py-6 group/marquee select-none h-[100px] sm:h-[120px]">
        <div
          className={`flex whitespace-nowrap gap-6 sm:gap-10 will-change-transform ${direction === "forward" ? "animate-marquee" : "animate-marquee-reverse"}`}
          style={{ 
            display: "flex",
            width: "max-content",
            "--duration": `${speed}s`,
          } as React.CSSProperties}
        >
          {/* Duplicate set for seamless loop */}
          <div className="flex gap-6 sm:gap-10 pr-6 sm:pr-10">
            {items.map((skill, idx) => (
              <div key={`${skill.name}-1-${idx}`} className="shrink-0 flex items-center">
                <SkillNode skill={skill} />
              </div>
            ))}
          </div>
          <div className="flex gap-6 sm:gap-10 pr-6 sm:pr-10">
            {items.map((skill, idx) => (
              <div key={`${skill.name}-2-${idx}`} className="shrink-0 flex items-center">
                <SkillNode skill={skill} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient Fades for edges - Optimized */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-background via-background/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-background via-background/60 to-transparent z-20 pointer-events-none" />
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-4">
      {/* Row 1: Forward scrolling */}
      <div className="border-y border-primary/10 bg-black/20 backdrop-blur-sm relative">
        <div className="absolute top-2 left-4 font-mono text-[10px] text-primary/40 uppercase tracking-widest z-30">ROW_01 // FRONTEND_CORE</div>
        <MarqueeRow items={row1} direction="forward" speed={50} />
      </div>

      {/* Row 2: Reverse scrolling */}
      <div className="border-y border-primary/10 bg-black/20 backdrop-blur-sm relative">
        <div className="absolute top-2 left-4 font-mono text-[10px] text-primary/40 uppercase tracking-widest z-30">ROW_02 // SYSTEM_TOOLS</div>
        <MarqueeRow items={row2} direction="reverse" speed={60} />
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-primary/5 blur-[120px] pointer-events-none -z-10" />
    </div>
  );
}
