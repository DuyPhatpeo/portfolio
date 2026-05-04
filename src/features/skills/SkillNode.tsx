import React from "react";
import { motion } from "framer-motion";

export interface Skill {
  name: string;
  logo?: string;
  invertDark?: boolean;
  icon?: (props: { className?: string; style?: React.CSSProperties }) => React.ReactNode;
  url?: string;
}

interface SkillNodeProps {
  skill: Skill;
  className?: string;
}

const ICON_CONFIG: Record<string, { size?: string; disableGlow?: boolean; glowColor?: string }> = {
  Firebase: { size: "h-10 scale-110", glowColor: "#FFCA28" },
  "Framer Motion": { size: "h-8", glowColor: "#FFF312" },
};

const DEFAULT_ICON_SIZE = "h-7";
const SPRING_CONFIG = { type: "spring" as const, stiffness: 600, damping: 35 };

const SkillNode: React.FC<SkillNodeProps> = ({
  skill,
  className = "",
}) => {
  const iconConfig = ICON_CONFIG[skill.name];
  const glowColor = iconConfig?.glowColor ?? "var(--primary)";

  const handleClick = () => {
    if (skill.url) window.open(skill.url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={`
        relative flex items-center gap-4 px-6 py-3 select-none focus:outline-none group/skill
        bg-black/40 border border-primary/20 rounded-full backdrop-blur-sm
        hover:border-primary/60 hover:bg-primary/5 transition-all duration-300
        ${skill.url ? "cursor-pointer" : "cursor-default opacity-90"} ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon Area */}
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        {skill.logo ? (
          <img
            src={skill.logo}
            alt={skill.name}
            className={`w-full h-full object-contain transition-all duration-300 opacity-80 group-hover/skill:opacity-100 group-hover/skill:brightness-125 group-hover/skill:drop-shadow-[0_0_8px_var(--primary)] ${skill.invertDark ? "dark:invert" : ""}`}
          />
        ) : (
          skill.icon?.({
            className: "w-full h-full transition-all duration-300 text-primary/60 group-hover/skill:text-primary group-hover/skill:brightness-150 group-hover/skill:drop-shadow-[0_0_8px_var(--primary)]",
            style: { color: undefined } // Let CSS handle it or use a CSS variable
          })
        )}
      </div>

      {/* Text Area */}
      <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.1em] transition-colors duration-300 text-foreground/80 group-hover/skill:text-primary">
        {skill.name}
      </span>

      {/* Subtle background glow on hover - pure CSS */}
      <div className="absolute inset-0 rounded-full border border-primary/40 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)] pointer-events-none opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
    </motion.button>
  );
};

export default SkillNode;
