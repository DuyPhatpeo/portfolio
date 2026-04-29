import { useState } from "react";
import { skills } from "../../constants/skillsData.tsx";
import SkillNode from "./SkillNode.tsx";
import type { Skill } from "../../types/data";

const MarqueeRow = ({
  items,
  reverse = false,
  hoveredSkill,
  pressedSkill,
  setHoveredSkill,
  setPressedSkill,
}: {
  items: Skill[];
  reverse?: boolean;
  hoveredSkill: string | null;
  pressedSkill: string | null;
  setHoveredSkill: (name: string | null) => void;
  setPressedSkill: (name: string | null) => void;
}) => {
  return (
    <div className="flex w-full overflow-hidden group [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex gap-6 sm:gap-8 md:gap-12 w-max shrink-0 py-6 px-4 hover:[animation-play-state:paused] ${
          reverse ? "animate-[marquee-x-reverse_40s_linear_infinite]" : "animate-[marquee-x_40s_linear_infinite]"
        }`}
      >
        {/* Triplicate for seamless infinite loop */}
        {[...items, ...items, ...items].map((skill, idx) => (
          <div key={`${skill.name}-${idx}`} className="flex items-center justify-center shrink-0">
            <SkillNode
              skill={skill}
              hoveredSkill={hoveredSkill}
              pressedSkill={pressedSkill}
              setHoveredSkill={setHoveredSkill}
              setPressedSkill={setPressedSkill}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [pressedSkill, setPressedSkill] = useState<string | null>(null);

  // Split skills into two rows
  const half = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, half);
  const row2 = skills.slice(half);

  return (
    <div className="flex flex-col gap-2 sm:gap-4 w-full max-w-7xl mx-auto overflow-hidden">
      <MarqueeRow
        items={row1}
        hoveredSkill={hoveredSkill}
        pressedSkill={pressedSkill}
        setHoveredSkill={setHoveredSkill}
        setPressedSkill={setPressedSkill}
      />
      <MarqueeRow
        items={row2}
        reverse={true}
        hoveredSkill={hoveredSkill}
        pressedSkill={pressedSkill}
        setHoveredSkill={setHoveredSkill}
        setPressedSkill={setPressedSkill}
      />
    </div>
  );
}
