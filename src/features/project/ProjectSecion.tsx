// src/components/project/ProjectSection.tsx
import SectionHeader from "../../components/ui/SectionHeader";
import { projects } from "../../constants/projectData";
import FeaturedProject from "./FeaturedProject";
import OtherProject from "./OtherProject";
import { useTranslation } from "react-i18next";

export default function ProjectSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-card/10 border-y border-primary/5">
      {/* Dots Pattern Background */}
      <div className="absolute inset-0 cyber-dots pointer-events-none opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* ================= FEATURED ================= */}
        <div className="mb-32">
          <SectionHeader title={t("projects.title")} />

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
        <div>
          <SectionHeader title={t("projects.subtitle")} />

          <OtherProject projects={otherProjects} />
        </div>
      </div>
    </section>
  );
}
