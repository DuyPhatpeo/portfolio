import { profileData } from "../../constants/profileData";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="bg-card/30 border-t border-primary/20 py-4 md:py-12 mt-auto w-full relative overflow-hidden"
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 font-mono text-[9px] md:text-xs text-foreground/50 tracking-widest uppercase">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-primary font-bold">{profileData.logo}</span>
            <span className="opacity-30 text-[8px]">•</span>
            <span>{t("footer.rights", "ALL RIGHTS RESERVED.")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
