import { motion } from "framer-motion";
import React from "react";

interface ContactData {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  color: string; // gradient tailwind: from-... to-...
}

export default function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  color,
}: ContactData) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full outline-none focus:ring-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="
          relative h-full p-6
          bg-tech-bg/50 backdrop-blur-md border border-tech-teal/30
          shadow-[0_0_15px_rgba(0,245,212,0.05)]
          transition-all duration-300
          hover:bg-tech-teal/10 hover:border-tech-teal hover:shadow-[0_0_20px_rgba(0,245,212,0.3)]
          flex flex-col items-center text-center
          overflow-hidden
        "
        style={{
          clipPath:
            "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
        }}
      >
        {/* HUD Corner Accents */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-tech-teal/50 transition-colors group-hover:border-tech-teal"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-tech-teal/50 transition-colors group-hover:border-tech-teal"></div>

        <div className="relative space-y-4 flex-1 flex flex-col items-center z-10 w-full mt-4">
          {/* Icon */}
          <div
            className="
              inline-flex p-4
              bg-tech-bg border border-tech-teal/50 shadow-[0_0_10px_rgba(0,245,212,0.2)]
              group-hover:scale-110 group-hover:border-tech-teal group-hover:shadow-[0_0_15px_rgba(0,245,212,0.6)]
              transition-all duration-300
            "
            style={{
              clipPath:
                "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
            }}
          >
            <Icon className="w-8 h-8 text-tech-light group-hover:text-tech-teal transition-colors" />
          </div>

          {/* Text */}
          <div className="w-full">
            <p className="text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase mb-2 text-tech-teal border-b border-tech-teal/20 pb-2">
              &gt; {label}
            </p>

            <p
              className="
                text-sm md:text-base font-mono
                text-tech-light/80
                group-hover:text-tech-light
                transition-colors
                whitespace-nowrap overflow-hidden text-ellipsis
              "
            >
              {value}
            </p>
          </div>
        </div>

        {/* Bottom accent glow override */}
        <div className="absolute inset-0 bg-gradient-to-t from-tech-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </motion.a>
  );
}
