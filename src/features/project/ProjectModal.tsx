// src/features/project/ProjectModal.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiGithub, FiMonitor, FiX, FiExternalLink } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import type { Project } from "@/types/data";
import { TECH_ICONS } from "@constants/technologies";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useTranslation();

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
        {/* Modal Header with macOS styled window controls */}
        <div className="relative z-50 w-full flex items-center justify-between px-5 sm:px-7 py-4 bg-background/80 backdrop-blur-md border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <span className="hidden sm:inline-block font-mono text-xs text-muted-foreground border-l border-border pl-3">
              ~/project/{project.id}
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 h-9 px-3.5 bg-primary text-primary-foreground hover:opacity-90 rounded-lg font-mono text-xs font-medium transition-opacity duration-200"
              >
                <span>{t("common.links.live", "Live Demo")}</span>
                <FiExternalLink className="text-sm" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 h-9 px-3.5 bg-muted hover:bg-muted/80 text-foreground border border-border rounded-lg font-mono text-xs font-medium transition-colors duration-200"
              >
                <FiGithub className="text-sm" />
                <span className="hidden sm:inline">{t("common.links.source", "GitHub")}</span>
              </a>
            )}

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="group w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-destructive/15 border border-border hover:border-destructive/40 text-muted-foreground hover:text-destructive transition-colors duration-200 cursor-pointer"
            >
              <FiX className="w-4 h-4 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col flex-1 overflow-y-auto p-5 sm:p-7 md:p-9 space-y-8">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
            {/* 1. Browser Mockup Window with Preview Image */}
            <div className="w-full rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
              <div className="h-9 bg-muted/60 border-b border-border/80 px-4 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="flex-1 max-w-sm mx-auto h-5 bg-background/60 rounded-md flex items-center justify-center px-3 text-[11px] font-mono text-muted-foreground truncate">
                  {project.demo || "https://portfolio-project.local"}
                </div>
              </div>
              <img
                src={project.image}
                alt={t(`projects.items.${project.id}.title`)}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>

            {/* 2. Project Title & Overview */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3
                  id="project-modal-title"
                  className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-foreground tracking-tight"
                >
                  {t(`projects.items.${project.id}.title`)}
                </h3>

                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/25 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {t("projects.badges.featured", "Dự án tiêu biểu")}
                  </span>
                )}
              </div>

              <p className="text-foreground/90 text-base sm:text-lg md:text-xl leading-relaxed">
                {t(`projects.items.${project.id}.description`)}
              </p>
            </div>

            {/* 3. Technology Badges with Icons */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t("projects.modal.technologies", "Công nghệ sử dụng")}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag) => {
                  const Icon = TECH_ICONS[tag];
                  return (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-muted text-foreground/90 font-mono text-xs sm:text-sm border border-border/70 hover:border-primary/50 transition-colors"
                    >
                      {Icon && <Icon className="w-4 h-4 text-primary shrink-0" />}
                      <span>{tag}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* 4. Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-border/60">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 h-12 px-7 bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200 rounded-xl font-medium text-base shadow-[0_4px_16px_rgba(var(--primary-rgb,45,212,191),0.25)]"
                >
                  <FiMonitor className="text-lg" />
                  <span>{t("common.links.live", "Trải nghiệm trực tiếp")}</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 h-12 px-7 bg-card hover:bg-muted border border-border hover:border-primary/50 rounded-xl font-medium text-base text-foreground transition-colors duration-200"
                >
                  <FiGithub className="text-lg" />
                  <span>{t("common.links.source", "Xem mã nguồn")}</span>
                </a>
              )}
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
