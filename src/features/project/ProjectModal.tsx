"use client";

import React from "react";
import { FiGithub, FiMonitor, FiExternalLink } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import type { Project } from "@/types/data";
import TechIcon from "@components/ui/TechIcon";
import Dock, { type DockItemData } from "@components/ui/Dock";
import GlassSurface from "@components/ui/GlassSurface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useTranslation();

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

  const dockItems: DockItemData[] = React.useMemo(
    () =>
      (project.tags || []).map((tag) => ({
        icon: (
          <TechIcon
            name={tag}
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
          />
        ),
        label: tag,
      })),
    [project.tags]
  );

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] md:w-[90vw] max-w-4xl lg:max-w-5xl max-h-[92dvh] sm:max-h-[88vh] p-0 overflow-hidden flex flex-col bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl sm:rounded-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{t(`projects.items.${project.id}.title`)}</DialogTitle>
          <DialogDescription>
            {t(`projects.items.${project.id}.description`)}
          </DialogDescription>
        </DialogHeader>

        {/* Modal Top Actions */}
        <div className="relative z-20 w-full flex items-center justify-between pl-4 sm:pl-6 md:pl-8 pr-16 sm:pr-20 md:pr-24 py-3 sm:py-3.5 bg-background/80 backdrop-blur-md border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none">
              {project.featured
                ? t("projects.badges.featured", "Dự án tiêu biểu")
                : t("projects.badges.project", "Chi tiết dự án")}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 h-8 sm:h-9 px-3 sm:px-4 bg-primary text-primary-foreground hover:opacity-95 rounded-full font-mono text-xs font-medium transition-all shadow-sm"
              >
                <span>{t("common.links.live", "Live Demo")}</span>
                <FiExternalLink className="text-xs sm:text-sm" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 h-8 sm:h-9 px-3 sm:px-3.5 bg-muted hover:bg-muted/80 text-foreground border border-border rounded-full font-mono text-xs font-medium transition-colors duration-200"
              >
                <FiGithub className="text-xs sm:text-sm" />
                <span className="hidden sm:inline">
                  {t("common.links.source", "GitHub")}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 [scrollbar-width:thin]">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-5 sm:gap-6">
            {/* 1. Project Preview Image */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] max-h-[260px] sm:max-h-[380px] md:max-h-[480px] rounded-xl sm:rounded-2xl overflow-hidden border border-border shadow-lg bg-card shrink-0">
              <img
                src={project.previewImage || project.image}
                alt={t(`projects.items.${project.id}.title`)}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* 2. Project Title & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-foreground tracking-tight">
                {t(`projects.items.${project.id}.title`)}
              </h3>

              {project.featured && (
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-mono font-medium bg-primary/10 text-primary border-primary/25 rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {t("projects.badges.featured", "Dự án tiêu biểu")}
                </Badge>
              )}
            </div>

            {/* 3. Technologies Used - Interactive React Bits Dock */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t("projects.modal.technologies", "Công nghệ sử dụng")}
              </span>
              <div className="relative w-full pt-12 pb-4 flex items-center justify-start overflow-visible">
                <Dock
                  items={dockItems}
                  position="relative"
                  baseItemSize={52}
                  magnification={76}
                  distance={140}
                  panelHeight={68}
                  gap={10}
                  roundness={0.65}
                  theme="dark"
                  bounce={true}
                  showLabels={true}
                  showIndicators={false}
                  showBadges={false}
                  className="!relative !left-0 !bottom-0 !transform-none"
                />
              </div>
            </div>

            {/* 4. Description & Functional Highlights */}
            <div className="flex flex-col gap-4 pt-4 border-t border-border/60">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t("projects.modal.overview", "Mô tả dự án")}
              </span>

              <p className="text-foreground/90 text-sm sm:text-base md:text-lg leading-relaxed">
                {t(`projects.items.${project.id}.description`)}
              </p>

              {/* Functional Features */}
              {caseStudy &&
                caseStudy.sections &&
                caseStudy.sections.length > 0 && (
                  <div className="flex flex-col gap-2.5 mt-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {t("projects.modal.features", "Chức năng chính")}
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {caseStudy.sections.map((sec, idx) => (
                        <GlassSurface
                          key={idx}
                          borderRadius={14}
                          blur={12}
                          opacity={0.8}
                          className="p-3.5 sm:p-4 md:p-5 bg-card/60 border border-border/70 flex flex-col gap-1.5"
                        >
                          <h5 className="text-sm sm:text-base font-sans font-bold text-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span>{sec.heading}</span>
                          </h5>
                          <div className="text-muted-foreground text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-3.5">
                            {sec.content}
                          </div>
                        </GlassSurface>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* 5. Action Buttons (Responsive flex-col on mobile) */}
            {(project.demo || project.github) && (
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/60">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-7 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:opacity-95 shadow-[0_0_20px_rgba(217,255,58,0.35)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-7 rounded-full bg-card hover:bg-muted border border-border hover:border-primary/60 text-foreground hover:text-primary font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <FiGithub className="text-base" />
                    <span>{t("common.links.source", "Xem mã nguồn")}</span>
                  </a>
                )}
              </div>
            )}

            {/* 6. Optional Gallery */}
            {gallery.length > 0 && (
              <div className="flex flex-col gap-4 sm:gap-6 mb-4">
                <h4 className="text-foreground font-sans font-semibold text-base sm:text-lg tracking-tight">
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
      </DialogContent>
    </Dialog>
  );
}
