import React from "react";
import { SOCIAL_LINKS } from "../../constants/platformData";

const SocialLinks: React.FC = () => (
  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start mt-4 md:mt-6">
    {SOCIAL_LINKS.map((link, i) => (
      <a
        key={i}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        title={link.name}
        className="relative group p-3.5 flex items-center justify-center bg-card/30 border border-primary/20 hover:border-primary/60 shadow-[0_0_10px_rgba(var(--primary),0.05)] hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
        style={{
          clipPath:
            "polygon(12% 0, 88% 0, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0 88%, 0 12%)",
        }}
      >
        {/* Glow effect inside */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
        <div className={`relative z-10 text-foreground/40 ${link.hoverColor} transition-colors duration-500`}>
           {link.icon}
        </div>
      </a>
    ))}
  </div>
);

export default SocialLinks;
