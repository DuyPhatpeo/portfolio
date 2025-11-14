import { useState } from "react";
import { skills } from "../../data/skillsData";
import { motion, useMotionValue, useTransform } from "framer-motion";

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [pressedSkill, setPressedSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Skills
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {skills.map((skill) => {
          const x = useMotionValue(0);
          const y = useMotionValue(0);
          const rotateX = useTransform(y, [-50, 50], [15, -15]);
          const rotateY = useTransform(x, [-50, 50], [-15, 15]);

          return (
            <div
              key={skill.name}
              className="relative flex flex-col items-center justify-center cursor-pointer"
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
                const rect = (
                  e.currentTarget as HTMLDivElement
                ).getBoundingClientRect();
                const px = e.clientX - rect.left - rect.width / 2;
                const py = e.clientY - rect.top - rect.height / 2;
                x.set(px);
                y.set(py);
              }}
            >
              {/* Keycap */}
              <motion.div
                className="relative w-24 h-24"
                style={{ perspective: 600 }}
              >
                {/* Base */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-400 rounded-3xl"
                  animate={{ y: pressedSkill === skill.name ? 4 : 6 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                {/* Top */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 rounded-3xl shadow-lg flex items-center justify-center p-3"
                  style={{ rotateX, rotateY }}
                  animate={{
                    scale: pressedSkill === skill.name ? 0.95 : 1,
                    y: pressedSkill === skill.name ? 4 : 0,
                    boxShadow:
                      hoveredSkill === skill.name
                        ? "0 20px 30px rgba(0,0,0,0.25)"
                        : "0 10px 20px rgba(0,0,0,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <motion.img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                    animate={{ scale: pressedSkill === skill.name ? 0.95 : 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              </motion.div>

              {/* Tooltip (nằm dưới keycap để không che logo) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: hoveredSkill === skill.name ? 1 : 0,
                  y: hoveredSkill === skill.name ? 8 : -10, // cách keycap 8px
                }}
                transition={{ duration: 0.2 }}
                className="mt-2 bg-gray-900/90 text-white text-xs font-semibold px-3 py-1 rounded-md pointer-events-none whitespace-nowrap"
              >
                {skill.name}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;
