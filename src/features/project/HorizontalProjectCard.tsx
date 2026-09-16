// src/features/project/HorizontalProjectCard.tsx
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import type { Project } from "@/types/data";
import { gsap } from "@lib/gsap";

interface HorizontalProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function HorizontalProjectCard({
  project,
  onSelect,
}: HorizontalProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
      overwrite: "auto",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.3,
        x: (x / rect.width) * 80 - 40,
        y: (y / rect.height) * 80 - 40,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      className="group relative w-[82vw] xs:w-[320px] sm:w-[400px] md:w-[460px] lg:w-[500px] h-[420px] xs:h-[460px] sm:h-[500px] md:h-[530px] shrink-0 rounded-2xl md:rounded-3xl bg-card/85 backdrop-blur-md border border-border/80 hover:border-primary/60 transition-colors duration-500 shadow-xl overflow-hidden cursor-pointer flex flex-col will-change-transform select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 3D Specular Glare */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none opacity-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45)_0%,transparent_65%)] mix-blend-overlay z-30 transition-opacity duration-300"
      />

      {/* Cyber Grid Accent Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" />

      {/* Top Media Area */}
      <div className="relative w-full h-[52%] sm:h-[55%] overflow-hidden bg-muted/40 shrink-0">
        <img
          src={project.image}
          alt={t(`projects.items.${project.id}.title`)}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-black/40 pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10 pointer-events-none">
          {project.featured ? (
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
              {t("projects.badges.featured")}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-sm border border-border text-foreground/80 font-mono text-[10px] sm:text-xs font-medium tracking-wide">
              Project
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="relative z-10 p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-black text-foreground uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {t(`projects.items.${project.id}.title`)}
          </h3>

          {/* Project Description Snippet */}
          <p className="mt-2 text-foreground/85 text-xs sm:text-sm font-mono leading-relaxed line-clamp-2">
            {t(`projects.items.${project.id}.description`)}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-2.5 py-0.5 rounded-md bg-muted/60 border border-border/50 text-foreground/75 font-mono text-[10px] sm:text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-muted-foreground font-mono text-[10px] sm:text-xs">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 mt-2 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-primary font-mono text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
            <span>{t("projects.modal.view_details")}</span>
            <FiArrowRight className="text-sm" />
          </div>

          {/* External Links */}
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                title="View Source Code"
                className="p-2 rounded-lg bg-muted/50 hover:bg-primary hover:text-primary-foreground text-foreground/80 transition-colors"
              >
                <FiGithub className="text-base" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
                className="p-2 rounded-lg bg-muted/50 hover:bg-primary hover:text-primary-foreground text-foreground/80 transition-colors"
              >
                <FiExternalLink className="text-base" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
