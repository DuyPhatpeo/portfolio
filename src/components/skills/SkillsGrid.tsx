import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../../data/skillsData.tsx";
import SkillKeycap from "./SkillKeycap";

// Container điều khiển xuất hiện từng item
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // 👈 tốc độ từng cái
    },
  },
};

// Item animation: từ dưới lên
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function SkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [pressedSkill, setPressedSkill] = useState<string | null>(null);

  return (
    <motion.div
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }} // 👈 scroll tới mới chạy
    >
      {skills.map((skill) => (
        <motion.div key={skill.name} variants={itemVariants}>
          <SkillKeycap
            skill={skill}
            hoveredSkill={hoveredSkill}
            pressedSkill={pressedSkill}
            setHoveredSkill={setHoveredSkill}
            setPressedSkill={setPressedSkill}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
