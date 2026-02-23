import React from "react";
import { aboutData } from "../../data/aboutData";
import { motion } from "framer-motion";

const PersonalInfo: React.FC = () => (
  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
    {aboutData.personal.map(({ icon: Icon, label, value, color }, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 + i * 0.1 }}
        className="
          relative group
          bg-tech-bg/50 border border-tech-teal/20
          p-5 flex items-center gap-4
          transition-all duration-300
          hover:bg-tech-teal/10 hover:border-tech-teal/80 hover:shadow-[0_0_15px_rgba(68,187,164,0.2)]
        "
        style={{
          clipPath:
            "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
        }}
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-tech-teal/5 blur-xl group-hover:bg-tech-teal/20 transition-all"></div>

        {/* Icon */}
        <div
          className="p-3 bg-tech-teal/10 border border-tech-teal/30 group-hover:border-tech-teal transition-colors"
          style={{
            clipPath:
              "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
          }}
        >
          <Icon className={`w-5 h-5 text-tech-teal ${color}`} />
        </div>

        {/* Text */}
        <div>
          <p className="text-xs uppercase font-bold tracking-widest text-tech-teal/60 mb-1 font-mono">
            {label}
          </p>
          <p className="font-black text-tech-light uppercase tracking-wider text-sm md:text-base">
            {value}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default PersonalInfo;
