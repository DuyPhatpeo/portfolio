import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/* ===== Skill type ===== */
export interface Skill {
  name: string;
  logo?: string;
  icon?: (props: { className?: string }) => React.ReactNode;
  url?: string;
}

interface SkillKeycapProps {
  skill: Skill;
  hoveredSkill: string | null;
  pressedSkill: string | null;
  setHoveredSkill: (name: string | null) => void;
  setPressedSkill: (name: string | null) => void;
  isDarkMode?: boolean; // Thêm prop dark mode
}

/* ===== Icon config ===== */
const ICON_CONFIG: Record<string, { size?: string; disableGlow?: boolean }> = {
  Firebase: { size: "h-14 scale-110" },
  "Framer Motion": { size: "h-9", disableGlow: true },
};

const DEFAULT_ICON_SIZE = "h-8";
const SPRING_CONFIG = { type: "spring" as const, stiffness: 600, damping: 35 };

const SkillKeycap: React.FC<SkillKeycapProps> = ({
  skill,
  hoveredSkill,
  pressedSkill,
  setHoveredSkill,
  setPressedSkill,
  isDarkMode = false,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-40, 40], [8, -8]);
  const rotateY = useTransform(x, [-40, 40], [-8, 8]);

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
        className="relative w-24 h-24"
        style={{ perspective: 1200 }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute -inset-6 rounded-[32px] blur-3xl bg-primary/70"
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Shadow */}
        <motion.div
          className={`absolute inset-0 rounded-[22px] blur-xl ${
            isDarkMode ? "bg-black/40" : "bg-black/25"
          }`}
          animate={{ y: isPressed ? 2 : isHovered ? 5 : 10 }}
          transition={SPRING_CONFIG}
        />

        {/* Base plate */}
        <motion.div
          className={`absolute inset-0 rounded-[22px] ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-800 via-slate-900 to-black"
              : "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
          }`}
          animate={{ y: isPressed ? 7 : 10 }}
          transition={SPRING_CONFIG}
        />

        {/* Top surface */}
        <motion.div
          className={`absolute inset-0 rounded-[22px] overflow-hidden ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
              : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
          }`}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          animate={{ y: isPressed ? 5 : isHovered ? 2 : 0 }}
          transition={SPRING_CONFIG}
        >
          {/* Glossy shine */}
          <motion.div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-gradient-to-br from-slate-600/40 via-transparent to-transparent"
                : "bg-gradient-to-br from-white/60 via-transparent to-transparent"
            }`}
            animate={{ opacity: isHovered ? 0.9 : 0.5 }}
          />

          {/* Icon container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              animate={{ scale: isPressed ? 0.88 : 1 }}
              transition={SPRING_CONFIG}
            >
              {/* Icon glow */}
              {skill.logo && !iconConfig?.disableGlow && (
                <motion.div
                  className="absolute -inset-2 rounded-2xl blur-2xl bg-primary/60"
                  animate={{ opacity: isHovered ? 0.5 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}

              {skill.logo ? (
                <motion.img
                  src={skill.logo}
                  alt={skill.name}
                  className="relative w-full h-full object-contain"
                  animate={{ scale: isPressed ? 0.88 : 1 }}
                  transition={SPRING_CONFIG}
                />
              ) : (
                skill.icon?.({
                  className: `relative w-auto ${
                    iconConfig?.size ?? DEFAULT_ICON_SIZE
                  } ${isDarkMode ? "text-gray-200" : ""}`,
                })
              )}
            </motion.div>
          </div>

          {/* Inner shadow */}
          <motion.div
            className="absolute inset-0 rounded-[22px]"
            animate={{
              boxShadow: isHovered
                ? isDarkMode
                  ? "inset 0 2px 8px rgba(0,0,0,0.5)"
                  : "inset 0 2px 8px rgba(0,0,0,0.08)"
                : isDarkMode
                ? "inset 0 3px 12px rgba(0,0,0,0.6)"
                : "inset 0 3px 12px rgba(0,0,0,0.12)",
            }}
          />

          {/* Top highlight */}
          <motion.div
            className={`absolute inset-x-0 top-0 h-2/5 rounded-t-[22px] ${
              isDarkMode
                ? "bg-gradient-to-b from-slate-600/30 via-slate-700/15 to-transparent"
                : "bg-gradient-to-b from-white/50 via-white/20 to-transparent"
            }`}
            animate={{ opacity: isHovered ? 0.8 : 0.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.85 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 14 : -6,
          scale: isHovered ? 1 : 0.85,
        }}
        transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        className="mt-3 relative"
      >
        <div className="absolute inset-0 bg-primary/35 blur-xl rounded-xl" />
        <div
          className={`relative text-xs font-bold px-4 py-2 rounded-xl shadow-2xl ${
            isDarkMode
              ? "bg-slate-800 text-gray-100 border border-slate-600/50"
              : "bg-gray-900 text-white border border-slate-700/50"
          }`}
        >
          <span className="relative">{skill.name}</span>
        </div>
      </motion.div>
    </motion.button>
  );
};

export default SkillKeycap;
