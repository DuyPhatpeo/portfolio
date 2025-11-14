import { useState, useEffect } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import { projects } from "../../data/projectData";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsSection() {
  const [selected, setSelected] = useState<any>(null);

  // ============================
  // ẨN HEADER + KHÓA CUỘN + ESC
  // ============================
  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    if (selected) {
      header?.classList.add(
        "opacity-0",
        "pointer-events-none",
        "-translate-y-full"
      );
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      header?.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "-translate-y-full"
      );
      document.body.style.overflow = "";
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [selected]);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent leading-snug bg-gradient-to-r from-primary to-secondary">
          Featured Projects
        </h2>

        {/* GRID LIST */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <div
              key={i}
              onClick={() => setSelected(project)}
              className="cursor-pointer group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 text-center drop-shadow-lg">
                    {project.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
                      {project.category}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============ MODAL ============ */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xl px-4"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="
                  relative w-full max-w-6xl
                  bg-gradient-to-br from-white via-gray-50 to-gray-100
                  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                  rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                  border border-white/30 dark:border-white/10
                  overflow-hidden max-h-[95vh] overflow-y-auto
                  backdrop-blur-2xl
                "
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(139,92,246,.5) transparent",
                }}
              >
                {/* BUTTON CLOSE */}
                <button
                  className="
                    absolute top-6 right-6 z-10
                    p-3 rounded-2xl bg-white/90 dark:bg-gray-800/90
                    border border-gray-200 dark:border-gray-700
                    backdrop-blur-xl hover:scale-110 hover:rotate-90
                    transition-all duration-300 shadow-xl
                    hover:shadow-2xl hover:bg-white dark:hover:bg-gray-700
                  "
                  onClick={() => setSelected(null)}
                >
                  <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                </button>

                {/* CONTENT */}
                <div className="flex flex-col">
                  {/* TOP IMAGE - Full Width */}
                  {selected.image && (
                    <div className="relative h-72 w-full overflow-hidden">
                      <img
                        src={selected.image}
                        alt={selected.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"></div>
                    </div>
                  )}

                  {/* BOTTOM CONTENT */}
                  <div className="p-10 md:p-12 space-y-8">
                    {/* TITLE + BUTTONS */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary leading-tight">
                          {selected.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                          <div className="h-1 w-8 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
                        </div>
                      </div>

                      {/* LINKS - Moved to top */}
                      <div className="flex gap-4 flex-wrap">
                        {selected.demo && (
                          <a
                            href={selected.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              flex items-center gap-3 px-8 py-4 rounded-2xl
                              bg-gradient-to-r from-primary to-secondary
                              text-white font-bold text-base
                              hover:scale-105 hover:shadow-2xl
                              hover:from-secondary hover:to-primary
                              transition-all duration-300
                              shadow-xl
                            "
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span>Live Demo</span>
                          </a>
                        )}

                        <a
                          href={selected.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex items-center gap-3 px-8 py-4 rounded-2xl
                            bg-white dark:bg-gray-800
                            text-gray-800 dark:text-gray-200
                            border-2 border-gray-300 dark:border-gray-600
                            font-bold text-base
                            hover:bg-gray-50 dark:hover:bg-gray-700
                            hover:border-gray-400 dark:hover:border-gray-500
                            hover:shadow-2xl hover:scale-105
                            transition-all duration-300
                            shadow-lg
                          "
                        >
                          <Github className="w-5 h-5" />
                          <span>View Code</span>
                        </a>
                      </div>
                    </div>

                    {/* ============================
                        TECH STACK (HÌNH TRÒN + HOVER)
                        ============================ */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {selected.tech.map((t: any, i: number) => {
                          const name = typeof t === "string" ? t : t.name;
                          const logo = typeof t === "string" ? null : t.logo;

                          return (
                            <div key={i} className="relative group">
                              <div
                                className="
                                  w-16 h-16 rounded-2xl 
                                  bg-gradient-to-br from-white to-gray-100
                                  dark:from-gray-800 dark:to-gray-900
                                  border-2 border-gray-200 dark:border-gray-700
                                  shadow-xl flex items-center justify-center 
                                  overflow-hidden hover:scale-110 hover:shadow-2xl
                                  hover:border-primary dark:hover:border-secondary
                                  transition-all duration-300 cursor-pointer
                                "
                              >
                                {logo ? (
                                  <img
                                    src={logo}
                                    alt={name}
                                    className="w-10 h-10 object-contain group-hover:scale-110 transition"
                                  />
                                ) : (
                                  <span className="text-base font-bold text-primary">
                                    {name.substring(0, 2).toUpperCase()}
                                  </span>
                                )}
                              </div>

                              {/* Tooltip */}
                              <div
                                className="
                                  absolute bottom-full left-1/2 -translate-x-1/2 
                                  mb-3 px-4 py-2 bg-gray-900 dark:bg-gray-700 
                                  text-white text-xs font-bold rounded-xl 
                                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                  transition-all duration-200 whitespace-nowrap shadow-2xl
                                "
                              >
                                {name}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[6px] border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        About Project
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {selected.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
