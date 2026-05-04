import { FiExternalLink, FiGithub } from "react-icons/fi";
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
        group relative flex flex-col h-full overflow-hidden
        border border-border/50 hover:border-primary/40
        bg-[var(--background-alt)] hover:bg-transparent
        transition-all duration-500
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={t(`projects.items.${project.id}.title`)}
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
        {/* Subtle dim overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>

        {/* Links Overlay */}
        <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background/50 backdrop-blur-md text-foreground hover:text-primary transition-colors"
            >
              <FiGithub size={18} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background/50 backdrop-blur-md text-foreground hover:text-primary transition-colors"
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1 text-left">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors text-left">
          {t(`projects.items.${project.id}.title`)}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3 text-left">
          {t(`projects.items.${project.id}.description`)}
        </p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4 border-t border-border justify-start">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-primary font-mono text-xs font-bold uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-muted-foreground/60 font-mono text-xs">
              + {project.tags.length - 3} MORE
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
