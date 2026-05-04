// src/components/project/ProjectSection.tsx
import { projects } from "../../constants/projectData";
import FeaturedProject from "./FeaturedProject";
import OtherProject from "./OtherProject";
import { useTranslation } from "react-i18next";

export default function ProjectSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  const { t } = useTranslation();

  return (
    <section id="projects" className="min-h-screen py-32 relative overflow-hidden bg-card/5">
      {/* Dots Pattern Background */}
      <div className="absolute inset-0 cyber-dots pointer-events-none opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
          {t("projects.subtitle")}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none mb-6">
          {t("projects.title")}
        </h2>
        <p className="max-w-2xl text-foreground/90 text-base md:text-lg font-mono">
          {t("projects.description")}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ================= FEATURED ================= */}
        <div className="mb-32">
          <div className="space-y-32">
            {featuredProjects.map((project, index) => (
              <FeaturedProject
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* ================= OTHER ================= */}
        <div className="mt-48 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            {t("projects.other_title")}
          </h3>
          <OtherProject projects={otherProjects} />
        </div>
      </div>
    </section>
  );
}
