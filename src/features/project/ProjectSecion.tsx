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
  const lastIndexRef = useRef(0);

  // Scoped GSAP batch reveals & horizontal gallery (following greensock/gsap-skills)
  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Staggered viewport entry batches (skipped when reduced motion is enabled)
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (mode === "all-list") {
          const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
          if (cards.length > 0) {
            gsap.set(cards, { autoAlpha: 0, y: 24 });
            ScrollTrigger.batch(cards, {
              interval: 0.08,
              batchMax: 4,
              start: "clamp(top 90%)",
              once: true,
              onEnter: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.55,
                  stagger: 0.07,
                  ease: "power3.out",
                  overwrite: "auto",
                  clearProps: "transform",
                });
              },
            });
          }
        } else {
          const rows = gsap.utils.toArray<HTMLElement>("[data-featured-row]");
          if (rows.length > 0) {
            gsap.set(rows, { autoAlpha: 0, y: 32 });
            ScrollTrigger.batch(rows, {
              interval: 0.1,
              batchMax: 2,
              start: "clamp(top 88%)",
              once: true,
              onEnter: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.65,
                  stagger: 0.1,
                  ease: "power3.out",
                  overwrite: "auto",
                  clearProps: "transform",
                });
              },
            });
          }
        }
      });

      if (
        mode !== "default" ||
        !otherPinRef.current ||
        !trackRef.current ||
        !pinContainerRef.current ||
        otherProjects.length === 0
      ) {
        return;
      }

      const track = trackRef.current;
      const setProgressScale = progressBarRef.current
        ? gsap.quickSetter(progressBarRef.current, "scaleX")
        : null;
      setProgressScale?.(0);

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
            setProgressScale?.(gsap.utils.clamp(0, 1, self.progress));
            const activeIdx = gsap.utils.clamp(
              0,
              otherProjects.length - 1,
              Math.round(self.progress * (otherProjects.length - 1))
            );
            if (activeIdx !== lastIndexRef.current) {
              lastIndexRef.current = activeIdx;
              setCurrentOtherIndex(activeIdx);
            }
          },
        },
      });

      scrollTriggerInstance.current = tween.scrollTrigger ?? null;
    },
    {
      scope: sectionRef,
      dependencies: [featuredProjects.length, otherProjects.length, mode],
      revertOnUpdate: true,
    }
  );

  const handleStepNavigate = contextSafe((direction: "prev" | "next") => {
    const trigger =
      scrollTriggerInstance.current ||
      ScrollTrigger.getById("other-horizontal-scroll");
    if (!trigger || otherProjects.length <= 1) return;

    const nextIndex =
      direction === "next"
        ? Math.min(otherProjects.length - 1, currentOtherIndex + 1)
        : Math.max(0, currentOtherIndex - 1);

    const progressRatio = nextIndex / (otherProjects.length - 1);
    const targetScroll =
      trigger.start + progressRatio * (trigger.end - trigger.start);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: targetScroll });
      return;
    }

    gsap.to(window, {
      scrollTo: { y: targetScroll, autoKill: true },
      duration: 0.65,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

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
        className={`max-w-7xl mx-auto relative z-10 ${
          mode === "all-list"
            ? "px-3.5 sm:px-6 md:px-10 lg:px-12 pt-8 pb-20 md:pt-12 md:pb-28"
            : "px-5 sm:px-8 md:px-12 py-20 md:py-28"
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

        {/* Projects Rendering: 2 cols mobile / 3 cols tablet / 4 cols desktop on /projects */}
        {mode === "all-list" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
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
                    className="h-full w-full bg-primary origin-left scale-x-0 will-change-transform"
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
              aria-label="Loading project details"
              className="fixed inset-0 z-[220] grid place-items-center bg-black/70 backdrop-blur-sm"
            >
              <div className="w-9 h-9 rounded-full border-2 border-border border-t-primary animate-spin" />
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
