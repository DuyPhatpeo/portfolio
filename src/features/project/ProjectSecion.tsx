// src/features/project/ProjectSecion.tsx
import { useState, useRef } from "react";
import { projects } from "@constants/projectData";
import HorizontalProjectCard from "./HorizontalProjectCard";
import FeaturedProjectRow from "./FeaturedProjectRow";
import ProjectModal from "./ProjectModal";
import { useTranslation } from "react-i18next";
import type { Project } from "@/types/data";
import { gsap, useGSAP, ScrollTrigger } from "@lib/gsap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProjectSection() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentOtherIndex, setCurrentOtherIndex] = useState(0);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const sectionRef = useRef<HTMLElement>(null);
  const otherPinRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  // GSAP Horizontal Scroll Gallery for Other Projects
  useGSAP(
    () => {
      if (
        !otherPinRef.current ||
        !trackRef.current ||
        !pinContainerRef.current ||
        otherProjects.length === 0
      )
        return;

      const track = trackRef.current;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackWidth - viewportWidth + 80);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          id: "other-horizontal-scroll",
          trigger: otherPinRef.current,
          pin: pinContainerRef.current,
          start: "top top",
          end: () => {
            const trackWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            return `+=${Math.max(trackWidth - viewportWidth + 80, 1500)}`;
          },
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.min(100, Math.max(0, self.progress * 100))}%`;
            }
            const activeIdx = Math.min(
              otherProjects.length - 1,
              Math.max(0, Math.round(self.progress * (otherProjects.length - 1)))
            );
            setCurrentOtherIndex(activeIdx);
          },
        },
      });

      scrollTriggerInstance.current = tween.scrollTrigger ?? null;

      return () => {
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [otherProjects.length] }
  );

  // Smooth jump to next/previous other project
  const handleStepNavigate = (direction: "prev" | "next") => {
    const trigger =
      scrollTriggerInstance.current ||
      ScrollTrigger.getById("other-horizontal-scroll");
    if (!trigger) return;

    const nextIndex =
      direction === "next"
        ? Math.min(otherProjects.length - 1, currentOtherIndex + 1)
        : Math.max(0, currentOtherIndex - 1);

    const progressRatio = nextIndex / (otherProjects.length - 1);
    const targetScroll =
      trigger.start + progressRatio * (trigger.end - trigger.start);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-(--background-alt)"
    >
      {/* Dots Pattern Background */}
      <div className="absolute inset-0 cyber-dots pointer-events-none opacity-[0.04]" />

      {/* ========================================================
          PHẦN 1: DỰ ÁN NỔI BẬT (FEATURED PROJECTS)
          Dạng danh sách hàng dọc (FeaturedProjectRow)
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-24 relative z-10">
        <div className="mb-10 md:mb-14">
          <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
            {t("projects.subtitle")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none mb-4 sm:mb-6">
            {t("projects.title")}
          </h2>
          <p className="max-w-2xl text-foreground/90 text-sm sm:text-base md:text-lg font-mono text-left sm:text-justify">
            {t("projects.description")}
          </p>
        </div>

        <div className="group/list space-y-12 md:space-y-20">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectRow
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* ========================================================
          PHẦN 2: CÁC DỰ ÁN ĐÁNG CHÚ Ý KHÁC (OTHER PROJECTS)
          Hiệu ứng Pinned Horizontal Scroll Gallery
      ======================================================== */}
      <div ref={otherPinRef} className="relative border-t border-border/30">
        <div
          ref={pinContainerRef}
          className="min-h-dvh h-dvh w-full overflow-hidden flex flex-col justify-between py-4 sm:py-8 md:py-10 relative select-none"
        >
          {/* Header */}
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 shrink-0 z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
              <div>
                <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-2 sm:mb-3">
                  ARCHIVE / OTHER WORKS
                </span>
                <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none">
                  {t("projects.other_title")}
                </h3>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  onClick={() => handleStepNavigate("prev")}
                  disabled={currentOtherIndex === 0}
                  aria-label="Previous project"
                  className="p-2 sm:p-2.5 rounded-full bg-card/80 hover:bg-primary hover:text-primary-foreground border border-border/80 text-foreground/80 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <FiChevronLeft className="text-base sm:text-lg" />
                </button>
                <button
                  onClick={() => handleStepNavigate("next")}
                  disabled={currentOtherIndex === otherProjects.length - 1}
                  aria-label="Next project"
                  className="p-2 sm:p-2.5 rounded-full bg-card/80 hover:bg-primary hover:text-primary-foreground border border-border/80 text-foreground/80 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <FiChevronRight className="text-base sm:text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Track */}
          <div className="w-full overflow-visible my-auto z-10">
            <div
              ref={trackRef}
              className="flex items-center gap-4 sm:gap-8 md:gap-10 px-5 sm:px-12 md:px-20 w-max will-change-transform"
            >
              {otherProjects.map((project) => (
                <HorizontalProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          </div>

          {/* Bottom Progress Bar & Info */}
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 shrink-0 z-10">
            <div className="flex flex-col gap-2.5">
              <div className="w-full h-1.5 rounded-full bg-muted/60 overflow-hidden relative border border-border/40">
                <div
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-75 shadow-[0_0_12px_var(--primary)]"
                  style={{ width: "0%" }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-foreground/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping inline-block" />
                  <span>
                    <strong className="text-foreground font-semibold">
                      {t(`projects.items.${otherProjects[currentOtherIndex]?.id}.title`)}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
