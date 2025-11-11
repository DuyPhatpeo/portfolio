import { Github, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { projects as allProjects } from "@/data/projects"; // import từ data/projects

import ProjectFilter from "./ProjectFilter";

export default function Project() {
  // Danh sách ảnh mặc định (stock images)
  const placeholderImages = [
    "https://source.unsplash.com/400x200/?technology",
    "https://source.unsplash.com/400x200/?coding",
    "https://source.unsplash.com/400x200/?laptop",
    "https://source.unsplash.com/400x200/?web",
    "https://source.unsplash.com/400x200/?app",
    "https://source.unsplash.com/400x200/?design",
  ];

  const categories = ["All", ...new Set(allProjects.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  // Hàm chọn random ảnh
  const getRandomPlaceholder = () => {
    const index = Math.floor(Math.random() * placeholderImages.length);
    return placeholderImages[index];
  };

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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 transition-transform duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image || getRandomPlaceholder()}
                  alt={project.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-medium rounded-full shadow">
                  {project.category}
                </span>

                {/* Icon Buttons */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:scale-110 transition shadow-md"
                      title="Xem Demo"
                    >
                      <Monitor className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-full hover:scale-110 transition shadow-md"
                    title="Xem Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-xs font-medium hover:bg-cyan-100 transition"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-cyan-600 transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
