import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

export default function ProjectCard({ project, onSelect }: any) {
  return (
    <motion.div
      onClick={() => onSelect(project)}
      className="
        cursor-pointer group relative rounded-3xl overflow-hidden
        bg-gradient-to-br from-neutral-50 to-neutral-100
        dark:from-neutral-900 dark:to-neutral-950
        border border-neutral-200/50 dark:border-neutral-800/50
        hover:border-[var(--primary)] dark:hover:border-[var(--primary)]
        transition-all duration-500
        shadow-xl dark:shadow-2xl
      "
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:opacity-100 transition-opacity duration-500"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-100 via-neutral-100/40 to-transparent dark:from-neutral-900 dark:via-neutral-900/40 dark:to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative p-8 space-y-4">
        {/* Category */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            {project.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {project.name}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {project.desc}
        </motion.p>

        {/* Tech Stack */}
        {project.tech && (
          <motion.div
            className="flex gap-3 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            {project.tech.slice(0, 3).map((tech: any, index: number) => (
              <div
                key={index}
                className="
                  px-4 py-2 rounded-full
                  bg-neutral-200/50 dark:bg-neutral-800/50 backdrop-blur-sm
                  border border-neutral-300/50 dark:border-neutral-700/50
                  text-xs font-medium text-neutral-700 dark:text-neutral-300
                  hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 
                  hover:text-neutral-900 dark:hover:text-white
                  transition-all duration-300
                "
              >
                {tech.name}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
