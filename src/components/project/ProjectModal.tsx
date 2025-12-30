import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectModal({ selected, onClose }: any) {
  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/40 dark:bg-black/60 px-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-6xl bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:rotate-90 transition-all duration-300"
              onClick={onClose}
            >
              <RxCross2 className="w-5 h-5" />
            </button>

            {/* Hero Image */}
            {selected.image && (
              <motion.div
                className="relative h-80 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950 via-transparent to-transparent"></div>
              </motion.div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12 space-y-8 -mt-20 relative z-10">
              {/* Category Badge */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                  {selected.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  {selected.name}
                </h2>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex flex-wrap gap-3 justify-center">
                  {selected.tech.map((t: any, i: number) => {
                    const name = typeof t === "string" ? t : t.name;
                    const logo = typeof t === "string" ? null : t.logo;
                    return (
                      <motion.div
                        key={i}
                        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-700/50 hover:border-[var(--primary)]/50 hover:shadow-lg hover:shadow-[var(--primary)]/10 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.05 }}
                        whileHover={{ y: -4 }}
                      >
                        {logo && (
                          <img
                            src={logo}
                            alt={name}
                            className="w-5 h-5 object-contain"
                          />
                        )}
                        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-[var(--primary)] transition-colors">
                          {name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base md:text-lg text-center">
                  {selected.desc}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {selected.demo && (
                  <a
                    href={selected.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-8 py-4 bg-[var(--primary)] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    <span>Visit Website</span>
                    <FiExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>
                )}
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-8 py-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-[var(--primary)] dark:hover:border-[var(--primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <FiGithub className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>View Code</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
