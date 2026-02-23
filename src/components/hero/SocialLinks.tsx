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
        className="relative group p-3 sm:p-3.5 flex items-center justify-center bg-tech-bg/50 border border-tech-teal/30 hover:border-tech-teal shadow-[0_0_10px_rgba(68,187,164,0.1)] hover:shadow-[0_0_15px_rgba(68,187,164,0.5)] transition-all duration-300 hover:-translate-y-1"
        style={{
          clipPath:
            "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
        }}
      >
        {/* Glow effect inside */}
        <Icon
          className={`w-5 h-5 transition-colors duration-300 ${color} text-tech-light`}
        />
      </a>
    ))}
  </div>
);
export default SocialLinks;
