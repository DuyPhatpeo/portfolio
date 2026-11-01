// src/features/project/ProjectModal.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiGithub, FiMonitor, FiX, FiExternalLink } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import type { Project } from "@/types/data";
import TechIcon from "@components/ui/TechIcon";

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

  interface CaseStudyData {
    eyebrow?: string;
    title?: string;
    summary?: string;
    metrics?: { label: string; value: string }[];
    sections?: { heading: string; content: string }[];
  }

  const caseStudy = t(`projects.items.${project.id}.case_study`, {
    returnObjects: true,
    defaultValue: null,
  }) as CaseStudyData | null;

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
        <div className="relative z-50 w-full flex items-center justify-end px-5 sm:px-7 py-3.5 bg-background/80 backdrop-blur-md border-b border-border shrink-0">
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
        <div className="flex flex-col flex-1 overflow-y-auto p-5 sm:p-7 md:p-9 space-y-7">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 sm:gap-7">
            {/* 1. Project Preview Image (Top Section) */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] max-h-[480px] rounded-2xl overflow-hidden border border-border shadow-xl bg-card">
              <img
                src={project.previewImage || project.image}
                alt={t(`projects.items.${project.id}.title`)}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* 2. Project Title */}
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

            {/* 3. Technologies Used */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t("projects.modal.technologies", "Công nghệ sử dụng")}
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/90 border border-border/80 hover:border-primary/40 text-foreground font-mono text-xs sm:text-sm transition-colors shadow-xs"
                  >
                    <TechIcon name={tag} className="w-4 h-4 shrink-0" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Description & Functional Highlights (Bottom Section) */}
            <div className="flex flex-col gap-4 pt-4 border-t border-border/60">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t("projects.modal.overview", "Mô tả dự án")}
              </span>

              <p className="text-foreground/90 text-base sm:text-lg leading-relaxed">
                {t(`projects.items.${project.id}.description`)}
              </p>

              {/* Functional Features & Capabilities */}
              {caseStudy && caseStudy.sections && caseStudy.sections.length > 0 && (
                <div className="flex flex-col gap-3 mt-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {t("projects.modal.features", "Chức năng chính")}
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {caseStudy.sections.map((sec, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-xl bg-card/40 border border-border/60 flex flex-col gap-1.5"
                      >
                        <h5 className="text-sm sm:text-base font-sans font-bold text-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>{sec.heading}</span>
                        </h5>
                        <div className="text-muted-foreground text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-3.5">
                          {sec.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Action Buttons */}
            {(project.demo || project.github) && (
              <div className="flex flex-wrap gap-3.5 pt-4 border-t border-border/60">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl font-medium text-sm sm:text-base shadow-sm"
                  >
                    <FiMonitor className="text-base" />
                    <span>{t("common.links.live", "Trải nghiệm trực tiếp")}</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-card hover:bg-muted border border-border hover:border-primary/50 rounded-xl font-medium text-sm sm:text-base text-foreground transition-colors"
                  >
                    <FiGithub className="text-base" />
                    <span>{t("common.links.source", "Xem mã nguồn")}</span>
                  </a>
                )}
              </div>
            )}

            {/* 6. Optional Gallery */}
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
                    <div className="w-full aspect-[16/10] max-h-[460px] rounded-xl overflow-hidden border border-border bg-muted/30">
                      <img
                        src={item.image}
                        alt={item.title || "Project Screenshot"}
                        className="w-full h-full object-cover object-top"
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
