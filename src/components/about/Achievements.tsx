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
          bg-white dark:bg-slate-800
          p-6 rounded-xl shadow-lg
          flex items-center gap-4
          transition-all duration-300
          hover:-translate-y-1
        "
      >
        {/* Icon */}
        <div className="p-3 rounded-lg bg-gray-100 dark:bg-slate-700">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>

        {/* Text */}
        <p className="leading-relaxed font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </p>
      </motion.div>
    ))}
  </div>
);

export default Achievements;
