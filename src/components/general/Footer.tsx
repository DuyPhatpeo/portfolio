import { profileData } from "../../constants/profileData";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="bg-card/30 border-t border-primary/20 py-8 md:py-12 mt-auto w-full relative overflow-hidden"
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          
          {/* Left Side: Copyright Notice */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs text-foreground/50 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()}</span>
              <span className="text-primary font-bold">{profileData.logo}</span>
            </div>
            <span className="hidden md:block opacity-30 text-[8px]">•</span>
            <span>{t("footer.rights", "ALL RIGHTS RESERVED.")}</span>
          </div>

          {/* Center: Social Icons */}
          <div className="order-first md:order-none flex items-center justify-center gap-6 md:gap-8">
            {profileData.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group text-foreground/40 ${link.hoverColor} transition-all duration-300 hover:scale-120 drop-shadow-[0_0_8px_rgba(var(--primary),0)] hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]`}
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          {/* Right Side: Spacer/Empty for balance */}
          <div className="hidden md:block w-[300px] text-right text-[10px] font-mono text-foreground/20 tracking-widest">
            STAY CONNECTED
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
