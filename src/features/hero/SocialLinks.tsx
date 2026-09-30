import React from "react";
import { profileData } from "@constants/profileData";

const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mt-8">
      {profileData.socialLinks.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={link.name}
          aria-label={link.name}
          className="group relative w-11 h-11 rounded-full flex items-center justify-center bg-card/50 backdrop-blur-sm border border-border/80 hover:border-primary text-foreground/70 hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/15"
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            {link.icon}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
