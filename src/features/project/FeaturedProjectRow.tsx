import ProjectPreview from "@components/ui/ProjectPreview";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/types/data";

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
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const reverse = index % 2 === 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={rowRef}
      onClick={() => onSelect(project)}
      className={`group cursor-pointer flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-7 lg:gap-12 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Preview Frame (no image hover scale, preserves smooth vertical scroll preview) */}
      <div className="relative w-full lg:w-7/12 aspect-[16/10] overflow-hidden rounded-2xl bg-card border border-border group-hover:border-primary/50 transition-colors duration-300">
        <ProjectPreview
          image={project.image}
          previewImage={project.previewImage}
          alt={t(`projects.items.${project.id}.title`)}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3.5 left-3.5 bg-background/90 backdrop-blur-sm border border-border text-foreground font-mono text-sm font-medium px-4 py-1.5 rounded-full z-10">
          {t("projects.badges.featured")}
        </span>
      </div>

      {/* Editorial Details */}
      <div className="w-full lg:w-5/12 flex flex-col items-start text-left">
        <span className="font-mono text-base text-primary mb-2.5 select-none">
          0{index + 1}
        </span>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200 mb-4 leading-snug">
          {t(`projects.items.${project.id}.title`)}
        </h3>

        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed line-clamp-4 max-w-[48ch] mb-6">
          {t(`projects.items.${project.id}.description`)}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-md bg-muted text-muted-foreground font-mono text-sm sm:text-base"
            >
              {tag}
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
