"use client";

import React from "react";
import { skills } from "@constants/skillsData";
import type { Skill } from "@/types/data";
import { FiArrowUpRight } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";

interface LargeSkillCardProps {
  skill: Skill;
}

const LargeSkillCard: React.FC<LargeSkillCardProps> = ({ skill }) => {
  const cardContent = (
    <div className="group relative w-full h-full pt-3.5 sm:pt-4 px-4 sm:px-5 pb-5 sm:pb-6 rounded-2xl sm:rounded-3xl bg-card/75 hover:bg-card border border-border/80 hover:border-primary/60 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[205px] sm:min-h-[235px] hover:-translate-y-1.5 cursor-pointer overflow-hidden">
      {/* Top Row: Category tag and External Link Arrow */}
      <div className="w-full flex items-center justify-between z-10 mb-2">
        <Badge
          variant="outline"
          className="px-2 py-0.5 rounded-md bg-muted/80 text-[10px] font-mono text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors border-0"
        >
          {skill.category}
        </Badge>
        <FiArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
      </div>

      {/* Center: Large High-Resolution Tech Logo */}
      <div className="my-auto py-2 flex flex-col items-center z-10">
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-300">
          {skill.logo ? (
            <img
              src={skill.logo}
              alt={skill.name}
              loading="lazy"
              className={`w-full h-full object-contain ${
                skill.invertDark ? "dark:invert" : ""
              }`}
            />
          ) : (
            skill.icon?.({
              className: "w-full h-full text-foreground",
            })
          )}
        </div>

        {/* Tech Name */}
        <h3 className="font-sans font-bold text-base sm:text-lg md:text-xl text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1">
          {skill.name}
        </h3>
      </div>
    </div>
  );

  if (skill.url) {
    return (
      <a
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        title={skill.name}
      >
        {cardContent}
      </a>
    );
  }

  return <div className="block h-full">{cardContent}</div>;
};

const SkillsGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
      {/* Grid of Skill Cards */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 md:gap-5">
        {skills.map((skill) => (
          <div key={skill.name}>
            <LargeSkillCard skill={skill} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsGrid;
