import React from "react";
import { motion, useMotionValue } from "framer-motion";

/* ===== Skill type ===== */
export interface Skill {
  name: string;
  logo?: string;
  invertDark?: boolean;
  icon?: (props: { className?: string }) => React.ReactNode;
  url?: string;
}

interface SkillKeycapProps {
  skill: Skill;
  hoveredSkill: string | null;
  pressedSkill: string | null;
  setHoveredSkill: (name: string | null) => void;
  setPressedSkill: (name: string | null) => void;
}

/* ===== Icon config ===== */
const ICON_CONFIG: Record<string, { size?: string; disableGlow?: boolean }> = {
  Firebase: { size: "h-14 scale-110" },
  "Framer Motion": { size: "h-9", disableGlow: true },
};

const DEFAULT_ICON_SIZE = "h-8";
const SPRING_CONFIG = { type: "spring" as const, stiffness: 600, damping: 35 };

const SkillNode: React.FC<SkillKeycapProps> = ({
  skill,
  hoveredSkill,
  pressedSkill,
  setHoveredSkill,
  setPressedSkill,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const isHovered = hoveredSkill === skill.name;
  const isPressed = pressedSkill === skill.name;
  const iconConfig = ICON_CONFIG[skill.name];

  const handleClick = () => {
    if (skill.url) window.open(skill.url, "_blank", "noopener,noreferrer");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
    setPressedSkill(null);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="button"
      aria-label={skill.name}
      onClick={handleClick}
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setPressedSkill(skill.name)}
      onMouseUp={() => setPressedSkill(null)}
      onMouseMove={handleMouseMove}
      className={`relative flex flex-col items-center justify-center select-none focus:outline-none ${
        skill.url ? "cursor-pointer" : "cursor-default opacity-80"
      }`}
    >
      <motion.div
        className={`relative w-24 h-24 transition-all duration-300 ${
          isHovered
            ? "drop-shadow-[0_0_15px_rgba(0,245,212,0.6)]"
            : "drop-shadow-[0_0_5px_rgba(0,245,212,0.1)]"
        }`}
        animate={{ scale: isHovered ? 1.05 : 1, y: isPressed ? 2 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div
          className={`relative w-full h-full flex items-center justify-center border-2 transition-all duration-300 ${
            isHovered
              ? "bg-tech-teal/20 border-tech-teal"
              : "bg-tech-bg/50 border-tech-teal/30"
          }`}
          style={{
            clipPath:
              "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
          }}
        >
          {/* Decorative HUD Corner */}
          {isHovered && (
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-tech-light"></div>
          )}

          {/* Icon container */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              animate={{ scale: isPressed ? 0.9 : 1 }}
              transition={SPRING_CONFIG}
            >
              {/* Removed Icon glow per user request */}

              {skill.logo ? (
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className={`relative z-10 w-full h-full object-contain transition-all duration-300 ${
                    isHovered && !iconConfig?.disableGlow
                      ? "filter brightness-110"
                      : ""
                  } ${skill.invertDark ? "dark:invert" : ""}`}
                />
              ) : (
                skill.icon?.({
                  className: `relative w-auto transition-all duration-300 ${
                    iconConfig?.size ?? DEFAULT_ICON_SIZE
                  } ${
                    isHovered
                      ? "text-tech-teal filter brightness-125"
                      : "text-tech-teal"
                  }`,
                })
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tooltip Terminal Style */}
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.85 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 14 : -6,
          scale: isHovered ? 1 : 0.85,
        }}
        transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        className="mt-3 relative z-10"
      >
        <div
          className="relative text-[10px] md:text-xs font-bold px-3 py-1 font-mono uppercase tracking-widest bg-tech-bg border border-tech-teal text-tech-light shadow-[0_0_10px_rgba(0,245,212,0.4)]"
          style={{
            clipPath:
              "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
          }}
        >
          &gt; {skill.name}
        </div>
      </motion.div>
    </motion.button>
  );
};

export default SkillNode;
