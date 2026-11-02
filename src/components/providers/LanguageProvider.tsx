"use client";

import React, { createContext, useContext, useEffect } from "react";
import i18n, { ensureLanguageLoaded } from "@/i18n/config";
import type { Locale } from "@/lib/i18n";

interface LanguageContextType {
  lang: Locale;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "vi",
});

export const LanguageProvider: React.FC<{
  lang: Locale;
  children: React.ReactNode;
}> = ({ lang, children }) => {
  useEffect(() => {
    if (i18n.language !== lang) {
      void ensureLanguageLoaded(lang).then(() => {
        void i18n.changeLanguage(lang);
        if (typeof window !== "undefined") {
          localStorage.setItem("language", lang);
          document.documentElement.lang = lang;
        }
      });
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
