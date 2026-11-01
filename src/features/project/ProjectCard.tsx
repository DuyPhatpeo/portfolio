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

  const fullTitle = t(`projects.items.${project.id}.title`);
  const shortTitle = t(
    `projects.items.${project.id}.short_title`,
    fullTitle.includes(" — ") ? fullTitle.split(" — ")[0] : fullTitle
  );
  const category = t(
    `projects.items.${project.id}.category`,
    fullTitle.includes(" — ") ? fullTitle.split(" — ")[1] : project.tags[0] || "Web App"
  );

  return (
    <article
      data-project-card
      data-project-grid-card
      onClick={() => onSelect(project)}
      className="group relative w-full aspect-[16/10] overflow-hidden cursor-pointer rounded-2xl bg-card border border-border/70 hover:border-primary/60 transition-[border-color,box-shadow] duration-300 shadow-md will-change-transform"
    >
      {/* Full-bleed Preview Image (with smooth GSAP scroll preview on hover) */}
      <ProjectPreview
        image={project.image}
        previewImage={project.previewImage}
        alt={fullTitle}
      />

      {/* Floating Overlay: Title & Category directly over the image without background */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col items-start gap-1 pointer-events-none">
        <div className="w-full flex items-center justify-between gap-2">
          <h3 className="font-sans font-bold text-white tracking-tight leading-snug text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-1 drop-shadow-sm">
            {shortTitle}
          </h3>
          <FiArrowUpRight className="w-4 h-4 text-white/80 group-hover:text-primary shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <span className="text-[11px] sm:text-xs font-mono font-medium text-white/80 drop-shadow-sm">
          {category}
        </span>
      </div>
    </article>
  );
}
