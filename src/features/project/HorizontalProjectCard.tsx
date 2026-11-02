"use client";

// src/features/project/HorizontalProjectCard.tsx
import { useTranslation } from "react-i18next";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import type { Project } from "@/types/data";
import ProjectPreview from "@components/ui/ProjectPreview";

interface HorizontalProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function HorizontalProjectCard({
  project,
  onSelect,
}: HorizontalProjectCardProps) {
  const { t } = useTranslation();

  return (
    <article
      data-project-card
      onClick={() => onSelect(project)}
      className="group relative w-[82vw] xs:w-[320px] sm:w-[400px] md:w-[460px] lg:w-[480px] h-[420px] sm:h-[480px] shrink-0 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors duration-300 overflow-hidden cursor-pointer flex flex-col select-none"
    >
      {/* Top Media Area with GSAP scroll preview */}
      <div className="relative w-full h-[52%] sm:h-[54%] overflow-hidden bg-muted/40 border-b border-border/70 shrink-0">
        <ProjectPreview
          image={project.image}
          previewImage={project.previewImage}
          alt={t(`projects.items.${project.id}.title`)}
        />

        {/* Badge */}
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          {project.featured ? (
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-mono text-xs font-medium">
              {t("projects.badges.featured")}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-background/85 backdrop-blur-sm border border-border text-foreground font-mono text-xs font-medium">
              {t("projects.badges.project", "Project")}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="relative z-10 p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-sans font-bold text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {t(`projects.items.${project.id}.title`)}
          </h3>

          <p className="mt-2.5 text-muted-foreground text-base leading-relaxed line-clamp-2 max-w-[48ch]">
            {t(`projects.items.${project.id}.description`)}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground font-mono text-xs"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-mono text-xs">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 mt-2 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-primary text-xs font-medium group-hover:translate-x-1 transition-transform duration-200">
            <span>{t("projects.modal.view_details")}</span>
            <FiArrowRight className="text-sm" />
          </div>

          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                title="View Source Code"
                aria-label="View Source Code"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-foreground transition-colors"
              >
                <FiGithub className="text-base" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
                aria-label="Live Demo"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-foreground transition-colors"
              >
                <FiExternalLink className="text-base" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
