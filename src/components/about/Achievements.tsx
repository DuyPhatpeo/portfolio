import React from "react";
import { aboutData } from "../../data/aboutData";
import { motion } from "framer-motion";

const Achievements: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
    {aboutData.achievements.map(({ icon: Icon, label, color }, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 + i * 0.1 }}
        className="
          group relative
          bg-tech-bg/50 border border-tech-teal/20
          p-6 flex items-center gap-4
          transition-all duration-300
          hover:bg-tech-teal/5 hover:border-tech-teal/60 hover:shadow-[0_0_15px_rgba(68,187,164,0.1)]
        "
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
        }}
      >
        {/* Glow accent */}
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-tech-teal/5 blur-xl group-hover:bg-tech-teal/20 transition-all"></div>

        {/* Icon */}
        <div
          className="p-3 bg-tech-teal/10 border border-tech-teal/30 group-hover:border-tech-teal transition-colors"
          style={{
            clipPath:
              "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
          }}
        >
          <Icon className={`w-6 h-6 text-tech-teal ${color}`} />
        </div>

        {/* Text */}
        <p className="leading-relaxed font-bold tracking-wide text-tech-light uppercase text-sm md:text-base">
          {label}
        </p>
      </motion.div>
    ))}
  </div>
);

export default Achievements;
