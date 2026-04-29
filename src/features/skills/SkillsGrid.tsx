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
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [pressedSkill, setPressedSkill] = useState<string | null>(null);

  const frontendSkills = getSkills(CATEGORIES.frontend);
  const backendSkills = getSkills(CATEGORIES.backend);
  const toolsSkills = getSkills(CATEGORIES.tools);

  const nodeProps = { hoveredSkill, pressedSkill, setHoveredSkill, setPressedSkill };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Bento Grid Container - Using minmax to allow rows to grow if content wraps */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(220px,auto)] grid-flow-row-dense">
        
        {/* Panel 1: FRONTEND (Large Core Area) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-2 relative rounded-2xl border border-primary/20 bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl p-6 sm:p-8 overflow-hidden group shadow-[0_8px_32px_rgba(var(--primary-rgb),0.05)] hover:shadow-[0_8px_32px_rgba(var(--primary-rgb),0.1)] transition-all duration-500 cyber-scanline"
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="absolute inset-0 cyber-grid opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 shrink-0">
              <div className="flex items-center gap-3">
                 <div className="w-1 h-4 bg-primary cyber-glow-sm"></div>
                 <h3 className="font-mono text-primary font-bold tracking-[0.2em] text-sm sm:text-base">FRONTEND_SYS</h3>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-mono text-primary/50 uppercase tracking-widest hidden sm:inline-block">Status: Active</span>
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-wrap gap-4 sm:gap-6 items-center justify-center content-center pb-8 pt-2">
              {frontendSkills.map((skill, i) => (
                <motion.div 
                  key={skill.name} 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <SkillNode skill={skill} {...nodeProps} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Panel 2: SYSTEM CORE (Animation) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 relative rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent flex items-center justify-center overflow-hidden shadow-inner group min-h-[180px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.15),transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-2 sm:inset-4 rounded-full border-2 border-dashed border-primary/30 animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-6 sm:inset-10 rounded-full border border-primary/50 animate-pulse cyber-glow-sm"></div>
              
              {/* Radar sweep effect */}
              <div className="absolute inset-2 sm:inset-4 rounded-full overflow-hidden">
                <div className="w-1/2 h-1/2 origin-bottom-right bg-gradient-to-tr from-primary/30 to-transparent animate-[spin_3s_linear_infinite]"></div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="font-mono text-primary font-bold text-xs sm:text-sm tracking-[0.2em] bg-background/80 px-2 py-1 rounded backdrop-blur-md border border-primary/30 shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]">CORE</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Panel 3: BACKEND (Vertical List View) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="col-span-1 md:col-span-1 lg:col-span-1 md:row-span-2 relative rounded-2xl border border-primary/20 bg-black/60 backdrop-blur-xl p-5 sm:p-6 overflow-hidden cyber-scanline group"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors duration-500"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary/20 shrink-0">
              <div className="w-1 h-4 bg-primary cyber-glow-sm"></div>
              <h3 className="font-mono text-primary font-bold tracking-[0.2em] text-sm">BACKEND</h3>
            </div>
            
            <div className="flex-1 flex flex-col gap-3 justify-center">
              {backendSkills.map((skill, i) => (
                <motion.button 
                  key={skill.name}
                  onClick={() => { if (skill.url) window.open(skill.url, "_blank", "noopener,noreferrer"); }}
                  type="button"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  viewport={{ once: true }}
                  className={`w-full flex items-center gap-4 p-2.5 rounded-xl bg-black/40 hover:bg-primary/10 transition-all duration-300 border border-white/5 hover:border-primary/30 group/item relative overflow-hidden shrink-0 ${skill.url ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className="absolute left-0 top-0 w-1 h-full bg-primary transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></div>
                  
                  <div className="w-9 h-9 flex items-center justify-center shrink-0 bg-background/80 rounded-lg border border-primary/20 group-hover/item:border-primary/50 shadow-inner transition-all">
                    {skill.logo ? (
                      <img src={skill.logo} alt={skill.name} className={`w-5 h-5 object-contain ${skill.invertDark ? "dark:invert" : ""}`} />
                    ) : (
                      skill.icon?.({ className: "w-5 h-5 text-primary/70 group-hover/item:text-primary transition-colors" })
                    )}
                  </div>
                  <span className="font-mono text-xs sm:text-sm text-foreground/80 group-hover/item:text-primary transition-colors font-semibold tracking-wider">
                    {skill.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Panel 4: SYSTEM STATUS (Analytics View) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="col-span-1 md:col-span-2 lg:col-span-1 row-span-1 relative rounded-2xl border border-primary/20 bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl p-6 flex flex-col justify-between overflow-hidden group shadow-[0_4px_20px_rgba(var(--primary-rgb),0.05)] min-h-[180px]"
        >
          {/* Static noise overlay for tech feel */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
          
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-start shrink-0">
             <div>
               <div className="font-mono text-[10px] text-primary/60 mb-1 tracking-widest">SYSTEM_STATUS:</div>
               <div className="font-mono text-xl sm:text-2xl font-bold text-green-400 animate-pulse tracking-[0.2em] cyber-text-glitch" data-text="OPTIMAL">OPTIMAL</div>
             </div>
             <svg className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
             </svg>
          </div>
          
          <div className="relative z-10 w-full h-16 flex items-end gap-1.5 opacity-90 mt-6 shrink-0">
            {[40, 70, 45, 90, 65, 85, 30, 60, 80, 50, 75].map((h, i) => (
              <div key={i} className="relative flex-1 bg-primary/20 hover:bg-primary transition-all duration-300 cursor-crosshair group/bar rounded-t-[1px]" style={{ height: `${h}%` }}>
                 {/* Top glowing cap */}
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_5px_rgba(var(--primary-rgb),1)]"></div>
                 {/* Tooltip on hover */}
                 <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black border border-primary/50 px-1.5 py-0.5 text-[9px] font-mono opacity-0 group-hover/bar:opacity-100 transition-opacity z-20 text-primary rounded shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]">
                    {h}%
                 </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Panel 5: TOOLS (Flexible Wrap) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="col-span-1 md:col-span-3 lg:col-span-4 row-span-1 relative rounded-2xl border border-primary/20 bg-black/60 backdrop-blur-xl p-5 sm:p-6 overflow-hidden group shadow-[0_4px_20px_rgba(var(--primary-rgb),0.05)]"
        >
          <div className="relative z-10 h-full flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-8">
            <div className="flex items-center gap-3 shrink-0 xl:pr-8 xl:border-r border-primary/20">
                 <div className="w-1 h-4 bg-primary cyber-glow-sm"></div>
                 <h3 className="font-mono text-primary font-bold tracking-[0.2em] text-sm sm:text-base whitespace-nowrap">DEV_TOOLS</h3>
            </div>
            
            <div className="flex-1 flex flex-wrap items-center justify-start gap-4 sm:gap-6 pb-6 xl:pb-0 pt-2 xl:pt-0">
              {toolsSkills.map((skill, i) => (
                <motion.div 
                  key={skill.name} 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + (i * 0.05) }}
                  viewport={{ once: true }}
                >
                  <SkillNode skill={skill} {...nodeProps} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
