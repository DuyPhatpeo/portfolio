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
  Firebase: { size: "h-10 scale-110" },
  "Framer Motion": { size: "h-8" },
};

const DEFAULT_ICON_SIZE = "h-7";
const SPRING_CONFIG = { type: "spring" as const, stiffness: 600, damping: 35 };

const SkillNode: React.FC<SkillNodeProps> = ({
  skill,
  className = "",
}) => {
  const iconConfig = ICON_CONFIG[skill.name];
  const glowColor = iconConfig?.glowColor ?? "var(--primary)";

  return (
    <motion.div
      className={`
        relative flex items-center gap-4 px-6 py-3.5 select-none
        bg-muted rounded-full backdrop-blur-xl
        transition-all duration-500 ${className}
      `}
    >
      {/* Icon Area */}
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        {skill.logo ? (
          <img
            src={skill.logo}
            alt={skill.name}
            className={`w-full h-full object-contain opacity-90 ${skill.invertDark ? "dark:invert" : ""}`}
          />
        ) : (
          skill.icon?.({
            className: "w-full h-full text-primary/60",
            style: { color: undefined }
          })
        )}
      </div>

      {/* Text Area */}
      <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-foreground/90">
        {skill.name}
      </span>

      {/* Persistent subtle glow */}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_var(--primary/5)] pointer-events-none"></div>
    </motion.div>
  );
};

export default SkillNode;
