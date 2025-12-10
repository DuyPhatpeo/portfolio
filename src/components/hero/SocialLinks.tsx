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
        className=" p-3 sm:p-3.5 rounded-xl flex items-center justify-center bg-white/10 dark:bg-neutral-900/10 backdrop-blur-xl border border-white/20 dark:border-neutral-700/20 shadow-md shadow-black/10 dark:shadow-white/5 hover:bg-white/20 dark:hover:bg-neutral-800/20 transition-all duration-300 hover:-translate-y-1 "
      >
        {/* Icon — chỉ màu, không nền */}
        <Icon className={`w-5 h-5 ${color}`} />
      </a>
    ))}
  </div>
);
export default SocialLinks;
