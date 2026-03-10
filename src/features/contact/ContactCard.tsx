import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

interface ContactData {
  icon: React.ElementType;
  labelKey: string;
  value?: string;
  valueKey?: string;
  href: string;
  color: string; // gradient tailwind: from-... to-...
}

export default function ContactCard({
  icon: Icon,
  labelKey,
  value,
  valueKey,
  href,
}: ContactData) {
  const { t } = useTranslation();

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
          bg-card/50 backdrop-blur-md border border-primary/30
          shadow-[0_0_15px_var(--primary)]
          transition-all duration-300
          hover:bg-primary/10 hover:border-primary hover:cyber-glow
          flex flex-col items-center text-center
          overflow-hidden cyber-chamfer
        "
      >
        {/* HUD Corner Accents */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50 transition-colors group-hover:border-primary"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50 transition-colors group-hover:border-primary"></div>

        <div className="relative space-y-4 flex-1 flex flex-col items-center z-10 w-full mt-4">
          {/* Icon */}
          <div
            className="
              inline-flex p-4
              bg-card border border-primary/50 shadow-[0_0_10px_var(--primary)]
              group-hover:scale-110 group-hover:border-primary group-hover:cyber-glow
              transition-all duration-300 cyber-chamfer
            "
          >
            <Icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
          </div>

          {/* Text */}
          <div className="w-full">
            <p className="text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase mb-2 text-primary border-b border-primary/20 pb-2 text-center inline-block w-full">
              &gt; {t(labelKey)}
            </p>

            <p
              className="
                text-sm md:text-base font-mono
                text-foreground/80
                group-hover:text-foreground
                transition-colors
                whitespace-nowrap overflow-hidden text-ellipsis
              "
            >
              {valueKey ? t(valueKey) : value}
            </p>
          </div>
        </div>

        {/* Bottom accent glow override */}
        <div className="absolute inset-0 bg-linear-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </motion.a>
  );
}
