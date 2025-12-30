import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { projects } from "../../data/projectData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SectionHeader from "../ui/SectionHeader";

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const INITIAL_COUNT = 9;
const LOAD_MORE_COUNT = 6;

export default function ProjectsSection() {
  const [selected, setSelected] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

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

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title="Projects" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((p) => (
            <motion.div
              key={p.name}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              <ProjectCard project={p} onSelect={setSelected} />
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + LOAD_MORE_COUNT, projects.length)
                )
              }
              className="px-8 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              See more
            </motion.button>
          </div>
        )}

        <ProjectModal selected={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
