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
            className={`w-full h-full p-2.5 object-contain ${skill.invertDark ? "dark:invert" : ""}`}
          />
        ) : (
          skill.icon?.({ className: "w-full h-full p-2.5 text-primary" })
        ),
      };
    }
    const Icon = TECH_ICONS[tag];
    return {
      label: tag,
      icon: Icon ? <Icon className="w-full h-full p-2.5 text-primary" /> : <span className="text-xs">{tag[0]}</span>,
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

  // Handle gallery if provided in project data
  // @ts-ignore - Ignore type error if gallery is not in Project type yet
  const gallery = project.gallery || [];

  const modalContent = (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 md:p-6 pt-24 md:pt-28 bg-black/80 backdrop-blur-md transition-all"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* PREMIUM MODAL CONTAINER - VERTICAL LAYOUT */}
      <div
        className="relative w-full max-w-4xl lg:max-w-5xl h-[90vh] bg-[#0c0c0c] border border-white/10 shadow-[0_0_50px_rgba(33,241,168,0.15)] flex flex-col rounded-2xl md:rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP BAR / HEADER */}
        <div className="relative z-50 w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#111] border-b border-white/5 shrink-0">
          
          {/* Left: Project Title */}
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-base md:text-xl font-sans font-bold text-foreground uppercase tracking-widest truncate flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse hidden sm:block" />
              {t(`projects.items.${project.id}.title`)}
            </h3>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground rounded-lg font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300"
              >
                <span className="hidden sm:inline">{t("common.links.live", "Xem Web")}</span>
                <FiExternalLink className="text-sm sm:text-base" />
              </a>
            )}
            
            <button
              onClick={onClose}
              aria-label="Close"
              className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 text-foreground/70 hover:text-red-400 transition-all duration-300 cursor-pointer"
            >
              <FiX className="w-5 h-5 sm:w-6 sm:h-6 pointer-events-none transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
        </div>

        {/* MAIN CONTENT (VERTICAL LAYOUT REORDERED) */}
        <div className="flex flex-col flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 relative p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="max-w-4xl mx-auto w-full flex flex-col">
            
            {/* 1. TECH STACK */}
            <div className="mb-10 shrink-0">
              <span className="text-foreground/40 font-mono text-xs tracking-[0.2em] uppercase block mb-4">
                {t("projects.modal.technologies", "Technologies Used")}
              </span>
              <div className="-ml-2 max-w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10">
                <Dock items={techItems} baseItemSize={48} magnification={70} />
              </div>
            </div>

            {/* 2. DESCRIPTION & CONTENT */}
            <div className="mb-8 shrink-0">
              <span className="inline-block px-3 py-1 mb-6 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 rounded-full">
                {t("projects.badges.featured", "Featured Project")}
              </span>
              
              <div className="prose prose-invert prose-p:text-foreground/80 prose-p:font-mono prose-p:text-sm md:prose-p:text-base prose-p:leading-relaxed">
                <p>{t(`projects.items.${project.id}.description`)}</p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 mb-12">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-1 active:scale-95 transition-all duration-300 rounded-xl font-bold font-mono text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(33,241,168,0.3)]"
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
                  className="flex items-center justify-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:-translate-y-1 active:scale-95 transition-all duration-300 rounded-xl font-bold font-mono text-xs sm:text-sm tracking-widest uppercase text-foreground"
                >
                  <FiGithub className="text-lg" />
                  <span>{t("common.links.source", "Source Code")}</span>
                </a>
              )}
            </div>

            {/* 3. MAIN IMAGE */}
            <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 mb-12 shadow-xl group">
              <img
                src={project.image}
                alt={t(`projects.items.${project.id}.title`)}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* 4. GALLERY IMAGES (IF ANY) */}
            {gallery.length > 0 && (
              <div className="flex flex-col gap-8 mb-12">
                <h4 className="text-foreground font-sans font-bold text-xl uppercase tracking-wider mb-2">
                  Screenshots & Sections
                </h4>
                {/* @ts-ignore */}
                {gallery.map((item, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    {item.title && (
                      <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
                        {item.title}
                      </span>
                    )}
                    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-lg">
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
