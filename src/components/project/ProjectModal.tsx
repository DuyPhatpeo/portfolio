import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectModal({ selected, onClose }: any) {
  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-3xl px-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-7xl bg-gradient-to-br from-gray-950 via-gray-900 to-black shadow-[0_30px_120px_rgba(0,0,0,0.9)] border border-white/10 overflow-hidden max-h-[92vh] overflow-y-auto backdrop-blur-3xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              rotateX: { duration: 0.6 },
            }}
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
              <div
                className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            {/* Close Button */}
            <motion.button
              className="absolute top-8 right-8 z-30 p-4 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl hover:from-red-500/20 hover:to-red-600/10 hover:border-red-500/50 group shadow-2xl"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <RxCross2 className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
            </motion.button>

            {/* Content Container */}
            <div className="flex flex-col lg:flex-row relative z-10">
              {/* Left Side - Image & Info */}
              <div className="lg:w-1/2 relative">
                {/* Hero Image */}
                {selected.image && (
                  <motion.div
                    className="relative h-[40vh] lg:h-full overflow-hidden"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <img
                      src={selected.image}
                      alt={selected.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute top-8 left-8"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl backdrop-blur-md border border-white/30">
                        {selected.category}
                      </span>
                    </motion.div>

                    {/* Bottom Decorative Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  </motion.div>
                )}
              </div>

              {/* Right Side - Details */}
              <div className="lg:w-1/2 p-10 lg:p-12 space-y-8 flex flex-col">
                {/* Title Section */}
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="space-y-4">
                    <motion.h3
                      className="text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {selected.name}
                    </motion.h3>

                    {/* Animated Decorative Lines */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: 120 }}
                        transition={{
                          delay: 0.6,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                      />
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.8,
                          type: "spring",
                          stiffness: 200,
                        }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex gap-4 flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {selected.demo && (
                      <motion.a
                        href={selected.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 px-8 py-4 overflow-hidden font-bold text-base text-white shadow-2xl"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Button Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Button Content */}
                        <div className="relative flex items-center gap-3">
                          <FiExternalLink className="w-5 h-5" />
                          <span>Live Demo</span>
                        </div>

                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                          animate={{ translateX: ["100%", "200%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      </motion.a>
                    )}

                    <motion.a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-8 py-4 bg-white/5 text-white border-2 border-white/20 font-bold text-base hover:bg-white/10 hover:border-white/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiGithub className="w-5 h-5" />
                      <span>View Code</span>
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="space-y-4 flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-px bg-gradient-to-r from-purple-500 to-transparent"></div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      About Project
                    </h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg font-light">
                    {selected.desc}
                  </p>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Tech Stack
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {selected.tech.map((t: any, i: number) => {
                      const name = typeof t === "string" ? t : t.name;
                      const logo = typeof t === "string" ? null : t.logo;

                      return (
                        <motion.div
                          key={i}
                          className="relative group"
                          initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                          transition={{
                            delay: 0.8 + i * 0.1,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <motion.div
                            className="relative w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 shadow-2xl flex items-center justify-center overflow-hidden cursor-pointer backdrop-blur-xl"
                            whileHover={{
                              y: -8,
                              scale: 1.1,
                              borderColor: "rgba(99, 102, 241, 0.5)",
                              boxShadow: "0 20px 60px rgba(99, 102, 241, 0.4)",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Gradient Background on Hover */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0"
                              whileHover={{
                                background: [
                                  "linear-gradient(135deg, rgba(59, 130, 246, 0) 0%, rgba(168, 85, 247, 0) 100%)",
                                  "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
                                ],
                              }}
                              transition={{ duration: 0.3 }}
                            />

                            {logo ? (
                              <motion.img
                                src={logo}
                                alt={name}
                                className="w-12 h-12 object-contain relative z-10"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                              />
                            ) : (
                              <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-400 relative z-10">
                                {name.substring(0, 2).toUpperCase()}
                              </span>
                            )}
                          </motion.div>

                          {/* Enhanced Tooltip */}
                          <motion.div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                            initial={{ y: 10 }}
                            whileHover={{ y: 0 }}
                          >
                            <div className="relative px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold whitespace-nowrap shadow-2xl border border-white/20">
                              {name}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                <div className="border-[6px] border-transparent border-t-purple-600"></div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
