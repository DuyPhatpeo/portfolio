// src/components/project/ProjectSection.tsx
import SectionHeader from "../ui/SectionHeader";
import { projects } from "../../data/projectData";
import FeaturedProject from "./FeaturedProject";
import OtherProject from "./OtherProject";
import { useTranslation } from "react-i18next";

export default function ProjectSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-20">
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
