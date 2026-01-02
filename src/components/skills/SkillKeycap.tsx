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
}

/* ===== Icon config (per-skill tuning) ===== */
const ICON_CONFIG: Record<string, { size?: string; disableGlow?: boolean }> = {
  Firebase: {
    size: "h-14 scale-110", // Firebase SVG hơi nhỏ → boost nhẹ
  },
  "Framer Motion": {
    size: "h-9",
    disableGlow: true, // SVG vàng → không cần glow
  },
};

const DEFAULT_ICON_SIZE = "h-8";

const SkillKeycap: React.FC<SkillKeycapProps> = ({
  skill,
  hoveredSkill,
  pressedSkill,
  setHoveredSkill,
  setPressedSkill,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-40, 40], [10, -10]);
  const rotateY = useTransform(x, [-40, 40], [-10, 10]);

  const isHovered = hoveredSkill === skill.name;
  const isPressed = pressedSkill === skill.name;

  const iconConfig = ICON_CONFIG[skill.name];

  /* ===== Handle click: mở link skill (nếu có) =====
     - Chỉ click khi tồn tại `skill.url`
     - Mở tab mới để không mất trang hiện tại
     - noopener,noreferrer: best practice bảo mật
  */
  const handleClick = () => {
    if (!skill.url) return;

    window.open(skill.url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      type="button"
      aria-label={skill.name}
      onClick={handleClick}
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => {
        setHoveredSkill(null);
        setPressedSkill(null);
        x.set(0);
        y.set(0);
      }}
      onMouseDown={() => setPressedSkill(skill.name)}
      onMouseUp={() => setPressedSkill(null)}
      onMouseMove={(e) => {
        if (!isHovered) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
      }}
      whileTap={{ scale: 0.96 }}
      /* UX:
         - Có url → cursor-pointer
         - Không url → cursor-default + mờ nhẹ
      */
      className={`relative flex flex-col items-center justify-center select-none focus:outline-none
        ${skill.url ? "cursor-pointer" : "cursor-default opacity-80"}
      `}
    >
      {/* ===== Keycap ===== */}
      <motion.div
        className="relative w-22 h-22"
        style={{ perspective: 700 }}
        animate={{ scale: isHovered ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-3 rounded-[26px] blur-2xl"
          animate={{ opacity: isHovered ? 0.35 : 0 }}
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)",
          }}
        />

        {/* Base */}
        <motion.div
          className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600"
          animate={{ y: isPressed ? 4 : 6 }}
        />

        {/* Top */}
        <motion.div
          className="absolute inset-0 rounded-[20px] overflow-hidden"
          style={{ rotateX, rotateY }}
          animate={{ y: isPressed ? 4 : 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              animate={{
                scale: isPressed ? 0.9 : isHovered ? 1.06 : 1,
                y: isHovered ? -2 : 0,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              {/* Glow: chỉ cho IMG + không bị disable */}
              {skill.logo && !iconConfig?.disableGlow && (
                <motion.div
                  className="absolute inset-0 rounded-xl blur-xl"
                  animate={{ opacity: isHovered ? 0.25 : 0 }}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,243,18,0.25), transparent 70%)",
                  }}
                />
              )}

              {skill.logo ? (
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="relative w-full h-full object-contain drop-shadow-md"
                />
              ) : (
                skill.icon?.({
                  className: `relative w-auto ${
                    iconConfig?.size ?? DEFAULT_ICON_SIZE
                  }`,
                })
              )}
            </motion.div>
          </div>

          <div className="absolute inset-0 rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)]" />
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: -4, scale: 0.9 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 10 : -4,
          scale: isHovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.18 }}
        className="mt-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-900 text-white shadow-xl"
      >
        {skill.name}
      </motion.div>
    </motion.button>
  );
};

export default SkillKeycap;
