export const TECH = {
  // Core
  HTML: "HTML",
  CSS: "CSS",
  JS: "JavaScript",
  TS: "TypeScript",

  // Frontend Frameworks & Libraries
  REACT: "React",
  NEXT_JS: "Next.js",
  REACT_NATIVE: "React Native",
  EXPO: "Expo",
  FRAMER_MOTION: "Framer Motion",
  ZUSTAND: "Zustand",
  AXIOS: "Axios",
  REACT_ROUTER: "React Router",

  // Styling
  TAILWIND: "Tailwind CSS",
  NATIVEWIND: "NativeWind",
  SASS: "Sass",
  BOOTSTRAP: "Bootstrap",

  // Tools & Build
  VITE: "Vite",
  NPM: "npm",
  GIT: "Git",
  GITHUB: "GitHub",
  VSCODE: "VS Code",
  FIGMA: "Figma",
  VERCEL: "Vercel",

  // Backend & DB
  NODE_JS: "Node.js",
  LARAVEL: "Laravel",
  PHP: "PHP",
  DISCORD_JS: "Discord.js",
  MYSQL: "MySQL",
  FIREBASE: "Firebase",
} as const;

export type TechKey = keyof typeof TECH;
export type TechValue = (typeof TECH)[TechKey];
