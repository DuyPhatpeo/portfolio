import ProjectPreview from "@components/ui/ProjectPreview";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/types/data";
import TechIcon from "@components/ui/TechIcon";

interface FeaturedProjectRowProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export default function FeaturedProjectRow({
  project,
  index,
  onSelect,
}: FeaturedProjectRowProps) {
  const { t } = useTranslation();
  const reverse = index % 2 === 1;

  return (
    <article
      data-featured-row
      onClick={() => onSelect(project)}
      className={`group cursor-pointer flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-7 lg:gap-12 will-change-transform`}
    >
      {/* Preview Frame with smooth vertical scroll preview on hover */}
      <div className="relative w-full lg:w-7/12 aspect-[16/10] overflow-hidden rounded-2xl bg-card border border-border group-hover:border-primary/50 transition-colors duration-300">
        <ProjectPreview
          image={project.image}
          previewImage={project.previewImage}
          alt={t(`projects.items.${project.id}.title`)}
        />
      </div>

      {/* Editorial Details */}
      <div className="w-full lg:w-5/12 flex flex-col items-start text-left">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200 mb-4 leading-snug">
          {t(`projects.items.${project.id}.title`)}
        </h3>

        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed line-clamp-4 max-w-[48ch] mb-6">
          {t(`projects.items.${project.id}.description`)}
        </p>

        {/* Tech Tags with Authentic Brand Logos */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card/85 text-foreground font-mono text-xs sm:text-sm border border-border/70 shadow-2xs"
            >
              <TechIcon name={tag} className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
          <span>{t("projects.modal.view_details", "Xem chi tiết")}</span>
          <FiArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}
