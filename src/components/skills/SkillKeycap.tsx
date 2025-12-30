import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface SkillKeycapProps {
  skill: { name: string; logo: string };
  hoveredSkill: string | null;
  pressedSkill: string | null;
  setHoveredSkill: (name: string | null) => void;
  setPressedSkill: (name: string | null) => void;
}

const SkillKeycap: React.FC<SkillKeycapProps> = ({
  skill,
  hoveredSkill,
  pressedSkill,
  setHoveredSkill,
  setPressedSkill,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

  const isHovered = hoveredSkill === skill.name;
  const isPressed = pressedSkill === skill.name;

  return (
    <div
      className="relative flex flex-col items-center justify-center cursor-pointer select-none"
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
        const px = e.clientX - rect.left - rect.width / 2;
        const py = e.clientY - rect.top - rect.height / 2;
        x.set(px * 0.3);
        y.set(py * 0.3);
      }}
    >
      {/* Keycap Container */}
      <motion.div
        className="relative w-28 h-28"
        style={{ perspective: 800 }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Shadow Layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-[28px] blur-sm opacity-40"
          animate={{
            y: isPressed ? 6 : 8,
            scale: isPressed ? 0.95 : 1,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 35 }}
        />

        {/* Base/Side Layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-[26px]"
          animate={{
            y: isPressed ? 5 : 7,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 35 }}
        />

        {/* Top Surface */}
        <motion.div
          className="absolute inset-0 rounded-[26px] overflow-hidden"
          style={{ rotateX, rotateY }}
          animate={{
            y: isPressed ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 35 }}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent"
            animate={{
              opacity: isHovered ? 0.8 : 0.4,
            }}
          />

          {/* Border Highlight */}
          <div className="absolute inset-0 rounded-[26px] ring-1 ring-white/50 ring-inset" />

          {/* Logo Container */}
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <motion.div
              className="relative w-full h-full"
              animate={{
                scale: isPressed ? 0.9 : 1,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {/* Logo Glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl blur-xl opacity-0"
                animate={{
                  opacity: isHovered ? 0.3 : 0,
                }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
                }}
              />

              {/* Logo */}
              <motion.img
                src={skill.logo}
                alt={skill.name}
                className="relative w-full h-full object-contain drop-shadow-lg"
                animate={{
                  filter: isHovered
                    ? "drop-shadow(0 4px 12px rgba(0,0,0,0.2))"
                    : "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
                }}
              />
            </motion.div>
          </div>

          {/* Subtle Inner Shadow */}
          <div className="absolute inset-0 rounded-[26px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.08)]" />
        </motion.div>

        {/* Pressed State Shadow */}
        <motion.div
          className="absolute inset-0 rounded-[26px] bg-black/5"
          animate={{
            opacity: isPressed ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: -5, scale: 0.9 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 12 : -5,
          scale: isHovered ? 1 : 0.9,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="mt-2 bg-gradient-to-br from-gray-900 to-gray-800 text-white text-sm font-medium px-4 py-2 rounded-xl pointer-events-none whitespace-nowrap shadow-xl"
        style={{
          boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <div className="relative">
          {skill.name}
          {/* Tooltip Arrow */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900" />
        </div>
      </motion.div>
    </div>
  );
};

export default SkillKeycap;
