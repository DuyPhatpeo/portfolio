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
          bg-white dark:bg-slate-800
          p-5 rounded-xl shadow-lg
          flex items-center gap-4
          transition-all duration-300
          hover:-translate-y-1
        "
      >
        {/* Icon */}
        <div className="p-3 rounded-lg bg-gray-100 dark:bg-slate-700">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>

        {/* Text */}
        <div>
          <p className="text-xs uppercase font-semibold tracking-wider text-gray-500 dark:text-gray-400 mb-1">
            {label}
          </p>
          <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">
            {value}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default PersonalInfo;
