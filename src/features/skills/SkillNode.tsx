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
  hoveredSkill: string | null;
  pressedSkill: string | null;
  setHoveredSkill: (name: string | null) => void;
  setPressedSkill: (name: string | null) => void;
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
  hoveredSkill,
  pressedSkill,
  setHoveredSkill,
  setPressedSkill,
  className = "",
}) => {
  const isHovered = hoveredSkill === skill.name;
  const isPressed = pressedSkill === skill.name;
  const iconConfig = ICON_CONFIG[skill.name];
  const glowColor = iconConfig?.glowColor ?? "var(--primary)";

  const handleClick = () => {
    if (skill.url) window.open(skill.url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => { setHoveredSkill(null); setPressedSkill(null); }}
      onMouseDown={() => setPressedSkill(skill.name)}
      onMouseUp={() => setPressedSkill(null)}
      className={`relative flex flex-col items-center justify-center select-none focus:outline-none group ${skill.url ? "cursor-pointer" : "cursor-default opacity-80"} ${className}`}
    >
      <motion.div
        className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-all duration-300"
        animate={{ scale: isHovered ? 1.05 : 1, y: isPressed ? 2 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Outer Glowing Ring */}
        <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${isHovered ? "border-primary cyber-glow shadow-[0_0_20px_var(--primary)]" : "border-primary/30"}`}>
          
          {/* Animated Scanning Ring on Hover */}
          {isHovered && (
            <div className="absolute inset-[-4px] rounded-full border-t-2 border-r-2 border-primary animate-[spin_3s_linear_infinite] opacity-70"></div>
          )}
          
          {/* Inner Dashed Ring */}
          <div className={`absolute inset-2 rounded-full border transition-all duration-300 ${isHovered ? "border-primary border-dashed animate-[spin_10s_linear_infinite_reverse]" : "border-primary/20 border-dotted"}`}></div>
          

          
          {/* Icon Container */}
          <div className="relative w-full h-full flex items-center justify-center bg-background/50 rounded-full backdrop-blur-sm z-10">
            <motion.div
              animate={{ scale: isPressed ? 0.9 : 1 }}
              transition={SPRING_CONFIG}
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center"
            >
              {skill.logo ? (
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className={`relative z-10 w-full h-full object-contain transition-all duration-300 ${isHovered ? "filter brightness-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" : ""} ${skill.invertDark ? "dark:invert" : ""}`}
                />
              ) : (
                skill.icon?.({
                  className: `relative w-auto transition-all duration-300 ${iconConfig?.size ?? DEFAULT_ICON_SIZE} ${isHovered ? "filter brightness-150" : "text-primary/70"}`,
                  style: { color: isHovered ? glowColor : undefined }
                })
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Cyber Glitch Text on Hover */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 12 : -5 }}
        transition={{ duration: 0.2 }}
        className="absolute -bottom-8 w-max z-20 pointer-events-none"
      >
        <div
          className="px-3 py-1 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary cyber-glitch"
          data-text={`[${skill.name}]`}
        >
          [{skill.name}]
        </div>
      </motion.div>
    </motion.button>
  );
};

export default SkillNode;
