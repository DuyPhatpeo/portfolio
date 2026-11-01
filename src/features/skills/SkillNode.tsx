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
      <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
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
            style: { color: undefined },
          })
        )}
      </div>

      <span className="font-sans text-base sm:text-lg font-medium text-foreground truncate">
        {skill.name}
      </span>
    </>
  );

  const sharedClasses = `group relative flex items-center gap-3.5 px-4.5 py-4 min-h-14 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors duration-200 ${className}`;

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
