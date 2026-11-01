import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import viTranslations from "./locales/vi.json";

const savedLanguage =
  typeof window !== "undefined"
    ? localStorage.getItem("language") || "vi"
    : "vi";

void i18n.use(initReactI18next).init({
  resources: {
    vi: {
      translation: viTranslations,
    },
  },
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

let enLoadPromise: Promise<void> | null = null;

export function ensureLanguageLoaded(lang: string): Promise<void> {
  if (lang !== "en" || i18n.hasResourceBundle("en", "translation")) {
    return Promise.resolve();
  }
  if (!enLoadPromise) {
    enLoadPromise = import("./locales/en.json").then((mod) => {
      i18n.addResourceBundle("en", "translation", mod.default, true, true);
    });
  }
  return enLoadPromise;
}

if (savedLanguage === "en") {
  void ensureLanguageLoaded("en").then(() => {
    void i18n.changeLanguage("en");
  });
}

export default i18n;
