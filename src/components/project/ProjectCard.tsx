import { motion } from "framer-motion";

export default function ProjectCard({ project, onSelect }: any) {
  return (
    <motion.div
      onClick={() => onSelect(project)}
      className="
        cursor-pointer group relative rounded-3xl overflow-hidden
        bg-white/80 dark:bg-neutral-900/80
        shadow-[0_8px_25px_rgba(0,0,0,0.12)]
        dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
        border border-white/20 dark:border-white/10
        transition-all duration-300
      "
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />

        {/* Gradient Overlay (giúp chữ nổi, không chìm) */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-black/60 via-black/20 to-transparent
            dark:from-black/70 dark:via-black/30
          "
        ></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
          {/* Title */}
          <motion.h3
            className="
              text-2xl font-bold tracking-tight
              text-white drop-shadow-lg
            "
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            {project.name}
          </motion.h3>

          {/* Category */}
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <span
              className="
                px-3 py-1 text-xs font-semibold rounded-full
                bg-[var(--primary-subtle)]
                text-[var(--primary-deep)]
                shadow-sm
                backdrop-blur-md
              "
            >
              {project.category}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
