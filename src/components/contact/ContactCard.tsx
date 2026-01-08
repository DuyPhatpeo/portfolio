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
      className="group block h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="
          relative h-full p-6 rounded-xl
          bg-white dark:bg-slate-800
          shadow-lg
          transition-all duration-300
          hover:-translate-y-1
          flex flex-col items-center text-center
          overflow-hidden
        "
      >
        {/* Accent overlay */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-br ${color}
            opacity-0 group-hover:opacity-[0.06]
            transition-opacity duration-300
            pointer-events-none
          `}
        />

        <div className="relative space-y-4 flex-1 flex flex-col items-center">
          {/* Icon */}
          <div
            className={`
              inline-flex p-3 rounded-xl
              bg-gradient-to-br ${color}
              group-hover:scale-110
              transition-transform duration-300
            `}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-1 text-gray-500 dark:text-gray-400">
              {label}
            </p>

            <p
              className="
                text-base font-semibold
                text-gray-800 dark:text-gray-100
                group-hover:text-gray-600 dark:group-hover:text-gray-300
                transition-colors
                whitespace-nowrap overflow-hidden text-ellipsis
              "
            >
              {value}
            </p>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          className={`
            absolute bottom-0 left-0 h-1 w-0
            bg-gradient-to-r ${color}
            group-hover:w-full transition-all duration-500
          `}
        />
      </div>
    </motion.a>
  );
}
