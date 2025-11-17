import React from "react";
import { aboutData } from "../../data/aboutData";

const PersonalInfo: React.FC = () => (
  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
    {aboutData.personal.map(({ icon: Icon, label, value }, i) => (
      <div
        key={i}
        className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200/20 dark:border-white/10 bg-white/10 dark:bg-gray-800/30"
      >
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">
            {label}
          </p>
          <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">
            {value}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default PersonalInfo;
