import { create } from "zustand";

interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: true,

  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;

      // Cập nhật class vào <html>
      const html = document.documentElement;
      if (newMode) html.classList.add("dark");
      else html.classList.remove("dark");

      return { darkMode: newMode };
    }),
}));
