// src/features/project/ProjectModal.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiGithub, FiMonitor, FiX, FiExternalLink } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import type { Project } from "@/types/data";
import { TECH_ICONS } from "@constants/technologies";
import { skills } from "@constants/skillsData";
import Dock, { type DockItemData } from "@components/ui/Dock/Dock";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useTranslation();

  const techItems: DockItemData[] = project.tags.map((tag) => {
    const skill = skills.find((s) => s.name === tag);
    if (skill) {
      return {
        label: tag,
        icon: skill.logo ? (
          <img
            src={skill.logo}
            alt={tag}
            className={`w-full h-full p-2.5 object-contain ${
              skill.invertDark ? "dark:invert" : ""
            }`}
          />
        ) : (
          skill.icon?.({ className: "w-full h-full p-2.5 text-primary" })
        ),
      };
    }
    const Icon = TECH_ICONS[tag];
    return {
      label: tag,
      icon: Icon ? (
        <Icon className="w-full h-full p-2.5 text-primary" />
      ) : (
        <span className="text-xs">{tag[0]}</span>
      ),
    };
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const gallery =
    (project as Project & { gallery?: { title?: string; image: string }[] })
      .gallery || [];

  const modalContent = (
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/75 backdrop-blur-sm transition-all"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-4xl lg:max-w-5xl max-h-[88vh] bg-popover/95 backdrop-blur-xl border border-border shadow-2xl flex flex-col rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative z-50 w-full flex items-center justify-between px-5 sm:px-7 py-4 bg-background/60 border-b border-border shrink-0">
          <div className="flex-1 min-w-0 pr-4">
            <h3
              id="project-modal-title"
              className="text-xl sm:text-2xl md:text-3xl font-sans font-bold text-foreground tracking-tight truncate"
            >
              {t(`projects.items.${project.id}.title`)}
            </h3>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 h-10 px-4 bg-primary/12 hover:bg-primary text-primary hover:text-primary-foreground rounded-lg font-mono text-xs font-medium transition-colors duration-200"
              >
                <span className="hidden sm:inline">
                  {t("common.links.live", "Live Demo")}
                </span>
                <FiExternalLink className="text-sm" />
              </a>
            )}

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="group w-10 h-10 flex items-center justify-center rounded-lg bg-muted hover:bg-destructive/15 border border-border hover:border-destructive/40 text-muted-foreground hover:text-destructive transition-colors duration-200 cursor-pointer"
            >
              <FiX className="w-5 h-5 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
          <div className="max-w-4xl mx-auto w-full flex flex-col">
            {/* 1. Tech Stack */}
            <div className="mb-8 shrink-0">
              <span className="text-muted-foreground font-mono text-base block mb-3">
                {t("projects.modal.technologies", "Technologies Used")}
              </span>
              <div className="-ml-2 max-w-full overflow-x-auto pb-2">
                <Dock items={techItems} baseItemSize={52} magnification={68} />
              </div>
            </div>

            {/* 2. Description */}
            <div className="mb-8 shrink-0">
              {project.featured && (
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-mono font-medium bg-primary/12 text-primary border border-primary/25 rounded-full">
                  {t("projects.badges.featured", "Featured Project")}
                </span>
              )}

              <p className="text-foreground/90 text-lg sm:text-xl leading-relaxed max-w-[60ch]">
                {t(`projects.items.${project.id}.description`)}
              </p>
            </div>

            {/* 3. Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 min-h-13 px-8 py-3.5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200 rounded-xl font-medium text-base sm:text-lg"
                >
                  <FiMonitor className="text-lg" />
                  <span>{t("common.links.live", "Live Demo")}</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 min-h-13 px-8 py-3.5 bg-muted hover:bg-muted/80 border border-border rounded-xl font-medium text-base sm:text-lg text-foreground transition-colors duration-200"
                >
                  <FiGithub className="text-lg" />
                  <span>{t("common.links.source", "Source Code")}</span>
                </a>
              )}
            </div>

            {/* 4. Main Preview Image (no hover zoom transform) */}
            <div className="w-full rounded-xl overflow-hidden border border-border bg-muted/30 mb-8">
              <img
                src={project.image}
                alt={t(`projects.items.${project.id}.title`)}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* 5. Optional Gallery */}
            {gallery.length > 0 && (
              <div className="flex flex-col gap-6 mb-4">
                <h4 className="text-foreground font-sans font-semibold text-lg tracking-tight">
                  {t("projects.modal.screenshots", "Screenshots")}
                </h4>
                {gallery.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    {item.title && (
                      <span className="text-muted-foreground font-mono text-xs">
                        {item.title}
                      </span>
                    )}
                    <div className="w-full rounded-xl overflow-hidden border border-border bg-muted/30">
                      <img
                        src={item.image}
                        alt={item.title || "Project Screenshot"}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
