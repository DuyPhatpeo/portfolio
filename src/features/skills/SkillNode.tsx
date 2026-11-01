import React from "react";
import type { Skill } from "@/types/data";
import { FiArrowUpRight } from "react-icons/fi";

interface SkillNodeProps {
  skill: Skill;
  className?: string;
}

const CATEGORY_TAG_COLORS: Record<string, string> = {
  frontend: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  backend: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  database: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  tools: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  design: "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

const SkillNode: React.FC<SkillNodeProps> = ({ skill, className = "" }) => {
  const badgeStyle = CATEGORY_TAG_COLORS[skill.category] || "text-muted-foreground bg-muted border-border/60";

  const content = (
    <>
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="relative w-10 h-10 rounded-xl bg-background/90 border border-border/80 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 group-hover:border-primary/50 shadow-sm transition-all duration-200">
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
              className: "w-full h-full text-foreground group-hover:text-primary transition-colors",
              style: { color: undefined },
            })
          )}
        </div>

        <div className="flex flex-col min-w-0 text-left">
          <span className="font-sans text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {skill.name}
          </span>
          <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border w-max mt-0.5 ${badgeStyle}`}>
            {skill.category}
          </span>
        </div>
      </div>

      <FiArrowUpRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 opacity-0 group-hover:opacity-100" />
    </>
  );

  const sharedClasses = `group relative flex items-center justify-between gap-3 px-3.5 py-3 min-h-[64px] rounded-2xl bg-card/75 backdrop-blur-md border border-border/70 hover:border-primary/50 hover:bg-card hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(var(--primary-rgb,45,212,191),0.1)] transition-all duration-200 cursor-pointer ${className}`;

  if (skill.url) {
    return (
      <a
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClasses}
      >
        {content}
      </a>
    );
  }

  return <div className={sharedClasses}>{content}</div>;
};

export default SkillNode;
