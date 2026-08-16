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
  NESTJS: "NestJS",
  DISCORD_JS: "Discord.js",
  MYSQL: "MySQL",
  MONGODB: "MongoDB",
  FIREBASE: "Firebase",
} as const;

export type TechKey = keyof typeof TECH;
export type TechValue = (typeof TECH)[TechKey];

import React from "react";
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiExpo, SiFramer, 
  SiAxios, SiReactrouter, SiTailwindcss, SiSass, SiBootstrap, SiVite, SiNpm, SiGit, 
  SiGithub, SiFigma, SiVercel, SiNodedotjs, SiLaravel, SiPhp, 
  SiNestjs, SiDiscord, SiMysql, SiMongodb, SiFirebase 
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const TECH_ICONS: Record<string, React.ElementType> = {
  [TECH.HTML]: SiHtml5,
  [TECH.CSS]: SiCss3,
  [TECH.JS]: SiJavascript,
  [TECH.TS]: SiTypescript,
  [TECH.REACT]: SiReact,
  [TECH.NEXT_JS]: SiNextdotjs,
  [TECH.REACT_NATIVE]: SiReact,
  [TECH.EXPO]: SiExpo,
  [TECH.FRAMER_MOTION]: SiFramer,
  [TECH.AXIOS]: SiAxios,
  [TECH.REACT_ROUTER]: SiReactrouter,
  [TECH.TAILWIND]: SiTailwindcss,
  [TECH.NATIVEWIND]: SiTailwindcss,
  [TECH.SASS]: SiSass,
  [TECH.BOOTSTRAP]: SiBootstrap,
  [TECH.VITE]: SiVite,
  [TECH.NPM]: SiNpm,
  [TECH.GIT]: SiGit,
  [TECH.GITHUB]: SiGithub,
  [TECH.VSCODE]: VscVscode,
  [TECH.FIGMA]: SiFigma,
  [TECH.VERCEL]: SiVercel,
  [TECH.NODE_JS]: SiNodedotjs,
  [TECH.LARAVEL]: SiLaravel,
  [TECH.PHP]: SiPhp,
  [TECH.NESTJS]: SiNestjs,
  [TECH.DISCORD_JS]: SiDiscord,
  [TECH.MYSQL]: SiMysql,
  [TECH.MONGODB]: SiMongodb,
  [TECH.FIREBASE]: SiFirebase,
};
