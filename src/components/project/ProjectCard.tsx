import { motion } from "framer-motion";
import { FiExternalLink, FiLayers } from "react-icons/fi";

// ProjectCard Component
export default function ProjectCard({ project, onSelect }: any) {
  return (
    <motion.div
      onClick={() => onSelect(project)}
      className="cursor-pointer group relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl hover:shadow-[0_20px_80px_rgba(255,255,255,0.15)] backdrop-blur-sm"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

        {/* Animated Border Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>
        </div>

        {/* Category Badge - Top Right */}
        <motion.div
          className="absolute top-4 right-4 z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="px-4 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg backdrop-blur-md border border-white/30">
            {project.category}
          </span>
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          <motion.h3
            className="text-2xl font-black text-white drop-shadow-2xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {project.name}
          </motion.h3>

          {/* Decorative Line */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-1 flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
            <FiLayers className="w-4 h-4 text-white/80" />
          </motion.div>

          {/* Hover Indicator */}
          <motion.div
            className="flex items-center gap-2 text-white/70 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            <span>View Details</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FiExternalLink className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
