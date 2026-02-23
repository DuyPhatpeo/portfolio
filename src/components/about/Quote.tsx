import React from "react";
import { useTranslation } from "react-i18next";

const Quote: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-16 text-center max-w-3xl mx-auto relative group">
      {/* Decorative brackets */}
      <div className="absolute top-0 left-0 text-4xl text-tech-teal/30 font-black group-hover:text-tech-teal transition-colors duration-500">
        [
      </div>
      <div className="absolute bottom-0 right-0 text-4xl text-tech-teal/30 font-black group-hover:text-tech-teal transition-colors duration-500">
        ]
      </div>

      <div className="px-8 py-4">
        <p className="text-sm md:text-base font-mono uppercase tracking-widest text-tech-light/80 border-b border-tech-teal/20 pb-4 inline-block">
          &gt;_ <span className="text-tech-teal">{t("about.quote")}</span>
        </p>
      </div>
    </div>
  );
};

export default Quote;
