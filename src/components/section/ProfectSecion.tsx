import { useState, useEffect } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import { projects } from "../../data/projectData";

export default function ProjectsSection() {
  const [selected, setSelected] = useState<any>(null);

  // 🧠 Ẩn header + khóa cuộn khi mở modal + ESC key
  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selected) {
        setSelected(null);
      }
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

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
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

                {/* Overlay gradient từ dưới lên */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Tên + Category đè lên ảnh */}
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

        {/* Modal chi tiết */}
        {selected && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4 animate-fadeIn"
            onClick={() => setSelected(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp max-h-[90vh] overflow-y-auto border border-white/20 dark:border-white/10"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(139, 92, 246, 0.5) transparent",
              }}
            >
              {/* Nút đóng sticky trong modal - chỉ icon */}
              <button
                className="sticky top-4 left-full -ml-12 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all hover:scale-110 z-50 group"
                onClick={() => setSelected(null)}
              >
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Ảnh chính */}
              {selected.image && (
                <div className="w-full aspect-[16/9] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Nội dung chi tiết */}
              <div className="p-10 space-y-8">
                {/* Title với underline gradient */}
                <div className="space-y-3">
                  <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
                    {selected.name}
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                </div>

                {/* Tech stack với icons */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {selected.tech.map((t: any, i: number) => {
                    // Hỗ trợ cả string và object
                    const techName = typeof t === "string" ? t : t.name;
                    const techLogo = typeof t === "string" ? null : t.logo;

                    return (
                      <div key={i} className="relative group">
                        {/* Logo */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:scale-110 flex items-center justify-center cursor-pointer">
                          {techLogo ? (
                            <img
                              src={techLogo}
                              alt={techName}
                              className="w-7 h-7 transition-transform group-hover:scale-110"
                            />
                          ) : (
                            <span className="text-xs font-bold text-primary">
                              {techName.substring(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg z-10">
                          {techName}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Links với gradient buttons */}
                <div className="flex gap-4 flex-wrap justify-center">
                  {selected.demo && (
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:shadow-lg hover:scale-105 border border-gray-300 dark:border-gray-600"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </div>

                {/* Description với background */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    {selected.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
