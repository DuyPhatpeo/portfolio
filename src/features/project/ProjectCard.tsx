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

      {/* Card Body: Only Title + Arrow */}
      <div className="p-3.5 sm:p-4 lg:p-5 flex items-center justify-between gap-2 bg-card/60">
        <h3 className="font-sans font-semibold text-foreground tracking-tight leading-snug text-base sm:text-lg group-hover:text-primary transition-colors line-clamp-1">
          {t(`projects.items.${project.id}.title`)}
        </h3>
        <FiArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </article>
  );
}
