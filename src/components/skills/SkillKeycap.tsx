import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface Skill {
  name: string;
  logo: string;
  url?: string;
}

interface SkillKeycapProps {
  skill: Skill;
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

  const rotateX = useTransform(y, [-40, 40], [10, -10]);
  const rotateY = useTransform(x, [-40, 40], [-10, 10]);

  const isHovered = hoveredSkill === skill.name;
  const isPressed = pressedSkill === skill.name;

  return (
    <motion.button
      type="button"
      aria-label={skill.name}
      className="relative flex flex-col items-center justify-center select-none cursor-pointer focus:outline-none"
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        if (skill.url) {
          window.open(skill.url, "_blank", "noopener,noreferrer");
        }
      }}
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
        x.set(px * 0.25);
        y.set(py * 0.25);
      }}
    >
      {/* Keycap */}
      <motion.div
        className="relative w-22 h-22"
        style={{ perspective: 700 }}
        animate={{ scale: isHovered ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
      >
        {/* Hover glow */}
        <motion.div
          className="absolute -inset-3 rounded-[26px] blur-2xl"
          animate={{ opacity: isHovered ? 0.35 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)",
          }}
        />

        {/* Press glow */}
        <motion.div
          className="absolute -inset-2 rounded-[24px] blur-xl"
          animate={{ opacity: isPressed ? 0.45 : 0 }}
          transition={{ duration: 0.15 }}
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)",
          }}
        />

        {/* Shadow */}
        <motion.div
          className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 blur-sm opacity-40"
          animate={{ y: isPressed ? 5 : 7 }}
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
          {/* Surface */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

          {/* Light sweep */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPositionX: isHovered ? "200%" : "0%",
              opacity: isHovered ? 0.6 : 0,
            }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{
              background:
                "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
          />

          {/* Border */}
          <div className="absolute inset-0 rounded-[20px] ring-1 ring-white/50 ring-inset" />

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center p-2.5">
            <motion.div
              className="relative w-full h-full"
              animate={{
                scale: isPressed ? 0.9 : isHovered ? 1.06 : 1,
                y: isHovered ? -2 : 0,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl blur-xl"
                animate={{ opacity: isHovered ? 0.35 : 0 }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.45), transparent 70%)",
                }}
              />
              <img
                src={skill.logo}
                alt={skill.name}
                className="relative w-full h-full object-contain drop-shadow-md"
              />
            </motion.div>
          </div>

          {/* Inner shadow */}
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
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="mt-1.5 text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl"
      >
        {skill.name}
      </motion.div>
    </motion.button>
  );
};

export default SkillKeycap;
