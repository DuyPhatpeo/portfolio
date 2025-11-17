import React, { useState } from "react";
import { skills } from "../../data/skillsData";
import SkillKeycap from "./SkillKeycap";

const SkillsGrid: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [pressedSkill, setPressedSkill] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
      {skills.map((skill) => (
        <SkillKeycap
          key={skill.name}
          skill={skill}
          hoveredSkill={hoveredSkill}
          pressedSkill={pressedSkill}
          setHoveredSkill={setHoveredSkill}
          setPressedSkill={setPressedSkill}
        />
      ))}
    </div>
  );
};

export default SkillsGrid;
