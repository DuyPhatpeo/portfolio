import { motion } from "framer-motion";

export default function ProjectCard({ project, onSelect }: any) {
  return (
    <div
      onClick={() => onSelect(project)}
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
  );
}
