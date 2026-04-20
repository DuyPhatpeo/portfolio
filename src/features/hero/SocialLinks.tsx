import React from "react";
import { profileData } from "../../constants/profileData";
import { useTranslation } from "react-i18next";
import { RiSendPlane2Line } from "react-icons/ri";

interface SocialLinksProps {
  scrollToSection: (sectionId: string) => void;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ scrollToSection }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex w-full items-center justify-between gap-3 mt-4">
      {/* Hire Me - Small version */}
      <button
        onClick={() => scrollToSection("contact")}
        className="group relative flex-1 h-[46px] flex items-center justify-center gap-2 bg-primary/10 border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 overflow-hidden cyber-chamfer"
      >
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
        <RiSendPlane2Line className="relative z-10 text-primary w-4 h-4 group-hover:animate-pulse" />
        <span className="relative z-10 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-primary uppercase">
          {t("hero.buttons.connect")}
        </span>
      </button>

      {/* Social Icons */}
      <div className="flex gap-3">
        {profileData.socialLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            className="relative group w-[46px] h-[46px] flex items-center justify-center bg-card/30 border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
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
    </div>
  );
};

export default SocialLinks;
