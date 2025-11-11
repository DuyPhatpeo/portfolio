import { useState } from "react";
import { projects } from "@/data/projects";

import ProjectFilter from "./ProjectFilter";
import ProjectCard from "./ProjectCard";

export default function Project() {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-white to-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Dự Án Tiêu Biểu
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Khám phá những dự án tôi đã tạo ra với đam mê và sự sáng tạo
          </p>
        </div>

        {/* Filter */}
        <ProjectFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
