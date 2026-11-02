export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "vi";

export function isValidLocale(lang: string): lang is Locale {
  return (LOCALES as readonly string[]).includes(lang);
}
