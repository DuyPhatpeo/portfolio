// src/components/project/OtherProject.tsx
import type { Project } from "../../data/projectData";
import OtherProjectCard from "./OtherProjectCard";

interface OtherProjectProps {
  projects: Project[];
}

export default function OtherProject({ projects }: OtherProjectProps) {
  return (
    <section className="mt-20">
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {projects.map((project, index) => (
          <OtherProjectCard
            key={project.id ?? index}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
