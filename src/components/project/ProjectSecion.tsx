import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/projectData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SectionHeader from "../ui/SectionHeader";

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
        <SectionHeader title="Projects" />

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
