import React, { useState, useEffect } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import { projects } from "../../data/projectData";

export default function ProjectsSection() {
  const [selected, setSelected] = useState<any>(null);

  // 🧠 Ẩn header + khóa cuộn khi mở modal
  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement;
    if (selected) {
      header?.classList.add(
        "opacity-0",
        "pointer-events-none",
        "-translate-y-full"
      );
      document.body.style.overflow = "hidden";
    } else {
      header?.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "-translate-y-full"
      );
      document.body.style.overflow = "";
    }
  }, [selected]);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Dự Án Nổi Bật
        </h2>

        {/* Grid chỉ hiển thị hình + tên */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <div
              key={i}
              onClick={() => setSelected(project)}
              className="cursor-pointer group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {/* Hình ảnh với tỷ lệ 4/3 */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover transition"
                />
              </div>

              {/* Tên luôn hiển thị */}
              <div className="p-4 bg-white/5 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {project.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal chi tiết */}
        {selected && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fadeIn"
            onClick={() => setSelected(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-fadeInUp max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Nút đóng */}
              <button
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
                onClick={() => setSelected(null)}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Ảnh lớn giữ tỷ lệ 3:4 */}
              {selected.image && (
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Nội dung chi tiết */}
              <div className="p-6 space-y-4">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {selected.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selected.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-3">
                  {selected.demo && (
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-semibold hover:text-primary transition"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
