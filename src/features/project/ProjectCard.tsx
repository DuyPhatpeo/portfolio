import ProjectPreview from "@components/ui/ProjectPreview";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/types/data";

interface ProjectCardProps {
  project: Project;
  index?: number;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onSelect,
}: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <article
      data-project-card
      onClick={() => onSelect(project)}
      className="group relative overflow-hidden cursor-pointer rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/50 flex flex-col transition-colors duration-200 will-change-transform"
    >
      {/* Top Preview Viewport (full-page GSAP scroll preview remains active) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted/40 border-b border-border/70 shrink-0">
        <ProjectPreview
          image={project.image}
          previewImage={project.previewImage}
          alt={t(`projects.items.${project.id}.title`)}
          className="block w-full h-full object-cover"
        />
      </div>

      {/* Card Body tuned for 2-col mobile / 3-col tablet / 4-col desktop */}
      <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between gap-2.5 sm:gap-3.5">
        <div>
          <div className="flex items-start justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <h3 className="font-sans font-semibold text-foreground tracking-tight leading-snug line-clamp-2 text-sm sm:text-base lg:text-[17px] group-hover:text-primary transition-colors">
              {t(`projects.items.${project.id}.title`)}
            </h3>
            <FiArrowUpRight className="hidden sm:block w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-0.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
            {t(`projects.items.${project.id}.description`)}
          </p>
        </div>

        {/* Responsive Tech Tags: 2 tags on 2-col mobile, 3 tags on tablet/desktop */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-muted text-muted-foreground font-mono text-xs truncate max-w-full"
            >
              {tag}
            </span>
          ))}
          {project.tags[2] && (
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-mono text-xs truncate max-w-full">
              {project.tags[2]}
            </span>
          )}
          {project.tags.length > 2 && (
            <span className="sm:hidden px-2 py-0.5 rounded-md bg-muted/70 text-muted-foreground font-mono text-xs">
              +{project.tags.length - 2}
            </span>
          )}
          {project.tags.length > 3 && (
            <span className="hidden sm:inline-block px-2 py-1 rounded-md bg-muted/70 text-muted-foreground font-mono text-xs">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
