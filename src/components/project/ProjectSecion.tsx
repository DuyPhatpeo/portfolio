import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/projectData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    if (selected) {
      header?.classList.add(
        "opacity-0",
        "pointer-events-none",
        "-translate-y-full"
      );
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEsc);
    } else {
      header?.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "-translate-y-full"
      );
      document.body.style.overflow = "";
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [selected]);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Featured Projects
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            Explore my latest work and creative solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <ProjectCard project={p} onSelect={setSelected} />
            </motion.div>
          ))}
        </div>

        <ProjectModal selected={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
