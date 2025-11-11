import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Ưu tiên theme lưu trong localStorage
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) return saved;

    // Nếu chưa có, theo system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  // Cập nhật class trên html khi theme thay đổi
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Hàm toggle tiện lợi
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { theme, setTheme, toggleTheme };
};
