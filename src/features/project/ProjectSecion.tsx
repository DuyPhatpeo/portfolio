// src/features/project/ProjectSecion.tsx
import { useState, useRef, lazy, Suspense } from "react";
import { projects } from "@constants/projectData";
import HorizontalProjectCard from "./HorizontalProjectCard";
import FeaturedProjectRow from "./FeaturedProjectRow";
import ProjectCard from "./ProjectCard";
const ProjectModal = lazy(() => import("./ProjectModal"));
import { useTranslation } from "react-i18next";
import type { Project } from "@/types/data";
import { gsap, useGSAP, ScrollTrigger } from "@lib/gsap";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface ProjectSectionProps {
  mode?: "featured-only" | "all-list" | "default";
}

export default function ProjectSection({
  mode = "default",
}: ProjectSectionProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentOtherIndex, setCurrentOtherIndex] = useState(0);

  const featuredProjects =
    mode === "all-list" ? projects : projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const sectionRef = useRef<HTMLElement>(null);
  const otherPinRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  // GSAP Horizontal Scroll Gallery for Other Projects (only in "default" mode)
  useGSAP(
    () => {
      if (
        mode !== "default" ||
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
    { scope: sectionRef, dependencies: [otherProjects.length, mode] }
  );

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
      className={`relative bg-transparent ${
        mode === "all-list" ? "" : "border-t border-border/60"
      }`}
    >
      {/* Featured / All Projects Section */}
      <div
        className={`max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 ${
          mode === "all-list"
            ? "pt-8 pb-20 md:pt-12 md:pb-28"
            : "py-20 md:py-28"
        }`}
      >
        {/* Editorial Split Section Header (omitted in all-list mode where PageHero owns the heading) */}
        {mode !== "all-list" && (
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
              {t("projects.title")}
            </h2>
            <p className="max-w-[50ch] text-muted-foreground text-lg md:text-xl leading-relaxed text-left md:text-right">
              {t("projects.description")}
            </p>
          </div>
        )}

        {/* Projects Rendering */}
        {mode === "all-list" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-16 md:space-y-24">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectRow
                key={project.id}
                project={project}
                index={index}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        )}

        {mode === "featured-only" && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => navigate("/projects")}
              className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 py-3 rounded-full bg-card border border-border hover:border-primary/60 text-foreground hover:text-primary font-medium text-base sm:text-lg transition-colors duration-200 cursor-pointer"
            >
              <span>{t("projects.view_all", "View All Projects")}</span>
              <FiArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Gallery for Other Projects (default mode) */}
      {mode === "default" && (
        <div ref={otherPinRef} className="relative border-t border-border/60">
          <div
            ref={pinContainerRef}
            className="min-h-dvh h-dvh w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 md:py-10 relative select-none"
          >
            {/* Header */}
            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 shrink-0 z-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-none">
                  {t("projects.other_title")}
                </h3>

                {/* Controls */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleStepNavigate("prev")}
                    disabled={currentOtherIndex === 0}
                    aria-label="Previous project"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <FiChevronLeft className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleStepNavigate("next")}
                    disabled={currentOtherIndex === otherProjects.length - 1}
                    aria-label="Next project"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <FiChevronRight className="text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Track */}
            <div className="w-full overflow-visible my-auto z-10">
              <div
                ref={trackRef}
                className="flex items-center gap-5 sm:gap-8 px-5 sm:px-12 md:px-20 w-max will-change-transform"
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

            {/* Bottom Progress Bar & Active Title */}
            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 shrink-0 z-10">
              <div className="flex flex-col gap-2.5">
                <div className="w-full h-1 rounded-full bg-muted overflow-hidden relative">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-primary transition-all duration-75"
                    style={{ width: "0%" }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="text-foreground font-medium">
                    {t(
                      `projects.items.${otherProjects[currentOtherIndex]?.id}.title`
                    )}
                  </span>
                  <span>
                    {String(currentOtherIndex + 1).padStart(2, "0")} /{" "}
                    {String(otherProjects.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <Suspense
          fallback={
            <div
              role="status"
              className="fixed inset-0 z-50 grid place-items-center bg-background/90 text-sm text-muted-foreground"
            >
              Đang tải…
            </div>
          }
        >
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
