import React from "react";

export interface Skill {
  name: string;
  logo?: string;
  invertDark?: boolean;
  icon?: (props: {
    className?: string;
    style?: React.CSSProperties;
  }) => React.ReactNode;
  url?: string;
}

interface SkillNodeProps {
  skill: Skill;
  className?: string;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, className = "" }) => {
  const content = (
    <>
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 group-hover:border-primary/40 transition-all duration-200">
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

      <span className="font-sans text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors truncate">
        {skill.name}
      </span>
    </>
  );

  const sharedClasses = `group relative flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 min-h-[52px] sm:min-h-[58px] rounded-xl bg-card/70 backdrop-blur-sm border border-border/70 hover:border-primary/50 hover:bg-card hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(var(--primary-rgb,45,212,191),0.08)] transition-all duration-200 cursor-default ${className}`;

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
