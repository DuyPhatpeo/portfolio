import { motion } from "framer-motion";
import React from "react";

interface ContactData {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  color: string;
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
      className="group relative block h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="
          relative h-full p-8 rounded-2xl
          bg-white/60 dark:bg-slate-900/80 
          backdrop-blur-sm
          border-2 
          border-slate-300/70 dark:border-slate-700/50 
          hover:border-slate-400 dark:hover:border-slate-600
          transition-all duration-300 overflow-hidden flex flex-col
        "
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        <div className="relative space-y-5 flex-1 flex flex-col">
          <div
            className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300 self-start`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <p className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-2">
              {label}
            </p>
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors break-all">
              {value}
            </p>
          </div>
        </div>

        <div
          className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${color} group-hover:w-full transition-all duration-500`}
        />
      </div>
    </motion.a>
  );
}
