import React, { useState } from "react";
import { skills } from "../../data/skillsData";

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-snug md:leading-snug bg-clip-text text-transparent bg-primary mb-4">
          Kỹ Năng
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-5xl mx-auto px-2 md:px-0">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="relative flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Tooltip */}
            <div
              className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs font-semibold px-3 py-1 rounded-md pointer-events-none z-50 transition-opacity duration-200 ${
                hoveredSkill === skill.name ? "opacity-100" : "opacity-0"
              }`}
            >
              {skill.name}
            </div>

            {/* Logo */}
            <img
              src={skill.logo}
              alt={skill.name}
              className={`w-16 h-16 object-contain transition-transform duration-300 ${
                hoveredSkill === skill.name ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
