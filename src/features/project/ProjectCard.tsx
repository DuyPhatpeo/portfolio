import ProjectPreview from "@components/ui/ProjectPreview";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/types/data";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({
  project,
  index,
  onSelect,
}: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      onClick={() => onSelect(project)}
      className={`group relative overflow-hidden cursor-pointer rounded-2xl bg-card border border-border hover:border-primary/50 flex flex-col transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        transitionDelay: `${(index % 3) * 60}ms`,
      }}
    >
      {/* Top Preview Viewport (no hover scale transform on img; full-page GSAP scroll preview remains active) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted/40 border-b border-border/70 shrink-0">
        <ProjectPreview
          image={project.image}
          previewImage={project.previewImage}
          alt={t(`projects.items.${project.id}.title`)}
          className="block w-full h-full object-cover"
        />
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <h3 className="font-sans font-semibold text-foreground tracking-tight leading-snug line-clamp-2 text-xl sm:text-2xl group-hover:text-primary transition-colors">
              {t(`projects.items.${project.id}.title`)}
            </h3>
            <FiArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed line-clamp-3 max-w-[50ch]">
            {t(`projects.items.${project.id}.description`)}
          </p>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 pt-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-md bg-muted text-muted-foreground font-mono text-sm"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground font-mono text-sm">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
