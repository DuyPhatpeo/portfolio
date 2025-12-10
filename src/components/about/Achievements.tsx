import React from "react";
import { aboutData } from "../../data/aboutData";
import { motion } from "framer-motion";

const Achievements: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
    {aboutData.achievements.map(({ icon: Icon, label, color }, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 + i * 0.05 }}
        className="
          flex items-center justify-center gap-3
          p-4 rounded-2xl h-full
          bg-white/10 dark:bg-neutral-900/10
          backdrop-blur-xl
          shadow-lg shadow-black/10 dark:shadow-white/5
          transition-all duration-300
        "
      >
        {/* Icon - no border, clean */}
        <div className="p-3 rounded-xl bg-white/20 dark:bg-white/10">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>

        {/* Text */}
        <span className="font-bold text-base text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </motion.div>
    ))}
  </div>
);

export default Achievements;
