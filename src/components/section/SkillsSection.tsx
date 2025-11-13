import { useState } from "react";
import { skills } from "../../data/skillsData";

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [pressedSkill, setPressedSkill] = useState<string | null>(null);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-snug md:leading-snug bg-clip-text text-transparent bg-primary mb-4">
          Skills
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-5xl mx-auto px-2 md:px-0">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="relative flex items-center justify-center cursor-pointer group"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => {
              setHoveredSkill(null);
              setPressedSkill(null);
            }}
            onMouseDown={() => setPressedSkill(skill.name)}
            onMouseUp={() => setPressedSkill(null)}
          >
            {/* Tooltip */}
            <div
              className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs font-semibold px-3 py-1 rounded-md pointer-events-none z-50 transition-opacity duration-200 whitespace-nowrap ${
                hoveredSkill === skill.name ? "opacity-100" : "opacity-0"
              }`}
            >
              {skill.name}
            </div>

            {/* Keycap Container */}
            <div className="relative w-25 h-25">
              {/* Keycap Base */}
              <div
                className={`absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-400 rounded-3xl transform transition-all duration-100 ${
                  pressedSkill === skill.name
                    ? "translate-y-0"
                    : "translate-y-1"
                }`}
              ></div>

              {/* Keycap Top */}
              <div
                className={`absolute inset-0 bg-gradient-to-b from-white to-gray-100 rounded-3xl shadow-lg transform transition-all duration-100 flex items-center justify-center p-2 ${
                  pressedSkill === skill.name
                    ? "translate-y-0.5 shadow-sm"
                    : hoveredSkill === skill.name
                    ? "translate-y-0 shadow-xl"
                    : "-translate-y-1"
                }`}
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className={`w-full h-full object-contain transition-all duration-100 ${
                    pressedSkill === skill.name ? "scale-95" : "scale-100"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
