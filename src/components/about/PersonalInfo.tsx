import React from "react";
import { aboutData } from "../../data/aboutData";
import { motion } from "framer-motion";

const PersonalInfo: React.FC = () => (
  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
    {aboutData.personal.map(({ icon: Icon, label, value, color }, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 + i * 0.05 }}
        className="
          relative p-5 rounded-2xl h-full
          bg-white/10 dark:bg-neutral-900/10
          backdrop-blur-xl
          border border-white/20 dark:border-neutral-700/20
          shadow-lg shadow-black/10 dark:shadow-white/5
          transition-all duration-300
          flex items-center gap-4
        "
      >
        {/* Icon — chỉ màu, không nền */}
        <Icon className={`w-6 h-6 ${color}`} />

        {/* Text */}
        <div>
          <p className="text-xs uppercase font-semibold text-gray-600 dark:text-gray-400 mb-1 tracking-wider">
            {label}
          </p>
          <p
            className="
              font-bold text-gray-900 dark:text-gray-100 text-lg
              transition-all duration-300
            "
          >
            {value}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default PersonalInfo;
