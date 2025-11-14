import React from "react";
import { aboutData } from "../../data/aboutData";

const Achievements: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
    {aboutData.achievements.map(({ icon: Icon, label, color }, i) => (
      <div
        key={i}
        className="flex items-center gap-2 justify-center p-3 rounded-full border border-gray-200/20 dark:border-white/10 bg-white/10 dark:bg-gray-800/30"
      >
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="font-bold text-sm text-gray-700 dark:text-gray-200">
          {label}
        </span>
      </div>
    ))}
  </div>
);

export default Achievements;
