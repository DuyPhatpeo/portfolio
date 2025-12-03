import { motion } from "framer-motion";

export default function ProjectCard({ project, onSelect }: any) {
  return (
    <motion.div
      onClick={() => onSelect(project)}
      className="
        cursor-pointer group relative rounded overflow-hidden
        bg-neutral/10 shadow-xl
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        backdrop-blur-md transition-all duration-300
      "
      whileHover={{ scale: 1.015 }} // chỉ zoom nhẹ, bỏ đẩy lên
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.05 }} // chỉ zoom nhẹ
          transition={{ duration: 0.55, ease: "easeOut" }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
          <motion.h3
            className="text-2xl font-bold text-white drop-shadow leading-tight tracking-tight"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            {project.name}
          </motion.h3>

          <motion.div
            className="inline-block"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <span
              className="
              px-3 py-1 text-xs font-semibold rounded-full
              bg-white/20 text-white shadow backdrop-blur
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
