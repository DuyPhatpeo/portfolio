// src/components/project/ProjectSection.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../../constants/projectData";
import ProjectCard from "./ProjectCard";
import FeaturedProjectRow from "./FeaturedProjectRow";
import ProjectModal from "./ProjectModal";
import { useTranslation } from "react-i18next";
import type { Project } from "../../types/data";

export default function ProjectSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="min-h-screen py-12 md:py-16 relative overflow-hidden bg-(--background-alt)">
      {/* Dots Pattern Background */}
      <div className="absolute inset-0 cyber-dots pointer-events-none opacity-[0.05]" />

      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 mb-8 md:mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
          {t("projects.subtitle")}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none mb-6">
          {t("projects.title")}
        </h2>
        <p className="max-w-2xl text-foreground/90 text-base md:text-lg font-mono text-justify">
          {t("projects.description")}
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ================= FEATURED ================= */}
        <div className="group/list space-y-10 md:space-y-16 mb-12 md:mb-20">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectRow
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* ================= OTHER ================= */}
        <motion.h3
          className="text-2xl md:text-3xl font-sans font-black text-foreground uppercase tracking-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t("projects.other_title")}
        </motion.h3>
        <div className="group/list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
