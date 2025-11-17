import React from "react";
import { socialLinks } from "../../data/heroData";

const SocialLinks: React.FC = () => (
  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start mt-3 md:mt-4">
    {socialLinks.map(({ icon: Icon, href, color }, i) => (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative p-3 sm:p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-110
                   bg-white/10 border-gray-200/20 dark:bg-gray-800/30 dark:border-white/10 hover:bg-white/20 dark:hover:bg-gray-700/30
                   hover:border-primary/30 ${color}`}
      >
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20
                        opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"
        />
        <Icon className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300" />
      </a>
    ))}
  </div>
);

export default SocialLinks;
