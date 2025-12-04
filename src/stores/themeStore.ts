import { create } from "zustand";

interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  let savedMode = true;

  if (typeof window !== "undefined") {
    const local = localStorage.getItem("theme");

    if (local === "dark") savedMode = true;
    else if (local === "light") savedMode = false;
    else {
      savedMode = true;
      localStorage.setItem("theme", "dark");
    }

    document.documentElement.classList.toggle("dark", savedMode);
  }

  return {
    darkMode: savedMode,

    toggleDarkMode: () =>
      set((state) => {
        const newMode = !state.darkMode;

        document.documentElement.classList.toggle("dark", newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");

        return { darkMode: newMode };
      }),
  };
});
