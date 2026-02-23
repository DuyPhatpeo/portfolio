// src/components/project/OtherProjectCard.tsx
import { FiExternalLink, FiGithub, FiFolder } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../../data/projectData";
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
        bg-tech-bg/60 backdrop-blur-sm border border-tech-teal/30
        p-7 h-full flex flex-col
        transition-all duration-300
        hover:bg-tech-bg/80 hover:border-tech-teal hover:shadow-[0_0_20px_rgba(68,187,164,0.15)]
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
        clipPath:
          "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
      }}
    >
      {/* HUD Corner Decor */}
      <div
        className="absolute top-0 right-0 w-12 h-12 bg-tech-teal/5 transition-colors group-hover:bg-tech-teal/20"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-12 h-12 bg-tech-teal/5 transition-colors group-hover:bg-tech-teal/20"
        style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
      ></div>

      {/* HEADER */}
      <div className="flex justify-between items-start mb-6 border-b border-tech-teal/20 pb-4 relative z-10">
        <FiFolder
          size={36}
          strokeWidth={1.5}
          className="text-tech-teal transition-colors drop-shadow-[0_0_5px_rgba(68,187,164,0.5)]"
        />

        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 bg-tech-bg border border-tech-teal/40
                text-tech-light hover:text-tech-teal hover:border-tech-teal hover:shadow-[0_0_8px_rgba(68,187,164,0.4)]
                transition-all duration-200
              "
              style={{
                clipPath:
                  "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
              }}
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
                p-2 bg-tech-bg border border-tech-teal/40
                text-tech-light hover:text-tech-teal hover:border-tech-teal hover:shadow-[0_0_8px_rgba(68,187,164,0.4)]
                transition-all duration-200
              "
              style={{
                clipPath:
                  "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
              }}
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-bold font-mono tracking-tight mb-3 text-tech-light group-hover:text-tech-teal transition-colors relative z-10">
        &gt; {t(`projects.items.${project.id}.title`)}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm font-mono leading-relaxed text-tech-light/70 relative z-10">
        {t(`projects.items.${project.id}.description`)}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-3 mt-auto pt-8 relative z-10">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-tech-teal border border-tech-teal/20 bg-tech-teal/5 px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
