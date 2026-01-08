// src/components/project/ProjectSection.tsx
import SectionHeader from "../ui/SectionHeader";
import { projects } from "../../data/projectData";
import FeaturedProject from "./FeaturedProject";
import OtherProjectCard from "./OtherProjectCard";

export default function ProjectSection() {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Featured Projects */}
        <div className="mb-32">
          <SectionHeader title="Some Things I've Built" />

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

        {/* Other Projects */}
        <div>
          <SectionHeader title="Other Noteworthy Projects" />

          <div className="grid md:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <OtherProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
