import { FiExternalLink, FiGithub, FiFolder } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../../types/data";
import { useTranslation } from "react-i18next";

interface OtherProjectCardProps {
  project: Project;
  index: number;
}

export default function OtherProjectCard({
  project,
  index,
}: OtherProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        group relative
        bg-card/60 backdrop-blur-sm border border-primary/30
        p-7 h-full flex flex-col
        transition-all duration-300
        hover:bg-card/80 hover:border-primary hover:cyber-glow
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        cyber-chamfer
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* HUD Corner Decor */}
      <div
        className="absolute top-0 right-0 w-12 h-12 bg-primary/5 transition-colors group-hover:bg-primary/20"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-12 h-12 bg-primary/5 transition-colors group-hover:bg-primary/20"
        style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
      ></div>

      {/* HEADER */}
      <div className="flex justify-between items-start mb-6 border-b border-primary/20 pb-4 relative z-10">
        <FiFolder
          size={36}
          strokeWidth={1.5}
          className="text-primary transition-colors drop-shadow-[0_0_5px_var(--primary)]"
        />

        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 bg-card border border-primary/40
                text-foreground hover:text-primary hover:border-primary hover:cyber-glow-sm
                transition-all duration-200 cyber-chamfer
              "
            >
              <FiGithub size={18} />
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 bg-card border border-primary/40
                text-foreground hover:text-primary hover:border-primary hover:cyber-glow-sm
                transition-all duration-200 cyber-chamfer
              "
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-bold font-sans tracking-tight mb-3 text-foreground group-hover:text-primary transition-colors relative z-10">
        {t(`projects.items.${project.id}.title`)}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm font-mono leading-relaxed text-foreground/70 relative z-10">
        {t(`projects.items.${project.id}.description`)}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-3 mt-auto pt-8 relative z-10">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
