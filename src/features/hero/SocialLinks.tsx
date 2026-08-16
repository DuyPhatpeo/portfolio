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
    <div className="flex flex-col w-full gap-3 mt-4">
      {/* Hire Me - Small version */}
      <button
        onClick={() => scrollToSection("contact")}
        className="group relative w-full h-[46px] flex items-center justify-center gap-2 px-3 bg-transparent border border-primary text-primary uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:text-background rounded-md"
      >
        {/* Fill Background - Scale from center */}
        <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10 rounded-md"></div>

        <RiSendPlane2Line className="relative z-10 w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
        <span className="relative z-10 text-[10px] sm:text-xs font-bold tracking-[0.2em] whitespace-nowrap">
          {t("hero.buttons.connect")}
        </span>
      </button>

      {/* Social Icons */}
      <div className="flex gap-2 sm:gap-3">
        {profileData.socialLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            className="relative group w-[46px] h-[46px] flex items-center justify-center bg-card/30 border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 overflow-hidden rounded-md"
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
