import React from "react";
import { useTranslation } from "react-i18next";

const Quote: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-20 text-center max-w-3xl mx-auto relative group">
      {/* Decorative brackets */}
      <div className="absolute top-0 left-0 text-5xl text-primary/20 font-black group-hover:text-primary transition-colors duration-500 font-heading">
        [
      </div>
      <div className="absolute bottom-0 right-0 text-5xl text-primary/20 font-black group-hover:text-primary transition-colors duration-500 font-heading">
        ]
      </div>

      <div className="px-10 py-6">
        <p className="text-sm md:text-lg font-heading font-black uppercase tracking-[0.3em] text-foreground/80 border-b-2 border-primary/20 pb-6 inline-block">
          &gt;_ <span className="text-primary group-hover:text-secondary transition-colors">{t("about.quote")}</span>
        </p>
      </div>
    </div>
  );
};

export default Quote;
